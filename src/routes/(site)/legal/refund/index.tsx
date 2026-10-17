import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-theme pb-8">
                <span class="inline-block px-3 py-1 bg-theme-elevated text-theme-accent border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Customer Protection
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-theme-primary leading-tight">
                    Refund &amp; Cancellation Policy
                </h1>
                <p class="text-xs text-theme-muted mt-2 font-['JetBrains_Mono',monospace]">Last updated: October 17, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-theme-secondary leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">1. Satisfaction Guarantee &amp; 14-Day Refund Window</h2>
                    <p>
                        At ZenthraLabs, we stand behind the performance of our software. If you are not satisfied with your subscription to <strong>Morphex (MORPHEX Pro)</strong>, you may request a full refund within <strong>14 days</strong> of your initial purchase or renewal.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">2. Merchant of Record</h2>
                    <p>
                        Our order processing and digital billing are handled by our Merchant of Record, <strong>Paddle</strong> (Paddle.com Market Ltd). Paddle provides secure payment handling, VAT/tax compliance, and automated refund management.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">3. How to Request a Refund</h2>
                    <p class="mb-3">
                        You can request a refund quickly using either of the following methods:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Paddle Order Confirmation:</strong> Open your email receipt from Paddle and click <em>"View Order"</em> or <em>"Manage Subscription"</em> to request a refund or cancel renewals directly.
                        </li>
                        <li>
                            <strong>Direct Support:</strong> Email us directly at <a href="mailto:support@zenthralabs.dev" class="text-theme-accent underline">support@zenthralabs.dev</a> with your account email address and order transaction ID. We process eligible refund requests within 2 business days.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">4. Subscription Cancellations</h2>
                    <p>
                        You can cancel your recurring subscription at any time prior to the next billing cycle. Once cancelled, your MORPHEX Pro features remain active until the end of your current paid billing period, and no further automatic renewals will take place.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">5. Chargebacks &amp; Inquiries</h2>
                    <p>
                        If you encounter any unexpected billing charges, please reach out to <a href="mailto:support@zenthralabs.dev" class="text-theme-accent underline">support@zenthralabs.dev</a> first. We are committed to swiftly resolving billing discrepancies and ensuring fair customer resolutions.
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Refund Policy — MORPHEX | ZenthraLabs",
    meta: [
        { name: "description", content: "Refund and cancellation policy for ZenthraLabs and Morphex (MORPHEX Pro) subscriptions." },
    ],
};
