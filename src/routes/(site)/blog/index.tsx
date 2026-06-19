import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface BlogPost {
    id: string;
    title: string;
    desc: string;
    category: "Research" | "Engineering" | "Graphics" | "Announcement";
    date: string;
    readTime: string;
    isFeatured?: boolean;
}

const POSTS: BlogPost[] = [
    {
        id: "4ms-latency-rust",
        title: "Achieving 4ms Input-to-Pixel Rendering Latency in Rust",
        desc: "How we decoupled system multi-window event loops from UI threads and optimized Vulkan/OpenGL draw buffers to deliver sub-frame refresh response rates.",
        category: "Research",
        date: "June 18, 2026",
        readTime: "8 min read",
        isFeatured: true,
    },
    {
        id: "virtualized-filmstrips",
        title: "Virtualized Filmstrips for 100,000+ Files",
        desc: "A deep dive into coordinate caching, dynamic texture allocation, and lock-free thread queues used in Zenthra View to handle massive directory indexing without stutter.",
        category: "Engineering",
        date: "May 29, 2026",
        readTime: "6 min read",
    },
    {
        id: "gpu-text-layout",
        title: "GPU-Accelerated Text and Glyph Layout",
        desc: "How Zenthra integrates Taffy flexbox and Cosmic Text layout engines to rasterize fonts on GPU vertex shaders in sub-millisecond intervals.",
        category: "Graphics",
        date: "May 10, 2026",
        readTime: "5 min read",
    },
    {
        id: "announcing-v1-2",
        title: "Announcing Zenthra Framework v1.2 Stable",
        desc: "Our main umbrella crate has been finalized and published. Explore details of layout grids, Spring physical dynamics, and adaptive theme systems.",
        category: "Announcement",
        date: "April 15, 2026",
        readTime: "3 min read",
    },
];

export default component$(() => {
    const selectedCategory = useSignal<string>("All");
    const categories = ["All", "Research", "Engineering", "Graphics", "Announcement"];

    const filteredPosts = POSTS.filter(
        (p) => selectedCategory.value === "All" || p.category === selectedCategory.value
    );

    const featuredPost = POSTS.find((p) => p.isFeatured);

    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* ── Header ── */}
            <div class="mb-16 border-b border-[#c6c5d3] pb-12">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Zenthra Labs · Tech Blog
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl lg:text-5xl font-bold text-[#1b1b21] leading-tight mb-4">
                    Engineering, graphics research, &amp; native updates.
                </h1>
                <p class="text-[#454651] text-base leading-relaxed max-w-2xl">
                    Articles and documentation written by developers at Zenthra Labs on rendering architectures, GUI performance pipelines, and Rust design patterns.
                </p>
            </div>

            {/* ── Featured Post Panel ── */}
            {featuredPost && selectedCategory.value === "All" && (
                <div class="mb-16">
                    <div class="bg-[#071025] rounded-[6px] overflow-hidden grid grid-cols-12 shadow-xl border border-white/5 group">
                        <div class="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                            <div>
                                <div class="flex items-center gap-3 mb-6">
                                    <span class="px-2 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-[#e9e7ef] text-[#4352a5] rounded-[4px] uppercase tracking-wider">
                                        Featured {featuredPost.category}
                                    </span>
                                    <span class="text-xs text-[#9aa6e0] font-['JetBrains_Mono',monospace]">
                                        {featuredPost.date}
                                    </span>
                                </div>
                                <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#82aaff] transition-colors leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p class="text-[#9aa6e0] text-sm leading-relaxed mb-8">
                                    {featuredPost.desc}
                                </p>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-[#7f8ab5] font-['JetBrains_Mono',monospace]">
                                    {featuredPost.readTime}
                                </span>
                                <span class="text-xs font-['JetBrains_Mono',monospace] font-bold text-[#82aaff] hover:text-[#5c6bc0] transition-colors cursor-pointer">
                                    Read Article &rarr;
                                </span>
                            </div>
                        </div>
                        <div class="col-span-12 lg:col-span-5 bg-[#12193b] flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-white/5 relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 24px);" />
                            <div class="w-full max-w-xs aspect-[4/3] bg-[#071025] rounded-[4px] p-4 font-['JetBrains_Mono',monospace] text-[10px] text-[#9aa6e0] leading-relaxed shadow-lg flex flex-col justify-between">
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="w-2 h-2 rounded-full bg-[#ff6058]" />
                                    <span class="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                                    <span class="w-2 h-2 rounded-full bg-[#28ca41]" />
                                </div>
                                <div class="flex-grow flex flex-col justify-center gap-1.5 opacity-85">
                                    <div><span class="text-[#c792ea]">let </span><span class="text-[#bfc9d9]">latency = ui.</span><span class="text-[#61afef]">measure_input</span><span class="text-[#bfc9d9]">();</span></div>
                                    <div><span class="text-[#c792ea]">assert!</span><span class="text-[#bfc9d9]">(latency &lt; Duration::</span><span class="text-[#61afef]">from_millis</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">4</span><span class="text-[#bfc9d9]">));</span></div>
                                </div>
                                <div class="text-[9px] text-[#7ee787] text-right mt-2">// locked at 4ms target</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Category Filter ── */}
            <div class="flex flex-wrap gap-2 mb-10 border-b border-[#c6c5d3] pb-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick$={() => (selectedCategory.value = cat)}
                        class={[
                            "px-4 py-1.5 text-xs font-bold rounded-[4px] font-['JetBrains_Mono',monospace] transition-all",
                            selectedCategory.value === cat
                                ? "bg-[#4352a5] text-white"
                                : "bg-white border border-[#c6c5d3] text-[#454651] hover:bg-[#e9e7ef]",
                        ].join(" ")}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Posts Grid ── */}
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        class="bg-white border border-[#c6c5d3] rounded-[4px] p-6 flex flex-col justify-between hover:border-[#4352a5] hover:-translate-y-1 transition-all group cursor-pointer"
                    >
                        <div>
                            <div class="flex items-center justify-between mb-4">
                                <span class="px-2 py-0.5 text-[9px] font-['JetBrains_Mono',monospace] bg-[#e9e7ef] text-[#767683] rounded-[4px] uppercase tracking-wider">
                                    {post.category}
                                </span>
                                <span class="text-[10px] text-[#767683] font-['JetBrains_Mono',monospace]">
                                    {post.date}
                                </span>
                            </div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2 group-hover:text-[#4352a5] transition-colors leading-snug">
                                {post.title}
                            </h3>
                            <p class="text-xs text-[#454651] leading-relaxed mb-6">
                                {post.desc}
                            </p>
                        </div>
                        <div class="flex items-center justify-between mt-auto">
                            <span class="text-[10px] text-[#767683] font-['JetBrains_Mono',monospace]">
                                {post.readTime}
                            </span>
                            <span class="text-xs font-bold text-[#4352a5] font-['JetBrains_Mono',monospace] opacity-0 group-hover:opacity-100 transition-opacity">
                                Read More &rarr;
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Blog — Zenthra Labs",
    meta: [
        {
            name: "description",
            content: "Technical engineering updates, graphics rendering tutorials, and builder-pattern API research from Zenthra Labs.",
        },
    ],
};
