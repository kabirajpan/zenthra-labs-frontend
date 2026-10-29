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
                        Terms &amp; Conditions
                    </span>
                </div>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-theme-primary leading-tight">
                    Terms &amp; Conditions of Service
                </h1>
                <p class="text-xs text-theme-muted mt-2 font-['JetBrains_Mono',monospace]">
                    Effective Date: October 2026 · App: Kōji Ephemeral Dating
                </p>
            </div>

            <div class="space-y-8 text-sm text-theme-secondary leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">1. Agreement to Terms</h2>
                    <p class="mb-3">
                        These Terms and Conditions constitute a legally binding agreement made between you and <strong>Zenthra Labs</strong> concerning your access to and use of the <strong>Kōji</strong> mobile application, website, and related services.
                    </p>
                    <p>
                        By installing, registering, or accessing Kōji, you confirm that you have read, understood, and agreed to be bound by all of these terms and conditions.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">2. Eligibility &amp; Mandatory Age Requirement (18+)</h2>
                    <p class="mb-3">
                        <strong>You must be at least 18 years of age</strong> to create an account on Kōji or use any related service. By registering an account, you represent and warrant that:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>You are at least 18 years old.</li>
                        <li>You have not been convicted of a violent or sexual crime.</li>
                        <li>You have never been previously removed or banned from Kōji for policy violations.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">3. User Conduct &amp; Zero-Tolerance Safety Rules</h2>
                    <p class="mb-3">
                        Kōji enforces strict Google Play User-Generated Content (UGC) safety standards. You agree that you will NOT:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Upload Inappropriate or Explicit Content:</strong> Nudity, pornography, sexually explicit content, or depictions of violence are strictly prohibited.
                        </li>
                        <li>
                            <strong>Harass or Bully:</strong> Harassment, hate speech, threats, stalking, defamation, or unsolicited explicit messages are met with immediate, permanent account bans.
                        </li>
                        <li>
                            <strong>Impersonate Others:</strong> You must upload authentic, recent photographs of yourself. Misrepresenting your identity, age, or using bots is forbidden.
                        </li>
                        <li>
                            <strong>Commercial Solicitation &amp; Scams:</strong> Commercial advertising, soliciting funds, promotional links, or financial scams are strictly banned.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">4. Moderation, In-App Reporting &amp; Immediate Blocking</h2>
                    <p class="mb-3">
                        Kōji provides real-time protection mechanisms built into every profile card and chat thread:
                    </p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Instant Block:</strong> Tapping "Block User" instantly severs all contact, removes the user from your discovery feed, and prevents them from seeing your profile.
                        </li>
                        <li>
                            <strong>In-App Report:</strong> Tapping "Report User" routes the complaint to our automated moderation queue and safety team for rapid review and permanent account sanctions.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">5. Child Sexual Abuse and Exploitation (CSAE) Prevention Policy</h2>
                    <p class="mb-3">
                        Zenthra Labs enforces an absolute, zero-tolerance standard against Child Sexual Abuse Material (CSAM) and Child Sexual Exploitation and Abuse (CSAE). We strictly prohibit any depiction, distribution, facilitation, or solicitation of content that exploits or endangers minors. 
                    </p>
                    <p class="mb-3">
                        Any identified instance of CSAE results in immediate permanent account termination, device hardware identification bans, and immediate mandatory referral to law enforcement authorities, including the National Center for Missing &amp; Exploited Children (NCMEC) under 18 U.S.C. § 2258A and relevant regional authorities.
                    </p>
                    <p class="text-xs text-theme-muted">
                        Users can report any child safety concerns directly through the in-app reporting button or by contacting our dedicated child safety contact at <code class="text-pink-500 font-mono">zenthralabs@gmail.com</code>.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">6. Ephemeral 24-Hour Timer &amp; View-Once Data</h2>
                    <p class="mb-3">
                        All mutual matches and chat threads are governed by a 24-hour self-destruct mechanism. Conversations and media files automatically expire and are purged when the 24-hour timer elapses. Zenthra Labs is not liable for data naturally erased pursuant to the ephemeral architecture of the application.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">7. Account Termination</h2>
                    <p class="mb-3">
                        You may terminate your account at any time via the in-app "Delete Account" button in Settings. Zenthra Labs reserves the right to suspend or terminate any account, without prior notice, that violates these terms or threatens community safety.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">8. Disclaimers &amp; Limitation of Liability</h2>
                    <p>
                        Kōji is provided on an "as-is" and "as-available" basis. While we provide safety and cryptographic features, you are solely responsible for your interactions and decisions to meet or communicate with individuals both on and offline.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">9. Contact Information</h2>
                    <p>
                        For inquiries concerning these Terms &amp; Conditions, please contact:
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
    title: "Kōji Dating — Terms & Conditions | Zenthra Labs",
    meta: [
        {
            name: "description",
            content: "Official Terms and Conditions of service for Kōji Ephemeral Dating App by Zenthra Labs.",
        },
        {
            property: "og:title",
            content: "Kōji Dating — Terms & Conditions",
        },
    ],
};
