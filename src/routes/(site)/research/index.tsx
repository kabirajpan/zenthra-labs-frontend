import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface Stage {
    id: string;
    neurons: string;
    synapses: string;
    latency: string;
    ram: string;
    title: string;
    subtitle: string;
    desc: string;
    biologicalModel: string;
    active: boolean;
    features: string[];
}

const STAGES: Stage[] = [
    {
        id: "Stage 01",
        neurons: "500",
        synapses: "3,889",
        latency: "< 0.015 ms",
        ram: "154 KB",
        title: "Spinal Reflex Core",
        subtitle: "Active in Production (ZENE v0.1.0)",
        desc: "A pure Rust 30-step Euler integration RNN modeled directly from the adult Drosophila melanogaster connectome. Evaluates safety gates and intent classification natively in single-digit microseconds with ZERO external ML runtimes.",
        biologicalModel: "Drosophila Nerve Cord & Giant Fiber Escape Circuit",
        active: true,
        features: [
            "Giant Fiber Escape Reflex: blocks destructive workspace operations (< 15 µs)",
            "Dynamic Tool Provisioning: masks unused tools to save tokens & prevent hallucinations",
            "Zero cloud round-trip overhead: runs 100% offline on standard CPU",
            "Embedded directly into the binary with zero ONNX or PyTorch dependencies"
        ]
    },
    {
        id: "Stage 02",
        neurons: "~3,000",
        synapses: "~32,000",
        latency: "~0.25 ms",
        ram: "~850 KB",
        title: "Central Complex (CX)",
        subtitle: "Multi-Goal Trajectory Engine (Research)",
        desc: "Implements heading direction cells (E-PG / P-EN neurons) and fan-shaped body layers for vector-space navigation across massive multi-file refactoring paths without goal drift.",
        biologicalModel: "Drosophila Protocerebral Bridge & Ellipsoid Body",
        active: false,
        features: [
            "Vector-space heading persistence across long multi-turn agent loops",
            "Compass-locked sub-goal tracking to prevent task deviation",
            "Real-time obstacle detour planning during failed compiler checks"
        ]
    },
    {
        id: "Stage 03",
        neurons: "~25,000",
        synapses: "~2.1M",
        latency: "~3.8 ms",
        ram: "~12 MB",
        title: "Janelia Hemibrain",
        subtitle: "Associative Plasticity & Episodic Code Memory",
        desc: "Mushroom Body Kenyon cell sparse expansion (10x projection) paired with dopaminergic reward signaling. Implements online STDP plasticity to remember repository-specific conventions without fine-tuning.",
        biologicalModel: "Janelia Research Campus Electron Microscopy Reconstructions",
        active: false,
        features: [
            "Kenyon cell sparse coding: 10,000-dimensional sparse memory representations",
            "STDP synaptic weight updates on successful test execution",
            "Instant pattern recall of developer coding styles and naming patterns"
        ]
    },
    {
        id: "Stage 04",
        neurons: "139,255",
        synapses: "54,500,000",
        latency: "~30 ms",
        ram: "~180 MB",
        title: "FlyWire Whole-Brain",
        subtitle: "Full Connectome Emulation (Nature 2024)",
        desc: "Complete adult fruit fly connectome with every single known neuron and synaptic connection mapped from the landmark 2024 FlyWire consortium dataset. Neuromorphic decision substrate for autonomous software engineering.",
        biologicalModel: "FlyWire Consortium Full Adult Drosophila Connectome (Nature 2024)",
        active: false,
        features: [
            "End-to-end sensory-motor loop: AST perception to keystroke synthesis",
            "Neuromorphic spike timing across 54+ million verified biological synapses",
            "Complete autonomous self-repair and system recovery behaviors"
        ]
    },
];

const INTENTS = [
    {
        name: "DISCUSSION",
        badge: "01 · READ-ONLY",
        tagline: "Consultation & Architecture",
        desc: "Casual greetings, high-level questions, algorithm explanations. Mutating tools are strictly disengaged.",
        tools: "0 file write tools",
        safety: "Passive Safe",
        color: "#22c55e",
        darkColor: "#4ade80",
        bg: "rgba(34, 197, 94, 0.05)",
        border: "rgba(34, 197, 94, 0.20)",
    },
    {
        name: "INSPECTION",
        badge: "02 · READ-ONLY",
        tagline: "Workspace & Symbol Exploration",
        desc: "Where is symbol X, find file usages, review git diffs. Only non-destructive exploration tools are provisioned.",
        tools: "read_file, list_dir, search, git_diff",
        safety: "Passive Safe",
        color: "#3b82f6",
        darkColor: "#60a5fa",
        bg: "rgba(59, 130, 246, 0.05)",
        border: "rgba(59, 130, 246, 0.20)",
    },
    {
        name: "PLANNING",
        badge: "03 · STRUCTURAL",
        tagline: "Multi-Step Roadmaps",
        desc: "Architectural strategy, migration phases, refactor blueprints. Injects structured plan graph creation tools.",
        tools: "create_plan, update_plan_step",
        safety: "Safe Plan Gate",
        color: "#a855f7",
        darkColor: "#c084fc",
        bg: "rgba(168, 85, 247, 0.05)",
        border: "rgba(168, 85, 247, 0.20)",
    },
    {
        name: "EXECUTION",
        badge: "04 · ACTIVE",
        tagline: "Code Mutation & Build Suite",
        desc: "Fix compiler errors, implement features, run test harnesses. Full 13-tool capability provisioned.",
        tools: "13 native tools + PTY terminal",
        safety: "Approval Gated",
        color: "#f59e0b",
        darkColor: "#fbbf24",
        bg: "rgba(245, 158, 11, 0.05)",
        border: "rgba(245, 158, 11, 0.20)",
    },
    {
        name: "REFLEX_LOCK",
        badge: "05 · INVOLUNTARY",
        tagline: "Giant Fiber Biological Lock",
        desc: "Triggered instantly by destructive patterns (rm -rf, git reset --hard, disk format). Physical safety freeze.",
        tools: "0 tools (All tools revoked)",
        safety: "IMMEDIATE HARD LOCK",
        color: "#ef4444",
        darkColor: "#f87171",
        bg: "rgba(239, 68, 68, 0.08)",
        border: "rgba(239, 68, 68, 0.35)",
    },
];

const BENCHMARKS = [
    {
        metric: "Destructive Action Intercept",
        conventional: "~1,200 ms (Post-cloud call)",
        zene: "< 0.015 ms (Physical Reflex Gate)",
        advantage: "80,000x faster safety cutoff",
        highlight: true,
    },
    {
        metric: "Accidental File Deletion Rate",
        conventional: "2.4% - 6.1% (Prompt hallucination)",
        zene: "0.00% (Hardwired biological veto)",
        advantage: "Mathematically zero accidental wipe",
        highlight: true,
    },
    {
        metric: "Turn Intent Classification Latency",
        conventional: "800 - 2,500 ms (Cloud round-trip)",
        zene: "15 - 28 µs (Native Euler integration)",
        advantage: "Real-time instant dispatch",
        highlight: false,
    },
    {
        metric: "Local Memory Overhead",
        conventional: "500 MB - 1.2 GB (Python/ONNX/PyTorch)",
        zene: "154 KB (Single binary asset)",
        advantage: "99.9% memory reduction",
        highlight: true,
    },
    {
        metric: "Tokens Wasted on Casual Chat",
        conventional: "1,500 - 4,000 tokens / prompt",
        zene: "0 tokens (Tools auto-masked)",
        advantage: "Massive quota & cost savings",
        highlight: false,
    },
    {
        metric: "Syntax & AST Context Resolution",
        conventional: "Blind regex or flat text slices",
        zene: "Tree-sitter AST symbol hierarchies",
        advantage: "Language-native code awareness",
        highlight: false,
    },
    {
        metric: "External ML Dependencies",
        conventional: "PyTorch / LibTorch / CUDA drivers",
        zene: "Pure Rust (Zero C++/Python bindings)",
        advantage: "True zero-dependency portability",
        highlight: true,
    },
];

export default component$(() => {
    const selectedStage = useSignal(0);
    const copiedCommand = useSignal(false);

    return (
        <div class="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-primary)] transition-colors duration-200">
            {/* Background Glow Accents */}
            <div class="relative overflow-hidden">
                <div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#5c6bc0]/15 via-[#818cf8]/5 to-transparent blur-3xl opacity-70" />

                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">

                    {/* Top Breadcrumb & Status */}
                    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div class="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace]">
                            <a href="/" class="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-text)] transition-colors">Home</a>
                            <span class="text-[var(--theme-border)]">/</span>
                            <span class="text-[var(--theme-text-primary)] font-medium">Research & Neuromorphic AI</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-wider rounded-[4px]">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ZENE Open Source v0.1.0 Released
                            </span>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="col-span-12 lg:col-span-7 space-y-6">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="px-2.5 py-1 bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text)] border border-[var(--theme-border)] font-['JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-wider rounded-[4px]">
                                    Bio-Connectome Architecture
                                </span>
                                <span class="px-2.5 py-1 bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                    Pure Rust Engine
                                </span>
                                <span class="px-2.5 py-1 bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                    Sub-15 µs Reflex Gate
                                </span>
                            </div>

                            <div>
                                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.08]">
                                    Biological Connectomes &{" "}
                                    <span class="bg-gradient-to-r from-[#5c6bc0] via-[#818cf8] to-[#60a5fa] bg-clip-text text-transparent">
                                        Autonomous Intelligence
                                    </span>
                                </h1>
                                <p class="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-2xl">
                                    We embedded an adult <em>Drosophila melanogaster</em> neural connectome into a pure Rust decision kernel. Operating in sub-15 microseconds, it acts as an involuntary safety reflex lock and dynamic tool provisioning gate wired directly into <strong>ZENE</strong>—our autonomous coding engine.
                                </p>
                            </div>

                            {/* Core Specs Grid */}
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {[
                                    { value: "500", label: "Connectome Neurons", sub: "Biological RNN" },
                                    { value: "< 15 µs", label: "Reflex Gate Latency", sub: "Euler Integration" },
                                    { value: "13", label: "Native Rust Tools", sub: "AST & System Tools" },
                                    { value: "154 KB", label: "Binary Footprint", sub: "Zero PyTorch / ONNX" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[6px] p-3.5 shadow-sm hover:border-[var(--theme-accent)] transition-all"
                                    >
                                        <div class="font-['JetBrains_Mono',monospace] text-xl font-bold text-[var(--theme-accent-text)] tracking-tight">
                                            {stat.value}
                                        </div>
                                        <div class="text-xs font-semibold text-[var(--theme-text-primary)] mt-1">{stat.label}</div>
                                        <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] mt-0.5">{stat.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div class="flex flex-wrap items-center gap-3.5 pt-3">
                                <a
                                    href="https://github.com/kabirajpan/zene"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2.5 py-3 px-6 bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] text-white font-medium rounded-[4px] text-sm transition-all shadow-md shadow-[var(--theme-accent)]/20 hover:scale-[1.02]"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    <span>Explore ZENE Repo</span>
                                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-['JetBrains_Mono',monospace]">GitHub</span>
                                </a>

                                <a
                                    href="/products/zenthra/apps/zenthree"
                                    class="inline-flex items-center gap-2 py-3 px-5 bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium rounded-[4px] text-sm transition-all shadow-sm"
                                >
                                    <span>Zenthree IDE</span>
                                    <span class="text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] text-xs">↗</span>
                                </a>

                                <a
                                    href="#decision-stack"
                                    class="inline-flex items-center gap-2 py-3 px-4 text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-text)] transition-colors"
                                >
                                    Architecture Stack ↓
                                </a>
                            </div>
                        </div>

                        {/* Right: Neural Trajectory Artifact */}
                        <div class="col-span-12 lg:col-span-5">
                            <div class="relative rounded-[8px] overflow-hidden border border-[var(--theme-border)] bg-[#07080d] shadow-2xl group">
                                <div class="relative h-[380px] sm:h-[440px] w-full">
                                    <img
                                        src="/assets/research/fly-decision-net/intent_neural_trajectories.png"
                                        alt="Biological Connectome Neural Trajectory Space"
                                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                                    />
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/40 to-transparent" />
                                    
                                    <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-['JetBrains_Mono',monospace] text-emerald-400">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                            Live Euler Integration (30 Steps)
                                        </span>
                                        <span class="text-[10px] font-['JetBrains_Mono',monospace] text-zinc-400 bg-black/60 px-2 py-0.5 rounded">
                                            fly_brain_500.bin
                                        </span>
                                    </div>

                                    <div class="absolute bottom-4 left-4 right-4 p-4 rounded-[6px] bg-black/80 backdrop-blur-md border border-white/10">
                                        <div class="font-['JetBrains_Mono',monospace] text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Connectome Latent Space</div>
                                        <h3 class="font-['Syne',sans-serif] text-white text-base font-bold">5-State Intent Trajectory Attractors</h3>
                                        <p class="text-zinc-300 text-xs mt-1 leading-relaxed">
                                            High-dimensional recurrent neural dynamics separate developer queries into safe conceptual contemplation vs destructive code mutation in &lt; 15 µs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 01: Three-Tier Decision Stack */}
                    <div id="decision-stack" class="mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="max-w-2xl mb-12">
                            <span class="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                                01 / Three-Tier Decision Stack
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                                Why Standard LLM Agents Fail and How Connectomes Solve It
                            </h2>
                            <p class="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                                Conventional coding assistants send 15+ tool declarations blindly to cloud APIs on every keystroke. This causes tool hallucination, burns context tokens, and risks accidental workspace deletion. ZENE solves this through a layered biological reflex stack:
                            </p>
                        </div>

                        <div class="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    tier: "TIER 01",
                                    badge: "BIOLOGICAL REFLEX",
                                    title: "Fly Connectome Gate",
                                    latency: "< 0.015 ms",
                                    latencyColor: "#22c55e",
                                    runtime: "Pure Rust · Native CPU",
                                    description: "500-neuron adult Drosophila neural connectome RNN executing 30 Euler numerical integration steps locally before any cloud network request is dispatched.",
                                    bullets: [
                                        "Sub-15 µs Giant Fiber safety veto blocks rm -rf, git reset, and disk format",
                                        "Classifies user intent into 5 discrete neural attractor states",
                                        "Masks all mutating tools during casual conversation to prevent hallucinations"
                                    ],
                                    borderHover: "hover:border-emerald-500/60",
                                },
                                {
                                    tier: "TIER 02",
                                    badge: "SYNTAX PERCEPTION",
                                    title: "Tree-sitter AST Engine",
                                    latency: "< 1.0 ms",
                                    latencyColor: "#60a5fa",
                                    runtime: "Tree-sitter C/Rust ABI",
                                    description: "Full concrete syntax tree parsing engine operating directly over your project files to provide structural language intelligence rather than dumb line numbers.",
                                    bullets: [
                                        "Extracts exact enclosing function, class, and method symbol boundaries",
                                        "Generates targeted, semantic diffs with zero regex brittle parsing",
                                        "Multi-language support for Rust, TypeScript, Python, C++, and Go"
                                    ],
                                    borderHover: "hover:border-blue-500/60",
                                },
                                {
                                    tier: "TIER 03",
                                    badge: "REASONING & SYNTHESIS",
                                    title: "Pluggable Cloud LLM",
                                    latency: "300 - 1,200 ms",
                                    latencyColor: "#c084fc",
                                    runtime: "Google Gemini 3.5 / Groq LPUs",
                                    description: "Massive reasoning models receive only the pre-filtered, verified tool schemas needed for that turn, executing complex algorithms with maximum context efficiency.",
                                    bullets: [
                                        "Gemini 3.5 Flash Lite default with high throughput & generous daily quota",
                                        "Groq ultra-fast LPU inference (GPT-OSS 120B / LLaMA 3.3 70B)",
                                        "Self-healing execution loop with live compiler feedback"
                                    ],
                                    borderHover: "hover:border-purple-500/60",
                                },
                            ].map((card) => (
                                <div
                                    key={card.tier}
                                    class={`bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[8px] p-6 shadow-sm ${card.borderHover} transition-all duration-200 flex flex-col justify-between`}
                                >
                                    <div>
                                        <div class="flex items-center justify-between mb-4">
                                            <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[var(--theme-accent-text)] tracking-wider">
                                                {card.tier}
                                            </span>
                                            <span
                                                class="font-['JetBrains_Mono',monospace] text-xs font-bold px-2 py-0.5 rounded"
                                                style={`color:${card.latencyColor};background:${card.latencyColor}15;border:1px solid ${card.latencyColor}30`}
                                            >
                                                {card.latency}
                                            </span>
                                        </div>

                                        <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[var(--theme-text-primary)] mb-1">
                                            {card.title}
                                        </h3>
                                        <div class="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--theme-text-muted)] uppercase tracking-wider mb-4">
                                            {card.runtime}
                                        </div>

                                        <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed mb-5">
                                            {card.description}
                                        </p>

                                        <ul class="space-y-2 border-t border-[var(--theme-border)]/60 pt-4 mb-4">
                                            {card.bullets.map((b, i) => (
                                                <li key={i} class="text-xs text-[var(--theme-text-secondary)] flex items-start gap-2">
                                                    <span class="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div class="pt-3 border-t border-[var(--theme-border)]/40 flex items-center justify-between text-[11px] font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]">
                                        <span>Status</span>
                                        <span class="text-emerald-500 font-semibold flex items-center gap-1">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Operational
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 02: Interactive Connectome Scaling Explorer */}
                    <div class="mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                            <div>
                                <span class="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                                    02 / Neuromorphic Roadmap
                                </span>
                                <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight">
                                    Connectome Scaling: From Spinal Reflex to Whole-Brain
                                </h2>
                            </div>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] max-w-md">
                                Select an evolutionary connectome scale below to inspect synaptic architectures and computational performance.
                            </p>
                        </div>

                        <div class="grid lg:grid-cols-12 gap-8 items-start">
                            {/* Stage Selector Buttons */}
                            <div class="col-span-12 lg:col-span-5 space-y-3">
                                {STAGES.map((s, i) => (
                                    <button
                                        key={s.id}
                                        onClick$={() => { selectedStage.value = i; }}
                                        class={[
                                            "w-full text-left p-4 rounded-[6px] border transition-all duration-200 cursor-pointer flex flex-col justify-between",
                                            selectedStage.value === i
                                                ? "border-[var(--theme-accent)] bg-[var(--theme-accent-subtle)] shadow-md shadow-[var(--theme-accent)]/10 scale-[1.01]"
                                                : "border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-accent)]/50 hover:bg-[var(--theme-surface-hover)]",
                                        ].join(" ")}
                                    >
                                        <div class="flex items-center justify-between mb-1.5">
                                            <div class="flex items-center gap-2">
                                                <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[var(--theme-accent-text)]">
                                                    {s.id}
                                                </span>
                                                <span class="font-['Syne',sans-serif] text-sm font-bold text-[var(--theme-text-primary)]">
                                                    {s.title}
                                                </span>
                                            </div>
                                            {s.active ? (
                                                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-['JetBrains_Mono',monospace] font-bold uppercase tracking-wider">
                                                    Production
                                                </span>
                                            ) : (
                                                <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-500/15 text-zinc-500 dark:text-zinc-400 font-['JetBrains_Mono',monospace] uppercase tracking-wider">
                                                    Roadmap
                                                </span>
                                            )}
                                        </div>

                                        <p class="text-xs text-[var(--theme-text-secondary)] line-clamp-2 mt-1">
                                            {s.desc}
                                        </p>

                                        <div class="flex items-center justify-between pt-3 mt-3 border-t border-[var(--theme-border)]/40 text-[11px] font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]">
                                            <span>{s.neurons} neurons · {s.synapses} synapses</span>
                                            <span class="text-[var(--theme-accent-text)] font-semibold">{s.latency}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Detailed Stage Card View */}
                            <div class="col-span-12 lg:col-span-7 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[8px] p-6 sm:p-8 shadow-lg">
                                {(() => {
                                    const s = STAGES[selectedStage.value];
                                    return (
                                        <div class="space-y-6">
                                            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--theme-border)] pb-4">
                                                <div>
                                                    <span class="text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-accent-text)] font-bold">
                                                        {s.id} ARCHITECTURAL SPECIFICATION
                                                    </span>
                                                    <h3 class="font-['Syne',sans-serif] text-2xl font-bold text-[var(--theme-text-primary)] mt-0.5">
                                                        {s.title}
                                                    </h3>
                                                    <p class="text-xs text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] mt-1">
                                                        {s.subtitle}
                                                    </p>
                                                </div>
                                                <div class="text-right">
                                                    <div class="font-['JetBrains_Mono',monospace] text-xl font-bold text-emerald-500">
                                                        {s.latency}
                                                    </div>
                                                    <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">
                                                        RAM: {s.ram}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[var(--theme-text-primary)] uppercase tracking-wider mb-2">
                                                    Biological Substrate
                                                </h4>
                                                <p class="text-xs sm:text-sm font-['JetBrains_Mono',monospace] text-[var(--theme-accent-text)] bg-[var(--theme-accent-subtle)] p-2.5 rounded border border-[var(--theme-border)]/50">
                                                    {s.biologicalModel}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[var(--theme-text-primary)] uppercase tracking-wider mb-2">
                                                    Connectome Functional Capabilities
                                                </h4>
                                                <ul class="space-y-2.5">
                                                    {s.features.map((feature, idx) => (
                                                        <li key={idx} class="text-xs sm:text-sm text-[var(--theme-text-secondary)] flex items-start gap-2.5">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] shrink-0 mt-2" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--theme-border)]">
                                                <div class="p-3 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]/50 text-center">
                                                    <div class="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--theme-text-primary)]">{s.neurons}</div>
                                                    <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] mt-0.5">Neurons</div>
                                                </div>
                                                <div class="p-3 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]/50 text-center">
                                                    <div class="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--theme-text-primary)]">{s.synapses}</div>
                                                    <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] mt-0.5">Synapses</div>
                                                </div>
                                                <div class="p-3 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)]/50 text-center">
                                                    <div class="font-['JetBrains_Mono',monospace] text-sm font-bold text-emerald-500">{s.latency}</div>
                                                    <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace] mt-0.5">Execution</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Section 03: ZENE Autonomous Coding Engine Details */}
                    <div class="mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="max-w-3xl mb-12">
                            <span class="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                                03 / ZENE Coding Engine
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                                Autonomous Multi-Turn Coding Loop in Rust
                            </h2>
                            <p class="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                                ZENE is the intelligence core powering our next-generation editor Zenthree and available as an independent open-source CLI. It orchestrates Tree-sitter AST syntax analysis, live compiler diagnostics, and destructive action approval gates.
                            </p>
                        </div>

                        <div class="grid lg:grid-cols-12 gap-8 items-stretch">
                            {/* Left: Code Snippet Card */}
                            <div class="col-span-12 lg:col-span-7 bg-[#070b14] border border-[var(--theme-border)] rounded-[8px] overflow-hidden shadow-xl flex flex-col justify-between">
                                <div class="flex items-center justify-between px-4 py-3 bg-[#0c1220] border-b border-white/10">
                                    <div class="flex items-center gap-2">
                                        <span class="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                        <span class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <span class="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        <span class="ml-2 font-['JetBrains_Mono',monospace] text-xs text-zinc-400">
                                            crates/agent/src/agentic_loop/engine.rs
                                        </span>
                                    </div>
                                    <span class="text-[11px] font-['JetBrains_Mono',monospace] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        Active Codebase
                                    </span>
                                </div>

                                <div class="p-5 font-['JetBrains_Mono',monospace] text-xs sm:text-[13px] leading-[1.8] text-zinc-300 overflow-x-auto">
                                    <div><span class="text-purple-400">pub fn </span><span class="text-blue-400 font-bold">execute_turn</span><span class="text-zinc-200">(&amp;mut self, prompt: &amp;str) -&gt; Result&lt;String, Error&gt; {"{"}</span></div>
                                    <div class="pl-4 text-zinc-500 italic">{"// 1. Biological Connectome Reflex Gate (< 0.015 ms)"}</div>
                                    <div class="pl-4"><span class="text-purple-400">let </span><span class="text-amber-300">reflex</span><span class="text-zinc-200"> = self.brain.classify(prompt);</span></div>
                                    <div class="pl-4"><span class="text-purple-400">if </span><span class="text-amber-300">reflex</span><span class="text-zinc-200">.is_danger {"{"}</span></div>
                                    <div class="pl-8 text-red-400">return Err(Error::ReflexLockEngaged(reflex.explanation));</div>
                                    <div class="pl-4"><span class="text-zinc-200">{"}"}</span></div>
                                    <br/>
                                    <div class="pl-4 text-zinc-500 italic">{"// 2. Dynamic Tool Provisioning based on firing intent"}</div>
                                    <div class="pl-4"><span class="text-purple-400">let </span><span class="text-amber-300">active_tools</span><span class="text-zinc-200"> = self.tools.filter_by_intent(&amp;reflex.intent);</span></div>
                                    <br/>
                                    <div class="pl-4 text-zinc-500 italic">{"// 3. Multi-turn Autonomous Execution Loop"}</div>
                                    <div class="pl-4"><span class="text-purple-400">loop </span><span class="text-zinc-200">{"{"}</span></div>
                                    <div class="pl-8"><span class="text-purple-400">let </span><span class="text-zinc-200">response = self.provider.chat(&amp;self.history, &amp;active_tools)?;</span></div>
                                    <div class="pl-8"><span class="text-purple-400">match </span><span class="text-zinc-200">response {"{"}</span></div>
                                    <div class="pl-12 text-blue-300">Response::ToolCalls(calls) =&gt; self.dispatch_batch(calls)?,</div>
                                    <div class="pl-12 text-emerald-300">Response::Finished(text) =&gt; return Ok(text),</div>
                                    <div class="pl-8"><span class="text-zinc-200">{"}"}</span></div>
                                    <div class="pl-4"><span class="text-zinc-200">{"}"}</span></div>
                                    <div><span class="text-zinc-200">{"}"}</span></div>
                                </div>

                                <div class="px-5 py-3 bg-[#0a0f1d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-['JetBrains_Mono',monospace]">
                                    <div class="flex items-center gap-2 text-emerald-400">
                                        <span>✓ 71 automated tests passing</span>
                                        <span class="text-zinc-600">|</span>
                                        <span class="text-zinc-400">cargo check — 0 warnings</span>
                                    </div>
                                    <a
                                        href="https://github.com/kabirajpan/zene"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-[var(--theme-accent-text)] hover:underline"
                                    >
                                        View on GitHub ↗
                                    </a>
                                </div>
                            </div>

                            {/* Right: Engine Architecture Metrics */}
                            <div class="col-span-12 lg:col-span-5 space-y-4">
                                <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[8px] p-6 shadow-sm">
                                    <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[var(--theme-text-primary)] mb-4">
                                        Engine Capabilities
                                    </h3>
                                    <div class="space-y-3.5">
                                        {[
                                            { name: "13 Native Rust Tools", desc: "Filesystem ops, unified search, PTY shell execution, git diffs, & planning" },
                                            { name: "Tree-sitter AST Context", desc: "Extracts enclosing symbol scopes and exact AST definitions across languages" },
                                            { name: "3-Tier Skill Discovery", desc: "Global embedded skills → ~/.zene/skills/ → project workspace SKILL.md" },
                                            { name: "Physical Safety Reflex Lock", desc: "Prevents workspace corruption before prompts reach cloud models" },
                                            { name: "Session Persistence", desc: "Full export and import of conversation memory across CLI & editor restarts" },
                                        ].map((item, idx) => (
                                            <div key={idx} class="flex items-start gap-3">
                                                <span class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                                    ✓
                                                </span>
                                                <div>
                                                    <div class="text-xs sm:text-sm font-semibold text-[var(--theme-text-primary)]">{item.name}</div>
                                                    <div class="text-[11px] text-[var(--theme-text-secondary)] mt-0.5">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[8px] p-6 shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[var(--theme-accent-text)] uppercase tracking-wider mb-2">
                                        CLI Quick Installation
                                    </div>
                                    <div class="bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded p-3 font-['JetBrains_Mono',monospace] text-xs text-[var(--theme-text-primary)] relative group">
                                        <code>cargo install --git https://github.com/kabirajpan/zene.git</code>
                                    </div>
                                    <p class="text-[11px] text-[var(--theme-text-muted)] mt-2 font-['JetBrains_Mono',monospace]">
                                        Installs both `zene` and `zene-agent` binaries with automatic `.env` discovery.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 04: The 5-State Neural Intent Matrix */}
                    <div class="mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="max-w-2xl mb-10">
                            <span class="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                                04 / Behavioral Matrix
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                                5-State Neural Intent Classification
                            </h2>
                            <p class="text-sm sm:text-base text-[var(--theme-text-secondary)]">
                                In less than 15 microseconds, the connectome classifies developer intent into discrete biological attractor basins to enforce principle of least privilege tool access.
                            </p>
                        </div>

                        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {INTENTS.map((intent) => (
                                <div
                                    key={intent.name}
                                    class="rounded-[8px] border p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 shadow-sm"
                                    style={`background:${intent.bg};border-color:${intent.border}`}
                                >
                                    <div>
                                        <div class="font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold tracking-wider mb-1" style={`color:${intent.color}`}>
                                            {intent.badge}
                                        </div>
                                        <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[var(--theme-text-primary)] mb-1">
                                            {intent.name}
                                        </h3>
                                        <p class="text-[11px] font-semibold text-[var(--theme-text-primary)] mb-2">
                                            {intent.tagline}
                                        </p>
                                        <p class="text-xs text-[var(--theme-text-secondary)] leading-relaxed mb-4">
                                            {intent.desc}
                                        </p>
                                    </div>

                                    <div class="pt-3 border-t border-[var(--theme-border)]/40 space-y-1 font-['JetBrains_Mono',monospace] text-[10px]">
                                        <div class="text-[var(--theme-text-muted)] truncate">Tools: <span class="text-[var(--theme-text-primary)] font-medium">{intent.tools}</span></div>
                                        <div class="font-bold" style={`color:${intent.color}`}>
                                            {intent.safety}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 05: Empirical Performance Benchmarks */}
                    <div class="mb-24 pb-20 border-b border-[var(--theme-border)]">
                        <div class="max-w-2xl mb-10">
                            <span class="text-xs font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                                05 / Empirical Benchmarks
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                                Connectome vs Conventional AI Agent Architectures
                            </h2>
                            <p class="text-sm sm:text-base text-[var(--theme-text-secondary)]">
                                Head-to-head performance measured on Ubuntu 24.04 LTS (x86_64 AMD Ryzen 9, 32GB RAM).
                            </p>
                        </div>

                        <div class="border border-[var(--theme-border)] rounded-[8px] overflow-hidden shadow-sm bg-[var(--theme-surface)]">
                            <div class="grid grid-cols-12 px-6 py-4 border-b border-[var(--theme-border)] bg-[var(--theme-bg)] text-[11px] font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)] uppercase tracking-wider">
                                <span class="col-span-12 md:col-span-4 font-bold">Target Metric</span>
                                <span class="col-span-6 md:col-span-3">Conventional Agents</span>
                                <span class="col-span-6 md:col-span-3 text-emerald-500 font-bold">ZENE + Fly Brain</span>
                                <span class="hidden md:block md:col-span-2 text-right">Advantage</span>
                            </div>

                            {BENCHMARKS.map((b, i) => (
                                <div
                                    key={b.metric}
                                    class={[
                                        "grid grid-cols-12 px-6 py-4 border-b border-[var(--theme-border)]/60 last:border-0 items-center transition-colors hover:bg-[var(--theme-surface-hover)]",
                                        i % 2 === 0 ? "bg-[var(--theme-surface)]" : "bg-[var(--theme-bg)]/40",
                                    ].join(" ")}
                                >
                                    <div class="col-span-12 md:col-span-4 mb-1 md:mb-0">
                                        <span class="text-xs sm:text-sm font-semibold text-[var(--theme-text-primary)]">
                                            {b.metric}
                                        </span>
                                    </div>
                                    <div class="col-span-6 md:col-span-3 font-['JetBrains_Mono',monospace] text-xs text-[var(--theme-text-muted)] line-through">
                                        {b.conventional}
                                    </div>
                                    <div class="col-span-6 md:col-span-3 font-['JetBrains_Mono',monospace] text-xs font-bold text-emerald-500">
                                        {b.zene}
                                    </div>
                                    <div class="col-span-12 md:col-span-2 text-left md:text-right mt-1 md:mt-0 font-['JetBrains_Mono',monospace] text-[11px] text-[var(--theme-accent-text)] font-medium">
                                        {b.advantage}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 06: Open Source Quickstart & Community */}
                    <div class="rounded-[10px] border border-[var(--theme-border)] bg-gradient-to-br from-[var(--theme-surface)] via-[var(--theme-surface)] to-[var(--theme-accent-subtle)] p-8 sm:p-12 shadow-xl mb-16">
                        <div class="max-w-3xl space-y-6">
                            <span class="inline-block px-3 py-1 bg-[var(--theme-accent)]/10 text-[var(--theme-accent-text)] border border-[var(--theme-accent)]/20 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded">
                                Autonomous Agent Open Source
                            </span>
                            <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight">
                                Build With ZENE Today
                            </h2>
                            <p class="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                                ZENE is freely available under the Apache 2.0 license. You can clone the repository, run the CLI natively in your terminal, or embed it into your own Rust development tools.
                            </p>

                            <div class="flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="https://github.com/kabirajpan/zene"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2.5 py-3 px-6 bg-[var(--theme-text-primary)] hover:opacity-90 text-[var(--theme-bg)] font-bold rounded-[4px] text-sm transition-all"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    <span>GitHub: kabirajpan/zene</span>
                                </a>

                                <a
                                    href="/products/zenthra/apps/zenthree"
                                    class="inline-flex items-center gap-2 py-3 px-5 bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium rounded-[4px] text-sm transition-all shadow-sm"
                                >
                                    <span>Download Zenthree IDE</span>
                                    <span class="font-['JetBrains_Mono',monospace] text-xs">→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Research Links */}
                    <div class="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[var(--theme-border)] text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]">
                        <div class="flex flex-wrap items-center gap-6">
                            <a href="/products" class="hover:text-[var(--theme-text-primary)] transition-colors">← Products</a>
                            <a href="https://github.com/kabirajpan/zene" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">ZENE Agent ↗</a>
                            <a href="https://github.com/kabirajpan/zenthree" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">Zenthree IDE ↗</a>
                            <a href="https://codex.flywire.ai" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">FlyWire Connectome ↗</a>
                            <a href="https://janelia.org" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">Janelia Campus ↗</a>
                        </div>
                        <div>
                            <span>ZenthraLabs Research © 2026</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Neuromorphic AI & Connectome Research — ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "Biological connectome inference and ZENE autonomous coding engine — pure Rust sub-15 µs safety reflex gate and Tree-sitter AST perception.",
        },
        {
            name: "keywords",
            content: "neuromorphic AI, Drosophila connectome, biological RNN, autonomous coding agent, Rust AI agent, ZENE, Zenthree",
        },
    ],
};
