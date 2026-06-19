import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* ── Hero ── */}
            <div class="mb-16 border-b border-[#c6c5d3] pb-12">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Zenthra Labs · Our Story
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl lg:text-5xl font-bold text-[#1b1b21] leading-tight mb-4">
                    Rebuilding desktop &amp; mobile computing from the metal up.
                </h1>
                <p class="text-[#454651] text-base leading-relaxed max-w-3xl">
                    Zenthra Labs was founded in 2024 with a simple belief: modern user interfaces shouldn't require gigabytes of runtime framework overhead. We build GPU-accelerated graphics stacks and low-latency native developer tools for the next generation of computing.
                </p>
            </div>

            {/* ── Core Philosophy & Values ── */}
            <div class="mb-20">
                <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] mb-8">
                    Core Operational Tenets
                </h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Performance First",
                            desc: "We measure rendering operations in microseconds. If a frame takes longer than 4ms to process, we consider it a bug. Zero micro-stutters, zero garbage collection, lock-free concurrency.",
                        },
                        {
                            title: "Local-First Autonomy",
                            desc: "User data belongs strictly on user hardware. Our tools and frameworks function entirely offline without cloud dependency, forced telemetry, or mandatory network syncs.",
                        },
                        {
                            title: "Engineering as Art",
                            desc: "We write clean, composable systems using Rust. Decoupling the layout calculations, event streams, and drawing lists produces codebases that are resilient, fast, and elegant.",
                        },
                    ].map((val, idx) => (
                        <div
                            key={idx}
                            class="bg-white border border-[#c6c5d3] rounded-[4px] p-6 hover:border-[#4352a5] transition-all group"
                        >
                            <span class="text-xs font-['JetBrains_Mono',monospace] text-[#767683] block mb-3">
                                0{idx + 1} // VALUE
                            </span>
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2 group-hover:text-[#4352a5] transition-colors">
                                {val.title}
                            </h3>
                            <p class="text-xs text-[#454651] leading-relaxed">
                                {val.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Milestones Timeline ── */}
            <div class="mb-20 border-t border-[#c6c5d3] pt-12 md:pt-20">
                <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] mb-12">
                    Ecosystem Timeline
                </h2>
                <div class="space-y-12 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-[#c6c5d3]">
                    {[
                        {
                            date: "Q1 2024",
                            title: "Immediate-Mode Research",
                            desc: "Started research into hardware-accelerated immediate-mode layout nodes. Built the initial prototypes using early layout algorithms and tested cross-thread event rendering.",
                        },
                        {
                            date: "Q3 2024",
                            title: "The WGPU Render Pipeline",
                            desc: "Released the low-level GPU draw list compiler, target binding contexts, and platform-specific Vulkan and OpenGL render hooks.",
                        },
                        {
                            date: "Q2 2025",
                            title: "Taffy & Cosmic Text Integration",
                            desc: "Integrated the flexible Taffy flexbox model for precise coordinate trees and Cosmic Text library for dynamic sub-pixel text layout shaping.",
                        },
                        {
                            date: "Q1 2026",
                            title: "Crates.io Release & Zenthra View",
                            desc: "Published the zenthra umbrella crate v0.1.0 to crates.io and launched Zenthra View, demonstrating a production-grade 100K virtualized item desktop app.",
                        },
                    ].map((milestone, idx) => (
                        <div key={idx} class="relative pl-12 group">
                            <span class="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-white border border-[#4352a5] group-hover:bg-[#4352a5] transition-colors" />
                            <div class="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
                                <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] tracking-wider md:w-24 shrink-0">
                                    {milestone.date}
                                </span>
                                <div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-1">
                                        {milestone.title}
                                    </h3>
                                    <p class="text-xs text-[#454651] leading-relaxed max-w-2xl">
                                        {milestone.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Sub CTA Banner ── */}
            <div class="bg-[#071025] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">
                        Build with us.
                    </h2>
                    <p class="text-[#9aa6e0] text-sm">
                        All our layout engines and core crates are free, open source, and available on GitHub.
                    </p>
                </div>
                <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a
                        href="https://github.com/kabirajpan/zenthra"
                        target="_blank"
                        rel="noopener"
                        class="py-2.5 px-6 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-colors shadow-lg shadow-[#5c6bc0]/25"
                    >
                        Explore GitHub
                    </a>
                    <a
                        href="/products"
                        class="py-2.5 px-6 border border-white/20 text-white hover:bg-white/10 font-medium rounded-[4px] text-sm transition-colors"
                    >
                        Our Products
                    </a>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "About — Zenthra Labs",
    meta: [
        {
            name: "description",
            content: "Learn about the mission, values, and milestone history of Zenthra Labs in building high-performance native systems.",
        },
    ],
};
