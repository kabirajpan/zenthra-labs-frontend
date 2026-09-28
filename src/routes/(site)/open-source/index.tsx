import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface CrateInfo {
    name: string;
    desc: string;
    version: string;
}

interface FlagshipRepo {
    name: string;
    repo: string;
    category: string;
    license: string;
    description: string;
    starsBadge?: string;
    links: { label: string; href: string; external?: boolean }[];
    tech: string[];
}

const FLAGSHIP_REPOS: FlagshipRepo[] = [
    {
        name: "Zenthra GUI Framework",
        repo: "kabirajpan/zenthra-v2",
        category: "Native Graphics & UI",
        license: "MIT / Apache 2.0",
        description: "High-performance, immediate-mode Rust UI framework with custom WGPU/OpenGL rendering, multi-windowing, dynamic widgets, spring physics, and Taffy flexbox layout with zero runtime bloat.",
        tech: ["Rust", "WGPU", "OpenGL", "Taffy", "Cross-Platform"],
        links: [
            { label: "GitHub", href: "https://github.com/kabirajpan/zenthra-v2", external: true },
            { label: "crates.io", href: "https://crates.io/crates/zenthra", external: true },
            { label: "Documentation", href: "/products/zenthra/docs/" },
        ],
    },
    {
        name: "Zenthree Desktop IDE",
        repo: "kabirajpan/zenthree",
        category: "Developer Tools & Editor",
        license: "Apache 2.0",
        description: "Lightweight, GPU-accelerated desktop code editor built from scratch in Rust on the Zenthra GUI engine. Instant startup, Tree-sitter semantic syntax, native PTY terminal shell, and integrated AI assistant sidecar.",
        tech: ["Rust", "Zenthra GUI", "Tree-sitter", "PTY Shell", "sRGB True Color"],
        links: [
            { label: "GitHub", href: "https://github.com/kabirajpan/zenthree", external: true },
            { label: "Product Page", href: "/products/zenthra/apps/zenthree" },
            { label: "Download", href: "/products/zenthra/apps/zenthree/download" },
        ],
    },
    {
        name: "ZENE: Neuromorphic Coding Agent",
        repo: "kabirajpan/zene",
        category: "Agent Intelligence & Neurocomputing",
        license: "Apache 2.0",
        description: "Autonomous multi-turn Rust coding agent governed by an embedded 500-neuron Drosophila connectome. Sub-15µs involuntary safety gates, AST-bound tool masking, 13 native tools, and 3-tier skill architecture.",
        tech: ["Rust", "Connectome RNN", "Tree-sitter AST", "Gemini & Groq", "L1 Cache"],
        links: [
            { label: "GitHub", href: "https://github.com/kabirajpan/zene", external: true },
            { label: "Product Details", href: "/products/zene" },
            { label: "Research Paper", href: "/research/biological-connectomes" },
        ],
    },
];

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
        <main class="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-primary)] transition-colors duration-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 font-sans">
                
                {/* ── Hero Section ── */}
                <header class="mb-14 sm:mb-20 border-b border-[var(--theme-border)] pb-10 sm:pb-14">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs font-['JetBrains_Mono',monospace] font-semibold text-[var(--theme-accent-text)] uppercase tracking-wider rounded-[4px] mb-4 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>ZenthraLabs · Open Source Ecosystem</span>
                    </div>

                    <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[var(--theme-text-primary)] mb-4">
                        Building in public. Engineering for extreme speed.
                    </h1>

                    <p class="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-3xl mb-8">
                        All core GUI frameworks, developer tools, autonomous agent intelligence, and neuromorphic research kernels under ZenthraLabs are open source under permissive MIT and Apache 2.0 licenses. 100% Rust, zero telemetry, and local-first architecture.
                    </p>

                    {/* Quick Metric Chips */}
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div class="p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] text-center shadow-xs">
                            <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-[var(--theme-text-primary)]">3 Pillars</div>
                            <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Framework · IDE · Agent</div>
                        </div>
                        <div class="p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] text-center shadow-xs">
                            <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-[var(--theme-accent-text)]">11 Crates</div>
                            <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">crates.io Registry</div>
                        </div>
                        <div class="p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] text-center shadow-xs">
                            <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400">100% Rust</div>
                            <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Zero Runtime Bloat</div>
                        </div>
                        <div class="p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] text-center shadow-xs">
                            <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-purple-700 dark:text-purple-400">&lt; 15 µs</div>
                            <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Connectome Reflex Gate</div>
                        </div>
                    </div>
                </header>

                {/* ── Flagship Repositories Showcase ── */}
                <section class="mb-16 sm:mb-24">
                    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-1">
                                Primary Codebases
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                                Flagship Open Source Projects
                            </h2>
                        </div>
                        <a
                            href="https://github.com/kabirajpan"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-xs font-['JetBrains_Mono',monospace] font-bold text-[var(--theme-accent-text)] hover:underline flex items-center gap-1 self-start sm:self-auto"
                        >
                            <span>Explore GitHub Profile</span>
                            <span>&rarr;</span>
                        </a>
                    </div>

                    <div class="grid md:grid-cols-3 gap-6">
                        {FLAGSHIP_REPOS.map((project) => (
                            <div
                                key={project.repo}
                                class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[6px] p-6 flex flex-col justify-between hover:border-[var(--theme-border-hover)] hover:-translate-y-1 transition-all duration-200 shadow-xs group"
                            >
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
                                        <span class="text-[10px] uppercase tracking-wider text-[var(--theme-accent-text)] font-semibold">
                                            {project.category}
                                        </span>
                                        <span class="px-2 py-0.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[10px] text-[var(--theme-text-muted)]">
                                            {project.license}
                                        </span>
                                    </div>

                                    <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-text)] transition-colors">
                                        {project.name}
                                    </h3>

                                    <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Tag Pills */}
                                    <div class="flex flex-wrap gap-1.5 pt-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                class="px-2 py-0.5 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[10px] font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div class="pt-6 mt-6 border-t border-[var(--theme-border)] flex flex-wrap items-center gap-3">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            class={`text-xs font-['JetBrains_Mono',monospace] font-bold transition-all flex items-center gap-1 ${
                                                link.label === "GitHub"
                                                    ? "px-3 py-1.5 rounded bg-[var(--theme-accent)] text-white hover:brightness-110 shadow-xs"
                                                    : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent-text)]"
                                            }`}
                                        >
                                            {link.label === "GitHub" && (
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            )}
                                            <span>{link.label}</span>
                                            {link.label !== "GitHub" && <span>&rarr;</span>}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Crate Registry Grid ── */}
                <section class="mb-16 sm:mb-24">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-1">
                                Modular Crates
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[var(--theme-text-primary)] mb-1">
                                Core Registry Packages
                            </h2>
                            <p class="text-xs text-[var(--theme-text-secondary)]">
                                Published Rust crates on crates.io, independently versioned and verified.
                            </p>
                        </div>
                        <a
                            href="https://crates.io/teams/github:kabirajpan:zenthra-publishers"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-4 py-2 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] text-xs font-['JetBrains_Mono',monospace] font-semibold text-[var(--theme-text-primary)] rounded-[4px] transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-xs"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span>crates.io Publisher Team</span>
                        </a>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {CRATES.map((c) => (
                            <div
                                key={c.name}
                                class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[6px] p-5 flex flex-col justify-between hover:border-[var(--theme-border-hover)] transition-all group shadow-xs"
                            >
                                <div>
                                    <div class="flex items-center justify-between mb-2.5">
                                        <span class="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-text)] transition-colors">
                                            {c.name}
                                        </span>
                                        <span class="px-2 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-[var(--theme-bg)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] rounded-[4px]">
                                            v{c.version}
                                        </span>
                                    </div>
                                    <p class="text-[var(--theme-text-secondary)] text-xs leading-relaxed mb-5">{c.desc}</p>
                                </div>
                                <div class="flex gap-4 pt-3 border-t border-[var(--theme-border)]">
                                    <a
                                        href={`https://crates.io/crates/${c.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-[11px] font-['JetBrains_Mono',monospace] font-bold text-[var(--theme-accent-text)] hover:underline transition-colors flex items-center gap-1"
                                    >
                                        crates.io &rarr;
                                    </a>
                                    <a
                                        href={`https://github.com/kabirajpan/zenthra-v2/tree/main/crates/${c.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-[11px] font-['JetBrains_Mono',monospace] font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors flex items-center gap-1"
                                    >
                                        source &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Open Neurocomputing & Connectome Research Callout ── */}
                <section class="mb-16 sm:mb-24 p-6 sm:p-10 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-xs">
                    <div class="grid lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-8 space-y-3">
                            <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-[10px] font-['JetBrains_Mono',monospace] font-semibold uppercase tracking-wider">
                                Open Science &amp; Connectomics
                            </div>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                                Drosophila Neural Connectome in Rust
                            </h2>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                We believe safety in autonomous agents should be grounded in biological neuroscience rather than heuristic prompt engineering. Our 500-neuron connectome binary (154 KB, 3,889 synapses) and 30-step Euler numerical integration loop are completely open source.
                            </p>
                            <div class="flex flex-wrap gap-4 text-xs font-['JetBrains_Mono',monospace] pt-2">
                                <span class="text-purple-600 dark:text-purple-400 font-semibold">&lt; 15 µs execution</span>
                                <span>·</span>
                                <span>Zero external runtimes</span>
                                <span>·</span>
                                <span>CPU L1 cache resident</span>
                            </div>
                        </div>
                        <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                            <a
                                href="/research/biological-connectomes"
                                class="py-2.5 px-4 bg-[var(--theme-accent)] text-white text-xs font-['JetBrains_Mono',monospace] font-semibold rounded text-center hover:brightness-110 transition-all shadow-xs"
                            >
                                Read Research Report &rarr;
                            </a>
                            <a
                                href="/products/zene"
                                class="py-2.5 px-4 border border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text-primary)] text-xs font-['JetBrains_Mono',monospace] font-semibold rounded text-center hover:bg-[var(--theme-surface-hover)] transition-all"
                            >
                                Explore ZENE Agent
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Architecture & Philosophy ── */}
                <section class="grid grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24 border-t border-[var(--theme-border)] pt-12 sm:pt-20">
                    <div class="col-span-12 lg:col-span-6 space-y-6">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block">
                            Core Architecture
                        </span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold text-[var(--theme-text-primary)]">
                            Zero-Overhead Rust Design
                        </h2>
                        <p class="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                            Zenthra's core pipeline decouples system multi-window event loops from the main UI thread. Layout is computed on a dedicated thread using specialized coordinate buffers, passing binary draw commands straight to low-level OpenGL/Vulkan contexts.
                        </p>
                        <p class="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                            Similarly, ZENE decouples AST parsing and reflex safety gating from cloud LLM network latencies, keeping execution deterministic and instant.
                        </p>
                        <div class="flex gap-6 pt-2">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-primary)] font-semibold">MIT License</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-primary)] font-semibold">Apache 2.0 License</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span class="text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-primary)] font-semibold">Zero Telemetry</span>
                            </div>
                        </div>
                    </div>

                    {/* Code Block Container */}
                    <div class="col-span-12 lg:col-span-6">
                        <div class="bg-[#071025] border border-white/10 rounded-[6px] overflow-hidden shadow-xl font-['JetBrains_Mono',monospace] w-full">
                            <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050b1a]">
                                <div class="flex items-center gap-1.5">
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                    <span class="ml-3 text-[11px] text-slate-400 font-semibold">examples/zenthra_agent.rs</span>
                                </div>
                                <span class="text-[10px] text-purple-400">Pure Rust</span>
                            </div>
                            <div class="p-5 text-[11px] sm:text-[12px] leading-relaxed flex flex-col gap-0.5 text-slate-300 overflow-x-auto">
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zene</span><span class="text-[#bfc9d9]">::create_agent_for_workspace;</span></div>
                                <div class="h-2" />
                                <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() -&gt; Result&lt;()&gt; {"{"}</span></div>
                                <div class="pl-4 text-slate-500">// 1. Launch 100Hz connectome agent</div>
                                <div class="pl-4"><span class="text-[#c792ea]">let </span><span class="text-[#bfc9d9]">agent = create_agent_for_workspace(</span><span class="text-[#98c379]">"./"</span><span class="text-[#bfc9d9]">)?;</span></div>
                                <div class="h-1" />
                                <div class="pl-4 text-slate-500">// 2. Initialize immediate-mode UI</div>
                                <div class="pl-4"><span class="text-[#bfc9d9]">App::new()</span></div>
                                <div class="pl-8"><span class="text-[#61afef]">.with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                                <div class="pl-12"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"ZenthraLabs Open Source"</span><span class="text-[#bfc9d9]">).show();</span></div>
                                <div class="pl-8"><span class="text-[#bfc9d9]">{"}"})</span></div>
                                <div class="pl-8"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                                <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Sub CTA Banner ── */}
                <footer class="bg-[#071025] dark:bg-[#0e1017] border border-[#071025] dark:border-[#1e2230] rounded-[6px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-lg">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Want to build with us?</h2>
                        <p class="text-[#9aa6e0] dark:text-[#94a3b8] text-sm max-w-xl">
                            We welcome code contributions, issue reports, AST grammar bindings, and connectome neural network benchmarks.
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-3 justify-center md:justify-start shrink-0">
                        <a
                            href="https://github.com/kabirajpan"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="py-2.5 px-6 bg-[var(--theme-accent)] hover:brightness-110 text-white font-medium rounded-[4px] text-xs sm:text-sm transition-all shadow-md font-['JetBrains_Mono',monospace]"
                        >
                            GitHub Organization
                        </a>
                        <a
                            href="/products"
                            class="py-2.5 px-6 border border-white/20 dark:border-[#1e2230] text-white font-medium rounded-[4px] text-xs sm:text-sm hover:bg-white/10 transition-colors font-['JetBrains_Mono',monospace]"
                        >
                            View Products Catalog
                        </a>
                    </div>
                </footer>

            </div>
        </main>
    );
});

export const head: DocumentHead = {
    title: "Open Source Ecosystem — ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "Explore ZenthraLabs open-source repositories: Zenthra GUI framework, Zenthree IDE, ZENE neuromorphic coding agent, and 11 published Rust crates."
        },
        { property: "og:title", content: "Open Source Ecosystem — ZenthraLabs" },
        { property: "og:description", content: "Building in public. Engineering for extreme speed. Explore our open source Rust frameworks, IDE, and neuromorphic AI agent." },
        { property: "og:type", content: "website" },
    ],
};
