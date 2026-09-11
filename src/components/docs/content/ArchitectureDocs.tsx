import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const ArchOverviewDoc = component$(() => {
    const lifecycleDiagram = `+-------------------------------------------------------+
|                 1. PLATFORM EVENT                     |  <-- winit loop captures cursor, keys, wheel
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                 2. STATE SYNCHRONIZATION              |  <-- Updates scroll indices, caret timers, hovers
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                 3. IMMEDIATEMODE EVALUATION           |  <-- Executes app's with_ui() code closure
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                 4. DEFERRED LAYOUT ENGINE             |  <-- Resolves column/row alignments & boundaries
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                 5. GPU SHADER FLUSH                   |  <-- Batches vertices; draws SDF shapes & text
+-------------------------------------------------------+`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Architecture Overview</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra is built from the ground up as a native, hardware-accelerated <strong>immediate-mode</strong> UI framework. Rather than syncing a persistent DOM or widget tree across frames, Zenthra executes the entire user interface closure 60 times a second, building layout hierarchies and scheduling draw primitives dynamically.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">The Lifecycle of a Frame</h2>
            <p class="text-sm text-[#454651] mb-4">
                Every frame inside a Zenthra application flows through a linear, synchronous loop managed by the core engine. Below is a high-level representation of how events map to GPU pixel presentation:
            </p>

            <CodeBlock code={lifecycleDiagram} language="text" filename="frame_lifecycle.txt" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Key Architectural Goals</h2>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                <li><strong>Minimal Latency:</strong> Input events directly alter immediate-mode UI state with zero middleman synchronization layers, resulting in sub-4ms response latencies.</li>
                <li><strong>Zero Boilerplate:</strong> Retained UI systems force developers to write verbose state listeners. Zenthra allows developers to describe UI structure inline as a direct reflection of current Rust state.</li>
                <li><strong>Deterministic Render:</strong> Layout elements are computed and flushed immediately, avoiding rendering lag or layout mismatch bugs.</li>
            </ul>
        </>
    );
});

export const ArchRenderDoc = component$(() => {
    const pipelineDiagram = `   [DrawCommand List] 
          │
          ├──► RectDraw ────────► SDF WGSL Shader ────┐
          │                                           ├──► WGPU Render Pass ──► GPU Framebuffer
          ├──► TextDraw ────────► Atlas WGSL Shader ──┤
          │                                           │
          └──► BackdropBlur ────► Postprocess Blit ───┘`;

    const drawCommandCode = `pub enum DrawCommand {
    Rect(RectDraw),
    Text(TextDraw),
    OverlayRect(OverlayRectDraw),
    BackdropBlur(BlurDraw),
    CustomPostProcess(CustomDraw),
}`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Rendering Pipeline</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra separates application logic from the graphics card by utilizing a <strong>two-phase rendering model</strong>. This ensures CPU layout calculations never stall the GPU draw queue.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Render Pipeline Execution Flow</h2>
            <p class="text-sm text-[#454651] mb-4">
                During the evaluation pass, widgets append intermediate draw primitives to a flat buffer. The WGPU renderer compiles and batches these commands:
            </p>

            <CodeBlock code={pipelineDiagram} language="text" filename="pipeline_flow.txt" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. CPU Build Pass (Phase 1)</h2>
            <p class="text-sm text-[#454651] mb-4">
                As the immediate-mode UI closure executes, builders push variant primitives onto the <code>draws</code> list:
            </p>
            <CodeBlock code={drawCommandCode} language="rust" filename="draw_command.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. GPU SDF Draw Pass (Phase 2)</h2>
            <p class="text-sm text-[#454651]">
                Instead of using heavy pixel textures for UI designs, Zenthra draws borders, shadows, and rounded corners dynamically in the fragment shader using <strong>Signed Distance Fields (SDF)</strong>. This guarantees crisp corners at any display resolution or scale factor with minimal memory footprints.
            </p>
        </>
    );
});

export const ArchLayoutDoc = component$(() => {
    const alignmentDiagram = `[1] CLOSURE PASS:
    container.row().gap(10.0).show(|ui| {
        ui.text("A").width(100.0).show(); // Records: (100.0, 50.0)
        ui.text("B").width(200.0).show(); // Records: (200.0, 50.0)
    });

[2] ALIGNMENT COMPUTATION:
    Total width required = 100.0 (A) + 10.0 (Gap) + 200.0 (B) = 310.0px
    Available width      = 500.0px
    HAlign::Center Start = (500.0 - 310.0) / 2.0 = 95.0px

[3] COORDINATE DISTRIBUTION:
    +-------------------------------------------------------+
    | Container Viewport (500px)                            |
    |          [95px]              [205px]                  |
    |          +-------+           +---------------+        |
    |          |   A   |           |       B       |        |
    |          +-------+           +---------------+        |
    +-------------------------------------------------------+`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Layout Engine</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra resolves widget dimensions using a <strong>deferred post-compute layout system</strong>. When parent closures execute, children submit size parameters to the parent builder rather than immediate absolute positioning.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Alignment Logic Flow</h2>
            <p class="text-sm text-[#454651] mb-4">
                Here is how a horizontal row distributes columns post-closure:
            </p>

            <CodeBlock code={alignmentDiagram} language="text" filename="layout_calculation.txt" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">The Layout Calculation Loop</h2>
            <p class="text-sm text-[#454651]">
                By deferring absolute coordinates calculations until children sizes are recorded, Zenthra supports advanced features like percentage-based layouts, flexible space alignments, and grid wrap systems in immediate-mode.
            </p>
        </>
    );
});

export const ArchStateDoc = component$(() => {
    const reactivityDiagram = `┌─────────────────────────────────────────────────────────────────────────────┐
│                             Zenthra State System                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Thread 1 (UI / Main):                                                      │
│    Signal<T> ──────────► Auto-Dependency Tracking ────► UI Redraw Request    │
│       ▲                        │                                            │
│       │                        ▼                                            │
│       │                 Computed<T> / Effect                                │
│       │                        │                                            │
│       ▼                        ▼                                            │
│    Context (provide_context / use_context) ──► Widget Subtree               │
│                                                                             │
│  Thread N (Background I/O / Tasks):                                         │
│    ArcSignal<T> (Send + Sync) ──► Thread-Safe Updates ──► Global Redraw Hook│
└─────────────────────────────────────────────────────────────────────────────┘`;

    const signalCode = `use zenthra::prelude::*;

// 1. Create a reactive signal
let count = Signal::new(0);

// Read the value (tracks dependencies automatically)
let current = count.get();

// Zero-copy immutable reference read
count.with(|val| println!("Value is: {}", val));

// Update the value (notifies subscribers & requests redraw)
count.set(10);

// In-place mutation via closure
count.with_mut(|val| *val += 5);

// Functional update
count.update(|prev| prev * 2);

// Change detection: Only notifies and redraws if value != new_value
let changed = count.set_if_changed(30);       // true (notified)
let changed_again = count.set_if_changed(30); // false (no-op, skips redraw!)`;

    const computedCode = `let first_name = Signal::new("Ada".to_string());
let last_name = Signal::new("Lovelace".to_string());

// Multi-signal dynamic dependency tracking
let full_name = Computed::new({
    let first = first_name.clone();
    let last = last_name.clone();
    move || format!("{} {}", first.get(), last.get())
});

println!("{}", full_name.get()); // "Ada Lovelace"

// Updating either dependency automatically recomputes derived state
first_name.set("Augusta Ada".to_string());
println!("{}", full_name.get()); // "Augusta Ada Lovelace"`;

    const effectCode = `let count = Signal::new(0);

// Scoped effect: Runs immediately, re-runs when count changes
let effect_handle = Effect::run({
    let count = count.clone();
    move || {
        log::info!("Count updated to: {}", count.get());
    }
});

count.set(1); // logs: "Count updated to: 1"

// Detach effect to run for the entire application lifespan
effect_handle.forget();`;

    const arcSignalCode = `let download_progress = ArcSignal::new(0.0f32);
let worker_signal = download_progress.clone();

// Spawn a background worker thread (Send + Sync)
std::thread::spawn(move || {
    for i in 1..=100 {
        std::thread::sleep(std::time::Duration::from_millis(20));
        worker_signal.set(i as f32 / 100.0); // Safely notifies UI & triggers redraw!
    }
});

// Read in your UI closure
ui.text(&format!("Progress: {:.0}%", download_progress.get() * 100.0)).show();`;

    const batchCode = `use zenthra::prelude::*;

// Connect global redraw hook once during application initialization
on_state_change(|| {
    // Dispatches a frame redraw request to winit
});

// Batch multiple mutations into a single subscriber notification and frame redraw
batch(|| {
    position_x.set(120.0);
    position_y.set(340.0);
    is_active.set(true);
}); // All subscribers notified once; window redraw requested once.`;

    const contextCode = `#[derive(Clone)]
struct Theme {
    accent: Color,
    dark_mode: bool,
}

// 1. Provide context at top level
provide_context(Theme {
    accent: Color::rgb(0.2, 0.6, 0.9),
    dark_mode: true,
});

// 2. Consume context anywhere in nested widgets or views
if let Some(theme) = use_context::<Theme>() {
    ui.button("Action").bg(theme.accent).show();
}

// Lifecycle utilities:
assert!(has_context::<Theme>());
let _removed = remove_context::<Theme>();
clear_context();`;

    const idDiagram = `Container (Custom ID: Hash("main_dashboard"))
   │
   ├──► Panel #0 (ID: Hash("main_dashboard" + 0)) ──► State Storage Map
   │                                                    ├── Scroll Y: 120.0px
   └──► Panel #1 (ID: Hash("main_dashboard" + 1))      ├── Caret Pos: Index 12
                                                       └── Collapsed: true`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">State Management &amp; Reactivity</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra combines the simplicity of <strong>immediate-mode UI rendering</strong> with a modern, high-performance <strong>fine-grained reactive state engine</strong> (<code>zenthra-state</code>). Instead of manually wiring callbacks or managing complex event buses, Zenthra provides automatic dependency tracking via signals, computed values, reactive effects, thread-safe background signals, and a clean context dependency-injection API.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Reactivity Architecture</h2>
            <p class="text-sm text-[#454651] mb-4">
                The reactive engine operates dynamically during execution: when a <code>Computed</code> or <code>Effect</code> reads a <code>Signal</code>, the signal registers the active subscriber automatically without manual subscription code.
            </p>

            <CodeBlock code={reactivityDiagram} language="text" filename="reactivity_flow.txt" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Reactive Signals (<code>Signal&lt;T&gt;</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                A <code>Signal&lt;T&gt;</code> is a reactive cell that holds a value. Cloning a signal gives another lightweight handle pointing to the same underlying reactive value. Whenever a subscriber reads the signal, that dependency is registered automatically.
            </p>

            <CodeBlock code={signalCode} language="rust" filename="signals.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Derived Computed Values (<code>Computed&lt;T&gt;</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                <code>Computed&lt;T&gt;</code> derives state from one or more signals. The computation closure is evaluated immediately and re-evaluates automatically whenever any signal read inside changes.
            </p>

            <CodeBlock code={computedCode} language="rust" filename="computed.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">3. Reactive Side Effects (<code>Effect</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                An <code>Effect</code> runs a closure immediately and re-executes whenever any of its tracked dependencies change. Lifecycle is strictly managed by RAII: dropping the <code>Effect</code> handle automatically unregisters subscriptions and frees memory. Use <code>.forget()</code> to keep an effect active indefinitely.
            </p>

            <CodeBlock code={effectCode} language="rust" filename="effects.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">4. Thread-Safe Signals (<code>ArcSignal&lt;T&gt;</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                When managing background network polls, disk indexing, or worker threads, standard <code>Rc</code>-based signals cannot cross thread boundaries. <code>ArcSignal&lt;T&gt;</code> implements <code>Send + Sync</code>, backed by an <code>Arc&lt;RwLock&lt;T&gt;&gt;</code> with lock-free callback dispatch.
            </p>

            <CodeBlock code={arcSignalCode} language="rust" filename="arc_signal.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">5. Batching &amp; Automatic Redraw Hooks</h2>
            <p class="text-sm text-[#454651] mb-4">
                To prevent frame thrashing and duplicate recomputations when modifying multiple related signals at once, wrap them in <code>batch</code>:
            </p>

            <CodeBlock code={batchCode} language="rust" filename="batch.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">6. Context Provider API (Dependency Injection)</h2>
            <p class="text-sm text-[#454651] mb-4">
                Zenthra provides a thread-local dependency-injection container, allowing components and widgets to consume application themes, user sessions, or global configurations without prop-drilling or hacking interaction state keys.
            </p>

            <CodeBlock code={contextCode} language="rust" filename="context.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">7. Internal Frame State Maps (<code>Id</code> Mapping)</h2>
            <p class="text-sm text-[#454651] mb-4">
                In addition to application reactivity, Zenthra persists transient immediate-mode widget states across frames (scroll positions, caret selections, and input buffers) via deterministic hash keys (<code>Id</code>):
            </p>

            <CodeBlock code={idDiagram} language="text" filename="id_state_tree.txt" />

            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                <li><strong>Scroll State:</strong> Preserves scroll offsets inside lists, containers, and virtual views.</li>
                <li><strong>Caret &amp; Buffer State:</strong> Tracks cursor indices, selection ranges, and text buffers for input fields.</li>
                <li><strong>Interaction Timers:</strong> Drives hover and active click micro-animations automatically.</li>
            </ul>
        </>
    );
});

export const ArchLazyDoc = component$(() => {
    const clippingDiagram = `Virtual Content Bounds (5000px height)
+---------------------------------------+
|  Row 0  (Off-screen - Skip Render)    |
|  Row 1  (Off-screen - Skip Render)    |
+=======================================+ <--- Scroll Y Viewport Top
|  Row 2  (On-screen - Render Child)     |
|  Row 3  (On-screen - Render Child)     | <-- Draw commands clamped to clip_rect
|  Row 4  (On-screen - Render Child)     |
+=======================================+ <--- Viewport Bottom
|  Row 5  (Off-screen - Skip Render)    |
+---------------------------------------+`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">LazyContainer Virtualization</h1>
            <p class="text-base text-[#454651] mb-6">
                Virtualization is crucial for high-performance dashboards. <code>LazyContainer</code> calculates viewport intersections, executing code closures only for elements that appear in the viewport.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Intersection &amp; Clipping Pass</h2>
            <p class="text-sm text-[#454651] mb-4">
                The container intercepts and clips items based on the active scroll offset:
            </p>

            <CodeBlock code={clippingDiagram} language="text" filename="viewport_clipping.txt" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Calculations Under the Hood</h2>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                <li><strong>Visible Window:</strong> Computes indices using: <code>start_row = (scroll_y / row_height).floor()</code>.</li>
                <li><strong>Draw Command Clip:</strong> Modifies target clip rectangle boundaries for all drawn primitives inside the viewport window, preventing elements from bleeding out into parent boundaries.</li>
            </ul>
        </>
    );
});
