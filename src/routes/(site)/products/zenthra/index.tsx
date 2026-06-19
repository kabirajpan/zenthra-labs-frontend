import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// ── Feature cards data ────────────────────────────────────────────────────────

const FEATURES = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: "Zero Runtime",
        desc: "No virtual DOM, no garbage collector pauses. Zenthra compiles your UI to direct native calls.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" />
            </svg>
        ),
        title: "4ms Latency",
        desc: "Input-to-pixel latency measured at 4ms on target hardware. Feels instant because it is.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73L13 3l-7 3.27A2 2 0 0 0 5 8v8a2 2 0 0 0 1 1.73L11 21l7-3.27A2 2 0 0 0 19 16z" />
            </svg>
        ),
        title: "Rust-Powered",
        desc: "Written in Rust for memory safety and predictable performance. No undefined behavior, ever.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
        title: "Native Widgets",
        desc: "Every widget maps 1:1 to a platform-native control. Looks right on Linux, macOS, and Windows.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
                <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
                <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
                <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
                <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
                <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
            </svg>
        ),
        title: "Composable API",
        desc: "Build complex layouts by composing simple, orthogonal widgets. No magic, no hidden state.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
        ),
        title: "Cross-Platform",
        desc: "One codebase. Ship to Linux, macOS, and Windows with native look and feel on each.",
    },
];

// ── Apps built with Zenthra ───────────────────────────────────────────────────

const BUILT_WITH = [
    {
        href: "/products/zenthra/apps/zenthra-view",
        name: "Zenthra View",
        type: "Desktop App",
        badge: "Example App",
        badgeClass: "bg-[#e9e7ef] text-[#454651]",
        desc: "A native desktop image viewer with file browser, zoom, rotation, and slideshow mode.",
        thumbnail: (
            <div class="w-full h-full bg-[#e9e7ef] flex items-center justify-center">
                <img
                    src="/assets/screenshots/zenthra_viewer/04.jpeg"
                    alt="Zenthra View"
                    class="w-full h-full object-cover"
                />
            </div>
        ),
    },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default component$(() => {
    return (
        <>
            {/* ── Hero ── */}
            <section class="border-b border-[#c6c5d3]">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    {/* Breadcrumb */}
                    <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                        <a href="/products" class="text-[#767683] hover:text-[#4352a5] transition-colors">Products</a>
                        <span class="text-[#c6c5d3]">/</span>
                        <span class="text-[#1b1b21]">Zenthra</span>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <span class="inline-block px-3 py-1 bg-[#e3e1e9] text-[#454651] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider mb-5 rounded-[4px]">
                                UI Framework · v1.2 Stable
                            </span>
                            <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold text-[#1b1b21] mb-5 leading-tight tracking-tight">
                                Zenthra
                            </h1>
                            <p class="text-base sm:text-lg text-[#454651] leading-relaxed mb-8 max-w-lg">
                                A high-performance, Rust-based UI framework for building native desktop applications with zero-runtime overhead and 4ms input latency.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener"
                                    class="py-2 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] hover:brightness-110 transition-all text-sm flex items-center gap-2">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    View on GitHub
                                </a>
                                <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener"
                                    class="py-2 px-5 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#e9e7ef] transition-all text-sm flex items-center gap-2">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    crates.io
                                </a>
                                <a href="#docs"
                                    class="py-2 px-5 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#e9e7ef] transition-all text-sm">
                                    Read the Docs
                                </a>
                                {/* zenthra.dev — mock, not live yet */}
                                <span
                                    title="Coming soon — zenthra.dev is not live yet"
                                    class="relative group py-2 px-5 border border-dashed border-[#c6c5d3] text-[#767683] font-medium rounded-[4px] text-sm flex items-center gap-2 cursor-not-allowed select-none"
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                    zenthra.dev
                                    <span class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1b1b21] text-white text-[10px] font-['JetBrains_Mono',monospace] px-2 py-1 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        Coming soon
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { value: "4ms", label: "Input latency", sub: "measured on target hardware" },
                                { value: "0", label: "Runtime deps", sub: "zero external dependencies" },
                                { value: "Rust", label: "Language", sub: "memory-safe, no GC pauses" },
                                { value: "3", label: "Platforms", sub: "Linux · macOS · Windows" },
                            ].map((s) => (
                                <div key={s.value} class="bg-white border border-[#c6c5d3] rounded-[4px] p-5">
                                    <div class="font-['Syne',sans-serif] text-2xl font-bold text-[#4352a5] mb-1">{s.value}</div>
                                    <div class="text-sm font-bold text-[#1b1b21] mb-0.5">{s.label}</div>
                                    <div class="text-xs text-[#767683]">{s.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Code sample ── */}
            <section class="bg-[#f5f2fa] border-b border-[#c6c5d3] overflow-hidden">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] mb-4">Simple by design.</h2>
                        <p class="text-[#454651] text-sm leading-relaxed mb-4">
                            Zenthra's API is intentionally minimal. You describe your interface as composable widgets — the framework handles the rest. No lifecycle hooks, no re-render cycles, no magic.
                        </p>
                        <p class="text-[#454651] text-sm leading-relaxed">
                            The entire widget tree compiles to a flat sequence of native draw calls at build time. What ships is a tiny binary with zero interpreter overhead.
                        </p>
                    </div>

                    {/* Dark code block */}
                    <div class="bg-[#071025] rounded-[6px] overflow-hidden shadow-xl w-full">
                        <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                            <span class="ml-3 text-[11px] text-[#9aa6e0] font-['JetBrains_Mono',monospace]">main.rs</span>
                        </div>
                        <div class="p-5 font-['JetBrains_Mono',monospace] text-[10px] sm:text-[12.5px] leading-relaxed flex flex-col gap-0.5 overflow-x-auto">
                            <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                            <div class="h-2" />
                            <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                            <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                            <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"My App"</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">size</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">800</span><span class="text-[#bfc9d9]">, </span><span class="text-[#d19a66]">600</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                            <div class="pl-13"><span class="text-[#bfc9d9]">ui.container()</span></div>
                            <div class="pl-17"><span class="text-[#61afef]">.fill</span><span class="text-[#bfc9d9] font-bold">()</span></div>
                            <div class="pl-17"><span class="text-[#61afef]">.show</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                            <div class="pl-21"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"Hello Zenthra!"</span><span class="text-[#bfc9d9]">).show();</span></div>
                            <div class="pl-17"><span class="text-[#bfc9d9]">{"}"});</span></div>
                            <div class="pl-9"><span class="text-[#bfc9d9]">{"}"})</span></div>
                            <div class="pl-9"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                            <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                            <div class="h-2" />
                            <div><span class="text-[#6a7b8a] italic">{"// builds in 4ms · ships a 1.2MB binary"}</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section class="border-b border-[#c6c5d3]">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] mb-2">What makes it different.</h2>
                    <p class="text-[#454651] text-sm mb-10">Zenthra is opinionated about the things that matter and silent about everything else.</p>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map((f) => (
                            <div key={f.title} class="bg-white border border-[#c6c5d3] rounded-[4px] p-5 hover:border-[#4352a5] transition-all">
                                <div class="text-[#5c6bc0] mb-3">{f.icon}</div>
                                <h3 class="font-['Syne',sans-serif] font-bold text-[#1b1b21] text-sm mb-1.5">{f.title}</h3>
                                <p class="text-[#454651] text-xs leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Built with Zenthra ── */}
            <section class="border-b border-[#c6c5d3]">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] mb-2">Built with Zenthra.</h2>
                    <p class="text-[#454651] text-sm mb-10">Real apps shipping with the framework today.</p>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BUILT_WITH.map((app) => (
                            <a key={app.name} href={app.href} class="block no-underline group">
                                <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col h-full hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                                    <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                                        {app.thumbnail}
                                    </div>
                                    <div class="p-5 flex flex-col flex-grow">
                                        <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">{app.type}</p>
                                        <div class="flex flex-wrap items-center gap-2 mb-2">
                                            <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21]">{app.name}</h3>
                                            <span class={`px-2 py-0.5 text-xs rounded-[4px] font-medium ${app.badgeClass}`}>{app.badge}</span>
                                        </div>
                                        <p class="text-[#454651] text-sm leading-relaxed flex-grow">{app.desc}</p>
                                        <div class="mt-4">
                                            <span class="py-2 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm inline-block group-hover:brightness-110 transition-all">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}

                        {/* Placeholder — more coming */}
                        <div class="bg-[#fbf8ff] border border-dashed border-[#c6c5d3] rounded-[4px] flex flex-col items-center justify-center p-10 gap-3 opacity-60">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6c5d3" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
                            </svg>
                            <p class="text-xs font-['JetBrains_Mono',monospace] text-[#c6c5d3] tracking-widest text-center">More apps<br />coming soon</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Get started CTA ── */}
            <section class="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
                <div class="bg-[#071025] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Start building with Zenthra.</h2>
                        <p class="text-[#9aa6e0] text-sm">Open source. MIT licensed. No account required.</p>
                    </div>
                    <div class="flex flex-wrap gap-3 flex-shrink-0">
                        <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener"
                            class="py-2.5 px-6 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                            GitHub
                        </a>
                        <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener"
                            class="py-2.5 px-6 border border-white/20 text-white font-medium rounded-[4px] hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            crates.io
                        </a>
                        <a href="#docs"
                            class="py-2.5 px-6 border border-white/20 text-white font-medium rounded-[4px] hover:bg-white/10 transition-all text-sm">
                            Documentation
                        </a>
                        {/* zenthra.dev — mock, swap href to https://zenthra.dev when live */}
                        <span
                            title="Coming soon — zenthra.dev is not live yet"
                            class="relative group py-2.5 px-6 border border-dashed border-white/20 text-white/40 font-medium rounded-[4px] text-sm flex items-center gap-2 cursor-not-allowed select-none"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            zenthra.dev
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#1b1b21] text-[10px] font-['JetBrains_Mono',monospace] px-2 py-1 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Coming soon
                            </span>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
});

export const head: DocumentHead = {
    title: "Zenthra — High-Performance Rust UI Framework | Zenthra Labs",
    meta: [
        { name: "description", content: "Zenthra is a Rust-based UI framework for building native desktop applications with zero-runtime overhead and 4ms input latency." },
    ],
};
