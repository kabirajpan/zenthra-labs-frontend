import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const ContainerDoc = component$(() => {
    const containerCode = `ui.container()
    .width(300.0)
    .height(200.0)
    .bg(Color::rgb(0.12, 0.12, 0.16))
    .radius_all(10.0)
    .padding_all(16.0)
    .gap(10.0)
    .show(|ui| {
        ui.text("Contained Element").show();
    });`;

    const frostedCardCode = `ui.container()
    .width(320.0)
    .padding_all(20.0)
    .bg(Color::rgba(1.0, 1.0, 1.0, 0.08)) // semi-transparent white
    .backdrop_blur(30.0)                 // frosted glass blur
    .radius_all(16.0)
    .border(Color::rgba(1.0, 1.0, 1.0, 0.15), 1.5)
    .border_alignment(BorderAlignment::Outside)
    .shadow(Color::rgba(0.0, 0.0, 0.0, 0.3), 0.0, 8.0, 16.0)
    .gap(12.0)
    .hover_scale(1.02)                   // subtle hover lift
    .on_click(|| println!("Card Clicked!"))
    .show(|ui| {
        ui.text("Zenthra Card").size(18.0).bold().show();
        ui.text("GPU-accelerated immediate mode box component.")
            .size(12.0)
            .color(Color::rgb(0.7, 0.7, 0.7))
            .show();
    });`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Container Widget</h1>
            <p class="text-base text-[#454651] mb-6">
                The <code>Container</code> is the absolute core component for structuring lay-outs in Zenthra. It maps to an SDF-rendered rounded block and manages child flow, alignment, padding, border alignment, hardware drop shadows, and interactive states.
            </p>

            <CodeBlock code={containerCode} language="rust" filename="container.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">API Reference</h2>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">1. Sizing &amp; Constraints</h3>
            <p class="text-sm text-[#454651] mb-3">
                Containers support fixed sizes or relative behaviors filling parent spaces. Min/Max sizes prevent layout overflow.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.width(w: f32)</code>:</strong> Hardcodes the logical pixel width of the container.</li>
                <li><strong><code>.height(h: f32)</code>:</strong> Hardcodes the logical pixel height of the container.</li>
                <li><strong><code>.fill_x()</code>:</strong> Expands the container to consume 100% of the parent width. Aliased as <code>.full_width()</code>.</li>
                <li><strong><code>.fill_y()</code>:</strong> Expands the container to consume 100% of the parent height. Aliased as <code>.full_height()</code>.</li>
                <li><strong><code>.fill()</code>:</strong> Expands the container to consume 100% of both axes.</li>
                <li><strong><code>.min_width(w: f32)</code>:</strong> Minimum width boundary enforced during the layout calculation pass.</li>
                <li><strong><code>.min_height(h: f32)</code>:</strong> Minimum height boundary enforced during the layout calculation pass.</li>
                <li><strong><code>.max_width(w: f32)</code>:</strong> Maximum width boundary enforced during the layout calculation pass.</li>
                <li><strong><code>.max_height(h: f32)</code>:</strong> Maximum height boundary enforced during the layout calculation pass.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">2. Flow Direction &amp; Alignment</h3>
            <p class="text-sm text-[#454651] mb-3">
                Control how nested children stack and distribute themselves inside the container space.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.column()</code>:</strong> Children stack vertically (default).</li>
                <li><strong><code>.row()</code>:</strong> Children stack horizontally.</li>
                <li><strong><code>.gap(g: f32)</code>:</strong> Standard gap spacing in logical pixels between adjacent children.</li>
                <li><strong><code>.halign(align: Align)</code>:</strong> Positions children horizontally (e.g., center, space-between).</li>
                <li><strong><code>.valign(align: Align)</code>:</strong> Positions children vertically (e.g., center, space-around).</li>
                <li><strong><code>.align(align: Align)</code>:</strong> Sets layout alignment on both axes simultaneously.</li>
                <li><strong><code>.wrap(strategy: Wrap)</code>:</strong> Configure row grid wrapping behaviors (e.g. <code>Wrap::Wrap</code> or <code>Wrap::NoWrap</code>).</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">3. Padding &amp; Spacing</h3>
            <p class="text-sm text-[#454651] mb-3">
                Define inner offsets to pad content walls.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.padding(top, right, bottom, left)</code>:</strong> Configures specific spacing padding offsets inside content walls.</li>
                <li><strong><code>.padding_all(p: f32)</code>:</strong> Configures uniform padding offsets on all sides.</li>
                <li><strong><code>.padding_x(p: f32)</code>:</strong> Sets uniform horizontal padding offsets.</li>
                <li><strong><code>.padding_y(p: f32)</code>:</strong> Sets uniform vertical padding offsets.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">4. Background &amp; Borders</h3>
            <p class="text-sm text-[#454651] mb-3">
                Configure solid background coloring and surrounding edge styles.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets the background color of the container.</li>
                <li><strong><code>.bg_opacity(opacity: f32)</code>:</strong> Sets the transparency (alpha value) of the background color.</li>
                <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Renders outlines with defined logical pixel widths.</li>
                <li><strong><code>.border_alignment(alignment: BorderAlignment)</code>:</strong> Positions borders with respect to the container boundary. Options: <code>BorderAlignment::Inside</code> (default), <code>BorderAlignment::Outside</code>, <code>BorderAlignment::Center</code>.</li>
                <li><strong><code>.radius(tl, tr, br, bl)</code>:</strong> Custom corner radii logical values.</li>
                <li><strong><code>.radius_all(r: f32)</code>:</strong> Sets uniform corner radius on all corners.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">5. Scroll &amp; Clipping</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.scroll_x(enabled: bool)</code>:</strong> Enables horizontal scrollbar scrolling when content overflows.</li>
                <li><strong><code>.scroll_y(enabled: bool)</code>:</strong> Enables vertical scrollbar scrolling when content overflows.</li>
                <li><strong><code>.scrollable(x: bool, y: bool)</code>:</strong> Configures horizontal and vertical scrolling simultaneously.</li>
                <li><strong><code>.clip(enabled: bool)</code>:</strong> Force-clips any overflowing visual elements to this container's rounded bounds. Automatically enabled when scrolling is active.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">6. Micro-Interactions &amp; Event Listeners</h3>
            <p class="text-sm text-[#454651] mb-3">
                Add responsive behaviors directly onto layout cells.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.hover_bg(color: Color)</code>:</strong> Styles applied automatically when the mouse hovers over the container.</li>
                <li><strong><code>.hover_border(color: Color, width: f32)</code>:</strong> Hover border overrides.</li>
                <li><strong><code>.hover_scale(factor: f32)</code>:</strong> Scale factor override on hover (e.g. <code>.hover_scale(1.03)</code> zooms the container slightly).</li>
                <li><strong><code>.active_bg(color: Color)</code>:</strong> Clicked/active state background color.</li>
                <li><strong><code>.active_scale(factor: f32)</code>:</strong> Scale magnification while clicked.</li>
                <li><strong><code>.on_click(closure)</code>:</strong> Callback triggered on left mouse click events.</li>
                <li><strong><code>.on_hover(closure)</code>:</strong> Callback triggered on mouse enter/exit occurrences.</li>
                <li><strong><code>.on_scroll(closure)</code>:</strong> Callback triggered on scroll events.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">7. Advanced GPU Effects (Glassmorphism &amp; Shadows)</h3>
            <p class="text-sm text-[#454651] mb-3">
                Hardware-accelerated shader passes and shadow projections.
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.backdrop_blur(radius: f32)</code>:</strong> Turns on frosted glassmorphism! Blurs the application viewport behind this container using a dual-pass Kawase blur. Typically configured between <code>10.0</code> and <code>40.0</code>. Combine with <code>.bg(Color)</code> using semi-transparency for the frosted effect.</li>
                <li><strong><code>.shadow(color: Color, offset_x, offset_y, blur)</code>:</strong> Renders an SDF-calculated soft drop shadow under the container.</li>
                <li><strong><code>.shadow_opacity(opacity: f32)</code>:</strong> Controls drop shadow alpha transparency.</li>
                <li><strong><code>.post_process_shader(shader_id: &'static str)</code>:</strong> Binds a registered custom WGSL fragment shader to this container.</li>
            </ul>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Complete Example: Frosted Card</h2>
            <p class="text-sm text-[#454651] mb-4">
                The following code demonstrates a premium, interactive glassmorphic profile card with dynamic hover scaling and border alignment:
            </p>
            <CodeBlock code={frostedCardCode} language="rust" filename="frosted_card.rs" />
        </>
    );
});

export const LazyContainerDoc = component$(() => {
    const lazyCode = `ui.lazy_container()
    .id("database_rows")
    .count(100_000)
    .item_size(280.0, 48.0)
    .gap(8.0)
    .column()
    .show(|ui, index| {
        ui.card()
            .padding(8.0)
            .show(|ui| {
                ui.text(&format!("Entry #{}", index)).show();
            });
    });`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">LazyContainer Widget</h1>
            <p class="text-base text-[#454651] mb-6">
                The <code>LazyContainer</code> widget is Zenthra's virtualized list and grid cell layout wrapper. It calculates viewport boundaries dynamically, drawing only the visible list cells (plus a safety buffer to prevent scrolling flicker) and force-clipping all overflowing draw calls on the GPU.
            </p>
            <div class="border-l-4 border-[#5c6bc0] bg-[#f5f2fa] p-4 rounded-r-[4px] mb-6">
                <p class="text-sm text-[#4352a5]">
                    By limiting draw allocations, LazyContainer achieves <strong>O(visible items)</strong> rendering performance, maintaining a constant 60+ FPS even when scrolling through datasets with 100,000+ entries.
                </p>
            </div>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">API Reference</h2>
            <CodeBlock code={lazyCode} language="rust" filename="lazy_container.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Grid Configuration &amp; Size</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.count(count: usize)</code>:</strong> Sets the total virtual items count in the dataset.</li>
                <li><strong><code>.item_size(width: f32, height: f32)</code>:</strong> Sets the fixed size constraints of each virtual item cell.</li>
                <li><strong><code>.gap(gap: f32)</code>:</strong> Sets spacing gap between adjacent grid cells. Defaults to <code>15.0</code>.</li>
                <li><strong><code>.padding(top, right, bottom, left)</code>:</strong> Sets viewport margins (currently sets uniform padding boundaries).</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Layout &amp; Flow Direction</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.row()</code>:</strong> Flows list items horizontally (wrapping into columns dynamically matching container dimensions).</li>
                <li><strong><code>.column()</code>:</strong> Flows list items vertically in a single column layout (default behavior).</li>
                <li><strong><code>.wrap(strategy: Wrap)</code>:</strong> Configures wrap strategies when grid cells fill row scopes.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">State &amp; Background Styles</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.id(id: impl Hash)</code>:</strong> Binds a stable identifier to persist vertical/horizontal scroll offsets across frames.</li>
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets background color of the viewport container (defaults to transparent).</li>
                <li><strong><code>.radius(tl, tr, br, bl)</code>:</strong> Sets uniform corner boundary radius for viewport background shapes.</li>
            </ul>
        </>
    );
});

export const PanelCardDoc = component$(() => {
    const cardCode = `ui.card()
    .width(300.0)
    .bg(Color::rgb(0.15, 0.15, 0.18))
    .border(Color::rgb(0.25, 0.25, 0.3), 1.0)
    .radius(12.0)
    .hover_scale(1.04)
    .hover_bg(Color::rgb(0.18, 0.18, 0.22))
    .show(|ui| {
        ui.text("Premium Card Content").show();
    });`;

    const panelCode = `ui.panel()
    .title("System Diagnostics")
    .subtitle("Real-time CPU temperatures")
    .collapsible(true)
    .show(|ui| {
        ui.text("Core 0: 42°C").show();
    });`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Panel &amp; Card</h1>
            <p class="text-base text-[#454651] mb-6">
                The <code>Card</code> and <code>Panel</code> widgets are high-level structural cells designed to divide layouts into clean dashboard panels or information blocks.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Card Widget</h2>
            <p class="text-sm text-[#454651] mb-4">
                A layout container that behaves exactly like an unstyled <code>Container</code> by default (zero padding, transparent background, and no shadows) for fully predictable layout rendering. You can configure styles and hover animations using chainable builder methods.
            </p>

            <CodeBlock code={cardCode} language="rust" filename="card.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Card Sizing &amp; Spacing</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.width(w: f32)</code>:</strong> Sets the fixed width of the card.</li>
                <li><strong><code>.height(h: f32)</code>:</strong> Sets the fixed height of the card.</li>
                <li><strong><code>.size(w: f32, h: f32)</code>:</strong> Configures both logical width and height simultaneously.</li>
                <li><strong><code>.padding(p: f32)</code>:</strong> Sets the uniform spacing padding inside the card.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Card Aesthetics &amp; Shadows</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets the background color of the card container.</li>
                <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Sets the surrounding border outline color and line thickness.</li>
                <li><strong><code>.radius(r: f32)</code>:</strong> Sets the corner radius roundness on all corners.</li>
                <li><strong><code>.shadow(color: Color, x: f32, y: f32, blur: f32)</code>:</strong> Configures drop shadow offset coordinates and soft blur radius.</li>
                <li><strong><code>.shadow_opacity(opacity: f32)</code>:</strong> Controls shadow alpha transparency level.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Card Hover Animations</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-8">
                <li><strong><code>.hover_scale(scale: f32)</code>:</strong> Binds a magnification zoom scaling factor on hover (e.g. <code>1.03</code>).</li>
                <li><strong><code>.hover_bg(color: Color)</code>:</strong> Custom background color override when hovered.</li>
                <li><strong><code>.hover_border_color(color: Color)</code>:</strong> Custom border color override when hovered.</li>
            </ul>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Panel Widget</h2>
            <p class="text-sm text-[#454651] mb-4">
                A layout division with an optional collapsible header section (supporting titles, subtitles, and chevron collapse toggle interactions). By default, it behaves like an unstyled, transparent <code>Container</code> (zero padding, transparent background, and no shadows) for fully predictable layout rendering.
            </p>

            <CodeBlock code={panelCode} language="rust" filename="panel.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Panel Sizing &amp; Spacing</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.width(w: f32)</code>:</strong> Sets the logical width bounds of the panel.</li>
                <li><strong><code>.height(h: f32)</code>:</strong> Sets the logical height bounds of the panel.</li>
                <li><strong><code>.size(w: f32, h: f32)</code>:</strong> Sets panel dimensions on both axes.</li>
                <li><strong><code>.padding(p: f32)</code>:</strong> Configures spacing padding inside the panel body.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Panel Header Configuration</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.title(text: impl Into&lt;String&gt;)</code>:</strong> Renders a primary bold title string inside the panel header.</li>
                <li><strong><code>.subtitle(text: impl Into&lt;String&gt;)</code>:</strong> Renders a secondary, smaller subtitle label beneath the title.</li>
                <li><strong><code>.header_bg(color: Color)</code>:</strong> Sets the background color of the header section.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Panel Collapse Interactions</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.collapsible(enabled: bool)</code>:</strong> Toggle showing the collapse chevron and allowing header click collapsing.</li>
                <li><strong><code>.collapsed(state: &mut bool)</code>:</strong> Binds external mutable boolean states for state persistence across widgets.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Panel Aesthetics &amp; Style</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets the panel body background color.</li>
                <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Configures panel border outline color and line thickness.</li>
                <li><strong><code>.radius(r: f32)</code>:</strong> Sets uniform corner radius on the outer boundaries.</li>
                <li><strong><code>.shadow(color: Color, x: f32, y: f32, blur: f32)</code>:</strong> Soft panel shadow offset coordinates and blur values.</li>
            </ul>
        </>
    );
});

export const WindowDialogDoc = component$(() => {
    const windowCode = `ui.window("Control Panel", &mut is_open, &mut position)
    .size(400.0, 300.0)
    .bg(Color::rgb(0.1, 0.1, 0.12))
    .border(Color::rgb(0.3, 0.3, 0.35), 1.0)
    .radius_all(8.0)
    .closable(true)
    .show(|ui| {
        ui.text("Floating Window Workspace").show();
    });`;

    const dialogCode = `ui.window("Confirm Action", &mut is_open, &mut position)
    .size(340.0, 200.0)
    .modal(true)
    .closable(false)
    .show(|ui| {
        ui.text("Are you sure you want to delete this file?").show();
        if ui.button("Confirm").bg(Color::rgb(0.8, 0.2, 0.2)).show().clicked {
            // Execute confirm delete
        }
    });`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Window &amp; Dialog</h1>
            <p class="text-base text-[#454651] mb-6">
                Overlay layout components that represent separate, floatable task scopes or blocking alert triggers.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Floating Window</h2>
            <p class="text-sm text-[#454651] mb-4">
                Renders a draggable floating window overlay using <code>FloatingWindowBuilder</code>. It manages z-index depth sorting automatically, promoting the active clicked window to the top. Tracks drag offset handles in immediate mode state trees.
            </p>

            <CodeBlock code={windowCode} language="rust" filename="window.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Window Sizing &amp; Spacing</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.size(w: f32, h: f32)</code>:</strong> Configures logical width and height dimensions. Defaults to <code>320.0 x 400.0</code>.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Window Aesthetics &amp; Styles</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets the background color of the window workspace.</li>
                <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Sets the border outline color and width around window bounds.</li>
                <li><strong><code>.radius_all(radius: f32)</code>:</strong> Sets corner radii curvature on the outer window outline.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Header Customization</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.header_bg(color: Color)</code>:</strong> Background color of the header title drag bar.</li>
                <li><strong><code>.header_text_color(color: Color)</code>:</strong> Color of the window title text characters.</li>
                <li><strong><code>.header_height(height: f32)</code>:</strong> Height size of the drag title bar. Defaults to <code>40.0</code>.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Window Flags &amp; Dismissals</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-8">
                <li><strong><code>.closable(enabled: bool)</code>:</strong> Displays the close button ("×") on the right of the header bar.</li>
                <li><strong><code>.light_dismiss(enabled: bool)</code>:</strong> If set to true, clicking outside the window borders closes the window automatically.</li>
            </ul>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Dialog (Modal Alert)</h2>
            <p class="text-sm text-[#454651] mb-4">
                Focused alert dialogues. In Zenthra, a Dialog is created using the same <code>FloatingWindowBuilder</code> but configured with <code>.modal(true)</code>.
            </p>

            <CodeBlock code={dialogCode} language="rust" filename="dialog.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Modal Behaviors</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.modal(enabled: bool)</code>:</strong> Toggle modal status. When true, renders a dark overlay (<code>Color::rgba(0.0, 0.0, 0.0, 0.4)</code>) covering the entire window viewport behind the active dialog.</li>
                <li><strong>Blocking Interactions:</strong> Blocks and ignores all mouse inputs directed at elements outside the dialog box boundaries.</li>
            </ul>
        </>
    );
});

export const TitleBarDoc = component$(() => {
    const framelessAppCode = `use zenthra::prelude::*;

fn main() {
    App::new()
        .title("Modern Workspace")
        .size(1200, 800)
        .decorations(false)      // <--- Disables native OS title bar and borders
        .transparent(true)      // Allows window translucency
        .blur(true)             // Requests compositor blur (KDE / GNOME)
        .backdrop_tint(Color::rgba(0.04, 0.04, 0.06, 0.85))
        .with_ui(move |ui| {
            ui.container().fill().column().show(|ui| {
                // 1. Call custom title bar at the top
                draw_custom_title_bar(ui);

                // 2. Main application body below
                draw_workspace(ui);
            });
        })
        .run();
}`;

    const titleBarCompleteCode = `use zenthra::prelude::*;

// ── 1. Application State ──
#[derive(Default)]
pub struct AppState {
    pub file_name: String,
    pub is_modified: bool,
    pub status: String,
}

// ── 2. Custom Title Bar Function ──
// Modular component receiving Ui context and application state
pub fn draw_title_bar(ui: &mut Ui, state: &mut AppState) {
    const BAR_H: f32 = 36.0;
    const BTN_W: f32 = 32.0;

    // Fixed-height top horizontal bar
    ui.container()
        .full_width()
        .height(BAR_H)
        .bg(Color::rgb(0.10, 0.10, 0.13))
        .border(Color::rgb(0.18, 0.18, 0.22), 1.0)
        .row()
        .valign(Align::Center)
        .show(|ui| {
            // [LEFT ZONE]: App Icon, Document Title, and Dropdown Menus
            ui.container()
                .row()
                .valign(Align::Center)
                .gap(8.0)
                .padding_left(12.0)
                .show(|ui| {
                    let dot = if state.is_modified { "● " } else { "" };
                    ui.text(&format!("ZenApp — {}{}", dot, state.file_name))
                        .weight(FontWeight::Bold)
                        .size(12.0)
                        .color(Color::rgb(0.9, 0.9, 0.95))
                        .show(ui);

                    // Dropdown Menus
                    ui.menu("File").show(|ui| {
                        if ui.menu_item("Save").shortcut("Ctrl+S").show().clicked {
                            state.is_modified = false;
                            state.status = "Saved!".into();
                            ui.request_redraw();
                        }
                        if ui.menu_item("Exit").shortcut("Ctrl+Q").show().clicked {
                            ui.close();
                        }
                    });

                    ui.menu("Edit").show(|ui| {
                        if ui.menu_item("Undo").shortcut("Ctrl+Z").show().clicked {
                            state.status = "Undo".into();
                            ui.request_redraw();
                        }
                    });
                });

            // [CENTER ZONE]: Draggable Spacer
            // Expands across remaining width. Captures drag and calls native OS window manager.
            let spacer = ui.container()
                .fill_x()
                .height(BAR_H)
                .show(|_| {});

            if spacer.dragged || (spacer.pressed && ui.mouse_down) {
                ui.drag(); // Dispatches native OS window manager drag
            }

            // [RIGHT ZONE]: Window Action Controls (Minimize, Maximize, Close)
            ui.container()
                .row()
                .valign(Align::Center)
                .show(|ui| {
                    // Minimize Button ("-")
                    if ui.button("-")
                        .size(BTN_W, BAR_H)
                        .bg(Color::TRANSPARENT)
                        .hover_bg(Color::rgba(1.0, 1.0, 1.0, 0.08))
                        .show(ui)
                        .clicked
                    {
                        ui.minimize(); // Emits WindowAction::Minimize
                    }

                    // Maximize / Restore Button ("□")
                    if ui.button("□")
                        .size(BTN_W, BAR_H)
                        .bg(Color::TRANSPARENT)
                        .hover_bg(Color::rgba(1.0, 1.0, 1.0, 0.08))
                        .show(ui)
                        .clicked
                    {
                        ui.maximize(); // Emits WindowAction::Maximize
                    }

                    // Close Button ("×") with red hover accent
                    if ui.button("×")
                        .size(BTN_W, BAR_H)
                        .bg(Color::TRANSPARENT)
                        .hover_bg(Color::rgb(0.85, 0.20, 0.20))
                        .show(ui)
                        .clicked
                    {
                        ui.close(); // Emits WindowAction::Close
                    }
                });
        });
}

// ── 3. Main Application Workspace ──
pub fn draw_workspace(ui: &mut Ui, state: &mut AppState) {
    ui.container()
        .fill()
        .padding(24.0)
        .show(|ui| {
            ui.text("Main Application Workspace").size(18.0).show(ui);
            ui.text(&format!("Current Status: {}", state.status)).size(13.0).color(Color::rgb(0.6, 0.6, 0.7)).show(ui);
        });
}

// ── 4. Main Application Entrypoint ──
// App::new() takes NO arguments; chain .title(), .size(), and .decorations(false)
fn main() {
    let mut state = AppState {
        file_name: "main.rs".into(),
        is_modified: true,
        status: "Editing".into(),
    };

    App::new()
        .title("ZenApp")
        .size(1100, 680)
        .decorations(false) // <--- CRUCIAL: Disables OS title bar and window frame
        .with_ui(move |ui| {
            // Root vertical container filling entire window
            ui.container()
                .fill()
                .column()
                .show(|ui| {
                    // Step 1: Call custom title bar function first
                    draw_title_bar(ui, &mut state);

                    // Step 2: Main application content fills remaining viewport
                    draw_workspace(ui, &mut state);
                });
        })
        .run();
}`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Title Bar &amp; Window Controls</h1>
            <p class="text-base text-[#454651] mb-6">
                Desktop applications built with Zenthra often use modern frameless designs where native OS window borders and title bars are replaced with a sleek, bespoke interface. Zenthra provides native OS window action dispatchers (<code>ui.drag()</code>, <code>ui.minimize()</code>, <code>ui.maximize()</code>).
            </p>

            <CodeBlock code={framelessAppCode} language="rust" filename="frameless_app.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Native Window Action APIs</h2>
            <p class="text-sm text-[#454651] mb-4">
                The <code>Ui</code> context provides direct methods for controlling the native operating system window. These dispatches communicate directly with Winit and the native window manager:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">ui.drag()</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Dispatches a native drag request to the OS window manager via <code>WindowAction::Drag</code>. The OS directly assumes mouse cursor control, delivering buttery-smooth 120Hz+ jitter-free motion while preserving native snap docking (Windows Snap, KDE Quick Tile, GNOME tiling).
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">ui.minimize()</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Emits <code>WindowAction::Minimize</code>, requesting the native desktop environment to minimize the application window into the dock or taskbar.
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">ui.maximize()</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Emits <code>WindowAction::Maximize</code>, toggling the native window state between maximized (full monitor space) and restored geometry.
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">ui.close()</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Emits <code>WindowAction::Close</code>, terminating the application event loop cleanly and exiting the process.
                    </p>
                </div>
            </div>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">3. Title Bar Architecture &amp; Draggable Spacers</h2>
            <p class="text-sm text-[#454651] mb-4">
                A custom title bar is organized horizontally using a <code>row()</code> container partitioned into three distinct functional zones:
            </p>

            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong>Left Zone:</strong> App icon, title label, and interactive dropdown menus (e.g. <code>ui.menu("File")</code>).</li>
                <li><strong>Center Zone (Draggable Spacer):</strong> An empty expanding spacer that catches click-and-drag interactions and invokes <code>ui.drag()</code>.</li>
                <li><strong>Right Zone:</strong> Search bars, notification indicators, and window action buttons (Minimize, Maximize, Close).</li>
            </ul>

            <div class="bg-[#f0f4ff] border-l-4 border-[#5c6bc0] p-4 rounded-r-[6px] mb-6">
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#4352a5] mb-1">Architecture Tip: Why Use Draggable Spacers?</h4>
                <p class="text-xs text-[#454651] leading-relaxed">
                    Avoid setting <code>.draggable_window(true)</code> on the entire outer title bar container! Doing so causes the OS window manager to intercept all mouse clicks across the entire bar, swallowing clicks intended for menus, buttons, and search inputs. Instead, leave the outer container un-draggable and allocate an empty center spacer with <code>.fill_x()</code> that invokes <code>ui.drag()</code> on press/drag. This ensures buttons and menus stay 100% responsive.
                </p>
            </div>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">4. Linking the Title Bar with the Main Application</h2>
            <p class="text-sm text-[#454651] mb-4">
                Because Zenthra runs on an immediate-mode UI pipeline, your custom title bar is not an isolated native OS widget—it is drawn directly at the top of your layout hierarchy inside the <code>with_ui</code> closure on every frame.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">1. Application State</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Declare an <code>AppState</code> struct outside the UI loop to hold active views, open documents/tabs, theme preferences, and sync status.
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">2. Vertical Column Layout</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Inside <code>with_ui(move |ui| ...)</code>, create an outer container with <code>.fill().column()</code> that places the Title Bar (36px fixed) above the Main Workspace (filling remaining height).
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">3. Reactivity &amp; Redraws</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        When title bar widgets (tabs, menus, theme toggles) mutate <code>state</code>, call <code>ui.request_redraw()</code> to immediately schedule the next rendered frame.
                    </p>
                </div>
            </div>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">5. Production Example &amp; Main App Integration</h2>
            <p class="text-sm text-[#454651] mb-4">
                Here is the complete implementation showing how to build a modular <code>draw_title_bar(ui, &amp;mut state)</code> function with dropdown menus, a draggable center spacer (<code>ui.drag()</code>), and window control buttons (Minimize, Maximize, Close), and how to link it directly into your <code>main()</code> entrypoint where <code>App::new().decorations(false)</code> is configured:
            </p>

            <CodeBlock code={titleBarCompleteCode} language="rust" filename="src/main.rs" />
        </>
    );
});
