import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-theme pb-8">
                <div class="flex items-center gap-2 mb-4">
                    <span class="inline-block px-3 py-1 bg-theme-elevated text-pink-500 border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                        Kōji Dating
                    </span>
                    <span class="inline-block px-3 py-1 bg-theme-elevated text-theme-accent border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                        Privacy Policy &amp; Data Safety
                    </span>
                </div>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-theme-primary leading-tight">
                    Privacy Policy &amp; User Data Safety
                </h1>
                <p class="text-xs text-theme-muted mt-2 font-['JetBrains_Mono',monospace]">
                    Effective Date: October 2026 · App: Kōji Ephemeral Dating
                </p>
            </div>

            <div class="space-y-8 text-sm text-theme-secondary leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">1. Executive Summary &amp; Ephemeral Architecture</h2>
                    <p class="mb-3">
                        Zenthra Labs is committed to extreme privacy, zero data monetization, and intentional human connection. <strong>Kōji</strong> is designed from the ground up as an ephemeral dating application:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>24-Hour Ephemeral Timer:</strong> Mutual interest unlock creates a private 24-hour conversational window. When the timer expires, the match, chats, and shared interactions permanently auto-delete.
                        </li>
                        <li>
                            <strong>Zero-Knowledge View-Once Media:</strong> Media messages exchanged within active conversations vaporize instantly after being viewed.
                        </li>
                        <li>
                            <strong>No Tracking or Ad SDKs:</strong> We do not sell your personal data, profile pictures, location coordinates, or chat transcripts to third-party data brokers or advertisement networks.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">2. Data We Collect &amp; Purpose of Processing</h2>
                    <p class="mb-3">
                        We only collect the minimum information required to operate matching and user safety:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Profile Data:</strong> Display name, age, city name, sexual orientation, gender identity, passions/vibe tags, and icebreaker prompt responses provided during onboarding.
                        </li>
                        <li>
                            <strong>Profile &amp; Gallery Photos:</strong> Images uploaded by you to represent your personal profile in the nearby discovery feed.
                        </li>
                        <li>
                            <strong>Approximate &amp; Precise Geolocation:</strong> Used solely while the application is actively running to compute geodesic distance (via backend Haversine calculations) between you and potential nearby community members. Coordinates are never published raw to other users or tracked in the background.
                        </li>
                        <li>
                            <strong>Safety &amp; Moderation Records:</strong> If you block or report another user, an encrypted moderation record is retained to shield you from contact and enforce Google Play User-Generated Content (UGC) safety policies.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">3. Age Restriction (Strict 18+ Only)</h2>
                    <p class="mb-3">
                        Kōji is strictly restricted to individuals aged <strong>18 years and older</strong>. We do not knowingly collect personal data from minors. During onboarding, users must explicitly confirm their legal age and accept these terms. Accounts found to belong to individuals under 18 years of age are immediately terminated and their data permanently expunged.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">4. Security &amp; End-to-End Key Architecture</h2>
                    <p class="mb-3">
                        All communications between the Kōji mobile application and Zenthra Labs backend servers are transmitted via enforced TLS/HTTPS. Private cryptographic keys generated during onboarding never leave the client's secure hardware Keystore.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">5. Account &amp; Data Deletion (GDPR &amp; Google Play Compliance)</h2>
                    <p class="mb-3">
                        Users have the complete, unconditional right to delete their account and wipe all associated personal data at any time without fees or waiting queues:
                    </p>
                    <h3 class="font-semibold text-theme-primary mt-3 mb-1">Method 1: Instant In-App Erasure (Recommended)</h3>
                    <ol class="list-decimal pl-5 space-y-1 mb-3">
                        <li>Open the <strong>Kōji</strong> app and navigate to your Profile tab.</li>
                        <li>Tap the <strong>Settings</strong> button located on the top right.</li>
                        <li>Tap <strong>"Delete Account"</strong> at the bottom of the Settings menu.</li>
                        <li>Confirm the prompt. Your user account, uploaded images, matches, and chats are instantly and irreversibly deleted from our database.</li>
                    </ol>

                    <h3 class="font-semibold text-theme-primary mt-3 mb-1">Method 2: Web / Email Deletion Request</h3>
                    <p class="mb-2">
                        If you have already uninstalled the application or lost your device, you may submit an email request:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li><strong>Recipient:</strong> <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthralabs@gmail.com</code></li>
                        <li><strong>Subject:</strong> Account &amp; Data Deletion Request - Kōji Dating App</li>
                        <li><strong>Processing:</strong> Verified deletion requests are permanently purged across all servers within 30 days.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">6. Contact &amp; Legal Disclosures</h2>
                    <p>
                        For questions, security reports, or legal inquiries, please contact our Data Protection Officer at:
                    </p>
                    <p class="mt-2 font-['JetBrains_Mono',monospace] text-xs text-theme-primary">
                        Zenthra Labs · Email: zenthralabs@gmail.com
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Kōji Dating — Privacy Policy & Data Safety | Zenthra Labs",
    meta: [
        {
            name: "description",
            content: "Official Privacy Policy and Data Safety disclosures for Kōji Ephemeral Dating App by Zenthra Labs.",
        },
        {
            property: "og:title",
            content: "Kōji Dating — Privacy Policy & Data Safety",
        },
    ],
};
