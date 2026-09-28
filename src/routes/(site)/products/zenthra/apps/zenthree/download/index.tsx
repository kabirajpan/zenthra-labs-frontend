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
        filename: "zenthree-linux-x86_64.tar.gz",
        url: "https://github.com/kabirajpan/zenthree/releases/latest/download/zenthree-linux-x86_64.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    windows: {
        label: "Windows (x64)",
        description: "Portable standalone package (.zip)",
        filename: "zenthree-windows-x86_64.zip",
        url: "https://github.com/kabirajpan/zenthree/releases/latest/download/zenthree-windows-x86_64.zip",
        icon: DOWNLOAD_ICON,
    },
    macos: {
        label: "macOS (Universal)",
        description: "Apple Silicon & Intel package (.tar.gz)",
        filename: "zenthree-macos-universal.tar.gz",
        url: "https://github.com/kabirajpan/zenthree/releases/latest/download/zenthree-macos-universal.tar.gz",
        icon: DOWNLOAD_ICON,
    },
    unknown: {
        label: "Alternative Download",
        description: "Browse all releases on GitHub",
        filename: "latest source & releases",
        url: "https://github.com/kabirajpan/zenthree/releases",
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
                    <a href="/products/zenthra/apps/zenthree" class="inline-flex items-center gap-1.5 text-[#4352a5] dark:text-[#818cf8] hover:text-[#2a3674] dark:hover:text-[#a5b4fc] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Zenthree Overview
                    </a>
                    <span class="text-[#c6c5d3] dark:text-[#312e81]">|</span>
                    <a href="/download" class="text-[#4352a5] dark:text-[#818cf8] hover:text-[#2a3674] dark:hover:text-[#a5b4fc] transition-colors">
                        Download Center
                    </a>
                </div>
                <br />
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                    Zenthree · Native Desktop Editor
                </span>
                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-[#1b1b21] dark:text-white">
                    Download Zenthree
                </h1>
                <p class="text-[#454651] dark:text-[#94a3b8] text-base max-w-xl mx-auto">
                    Get the GPU-accelerated code editor for your operating system. Standalone, lightweight, zero Electron runtime.
                </p>
            </div>

            {/* Dynamic Featured OS Box */}
            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] p-6 sm:p-10 mb-12 shadow-lg relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-[#5c6bc0]/10 rounded-bl-full pointer-events-none" />

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                    <div>
                        <p class="text-xs font-['JetBrains_Mono',monospace] text-[#4352a5] dark:text-[#818cf8] uppercase tracking-wider mb-2">
                            {detectedPlatform.value !== "unknown" ? "✓ Recommended for your system" : "Download Zenthree"}
                        </p>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white mb-1">
                            {activeDownload.label}
                        </h2>
                        <p class="text-xs text-[#4352a5] dark:text-[#818cf8] font-['JetBrains_Mono',monospace]">
                            File: {activeDownload.filename}
                        </p>
                        <p class="text-sm text-[#454651] dark:text-[#94a3b8] mt-2">
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
            <div class="border-t border-[#c6c5d3] dark:border-[#1e2230] pt-12 mb-16">
                <h3 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white mb-6">All Platforms &amp; Architectures</h3>
                <div class="grid gap-4 sm:grid-cols-3">
                    {(["macos", "windows", "linux"] as PlatformKey[]).map((key) => {
                        const opt = DOWNLOADS[key];
                        const isFeatured = detectedPlatform.value === key;

                        return (
                            <div
                                key={key}
                                class={[
                                    "p-5 rounded-[4px] border transition-all flex flex-col justify-between shadow-sm",
                                    isFeatured
                                        ? "bg-white dark:bg-[#0e1017] border-[#5c6bc0] dark:border-[#5c6bc0]/60 shadow-md shadow-[#5c6bc0]/10"
                                        : "bg-white dark:bg-[#0e1017] border-[#c6c5d3] dark:border-[#1e2230] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/40",
                                ].join(" ")}
                            >
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21] dark:text-white">
                                            {opt.label}
                                        </span>
                                        {isFeatured && (
                                            <span class="px-2 py-0.5 text-[9px] font-['JetBrains_Mono',monospace] bg-[#e9e7ef] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 rounded-[4px]">
                                                Detected
                                            </span>
                                        )}
                                    </div>
                                    <p class="text-xs text-[#454651] dark:text-[#94a3b8] mb-1">{opt.description}</p>
                                    <p class="text-[10px] text-[#767683] dark:text-[#64748b] font-['JetBrains_Mono',monospace] mb-5 truncate">
                                        {opt.filename}
                                    </p>
                                </div>
                                <a
                                    href={opt.url}
                                    class="py-2 px-4 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] text-xs font-semibold rounded-[4px] text-center transition-all flex items-center justify-center gap-1.5"
                                >
                                    Download Package
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Build From Source With Cargo */}
            <div class="bg-[#071025] dark:bg-[#0c1020] border border-transparent dark:border-[#1e2230] rounded-[6px] p-6 sm:p-8 text-white mb-12 shadow-lg">
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                    <span class="text-xs text-[#9aa6e0] font-['JetBrains_Mono',monospace] ml-2">Build from source with Cargo</span>
                </div>
                <p class="text-xs text-[#bfc9d9] leading-relaxed mb-4">
                    If you have the Rust toolchain installed, you can build and run the latest development build directly:
                </p>
                <div class="bg-black/50 border border-white/5 p-4 rounded-[4px] font-['JetBrains_Mono',monospace] text-xs text-[#7ee787] space-y-1 select-all overflow-x-auto">
                    <div>git clone https://github.com/kabirajpan/zenthree.git</div>
                    <div>cd zenthree</div>
                    <div>cargo run --release --bin zenthree</div>
                </div>
            </div>

            {/* Run Guides */}
            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] p-6 sm:p-8 shadow-sm">
                <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21] dark:text-white mb-6 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Installation Instructions
                </h3>

                <div class="space-y-6 text-sm text-[#454651] dark:text-[#94a3b8]">
                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] dark:text-white mb-1.5">Linux</h4>
                        <p class="leading-relaxed text-xs">
                            Extract the package archive, make the binary executable, and launch:
                        </p>
                        <div class="bg-[#f5f2fa] dark:bg-[#07080d] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-[#9aa6e0] font-['JetBrains_Mono',monospace] text-[11px] p-3 rounded-[4px] mt-2 select-all">
                            tar -xzf zenthree-linux-x86_64.tar.gz<br />
                            chmod +x zenthree<br />
                            ./zenthree
                        </div>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] dark:text-white mb-1.5">macOS</h4>
                        <p class="leading-relaxed text-xs">
                            Extract the tarball and launch `zenthree`. If running on macOS Sequoia or Sonoma, right-click the binary and choose <strong>Open</strong> to approve the Gatekeeper security prompt.
                        </p>
                    </div>

                    <div>
                        <h4 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] dark:text-white mb-1.5">Windows</h4>
                        <p class="leading-relaxed text-xs">
                            Unzip `zenthree-windows-x86_64.zip` and run `zenthree.exe`. Requires Vulkan, DirectX 12, or OpenGL graphics drivers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Download Zenthree — ZenthraLabs",
    meta: [
        { name: "description", content: "Download Zenthree, the GPU-accelerated native code editor built with Zenthra for Linux, Windows, and macOS." },
        { property: "og:title", content: "Download Zenthree — ZenthraLabs" },
        { property: "og:description", content: "Download Zenthree, the GPU-accelerated native code editor built with Zenthra for Linux, Windows, and macOS." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Download Zenthree — ZenthraLabs" },
        { name: "twitter:description", content: "Download Zenthree, the GPU-accelerated native code editor built with Zenthra for Linux, Windows, and macOS." },
    ],
};
