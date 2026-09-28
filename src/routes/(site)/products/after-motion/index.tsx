import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const SLIDES = [
    {
        src: "/assets/screenshots/after-motion/android-medium-1.png",
        title: "Pro Editing Interface",
        desc: "Advanced multi-track timeline composition with quick access controls and 60 FPS previews."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-2.png",
        title: "Key Frame & Graph",
        desc: "Visual bezier curve modifiers and fluid keyframe animation interpolations."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-3.png",
        title: "Transition Controller",
        desc: "Hardware-accelerated transitions with instant alignment and preset options."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-4.png",
        title: "Effects Library",
        desc: "Comprehensive bundle of distortion, warp, glitch, blur, and visual shaders."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-5.png",
        title: "Effects Controller",
        desc: "Deep parameter adjustments for fine-tuning GPU shaders in realtime."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-6.png",
        title: "2D Vector Shape",
        desc: "Native geometric vector shapes with custom fill, stroke, and path animations."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-7.png",
        title: "Gradient Control",
        desc: "Interactive touch controls for linear, radial, sweep, and angular gradients."
    },
    {
        src: "/assets/screenshots/after-motion/android-medium-8.png",
        title: "Null Object & Parenting",
        desc: "Hierarchical parent linking and multi-layer grouping for complex animations."
    }
];

export default component$(() => {
    const activeSlide = useSignal(0);
    const showAppStoreNotice = useSignal(false);

    useVisibleTask$(({ cleanup }) => {
        const interval = setInterval(() => {
            activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
        }, 4000);
        cleanup(() => clearInterval(interval));
    });

    return (
        <div class="relative bg-[#0b0813] text-[#e2dff0] min-h-screen">
            {/* Custom Toast Notification for App Store */}
            {showAppStoreNotice.value && (
                <div class="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 bg-[#161324] border border-amber-500/40 text-amber-300 text-xs px-4 py-3 rounded-[4px] shadow-2xl flex items-center gap-2.5 max-w-[90vw] text-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>iOS App Store release is currently in active development.</span>
                </div>
            )}

            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
                {/* ── Breadcrumbs ── */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-zinc-400 hover:text-white transition-colors">Products</a>
                    <span class="text-zinc-600">/</span>
                    <span class="text-zinc-200">After Motion</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 md:mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Meta Tags */}
                        <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Mobile App · Live
                            </span>
                            <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-400 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                Android
                            </span>
                            <a href="/products/after-motion/blog" class="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] transition-colors">
                                <span>Engineering Journal</span>
                                <span>&rarr;</span>
                            </a>
                        </div>

                        {/* Title & App Icon */}
                        <div class="flex flex-col sm:flex-row items-center gap-4 pt-1">
                            <img
                                src="/assets/screenshots/after-motion/logos/full.png"
                                alt="After Motion App Icon"
                                class="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-[4px] border border-white/10 shadow-lg shrink-0"
                            />
                            <div>
                                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                                    After Motion
                                </h1>
                                <p class="text-xs sm:text-sm font-['JetBrains_Mono',monospace] text-zinc-400 mt-1">
                                    Native On-Device Video Compositor &amp; Motion Design
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p class="text-sm sm:text-base text-zinc-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                            A production mobile video editor engineered for real-time, on-device timeline composition. Edit multi-track layers at 60 FPS previews with native GPU shaders, bezier keyframe graphs, zero telemetry, and no subscription fees.
                        </p>

                        {/* Spec Highlights Grid */}
                        <div class="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto lg:mx-0 pt-1">
                            <div class="bg-white/[0.03] border border-white/10 rounded-[4px] p-3 text-center lg:text-left">
                                <div class="font-['JetBrains_Mono',monospace] text-base sm:text-lg font-bold text-white">60 FPS</div>
                                <div class="text-[11px] text-zinc-400 mt-0.5">Real-time GPU preview</div>
                            </div>
                            <div class="bg-white/[0.03] border border-white/10 rounded-[4px] p-3 text-center lg:text-left">
                                <div class="font-['JetBrains_Mono',monospace] text-base sm:text-lg font-bold text-white">100% Local</div>
                                <div class="text-[11px] text-zinc-400 mt-0.5">On-device composition</div>
                            </div>
                            <div class="bg-white/[0.03] border border-white/10 rounded-[4px] p-3 text-center lg:text-left">
                                <div class="font-['JetBrains_Mono',monospace] text-base sm:text-lg font-bold text-white">Zero Sub</div>
                                <div class="text-[11px] text-zinc-400 mt-0.5">No recurring fees</div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div class="flex flex-col gap-3 pt-3 sm:pt-4 w-full items-center lg:items-start">
                            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.aftermotion.app" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    class="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 transition-colors text-xs sm:text-sm font-semibold rounded-[4px] cursor-pointer shadow-md"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" class="shrink-0">
                                        <path fill="#EA4335" d="M3.6 2.2C3.2 2.6 3 3.2 3 4v16c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2L3.7 2.1l-.1.1z"/>
                                        <path fill="#FBBC04" d="M15.7 15.9l-3-3v-.2l3-3 .1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2z"/>
                                        <path fill="#4285F4" d="M12.7 12.7L3.6 21.8c.4.4.9.4 1.5.1l10.6-6-3-3.2z"/>
                                        <path fill="#34A853" d="M12.7 11.3l3-3L5.1 2.3c-.6-.3-1.1-.3-1.5.1l9.1 8.9z"/>
                                    </svg>
                                    <span>Get on Google Play</span>
                                </a>

                                <button
                                    type="button"
                                    onClick$={() => {
                                        showAppStoreNotice.value = true;
                                        setTimeout(() => {
                                            showAppStoreNotice.value = false;
                                        }, 3500);
                                    }}
                                    class="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium rounded-[4px] cursor-pointer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="opacity-70 shrink-0"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22c-1.34.05-1.77-.77-3.29-.77-1.53 0-2 .74-3.27.79-1.32.05-2.31-1.32-3.15-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.02 2.98 1.1.09 2.24-.55 2.97-1.43z" /></svg>
                                    <span>iOS App Store</span>
                                    <span class="text-[10px] text-zinc-500 font-['JetBrains_Mono',monospace]">(Soon)</span>
                                </button>
                            </div>

                            <a 
                                href="/products/after-motion/blog" 
                                class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-colors text-xs font-['JetBrains_Mono',monospace] rounded-[4px] mt-1"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-violet-400">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                </svg>
                                <span>Read Technical &amp; Architecture Insights</span>
                                <span>&rarr;</span>
                            </a>
                        </div>
                    </div>

                    {/* Timeline & Screenshot Slider */}
                    <div class="col-span-12 lg:col-span-5 flex flex-col items-center">
                        <div class="relative group/phone w-full flex flex-col items-center">
                            {/* Portrait Image Frame */}
                            <div class="relative w-64 sm:w-72 lg:w-80 aspect-[1202/1903] bg-[#0c0916] border border-white/10 rounded-[4px] shadow-2xl overflow-hidden flex flex-col">
                                {/* Slides Container */}
                                <div class="relative flex-grow w-full h-full">
                                    {SLIDES.map((slide, index) => (
                                        <div
                                            key={slide.title}
                                            class={`absolute inset-0 w-full h-full flex flex-col transition-all duration-500 ease-out ${index === activeSlide.value
                                                ? "translate-x-0 opacity-100 pointer-events-auto"
                                                : index < activeSlide.value
                                                    ? "-translate-x-full opacity-0 pointer-events-none"
                                                    : "translate-x-full opacity-0 pointer-events-none"
                                                }`}
                                        >
                                            <img
                                                src={slide.src}
                                                alt={slide.title}
                                                class="w-full h-full object-cover select-none rounded-[4px]"
                                                loading={index === 0 ? "eager" : "lazy"}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Controls Bar */}
                            <div class="w-64 sm:w-72 lg:w-80 flex items-center justify-between mt-3 px-1">
                                <button
                                    type="button"
                                    onClick$={() => {
                                        activeSlide.value = (activeSlide.value - 1 + SLIDES.length) % SLIDES.length;
                                    }}
                                    class="p-1.5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded-[4px] transition-colors focus:outline-none cursor-pointer"
                                    aria-label="Previous Slide"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                {/* Slide Numbers and Minimal Bars */}
                                <div class="flex items-center gap-1.5">
                                    <span class="font-['JetBrains_Mono',monospace] text-xs text-zinc-400 mr-1.5">
                                        0{activeSlide.value + 1} / 0{SLIDES.length}
                                    </span>
                                    <div class="flex items-center gap-1">
                                        {SLIDES.map((_, index) => (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick$={() => {
                                                    activeSlide.value = index;
                                                }}
                                                class={`h-1 rounded-[2px] transition-all duration-300 cursor-pointer ${index === activeSlide.value
                                                    ? "bg-white w-4"
                                                    : "bg-white/20 hover:bg-white/40 w-1.5"
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick$={() => {
                                        activeSlide.value = (activeSlide.value + 1) % SLIDES.length;
                                    }}
                                    class="p-1.5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded-[4px] transition-colors focus:outline-none cursor-pointer"
                                    aria-label="Next Slide"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            {/* Active Slide Info */}
                            <div class="w-64 sm:w-72 lg:w-80 mt-3 p-3 bg-white/[0.02] border border-white/10 rounded-[4px]">
                                <div class="font-semibold text-xs sm:text-sm text-white flex items-center justify-between">
                                    <span>{SLIDES[activeSlide.value].title}</span>
                                    <span class="text-[10px] font-['JetBrains_Mono',monospace] text-zinc-500 font-normal">
                                        {activeSlide.value + 1}/{SLIDES.length}
                                    </span>
                                </div>
                                <p class="text-xs text-zinc-400 leading-relaxed mt-1">
                                    {SLIDES[activeSlide.value].desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Product Features Grid ── */}
                <div class="border-t border-white/10 pt-12 md:pt-16 mb-16 md:mb-20">
                    <div class="flex flex-col items-center text-center mb-10">
                        <span class="font-['JetBrains_Mono',monospace] text-xs text-zinc-400 uppercase tracking-widest mb-2">
                            Technical Architecture
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Engineered for zero-lag mobile composition
                        </h2>
                    </div>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">01 / Compositing</div>
                            <h3 class="font-semibold text-base text-white mb-2">GPU Framebuffer Rendering</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                Directly integrates with target-specific EGL configs and OpenGL ES 3.0. Video frame sequences and blend modes are computed entirely on the GPU, avoiding CPU bottlenecks and dropped frames.
                            </p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">02 / Animation</div>
                            <h3 class="font-semibold text-base text-white mb-2">Keyframe &amp; Bezier Curves</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                Desktop-grade animation control on touchscreens. Sculpt custom velocity easing curves and interpolate spatial coordinates, scale, rotation, and shader parameters.
                            </p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">03 / Privacy</div>
                            <h3 class="font-semibold text-base text-white mb-2">100% Offline &amp; Local</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                No cloud accounts, mandatory sign-ins, or telemetry beacons. All project files, media caches, and exports remain strictly stored on your physical device.
                            </p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">04 / Layout</div>
                            <h3 class="font-semibold text-base text-white mb-2">Multi-Track Layering</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                Compose complex sequences with video, audio waveforms, typography, and null parenting layers. Frame-by-frame scrubbing with sample-accurate snap alignment.
                            </p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">05 / Visuals</div>
                            <h3 class="font-semibold text-base text-white mb-2">Custom Shaders &amp; Transitions</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                Real-time fragment shaders for warps, blurs, glitch effects, chromatic aberration, and 3D LUT color grading sampled with trilinear filtering.
                            </p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/10 p-5 rounded-[4px] hover:border-white/20 transition-colors">
                            <div class="font-['JetBrains_Mono',monospace] text-xs text-violet-400 mb-1">06 / Motion Design</div>
                            <h3 class="font-semibold text-base text-white mb-2">Parametric 2D Shapes</h3>
                            <p class="text-xs text-zinc-400 leading-relaxed">
                                Native vector primitives, custom strokes, fill gradients, and hierarchical null objects for building complex motion graphics without external asset prep.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Sub CTA Banner ── */}
                <div class="bg-white/[0.02] border border-white/10 rounded-[4px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <h2 class="text-lg sm:text-xl font-bold text-white mb-1">
                            Experience After Motion on Android
                        </h2>
                        <p class="text-zinc-400 text-xs sm:text-sm">
                            Free download available on the Google Play Store. No subscriptions or hidden fees.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-2.5 justify-center">
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.aftermotion.app" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="flex items-center justify-center gap-2 py-2 px-5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-[4px] text-xs sm:text-sm cursor-pointer transition-colors shadow-sm w-full sm:w-auto"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" class="shrink-0">
                                <path fill="#EA4335" d="M3.6 2.2C3.2 2.6 3 3.2 3 4v16c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2L3.7 2.1l-.1.1z"/>
                                <path fill="#FBBC04" d="M15.7 15.9l-3-3v-.2l3-3 .1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2z"/>
                                <path fill="#4285F4" d="M12.7 12.7L3.6 21.8c.4.4.9.4 1.5.1l10.6-6-3-3.2z"/>
                                <path fill="#34A853" d="M12.7 11.3l3-3L5.1 2.3c-.6-.3-1.1-.3-1.5.1l9.1 8.9z"/>
                            </svg>
                            <span>Google Play</span>
                        </a>
                        <a 
                            href="/products/after-motion/blog" 
                            class="py-2 px-4 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-[4px] text-xs sm:text-sm transition-colors w-full sm:w-auto text-center"
                        >
                            Engineering Journal
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "After Motion — Mobile Video Editor | ZenthraLabs",
    meta: [
        { name: "description", content: "After Motion is a native, high-performance, subscription-free mobile video editor with precise multitrack composition." },
    ],
};
