import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="relative min-h-screen">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
                {/* ── Breadcrumbs ── */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-[#767683] dark:text-[#94a3b8] hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors">Products</a>
                    <span class="text-[#c6c5d3] dark:text-[#312e81]">/</span>
                    <a href="/products/zenthra" class="text-[#767683] dark:text-[#94a3b8] hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors">Zenthra</a>
                    <span class="text-[#c6c5d3] dark:text-[#312e81]">/</span>
                    <span class="text-[#1b1b21] dark:text-white font-medium">Zenthree</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-block px-3 py-1 bg-[#e9e7ef] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                Featured Application · v0.1.0 Preview
                            </span>
                            <span class="inline-block px-2.5 py-1 bg-[#e2f7e6] dark:bg-emerald-950/60 text-[#147a32] dark:text-emerald-400 border border-transparent dark:border-emerald-800/40 font-['JetBrains_Mono',monospace] text-xs font-semibold rounded-[4px]">
                                GPU-Accelerated
                            </span>
                        </div>

                        <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1b1b21] dark:text-white leading-tight tracking-tight">
                            Zenthree
                        </h1>

                        <p class="text-base sm:text-lg text-[#454651] dark:text-[#94a3b8] leading-relaxed max-w-xl">
                            A high-performance, lightweight, and modern code editor engineered in Rust on the Zenthra GUI framework. Delivers instant startup, Tree-sitter semantic syntax, native embedded terminal, and an integrated AI assistant sidecar with zero sRGB gamma washout.
                        </p>

                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3 text-center shadow-sm">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5] dark:text-[#818cf8]">&lt; 4ms</div>
                                <div class="text-[10px] text-[#767683] dark:text-[#64748b]">Frame latency</div>
                            </div>
                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3 text-center shadow-sm">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5] dark:text-[#818cf8]">Tree-sitter</div>
                                <div class="text-[10px] text-[#767683] dark:text-[#64748b]">AST highlighting</div>
                            </div>
                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3 text-center shadow-sm">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5] dark:text-[#818cf8]">PTY Shell</div>
                                <div class="text-[10px] text-[#767683] dark:text-[#64748b]">Interactive console</div>
                            </div>
                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3 text-center shadow-sm">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5] dark:text-[#818cf8]">True Color</div>
                                <div class="text-[10px] text-[#767683] dark:text-[#64748b]">Frosted glass UI</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3 pt-4">
                            <a 
                                href="/products/zenthra/apps/zenthree/download" 
                                class="py-2.5 px-6 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm shadow-md shadow-[#5c6bc0]/25 flex items-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Zenthree
                            </a>
                            <a 
                                href="https://github.com/kabirajpan/zenthree" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="py-2.5 px-6 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all text-sm flex items-center gap-2 shadow-sm"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub Repository
                            </a>
                        </div>
                    </div>

                    {/* Hero Screenshot */}
                    <div class="col-span-12 lg:col-span-5 flex justify-center items-center">
                        <div class="w-full max-w-lg rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-2xl bg-white dark:bg-[#0b0813] group relative">
                            <img
                                src="/assets/screenshots/zenthree/glassmorphism_mode.png"
                                alt="Zenthree main editor interface with frosted glass, terminal, and git integration"
                                class="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                width={1366}
                                height={768}
                            />
                            <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-white/90 font-['JetBrains_Mono',monospace] border border-white/10">
                                Zenthree IDE · Frosted Glass &amp; PTY Shell
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Key Highlights Grid ── */}
                <div class="border-t border-[#c6c5d3] dark:border-[#1e2230] pt-12 md:pt-20 mb-20">
                    <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Designed for Developers</span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#1b1b21] dark:text-white">Engineering Highlights</h2>
                        <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                            Every subsystem is built with native Rust performance in mind — zero Electron memory bloat, instant keystroke feedback, and GPU-driven rendering.
                        </p>
                    </div>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="16 18 22 12 16 6" />
                                    <polyline points="8 6 2 12 8 18" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">Tree-sitter Syntax Highlighting</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Full AST-based semantic analysis for Rust, TypeScript, Python, and more. Accurately highlights complex language constructs, types, and scopes.
                            </p>
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="4 17 10 11 4 5" />
                                    <line x1="12" y1="19" x2="20" y2="19" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">Native Embedded PTY Terminal</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Complete pseudo-terminal powered by `portable-pty`. Direct inline prompt (`❯ command█`), command history, Ctrl+C interrupt, and smooth split-panel resizing.
                            </p>
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
                                    <path d="m12 6 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">AI Assistant & Review Bar</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Integrated AI sidecar with thought stream separation and a space-saving diff review bar with compact `+N`/`-M` pills, 1-click jumps, and Accept/Reject all.
                            </p>
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18M9 21V9" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">Minimal Zed-Style File Explorer</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Clean file tree with sub-pixel alignment, Git status indicators (Modified `M`, Untracked `U`), toolbar quick actions, and multiple display styles.
                            </p>
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">Frosted Glass & True Color</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Dual-Kawase GPU blur and OS compositor integration. Linear swapchain presentation avoids sRGB double-gamma washouts, preserving rich vibrant dark palettes.
                            </p>
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-6 rounded-[4px] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all hover:-translate-y-0.5 shadow-sm">
                            <div class="w-9 h-9 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/30 flex items-center justify-center mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">Git Graph & Extensions</h3>
                            <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Dedicated Git staging interface, commit graph visualizer, and in-editor extension management for grammar registries without restarting.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Feature Showcase Walkthrough ── */}
                <section class="border-t border-[#c6c5d3] dark:border-[#1e2230] pt-12 md:pt-20 mb-20">
                    <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">In-Depth Walkthrough</span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#1b1b21] dark:text-white">Workspace Interface &amp; Tools</h2>
                        <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                            Take a tour of Zenthree's workspaces, layout paradigms, and native tooling in action.
                        </p>
                    </div>

                    <div class="space-y-24">
                        {/* Showcase Item 1: Glassmorphism */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/glassmorphism_mode.png"
                                        alt="Zenthree Frosted Glassmorphism Mode and Theme Controls"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Visual Elegance</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Frosted Glassmorphism &amp; True Color</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Native window blur requested directly through your OS compositor (Wayland, COSMIC, KDE, Windows DWM) paired with internal GPU Dual-Kawase blur for cards, dialogs, and popovers.
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Linear swapchain presentation avoids sRGB gamma washout
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        9 vivid accent palettes with one-click theme switcher
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Adjustable surface opacity and blur radius in real time
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 2: Minimalist File Explorer & Terminal */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/minimalistic_terminal.png"
                                        alt="Zenthree Minimalist File Tree and Embedded PTY Terminal"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Native Systems Power</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Minimalist Tree &amp; Embedded PTY Shell</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Browse complex repositories with sub-pixel icon alignment, Git modification dots, and a fully interactive pseudo-terminal running your native shell (`bash`, `zsh`, `fish`, or `pwsh`).
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Direct console prompt with animated blinking block cursor
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        History navigation, tab-completion, and Ctrl+C interrupt
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Smooth draggable split-panel height resizing
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 3: Git Source Control & Commit Graph */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/git_support.png"
                                        alt="Zenthree Git Source Control with Commit Graph and File Menu"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Full Version Control</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Git Integration &amp; Visual Commit Graph</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Inspect staged, modified (`M`), and untracked (`U`) files directly from the sidebar. Review commit histories with an interactive multi-branch graph showing commit SHAs and author logs.
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Single-click commit staging and commit message input
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Visual branch commit graph with colored node trajectories
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Native file menu with quick access to recent projects and files
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 4: Language Extensions Store */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/extension_support.png"
                                        alt="Zenthree Language Extensions Store"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Modular Tooling</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Language Extensions Store</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Instant installation of syntax grammars, formatters, and language servers for Go, TypeScript, C/C++, HTML/CSS, JSON/YAML, Markdown, and Shell.
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Automatic prompting when opening unconfigured file extensions
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        One-click Install / Uninstall with zero editor restarts
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Categorized view tabs: All, Installed, and Available
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 5: AI Coding Assistant */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/user_your_api.png"
                                        alt="Zenthree AI Assistant Panel and Model Orchestration"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Autonomous Intelligence</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Integrated AI Companion &amp; Models</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Ask questions, refactor functions, or explore entire workspaces with real-time thought streams, file context inspection, and model orchestration (Gemini, GPT-OSS, local LLMs).
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Exploration trajectories showing analyzed files &amp; folders
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Compact unified diff review bar with 1-click Accept / Reject all
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Bring your own API key with custom token budget controls
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 6: User Profile & Preferences */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-xl bg-white dark:bg-[#0b0813]">
                                    <img
                                        src="/assets/screenshots/zenthree/user_profile.png"
                                        alt="Zenthree User Profile Popover and Workspace Status"
                                        class="w-full h-auto object-cover"
                                        width={1366}
                                        height={768}
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Ergonomics</span>
                                <h3 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">Workspace Profiles &amp; Session Management</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                    Quickly view active session diagnostics, open buffer tabs, PTY status, and developer identity. Seamlessly switch between projects without state loss.
                                </p>
                                <ul class="text-xs text-[#767683] dark:text-[#cbd5e1] space-y-2.5 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Real-time session diagnostics and active terminal counter
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Workspace isolation across tabs, buffers, and AI sessions
                                    </li>
                                    <li class="flex items-center gap-2.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#4352a5] dark:bg-[#818cf8]" />
                                        Instant project switching with persistent layout state
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Architecture & Modular Workspace ── */}
                <section class="border-t border-[#c6c5d3] dark:border-[#1e2230] pt-12 md:pt-20 mb-20">
                    <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] block mb-2 font-semibold">Modular Rust Architecture</span>
                            <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white mb-4">Clean, Modular Cargo Workspace</h2>
                            <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed mb-4">
                                Zenthree is architected as four distinct, decoupled Rust crates inside a single Cargo workspace, keeping rendering, text editing, syntax parsing, and formatting orthogonal and maintainable.
                            </p>
                            <div class="space-y-3 pt-2">
                                <div class="p-3 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] font-bold text-xs text-[#1b1b21] dark:text-white">crates/zenthree</div>
                                    <div class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">Application entry point, WGPU render loop, UI layout & PTY terminal state.</div>
                                </div>
                                <div class="p-3 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] font-bold text-xs text-[#1b1b21] dark:text-white">crates/editor</div>
                                    <div class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">High-speed rope text buffer, line caching, selection manager & undo/redo history.</div>
                                </div>
                                <div class="p-3 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] font-bold text-xs text-[#1b1b21] dark:text-white">crates/syntax</div>
                                    <div class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">Tree-sitter language grammar registry, query cursors, and token color mapping.</div>
                                </div>
                                <div class="p-3 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] font-bold text-xs text-[#1b1b21] dark:text-white">crates/formatter</div>
                                    <div class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">Integrated code formatting pipeline for Rust, JavaScript, Python, and web files.</div>
                                </div>
                            </div>
                        </div>

                        {/* Code snippet showing how Zenthree is invoked */}
                        <div class="bg-[#071025] dark:bg-[#07080d] rounded-[6px] border border-[#1e2230] overflow-hidden shadow-xl font-['JetBrains_Mono',monospace] w-full">
                            <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 dark:border-[#1e2230]">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="ml-3 text-[11px] text-[#9aa6e0]">zenthree/src/main.rs</span>
                            </div>
                            <div class="p-5 text-[10px] sm:text-[12px] leading-relaxed flex flex-col gap-0.5 text-white/90 overflow-x-auto">
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthree</span><span class="text-[#bfc9d9]">::state::ZenthreeState;</span></div>
                                <div class="h-2" />
                                <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                                <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"Zenthree"</span><span class="text-[#bfc9d9]">)</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.size</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">1440</span><span class="text-[#bfc9d9]">, </span><span class="text-[#d19a66]">900</span><span class="text-[#bfc9d9]">)</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.transparent</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">true</span><span class="text-[#bfc9d9]">)</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.with_ui</span><span class="text-[#bfc9d9]">(move |ui| {"{"}</span></div>
                                <div class="pl-13"><span class="text-[#8a9ab0]">// Immediate-mode editor render pass</span></div>
                                <div class="pl-13"><span class="text-[#bfc9d9]">draw_title_bar(ui, &amp;mut state);</span></div>
                                <div class="pl-13"><span class="text-[#bfc9d9]">draw_main_layout(ui, &amp;mut state);</span></div>
                                <div class="pl-13"><span class="text-[#bfc9d9]">draw_status_bar(ui, &amp;mut state);</span></div>
                                <div class="pl-9"><span class="text-[#bfc9d9]">{"}"})</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                                <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Keybindings Reference ── */}
                <section class="border-t border-[#c6c5d3] dark:border-[#1e2230] pt-12 md:pt-20 mb-20">
                    <div class="text-center max-w-2xl mx-auto mb-12">
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold">Fast Workflow</span>
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#1b1b21] dark:text-white mt-2">Essential Keyboard Shortcuts</h2>
                    </div>

                    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { key: "Ctrl + O", desc: "Open File or Folder" },
                            { key: "Ctrl + S", desc: "Save Active Buffer" },
                            { key: "Ctrl + Shift + F", desc: "Auto-Format Document" },
                            { key: "Ctrl + `", desc: "Toggle Terminal Drawer" },
                            { key: "Ctrl + Shift + X", desc: "Extensions Catalog" },
                            { key: "Ctrl + Shift + P", desc: "Editor Preferences" },
                            { key: "Ctrl + W", desc: "Close Current Tab" },
                            { key: "Ctrl + /", desc: "Toggle Line Comment" },
                        ].map((item) => (
                            <div key={item.key} class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] p-4 rounded-[4px] flex flex-col justify-between shadow-sm">
                                <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] dark:text-[#818cf8] bg-[#e9e7ef] dark:bg-[#1e2235] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 px-2 py-1 rounded w-fit mb-2">
                                    {item.key}
                                </span>
                                <span class="text-xs text-[#454651] dark:text-[#94a3b8]">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Bottom CTA ── */}
                <div class="bg-[#071025] dark:bg-[#0c1020] border border-transparent dark:border-[#1e2230] rounded-[6px] p-8 md:p-12 text-center text-white space-y-6 shadow-xl">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold">
                        Experience the speed of a native Rust editor.
                    </h2>
                    <p class="text-[#9aa6e0] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Zenthree is free and open-source under the MIT license. Download the standalone desktop binary or build it directly with Cargo.
                    </p>
                    <div class="flex flex-wrap justify-center gap-4 pt-2">
                        <a 
                            href="/products/zenthra/apps/zenthree/download" 
                            class="py-3 px-8 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm shadow-lg shadow-[#5c6bc0]/20"
                        >
                            Download for Linux / Windows / macOS
                        </a>
                        <a 
                            href="https://github.com/kabirajpan/zenthree" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="py-3 px-8 border border-white/20 dark:border-[#2a3048] text-white font-medium rounded-[4px] hover:bg-white/10 dark:hover:bg-[#1e2235] transition-all text-sm"
                        >
                            View Source on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Zenthree — High-Performance Native Code Editor | ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "A modern, GPU-accelerated code editor built in Rust on the Zenthra framework. Tree-sitter syntax highlighting, PTY terminal, and AI companion.",
        },
    ],
};
