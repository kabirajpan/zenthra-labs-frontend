import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-[#c6c5d3] pb-8">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Legal Agreement
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-[#1b1b21] leading-tight">
                    Terms of Service
                </h1>
                <p class="text-xs text-[#767683] mt-2 font-['JetBrains_Mono',monospace]">Last updated: June 19, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-[#454651] leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">1. Acceptance of Terms</h2>
                    <p>
                        By visiting the Zenthra Labs website or downloading our open-source packages, libraries, and native applications, you agree to comply with and be bound by these Terms of Service, along with our active licensing definitions.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">2. Software Usage &amp; Licenses</h2>
                    <p class="mb-3">
                        Our framework packages (crates) and application codebases are published under their respective open-source licensing terms:
                    </p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>The core Zenthra UI framework crates are licensed under MIT and Apache 2.0.</li>
                        <li>Built applications, example assets, and tutorials have specific terms detailed in their source trees.</li>
                    </ul>
                    <p class="mt-3">
                        You are free to compile, modify, build, and redistribute the software in compliance with those agreements.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">3. Disclaimer of Warranty</h2>
                    <p>
                        The website content and all open-source packages are provided "as is", without warranty of any kind, express or implied. Under no circumstances shall Zenthra Labs or its developers be liable for any claims, damages, or liabilities arising out of your deployment of the code.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">4. Site Access</h2>
                    <p>
                        We reserve the right to modify, adjust, or suspend access to our websites, documentation pools, or package distributions at any time without prior notice.
                    </p>
                </div>

                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">5. Governing Law</h2>
                    <p>
                        These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these conditions shall be resolved within local courts located in West Bengal, India.
                    </p>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Terms of Service — Zenthra Labs",
    meta: [
        { name: "description", content: "Terms of Service for using websites, documentation, and tools by Zenthra Labs." },
    ],
};
