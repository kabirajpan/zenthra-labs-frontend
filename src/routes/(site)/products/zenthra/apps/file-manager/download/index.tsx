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
        filename: "zenfile-linux-x86_64.tar.gz",
        url: "https://github.com/kabirajpan/ZenFile/releases/latest/download/zenfile-linux-x86_64.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    windows: {
        label: "Windows (x64)",
        description: "Portable standalone package (.zip)",
        filename: "zenfile-windows-x86_64.zip",
        url: "https://github.com/kabirajpan/ZenFile/releases/latest/download/zenfile-windows-x86_64.zip",
        icon: DOWNLOAD_ICON,
    },
    macos: {
        label: "macOS (Universal)",
        description: "Intel & Apple Silicon package (.tar.gz)",
        filename: "zenfile-macos-universal.tar.gz",
        url: "https://github.com/kabirajpan/ZenFile/releases/latest/download/zenfile-macos-universal.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    unknown: {
        label: "Alternative Download",
        description: "Browse all releases on GitHub",
        filename: "latest source code",
        url: "https://github.com/kabirajpan/ZenFile/releases",
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
                    <a href="/products/zenthra/apps/file-manager" class="inline-flex items-center gap-1.5 text-[#5c6bc0] hover:text-[#4d5cb0] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to ZenFile Details
                    </a>
                    <span class="text-[#c6c5d3]">|</span>
                    <a href="/download" class="text-[#5c6bc0] hover:text-[#4d5cb0] transition-colors">
                        Download Center
                    </a>
                </div>
                <br />
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                    ZenFile · Desktop Client
                </span>
                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-[#1b1b21]">
                    Download ZenFile
                </h1>
                <p class="text-[#454651] text-base max-w-xl mx-auto">
                    Get the native, dependency-light Zenthra file manager for your operating system. Standalone, zero-dependencies.
                </p>
            </div>

            {/* Dynamic Featured OS Box */}
            <div class="bg-white border border-[#c6c5d3] rounded-[6px] p-6 sm:p-10 mb-12 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-[#5c6bc0]/5 rounded-bl-full pointer-events-none" />

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                    <div>
                        <p class="text-xs font-['JetBrains_Mono',monospace] text-[#5c6bc0] uppercase tracking-wider mb-2">
                            {detectedPlatform.value !== "unknown" ? "✓ Recommended for your system" : "Download ZenFile"}
                        </p>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] mb-1">
                            {activeDownload.label}
                        </h2>
                        <p class="text-xs text-[#767683] font-['JetBrains_Mono',monospace]">
                            File: {activeDownload.filename}
                        </p>
                        <p class="text-sm text-[#454651] mt-2">
                            {activeDownload.description}
                        </p>
                    </div>

                    <a
                        href={activeDownload.url}
                        class="py-3 px-8 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-all shadow-lg shadow-[#5c6bc0]/25 flex items-center justify-center gap-2 self-start sm:self-auto"
                    >
                        {activeDownload.icon}
                        Download Now
                    </a>
                </div>
            </div>

            {/* All Platforms & Packages */}
            <div class="border-t border-[#c6c5d3] pt-12 mb-16">
                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] mb-6">All Packages & Architectures</h3>
                <div class="grid gap-4 sm:grid-cols-3">
                    {(["macos", "windows", "linux"] as PlatformKey[]).map((key) => {
                        const opt = DOWNLOADS[key];
                        const isFeatured = detectedPlatform.value === key;

                        return (
                            <div
                                key={key}
                                class={[
                                    "p-5 rounded-[4px] border transition-all flex flex-col justify-between",
                                    isFeatured
                                        ? "bg-white border-[#5c6bc0] shadow-sm shadow-[#5c6bc0]/5"
                                        : "bg-white border-[#c6c5d3] hover:border-[#767683]",
                                ].join(" ")}
                            >
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21]">
                                            {opt.label}
                                        </span>
                                        {isFeatured && (
                                            <span class="px-2 py-0.5 text-[9px] font-['JetBrains_Mono',monospace] bg-[#e3e1e9] text-[#4352a5] rounded-[4px]">
                                                Detected
                                            </span>
                                        )}
                                    </div>
                                    <p class="text-xs text-[#454651] mb-1">{opt.description}</p>
                                    <p class="text-[10px] text-[#767683] font-['JetBrains_Mono',monospace] mb-5 truncate">
                                        {opt.filename}
                                    </p>
                                </div>
                                <a
                                    href={opt.url}
                                    class="py-2 px-4 border border-[#c6c5d3] text-[#1b1b21] hover:bg-[#e9e7ef] text-xs font-semibold rounded-[4px] text-center transition-all flex items-center justify-center gap-1.5"
                                >
                                    Download Option
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Run Guides */}
            <div class="bg-[#f5f2fa] border border-[#c6c5d3] rounded-[6px] p-6 sm:p-8">
                <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21] mb-6 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Installation Instructions
                </h3>

                <div class="space-y-6 text-sm text-[#454651]">
                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] mb-1.5">Linux</h4>
                        <p class="leading-relaxed text-xs">
                            Unpack the archive, mark the binary as executable, and run:
                        </p>
                        <div class="bg-[#071025] text-[#9aa6e0] font-['JetBrains_Mono',monospace] text-[11px] p-3 rounded-[4px] mt-2 select-all">
                            tar -xzf zenfile-linux-x86_64.tar.gz<br />
                            chmod +x file-manager<br />
                            ./file-manager
                        </div>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] mb-1.5">macOS</h4>
                        <p class="leading-relaxed text-xs">
                            Extract the package and run the executable. Since the binary is self-signed, you may need to right-click the application and select <strong>Open</strong> to bypass Apple Gatekeeper warnings.
                        </p>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] mb-1.5">Windows</h4>
                        <p class="leading-relaxed text-xs">
                            Unzip the archive to any folder and double-click <strong>file-manager.exe</strong> to run.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Download ZenFile — Zenthra Labs",
    meta: [
        { name: "description", content: "Download ZenFile, the native cross-platform Zenthra desktop file manager for macOS, Windows, and Linux." },
        { property: "og:title", content: "Download ZenFile — Zenthra Labs" },
        { property: "og:description", content: "Download ZenFile, the native cross-platform Zenthra desktop file manager for macOS, Windows, and Linux." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Download ZenFile — Zenthra Labs" },
        { name: "twitter:description", content: "Download ZenFile, the native cross-platform Zenthra desktop file manager for macOS, Windows, and Linux." },
    ],
};
