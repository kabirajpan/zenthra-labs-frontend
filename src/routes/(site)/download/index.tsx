import { component$, useSignal } from "@builder.io/qwik";
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
    category: "desktop" | "mobile" | "web";
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
        category: "desktop",
    },
    {
        id: "zenfile",
        title: "ZenFile",
        description: "A high-performance native file manager built with Zenthra. Instant loading directory virtual lists, beveled frosted layouts, and fully local filesystem actions.",
        status: "active",
        statusLabel: "v1.0.0 (Released)",
        platforms: ["Linux", "macOS", "Windows"],
        link: "/products/zenthra/apps/file-manager/download",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
        ),
        category: "desktop",
    },
    {
        id: "after-motion",
        title: "After Motion",
        description: "A professional-grade on-device mobile video editor. Edit multitrack timelines at 60 FPS previews with zero telemetry and no subscriptions.",
        status: "active",
        statusLabel: "v1.0.0 (Google Play)",
        platforms: ["Android"],
        link: "https://play.google.com/store/apps/details?id=com.aftermotion.app",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
        category: "mobile",
    },
    {
        id: "domo",
        title: "Domo Dashboard",
        description: "An experimental web dashboard showing real-time interactive canvas widgets, charts, and coordinate visualizer tools.",
        status: "active",
        statusLabel: "v1.0.0 (Live)",
        platforms: ["Web Browser"],
        link: "/products/domo",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
        ),
        category: "web",
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
        category: "desktop",
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
        category: "desktop",
    },
];

export default component$(() => {
    const activeTab = useSignal<"all" | "desktop" | "mobile" | "web">("all");

    const filteredApps = APPLICATIONS.filter(
        (app) => activeTab.value === "all" || app.category === activeTab.value
    );

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

            {/* Tab Selector */}
            <div class="flex justify-center mb-12">
                <div class="inline-flex p-1 bg-[#e9e7ef] border border-[#c6c5d3] rounded-[8px] gap-1">
                    {[
                        { id: "all", label: "All Apps" },
                        { id: "desktop", label: "Desktop" },
                        { id: "mobile", label: "Mobile App" },
                        { id: "web", label: "Web" },
                    ].map((tab) => {
                        const isSelected = activeTab.value === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick$={() => {
                                    activeTab.value = tab.id as any;
                                }}
                                class={[
                                    "px-4 py-1.5 rounded-[6px] text-xs font-semibold font-['Syne',sans-serif] transition-all",
                                    isSelected
                                        ? "bg-[#5c6bc0] text-white shadow-md"
                                        : "text-[#767683] hover:text-[#1b1b21]",
                                ].join(" ")}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid of Applications */}
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredApps.map((app) => {
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
                                    {app.id === "after-motion" ? (
                                        <img
                                            src="/assets/screenshots/after-motion/logos/full.png"
                                            alt="After Motion Logo"
                                            class="w-12 h-12 rounded-[8px] object-cover shadow-sm"
                                        />
                                    ) : (
                                        <div class={[
                                            "p-3 rounded-[4px]",
                                            isActive ? "bg-[#e9e7ef] text-[#4352a5]" : "bg-[#e2e2ec] text-[#767683]"
                                        ].join(" ")}>
                                            {app.icon}
                                        </div>
                                    )}
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
                                app.id === "after-motion" ? (
                                    <a
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="py-2.5 px-4 bg-[#12131a] hover:bg-[#1b1c26] text-white text-sm font-semibold rounded-[6px] text-center transition-all shadow-md border border-[#2a2a38] flex items-center justify-center gap-2"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" class="shrink-0">
                                            <path fill="#EA4335" d="M3.6 2.2C3.2 2.6 3 3.2 3 4v16c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2L3.7 2.1l-.1.1z"/>
                                            <path fill="#FBBC04" d="M15.7 15.9l-3-3v-.2l3-3 .1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2z"/>
                                            <path fill="#4285F4" d="M12.7 12.7L3.6 21.8c.4.4.9.4 1.5.1l10.6-6-3-3.2z"/>
                                            <path fill="#34A853" d="M12.7 11.3l3-3L5.1 2.3c-.6-.3-1.1-.3-1.5.1l9.1 8.9z"/>
                                        </svg>
                                        <span>Get on Google Play</span>
                                    </a>
                                ) : (
                                    <a
                                        href={app.link}
                                        target={app.link.startsWith("http") ? "_blank" : undefined}
                                        rel={app.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                        class="py-2.5 px-4 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white text-sm font-semibold rounded-[4px] text-center transition-all shadow-md shadow-[#5c6bc0]/15"
                                    >
                                        {app.link.startsWith("http") ? "Get on Google Play" : "Get Started"}
                                    </a>
                                )
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
    title: "Download Center — ZenthraLabs",
    meta: [
        { name: "description", content: "Download center for ZenthraLabs applications. Get Zenthra View and explore upcoming ecosystem programs." },
        { property: "og:title", content: "Download Center — ZenthraLabs" },
        { property: "og:description", content: "Download center for ZenthraLabs applications. Get Zenthra View and explore upcoming ecosystem programs." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Download Center — ZenthraLabs" },
        { name: "twitter:description", content: "Download center for ZenthraLabs applications. Get Zenthra View and explore upcoming ecosystem programs." },
    ],
};
