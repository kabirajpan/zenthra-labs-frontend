import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface PaperEntry {
    id: string;
    title: string;
    description: string;
    date: string;
    status: string;
    topic: string;
    link?: string;
    badge?: string;
}

const PAPERS: PaperEntry[] = [
    {
        id: "biological-connectomes",
        title: "Biologically Grounded Decision Connectomes for Autonomous Coding Systems",
        description: "A 500-neuron Drosophila connectome executed via 30 Euler numerical integration steps in CPU L1 cache for sub-15 µs involuntary safety locks and least-privilege tool masking.",
        date: "Sep 2026",
        status: "Published",
        topic: "Connectome Inference",
        link: "/research/biological-connectomes",
        badge: "Stage 01 · Active",
    },
    {
        id: "central-complex-navigation",
        title: "Stage 02: Central Complex Heading Dynamics & Vector-Space Steering",
        description: "Columnar phase-shift ring attractors derived from FlyWire CX volumes to prevent cognitive drift across deep multi-file codebase refactoring.",
        date: "Q4 2026",
        status: "Forthcoming",
        topic: "Spatial Memory",
        badge: "Stage 02",
    },
    {
        id: "mushroom-body-stdp",
        title: "Stage 03: Tokenless Associative Memory via Mushroom Body Kenyon Cells & STDP",
        description: "Spike-Timing-Dependent Plasticity in a 10,000-dimensional sparse coding space to retain developer idioms without RAG or token stuffing.",
        date: "Q1 2027",
        status: "Forthcoming",
        topic: "Synaptic Plasticity",
        badge: "Stage 03",
    },
    {
        id: "flywire-whole-brain",
        title: "Stage 04: Whole-Brain Adult Drosophila Connectome Ingestion at Scale",
        description: "Sparse matrix emulation of 139,255 biological neurons and 54.5 million synapses mapped at nanometer electron microscopy resolution.",
        date: "2027",
        status: "Forthcoming",
        topic: "Whole-Brain Simulation",
        badge: "Stage 04",
    },
    {
        id: "neuromorphic-agent-os",
        title: "Stage 05: The Neuromorphic Agent OS: Inverting the Monolithic LLM Stack",
        description: "A local 100 Hz connectome executive that handles AST navigation and safety on-device, querying cloud LLMs solely for brief creative code blocks.",
        date: "Roadmap",
        status: "Forthcoming",
        topic: "Systems Architecture",
        badge: "Stage 05",
    },
    {
        id: "tree-sitter-ast-routing",
        title: "Concrete Syntax Tree Dynamic Routing vs. Autoregressive Context Parsing",
        description: "Empirical evaluation showing AST-bound symbol isolation reduces context token overhead by 74% and eliminates out-of-scope edits across 1,000 repositories.",
        date: "2026",
        status: "Under Review",
        topic: "Compiler Theory",
        badge: "Preprint",
    },
];

export default component$(() => {
    const featured = PAPERS[0];
    const upcoming = PAPERS.slice(1);

    return (
        <main class="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-primary)] transition-colors duration-200 antialiased selection:bg-[var(--theme-accent)] selection:text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20 font-sans">

                {/* Minimalist Research Header */}
                <header class="border-b border-[var(--theme-border)] pb-6 sm:pb-8 mb-8 sm:mb-12">
                    <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] font-bold text-[var(--theme-accent-text)] uppercase tracking-wider mb-3 shadow-xs">
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>ZenthraLabs Research</span>
                    </div>
                    <h1 class="font-['Syne',sans-serif] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--theme-text-primary)] mb-3 sm:mb-4 leading-[1.15]">
                        Research & Publications
                    </h1>
                    <p class="text-xs sm:text-base text-[var(--theme-text-secondary)] leading-relaxed max-w-3xl">
                        Exploring physical continuous-time neural circuits, biological connectomes, and ultra-low-latency neuromorphic computing to build safe, deterministic autonomous systems.
                    </p>
                </header>

                {/* Featured Publication */}
                <section class="mb-10 sm:mb-14">
                    <div class="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)] mb-3">
                        <span class="text-[var(--theme-accent-text)] font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                            Featured Paper
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-semibold text-[10px] sm:text-xs">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {featured.badge}
                        </span>
                    </div>

                    <article class="border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface)] overflow-hidden shadow-sm hover:border-[var(--theme-border-hover)] transition-all">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                            
                            {/* Left Side on Desktop / Bottom on Mobile: Information */}
                            <div class="order-2 lg:order-1 lg:col-span-7 p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 flex flex-col justify-between">
                                <div class="space-y-2.5 sm:space-y-3">
                                    <div class="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]">
                                        <span>{featured.date}</span>
                                        <span>·</span>
                                        <span>{featured.topic}</span>
                                        <span>·</span>
                                        <span>Technical Report</span>
                                    </div>

                                    <h2 class="font-['Syne',sans-serif] text-lg sm:text-2xl font-bold tracking-tight text-[var(--theme-text-primary)] leading-snug">
                                        <a href={featured.link} class="hover:text-[var(--theme-accent-text)] transition-colors">
                                            {featured.title}
                                        </a>
                                    </h2>

                                    <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                        {featured.description}
                                    </p>
                                </div>

                                <div class="space-y-4 pt-4 border-t border-[var(--theme-border)]">
                                    {/* Metric Chips with High Contrast in Both Themes */}
                                    <div class="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-['JetBrains_Mono',monospace]">
                                        <div class="px-2.5 py-1 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] font-medium">
                                            Latency: <strong class="text-emerald-700 dark:text-emerald-400 font-bold">&lt; 0.015 ms</strong>
                                        </div>
                                        <div class="px-2.5 py-1 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] font-medium">
                                            500 Neurons
                                        </div>
                                        <div class="px-2.5 py-1 rounded bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] font-medium">
                                            0.00% Deletion
                                        </div>
                                    </div>

                                    <div>
                                        <a
                                            href={featured.link}
                                            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-lg sm:rounded bg-[var(--theme-accent)] text-white hover:opacity-90 active:scale-[0.99] transition-all font-['JetBrains_Mono',monospace] text-xs font-semibold shadow-sm"
                                        >
                                            <span>Read Paper</span>
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side on Desktop / Top on Mobile: Clean Framed Scientific Figure */}
                            <div class="order-1 lg:order-2 lg:col-span-5 p-4 sm:p-6 bg-[var(--theme-bg-subtle)] dark:bg-[#070b14] border-b lg:border-b-0 lg:border-l border-[var(--theme-border)] flex flex-col items-center justify-center">
                                <a href={featured.link} class="block w-full group">
                                    <div class="w-full bg-[#050811] rounded-lg p-2.5 sm:p-3.5 border border-slate-800/80 shadow-inner flex flex-col items-center">
                                        <img
                                            src="/assets/research/fly-decision-net/intent_neural_trajectories.png"
                                            alt={featured.title}
                                            class="w-full h-auto object-contain max-h-[260px] sm:max-h-[320px] transition-transform duration-300 group-hover:scale-[1.01]"
                                            width="2400"
                                            height="1200"
                                            loading="eager"
                                        />
                                        <div class="mt-2 text-center text-[10px] font-['JetBrains_Mono',monospace] text-zinc-400">
                                            Figure: 3D Latent Attractor Dynamics (N=500)
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </article>
                </section>

                {/* Papers & Research Roadmap List */}
                <section class="mb-12 sm:mb-16">
                    <div class="border-b border-[var(--theme-border)] pb-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
                        <h2 class="font-['Syne',sans-serif] text-base sm:text-xl font-bold tracking-tight text-[var(--theme-text-primary)]">
                            All Research & Future Roadmaps
                        </h2>
                        <span class="text-[11px] sm:text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)]">
                            Sub-pages uploaded per release
                        </span>
                    </div>

                    <div class="divide-y divide-[var(--theme-border)]/60">
                        {upcoming.map((paper) => (
                            <article
                                key={paper.id}
                                class="py-4 sm:py-5 first:pt-0 last:pb-0 space-y-2 group transition-colors rounded-lg sm:rounded-none px-2.5 -mx-2.5 sm:px-3 sm:-mx-3 hover:bg-[var(--theme-surface-hover)] active:bg-[var(--theme-surface-hover)]"
                            >
                                <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-['JetBrains_Mono',monospace]">
                                    <div class="flex items-center gap-2 text-[var(--theme-text-muted)]">
                                        <span>{paper.date}</span>
                                        <span>·</span>
                                        <span>{paper.topic}</span>
                                    </div>
                                    <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] shadow-2xs">
                                        {paper.badge}
                                    </span>
                                </div>

                                <h3 class="font-['Syne',sans-serif] text-sm sm:text-lg font-bold text-[var(--theme-text-primary)] leading-snug">
                                    {paper.link ? (
                                        <a href={paper.link} class="hover:text-[var(--theme-accent-text)] transition-colors">
                                            {paper.title}
                                        </a>
                                    ) : (
                                        <span>{paper.title}</span>
                                    )}
                                </h3>

                                <p class="text-xs sm:text-[13px] text-[var(--theme-text-secondary)] leading-relaxed">
                                    {paper.description}
                                </p>

                                <div class="pt-1 flex items-center justify-between text-[11px] sm:text-xs font-['JetBrains_Mono',monospace]">
                                    <span class="text-[var(--theme-text-muted)]">
                                        Status: {paper.status}
                                    </span>
                                    {paper.link && (
                                        <a href={paper.link} class="text-[var(--theme-accent-text)] font-semibold hover:underline">
                                            View Report →
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Minimalist Research Footer */}
                <footer class="border-t border-[var(--theme-border)] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs font-['JetBrains_Mono',monospace] text-[var(--theme-text-muted)] text-center sm:text-left">
                    <div>© 2026 ZenthraLabs Research · Published under Apache 2.0</div>
                    <div class="flex items-center gap-4">
                        <a href="https://github.com/kabirajpan/zene" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">
                            GitHub: ZENE
                        </a>
                        <a href="https://codex.flywire.ai" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--theme-text-primary)] transition-colors">
                            FlyWire Codex
                        </a>
                    </div>
                </footer>

            </div>
        </main>
    );
});

export const head: DocumentHead = {
    title: "Research & Publications — ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "ZenthraLabs Research — Biological connectome dynamics, continuous-time Euler recurrent networks, and neuromorphic agent architectures.",
        },
        {
            name: "keywords",
            content: "neuromorphic AI, Drosophila connectome, biological RNN, autonomous coding agent, FlyWire, ZENE, research",
        },
    ],
};
