import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface CrateInfo {
    name: string;
    desc: string;
    version: string;
}

const CRATES: CrateInfo[] = [
    {
        name: "zenthra",
        desc: "The main umbrella crate coordinating themes, layout, platform backend, widgets, and animation.",
        version: "0.1.1",
    },
    {
        name: "zenthra-widgets",
        desc: "Complete suite of ready-to-use controls (buttons, inputs, lists, sliders, dialogs).",
        version: "0.1.1",
    },
    {
        name: "zenthra-platform",
        desc: "Coordinates multi-window handling, cursor tracking, and device event translation.",
        version: "0.1.1",
    },
    {
        name: "zenthra-animation",
        desc: "High-fidelity spring physics, easing functions, and timeline transition managers.",
        version: "0.1.1",
    },
    {
        name: "zenthra-theme",
        desc: "Adaptive palette provider, color style configurations, and contrast-based accessibility styles.",
        version: "0.1.1",
    },
    {
        name: "zenthra-layout",
        desc: "Taffy-powered flexbox layout computing grids and tree coordinates.",
        version: "0.1.1",
    },
    {
        name: "zenthra-text",
        desc: "Dynamic text layout, paragraph layout boxes, and multi-font glyph shaper.",
        version: "0.1.1",
    },
    {
        name: "zenthra-render",
        desc: "Low-level GPU draw list compiler pipeline and platform OpenGL context binders.",
        version: "0.1.1",
    },
    {
        name: "zenthra-input",
        desc: "Low-level mouse, keyboard, and touch event mapping and dispatchers.",
        version: "0.1.1",
    },
    {
        name: "zenthra-core",
        desc: "Core main window loops, state threads, and cross-thread synchronization primitives.",
        version: "0.1.1",
    },
    {
        name: "zenthra-state",
        desc: "Reactive state management primitives with deterministic component layout IDs.",
        version: "0.1.1",
    },
];

export default component$(() => {
    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* ── Hero ── */}
            <div class="mb-16 border-b border-[#c6c5d3] pb-12">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Zenthra Labs · Open Source
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl lg:text-5xl font-bold text-[#1b1b21] leading-tight mb-4">
                    Building in public. Building for speed.
                </h1>
                <p class="text-[#454651] text-base leading-relaxed max-w-2xl">
                    All core crates and layout engines under the Zenthra framework are open source under the MIT and Apache 2.0 licenses. Join us in forging the future of immediate-mode desktop and mobile UI rendering.
                </p>
            </div>

            {/* ── Crate Registry Grid ── */}
            <div class="mb-20">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] mb-2">Core Registry Packages</h2>
                        <p class="text-xs text-[#767683]">Individual cargo crates published and maintained by Zenthra Labs.</p>
                    </div>
                    <a
                        href="https://crates.io/teams/github:kabirajpan:zenthra-publishers"
                        target="_blank"
                        rel="noopener"
                        class="px-4 py-2 border border-[#c6c5d3] hover:bg-[#e9e7ef] text-sm font-medium rounded-[4px] transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto"
                    >
                        crates.io Team
                    </a>
                </div>

                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {CRATES.map((c) => (
                        <div
                            key={c.name}
                            class="bg-white border border-[#c6c5d3] rounded-[4px] p-5 flex flex-col justify-between hover:border-[#4352a5] transition-all group"
                        >
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                    <span class="font-['JetBrains_Mono',monospace] text-sm font-bold text-[#1b1b21] group-hover:text-[#4352a5] transition-colors">
                                        {c.name}
                                    </span>
                                    <span class="px-2 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-[#e9e7ef] text-[#767683] rounded-[4px]">
                                        v{c.version}
                                    </span>
                                </div>
                                <p class="text-[#454651] text-xs leading-relaxed mb-6">{c.desc}</p>
                            </div>
                            <div class="flex gap-4">
                                <a
                                    href={`https://crates.io/crates/${c.name}`}
                                    target="_blank"
                                    rel="noopener"
                                    class="text-[11px] font-['JetBrains_Mono',monospace] font-bold text-[#5c6bc0] hover:text-[#4352a5] transition-colors flex items-center gap-1"
                                >
                                    crates.io →
                                </a>
                                <a
                                    href={`https://github.com/kabirajpan/zenthra-v2/tree/main/crates/${c.name}`}
                                    target="_blank"
                                    rel="noopener"
                                    class="text-[11px] font-['JetBrains_Mono',monospace] font-bold text-[#767683] hover:text-[#1b1b21] transition-colors flex items-center gap-1"
                                >
                                    source →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Architecture & Philosophy ── */}
            <div class="grid grid-cols-12 gap-8 lg:gap-12 items-center mb-20 border-t border-[#c6c5d3] pt-20">
                <div class="col-span-12 lg:col-span-6 space-y-6">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#1b1b21]">High-Performance Rust Architecture</h2>
                    <p class="text-sm text-[#454651] leading-relaxed">
                        Zenthra's core pipeline decouples system multi-window event loops from the main UI thread. Layout is computed on a dedicated thread using specialized coordinate buffers, passing binary draw commands straight to low-level OpenGL/Vulkan contexts.
                    </p>
                    <p class="text-sm text-[#454651] leading-relaxed">
                        This guarantees that heavy computation, network requests, or disk indexing processes never cause keyframe dropped frames or micro-stuttering in animations.
                    </p>
                    <div class="flex gap-4 pt-2">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                            <span class="text-xs font-['JetBrains_Mono',monospace] text-[#454651]">MIT Licensed</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                            <span class="text-xs font-['JetBrains_Mono',monospace] text-[#454651]">Apache 2.0 Licensed</span>
                        </div>
                    </div>
                </div>

                {/* Code Block */}
                <div class="col-span-12 lg:col-span-6">
                    <div class="bg-[#071025] rounded-[6px] overflow-hidden shadow-xl font-['JetBrains_Mono',monospace] w-full">
                        <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                            <span class="ml-3 text-[11px] text-[#9aa6e0]">examples/hello_zenthra.rs</span>
                        </div>
                        <div class="p-5 text-[10px] sm:text-[12px] leading-relaxed flex flex-col gap-0.5 text-white/90 overflow-x-auto">
                            <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                            <div class="h-2" />
                            <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                            <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                            <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"Open Source Zenthra"</span><span class="text-[#bfc9d9]">)</span></div>
                            <div class="pl-9"><span class="text-[#61afef] font-bold">.with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                            <div class="pl-13"><span class="text-[#bfc9d9]">ui.container()</span></div>
                            <div class="pl-17"><span class="text-[#61afef]">.fill</span><span class="text-[#bfc9d9]">()</span></div>
                            <div class="pl-17"><span class="text-[#61afef]">.bg</span><span class="text-[#bfc9d9]">(colors.bg_base)</span></div>
                            <div class="pl-17"><span class="text-[#61afef]">.show</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                            <div class="pl-21"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"Built with open source primitives."</span><span class="text-[#bfc9d9]">).show();</span></div>
                            <div class="pl-17"><span class="text-[#bfc9d9]">{"}"});</span></div>
                            <div class="pl-9"><span class="text-[#bfc9d9]">{"}"})</span></div>
                            <div class="pl-9"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                            <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sub CTA Banner ── */}
            <div class="bg-[#071025] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Want to contribute?</h2>
                    <p class="text-[#9aa6e0] text-sm">We welcome code contributions, issue reports, and documentation improvements.</p>
                </div>
                <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a
                        href="https://github.com/kabirajpan/zenthra-v2"
                        target="_blank"
                        rel="noopener"
                        class="py-2.5 px-6 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-colors shadow-lg shadow-[#5c6bc0]/25"
                    >
                        GitHub Repository
                    </a>
                    <a href="/products" class="py-2.5 px-6 border border-white/20 text-white hover:bg-white/10 font-medium rounded-[4px] text-sm transition-colors">
                        View Products
                    </a>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Open Source Registry — Zenthra Labs",
    meta: [
        { name: "description", content: "Join Zenthra Labs in building high-performance, immediate-mode layout, styling, and graphics crates for Rust in public." },
    ],
};
