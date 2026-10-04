import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-theme pb-8">
                <span class="inline-block px-3 py-1 bg-theme-elevated text-theme-accent border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Legal Policy
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-theme-primary leading-tight">
                    Privacy Policy &amp; Data Safety
                </h1>
                <p class="text-xs text-theme-muted mt-2 font-['JetBrains_Mono',monospace]">Last updated: October 4, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-theme-secondary leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">1. Overview &amp; Local-First Architecture</h2>
                    <p class="mb-3">
                        Zenthra Labs is committed to protecting your privacy and upholding a transparent, local-first development model. Our applications—including <strong>After Motion: Video Editor</strong>, the Zenthra UI framework, and companion tools—perform video rendering, keyframing, and motion graphics processing locally on your hardware.
                    </p>
                    <p>
                        Your creative assets, local video clips, project compositions, and exported media files remain on your device and are never transmitted to third parties without your explicit direction.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">2. Information We Collect in After Motion</h2>
                    <p class="mb-3">
                        When using <strong>After Motion: Video Editor</strong>, we collect minimal data required to provide account synchronization, billing, and ad-supported features:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Account Information (Optional):</strong> If you choose to sign in via Google or register an account, we securely store your email address, display name, and unique user identifier to enable cloud project backup and profile synchronization.
                        </li>
                        <li>
                            <strong>Device &amp; Other Identifiers:</strong> For free-tier users, third-party advertising partners (such as Start.io) and Google Play Services may collect standard device identifiers (such as the Android Advertising ID - AAID) and anonymous diagnostic metrics for ad delivery, fraud prevention, and performance analytics. Pro members experience zero third-party ads.
                        </li>
                        <li>
                            <strong>In-App Purchases &amp; Subscriptions:</strong> Subscription transactions are processed directly and securely by Google Play Billing. We never receive or store your credit card or financial details.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">3. How Information Is Handled &amp; Protected</h2>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>All network communication between After Motion and our backend services is encrypted in transit using industry-standard SSL/TLS protocols.</li>
                        <li>We do not sell, rent, or trade your personal information to data brokers.</li>
                        <li>Analytics and crash logs are anonymized and used solely to diagnose rendering engine performance and improve app stability.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">4. Account &amp; User Data Deletion Policy</h2>
                    <p class="mb-3">
                        Users have the complete right to request the deletion of their account and all associated personal data at any time.
                    </p>
                    <h3 class="font-semibold text-theme-primary mt-3 mb-1">Option A: Direct In-App Deletion</h3>
                    <ol class="list-decimal pl-5 space-y-1 mb-3">
                        <li>Open the <strong>After Motion</strong> app on your device.</li>
                        <li>Tap your profile avatar or the left sidebar menu.</li>
                        <li>Navigate to your profile details and tap <strong>"Delete Account &amp; User ID"</strong>.</li>
                        <li>Confirm the prompt. Your user account, authentication tokens, and synced data will be wiped immediately.</li>
                    </ol>
                    <h3 class="font-semibold text-theme-primary mt-3 mb-1">Option B: Web / Email Deletion Request</h3>
                    <p class="mb-2">
                        If you have uninstalled the app or cannot access your account, you can request full account and data deletion by sending an email:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li><strong>Recipient:</strong> <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthralabs@gmail.com</code></li>
                        <li><strong>Subject:</strong> Account &amp; Data Deletion Request - After Motion</li>
                        <li><strong>Details to Include:</strong> Your registered email address associated with your After Motion account.</li>
                        <li><strong>Processing Time:</strong> Requests are verified and permanently purged from our active databases within 30 days.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">5. Data Retention &amp; Types of Data Kept</h2>
                    <p class="mb-2">
                        Upon confirmed account deletion, the following data is permanently purged:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Your account credentials (email, name, hashed passwords, OAuth session tokens).</li>
                        <li>Cloud-synchronized project metadata and remote thumbnails.</li>
                    </ul>
                    <p class="mt-2 text-xs text-theme-muted">
                        * Note: Financial transaction records for active subscriptions are maintained by Google Play in accordance with Google Play Terms of Service and applicable tax laws.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">6. Contact Us</h2>
                    <p>
                        For any inquiries regarding this Privacy Policy, data safety, or security disclosures, please reach out to us at <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthralabs@gmail.com</code>.
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Privacy Policy & Data Safety — ZenthraLabs",
    meta: [
        { name: "description", content: "Privacy Policy, Data Safety, and Account Deletion procedures for After Motion and ZenthraLabs products." },
    ],
};
