import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-[#c6c5d3] pb-8">
                <span class="inline-block px-3 py-1 bg-[#e9e7ef] text-[#4352a5] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Open Source
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-[#1b1b21] leading-tight">
                    Licenses
                </h1>
                <p class="text-xs text-[#767683] mt-2 font-['JetBrains_Mono',monospace]">Last updated: June 19, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-[#454651] leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">Core Framework Licenses</h2>
                    <p class="mb-4">
                        All individual crates published under the Zenthra framework (including <code class="bg-[#e9e7ef] text-[#4352a5] px-1 rounded font-['JetBrains_Mono',monospace]">zenthra-widgets</code>, <code class="bg-[#e9e7ef] text-[#4352a5] px-1 rounded font-['JetBrains_Mono',monospace]">zenthra-render</code>, and <code class="bg-[#e9e7ef] text-[#4352a5] px-1 rounded font-['JetBrains_Mono',monospace]">zenthra-layout</code>) are dual-licensed under:
                    </p>
                    <ul class="list-disc pl-5 space-y-2 mb-6">
                        <li>
                            <strong>MIT License:</strong> A permissive license that permits free commercial use, modification, distribution, and private use, subject to including the copyright notice.
                        </li>
                        <li>
                            <strong>Apache License 2.0:</strong> Grants rights for patent use, commercial use, modification, distribution, and sublicensing while requiring modification statements and copyright notices.
                        </li>
                    </ul>
                    <p>
                        This dual-licensing scheme aligns with the Rust programming language ecosystem standards, giving developers the choice of license that fits their project guidelines.
                    </p>
                </div>

                <div class="border-t border-[#c6c5d3] pt-8">
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">Applications &amp; Demonstrations</h2>
                    <p class="mb-3">
                        Zenthra View and other community examples are licensed under the MIT License. You are free to inspect their architectures and reuse code snippets in your personal or commercial applications.
                    </p>
                </div>

                <div class="border-t border-[#c6c5d3] pt-8">
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-3">Third-Party Packages</h2>
                    <p class="mb-4">
                        Zenthra builds on several amazing crates from the Rust community. We recognize and thank the authors of:
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="border border-[#c6c5d3] p-4 rounded-[4px] bg-white">
                            <strong class="text-[#1b1b21] block font-['JetBrains_Mono',monospace] text-xs">taffy</strong>
                            <span class="text-xs text-[#767683]">MIT License</span>
                        </div>
                        <div class="border border-[#c6c5d3] p-4 rounded-[4px] bg-white">
                            <strong class="text-[#1b1b21] block font-['JetBrains_Mono',monospace] text-xs">cosmic-text</strong>
                            <span class="text-xs text-[#767683]">MIT &amp; Apache 2.0</span>
                        </div>
                        <div class="border border-[#c6c5d3] p-4 rounded-[4px] bg-white">
                            <strong class="text-[#1b1b21] block font-['JetBrains_Mono',monospace] text-xs">wgpu</strong>
                            <span class="text-xs text-[#767683]">MIT &amp; Apache 2.0</span>
                        </div>
                        <div class="border border-[#c6c5d3] p-4 rounded-[4px] bg-white">
                            <strong class="text-[#1b1b21] block font-['JetBrains_Mono',monospace] text-xs">glutin</strong>
                            <span class="text-xs text-[#767683]">Apache License 2.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Open Source Licenses — Zenthra Labs",
    meta: [
        { name: "description", content: "Open source licensing terms for Zenthra crates and community applications." },
    ],
};
