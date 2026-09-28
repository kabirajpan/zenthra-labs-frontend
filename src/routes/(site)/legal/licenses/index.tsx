import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div class="mb-12 border-b border-theme pb-8">
                <span class="inline-block px-3 py-1 bg-theme-elevated text-theme-accent border border-theme-subtle font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px] mb-4">
                    Open Source
                </span>
                <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-theme-primary leading-tight">
                    Licenses
                </h1>
                <p class="text-xs text-theme-muted mt-2 font-['JetBrains_Mono',monospace]">Last updated: June 19, 2026</p>
            </div>

            <div class="space-y-8 text-sm text-theme-secondary leading-relaxed">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">Core Framework Licenses</h2>
                    <p class="mb-4">
                        All individual crates published under the Zenthra framework (including <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthra-widgets</code>, <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthra-render</code>, and <code class="bg-theme-elevated text-theme-accent border border-theme-subtle px-1.5 py-0.5 rounded font-['JetBrains_Mono',monospace]">zenthra-layout</code>) are dual-licensed under:
                    </p>
                    <ul class="list-disc pl-5 space-y-2 mb-6">
                        <li>
                            <strong class="text-theme-primary">MIT License:</strong> A permissive license that permits free commercial use, modification, distribution, and private use, subject to including the copyright notice.
                        </li>
                        <li>
                            <strong class="text-theme-primary">Apache License 2.0:</strong> Grants rights for patent use, commercial use, modification, distribution, and sublicensing while requiring modification statements and copyright notices.
                        </li>
                    </ul>
                    <p>
                        This dual-licensing scheme aligns with the Rust programming language ecosystem standards, giving developers the choice of license that fits their project guidelines.
                    </p>
                </div>

                <div class="border-t border-theme pt-8">
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">Applications &amp; Demonstrations</h2>
                    <p class="mb-3">
                        Zenthra View and other community examples are licensed under the MIT License. You are free to inspect their architectures and reuse code snippets in your personal or commercial applications.
                    </p>
                </div>

                <div class="border-t border-theme pt-8">
                    <h2 class="font-['Syne',sans-serif] text-xl font-bold text-theme-primary mb-3">Third-Party Packages</h2>
                    <p class="mb-4">
                        Zenthra builds on several amazing crates from the Rust community. We recognize and thank the authors of:
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="border border-theme p-4 rounded-[6px] bg-theme-card">
                            <strong class="text-theme-primary block font-['JetBrains_Mono',monospace] text-xs">taffy</strong>
                            <span class="text-xs text-theme-muted">MIT License</span>
                        </div>
                        <div class="border border-theme p-4 rounded-[6px] bg-theme-card">
                            <strong class="text-theme-primary block font-['JetBrains_Mono',monospace] text-xs">cosmic-text</strong>
                            <span class="text-xs text-theme-muted">MIT &amp; Apache 2.0</span>
                        </div>
                        <div class="border border-theme p-4 rounded-[6px] bg-theme-card">
                            <strong class="text-theme-primary block font-['JetBrains_Mono',monospace] text-xs">wgpu</strong>
                            <span class="text-xs text-theme-muted">MIT &amp; Apache 2.0</span>
                        </div>
                        <div class="border border-theme p-4 rounded-[6px] bg-theme-card">
                            <strong class="text-theme-primary block font-['JetBrains_Mono',monospace] text-xs">glutin</strong>
                            <span class="text-xs text-theme-muted">Apache License 2.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Open Source Licenses — ZenthraLabs",
    meta: [
        { name: "description", content: "Open source licensing terms for Zenthra crates and community applications." },
    ],
};
