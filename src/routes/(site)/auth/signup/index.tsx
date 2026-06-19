import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex items-center justify-center min-h-[calc(100vh-16rem)]">
            <div class="w-full max-w-lg bg-white border border-[#c6c5d3] rounded-[6px] shadow-xl p-8 md:p-10 relative overflow-hidden">
                {/* Accent line */}
                <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5c6bc0] to-[#4352a5]" />

                <div class="text-center mb-8">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d7f5df] text-[#1f6b3a] font-['JetBrains_Mono',monospace] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#28ca41] animate-pulse" />
                        Portal Launching Soon
                    </span>
                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-2">
                        Get Started
                    </h1>
                    <p class="text-sm text-[#454651] max-w-sm mx-auto">
                        Create a Zenthra Developer Account to synchronize timelines, manage team variables, and monitor native app assets.
                    </p>
                </div>

                {/* Under development notice box */}
                <div class="bg-[#f5f2fa] border border-[#c6c5d3] rounded-[4px] p-6 mb-8 text-left space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-[#5c6bc0]/10 flex items-center justify-center text-[#5c6bc0]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                            </svg>
                        </div>
                        <h3 class="font-['Syne',sans-serif] font-bold text-[#1b1b21] text-sm">Under Active Development</h3>
                    </div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        We are currently building our unified developer registry portal. Registration links and organization accounts will open in Q3 2026.
                    </p>
                    <div class="border-t border-[#c6c5d3] pt-4 space-y-2">
                        <h4 class="text-xs font-bold text-[#1b1b21]">Upcoming portal features:</h4>
                        <ul class="text-[11px] text-[#767683] space-y-1.5 pl-3 list-disc">
                            <li>Shared workspace canvas syncing across developer teams.</li>
                            <li>WGPU target cross-compilation pipeline triggers.</li>
                            <li>Real-time application render-latency crash diagnostic reports.</li>
                        </ul>
                    </div>
                </div>

                {/* Simulated registration form (disabled state) */}
                <div class="space-y-4 mb-6 opacity-40 select-none pointer-events-none">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-[#1b1b21] mb-1.5">First Name</label>
                            <input type="text" placeholder="John" class="w-full border border-[#c6c5d3] rounded-[4px] p-2.5 text-sm outline-none bg-gray-50" disabled />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-[#1b1b21] mb-1.5">Last Name</label>
                            <input type="text" placeholder="Doe" class="w-full border border-[#c6c5d3] rounded-[4px] p-2.5 text-sm outline-none bg-gray-50" disabled />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-[#1b1b21] mb-1.5">Email Address</label>
                        <input type="email" placeholder="name@domain.com" class="w-full border border-[#c6c5d3] rounded-[4px] p-2.5 text-sm outline-none bg-gray-50" disabled />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-[#1b1b21] mb-1.5">Password</label>
                        <input type="password" placeholder="••••••••" class="w-full border border-[#c6c5d3] rounded-[4px] p-2.5 text-sm outline-none bg-gray-50" disabled />
                    </div>
                    <button class="w-full py-2.5 bg-[#c6c5d3] text-white font-medium rounded-[4px] text-sm cursor-not-allowed">Create Account</button>
                </div>

                <div class="text-center">
                    <a href="/" class="text-xs text-[#5c6bc0] hover:text-[#4352a5] font-bold transition-colors">
                        &larr; Back to Home
                    </a>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Get Started — Zenthra Developer Portal",
    meta: [
        { name: "description", content: "Access your Zenthra Developer Workspace. Portal under development." },
    ],
};
