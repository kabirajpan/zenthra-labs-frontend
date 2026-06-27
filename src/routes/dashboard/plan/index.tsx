import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="relative min-h-[500px] w-full">
            {/* skeleton empty container mockup with inline blur filter */}
            <div class="space-y-6" style={{ filter: "blur(8px)", pointerEvents: "none", userSelect: "none" }}>
                {/* Mock Header */}
                <div class="border-b border-[#c6c5d3] dark:border-[#1e2030] pb-4">
                    <div class="h-6 w-48 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                    <div class="h-4 w-72 bg-neutral-100 dark:bg-white/5 rounded-[4px] mt-2" />
                </div>

                {/* Mock Card 1 */}
                <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-6 h-40 flex flex-col justify-between">
                    <div class="h-4 w-32 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                    <div class="h-8 w-64 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                    <div class="h-2 w-full bg-neutral-200 dark:bg-white/5 rounded-full" />
                </div>

                {/* Mock Grid */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 h-64 flex flex-col justify-between">
                        <div class="h-4 w-20 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-8 w-32 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-20 bg-neutral-100 dark:bg-white/5 rounded-[4px]" />
                    </div>
                    <div class="bg-white dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 h-64 flex flex-col justify-between">
                        <div class="h-4 w-20 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-8 w-32 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-20 bg-neutral-100 dark:bg-white/5 rounded-[4px]" />
                    </div>
                    <div class="bg-white dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 h-64 flex flex-col justify-between">
                        <div class="h-4 w-20 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-8 w-32 bg-neutral-200 dark:bg-white/10 rounded-[4px]" />
                        <div class="h-20 bg-neutral-100 dark:bg-white/5 rounded-[4px]" />
                    </div>
                </div>
            </div>

            {/* Lock Backdrop and Moved-Up Modal */}
            <div class="absolute inset-0 flex items-start justify-center p-4 pt-16 z-10">
                <div class="max-w-sm w-full bg-[#fbf8ff] dark:bg-[#0b0c11] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-6 text-center shadow-lg dark:shadow-2xl">
                    <div class="w-10 h-10 mx-auto rounded-full bg-[#5c6bc0]/10 flex items-center justify-center text-[#5c6bc0] dark:text-indigo-400 mb-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                    </div>
                    <h2 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white mb-1.5">
                        Feature Locked
                    </h2>
                    <p class="text-xs text-neutral-500 dark:text-[#94a3b8] leading-relaxed mb-5">
                        Subscription management and plan upgrading have not been unlocked yet.
                    </p>
                    <a
                        href="/dashboard"
                        class="inline-block px-5 py-2 bg-[#5c6bc0] hover:bg-[#5c6bc0]/90 text-white font-bold text-xs rounded-[4px] transition-all cursor-pointer"
                    >
                        Return to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Manage Plan — Zenthra",
    meta: [
        { name: "description", content: "View and upgrade your Zenthra subscription plan." },
    ],
};
