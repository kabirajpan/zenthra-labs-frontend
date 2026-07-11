import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const SLIDES = [
    {
        src: "/assets/screenshots/after-motion/editing-screen.png",
        title: "Video Editor Canvas",
        desc: "Advanced multi-track timeline composition at 60 FPS."
    },
    {
        src: "/assets/screenshots/after-motion/Main-first-screen-project-create.png",
        title: "Project Creation",
        desc: "Start new editing canvases with custom resolutions."
    },
    {
        src: "/assets/screenshots/after-motion/effect-controls.png",
        title: "Visual Effects Controls",
        desc: "Precision modifiers for hardware accelerated blits."
    },
    {
        src: "/assets/screenshots/after-motion/audio-tool.png",
        title: "Audio Mixer Canvas",
        desc: "Multi-channel audio timeline with snaps and waveforms."
    },
    {
        src: "/assets/screenshots/after-motion/caption-generator.png",
        title: "Subtitles Generator",
        desc: "On-device AI subtitle transcriber and alignment."
    },
    {
        src: "/assets/screenshots/after-motion/text-fonts-options.png",
        title: "Rich Fonts Overlay",
        desc: "Cosmic-text powered bidirectional text styling."
    }
];

export default component$(() => {
    const activeSlide = useSignal(0);

    useVisibleTask$(({ cleanup }) => {
        const interval = setInterval(() => {
            activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
        }, 4000);
        cleanup(() => clearInterval(interval));
    });

    return (
        <div class="relative bg-[#0b0813] text-[#e2dff0] min-h-screen">
            {/* Custom Glowing Background */}
            <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
                <div class="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-violet-800/40 blur-[120px]" />
                <div class="absolute top-[40%] -right-[10%] w-[50%] aspect-square rounded-full bg-indigo-900/40 blur-[120px]" />
            </div>

            <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                {/* ── Breadcrumbs ── */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-violet-400 hover:text-violet-200 transition-colors">Products</a>
                    <span class="text-violet-800">/</span>
                    <span class="text-[#e2dff0]">After Motion</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <span class="inline-block px-3 py-1 bg-violet-900/40 border border-violet-700/50 text-violet-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                            Mobile App · Live
                        </span>
                        <h1 class="font-['Syne',sans-serif]">
                            <img
                                src="/assets/screenshots/after-motion/logos/full.png"
                                alt="After Motion"
                                class="h-16 sm:h-20 w-auto object-contain rounded-[14px]"
                            />
                        </h1>
                        <p class="text-base sm:text-lg text-violet-200/80 leading-relaxed max-w-xl">
                            A production-ready mobile video editor engineered for fast, fluid, on-device video composition. Edit multitrack videos at 60 FPS previews with zero telemetry and no subscription fees.
                        </p>

                        <div class="grid grid-cols-2 gap-4 max-w-md pt-4">
                            <div class="bg-white/5 border border-white/10 rounded-[4px] p-4">
                                <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-violet-400">Zero Lag</div>
                                <div class="text-xs text-violet-300/70">60 FPS preview updates</div>
                            </div>
                            <div class="bg-white/5 border border-white/10 rounded-[4px] p-4">
                                <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-violet-400">100% Local</div>
                                <div class="text-xs text-violet-300/70">On-device composition</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-4 pt-6">
                            <span class="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 hover:bg-white/15 transition-all text-sm font-medium rounded-[4px] cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22c-1.34.05-1.77-.77-3.29-.77-1.53 0-2 .74-3.27.79-1.32.05-2.31-1.32-3.15-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.02 2.98 1.1.09 2.24-.55 2.97-1.43z" /></svg>
                                App Store
                            </span>
                            <span class="flex items-center gap-2 px-5 py-2.5 bg-violet-700 text-white hover:bg-violet-600 transition-all text-sm font-medium rounded-[4px] cursor-pointer shadow-lg shadow-violet-700/30">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5.23 3.001c-.13 0-.25.04-.36.12l10.97 10.97 3.32-1.9c1-.57 1-.15.22-.6zM3.4 3.511a1.2 1.2 0 0 0-.28.84v15.3c0 .35.1.65.28.84L14.7 9.2zM15.3 15.3l-10.97 10.97c.1.08.23.12.36.12.42 0 1.25-.24 2.25-.81l8.36-4.78z" /></svg>
                                Google Play
                            </span>
                        </div>
                    </div>

                    {/* Timeline & Landscape Slider Mockup */}
                    <div class="col-span-12 lg:col-span-5 flex flex-col items-center lg:-mt-10">
                        <div class="relative group/phone pb-4 px-16">
                            {/* Portrait Image Frame */}
                            <div class="relative w-72 aspect-[9/16] bg-[#110d21] border border-white/10 rounded-[12px] shadow-2xl overflow-hidden flex flex-col">
                                {/* Slides Container */}
                                <div class="relative flex-grow w-full h-full">
                                    {SLIDES.map((slide, index) => (
                                        <div
                                            key={slide.title}
                                            class={`absolute inset-0 w-full h-full flex flex-col transition-all duration-700 ease-in-out ${index === activeSlide.value
                                                ? "translate-x-0 opacity-100 pointer-events-auto"
                                                : index < activeSlide.value
                                                    ? "-translate-x-full opacity-0 pointer-events-none"
                                                    : "translate-x-full opacity-0 pointer-events-none"
                                                }`}
                                        >
                                            <img
                                                src={slide.src}
                                                alt={slide.title}
                                                class="w-full h-full object-cover select-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick$={() => {
                                    activeSlide.value = (activeSlide.value - 1 + SLIDES.length) % SLIDES.length;
                                }}
                                class="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-violet-400 opacity-10 hover:opacity-100 hover:text-white transition-all duration-300 focus:outline-none z-20"
                                aria-label="Previous Slide"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick$={() => {
                                    activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
                                }}
                                class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-violet-400 opacity-10 hover:opacity-100 hover:text-white transition-all duration-300 focus:outline-none z-20"
                                aria-label="Next Slide"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Indicator Dots */}
                        <div class="flex items-center gap-1.5 mt-4 z-20">
                            {SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick$={() => {
                                        activeSlide.value = index;
                                    }}
                                    class={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeSlide.value
                                        ? "bg-violet-400 w-5"
                                        : "bg-white/30 hover:bg-white"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Active Slide Description */}
                        <div class="mt-6 text-center max-w-[320px] min-h-[76px] flex flex-col justify-start">
                            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-white mb-1">
                                {SLIDES[activeSlide.value].title}
                            </h3>
                            <p class="text-xs text-violet-300/80 leading-relaxed">
                                {SLIDES[activeSlide.value].desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Product Features Grid ── */}
                <div class="border-t border-white/10 pt-12 md:pt-20 mb-20">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-center text-white mb-12">Engineered for absolute performance.</h2>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">GPU Compositing</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                Powered by a custom rendering compositor written in Rust using target-specific EGL configs. Frame sequences are computed directly on the GPU, avoiding CPU bottlenecks and system freezes during editing preview.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Ghost AI Cutter Tracker</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                An integrated background editing assistant that cuts, splits, and stitches clips silently in the background while you monitor the playhead. Smoothly handles large file assets with an autonomous logic flow.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Offline Processing</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                No cloud accounts, subscription fees, or internet connections are required. Export timelines to full 4K UHD resolutions directly to your local file gallery with total privacy.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Precise Multi-Track Layering</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                Build compound timelines with multiple channels of video, audio waveforms, text overlay, and transition handles. Scrub frame-by-frame with snap-locking for perfect sample-level alignment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Sub CTA Banner ── */}
                <div class="bg-[#171326] border border-violet-800/40 rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Ready to edit?</h2>
                        <p class="text-violet-300 text-sm">Download After Motion free on your device today.</p>
                    </div>
                    <div class="flex gap-4">
                        <span class="py-2.5 px-6 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-[4px] text-sm cursor-pointer transition-colors shadow-lg shadow-violet-700/20">
                            Download Now
                        </span>
                        <a href="/products" class="py-2.5 px-6 border border-white/20 text-white hover:bg-white/10 font-medium rounded-[4px] text-sm transition-colors">
                            All Products
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "After Motion — Mobile Video Editor | Zenthra Labs",
    meta: [
        { name: "description", content: "After Motion is a native, high-performance, subscription-free mobile video editor with precise multitrack composition." },
    ],
};
