import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface Article {
    id: string;
    title: string;
    summary: string;
    content: string[];
    category: "Architecture" | "GPU Shaders" | "AI Subtitles" | "Performance";
    date: string;
    readTime: string;
    isFeatured?: boolean;
}

const ARTICLES: Article[] = [
    {
        id: "rust-egl-mobile-compositor",
        title: "Building a Zero-Lag 60 FPS Mobile Video Compositor in Rust & EGL",
        summary: "How we decoupled Android thread looper rendering from UI event loops, using a native C++ JNI bridge to Rust and direct EGL surface swap buffers.",
        content: [
            "Mobile video editing on native devices requires absolute frame synchronization to prevent audio drift and dropped frames during playback.",
            "In After Motion, we engineered a multi-threaded compositor in Rust that manages OpenGL ES 3.0 textures directly on the GPU framebuffer.",
            "By avoiding CPU-side byte copy pipelines and using EGLImageTargetTexture2DOES, video preview frames update in under 4ms per frame, ensuring a consistent 60 FPS viewport even with multi-layer overlays."
        ],
        category: "Architecture",
        date: "July 24, 2026",
        readTime: "7 min read",
        isFeatured: true,
    },
    {
        id: "on-device-ai-subtitles",
        title: "On-Device AI Subtitle Generation & Word-Level Alignment",
        summary: "Generating precise captions and subtitles completely offline without external cloud API latency or subscription locks.",
        content: [
            "Cloud-based subtitle transcription introduces network latency and privacy concerns for mobile video creators.",
            "After Motion incorporates an optimized on-device neural transcription engine that processes audio tracks directly from local memory buffers.",
            "The model emits time-stamped JSON tokens that automatically align subtitle text tracks on the timeline with frame-accurate precision."
        ],
        category: "AI Subtitles",
        date: "July 12, 2026",
        readTime: "5 min read",
    },
    {
        id: "frame-accurate-audio-scrubbing",
        title: "Frame-Accurate Audio Waveform Scrubbing on Touchscreens",
        summary: "Designing custom audio sample decoders and wave graph renderers for smooth timeline drag interactions.",
        content: [
            "Scrubbing across complex multi-channel audio tracks requires immediate waveform visualization and zero-click sample interpolation.",
            "We built a lock-free ring buffer mixer in Rust that decodes AAC/MP3 packets into PCM float samples on worker threads.",
            "Waveform geometry is rendered using instanced vertex arrays on the GPU, allowing real-time pinch-to-zoom across multi-hour audio files."
        ],
        category: "Performance",
        date: "June 28, 2026",
        readTime: "6 min read",
    },
    {
        id: "gpu-shaders-color-grading",
        title: "Hardware Accelerated GPU Shaders for Real-Time Color Grading",
        summary: "A breakdown of GLSL fragment shaders for LUT transforms, exposure curves, and keyframe interpolation.",
        content: [
            "Color correction and grading require real-time color matrix transformations across high-resolution video frames.",
            "After Motion uses 3D Color Lookup Tables (LUTs) sampled inside fragment shaders with trilinear interpolation.",
            "Keyframed parameters smoothly interpolate values across timeline keyframes without causing main thread UI stutters."
        ],
        category: "GPU Shaders",
        date: "June 14, 2026",
        readTime: "4 min read",
    },
];

export default component$(() => {
    const selectedCategory = useSignal<string>("All");
    const activeArticle = useSignal<Article | null>(null);

    const categories = ["All", "Architecture", "GPU Shaders", "AI Subtitles", "Performance"];

    const filteredArticles = ARTICLES.filter(
        (a) => selectedCategory.value === "All" || a.category === selectedCategory.value
    );

    const featuredArticle = ARTICLES.find((a) => a.isFeatured);

    return (
        <div class="relative bg-[#0b0813] text-[#e2dff0] min-h-screen">
            {/* Background Glow */}
            <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
                <div class="absolute -top-[15%] -left-[10%] w-[55%] aspect-square rounded-full bg-violet-800/40 blur-[130px]" />
                <div class="absolute top-[50%] -right-[10%] w-[45%] aspect-square rounded-full bg-indigo-900/40 blur-[130px]" />
            </div>

            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
                {/* Breadcrumbs */}
                <div class="flex items-center gap-2 mb-6 sm:mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-violet-400 hover:text-violet-200 transition-colors">Products</a>
                    <span class="text-violet-800">/</span>
                    <a href="/products/after-motion" class="text-violet-400 hover:text-violet-200 transition-colors">After Motion</a>
                    <span class="text-violet-800">/</span>
                    <span class="text-[#e2dff0]">Blog &amp; Insights</span>
                </div>

                {/* Header */}
                <div class="mb-12 border-b border-violet-800/30 pb-10">
                    <span class="inline-block px-3 py-1 bg-violet-900/40 border border-violet-700/50 text-violet-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                        After Motion · Engineering Journal
                    </span>
                    <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                        Mobile Video Editing &amp; GPU Engineering
                    </h1>
                    <p class="text-violet-200/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                        Deep dives into native Rust compositors, OpenGL shaders, on-device AI transcription, and high-performance touch UI design.
                    </p>
                </div>

                {/* Featured Article Hero */}
                {featuredArticle && selectedCategory.value === "All" && (
                    <div class="mb-14">
                        <div class="bg-[#140e26] border border-violet-700/40 rounded-[8px] overflow-hidden grid grid-cols-12 shadow-2xl group">
                            <div class="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                                <div>
                                    <div class="flex flex-wrap items-center gap-3 mb-4">
                                        <span class="px-2.5 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-violet-900/60 text-violet-300 border border-violet-700/50 rounded-[4px] uppercase tracking-wider">
                                            Featured {featuredArticle.category}
                                        </span>
                                        <span class="text-xs text-violet-300/70 font-['JetBrains_Mono',monospace]">
                                            {featuredArticle.date}
                                        </span>
                                    </div>
                                    <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors leading-tight">
                                        {featuredArticle.title}
                                    </h2>
                                    <p class="text-violet-200/80 text-xs sm:text-sm leading-relaxed mb-6">
                                        {featuredArticle.summary}
                                    </p>
                                </div>
                                <div class="flex items-center justify-between pt-4 border-t border-violet-800/20">
                                    <span class="text-xs text-violet-300/60 font-['JetBrains_Mono',monospace]">
                                        {featuredArticle.readTime}
                                    </span>
                                    <button
                                        type="button"
                                        onClick$={() => (activeArticle.value = featuredArticle)}
                                        class="text-xs font-['JetBrains_Mono',monospace] font-bold text-violet-400 hover:text-violet-200 transition-colors cursor-pointer"
                                    >
                                        Read Article &rarr;
                                    </button>
                                </div>
                            </div>

                            <div class="col-span-12 lg:col-span-5 bg-[#0e091b] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-violet-800/30 flex items-center justify-center relative overflow-hidden">
                                <img
                                    src="/assets/screenshots/after-motion/editing-screen.png"
                                    alt="After Motion Preview"
                                    class="max-h-64 sm:max-h-72 w-auto object-contain rounded-[8px] shadow-2xl border border-white/10"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Filter */}
                <div class="flex flex-wrap gap-2 mb-8 border-b border-violet-800/30 pb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick$={() => (selectedCategory.value = cat)}
                            class={[
                                "px-4 py-1.5 text-xs font-bold rounded-[6px] font-['JetBrains_Mono',monospace] transition-all cursor-pointer",
                                selectedCategory.value === cat
                                    ? "bg-violet-700 text-white shadow-lg shadow-violet-700/30"
                                    : "bg-white/5 border border-white/10 text-violet-300 hover:bg-white/10",
                            ].join(" ")}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick$={() => (activeArticle.value = article)}
                            class="bg-[#140e26] border border-violet-800/30 rounded-[8px] p-6 flex flex-col justify-between hover:border-violet-500 hover:-translate-y-1 transition-all group cursor-pointer shadow-lg"
                        >
                            <div>
                                <div class="flex items-center justify-between mb-4">
                                    <span class="px-2 py-0.5 text-[9px] font-['JetBrains_Mono',monospace] bg-violet-950/60 text-violet-400 border border-violet-800/40 rounded-[4px] uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                    <span class="text-[10px] text-violet-300/60 font-['JetBrains_Mono',monospace]">
                                        {article.date}
                                    </span>
                                </div>
                                <h3 class="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-white mb-3 group-hover:text-violet-400 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p class="text-xs text-violet-200/70 leading-relaxed mb-6">
                                    {article.summary}
                                </p>
                            </div>
                            <div class="flex items-center justify-between pt-4 border-t border-violet-800/20 mt-auto">
                                <span class="text-[10px] text-violet-300/60 font-['JetBrains_Mono',monospace]">
                                    {article.readTime}
                                </span>
                                <span class="text-xs font-bold text-violet-400 font-['JetBrains_Mono',monospace] group-hover:translate-x-1 transition-transform">
                                    Read Article &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google Play CTA Banner */}
                <div class="bg-[#171326] border border-violet-800/40 rounded-[8px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-2">Experience After Motion</h2>
                        <p class="text-violet-300 text-xs sm:text-sm">Download After Motion free on Google Play Store today.</p>
                    </div>
                    <a 
                        href="https://play.google.com/store/apps/details?id=com.aftermotion.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="flex items-center justify-center gap-2.5 py-2.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold rounded-[6px] text-xs sm:text-sm cursor-pointer transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" class="shrink-0">
                            <path fill="#EA4335" d="M3.6 2.2C3.2 2.6 3 3.2 3 4v16c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2L3.7 2.1l-.1.1z"/>
                            <path fill="#FBBC04" d="M15.7 15.9l-3-3v-.2l3-3 .1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2z"/>
                            <path fill="#4285F4" d="M12.7 12.7L3.6 21.8c.4.4.9.4 1.5.1l10.6-6-3-3.2z"/>
                            <path fill="#34A853" d="M12.7 11.3l3-3L5.1 2.3c-.6-.3-1.1-.3-1.5.1l9.1 8.9z"/>
                        </svg>
                        <span>Get on Google Play</span>
                    </a>
                </div>
            </div>

            {/* Article Modal */}
            {activeArticle.value && (
                <div 
                    class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick$={() => (activeArticle.value = null)}
                >
                    <div 
                        class="bg-[#140e26] border border-violet-700/50 rounded-[12px] p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
                        onClick$={(e) => e.stopPropagation()}
                    >
                        <button 
                            type="button"
                            onClick$={() => (activeArticle.value = null)}
                            class="absolute top-4 right-4 text-violet-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
                        >
                            &times;
                        </button>
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-2.5 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-violet-900/60 text-violet-300 border border-violet-700/50 rounded-[4px] uppercase tracking-wider">
                                {activeArticle.value.category}
                            </span>
                            <span class="text-xs text-violet-300/70 font-['JetBrains_Mono',monospace]">
                                {activeArticle.value.date}
                            </span>
                        </div>
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                            {activeArticle.value.title}
                        </h2>
                        <div class="space-y-4 text-sm text-violet-200/90 leading-relaxed font-sans">
                            {activeArticle.value.content.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                        <div class="mt-8 pt-4 border-t border-violet-800/30 flex items-center justify-between">
                            <span class="text-xs text-violet-300/60 font-['JetBrains_Mono',monospace]">
                                {activeArticle.value.readTime}
                            </span>
                            <button
                                type="button"
                                onClick$={() => (activeArticle.value = null)}
                                class="px-4 py-1.5 bg-violet-700 hover:bg-violet-600 text-white font-semibold text-xs rounded-[4px] transition-colors cursor-pointer"
                            >
                                Close Article
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export const head: DocumentHead = {
    title: "After Motion Blog — Technical Insights & Mobile Compositor Research",
    meta: [
        { name: "description", content: "Technical blog and engineering articles for After Motion video editor — mobile rendering, Rust performance, and GPU compositing." },
    ],
};
