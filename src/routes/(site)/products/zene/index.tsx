import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="relative min-h-screen text-[var(--theme-text-primary)]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 relative z-10 font-sans">
                
                {/* ── Breadcrumbs ── */}
                <nav class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]" aria-label="Breadcrumb">
                    <a href="/products" class="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-text)] transition-colors">Products</a>
                    <span class="text-[var(--theme-border)]">/</span>
                    <span class="text-[var(--theme-text-primary)] font-medium">ZENE</span>
                </nav>

                {/* ── Hero Section ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 lg:mb-24">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] font-semibold">
                                <span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                ZenthraLabs Intelligence · v0.1.0
                            </span>
                            <span class="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-['JetBrains_Mono',monospace] text-xs font-semibold rounded-[4px]">
                                Apache 2.0 Open Source
                            </span>
                        </div>

                        <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--theme-text-primary)]">
                            ZENE
                        </h1>
                        <p class="font-['JetBrains_Mono',monospace] text-sm sm:text-base text-purple-600 dark:text-purple-400 font-semibold">
                            Autonomous Coding Agent Governed by a Biological Connectome
                        </p>

                        <p class="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-2xl">
                            A native multi-turn autonomous coding agent in Rust. Tree-sitter AST perception, 13 core filesystem and terminal tools, 3-tier skill architecture, and an embedded sub-15µs biological Drosophila connectome that executes involuntary spinal reflex safety gates.
                        </p>

                        {/* Metric Highlights */}
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                            <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] p-3 text-center shadow-xs">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">&lt; 15 µs</div>
                                <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Reflex Gate</div>
                            </div>
                            <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] p-3 text-center shadow-xs">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[var(--theme-accent-text)]">500 Neurons</div>
                                <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">3,889 Synapses</div>
                            </div>
                            <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] p-3 text-center shadow-xs">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[var(--theme-accent-text)]">13 Tools</div>
                                <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Tree-sitter AST</div>
                            </div>
                            <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-[4px] p-3 text-center shadow-xs">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">0 ms</div>
                                <div class="text-[10px] text-[var(--theme-text-muted)] font-['JetBrains_Mono',monospace]">Runtime Daemon</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div class="flex flex-wrap gap-3 pt-3">
                            <a
                                href="#quickstart"
                                class="py-2.5 px-6 bg-[var(--theme-accent)] text-white font-medium rounded-[4px] hover:brightness-110 active:scale-[0.99] transition-all text-sm shadow-md shadow-[var(--theme-accent)]/20 flex items-center gap-2 font-['JetBrains_Mono',monospace]"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="4 17 10 11 4 5" />
                                    <line x1="12" y1="19" x2="20" y2="19" />
                                </svg>
                                Install CLI Quickstart
                            </a>
                            <a
                                href="https://github.com/kabirajpan/zene"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="py-2.5 px-5 bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium rounded-[4px] hover:border-[var(--theme-border-hover)] hover:bg-[var(--theme-surface-hover)] transition-all text-sm flex items-center gap-2 shadow-xs"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href="/research/biological-connectomes"
                                class="py-2.5 px-5 border border-purple-500/40 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 font-medium rounded-[4px] text-sm transition-all flex items-center gap-1.5"
                            >
                                Read Research Report &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Terminal Simulation Visual */}
                    <div class="col-span-12 lg:col-span-5 flex justify-center">
                        <div class="w-full rounded-lg border border-[var(--theme-border)] bg-[#071025] text-slate-200 font-['JetBrains_Mono',monospace] text-xs shadow-2xl overflow-hidden">
                            {/* Terminal Top Bar */}
                            <div class="px-4 py-2.5 bg-[#050b1a] border-b border-white/10 flex items-center justify-between">
                                <div class="flex items-center gap-1.5">
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                    <span class="ml-2 text-[11px] text-slate-400 font-medium">zene repl — gemini-3.5-flash-lite</span>
                                </div>
                                <span class="text-[10px] text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded bg-purple-500/10">100Hz Reflex</span>
                            </div>

                            {/* Terminal Body */}
                            <div class="p-4 space-y-3 leading-relaxed">
                                <div>
                                    <span class="text-emerald-400">&gt;</span> <span class="text-white font-semibold">zene "Refactor AST parser and run unit tests"</span>
                                </div>
                                <div class="text-[11px] text-purple-300 flex items-center gap-1.5 bg-purple-950/40 p-2 rounded border border-purple-500/20">
                                    <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                                    <span>[Connectome Reflex]: State=EXECUTION · 30 Euler steps in 11.4 µs</span>
                                </div>
                                <div class="text-[11px] text-slate-400 space-y-1 pl-2 border-l-2 border-slate-700">
                                    <div>⚡ Tool Masking: 13 tools provisioned (AST, diff, write_file)</div>
                                    <div>📁 Perception: Scanned 42 source files via Tree-sitter AST</div>
                                    <div>🔧 Action: edit_file(src/parser.rs:L142-180)</div>
                                    <div>🧪 Action: run_terminal("cargo test --lib parser")</div>
                                </div>
                                <div class="text-[11px] text-emerald-400 font-semibold bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                                    ✓ All 18 unit tests passed · 0 compile errors · Turn completed in 1.4s
                                </div>
                                <div class="pt-1 flex items-center gap-2 text-slate-400">
                                    <span class="text-purple-400">zene&gt;</span>
                                    <span class="inline-block w-2 h-4 bg-purple-400 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bio-Connectome Deep Dive ── */}
                <section class="border-t border-[var(--theme-border)] pt-12 md:pt-16 mb-16 lg:mb-24">
                    <div class="max-w-3xl mb-12">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold block mb-2">
                            Physical Neuroscience Architecture
                        </span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold text-[var(--theme-text-primary)] mb-3">
                            The Fly Brain Sensory Reflex Gate
                        </h2>
                        <p class="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                            Traditional agents send full tool schemas to cloud LLMs on every single turn, leaving files vulnerable to hallucinated wipe commands and burning API tokens. ZENE runs an embedded 500-neuron connectome locally on CPU in under 15 microseconds before anything reaches the remote LLM.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-6 rounded-[4px] shadow-xs hover:border-purple-500/50 transition-colors">
                            <div class="w-10 h-10 rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4 font-['JetBrains_Mono',monospace] font-bold text-sm">
                                01
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[var(--theme-text-primary)] mb-2">
                                Giant Fiber Reflex Lock
                            </h3>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                Modeled after the fruit fly's escape circuit that triggers in milliseconds when a shadow descends. Intercepts destructive commands (<code class="text-purple-600 dark:text-purple-400 font-mono">rm -rf /</code>, unconstrained drive wipes) and locks workspace mutation before the prompt leaves the device.
                            </p>
                        </div>

                        <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-6 rounded-[4px] shadow-xs hover:border-purple-500/50 transition-colors">
                            <div class="w-10 h-10 rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4 font-['JetBrains_Mono',monospace] font-bold text-sm">
                                02
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[var(--theme-text-primary)] mb-2">
                                Dynamic Tool Masking
                            </h3>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                Connectome neural attractors classify intent into 5 firing states (<span class="font-mono text-xs">DISCUSSION</span>, <span class="font-mono text-xs">INSPECTION</span>, <span class="font-mono text-xs">PLANNING</span>, <span class="font-mono text-xs">EXECUTION</span>, <span class="font-mono text-xs">REFLEX_LOCK</span>). Injects only minimal relevant tool definitions, cutting prompt token bloat by up to 74%.
                            </p>
                        </div>

                        <div class="bg-[var(--theme-surface)] border border-[var(--theme-border)] p-6 rounded-[4px] shadow-xs hover:border-purple-500/50 transition-colors">
                            <div class="w-10 h-10 rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4 font-['JetBrains_Mono',monospace] font-bold text-sm">
                                03
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[var(--theme-text-primary)] mb-2">
                                Pure CPU L1 Residency
                            </h3>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                The 500-neuron connectome and 3,889 synapses are stored as an embedded 154 KB binary. Executed via 30 Euler numerical integration steps entirely in CPU cache with zero ONNX, LibTorch, or background daemon dependencies.
                            </p>
                        </div>
                    </div>

                    {/* Scientific paper banner */}
                    <div class="mt-8 p-6 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
                        <div class="space-y-1">
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                                Published Research Paper · Stage 01
                            </span>
                            <h4 class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[var(--theme-text-primary)]">
                                Biologically Grounded Decision Connectomes for Autonomous Coding Systems
                            </h4>
                            <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)]">
                                Empirical data on Dale's principle adherence, Piéron's law response curves, and real-time attractor phase portraits.
                            </p>
                        </div>
                        <a
                            href="/research/biological-connectomes"
                            class="shrink-0 py-2 px-4 bg-[var(--theme-accent)] text-white text-xs font-semibold rounded font-['JetBrains_Mono',monospace] hover:brightness-110 transition-all shadow-sm"
                        >
                            Read Full Technical Report &rarr;
                        </a>
                    </div>
                </section>

                {/* ── 13 Native Tools Table ── */}
                <section class="border-t border-[var(--theme-border)] pt-12 md:pt-16 mb-16 lg:mb-24">
                    <div class="max-w-3xl mb-8">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                            Engine Capabilities
                        </span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)] mb-2">
                            13 Native Tools Implemented in Pure Rust
                        </h2>
                        <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)]">
                            Every tool is written natively with zero shell wrappers or Node scripts, featuring precise line slicing, diff verification, and AST diagnostics.
                        </p>
                    </div>

                    <div class="overflow-x-auto border border-[var(--theme-border)] rounded-lg bg-[var(--theme-surface)] shadow-xs">
                        <table class="w-full text-left text-xs font-['JetBrains_Mono',monospace]">
                            <thead class="bg-[var(--theme-bg)] border-b border-[var(--theme-border)] text-[var(--theme-text-muted)] uppercase tracking-wider">
                                <tr>
                                    <th class="py-3 px-4">Tool</th>
                                    <th class="py-3 px-4">Category</th>
                                    <th class="py-3 px-4">Safety Type</th>
                                    <th class="py-3 px-4">Functionality</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[var(--theme-border)] text-[var(--theme-text-secondary)]">
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">read_file</td>
                                    <td class="py-3 px-4">Filesystem</td>
                                    <td class="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Read-only</td>
                                    <td class="py-3 px-4 font-sans text-xs">Reads file contents with precise line slice notation</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">write_file</td>
                                    <td class="py-3 px-4">Filesystem</td>
                                    <td class="py-3 px-4 text-amber-600 dark:text-amber-400 font-semibold">Destructive</td>
                                    <td class="py-3 px-4 font-sans text-xs">Writes or creates new files on the filesystem</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">edit_file</td>
                                    <td class="py-3 px-4">Filesystem</td>
                                    <td class="py-3 px-4 text-amber-600 dark:text-amber-400 font-semibold">Destructive</td>
                                    <td class="py-3 px-4 font-sans text-xs">Targeted substring search and surgical replacement</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">search</td>
                                    <td class="py-3 px-4">Search</td>
                                    <td class="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Read-only</td>
                                    <td class="py-3 px-4 font-sans text-xs">High-speed ripgrep-style content and filename pattern matcher</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">run_terminal</td>
                                    <td class="py-3 px-4">Terminal</td>
                                    <td class="py-3 px-4 text-rose-600 dark:text-rose-400 font-semibold">Requires Approval</td>
                                    <td class="py-3 px-4 font-sans text-xs">Executes shell commands in the target workspace</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">get_diagnostics</td>
                                    <td class="py-3 px-4">Diagnostics</td>
                                    <td class="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Read-only</td>
                                    <td class="py-3 px-4 font-sans text-xs">Captures live compiler, linter, and typecheck diagnostics</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">git_diff</td>
                                    <td class="py-3 px-4">Git</td>
                                    <td class="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Read-only</td>
                                    <td class="py-3 px-4 font-sans text-xs">Inspects staged and unstaged git changes</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-bold text-[var(--theme-text-primary)]">create_plan</td>
                                    <td class="py-3 px-4">Planning</td>
                                    <td class="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Read-only</td>
                                    <td class="py-3 px-4 font-sans text-xs">Initializes multi-step architecture refactor roadmaps</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Quickstart Section ── */}
                <section id="quickstart" class="border-t border-[var(--theme-border)] pt-12 md:pt-16 mb-16 lg:mb-24">
                    <div class="max-w-3xl mb-8">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[var(--theme-accent-text)] font-semibold block mb-2">
                            Developer Setup
                        </span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)] mb-2">
                            Quickstart &amp; CLI Installation
                        </h2>
                        <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)]">
                            Install the binary locally with Cargo or embed ZENE into your own Rust developer tools.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        {/* Terminal Box 1 */}
                        <div class="p-5 rounded-lg bg-[#071025] border border-white/10 text-slate-200 font-['JetBrains_Mono',monospace] text-xs space-y-4">
                            <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                                <span>1. Build and install globally</span>
                                <span class="text-purple-400">Cargo</span>
                            </div>
                            <pre class="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
<code><span class="text-slate-500"># Clone the repository</span>
git clone git@github.com:kabirajpan/zene.git
cd zene

<span class="text-slate-500"># Installs `zene` binary to ~/.cargo/bin</span>
cargo install --path .

<span class="text-slate-500"># Configure free Gemini or Groq key</span>
export GEMINI_API_KEY="your-api-key"

<span class="text-slate-500"># Start interactive REPL</span>
zene</code>
                            </pre>
                        </div>

                        {/* Terminal Box 2 */}
                        <div class="p-5 rounded-lg bg-[#071025] border border-white/10 text-slate-200 font-['JetBrains_Mono',monospace] text-xs space-y-4">
                            <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                                <span>2. Embed as a Rust Library</span>
                                <span class="text-emerald-400">Cargo.toml</span>
                            </div>
                            <pre class="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
<code><span class="text-slate-500">[dependencies]</span>
agent = &#123; git = "https://github.com/kabirajpan/zene.git" &#125;

<span class="text-slate-500">// In your Rust application:</span>
use agent::create_agent_for_model_and_workspace;

let mut agent = create_agent_for_model_and_workspace(
    "gemini",
    "gemini-3.5-flash-lite",
    "./",
)?;</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* ── Built into Zenthree Banner ── */}
                <section class="rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-md">
                    <div class="space-y-2 max-w-2xl">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500" />
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
                                Native IDE Intelligence
                            </span>
                        </div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[var(--theme-text-primary)]">
                            Experience ZENE inside Zenthree IDE
                        </h2>
                        <p class="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                            ZENE is compiled directly into Zenthree as an interactive sidecar assistant with native PTY terminal bindings, live diagnostics, and zero electron bloat.
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-3 shrink-0">
                        <a
                            href="/products/zenthra/apps/zenthree"
                            class="py-2.5 px-5 bg-[var(--theme-accent)] text-white font-medium rounded-[4px] text-xs sm:text-sm hover:brightness-110 transition-all font-['JetBrains_Mono',monospace]"
                        >
                            Explore Zenthree IDE
                        </a>
                        <a
                            href="/research/biological-connectomes"
                            class="py-2.5 px-4 border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium rounded-[4px] text-xs sm:text-sm hover:bg-[var(--theme-surface-hover)] transition-all font-['JetBrains_Mono',monospace]"
                        >
                            Connectome Research
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "ZENE — Autonomous Coding Agent Governed by a Biological Connectome | ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "ZENE is an autonomous multi-turn Rust coding agent governed by a 500-neuron Drosophila connectome with sub-15µs involuntary safety gates, Tree-sitter AST, and 13 native tools."
        },
        { property: "og:title", content: "ZENE — Autonomous Coding Agent Governed by a Biological Connectome" },
        { property: "og:description", content: "A native multi-turn autonomous coding agent in Rust with embedded connectome reflex gates." },
        { property: "og:type", content: "website" },
    ],
};
