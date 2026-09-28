import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero3DScene from "../../components/hero/hero3d";
import HeroSquares from "../../components/background/hero-squares";
import { MilestonesSection } from "../../components/home/milestones-section";
import { ZenthreeSpotlight } from "../../components/home/zenthree-spotlight";

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

const ZenFileThumbnail = component$(() => (
    <div class="w-full h-full bg-[#e9e7ef] flex items-center justify-center">
        <img
            src="/assets/screenshots/zenfile/main-default-size-and-color.png"
            alt="ZenFile"
            class="w-full h-full object-cover"
        />
    </div>
));

const AfterMotionThumbnail = component$(() => (
    <div class="w-full h-full bg-[#0b0813] relative overflow-hidden flex items-center justify-center py-2">
        <div 
            class="absolute inset-0 bg-cover bg-center blur-md opacity-20 scale-110"
            style="background-image: url('/assets/screenshots/after-motion/android-medium-1.png');"
        />
        <img
            src="/assets/screenshots/after-motion/android-medium-1.png"
            alt="After Motion"
            class="h-full w-auto object-contain relative z-10 rounded-[4px] shadow-xl"
        />
    </div>
));

const ZenthreeThumbnail = component$(() => (
    <div class="w-full h-full bg-[#0b0813] flex items-center justify-center overflow-hidden">
        <img
            src="/assets/screenshots/zenthree/glassmorphism_mode.png"
            alt="Zenthree Code Editor"
            class="w-full h-full object-cover"
        />
    </div>
));

const ZeneTerminalThumbnail = component$(() => (
    <div class="w-full h-full bg-[#071025] flex flex-col p-3.5 font-['JetBrains_Mono',monospace] text-[11px] leading-relaxed relative overflow-hidden select-none">
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span class="ml-2 text-[10px] text-[#9aa6e0] font-semibold">zene agent</span>
            </div>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">100Hz</span>
        </div>
        <div class="flex flex-col gap-1 text-[10.5px]">
            <div><span class="text-purple-400">&gt; </span><span class="text-white">zene "Refactor AST parser"</span></div>
            <div class="text-[9.5px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                [Reflex]: EXECUTION · 11.4 µs (0.00% wipe)
            </div>
            <div class="pl-2 border-l border-slate-700 text-slate-400 text-[10px] space-y-0.5">
                <div>⚡ Tool Masking: 13 tools provisioned</div>
                <div>📁 AST: 42 files indexed (Tree-sitter)</div>
                <div>🔧 edit_file(src/parser.rs:L142)</div>
            </div>
            <div class="text-[10px] text-emerald-400 font-semibold">✓ 18 tests passed · 0 compile errors</div>
        </div>
        <div class="mt-auto flex items-center justify-between text-[10px] text-[#9aa6e0] pt-2 border-t border-white/5">
            <span class="text-emerald-400">▲ &lt; 15µs reflex</span>
            <span>500 neurons</span>
            <span>0 deps</span>
        </div>
    </div>
));

const SLIDES = [
    {
        src: "/assets/slider/zenthree.png",
        title: "Zenthree Code Editor",
        desc: "High-performance GPU-accelerated code editor with Tree-sitter syntax highlighting, PTY terminal, and frosted glass UI."
    },
    {
        src: "/assets/slider/zenthra_view.jpeg",
        title: "Zenthra View",
        desc: "A native image viewer built using Zenthra's dual-pass frosted glass textures and GPU paint canvas."
    },
    {
        src: "/assets/slider/zenfile.png",
        title: "ZenFile Manager",
        desc: "High performance desktop explorer demonstrating layout hierarchy alignment boxes."
    },
    {
        src: "/assets/slider/zenthra_viewer_04.jpeg",
        title: "Interactive Canvas Operations",
        desc: "Immediate mode context menus and hardware render canvas zooming options."
    },
    {
        src: "/assets/slider/zenthra_viewer_05.png",
        title: "Native Font Rendering",
        desc: "Pixel-perfect text layout formatting using GPU atlas systems and cosmic-text fallbacks."
    }
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default component$(() => {
    const activeSlide = useSignal(0);

    useVisibleTask$(({ cleanup }) => {
        const interval = setInterval(() => {
            activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
        }, 4000);
        cleanup(() => clearInterval(interval));
    });

    return (
        <div class="relative bg-transparent text-[#1b1b21] dark:text-[#e2e8f0] min-h-screen overflow-hidden transition-colors duration-200">
            {/* ── Hero Section ── */}
            <section class="relative min-h-[80vh] flex items-center pt-8 border-b border-[#c6c5d3] dark:border-[#1e2230]">
                {/* Background Grid Elements */}
                <div class="absolute inset-0 z-0 pointer-events-none">
                    <div class="hero-grid-mesh" />
                    <div class="hero-grid-fade" />
                </div>

                <HeroSquares />
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10 w-full">
                    <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div class="lg:col-span-7 space-y-6">
                            <span class="inline-block px-3 py-1 bg-[#e3e1e9] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                // NATIVE SOFTWARE RESEARCH LABS
                            </span>
                            <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1b1b21] dark:text-white leading-[1.1] tracking-tight">
                                Forging the next generation of native software.
                            </h1>
                            <p class="text-base lg:text-lg text-[#454651] dark:text-[#94a3b8] leading-relaxed max-w-2xl">
                                We design and build GPU-accelerated developer tools, immediate-mode graphics frameworks, and latency-critical native applications. Zero-runtime overhead, local-first architectures, and extreme speed are built into our DNA.
                            </p>
                            <div class="flex flex-wrap gap-4 pt-4">
                                <a href="/products" class="py-2.5 px-6 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm shadow-md shadow-[#5c6bc0]/25">
                                    Explore Ecosystem
                                </a>
                                <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener" class="py-2.5 px-6 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all text-sm flex items-center gap-2 shadow-sm">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    View GitHub
                                </a>
                                <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener" class="py-2.5 px-6 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all text-sm flex items-center gap-2 shadow-sm">
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

            {/* ── Milestones & Open Source Momentum Section ── */}
            <MilestonesSection />

            {/* ── Zenthree Spotlight Section ── */}
            <ZenthreeSpotlight />

            {/* ── Philosophy Section ── */}
            <section class="border-b border-[#c6c5d3] dark:border-[#1e2230] bg-white dark:bg-[#07080d]/60 transition-colors duration-200">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] dark:text-white">Our Engineering Philosophy</h2>
                        <p class="text-[#454651] dark:text-[#94a3b8] text-sm">We believe that modern software has become bloated, slow, and overly reliant on network infrastructure. ZenthraLabs is a return to efficiency and craftsmanship.</p>
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
                            <div key={idx} class="p-6 border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] bg-[#fbf8ff] dark:bg-[#0e1017] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200">
                                <div class="w-10 h-10 rounded-[4px] bg-[#e9e7ef] dark:bg-[#161928] text-[#4352a5] dark:text-[#818cf8] border border-transparent dark:border-[#312e81]/40 flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-2">{item.title}</h3>
                                <p class="text-sm text-[#454651] dark:text-[#94a3b8] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Showcase Image Slider ── */}
            <section class="border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-transparent transition-colors duration-200">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                    <div class="text-center max-w-2xl mx-auto mb-10">
                        <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#1b1b21] dark:text-white mb-3">
                            Showcase Gallery
                        </h2>
                        <p class="text-sm text-[#454651] dark:text-[#94a3b8]">
                            Take a look at low-latency desktop application interfaces engineered directly on our systems.
                        </p>
                    </div>

                    {/* Image Slider Wrapper */}
                    <div class="relative bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] shadow-sm overflow-hidden group">
                        {/* Slide Display Area */}
                        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] bg-neutral-100 dark:bg-[#07080d] flex items-center justify-center">
                            {SLIDES.map((slide, index) => (
                                <div
                                    key={slide.title}
                                    class={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                                        index === activeSlide.value
                                            ? "translate-x-0 opacity-100 pointer-events-auto"
                                            : index < activeSlide.value
                                                ? "-translate-x-full opacity-0 pointer-events-none"
                                                : "translate-x-full opacity-0 pointer-events-none"
                                    }`}
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        class="max-w-full max-h-full object-contain select-none"
                                    />
                                    
                                    {/* Bottom Captions Overlay */}
                                    <div class="absolute bottom-0 inset-x-0 bg-white/90 dark:bg-[#07080d]/85 backdrop-blur-sm text-neutral-900 dark:text-white p-5 border-t border-[#c6c5d3] dark:border-[#1e2230] transition-opacity duration-300">
                                        <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-1">
                                             {slide.title}
                                        </h3>
                                        <p class="text-xs text-[#454651] dark:text-[#cbd5e1] leading-relaxed max-w-2xl">
                                            {slide.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick$={() => {
                                activeSlide.value = (activeSlide.value - 1 + SLIDES.length) % SLIDES.length;
                            }}
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-[#0e1017]/90 backdrop-blur-sm border border-[#c6c5d3] dark:border-[#1e2230] flex items-center justify-center hover:bg-[#5c6bc0] hover:text-white hover:border-[#5c6bc0] transition-all text-[#1b1b21] dark:text-white focus:outline-none z-10 opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                            aria-label="Previous Slide"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            onClick$={() => {
                                activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
                            }}
                            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-[#0e1017]/90 backdrop-blur-sm border border-[#c6c5d3] dark:border-[#1e2230] flex items-center justify-center hover:bg-[#5c6bc0] hover:text-white hover:border-[#5c6bc0] transition-all text-[#1b1b21] dark:text-white focus:outline-none z-10 opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                            aria-label="Next Slide"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>

                    {/* Centered Thumbnail Track (Selected item always at center) */}
                    <div class="relative w-full max-w-md sm:max-w-lg mx-auto mt-6 overflow-hidden py-2">
                        {/* Soft edge fade masks */}
                        <div class="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fbf8ff] dark:from-[#07080d] to-transparent z-10" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#fbf8ff] dark:from-[#07080d] to-transparent z-10" />

                        {/* Sliding Track centered on activeSlide */}
                        <div
                            class="flex items-center gap-3 transition-transform duration-500 ease-out will-change-transform"
                            style={{
                                transform: `translateX(calc(50% - ${(activeSlide.value * 96) + 42}px))`
                            }}
                        >
                            {SLIDES.map((slide, index) => {
                                const isActive = index === activeSlide.value;
                                return (
                                    <button
                                        key={slide.title}
                                        onClick$={() => {
                                            activeSlide.value = index;
                                        }}
                                        class={`w-[84px] h-[52px] shrink-0 rounded-[2px] overflow-hidden border transition-all duration-300 cursor-pointer p-0.5 bg-neutral-100 dark:bg-[#0e1017] ${
                                            isActive
                                                ? "border-[#5c6bc0] ring-2 ring-[#5c6bc0]/50 opacity-100 scale-105 shadow-md z-20"
                                                : "border-[#c6c5d3] dark:border-[#1e2230] opacity-40 hover:opacity-85 hover:border-[#5c6bc0]/60 scale-95"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                                        title={slide.title}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.title}
                                            class="w-full h-full object-cover object-top rounded-[1px]"
                                            width={84}
                                            height={52}
                                            loading="lazy"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Featured Ecosystem ── */}
            {/* ── Featured Ecosystem ── */}
            <section class="border-b border-[#c6c5d3] dark:border-[#1e2230] bg-transparent transition-colors duration-200">
                <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-end gap-4 mb-12">
                        <div>
                            <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] block mb-2">Our Work</span>
                            <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] dark:text-white">Flagship Projects</h2>
                        </div>
                        <a href="/products" class="text-sm font-medium text-[#4352a5] dark:text-[#818cf8] hover:underline flex items-center gap-1 self-start sm:self-auto">
                            View Catalog &rarr;
                        </a>
                    </div>

                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 1. Zenthra */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <ZenthraThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] mb-2">UI Framework</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-2">Zenthra</h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">A high-performance, Rust-based immediate-mode UI framework for desktop applications with native window features, dynamic widgets, and a custom WGPU renderer.</p>
                                <div class="mt-6">
                                    <a href="/products/zenthra" class="inline-block py-2 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 2. Zenthree */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <ZenthreeThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] mb-2">Desktop Code Editor &amp; IDE</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-2">Zenthree</h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">A high-performance code editor built in Rust with Zenthra. Tree-sitter semantic syntax, native PTY terminal drawer, and an integrated AI assistant sidecar.</p>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <a href="/products/zenthra/apps/zenthree" class="inline-block py-2 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                    <a href="/products/zenthra/apps/zenthree/download" class="inline-block py-2 px-5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all">
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 3. After Motion */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <AfterMotionThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] mb-2">Mobile Video Editor</p>
                                <h3 class="font-['Syne',sans-serif] mb-2">
                                    <img
                                        src="/assets/screenshots/after-motion/logos/full.png"
                                        alt="After Motion"
                                        class="h-7 w-auto object-contain rounded-[4px]"
                                    />
                                </h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">A professional-grade on-device video composition app built for creators. Non-destructive timeline editing, precise cutting, and premium audio-video alignment without cloud rendering delays.</p>
                                <div class="mt-6 flex flex-wrap gap-2.5">
                                    <a href="/products/after-motion" class="inline-block py-2 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                    <a 
                                        href="https://play.google.com/store/apps/details?id=com.aftermotion.app" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        class="inline-flex items-center gap-1.5 py-2 px-4 bg-[#12131a] text-white font-medium rounded-[4px] text-sm hover:bg-[#1b1c26] transition-all shadow-sm border border-[#2a2a38]"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" class="shrink-0">
                                            <path fill="#EA4335" d="M3.6 2.2C3.2 2.6 3 3.2 3 4v16c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2L3.7 2.1l-.1.1z"/>
                                            <path fill="#FBBC04" d="M15.7 15.9l-3-3v-.2l3-3 .1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2z"/>
                                            <path fill="#4285F4" d="M12.7 12.7L3.6 21.8c.4.4.9.4 1.5.1l10.6-6-3-3.2z"/>
                                            <path fill="#34A853" d="M12.7 11.3l3-3L5.1 2.3c-.6-.3-1.1-.3-1.5.1l9.1 8.9z"/>
                                        </svg>
                                        <span>Google Play</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 4. ZENE: Neuromorphic Coding Agent */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <ZeneTerminalThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-purple-600 dark:text-purple-400">ZenthraLabs Research</p>
                                    <span class="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-[10px] font-['JetBrains_Mono',monospace] font-semibold">Reflex Core</span>
                                </div>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-2">ZENE: Neuromorphic Coding Agent</h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">An autonomous multi-turn Rust coding agent governed by an embedded 500-neuron Drosophila connectome. Sub-15µs spinal reflex safety locks, AST dynamic tool masking, and local attractor dynamics.</p>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <a href="/products/zene" class="inline-block py-2 px-4 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                    <a href="/research/biological-connectomes" class="inline-block py-2 px-3.5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all">
                                        Research Report
                                    </a>
                                    <a href="https://github.com/kabirajpan/zene" target="_blank" rel="noopener" class="py-2 px-3 border border-[#c6c5d3] dark:border-[#1e2230] text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white hover:bg-[#f5f2fa] dark:hover:bg-[#151928] font-medium rounded-[4px] text-sm transition-colors flex items-center gap-1.5" title="View ZENE on GitHub">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 5. ZenFile */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <ZenFileThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] mb-2">Desktop Application</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-2">ZenFile</h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">A high-performance native file manager built with Zenthra. Instant loading directory virtual lists, beveled frosted layouts, and fully local filesystem actions.</p>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <a href="/products/zenthra/apps/file-manager" class="inline-block py-2 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                    <a href="/products/zenthra/apps/file-manager/download" class="inline-block py-2 px-5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all">
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 6. Zenthra View */}
                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden flex flex-col hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <ZenthraViewThumbnail />
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] mb-2">Desktop Application</p>
                                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-2">Zenthra View</h3>
                                <p class="text-[#454651] dark:text-[#94a3b8] text-sm leading-relaxed flex-grow">A native, cross-platform image viewer constructed using the Zenthra UI framework. Smooth canvas zooming, directory trees, slideshow settings, and a high-performance filmstrip.</p>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <a href="/products/zenthra/apps/zenthra-view" class="inline-block py-2 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">
                                        View Details
                                    </a>
                                    <a href="/products/zenthra/apps/zenthra-view/download" class="inline-block py-2 px-5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all">
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sub CTA Banner ── */}
            <section class="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
                <div class="bg-[#071025] dark:bg-[#0c1020] border border-transparent dark:border-[#1e2230] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Build native experiences with us.</h2>
                        <p class="text-[#9aa6e0] text-sm">Join the open source development or read our framework documentation.</p>
                    </div>
                    <div class="flex flex-wrap gap-3 flex-shrink-0">
                        <a href="/products/zenthra" class="py-2.5 px-6 bg-[#5c6bc0] text-white font-medium rounded-[4px] hover:brightness-110 transition-all text-sm">
                            Get Zenthra SDK
                        </a>
                        <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener" class="py-2.5 px-6 border border-white/20 dark:border-[#2a3048] text-white font-medium rounded-[4px] hover:bg-white/10 dark:hover:bg-[#1e2235] transition-all text-sm">
                            GitHub Repository
                        </a>
                        <a href="https://crates.io/crates/zenthra" target="_blank" rel="noopener" class="py-2.5 px-6 border border-white/20 dark:border-[#2a3048] text-white font-medium rounded-[4px] hover:bg-white/10 dark:hover:bg-[#1e2235] transition-all text-sm flex items-center gap-2">
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
    title: "ZenthraLabs — High-Performance Native Systems & Frameworks",
    meta: [
        { name: "description", content: "ZenthraLabs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
        { property: "og:title", content: "ZenthraLabs — High-Performance Native Systems & Frameworks" },
        { property: "og:description", content: "ZenthraLabs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "ZenthraLabs — High-Performance Native Systems & Frameworks" },
        { name: "twitter:description", content: "ZenthraLabs builds low-latency native frameworks, GPU-accelerated graphic renderers, and modern developer tooling." },
    ],
};
