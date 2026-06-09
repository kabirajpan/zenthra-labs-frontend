import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HeroSquares } from "../components/background/hero-squares";

export default component$(() => {
    return (
        <>

            {/* Hero Section */}
            <section class="relative overflow-hidden max-w-7xl mx-auto px-12 py-16 grid md:grid-cols-12 gap-10 items-center">
                <HeroSquares />
                <div class="relative z-10 md:col-span-7">
                    <span class="inline-block px-3 py-1 bg-[#e3e1e9] text-[#454651] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider mb-6 rounded-[4px]">
                        Developer Tools • Open Source • Apps • Games
                    </span>
                    <h1 class="font-['Syne',sans-serif] text-5xl font-bold text-[#1b1b21] mb-6 max-w-2xl leading-tight tracking-tight">
                        Building modern software products.
                    </h1>
                    <p class="text-lg text-[#454651] mb-10 max-w-xl leading-relaxed">
                        We design and build software products, from developer tools to consumer apps, focused on craftsmanship, performance, and long term reliability.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="/products" class="py-1.5 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] hover:brightness-110 transition-all text-sm flex items-center">
                            Explore Products
                        </a>
                        <a href="https://github.com" class="py-1.5 px-4 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#e3e1e9] transition-all text-sm flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                            GitHub
                        </a>
                    </div>
                </div>
                <div class="relative z-10 md:col-span-5">
                    <div class="bg-[#f5f2fa] rounded-[4px] overflow-hidden border border-[#c6c5d3] aspect-[4/3] flex items-center justify-center p-4">
                        <svg viewBox="0 0 400 300" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="200" cy="150" r="80" fill="none" stroke="#5c6bc0" stroke-width="1.5" stroke-dasharray="4 4" />
                            <circle cx="200" cy="150" r="50" fill="none" stroke="#5c6bc0" stroke-width="1" opacity="0.5" />
                            <circle cx="200" cy="150" r="20" fill="#5c6bc0" opacity="0.2" />
                            <circle cx="200" cy="150" r="8" fill="#5c6bc0" />
                            <circle cx="280" cy="90" r="6" fill="#5c6bc0" opacity="0.7" />
                            <circle cx="130" cy="80" r="5" fill="#5c6bc0" opacity="0.6" />
                            <circle cx="300" cy="200" r="5" fill="#5c6bc0" opacity="0.5" />
                            <circle cx="120" cy="210" r="4" fill="#5c6bc0" opacity="0.4" />
                            <line x1="200" y1="150" x2="280" y2="90" stroke="#5c6bc0" stroke-width="1" opacity="0.4" />
                            <line x1="200" y1="150" x2="130" y2="80" stroke="#5c6bc0" stroke-width="1" opacity="0.4" />
                            <line x1="200" y1="150" x2="300" y2="200" stroke="#5c6bc0" stroke-width="1" opacity="0.4" />
                            <line x1="200" y1="150" x2="120" y2="210" stroke="#5c6bc0" stroke-width="1" opacity="0.4" />
                            <rect x="60" y="60" width="280" height="180" rx="4" fill="none" stroke="#c6c5d3" stroke-width="1" stroke-dasharray="6 3" opacity="0.4" />
                            <rect x="80" y="80" width="240" height="140" rx="4" fill="none" stroke="#c6c5d3" stroke-width="1" opacity="0.2" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section class="bg-[#f5f2fa] py-16 border-y border-[#c6c5d3]">
                <div class="max-w-7xl mx-auto px-12">
                    <div class="mb-12">
                        <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21]">What We Build</h2>
                        <p class="text-[#454651] text-sm mt-2">A portfolio of high-performance utilities and platforms.</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-6">

                        {/* Zenthra */}
                        <div class="bg-white border border-[#c6c5d3] p-6 hover:border-[#4352a5] transition-all flex flex-col h-full rounded-[4px] group hover:-translate-y-1 duration-200">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#4352a5]">Zenthra</span>
                                <span class="px-2 py-1 bg-[#e9e7ef] text-[#454651] text-xs rounded-[4px] font-medium">v1.2 Stable</span>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">UI Framework</p>
                            <p class="text-[#1b1b21] text-sm flex-grow leading-relaxed">A high-performance primitive library for building complex user interfaces with zero-runtime overhead.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <a class="text-[#4352a5] font-bold flex items-center gap-1 text-sm hover:gap-2 transition-all" href="/products/zenthra">
                                View Documentation →
                            </a>
                        </div>

                        {/* Zenthree */}
                        <div class="bg-white border border-[#c6c5d3] p-6 hover:border-[#4352a5] transition-all flex flex-col h-full rounded-[4px] group hover:-translate-y-1 duration-200">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#4352a5]">Zenthree</span>
                                <span class="px-2 py-1 bg-[#dee0ff] text-[#2f3f92] text-xs rounded-[4px] font-medium">Beta</span>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">Code Editor</p>
                            <p class="text-[#1b1b21] text-sm flex-grow leading-relaxed">A native-speed code editor designed for mechanical sympathy and extreme low latency input.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <a class="text-[#4352a5] font-bold flex items-center gap-1 text-sm hover:gap-2 transition-all" href="/products/zenthree">
                                Join the Waitlist →
                            </a>
                        </div>

                        {/* Zentype */}
                        <div class="bg-white border border-[#c6c5d3] p-6 hover:border-[#4352a5] transition-all flex flex-col h-full rounded-[4px] group hover:-translate-y-1 duration-200">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#4352a5]">Zentype</span>
                                <span class="px-2 py-1 bg-[#ffdeac] text-[#5f4100] text-xs rounded-[4px] font-medium">Early Access</span>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">GPU Text Engine</p>
                            <p class="text-[#1b1b21] text-sm flex-grow leading-relaxed">Ultra-crisp subpixel text rendering engine powered by custom shaders for demanding visual apps.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <a class="text-[#4352a5] font-bold flex items-center gap-1 text-sm hover:gap-2 transition-all" href="/products/zentype">
                                Try the Demo →
                            </a>
                        </div>

                        {/* Zenith */}
                        <div class="bg-white border border-[#c6c5d3] p-6 hover:border-[#4352a5] transition-all flex flex-col h-full rounded-[4px] group hover:-translate-y-1 duration-200">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#4352a5]">Zenith</span>
                                <span class="px-2 py-1 bg-[#e9e7ef] text-[#454651] text-xs rounded-[4px] font-medium">Stable</span>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">Productivity Platform</p>
                            <p class="text-[#1b1b21] text-sm flex-grow leading-relaxed">Spatial computing workflow for engineers that merges terminal, task manager, and calendar.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <a class="text-[#4352a5] font-bold flex items-center gap-1 text-sm hover:gap-2 transition-all" href="/products/zenith">
                                Get Started →
                            </a>
                        </div>

                        {/* Editor App */}
                        <div class="bg-white border border-[#c6c5d3] p-6 hover:border-[#4352a5] transition-all flex flex-col h-full rounded-[4px] group hover:-translate-y-1 duration-200">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#4352a5]">Editor App</span>
                                <span class="px-2 py-1 bg-[#a1efff] text-[#004e59] text-xs rounded-[4px] font-medium">Alpha</span>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">Photo/Video</p>
                            <p class="text-[#1b1b21] text-sm flex-grow leading-relaxed">Non-destructive creative suite leveraging machine learning for real-time asset generation.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <a class="text-[#4352a5] font-bold flex items-center gap-1 text-sm hover:gap-2 transition-all" href="/products/editor">
                                Internal Preview →
                            </a>
                        </div>

                        {/* Future Labs */}
                        <div class="bg-[#fbf8ff] border border-dashed border-[#c6c5d3] p-6 flex flex-col h-full rounded-[4px] opacity-80">
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-['Syne',sans-serif] text-lg font-bold text-[#767683]">Future Labs</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#767683" stroke-width="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" /></svg>
                            </div>
                            <p class="text-[#454651] text-xs mb-1 font-bold uppercase tracking-tight">R&D</p>
                            <p class="text-[#454651] text-sm flex-grow leading-relaxed">Exploring next-generation interface metaphors and hardware-software integration.</p>
                            <hr class="my-6 border-[#c6c5d3]" />
                            <span class="text-[#767683] font-medium text-sm">Coming Soon</span>
                        </div>

                    </div>
                </div>
            </section>

            {/* About Section */}
            <section class="max-w-7xl mx-auto px-12 py-16 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Built with intention.</h2>
                    <div class="space-y-4 text-[#454651] text-base leading-relaxed">
                        <p>
                            At Zenthra Labs, we reject the cult of speed in favor of the discipline of quality. Every line of code is weighed for its long-term cost, and every interface is distilled to its most functional form.
                        </p>
                        <p>
                            Our engineering philosophy is rooted in mechanical sympathy—understanding the hardware to build software that feels as light as air but as solid as steel. We build for the next decade, not the next quarter.
                        </p>
                    </div>
                    <div class="mt-10 grid grid-cols-3 gap-6 border-t border-[#c6c5d3] pt-6">
                        <div>
                            <div class="font-['Syne',sans-serif] text-xl font-bold text-[#4352a5]">4ms</div>
                            <div class="text-xs text-[#767683] mt-1">Avg Latency</div>
                        </div>
                        <div>
                            <div class="font-['Syne',sans-serif] text-xl font-bold text-[#4352a5]">0.0</div>
                            <div class="text-xs text-[#767683] mt-1">Dependencies</div>
                        </div>
                        <div>
                            <div class="font-['Syne',sans-serif] text-xl font-bold text-[#4352a5]">99.9%</div>
                            <div class="text-xs text-[#767683] mt-1">Uptime Target</div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="h-64 bg-[#e9e7ef] border border-[#c6c5d3] rounded-[4px] overflow-hidden flex items-end p-6 cursor-pointer hover:bg-[#dbd9e1] transition-colors">
                        <span class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21]">Our Principles</span>
                    </div>
                    <div class="h-64 bg-[#5c6bc0] border border-[#c6c5d3] rounded-[4px] overflow-hidden flex items-end p-6 cursor-pointer hover:brightness-110 transition-all">
                        <span class="font-['Syne',sans-serif] text-lg font-bold text-white">Join the Team</span>
                    </div>
                </div>
            </section>
        </>
    );
});

export const head: DocumentHead = {
    title: "Zenthra Labs | Building Modern Software Products",
    meta: [
        { name: "description", content: "We design and build software products, from developer tools to consumer apps, focused on craftsmanship, performance, and long term reliability." },
    ],
};
