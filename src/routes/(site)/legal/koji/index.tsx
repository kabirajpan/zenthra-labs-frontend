import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-theme pb-8">
                <span class="inline-block px-3 py-1 bg-theme-elevated text-pink-500 border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Kōji · Zenthra Labs
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold text-theme-primary leading-tight">
                    Kōji Legal &amp; Safety Portal
                </h1>
                <p class="text-sm text-theme-muted mt-3 max-w-xl">
                    Transparency, user privacy, and zero data monetization. Everything you need to know about your data rights and community safety on Kōji.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Privacy Card */}
                <a
                    href="/legal/koji/privacy"
                    class="block p-6 rounded-[8px] bg-theme-card border border-theme hover:border-pink-500/50 transition-all group"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl">🔒</span>
                        <span class="text-xs font-['JetBrains_Mono',monospace] text-theme-muted group-hover:text-pink-500 transition-colors">
                            READ POLICY →
                        </span>
                    </div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-2">
                        Privacy Policy &amp; Data Safety
                    </h2>
                    <p class="text-xs text-theme-secondary leading-relaxed">
                        Learn how our 24-hour ephemeral timer, zero-knowledge view-once media, and private geolocation calculations protect your identity without ad-tracking SDKs.
                    </p>
                </a>

                {/* Terms Card */}
                <a
                    href="/legal/koji/terms"
                    class="block p-6 rounded-[8px] bg-theme-card border border-theme hover:border-pink-500/50 transition-all group"
                >
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl">📜</span>
                        <span class="text-xs font-['JetBrains_Mono',monospace] text-theme-muted group-hover:text-pink-500 transition-colors">
                            READ TERMS →
                        </span>
                    </div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-2">
                        Terms of Service (18+ Requirement)
                    </h2>
                    <p class="text-xs text-theme-secondary leading-relaxed">
                        Our binding user terms, mandatory 18+ age verification, zero-tolerance rules for harassment or explicit material, and account enforcement.
                    </p>
                </a>
            </div>

            {/* Quick Summary Highlights */}
            <div class="space-y-6 border-t border-theme pt-8 text-sm text-theme-secondary">
                <h3 class="font-['Syne',sans-serif] text-2xl font-bold text-theme-primary">
                    Core Safety Guarantees
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div class="p-4 rounded-[6px] bg-theme-elevated/40 border border-theme-subtle">
                        <h4 class="font-bold text-theme-primary mb-1 text-sm">⚡ 24-Hour Ephemeral Timer</h4>
                        <p class="text-xs text-theme-muted">
                            All mutual wave connections and chats self-destruct after 24 hours. No eternal ghosting, no lingering logs.
                        </p>
                    </div>

                    <div class="p-4 rounded-[6px] bg-theme-elevated/40 border border-theme-subtle">
                        <h4 class="font-bold text-theme-primary mb-1 text-sm">🛡️ In-App Block &amp; Report</h4>
                        <p class="text-xs text-theme-muted">
                            One-tap block and automated reporting directly on user cards and in active chat windows.
                        </p>
                    </div>

                    <div class="p-4 rounded-[6px] bg-theme-elevated/40 border border-theme-subtle">
                        <h4 class="font-bold text-theme-primary mb-1 text-sm">🗑️ One-Tap Account Erase</h4>
                        <p class="text-xs text-theme-muted">
                            Permanently wipe your profile, photos, and messages instantly from Settings. No waiting periods.
                        </p>
                    </div>
                </div>

                <div class="pt-6">
                    <h4 class="font-bold text-theme-primary mb-2">Need direct assistance or data deletion support?</h4>
                    <p class="text-xs text-theme-muted">
                        Email the Zenthra Labs safety team directly at <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthralabs@gmail.com</code>.
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Kōji Legal & Safety Portal — Zenthra Labs",
    meta: [
        {
            name: "description",
            content: "Official legal and safety portal for Kōji Ephemeral Dating App by Zenthra Labs.",
        },
    ],
};
