import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    const billingCycle = useSignal<"monthly" | "annual">("annual");

    return (
        <section class="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 text-[#e2dff0]">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <span class="inline-block px-3 py-1 bg-white/5 border border-white/10 text-purple-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Simple, Transparent Pricing
                </span>
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Upgrade to Morph-X Pro
                </h1>
                <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
                    Unlock professional GPU shaders, full HD/4K rendering at 60 FPS, bezier keyframe graphs, and watermark-free exports.
                </p>

                {/* Billing Toggle */}
                <div class="inline-flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-[6px] mt-8">
                    <button
                        type="button"
                        onClick$={() => { billingCycle.value = "monthly"; }}
                        class={`px-4 py-1.5 text-xs font-semibold rounded-[4px] transition-all cursor-pointer ${
                            billingCycle.value === "monthly"
                                ? "bg-white text-black shadow-sm"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        Monthly Billing
                    </button>
                    <button
                        type="button"
                        onClick$={() => { billingCycle.value = "annual"; }}
                        class={`px-4 py-1.5 text-xs font-semibold rounded-[4px] transition-all flex items-center gap-1.5 cursor-pointer ${
                            billingCycle.value === "annual"
                                ? "bg-white text-black shadow-sm"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <span>Yearly Billing</span>
                        <span class="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-normal">Save 33%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Free Tier */}
                <div class="bg-[#100d1c] border border-white/10 rounded-[6px] p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-white">Morph-X Starter</h2>
                            <span class="text-xs font-['JetBrains_Mono',monospace] text-zinc-400">Standard</span>
                        </div>
                        <p class="text-xs text-zinc-400 mb-6">
                            Essential mobile video editing and composition for everyday creators.
                        </p>
                        <div class="flex items-baseline gap-1 mb-6">
                            <span class="text-3xl sm:text-4xl font-bold text-white">$0</span>
                            <span class="text-xs text-zinc-400">/ forever</span>
                        </div>

                        <ul class="space-y-3 text-xs text-zinc-300">
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Multi-track timeline editing</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Basic motion transitions &amp; filters</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>On-device offline rendering</span>
                            </li>
                            <li class="flex items-center gap-2 text-zinc-500">
                                <span class="w-4 text-center">―</span>
                                <span>Standard export resolution</span>
                            </li>
                        </ul>
                    </div>

                    <div class="pt-8">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.aftermotion.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block w-full py-2.5 px-4 text-center rounded-[4px] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white text-xs font-semibold transition-colors"
                        >
                            Download Free
                        </a>
                    </div>
                </div>

                {/* Pro Tier */}
                <div class="relative bg-gradient-to-b from-purple-950/40 to-[#120e24] border-2 border-purple-500/50 rounded-[6px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                    <div class="absolute -top-3 right-6 bg-purple-500 text-white text-[10px] font-bold font-['JetBrains_Mono',monospace] uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] shadow">
                        Recommended
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-white">Morph-X Pro</h2>
                            <span class="text-xs font-['JetBrains_Mono',monospace] text-purple-300">Unlimited Access</span>
                        </div>
                        <p class="text-xs text-zinc-400 mb-6">
                            Full suite of advanced GPU compositing tools, shaders, and keyframing.
                        </p>
                        <div class="flex items-baseline gap-1 mb-6">
                            <span class="text-3xl sm:text-4xl font-bold text-white">
                                {billingCycle.value === "annual" ? "$39.99" : "$4.99"}
                            </span>
                            <span class="text-xs text-zinc-400">
                                {billingCycle.value === "annual" ? "/ year ($3.33/mo)" : "/ month"}
                            </span>
                        </div>

                        <ul class="space-y-3 text-xs text-zinc-300">
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span><strong>Watermark-Free</strong> exports</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Smooth <strong>60 FPS</strong> &amp; 4K Ultra-HD export</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Advanced Bezier easing &amp; velocity curves</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>All Pro GPU Shaders (Glitches, Warps, Blurs, 3D LUTs)</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Ad-Free experience &amp; priority customer support</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>14-day money-back guarantee</span>
                            </li>
                        </ul>
                    </div>

                    <div class="pt-8">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.aftermotion.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block w-full py-2.5 px-4 text-center rounded-[4px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors shadow-md"
                        >
                            Get Morph-X Pro
                        </a>
                        <p class="text-[11px] text-zinc-500 text-center mt-2.5">
                            Secure billing powered by Paddle · Cancel anytime
                        </p>
                    </div>
                </div>
            </div>

            {/* Merchant / Payment Guarantee notice for Paddle compliance */}
            <div class="mt-16 text-center text-xs text-zinc-400 border-t border-white/10 pt-8 max-w-2xl mx-auto space-y-2">
                <p>
                    Payments are securely processed by our Merchant of Record, <strong>Paddle</strong>. Applicable local taxes &amp; VAT are calculated at checkout.
                </p>
                <div class="flex items-center justify-center gap-4 text-zinc-400 font-['JetBrains_Mono',monospace] text-[11px]">
                    <a href="/legal/terms" class="hover:text-white underline">Terms of Service</a>
                    <span>•</span>
                    <a href="/legal/privacy" class="hover:text-white underline">Privacy Policy</a>
                    <span>•</span>
                    <a href="/legal/refund" class="hover:text-white underline">Refund Policy</a>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Pricing — Morph-X Pro & ZenthraLabs",
    meta: [
        { name: "description", content: "Morph-X Pro pricing plans: Monthly and Annual subscriptions for high-performance motion graphics and video editing." },
    ],
};
