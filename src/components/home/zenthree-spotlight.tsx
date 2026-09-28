import { component$ } from "@builder.io/qwik";

export const ZenthreeSpotlight = component$(() => {
    return (
        <section class="border-b border-[#c6c5d3] dark:border-[#1e2230] bg-white dark:bg-[#07080d]/40 transition-colors duration-200">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left details */}
                    <div class="col-span-12 lg:col-span-5 space-y-5">
                        <div class="flex items-center gap-2">
                            <span class="inline-block px-2.5 py-1 bg-[#e3e1e9] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                // NATIVE DESKTOP IDE
                            </span>
                            <span class="inline-block px-2 py-0.5 bg-[#28ca41]/10 text-[#1b882d] dark:text-[#28ca41] text-[11px] font-['JetBrains_Mono',monospace] rounded">
                                v0.1.0 Preview
                            </span>
                        </div>

                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                            Meet Zenthree.
                        </h2>

                        <p class="text-sm sm:text-base text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                            A lightweight, GPU-accelerated code editor built from scratch in Rust on the Zenthra GUI engine. Instant startup, Tree-sitter syntax highlighting, embedded PTY terminal, and native autonomous agent intelligence powered by <strong class="text-purple-700 dark:text-purple-400 font-semibold">ZENE</strong>.
                        </p>

                        {/* Minimal specs */}
                        <div class="grid grid-cols-2 gap-3 pt-1 text-xs font-['JetBrains_Mono',monospace] text-[#1b1b21] dark:text-[#e2e8f0]">
                            <div class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                <span>&lt; 4ms Frame Times</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                <span>Tree-sitter Highlighting</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                <span>Embedded PTY Shell</span>
                            </div>
                            <a href="/products/zene" class="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-semibold hover:underline">
                                <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                <span>Powered by ZENE</span>
                            </a>
                        </div>

                        {/* Actions */}
                        <div class="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href="/products/zenthra/apps/zenthree/download"
                                class="py-2.5 px-5 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Zenthree
                            </a>
                            <a
                                href="/products/zenthra/apps/zenthree"
                                class="py-2.5 px-4 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-[#e2e8f0] hover:bg-[#f5f2fa] dark:hover:bg-[#151928] font-medium rounded-[4px] text-xs sm:text-sm transition-colors"
                            >
                                Features &amp; Specs
                            </a>
                            <a
                                href="/products/zene"
                                class="py-2.5 px-3.5 border border-purple-500/40 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 font-medium rounded-[4px] text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                            >
                                <span>ZENE Agent</span>
                                &rarr;
                            </a>
                            <a
                                href="https://github.com/kabirajpan/zenthree"
                                target="_blank"
                                rel="noopener"
                                class="py-2.5 px-3 border border-[#c6c5d3] dark:border-[#1e2230] text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white hover:bg-[#f5f2fa] dark:hover:bg-[#151928] font-medium rounded-[4px] text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                                title="View Zenthree on GitHub"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Screenshot in its exact, natural, uncropped shape */}
                    <div class="col-span-12 lg:col-span-7">
                        <div class="rounded-[4px] border border-[#c6c5d3] dark:border-[#1e2230] overflow-hidden shadow-2xl bg-[#0b0813] group">
                            <img
                                src="/assets/screenshots/zenthree/glassmorphism_mode.png"
                                alt="Zenthree Code Editor Interface"
                                class="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-300"
                                width={1366}
                                height={768}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
