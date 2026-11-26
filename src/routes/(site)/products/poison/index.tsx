import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const POISON_APK_DIRECT_URL =
    "https://drive.google.com/uc?export=download&id=1rJk1X9Q-wK8viFwEZVoXNsY5qdRRgsNR";
const POISON_APK_DRIVE_URL =
    "https://drive.google.com/file/d/1rJk1X9Q-wK8viFwEZVoXNsY5qdRRgsNR/view?usp=drivesdk";

const POISON_SCREENSHOTS = [
    "/assets/screenshots/poison/Screenshot_20261126-140808.png",
    "/assets/screenshots/poison/Screenshot_20261126-140819.png",
    "/assets/screenshots/poison/Screenshot_20261126-140848.png",
    "/assets/screenshots/poison/Screenshot_20261126-140855.png",
    "/assets/screenshots/poison/Screenshot_20261126-140919.png",
    "/assets/screenshots/poison/Screenshot_20261126-140927.png",
    "/assets/screenshots/poison/Screenshot_20261126-140933.png",
];

export default component$(() => {
    return (
        <section class="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
            {/* Breadcrumb */}
            <div class="mb-8 flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#767683] dark:text-[#94a3b8]">
                <a href="/products" class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors">
                    Products
                </a>
                <span>/</span>
                <span class="text-[#1b1b21] dark:text-white">Poison</span>
            </div>

            {/* Hero */}
            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] p-8 md:p-12 shadow-sm">
                <div class="flex flex-wrap items-center gap-2.5 mb-4">
                    <span class="px-2.5 py-1 bg-[#e2f7e6] dark:bg-emerald-950/60 text-[#147a32] dark:text-emerald-400 border border-transparent dark:border-emerald-800/40 text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider rounded-[4px]">
                        Android APK · Ready
                    </span>
                    <span class="px-2.5 py-1 bg-[#dee0ff] dark:bg-[#1e2235] text-[#2f3f92] dark:text-[#818cf8] text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider rounded-[4px]">
                        Mobile Game
                    </span>
                </div>

                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                    Poison
                </h1>
                <p class="mt-4 text-base sm:text-lg text-[#454651] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
                    Fast-paced native Android game by ZenthraLabs. Download the APK directly and install on your Android device.
                </p>

                {/* Primary Download Actions */}
                <div class="mt-8 flex flex-wrap items-center gap-3">
                    <a
                        href={POISON_APK_DIRECT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="py-3 px-6 bg-[#5c6bc0] text-white font-semibold rounded-[4px] text-sm hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-md shadow-[#5c6bc0]/25"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Poison APK
                    </a>

                    <a
                        href={POISON_APK_DRIVE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="py-3 px-5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all inline-flex items-center gap-2"
                    >
                        Open in Google Drive
                    </a>
                </div>

                {/* Metadata */}
                <div class="mt-10 pt-8 border-t border-[#e9e7ef] dark:border-[#1e2230] grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Platform
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#1b1b21] dark:text-white">
                            Android (APK)
                        </div>
                    </div>
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Distribution
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#1b1b21] dark:text-white">
                            Direct APK Download
                        </div>
                    </div>
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Install Note
                        </div>
                        <div class="mt-1 text-sm text-[#454651] dark:text-[#94a3b8]">
                            Allow &ldquo;Install unknown apps&rdquo; in browser settings if prompted.
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshots Gallery */}
            <div class="mt-12">
                <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white mb-6">
                    Screenshots
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {POISON_SCREENSHOTS.map((src, idx) => (
                        <div
                            key={src}
                            class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] overflow-hidden shadow-sm"
                        >
                            <img
                                src={src}
                                alt={`Poison screenshot ${idx + 1}`}
                                class="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Poison — Android Game | ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "Download Poison Android APK directly from ZenthraLabs.",
        },
    ],
};
