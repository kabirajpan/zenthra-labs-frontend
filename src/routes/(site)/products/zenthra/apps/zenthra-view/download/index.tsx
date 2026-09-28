import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type PlatformKey = "linux" | "windows" | "macos" | "unknown";

interface DownloadOption {
    label: string;
    description: string;
    filename: string;
    url: string;
    icon: any;
}

const DOWNLOAD_ICON = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12" />
    </svg>
);

const DOWNLOADS: Record<PlatformKey, DownloadOption> = {
    linux: {
        label: "Linux (x86_64)",
        description: "Standalone binary package (.tar.gz)",
        filename: "zenthra-view-linux-x86_64.tar.gz",
        url: "https://github.com/kabirajpan/zenthra-v2/releases/latest/download/zenthra-view-linux-x86_64.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    windows: {
        label: "Windows (x64)",
        description: "Portable standalone package (.zip)",
        filename: "zenthra-view-windows-x86_64.zip",
        url: "https://github.com/kabirajpan/zenthra-v2/releases/latest/download/zenthra-view-windows-x86_64.zip",
        icon: DOWNLOAD_ICON,
    },
    macos: {
        label: "macOS (Universal)",
        description: "Intel & Apple Silicon package (.tar.gz)",
        filename: "zenthra-view-macos-universal.tar.gz",
        url: "https://github.com/kabirajpan/zenthra-v2/releases/latest/download/zenthra-view-macos-universal.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    unknown: {
        label: "Alternative Download",
        description: "Browse all releases on GitHub",
        filename: "latest source code",
        url: "https://github.com/kabirajpan/zenthra-v2/releases",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
};

export default component$(() => {
    const detectedPlatform = useSignal<PlatformKey>("unknown");

    useVisibleTask$(() => {
        const ua = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        if (ua.includes("win") || platform.includes("win")) {
            detectedPlatform.value = "windows";
        } else if (ua.includes("mac") || platform.includes("mac") || platform.includes("ipad") || platform.includes("iphone")) {
            detectedPlatform.value = "macos";
        } else if (ua.includes("linux") || platform.includes("linux")) {
            detectedPlatform.value = "linux";
        } else {
            detectedPlatform.value = "unknown";
        }
    });

    const activeDownload = DOWNLOADS[detectedPlatform.value];

    return (
        <section class="max-w-4xl mx-auto px-6 py-12 md:py-20">
            {/* Header */}
            <div class="text-center mb-16 space-y-4">
                <div class="flex justify-center gap-4 text-xs font-medium">
                    <a href="/products/zenthra/apps/zenthra-view" class="inline-flex items-center gap-1.5 text-theme-accent hover:opacity-80 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Zenthra View Details
                    </a>
                    <span class="text-theme-muted opacity-40">|</span>
                    <a href="/download" class="text-theme-accent hover:opacity-80 transition-opacity">
                        Download Center
                    </a>
                </div>
                <br />
                <span class="inline-block px-3 py-1 bg-theme-elevated text-theme-accent border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                    Zenthra View · Desktop Client
                </span>
                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-theme-primary">
                    Download Zenthra View
                </h1>
                <p class="text-theme-secondary text-base max-w-xl mx-auto">
                    Get the ultra-fast, native immediate-mode image viewer for your operating system. Standalone, zero-dependencies.
                </p>
            </div>

            {/* Dynamic Featured OS Box */}
            <div class="bg-theme-card border border-theme rounded-[6px] p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-[#5c6bc0]/10 rounded-bl-full pointer-events-none" />
                
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                    <div>
                        <p class="text-xs font-['JetBrains_Mono',monospace] text-theme-accent uppercase tracking-wider mb-2 font-semibold">
                            {detectedPlatform.value !== "unknown" ? "✓ Recommended for your system" : "Download Zenthra View"}
                        </p>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-theme-primary mb-1">
                            {activeDownload.label}
                        </h2>
                        <p class="text-xs text-theme-muted font-['JetBrains_Mono',monospace]">
                            File: {activeDownload.filename}
                        </p>
                        <p class="text-sm text-theme-secondary mt-2">
                            {activeDownload.description}
                        </p>
                    </div>

                    <a
                        href={activeDownload.url}
                        class="py-3 px-8 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-all shadow-lg shadow-[#5c6bc0]/25 flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
                    >
                        {activeDownload.icon}
                        Download Now
                    </a>
                </div>
            </div>

            {/* All Platforms & Packages */}
            <div class="border-t border-theme pt-12 mb-16">
                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-theme-primary mb-6">All Packages & Architectures</h3>
                <div class="grid gap-4 sm:grid-cols-3">
                    {(["macos", "windows", "linux"] as PlatformKey[]).map((key) => {
                        const opt = DOWNLOADS[key];
                        const isFeatured = detectedPlatform.value === key;

                        return (
                            <div
                                key={key}
                                class={[
                                    "p-5 rounded-[6px] border transition-all flex flex-col justify-between bg-theme-card",
                                    isFeatured
                                        ? "border-[#5c6bc0] shadow-md shadow-[#5c6bc0]/10"
                                        : "border-theme hover:border-theme-hover",
                                ].join(" ")}
                            >
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-['Syne',sans-serif] text-base font-bold text-theme-primary">
                                            {opt.label}
                                        </span>
                                        {isFeatured && (
                                            <span class="px-2 py-0.5 text-[9px] font-['JetBrains_Mono',monospace] bg-theme-elevated text-theme-accent border border-theme-subtle rounded-[4px]">
                                                Detected
                                            </span>
                                        )}
                                    </div>
                                    <p class="text-xs text-theme-secondary mb-1">{opt.description}</p>
                                    <p class="text-[10px] text-theme-muted font-['JetBrains_Mono',monospace] mb-5 truncate">
                                        {opt.filename}
                                    </p>
                                </div>
                                <a
                                    href={opt.url}
                                    class="py-2 px-4 border border-theme text-theme-primary hover:bg-theme-elevated text-xs font-semibold rounded-[4px] text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    Download Option
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Run Guides */}
            <div class="bg-theme-card border border-theme rounded-[6px] p-6 sm:p-8">
                <h3 class="font-['Syne',sans-serif] text-base font-bold text-theme-primary mb-6 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    Installation Instructions
                </h3>

                <div class="space-y-6 text-sm text-theme-secondary">
                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-theme-primary mb-1.5">Linux</h4>
                        <p class="leading-relaxed text-xs">
                            Unpack the archive, mark the binary as executable, and run:
                        </p>
                        <div class="bg-[#071025] dark:bg-[#07080d] border border-theme text-[#818cf8] font-['JetBrains_Mono',monospace] text-[11px] p-3 rounded-[4px] mt-2 select-all">
                            tar -xzf zenthra-view-linux-x86_64.tar.gz<br />
                            chmod +x image-viewer<br />
                            ./image-viewer
                        </div>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-theme-primary mb-1.5">macOS</h4>
                        <p class="leading-relaxed text-xs">
                            Extract the package and run the executable. Since the binary is self-signed, you may need to right-click the application and select <strong>Open</strong> to bypass Apple Gatekeeper warnings.
                        </p>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-theme-primary mb-1.5">Windows</h4>
                        <p class="leading-relaxed text-xs">
                            Unzip the archive to any folder and double-click <strong>image-viewer.exe</strong> to run.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Download Zenthra View — ZenthraLabs",
    meta: [
        { name: "description", content: "Download Zenthra View, the lightning fast native desktop image viewer for macOS, Windows, and Linux." },
        { property: "og:title", content: "Download Zenthra View — ZenthraLabs" },
        { property: "og:description", content: "Download Zenthra View, the lightning fast native desktop image viewer for macOS, Windows, and Linux." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Download Zenthra View — ZenthraLabs" },
        { name: "twitter:description", content: "Download Zenthra View, the lightning fast native desktop image viewer for macOS, Windows, and Linux." },
    ],
};
