import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-[#c6c5d3] pb-8">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Legal Policy
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-[#1b1b21] leading-tight">
                    Privacy Policy
                </h1>
                <p class="text-xs text-[#767683] mt-2 font-['JetBrains_Mono',monospace]">Last updated: June 19, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-[#454651] leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">1. Information We Collect</h2>
                    <p class="mb-3">
                        Zenthra Labs is committed to a local-first development model. Because our frameworks and apps (such as the Zenthra framework and Zenthra View) run entirely on your local hardware, they do not collect, store, or transmit your personal data, layout configurations, or codebase structures.
                    </p>
                    <p>
                        We only receive minimal data when you interact with our public web portals, download releases, or submit issue logs directly to our community channels.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">2. How We Use Information</h2>
                    <p class="mb-3">
                        Any information received via our public website is strictly used to:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Maintain and optimize site performance and loading speeds.</li>
                        <li>Deliver requested product builds or documentation details.</li>
                        <li>Debug issues you choose to report in our open-source repositories.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">3. Cookies and Analytics</h2>
                    <p>
                        We do not run tracking cookies, third-party analytics pixels, or telemetry integrations on this website. We believe in absolute privacy and zero user tracking.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">4. Security</h2>
                    <p>
                        Our platform is secured using SSL/TLS encryption. Because we do not store databases containing personal identification, passwords, or transaction histories, there is zero risk of user profile leakage.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">5. Contact Us</h2>
                    <p>
                        If you have questions about our privacy tenets or want to discuss local-first data isolation, contact us at <code class="bg-[#e9e7ef] text-[#4352a5] px-1 rounded font-['JetBrains_Mono',monospace]">security@zenthralabs.com</code>.
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Privacy Policy — Zenthra Labs",
    meta: [
        { name: "description", content: "Privacy Policy and user data protection details from Zenthra Labs." },
    ],
};
