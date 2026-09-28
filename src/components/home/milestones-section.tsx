import { component$ } from "@builder.io/qwik";

export const MilestonesSection = component$(() => {
    return (
        <section class="border-b border-[#c6c5d3] dark:border-[#1e2230] bg-transparent transition-colors duration-200">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
                {/* 3-Column Minimalist Divider Grid */}
                <div class="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#c6c5d3]/70 dark:divide-[#1e2230]">
                    {/* 1. After Motion */}
                    <div class="py-5 md:py-1 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between">
                        <div>
                            <div class="text-[11px] font-['JetBrains_Mono',monospace] text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider mb-2">
                                After Motion · Mobile Editor
                            </div>
                            <div class="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-2">
                                <span class="font-['JetBrains_Mono',monospace] text-2xl sm:text-3xl font-bold text-[#1b1b21] dark:text-white">
                                    20k+
                                </span>
                                <span class="text-xs text-[#767683] dark:text-[#94a3b8]">downloads</span>
                                <span class="text-xs text-[#c6c5d3] dark:text-[#2a3048]">/</span>
                                <span class="font-['JetBrains_Mono',monospace] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">
                                    4,000+
                                </span>
                                <span class="text-xs text-[#767683] dark:text-[#94a3b8]">users</span>
                            </div>
                            <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Multitrack mobile video editor powered by our custom Rust GPU compositor on Google Play.
                            </p>
                        </div>
                        <div class="pt-4">
                            <a
                                href="/products/after-motion"
                                class="inline-flex items-center gap-1 text-xs text-[#4352a5] dark:text-[#818cf8] hover:underline"
                            >
                                View product →
                            </a>
                        </div>
                    </div>

                    {/* 2. Zenthra UI Framework */}
                    <div class="py-5 md:py-1 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between">
                        <div>
                            <div class="text-[11px] font-['JetBrains_Mono',monospace] text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider mb-2">
                                Native GUI Runtime
                            </div>
                            <div class="mb-2">
                                <span class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">
                                    Production Ready
                                </span>
                            </div>
                            <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Zenthra UI framework is ready for production apps. Immediate-mode layouts, sub-4ms frame times, and WGPU rendering.
                            </p>
                        </div>
                        <div class="pt-4">
                            <a
                                href="/products/zenthra/docs/"
                                class="inline-flex items-center gap-1 text-xs text-[#4352a5] dark:text-[#818cf8] hover:underline"
                            >
                                Documentation →
                            </a>
                        </div>
                    </div>

                    {/* 3. Zene Agentic AI */}
                    <div class="py-5 md:py-1 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between">
                        <div>
                            <div class="text-[11px] font-['JetBrains_Mono',monospace] text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider mb-2">
                                Autonomous Intelligence
                            </div>
                            <div class="mb-2">
                                <span class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">
                                    Now Open Source
                                </span>
                            </div>
                            <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                Zene Agentic AI is now open source. Built for local code analysis, syntax tree AST perception, and agent workflows.
                            </p>
                        </div>
                        <div class="pt-4">
                            <a
                                href="https://github.com/kabirajpan/zenthra-v2"
                                target="_blank"
                                rel="noopener"
                                class="inline-flex items-center gap-1 text-xs text-[#4352a5] dark:text-[#818cf8] hover:underline"
                            >
                                GitHub repository →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Minimalist Contributor Strip */}
                <div class="mt-8 pt-5 border-t border-[#c6c5d3]/60 dark:border-[#1e2230] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-2 text-[#454651] dark:text-[#94a3b8]">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#28ca41] shrink-0" />
                        <span>We welcome contributors — help us build native tools, write docs, or test crates.</span>
                    </div>
                    <div class="flex items-center gap-4 font-medium shrink-0">
                        <a
                            href="https://github.com/kabirajpan/zenthra-v2"
                            target="_blank"
                            rel="noopener"
                            class="text-[#4352a5] dark:text-[#818cf8] hover:underline flex items-center gap-1"
                        >
                            Contribute on GitHub ↗
                        </a>
                        <a
                            href="/open-source"
                            class="text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white transition-colors"
                        >
                            Open Source Hub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
});
