import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface ApplicationCard {
    id: string;
    title: string;
    description: string;
    status: "active" | "upcoming";
    statusLabel: string;
    platforms: string[];
    link: string;
    icon: any;
}

const APPLICATIONS: ApplicationCard[] = [
    {
        id: "zenthra-view",
        title: "Zenthra View",
        description: "An ultra-fast, native immediate-mode desktop image viewer. Features dynamic file virtualisation for managing 100,000+ item folders instantly.",
        status: "active",
        statusLabel: "v1.0.1 (Released)",
        platforms: ["Linux", "macOS", "Windows"],
        link: "/products/zenthra/apps/zenthra-view/download",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
    },
    {
        id: "zenthra-editor",
        title: "Zenthra Editor",
        description: "A hardware-accelerated motion graphics and 3D design canvas. Leverage the Taffy layout engine and Vulkan/Metal shader blits for latency-free timeline editing.",
        status: "upcoming",
        statusLabel: "Upcoming (Q4 2026)",
        platforms: ["Linux", "macOS", "Windows"],
        link: "#",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        id: "zenthra-player",
        title: "Zenthra Player",
        description: "Low-overhead media player with customized GPU decoding loops and zero buffer lag, engineered to work directly with native display devices.",
        status: "upcoming",
        statusLabel: "Upcoming (Q1 2027)",
        platforms: ["Linux", "macOS", "Windows"],
        link: "#",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
        ),
    },
];

export default component$(() => {
    return (
        <section class="max-w-6xl mx-auto px-6 py-12 md:py-20">
            {/* Header */}
            <div class="text-center mb-16 space-y-4">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                    Software Suite
                </span>
                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-[#1b1b21]">
                    Download Center
                </h1>
                <p class="text-[#454651] text-base max-w-xl mx-auto">
                    Get the official native applications compiled directly for your platform, built from the ground up using the high-performance Zenthra engine.
                </p>
            </div>

            {/* Grid of Applications */}
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {APPLICATIONS.map((app) => {
                    const isActive = app.status === "active";

                    return (
                        <div
                            key={app.id}
                            class={[
                                "bg-white border border-[#c6c5d3] rounded-[6px] p-6 flex flex-col justify-between transition-all",
                                isActive 
                                    ? "hover:border-[#5c6bc0] hover:shadow-md hover:shadow-[#5c6bc0]/5" 
                                    : "opacity-75 bg-[#fbf8ff]/50"
                            ].join(" ")}
                        >
                            <div>
                                {/* Icon & Header */}
                                <div class="flex items-center gap-4 mb-6">
                                    <div class={[
                                        "p-3 rounded-[4px]",
                                        isActive ? "bg-[#e9e7ef] text-[#4352a5]" : "bg-[#e2e2ec] text-[#767683]"
                                    ].join(" ")}>
                                        {app.icon}
                                    </div>
                                    <div>
                                        <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">
                                            {app.title}
                                        </h2>
                                        <span class={[
                                            "text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-[4px] inline-block mt-0.5",
                                            isActive ? "bg-[#e3e1e9] text-[#4352a5]" : "bg-[#ececed] text-[#767683]"
                                        ].join(" ")}>
                                            {app.statusLabel}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p class="text-sm text-[#454651] leading-relaxed mb-6">
                                    {app.description}
                                </p>

                                {/* Supported Platforms */}
                                <div class="mb-8">
                                    <span class="text-[10px] font-['JetBrains_Mono',monospace] text-[#767683] block mb-2 uppercase tracking-wider">
                                        Supported Platforms
                                    </span>
                                    <div class="flex flex-wrap gap-1.5">
                                        {app.platforms.map((p) => (
                                            <span 
                                                key={p} 
                                                class="px-2 py-0.5 text-xs border border-[#c6c5d3] rounded-[4px] text-[#454651] bg-[#fbf8ff]"
                                            >
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Download Action */}
                            {isActive ? (
                                <a
                                    href={app.link}
                                    class="py-2.5 px-4 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white text-sm font-semibold rounded-[4px] text-center transition-all shadow-md shadow-[#5c6bc0]/15"
                                >
                                    Get Started
                                </a>
                            ) : (
                                <button
                                    disabled
                                    class="py-2.5 px-4 bg-[#ececed] text-[#767683] text-sm font-semibold rounded-[4px] text-center cursor-not-allowed border border-dashed border-[#c6c5d3]"
                                >
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* General Info */}
            <div class="mt-16 bg-[#f5f2fa] border border-[#c6c5d3] rounded-[6px] p-6 text-center max-w-2xl mx-auto">
                <h3 class="font-['Syne',sans-serif] text-sm font-bold text-[#1b1b21] mb-2">Need a custom environment build?</h3>
                <p class="text-xs text-[#454651] leading-relaxed">
                    All apps are open source under the MIT license. You can compile them from source using the cargo toolchain. Check out our <a href="https://github.com/kabirajpan/zenthra-v2" target="_blank" rel="noopener" class="text-[#5c6bc0] underline">GitHub Organization</a> to explore the build requirements.
                </p>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Download Center — Zenthra Labs",
    meta: [
        { name: "description", content: "Download center for Zenthra Labs applications. Get Zenthra View and explore upcoming ecosystem programs." },
    ],
};
