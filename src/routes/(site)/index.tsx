import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero3DScene from "../../components/hero/hero3d";
import HeroSquares from "../../components/background/hero-squares";

// ── Thumbnails ────────────────────────────────────────────────────────────────

const ZenthraThumbnail = component$(() => (
    <div class="w-full h-full bg-[#071025] flex flex-col p-4 font-['JetBrains_Mono',monospace]">
        <div class="flex items-center gap-1.5 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
            <span class="ml-2 text-[10px] text-[#9aa6e0]">zenthra.rs</span>
        </div>
        <div class="flex flex-col gap-1 text-[11px] leading-relaxed">
            <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
            <div class="h-1" />
            <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
            <div class="pl-4"><span class="text-[#bfc9d9]">App::new()</span></div>
            <div class="pl-8"><span class="text-[#61afef] font-bold">.with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
            <div class="pl-12"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"Hello!"</span><span class="text-[#bfc9d9]">).show();</span></div>
            <div class="pl-8"><span class="text-[#bfc9d9]">{"}"})</span></div>
            <div class="pl-8"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
            <div><span class="text-[#bfc9d9]">{"}"}</span></div>
        </div>
        <div class="mt-auto flex gap-3">
            <span class="text-[10px] text-[#7ee787]">▲ build 4ms</span>
            <span class="text-[10px] text-[#9aa6e0]">0 deps</span>
            <span class="text-[10px] text-[#9aa6e0]">99.9% uptime</span>
        </div>
    </div>
));

const ZenthraViewThumbnail = component$(() => (
    <div class="w-full h-full bg-[#e9e7ef] flex items-center justify-center">
        <img
            src="/assets/screenshots/zenthra_viewer/04.jpeg"
            alt="Zenthra View"
            class="w-full h-full object-cover"
        />
    </div>
));

const AfterMotionThumbnail = component$(() => (
    <div class="w-full h-full relative overflow-hidden flex items-center justify-center"
        style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);">
        <div class="absolute inset-0 opacity-10"
            style="background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 48px);" />
        <div class="relative flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full flex items-center justify-center"
                style="background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.25);">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <span class="text-white text-xs font-['DM_Sans',sans-serif] font-medium tracking-wide opacity-80">After Motion</span>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-8 flex items-end gap-0.5 px-4 pb-2 opacity-30">
            {[3, 5, 8, 4, 9, 6, 11, 7, 5, 9, 4, 8, 6, 10, 5, 7, 9, 4, 6, 8].map((h, i) => (
                <div key={i} class="flex-1 rounded-sm bg-white" style={`height: ${h * 2}px`} />
            ))}
        </div>
    </div>
));

const DomoThumbnail = component$(() => (
    <div class="w-full h-full bg-[#f5f2fa] flex items-end justify-center gap-2 px-6 pb-4">
        {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
            <div key={i} class="flex-1 rounded-t-sm bg-[#5c6bc0] opacity-70" style={`height: ${h}%`} />
        ))}
    </div>
));

// ── Page ─────────────────────────────────────────────────────────────────────

export default component$(() => {
    return (
        <div class="relative bg-[#fbf8ff] text-[#1b1b21] min-h-screen overflow-hidden">
            {/* ── Hero Section ── */}
            <section class="relative min-h-[80vh] flex items-center pt-8 border-b border-[#c6c5d3]">
                {/* Background Grid Elements */}
                <div class="absolute inset-0 z-0 pointer-events-none">
                    <div class="hero-grid-mesh" />
                    <div class="hero-grid-fade" />
                </div>

                <HeroSquares />
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10 w-full">
                    <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div class="lg:col-span-7 space-y-6">
                            <span class="inline-block px-3 py-1 bg-[#e3e1e9] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                // NATIVE SOFTWARE RESEARCH LABS
                            </span>
                            <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1b1b21] leading-[1.1] tracking-tight">
                                Forging the next generation of native software.
                            </h1>
                            <p class="text-base lg:text-lg text-[#454651] leading-relaxed max-w-2xl">
                                We design and build GPU-accelerated developer tools, immediate-mode graphics frameworks, and latency-critical native applications. Zero-runtime overhead, local-first architectures, and extreme speed are built into our DNA.
                            </p>
                            <div class="flex flex-wrap gap-4 pt-4">
                                <a href="/products" class="py-2.5 px-6 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] hover:brightness-110 transition-all text-sm shadow-md shadow-[#5c6bc0]/25">
                                    Explore Ecosystem
                                </a>
                                <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener" class="py-2.5 px-6 bg-white border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#f5f2fa] transition-all text-sm flex items-center gap-2 shadow-sm shadow-[#c6c5d3]/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    View GitHub
                                </a>
                                <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener" class="py-2.5 px-6 bg-white border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#f5f2fa] transition-all text-sm flex items-center gap-2 shadow-sm shadow-[#c6c5d3]/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    crates.io
                                </a>
                            </div>
                        </div>

                        {/* Interactive 3D Screen Visual */}
                        <div class="lg:col-span-5 w-full flex justify-center">
                            <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg h-[390px] sm:h-[410px] lg:h-auto lg:aspect-[4/3] relative">
                                <Hero3DScene />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Philosophy Section ── */}
            <section class="border-b border-[#c6c5d3] bg-white">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21]">Our Engineering Philosophy</h2>
                        <p class="text-[#454651] text-sm">We believe that modern software has become bloated, slow, and overly reliant on network infrastructure. Zenthra Labs is a return to efficiency and craftsmanship.</p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                ),
                                title: "Zero Runtime Overhead",
                                desc: "No runtime interpreters, no virtual machine layers, and no garbage collection pauses. Applications build directly to flat machine instructions for optimal CPU efficiency."
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" />
                                    </svg>
                                ),
                                title: "Extreme Low Latency",
                                desc: "Engineered specifically for real-time responsiveness. Our UI systems and layout engines operate below human perception limits, providing instant state updates."
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73L13 3l-7 3.27A2 2 0 0 0 5 8v8a2 2 0 0 0 1 1.73L11 21l7-3.27A2 2 0 0 0 19 16z" />
                                    </svg>
                                ),
                                title: "Local-First & Secure",
                                desc: "No mandatory subscriptions, offline telemetry, or cloud logins. Your data is stored locally, fully owned by you, and processed directly on-device."
                            }
                        ].map((item, idx) => (
                            <div key={idx} class="p-6 border border-[#c6c5d3] rounded-[4px] bg-[#fbf8ff] hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                                <div class="w-10 h-10 rounded-[4px] bg-[#e9e7ef] text-[#4352a5] flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">{item.title}</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Ecosystem ── */}
            <section class="border-b border-[#c6c5d3] bg-[#fbf8ff]">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-end gap-4 mb-12">
                        <div>
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] block mb-2">Our Work</span>
                            <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21]">Flagship Projects</h2>
                        </div>
                        <a href="/products" class="text-sm font-medium text-[#4352a5] hover:underline flex items-center gap-1 self-start sm:self-auto">
                            View Catalog &rarr;
                        </a>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8">
                        {/* Zenthra */}
                        <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                                <ZenthraThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">UI Framework</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] mb-2">Zenthra</h3>
                                <p class="text-[#454651] text-sm leading-relaxed flex-grow">A high-performance, Rust-based immediate-mode UI framework for desktop applications with native window features, dynamic widgets, and a custom WGPU renderer.</p>
                                <div class="mt-6">
                                    <a href="/products/zenthra" class="inline-block py-2 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* After Motion */}
                        <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                                <AfterMotionThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">Mobile Video Editor</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] mb-2">After Motion</h3>
                                <p class="text-[#454651] text-sm leading-relaxed flex-grow">A professional-grade on-device video composition app built for creators. Non-destructive timeline editing, precise cutting, and premium audio-video alignment without cloud rendering delays.</p>
                                <div class="mt-6">
                                    <a href="/products/after-motion" class="inline-block py-2 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Zenthra View */}
                        <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                                <ZenthraViewThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">Desktop Application</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] mb-2">Zenthra View</h3>
                                <p class="text-[#454651] text-sm leading-relaxed flex-grow">A native, cross-platform image viewer constructed using the Zenthra UI framework. Smooth canvas zooming, directory trees, slideshow settings, and a high-performance filmstrip.</p>
                                <div class="mt-6">
                                    <a href="/products/zenthra/apps/zenthra-view" class="inline-block py-2 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Domo */}
                        <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] hover:-translate-y-1 transition-all duration-200">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                                <DomoThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">Interactive Visualization</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] mb-2">Domo</h3>
                                <p class="text-[#454651] text-sm leading-relaxed flex-grow">An experimental dashboard demonstrating real-time interactive coordinate tracking, canvas charts, dynamic slider states, and live responsive widgets.</p>
                                <div class="mt-6">
                                    <a href="/products/domo" class="inline-block py-2 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sub CTA Banner ── */}
            <section class="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
                <div class="bg-[#071025] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Build native experiences with us.</h2>
                        <p class="text-[#9aa6e0] text-sm">Join the open source development or read our framework documentation.</p>
                    </div>
                    <div class="flex flex-wrap gap-3 flex-shrink-0">
                        <a href="/products/zenthra" class="py-2.5 px-6 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm">
                            Get Zenthra SDK
                        </a>
                        <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener" class="py-2.5 px-6 border border-white/20 text-white font-medium rounded-[4px] hover:bg-white/10 transition-all text-sm">
                            GitHub Repository
                        </a>
                        <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener" class="py-2.5 px-6 border border-white/20 text-white font-medium rounded-[4px] hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            crates.io
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Zenthra Labs — High-Performance Native Systems & Frameworks",
    meta: [
        { name: "description", content: "Zenthra Labs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
        { property: "og:title", content: "Zenthra Labs — High-Performance Native Systems & Frameworks" },
        { property: "og:description", content: "Zenthra Labs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Zenthra Labs — High-Performance Native Systems & Frameworks" },
        { name: "twitter:description", content: "Zenthra Labs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
    ],
};
