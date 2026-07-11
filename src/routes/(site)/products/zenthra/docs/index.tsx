import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface TreeNode {
    label: string;
    path: string;
    type: "folder" | "file";
    fileId?: string;
    children?: TreeNode[];
}

// Tree view component for rendering nodes recursively
export const TreeNodeView = component$<{
    node: TreeNode;
    level: number;
    activeDoc: { value: string };
    expandedPaths: { value: Record<string, boolean> };
    onToggle: (path: string) => void;
    onSelectFile: (fileId: string) => void;
}>(({ node, level, activeDoc, expandedPaths, onToggle, onSelectFile }) => {
    const isFolder = node.type === "folder";
    const isExpanded = expandedPaths.value[node.path] || false;
    const isActive = !isFolder && activeDoc.value === node.fileId;

    return (
        <div class="w-full flex flex-col">
            {/* Node item row */}
            <button
                onClick$={() => {
                    if (isFolder) {
                        onToggle(node.path);
                    } else if (node.fileId) {
                        onSelectFile(node.fileId);
                    }
                }}
                style={{ paddingLeft: `${level * 12 + 6}px` }}
                class={[
                    "w-full flex items-center gap-2 py-1.5 pr-2 text-left text-xs font-['Inter',sans-serif] hover:bg-[#e9e7ef]/35 rounded-[3px] transition-all cursor-pointer group select-none",
                    isActive 
                        ? "text-[#4352a5] bg-[#e9e7ef]/60 font-bold border-l-2 border-[#5c6bc0] -ml-[2px]" 
                        : "text-[#454651] font-medium"
                ].join(" ")}
            >
                {/* Disclosure Arrow for Folders */}
                {isFolder ? (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class={[
                            "w-3 h-3 text-[#767683] shrink-0 transition-transform duration-150",
                            isExpanded ? "rotate-90" : ""
                        ].join(" ")}
                    >
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                ) : (
                    // Spacer for files to align with folders
                    <span class="w-3 shrink-0" />
                )}

                {/* Label */}
                <span class="truncate">{node.label}</span>
            </button>

            {/* Recursively render children if expanded folder */}
            {isFolder && isExpanded && node.children && (
                <div class="w-full flex flex-col mt-0.5">
                    {node.children.map((child) => (
                        <TreeNodeView
                            key={child.path}
                            node={child}
                            level={level + 1}
                            activeDoc={activeDoc}
                            expandedPaths={expandedPaths}
                            onToggle={onToggle}
                            onSelectFile={onSelectFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

const filterTree = (nodes: TreeNode[], query: string): TreeNode[] => {
    if (!query) return nodes;
    const lowerQuery = query.toLowerCase();
    
    return nodes
        .map(node => {
            if (node.type === "file") {
                return node.label.toLowerCase().includes(lowerQuery) ? node : null;
            } else if (node.type === "folder") {
                const filteredChildren = filterTree(node.children || [], query);
                if (filteredChildren.length > 0 || node.label.toLowerCase().includes(lowerQuery)) {
                    return {
                        ...node,
                        children: filteredChildren
                    };
                }
                return null;
            }
            return null;
        })
        .filter((node): node is TreeNode => node !== null);
};

export default component$(() => {
    const activeDoc = useSignal("intro");

    // Tracks open/closed state of documentation categories
    const expandedPaths = useSignal<Record<string, boolean>>({
        "getting-started": true,
        "architecture": false,
        "widgets": true,
        "widgets/layout": true,
        "widgets/controls": false,
        "widgets/selection": false,
        "advanced": false,
    });

    const docSequence = [
        { id: "intro", label: "Introduction" },
        { id: "hello-world", label: "Hello World" },
        { id: "arch-overview", label: "Overview" },
        { id: "arch-render", label: "Render Pipeline" },
        { id: "arch-layout", label: "Layout Engine" },
        { id: "arch-state", label: "State Management" },
        { id: "arch-lazy", label: "LazyContainer Virtualization" },
        { id: "widget-container", label: "Container" },
        { id: "widget-panel-card", label: "Panel & Card" },
        { id: "widget-window-dialog", label: "Window & Dialog" },
        { id: "widget-lazy", label: "LazyContainer" },
        { id: "widget-text-btn", label: "Text & Button" },
        { id: "widget-image", label: "Image" },
        { id: "widget-indicators", label: "Slider & ProgressBar" },
        { id: "widget-inputs", label: "Input & TextArea" },
        { id: "widget-selection", label: "Checkbox & Switch" },
        { id: "widget-menus", label: "Dropdown & Menu" },
        { id: "custom-shaders", label: "Custom WGSL Shaders" },
        { id: "compositor-blur", label: "Wayland / X11 Compositor Blur" },
    ];

    const autoExpandPathForFile = $((fileId: string) => {
        if (fileId.startsWith("widget-")) {
            expandedPaths.value = {
                ...expandedPaths.value,
                "widgets": true,
            };
            if (["widget-container", "widget-panel-card", "widget-window-dialog", "widget-lazy"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, "widgets": true, "widgets/layout": true };
            } else if (["widget-text-btn", "widget-image", "widget-indicators"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, "widgets": true, "widgets/controls": true };
            } else if (["widget-inputs", "widget-selection", "widget-menus"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, "widgets": true, "widgets/selection": true };
            }
        } else if (fileId.startsWith("arch-")) {
            expandedPaths.value = { ...expandedPaths.value, "architecture": true };
        } else if (["intro", "hello-world"].includes(fileId)) {
            expandedPaths.value = { ...expandedPaths.value, "getting-started": true };
        } else if (["custom-shaders", "compositor-blur"].includes(fileId)) {
            expandedPaths.value = { ...expandedPaths.value, "advanced": true };
        }
    });

    const togglePath = $((path: string) => {
        expandedPaths.value = {
            ...expandedPaths.value,
            [path]: !expandedPaths.value[path],
        };
    });

    const selectFile = $((fileId: string) => {
        activeDoc.value = fileId;
        autoExpandPathForFile(fileId);
    });

    const treeData: TreeNode[] = [
        {
            label: "Getting Started",
            path: "getting-started",
            type: "folder",
            children: [
                { label: "Introduction", path: "getting-started/intro", type: "file", fileId: "intro" },
                { label: "Hello World", path: "getting-started/hello-world", type: "file", fileId: "hello-world" },
            ]
        },
        {
            label: "Architecture",
            path: "architecture",
            type: "folder",
            children: [
                { label: "Overview", path: "architecture/overview", type: "file", fileId: "arch-overview" },
                { label: "Render Pipeline", path: "architecture/render", type: "file", fileId: "arch-render" },
                { label: "Layout Engine", path: "architecture/layout", type: "file", fileId: "arch-layout" },
                { label: "State Management", path: "architecture/state", type: "file", fileId: "arch-state" },
                { label: "LazyContainer Virtualization", path: "architecture/lazy", type: "file", fileId: "arch-lazy" },
            ]
        },
        {
            label: "Widgets",
            path: "widgets",
            type: "folder",
            children: [
                {
                    label: "Layout & Windows",
                    path: "widgets/layout",
                    type: "folder",
                    children: [
                        { label: "Container", path: "widgets/layout/container", type: "file", fileId: "widget-container" },
                        { label: "Panel & Card", path: "widgets/layout/panel-card", type: "file", fileId: "widget-panel-card" },
                        { label: "Window & Dialog", path: "widgets/layout/window-dialog", type: "file", fileId: "widget-window-dialog" },
                        { label: "LazyContainer", path: "widgets/layout/lazy", type: "file", fileId: "widget-lazy" },
                    ]
                },
                {
                    label: "Basic Controls",
                    path: "widgets/controls",
                    type: "folder",
                    children: [
                        { label: "Text & Button", path: "widgets/controls/text-btn", type: "file", fileId: "widget-text-btn" },
                        { label: "Image", path: "widgets/controls/image", type: "file", fileId: "widget-image" },
                        { label: "Slider & ProgressBar", path: "widgets/controls/indicators", type: "file", fileId: "widget-indicators" },
                    ]
                },
                {
                    label: "Inputs & Selection",
                    path: "widgets/selection",
                    type: "folder",
                    children: [
                        { label: "Input & TextArea", path: "widgets/selection/inputs", type: "file", fileId: "widget-inputs" },
                        { label: "Checkbox & Switch", path: "widgets/selection/selection", type: "file", fileId: "widget-selection" },
                        { label: "Dropdown & Menu", path: "widgets/selection/menus", type: "file", fileId: "widget-menus" },
                    ]
                }
            ]
        },
        {
            label: "Advanced Customization",
            path: "advanced",
            type: "folder",
            children: [
                { label: "Custom WGSL Shaders", path: "advanced/shaders", type: "file", fileId: "custom-shaders" },
                { label: "Compositor Blur", path: "advanced/blur", type: "file", fileId: "compositor-blur" },
            ]
        }
    ];

    const searchQuery = useSignal("");

    // Automatically expand tree folders containing search matches
    useTask$(({ track }) => {
        track(() => searchQuery.value);
        const query = searchQuery.value.trim().toLowerCase();
        if (query !== "") {
            const newExpanded = { ...expandedPaths.value };
            
            const checkAndExpand = (nodes: TreeNode[]) => {
                nodes.forEach(node => {
                    if (node.type === "folder") {
                        const matches = node.label.toLowerCase().includes(query) || 
                            (node.children && hasAnyMatch(node.children, query));
                        if (matches) {
                            newExpanded[node.path] = true;
                        }
                        if (node.children) {
                            checkAndExpand(node.children);
                        }
                    }
                });
            };
            
            const hasAnyMatch = (nodes: TreeNode[], q: string): boolean => {
                return nodes.some(n => {
                    if (n.label.toLowerCase().includes(q)) return true;
                    if (n.type === "folder" && n.children) {
                        return hasAnyMatch(n.children, q);
                    }
                    return false;
                });
            };

            checkAndExpand(treeData);
            expandedPaths.value = newExpanded;
        }
    });

    const filteredTree = filterTree(treeData, searchQuery.value);

    // Find current index in pagination sequence
    const currentIndex = docSequence.findIndex(item => item.id === activeDoc.value);
    const prevDoc = currentIndex > 0 ? docSequence[currentIndex - 1] : null;
    const nextDoc = currentIndex < docSequence.length - 1 ? docSequence[currentIndex + 1] : null;

    return (
        <div class="relative min-h-screen bg-[#fbf8ff] text-[#1b1b21]">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-10">
                {/* Breadcrumbs */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-[#767683] hover:text-[#4352a5] transition-colors">Products</a>
                    <span class="text-[#c6c5d3]">/</span>
                    <a href="/products/zenthra" class="text-[#767683] hover:text-[#4352a5] transition-colors">Zenthra</a>
                    <span class="text-[#c6c5d3]">/</span>
                    <span class="text-[#1b1b21]">Documentation</span>
                </div>

                <div class="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Sidebar Navigation - Sidebar Categories */}
                    <aside class="w-full lg:w-68 shrink-0 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto pr-2">
                        <div class="border border-[#c6c5d3] rounded-[4px] bg-white p-3 shadow-sm font-['Inter',sans-serif]">
                            {/* Search bar input */}
                            <div class="mb-3 px-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search docs..."
                                    bind:value={searchQuery}
                                    class="w-full bg-[#f3f1f7] text-xs text-[#1b1b21] pl-7 pr-6 py-1.5 rounded-[4px] border border-transparent focus:border-[#4352a5] focus:bg-white focus:outline-none transition-all placeholder-[#767683]"
                                />
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-[#767683] absolute left-3 top-2.5">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                {searchQuery.value && (
                                    <button
                                        onClick$={() => { searchQuery.value = ""; }}
                                        class="absolute right-3 top-2 text-[#767683] hover:text-[#1b1b21] text-xs font-bold focus:outline-none"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            <nav class="space-y-0.5">
                                {filteredTree.length > 0 ? (
                                    filteredTree.map((node) => (
                                        <TreeNodeView
                                            key={node.path}
                                            node={node}
                                            level={0}
                                            activeDoc={activeDoc}
                                            expandedPaths={expandedPaths}
                                            onToggle={togglePath}
                                            onSelectFile={selectFile}
                                        />
                                    ))
                                ) : (
                                    <div class="py-6 text-center text-xs text-[#767683] font-medium italic">
                                        No matches found
                                    </div>
                                )}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main class="flex-grow max-w-4xl w-full">
                        <article class="prose prose-slate bg-white border border-[#c6c5d3] rounded-[4px] p-6 md:p-10 shadow-sm min-h-[600px] leading-relaxed">
                            
                            {/* Render different dynamic views depending on the activeDoc signal */}
                            {activeDoc.value === "intro" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Introduction</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Welcome to <strong>Zenthra</strong>, a high-performance, design-first, immediate-mode UI framework written in Rust. Zenthra compiles your user interface code down to a flat sequence of WGPU draw calls, offering extreme speed and control.
                                    </p>
                                    <div class="border-l-4 border-[#5c6bc0] bg-[#f5f2fa] p-4 rounded-r-[4px] mb-8 font-['JetBrains_Mono',monospace] text-xs text-[#4352a5]">
                                        // 4ms Input Latency · Zero-Runtime Overhead · Linux, macOS, and Windows.
                                    </div>
                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Why Zenthra?</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Modern GUI toolkits carry massive performance overhead due to browser engines (Webviews) or heavy reactive lifecycle managers. Zenthra compiles down to pure, native code with direct access to GPU pipelines, allowing you to draw smooth animations, frosted glass, and custom shaders at a constant 60+ FPS.
                                    </p>
                                </>
                            )}

                            {activeDoc.value === "hello-world" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Hello World</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        To start a new project with Zenthra, initialize a new Cargo project and add <code>zenthra</code> to your dependencies:
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div><span class="text-[#c792ea]">[dependencies]</span></div>
                                        <div>zenthra = <span class="text-[#98c379]">"0.1.2"</span></div>
                                    </div>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Then, replace the contents of `src/main.rs` with the following:
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-8 overflow-x-auto">
                                        <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                                        <div class="h-2" />
                                        <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                                        <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                                        <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"My App"</span><span class="text-[#bfc9d9] font-bold">)</span></div>
                                        <div class="pl-9"><span class="text-[#61afef]">.size</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">800</span><span class="text-[#bfc9d9]">, </span><span class="text-[#d19a66]">600</span><span class="text-[#bfc9d9] font-bold">)</span></div>
                                        <div class="pl-9"><span class="text-[#61afef]">.with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                                        <div class="pl-13"><span class="text-[#bfc9d9]">ui.container()</span></div>
                                        <div class="pl-17"><span class="text-[#61afef]">.fill</span><span class="text-[#bfc9d9] font-bold">()</span></div>
                                        <div class="pl-17"><span class="text-[#61afef]">.show</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                                        <div class="pl-21"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"Hello Zenthra!"</span><span class="text-[#bfc9d9]">).show();</span></div>
                                        <div class="pl-17"><span class="text-[#bfc9d9]">{"}"});</span></div>
                                        <div class="pl-9"><span class="text-[#bfc9d9]">{"}"})</span></div>
                                        <div class="pl-9"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                                        <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                                    </div>
                                </>
                            )}

                            {/* ── ARCHITECTURE OVERVIEW ── */}
                            {activeDoc.value === "arch-overview" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Architecture Overview</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Zenthra is built from the ground up as a native, hardware-accelerated <strong>immediate-mode</strong> UI framework. Rather than syncing a persistent DOM or widget tree across frames, Zenthra executes the entire user interface closure 60 times a second, building layout hierarchies and scheduling draw primitives dynamically.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">The Lifecycle of a Frame</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Every frame inside a Zenthra application flows through a linear, synchronous loop managed by the core engine. Below is a high-level representation of how events map to GPU pixel presentation:
                                    </p>

                                    <div class="bg-[#071025] text-[#a6b5c5] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-[11px] mb-6 overflow-x-auto leading-relaxed whitespace-pre">
{`+-------------------------------------------------------+
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
+-------------------------------------------------------+`}
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Key Architectural Goals</h2>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                                        <li><strong>Minimal Latency:</strong> Input events directly alter immediate-mode UI state with zero middleman synchronization layers, resulting in sub-4ms response latencies.</li>
                                        <li><strong>Zero Boilerplate:</strong> Retained UI systems force developers to write verbose state listeners. Zenthra allows developers to describe UI structure inline as a direct reflection of current Rust state.</li>
                                        <li><strong>Deterministic Render:</strong> Layout elements are computed and flushed immediately, avoiding rendering lag or layout mismatch bugs.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── RENDERING PIPELINE ── */}
                            {activeDoc.value === "arch-render" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Rendering Pipeline</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Zenthra separates application logic from the graphics card by utilizing a <strong>two-phase rendering model</strong>. This ensures CPU layout calculations never stall the GPU draw queue.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Render Pipeline Execution Flow</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        During the evaluation pass, widgets append intermediate draw primitives to a flat buffer. The WGPU renderer compiles and batches these commands:
                                    </p>

                                    <div class="bg-[#071025] text-[#a6b5c5] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-[11px] mb-6 overflow-x-auto leading-relaxed whitespace-pre">
{`   [DrawCommand List] 
          │
          ├──► RectDraw ────────► SDF WGSL Shader ────┐
          │                                           ├──► WGPU Render Pass ──► GPU Framebuffer
          ├──► TextDraw ────────► Atlas WGSL Shader ──┤
          │                                           │
          └──► BackdropBlur ────► Postprocess Blit ───┘`}
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. CPU Build Pass (Phase 1)</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        As the immediate-mode UI closure executes, builders push variant primitives onto the `draws` list:
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div><span class="text-[#c792ea]">pub enum </span><span class="text-[#61afef]">DrawCommand</span><span class="text-[#bfc9d9]"> {"{"}</span></div>
                                        <div class="pl-4">Rect(RectDraw),</div>
                                        <div class="pl-4">Text(TextDraw),</div>
                                        <div class="pl-4">OverlayRect(OverlayRectDraw),</div>
                                        <div class="pl-4">BackdropBlur(BlurDraw),</div>
                                        <div class="pl-4">CustomPostProcess(CustomDraw),</div>
                                        <div>{"}"}</div>
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. GPU SDF Draw Pass (Phase 2)</h2>
                                    <p class="text-sm text-[#454651]">
                                        Instead of using heavy pixel textures for UI designs, Zenthra draws borders, shadows, and rounded corners dynamically in the fragment shader using <strong>Signed Distance Fields (SDF)</strong>. This guarantees crisp corners at any display resolution or scale factor with minimal memory footprints.
                                    </p>
                                </>
                            )}

                            {/* ── LAYOUT ENGINE ── */}
                            {activeDoc.value === "arch-layout" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Layout Engine</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Zenthra resolves widget dimensions using a <strong>deferred post-compute layout system</strong>. When parent closures execute, children submit size parameters to the parent builder rather than immediate absolute positioning.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Alignment Logic Flow</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Here is how a horizontal row distributes columns post-closure:
                                    </p>

                                    <div class="bg-[#071025] text-[#a6b5c5] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-[11px] mb-6 overflow-x-auto leading-relaxed whitespace-pre">
{`[1] CLOSURE PASS:
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
    +-------------------------------------------------------+`}
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">The Layout Calculation Loop</h2>
                                    <p class="text-sm text-[#454651]">
                                        By deferring absolute coordinates calculations until children sizes are recorded, Zenthra supports advanced features like percentage-based layouts, flexible space alignments, and grid wrap systems in immediate-mode.
                                    </p>
                                </>
                            )}

                            {/* ── STATE MANAGEMENT ── */}
                            {activeDoc.value === "arch-state" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">State Management</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Since immediate-mode code rebuilds the interface every frame, Zenthra persists dynamic parameters (like scroll offsets, text selections, and panel collapse toggles) via an internal state map keyed by stable identifiers (<code>Id</code>).
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Stable ID Hierarchy Mapping</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Identifiers are derived deterministically using structural layout paths:
                                    </p>

                                    <div class="bg-[#071025] text-[#a6b5c5] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-[11px] mb-6 overflow-x-auto leading-relaxed whitespace-pre">
{`Container (Custom ID: Hash("main_dashboard"))
   │
   ├──► Panel #0 (ID: Hash("main_dashboard" + 0)) ──► State Storage Map
   │                                                    ├── Scroll Y: 120.0px
   └──► Panel #1 (ID: Hash("main_dashboard" + 1))      ├── Caret Pos: Index 12
                                                       └── Collapsed: true`}
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Persisted State Handlers</h2>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                                        <li><strong>Scroll Coordinates:</strong> Preserves position offsets inside lists, containers, and virtual lists.</li>
                                        <li><strong>Caret Indication:</strong> Tracks current cursor selections inside inputs.</li>
                                        <li><strong>Animation Frames:</strong> Handles interpolation values for hovers and clicks.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── LAZYCONTAINER VIRTUALIZATION ── */}
                            {activeDoc.value === "arch-lazy" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">LazyContainer Virtualization</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Virtualization is crucial for high-performance dashboards. <code>LazyContainer</code> calculates viewport intersections, executing code closures only for elements that appear in the viewport.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Intersection &amp; Clipping Pass</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        The container intercepts and clips items based on the active scroll offset:
                                    </p>

                                    <div class="bg-[#071025] text-[#a6b5c5] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-[11px] mb-6 overflow-x-auto leading-relaxed whitespace-pre">
{`Virtual Content Bounds (5000px height)
+---------------------------------------+
|  Row 0  (Off-screen - Skip Render)    |
|  Row 1  (Off-screen - Skip Render)    |
+=======================================+ <--- Scroll Y Viewport Top
|  Row 2  (On-screen - Render Child)     |
|  Row 3  (On-screen - Render Child)     | <-- Draw commands clamped to clip_rect
|  Row 4  (On-screen - Render Child)     |
+=======================================+ <--- Viewport Bottom
|  Row 5  (Off-screen - Skip Render)    |
+---------------------------------------+`}
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Calculations Under the Hood</h2>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651]">
                                        <li><strong>Visible Window:</strong> Computes indices using: <code>start_row = (scroll_y / row_height).floor()</code>.</li>
                                        <li><strong>Draw Command Clip:</strong> Modifies target clip rectangle boundaries for all drawn primitives inside the viewport window, preventing elements from bleeding out into parent boundaries.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── CONTAINER WIDGET (FULL DOCUMENTATION) ── */}
                            {activeDoc.value === "widget-container" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Container Widget</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        The <code>Container</code> is the absolute core component for structuring lay-outs in Zenthra. It maps to an SDF-rendered rounded block and manages child flow, alignment, padding, border alignment, hardware drop shadows, and interactive states.
                                    </p>

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-8 overflow-x-auto leading-relaxed">
                                        <div>ui.container()</div>
                                        <div class="pl-4">.width(300.0)</div>
                                        <div class="pl-4">.height(200.0)</div>
                                        <div class="pl-4">.bg(Color::rgb(0.12, 0.12, 0.16))</div>
                                        <div class="pl-4">.radius_all(10.0)</div>
                                        <div class="pl-4">.padding_all(16.0)</div>
                                        <div class="pl-4">.gap(10.0)</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text("Contained Element").show();</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

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
                                        <li><strong><code>.clip(enabled: bool)</code>:</strong> Force-clips any overflowing visual elements to this {"container's"} rounded bounds. Automatically enabled when scrolling is active.</li>
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
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.container()</div>
                                        <div class="pl-4">.width(320.0)</div>
                                        <div class="pl-4">.padding_all(20.0)</div>
                                        <div class="pl-4">.bg(Color::rgba(1.0, 1.0, 1.0, 0.08)) <span class="text-[#6a7b8a]">// semi-transparent white</span></div>
                                        <div class="pl-4">.backdrop_blur(30.0) <span class="text-[#6a7b8a]">// frosted glass blur</span></div>
                                        <div class="pl-4">.radius_all(16.0)</div>
                                        <div class="pl-4">.border(Color::rgba(1.0, 1.0, 1.0, 0.15), 1.5)</div>
                                        <div class="pl-4">.border_alignment(BorderAlignment::Outside)</div>
                                        <div class="pl-4">.shadow(Color::rgba(0.0, 0.0, 0.0, 0.3), 0.0, 8.0, 16.0)</div>
                                        <div class="pl-4">.gap(12.0)</div>
                                        <div class="pl-4">.hover_scale(1.02) <span class="text-[#6a7b8a]">// subtle hover lift</span></div>
                                        <div class="pl-4">.on_click(|| println!(<span class="text-[#98c379]">"Card Clicked!"</span>))</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"Zenthra Card"</span>).size(18.0).bold().show();</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"GPU-accelerated immediate mode box component."</span>)</div>
                                        <div class="pl-12">.size(12.0)</div>
                                        <div class="pl-12">.color(Color::rgb(0.7, 0.7, 0.7))</div>
                                        <div class="pl-12">.show();</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>
                                </>
                            )}

                            {activeDoc.value === "widget-lazy" && (
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
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.lazy_container()</div>
                                        <div class="pl-4">.id(<span class="text-[#98c379]">"database_rows"</span>)</div>
                                        <div class="pl-4">.count(<span class="text-[#d19a66]">100_000</span>)</div>
                                        <div class="pl-4">.item_size(<span class="text-[#d19a66]">280.0</span>, <span class="text-[#d19a66]">48.0</span>)</div>
                                        <div class="pl-4">.gap(<span class="text-[#d19a66]">8.0</span>)</div>
                                        <div class="pl-4">.column()</div>
                                        <div class="pl-4">.show(|ui, index| {"{"}</div>
                                        <div class="pl-8">ui.card()</div>
                                        <div class="pl-12">.padding(<span class="text-[#d19a66]">8.0</span>)</div>
                                        <div class="pl-12">.show(|ui| {"{"}</div>
                                        <div class="pl-16">ui.text(&amp;format!(<span class="text-[#98c379]">"Entry #{}"</span>, index)).show();</div>
                                        <div class="pl-12">{"}"});</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

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
                            )}

                            {/* ── PANEL & CARD WIDGETS ── */}
                            {activeDoc.value === "widget-panel-card" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Panel &amp; Card</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        The <code>Card</code> and <code>Panel</code> widgets are high-level structural cells designed to divide layouts into clean dashboard panels or information blocks.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Card Widget</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        A layout container that behaves exactly like an unstyled <code>Container</code> by default (zero padding, transparent background, and no shadows) for fully predictable layout rendering. You can configure styles and hover animations using chainable builder methods.
                                    </p>

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.card()</div>
                                        <div class="pl-4">.width(300.0)</div>
                                        <div class="pl-4">.bg(Color::rgb(0.15, 0.15, 0.18))</div>
                                        <div class="pl-4">.border(Color::rgb(0.25, 0.25, 0.3), 1.0)</div>
                                        <div class="pl-4">.radius(12.0)</div>
                                        <div class="pl-4">.hover_scale(1.04)</div>
                                        <div class="pl-4">.hover_bg(Color::rgb(0.18, 0.18, 0.22))</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"Premium Card Content"</span>).show();</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

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

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.panel()</div>
                                        <div class="pl-4">.title(<span class="text-[#98c379]">"System Diagnostics"</span>)</div>
                                        <div class="pl-4">.subtitle(<span class="text-[#98c379]">"Real-time CPU temperatures"</span>)</div>
                                        <div class="pl-4">.collapsible(<span class="text-[#d19a66]">true</span>)</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"Core 0: 42°C"</span>).show();</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

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
                                        <li><strong><code>.collapsed(state: &amp;mut bool)</code>:</strong> Binds external mutable boolean states for state persistence across widgets.</li>
                                    </ul>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Panel Aesthetics &amp; Style</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.bg(color: Color)</code>:</strong> Sets the panel body background color.</li>
                                        <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Configures panel border outline color and line thickness.</li>
                                        <li><strong><code>.radius(r: f32)</code>:</strong> Sets uniform corner radius on the outer boundaries.</li>
                                        <li><strong><code>.shadow(color: Color, x: f32, y: f32, blur: f32)</code>:</strong> Soft panel shadow offset coordinates and blur values.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── WINDOW & DIALOG WIDGETS ── */}
                            {activeDoc.value === "widget-window-dialog" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Window &amp; Dialog</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Overlay layout components that represent separate, floatable task scopes or blocking alert triggers.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Floating Window</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Renders a draggable floating window overlay using <code>FloatingWindowBuilder</code>. It manages z-index depth sorting automatically, promoting the active clicked window to the top. Tracks drag offset handles in immediate mode state trees.
                                    </p>

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.window(<span class="text-[#98c379]">"Control Panel"</span>, &amp;mut is_open, &amp;mut position)</div>
                                        <div class="pl-4">.size(400.0, 300.0)</div>
                                        <div class="pl-4">.bg(Color::rgb(0.1, 0.1, 0.12))</div>
                                        <div class="pl-4">.border(Color::rgb(0.3, 0.3, 0.35), 1.0)</div>
                                        <div class="pl-4">.radius_all(8.0)</div>
                                        <div class="pl-4">.closable(<span class="text-[#d19a66]">true</span>)</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"Floating Window Workspace"</span>).show();</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

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

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.window(<span class="text-[#98c379]">"Confirm Action"</span>, &amp;mut is_open, &amp;mut position)</div>
                                        <div class="pl-4">.size(340.0, 200.0)</div>
                                        <div class="pl-4">.modal(<span class="text-[#d19a66]">true</span>)</div>
                                        <div class="pl-4">.closable(<span class="text-[#d19a66]">false</span>)</div>
                                        <div class="pl-4">.show(|ui| {"{"}</div>
                                        <div class="pl-8">ui.text(<span class="text-[#98c379]">"Are you sure you want to delete this file?"</span>).show();</div>
                                        <div class="pl-8">if ui.button(<span class="text-[#98c379]">"Confirm"</span>).bg(Color::rgb(0.8, 0.2, 0.2)).show().clicked {"{"}</div>
                                        <div class="pl-12 text-[#6a7b8a]">// Execute confirm delete</div>
                                        <div class="pl-8">{"}"}</div>
                                        <div class="pl-4">{"}"});</div>
                                    </div>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Modal Behaviors</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.modal(enabled: bool)</code>:</strong> Toggle modal status. When true, renders a dark overlay (<code>Color::rgba(0.0, 0.0, 0.0, 0.4)</code>) covering the entire window viewport behind the active dialog.</li>
                                        <li><strong>Blocking Interactions:</strong> Blocks and ignores all mouse inputs directed at elements outside the dialog box boundaries.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── TEXT & BUTTON WIDGETS ── */}
                            {activeDoc.value === "widget-text-btn" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Text &amp; Button</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        The <code>Text</code> and <code>Button</code> widgets represent the absolute core interface layers for displaying typographic logs and capturing user click interactions.
                                    </p>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Text Widget</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Renders hardware-accelerated text using GPU-uploaded font atlases. Supports inline markdown-like highlights, multi-line paragraph wrapping, custom typography styles, and background card properties.
                                    </p>

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>ui.text(<span class="text-[#98c379]">"Welcome to Zenthra"</span>)</div>
                                        <div class="pl-4">.size(24.0)</div>
                                        <div class="pl-4">.bold()</div>
                                        <div class="pl-4">.color(Color::rgb(0.9, 0.9, 0.9))</div>
                                        <div class="pl-4">.monospace()</div>
                                        <div class="pl-4">.show();</div>
                                    </div>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Typography &amp; Style</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.size(s: f32)</code>:</strong> Sets the font size of the characters in logical pixels.</li>
                                        <li><strong><code>.color(c: Color)</code>:</strong> Sets the foreground fill color of the text.</li>
                                        <li><strong><code>.weight(w: FontWeight)</code>:</strong> Binds a custom font weight structure (e.g. <code>FontWeight::Light</code>).</li>
                                        <li><strong><code>.bold()</code>:</strong> Shortcut builder setting font weight to bold.</li>
                                        <li><strong><code>.italic()</code>:</strong> Applies italic character skew styles.</li>
                                        <li><strong><code>.family(f: impl Into&lt;String&gt;)</code>:</strong> Binds a custom system font family name.</li>
                                        <li><strong><code>.monospace()</code>:</strong> Shortcut configuring system monospace typography.</li>
                                        <li><strong><code>.line_height(factor: f32)</code>:</strong> Sets line spacing height factor multiplier.</li>
                                        <li><strong><code>.highlight(color: Color)</code>:</strong> Custom background overlay color for text highlights.</li>
                                    </ul>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Position &amp; Layout</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.pos(x: f32, y: f32)</code>:</strong> Force-positions text bounds to absolute screen coordinates.</li>
                                        <li><strong><code>.min_width(w: f32)</code>:</strong> Sets lower boundary width for wrapping.</li>
                                        <li><strong><code>.max_width(w: f32)</code>:</strong> Sets wrapping trigger boundary width.</li>
                                        <li><strong><code>.fill_x(enabled: bool)</code>:</strong> Toggle to consume full parent container width.</li>
                                        <li><strong><code>.align(alignment: Align)</code>:</strong> Aligns paragraph blocks (Left, Center, Right).</li>
                                        <li><strong><code>.wrap(strategy: TextWrap)</code>:</strong> Text line-wrapping strategy (e.g., <code>TextWrap::Wrap</code>).</li>
                                        <li><strong><code>.ellipsis(enabled: bool)</code>:</strong> Toggles trailing dots (<code>...</code>) when character bounds overflow.</li>
                                    </ul>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Background &amp; Box Container</h3>
                                    <p class="text-sm text-[#454651] mb-3">
                                        Apply background styling directly onto the text block bounding box:
                                    </p>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.bg(color: Color)</code>:</strong> Draws a background color box behind the text.</li>
                                        <li><strong><code>.padding(t, r, b, l)</code>:</strong> Spacing boundaries inside the background container.</li>
                                        <li><strong><code>.padding_all(p: f32)</code>:</strong> Uniform padding around the text content.</li>
                                        <li><strong><code>.margin(t, r, b, l)</code>:</strong> Outer margin offset boundaries to advance cursor position.</li>
                                        <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Renders outlines with defined logical pixel widths.</li>
                                        <li><strong><code>.radius_all(r: f32)</code>:</strong> Corner radii settings. Can use specific sides like <code>.radius_top(r)</code>.</li>
                                        <li><strong><code>.shadow(color, x, y, blur)</code>:</strong> Soft background box drop shadow.</li>
                                        <li><strong><code>.opacity(o: f32)</code>:</strong> Alpha channel transparency of the entire text element.</li>
                                    </ul>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Mouse &amp; Schedule</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-8">
                                        <li><strong><code>.cursor(c: CursorIcon)</code>:</strong> Custom pointer shapes (Default, Text, Pointer, Crosshair, ColResize).</li>
                                        <li><strong><code>.render_mode(mode: RenderMode)</code>:</strong> Directs repaint schedules (Static or Continuous).</li>
                                    </ul>

                                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Button Widget</h2>
                                    <p class="text-sm text-[#454651] mb-4">
                                        A click listener container that wraps a label. Tracks hover and clicked state triggers inside immediate mode scopes.
                                    </p>

                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto leading-relaxed">
                                        <div>if ui.button(<span class="text-[#98c379]">"Submit Form"</span>)</div>
                                        <div class="pl-4">.width(140.0)</div>
                                        <div class="pl-4">.bg(Color::rgb(0.2, 0.4, 0.8))</div>
                                        <div class="pl-4">.hover_bg(Color::rgb(0.25, 0.45, 0.85))</div>
                                        <div class="pl-4">.radius_all(4.0)</div>
                                        <div class="pl-4">.show()</div>
                                        <div class="pl-4">.clicked</div>
                                        <div>{"{"}</div>
                                        <div class="pl-4 text-[#6a7b8a]">// Execute submit actions</div>
                                        <div>{"}"}</div>
                                    </div>

                                    <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Button Builder Methods</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li><strong><code>.width(w: f32)</code>:</strong> Fixes logical width layout bounds.</li>
                                        <li><strong><code>.height(h: f32)</code>:</strong> Fixes logical height layout bounds.</li>
                                        <li><strong><code>.bg(color: Color)</code>:</strong> Sets default background color.</li>
                                        <li><strong><code>.hover_bg(color: Color)</code>:</strong> Background color override when mouse is over button.</li>
                                        <li><strong><code>.active_bg(color: Color)</code>:</strong> Background color override while pressed.</li>
                                        <li><strong><code>.radius_all(r: f32)</code>:</strong> Uniform roundness of button edges.</li>
                                        <li><strong><code>.padding_all(p: f32)</code>:</strong> Inner padding offsets surrounding the label.</li>
                                        <li><strong><code>.on_click(closure)</code>:</strong> Inline callback closure executed when the button is clicked.</li>
                                    </ul>
                                </>
                            )}

                            {activeDoc.value === "widget-image" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Image</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Highly-optimized asynchronous image rendering widget. Loads image files or memory bytes in the background without blocking the rendering thread.
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-8 overflow-x-auto">
                                        <div>ui.image(ImageSource::Path("assets/photo.jpg"))</div>
                                        <div class="pl-4">.width(200.0)</div>
                                        <div class="pl-4">.height(200.0)</div>
                                        <div class="pl-4">.radius(8.0)</div>
                                        <div class="pl-4">.show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">ImageSource options</h3>
                                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                                        <li>`ImageSource::Path(&str)` — Load from host disk path.</li>
                                        <li>`ImageSource::Bytes(&[u8])` — Load from raw embedded bytes (e.g. `include_bytes!`).</li>
                                        <li>`ImageSource::Thumbnail(&str)` — Asynchronous thumbnail generator.</li>
                                    </ul>
                                </>
                            )}

                            {activeDoc.value === "widget-indicators" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Slider &amp; ProgressBar</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Numeric tracking and progress controls.
                                    </p>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Slider</h3>
                                    <p class="text-sm text-[#454651] mb-4">Allows draggable numeric value selections within a specified minimum and maximum range.</p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.slider(&mut value, "slider_id").range(0.0, 100.0).show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">ProgressBar</h3>
                                    <p class="text-sm text-[#454651] mb-4">Renders a visual indicator displaying completion progression from `0.0` to `1.0`.</p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.progress_bar(0.65).show();</div>
                                    </div>
                                </>
                            )}

                            {/* ── INPUTS & SELECTION ── */}
                            {activeDoc.value === "widget-inputs" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Inputs &amp; TextAreas</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Zenthra handles interactive text inputs using mutable string references:
                                    </p>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Input (Single Line)</h3>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.input(&mut input_str).placeholder("Enter text...").show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">TextArea (Multi Line)</h3>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-8 overflow-x-auto">
                                        <div>ui.text_area(&mut text_str).height(200.0).show();</div>
                                    </div>
                                </>
                            )}

                            {activeDoc.value === "widget-selection" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Checkbox, Switch &amp; Radio</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Selection controls representing boolean options.
                                    </p>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Checkbox</h3>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.checkbox(&mut is_checked, "Remember Me").show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Toggle Switch</h3>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.toggle(&mut enable_mode).label("Enable Accelerator").show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Radio Button</h3>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.radio(active_index == 1, "Choice 1").show();</div>
                                    </div>
                                </>
                            )}

                            {activeDoc.value === "widget-menus" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Dropdown &amp; Menu</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Choice lists and contextual menu bars.
                                    </p>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Dropdown</h3>
                                    <p class="text-sm text-[#454651] mb-4">A standard selection button that displays a list of choices when pressed.</p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.dropdown(&mut selected_option, &["Option A", "Option B"]).show();</div>
                                    </div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Menu</h3>
                                    <p class="text-sm text-[#454651] mb-4">Renders drop-down action menus for navigation bars or right-click options.</p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-4 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>ui.menu(&["Open File", "Save", "Close"]).show();</div>
                                    </div>
                                </>
                            )}

                            {/* ── ADVANCED CUSTOMIZATION ── */}
                            {activeDoc.value === "custom-shaders" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Custom WGSL Shaders</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        Zenthra allows developer-written WGSL fragment shaders to be dynamically loaded onto layout containers. Use the `.register_custom_shader()` API on window start:
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-6 overflow-x-auto">
                                        <div>App::new()</div>
                                        <div class="pl-4">.register_custom_shader("wave", include_str!("wave.wgsl"))</div>
                                        <div class="pl-4">.with_ui(|ui| {"{"}</div>
                                        <div class="pl-8">ui.container()</div>
                                        <div class="pl-12">.post_process_shader("wave")</div>
                                        <div class="pl-12">.show(|ui| {"{ ... }"});</div>
                                        <div class="pl-4">{"}"})</div>
                                    </div>
                                    <p class="text-sm text-[#454651] mb-4">
                                        Custom post-processors receive a `BackdropUniforms` block containing layout metrics and elapsed timeline values:
                                    </p>
                                    <div class="bg-[#071025] text-[#bfc9d9] p-5 rounded-[6px] font-['JetBrains_Mono',monospace] text-xs mb-8 overflow-x-auto">
                                        <div>struct BackdropUniforms {"{"}</div>
                                        <div class="pl-4">radius: vec4&lt;f32&gt;,</div>
                                        <div class="pl-4">rect_pos: vec2&lt;f32&gt;,</div>
                                        <div class="pl-4">rect_size: vec2&lt;f32&gt;,</div>
                                        <div class="pl-4">screen_size: vec2&lt;f32&gt;,</div>
                                        <div class="pl-4">time: f32,</div>
                                        <div>{"}"}</div>
                                    </div>
                                </>
                            )}

                            {activeDoc.value === "compositor-blur" && (
                                <>
                                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Wayland / X11 Compositor Blur</h1>
                                    <p class="text-base text-[#454651] mb-6">
                                        To enable hardware blurred window backgrounds automatically under Linux compositors, Zenthra supports native background request protocols:
                                    </p>
                                    <ul class="list-disc pl-5 space-y-3 text-sm text-[#454651] mb-8">
                                        <li><strong>KDE Plasma (Wayland/X11):</strong> Communicates with KWin using the `org_kde_kwin_blur` protocol extension and interning `_KDE_NET_WM_BLUR_BEHIND_REGION` window flags.</li>
                                        <li><strong>GNOME (Wayland):</strong> Standard background blur requests are sent to Mutter compositors requesting background effect shaders.</li>
                                    </ul>
                                </>
                            )}

                            {/* ── PAGINATION FOOTER ── */}
                            <div class="mt-12 pt-6 border-t border-[#e9e7ef] flex justify-between gap-4">
                                {prevDoc ? (
                                    <button
                                        onClick$={() => selectFile(prevDoc.id)}
                                        class="flex flex-col text-left py-2 px-4 rounded-[4px] hover:bg-[#e9e7ef]/30 text-[#4352a5] border border-[#c6c5d3] max-w-[220px] w-full cursor-pointer select-none transition-all"
                                    >
                                        <span class="text-[10px] text-[#767683] uppercase font-bold mb-1">Previous</span>
                                        <span class="text-sm font-semibold truncate">{prevDoc.label}</span>
                                    </button>
                                ) : (
                                    <div class="max-w-[220px] w-full" />
                                )}

                                {nextDoc ? (
                                    <button
                                        onClick$={() => selectFile(nextDoc.id)}
                                        class="flex flex-col text-right py-2 px-4 rounded-[4px] hover:bg-[#e9e7ef]/30 text-[#4352a5] border border-[#c6c5d3] max-w-[220px] w-full cursor-pointer select-none transition-all ml-auto"
                                    >
                                        <span class="text-[10px] text-[#767683] uppercase font-bold mb-1">Next</span>
                                        <span class="text-sm font-semibold truncate">{nextDoc.label}</span>
                                    </button>
                                ) : (
                                    <div class="max-w-[220px] w-full ml-auto" />
                                )}
                            </div>

                        </article>
                    </main>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Documentation — Zenthra UI Framework",
    meta: [
        { name: "description", content: "Explore tutorials, API guides, and architecture manuals for Zenthra UI framework." },
    ],
};
