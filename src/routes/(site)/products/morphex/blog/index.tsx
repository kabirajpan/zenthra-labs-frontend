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
            "In MORPHEX, we engineered a multi-threaded compositor in Rust that manages OpenGL ES 3.0 textures directly on the GPU framebuffer.",
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
            "MORPHEX incorporates an optimized on-device neural transcription engine that processes audio tracks directly from local memory buffers.",
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
            "MORPHEX uses 3D Color Lookup Tables (LUTs) sampled inside fragment shaders with trilinear interpolation.",
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
                    <a href="/products/morphex" class="text-violet-400 hover:text-violet-200 transition-colors">Morphex</a>
                    <span class="text-violet-800">/</span>
                    <span class="text-[#e2dff0]">Engineering Journal</span>
                </div>

                {/* Header */}
                <div class="mb-12 border-b border-violet-800/30 pb-10">
                    <span class="inline-block px-3 py-1 bg-violet-900/40 border border-violet-700/50 text-violet-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                        MORPHEX · Engineering Journal
                    </span>
                    <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                        Mobile Video Editing &amp; GPU Engineering
                    </h1>
                    <p class="text-violet-200/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                        Deep dives into native Rust compositors, OpenGL shaders, on-device AI transcription, and high-performance touch UI design in Morphex.
                    </p>
                </div>

                {/* Categories */}
                <div class="flex flex-wrap gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            type="button"
                            key={cat}
                            onClick$={() => (selectedCategory.value = cat)}
                            class={`px-3.5 py-1.5 rounded-[4px] text-xs font-['JetBrains_Mono',monospace] transition-colors cursor-pointer border ${
                                selectedCategory.value === cat
                                    ? "bg-violet-600 border-violet-500 text-white font-semibold"
                                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post */}
                {selectedCategory.value === "All" && featuredArticle && (
                    <div 
                        class="mb-12 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-violet-950/20 border border-violet-700/40 rounded-[8px] p-6 sm:p-8 hover:border-violet-500/60 transition-all cursor-pointer group"
                        onClick$={() => (activeArticle.value = featuredArticle)}
                    >
                        <div class="flex items-center gap-2 mb-3">
                            <span class="px-2 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-[2px] uppercase tracking-wider">
                                Featured Insight
                            </span>
                            <span class="text-xs text-zinc-400 font-['JetBrains_Mono',monospace]">
                                {featuredArticle.date}
                            </span>
                        </div>
                        <h2 class="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {featuredArticle.title}
                        </h2>
                        <p class="text-sm text-zinc-300 leading-relaxed mb-4 max-w-3xl">
                            {featuredArticle.summary}
                        </p>
                        <div class="flex items-center gap-4 text-xs font-['JetBrains_Mono',monospace] text-violet-400">
                            <span>{featuredArticle.readTime}</span>
                            <span>&rarr; Read Article</span>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick$={() => (activeArticle.value = article)}
                            class="bg-white/[0.02] border border-white/10 hover:border-violet-500/40 rounded-[6px] p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5 cursor-pointer group"
                        >
                            <div>
                                <div class="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] mb-3 text-zinc-400">
                                    <span class="text-violet-400">{article.category}</span>
                                    <span>{article.date}</span>
                                </div>
                                <h3 class="font-semibold text-base text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p class="text-xs text-zinc-400 leading-relaxed mb-4">
                                    {article.summary}
                                </p>
                            </div>
                            <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <span class="text-[10px] text-zinc-400 font-['JetBrains_Mono',monospace]">
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
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-2">Experience MORPHEX</h2>
                        <p class="text-violet-300 text-xs sm:text-sm">Download Morphex free on Google Play Store today. Pro subscriptions powered by Paddle.</p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3">
                        <a 
                            href="/products/morphex/pricing" 
                            class="flex items-center justify-center gap-2 py-2.5 px-5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-[4px] text-xs sm:text-sm transition-colors"
                        >
                            View Pro Pricing
                        </a>
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.aftermotion.app" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="flex items-center justify-center gap-2 py-2.5 px-5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-[4px] text-xs sm:text-sm cursor-pointer transition-colors"
                        >
                            Get on Google Play
                        </a>
                    </div>
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
    title: "MORPHEX Blog — Technical Insights & Mobile Compositor Research",
    meta: [
        { name: "description", content: "Technical blog and engineering articles for Morphex (MORPHEX) video editor — mobile rendering, Rust performance, and GPU compositing." },
    ],
};
