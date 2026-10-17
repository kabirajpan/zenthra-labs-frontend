import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const PADDLE_CLIENT_TOKEN = "live_4b1250b546adb75871fb308f00e";
const PRICE_MONTHLY = "pri_01m52g019ymcmtbzx3wtrs25yn";
const PRICE_ANNUAL = "pri_01m52g5bsnbqhd579r55zp1ah5";

export default component$(() => {
    const billingCycle = useSignal<"monthly" | "annual">("annual");
    const activeTxn = useSignal<string | null>(null);
    const checkoutStatus = useSignal<string | null>(null);

    const openCheckout = $((priceId?: string) => {
        if (typeof window === "undefined") return;
        const paddle = (window as any).Paddle;
        if (!paddle) {
            checkoutStatus.value = "Initializing secure checkout...";
            setTimeout(() => { checkoutStatus.value = null; }, 2500);
            return;
        }

        const targetPrice = priceId || (billingCycle.value === "annual" ? PRICE_ANNUAL : PRICE_MONTHLY);
        checkoutStatus.value = "Opening secure checkout...";
        setTimeout(() => { checkoutStatus.value = null; }, 3000);

        paddle.Checkout.open({
            items: [
                {
                    priceId: targetPrice,
                    quantity: 1
                }
            ],
            settings: {
                displayMode: "overlay",
                theme: "dark",
                successUrl: "https://zenthralabs.dev/products/morphex/pricing?checkout=success"
            }
        });
    });

    // Initialize Paddle.js and auto-open if _ptxn is present
    useVisibleTask$(({ cleanup }) => {
        const urlParams = new URLSearchParams(window.location.search);
        const ptxn = urlParams.get("_ptxn") || urlParams.get("txn") || urlParams.get("transactionId");
        
        if (urlParams.get("checkout") === "success") {
            window.location.href = "aftermotion://billing/success";
            return;
        }

        let statusTimeout: any = null;
        if (ptxn) {
            activeTxn.value = ptxn;
            checkoutStatus.value = "Preparing your secure checkout...";
            // Automatically clear status after 3s in case popup or overlay doesn't fire event
            statusTimeout = setTimeout(() => {
                checkoutStatus.value = null;
            }, 3000);
        }

        const initPaddle = () => {
            const paddle = (window as any).Paddle;
            if (paddle) {
                try {
                    paddle.Initialize({
                        token: PADDLE_CLIENT_TOKEN,
                        eventCallback: function(data: any) {
                            if (data.name === "checkout.loaded" || data.name === "checkout.closed") {
                                checkoutStatus.value = null;
                            }
                            if (data.name === "checkout.completed") {
                                window.location.href = "aftermotion://billing/success";
                            }
                        }
                    });

                    if (ptxn) {
                        setTimeout(() => {
                            paddle.Checkout.open({
                                transactionId: ptxn,
                                settings: {
                                    displayMode: "overlay",
                                    theme: "dark",
                                    successUrl: "https://zenthralabs.dev/products/morphex/pricing?checkout=success"
                                }
                            });
                            checkoutStatus.value = null;
                        }, 500);
                    }
                } catch (err) {
                    console.error("Failed to initialize Paddle:", err);
                    checkoutStatus.value = null;
                }
            }
        };

        if ((window as any).Paddle) {
            initPaddle();
        } else {
            const script = document.createElement("script");
            script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
            script.async = true;
            script.onload = () => {
                initPaddle();
            };
            document.head.appendChild(script);
        }

        cleanup(() => {
            if (statusTimeout) clearTimeout(statusTimeout);
        });
    });

    return (
        <section class="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 text-[#e2dff0]">
            {/* Breadcrumbs */}
            <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                <a href="/products" class="text-zinc-400 hover:text-white transition-colors">Products</a>
                <span class="text-zinc-600">/</span>
                <a href="/products/morphex" class="text-zinc-400 hover:text-white transition-colors">Morphex</a>
                <span class="text-zinc-600">/</span>
                <span class="text-zinc-200">Pricing</span>
            </div>

            {/* Active Transaction Banner if launched from mobile app */}
            {activeTxn.value && (
                <div class="mb-8 p-4 bg-purple-900/30 border border-purple-500/40 rounded-[6px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                        <div class="text-xs font-['JetBrains_Mono',monospace] text-purple-300 font-bold uppercase tracking-wider">
                            Mobile App Session Active
                        </div>
                        <p class="text-xs text-zinc-300 mt-0.5">
                            Complete your checkout below to unlock MORPHEX Pro on your device immediately.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick$={() => openCheckout()}
                        class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-[4px] transition-all shadow-md cursor-pointer shrink-0"
                    >
                        Open Payment Form &rarr;
                    </button>
                </div>
            )}

            {checkoutStatus.value && (
                <div class="mb-6 p-3 bg-white/5 border border-white/10 text-xs text-center text-purple-300 font-['JetBrains_Mono',monospace] rounded-[4px] animate-pulse">
                    {checkoutStatus.value}
                </div>
            )}

            <div class="text-center max-w-3xl mx-auto mb-12">
                <span class="inline-block px-3 py-1 bg-white/5 border border-white/10 text-purple-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Simple, Transparent Pricing
                </span>
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Upgrade to MORPHEX Pro
                </h1>
                <p class="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
                    Unlock professional GPU shaders, full HD/4K rendering at 60 FPS, bezier keyframe graphs, and watermark-free exports in Morphex.
                </p>

                {/* Billing Toggle */}
                <div class="inline-flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-[6px] mt-8">
                    <button
                        type="button"
                        onClick$={() => {
                            billingCycle.value = "monthly";
                            activeTxn.value = null;
                            checkoutStatus.value = null;
                        }}
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
                        onClick$={() => {
                            billingCycle.value = "annual";
                            activeTxn.value = null;
                            checkoutStatus.value = null;
                        }}
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
                            <h2 class="text-lg font-bold text-white">Morphex Starter</h2>
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
                            Download Free App
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
                            <h2 class="text-lg font-bold text-white">MORPHEX Pro</h2>
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
                                <span>Cards, UPI, GPay, Apple Pay &amp; PayPal accepted</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>14-day money-back guarantee</span>
                            </li>
                        </ul>
                    </div>

                    <div class="pt-8">
                        <button
                            type="button"
                            onClick$={() => openCheckout()}
                            class="block w-full py-2.5 px-4 text-center rounded-[4px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors shadow-md cursor-pointer"
                        >
                            {billingCycle.value === "annual" ? "Pay Yearly ($39.99/yr) with Paddle" : "Pay Monthly ($4.99/mo) with Paddle"}
                        </button>
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
    title: "Pricing — MORPHEX Pro | ZenthraLabs",
    meta: [
        { name: "description", content: "MORPHEX Pro pricing plans: Monthly and Annual subscriptions for Morphex on-device motion graphics and video editing." },
    ],
};
