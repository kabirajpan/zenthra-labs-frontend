import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="relative bg-[#0b0813] text-[#e2dff0] min-h-screen">
            {/* Custom Glowing Background */}
            <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
                <div class="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-violet-800/40 blur-[120px]" />
                <div class="absolute top-[40%] -right-[10%] w-[50%] aspect-square rounded-full bg-indigo-900/40 blur-[120px]" />
            </div>

            <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                {/* ── Breadcrumbs ── */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-violet-400 hover:text-violet-200 transition-colors">Products</a>
                    <span class="text-violet-800">/</span>
                    <span class="text-[#e2dff0]">After Motion</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <span class="inline-block px-3 py-1 bg-violet-900/40 border border-violet-700/50 text-violet-300 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                            Mobile App · Live
                        </span>
                        <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                            After Motion
                        </h1>
                        <p class="text-base sm:text-lg text-violet-200/80 leading-relaxed max-w-xl">
                            A production-ready mobile video editor engineered for fast, fluid, on-device video composition. Edit multitrack videos at 60 FPS previews with zero telemetry and no subscription fees.
                        </p>

                        <div class="grid grid-cols-2 gap-4 max-w-md pt-4">
                            <div class="bg-white/5 border border-white/10 rounded-[4px] p-4">
                                <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-violet-400">Zero Lag</div>
                                <div class="text-xs text-violet-300/70">60 FPS preview updates</div>
                            </div>
                            <div class="bg-white/5 border border-white/10 rounded-[4px] p-4">
                                <div class="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-violet-400">100% Local</div>
                                <div class="text-xs text-violet-300/70">On-device composition</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-4 pt-6">
                            <span class="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 hover:bg-white/15 transition-all text-sm font-medium rounded-[4px] cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22c-1.34.05-1.77-.77-3.29-.77-1.53 0-2 .74-3.27.79-1.32.05-2.31-1.32-3.15-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.02 2.98 1.1.09 2.24-.55 2.97-1.43z" /></svg>
                                App Store
                            </span>
                            <span class="flex items-center gap-2 px-5 py-2.5 bg-violet-700 text-white hover:bg-violet-600 transition-all text-sm font-medium rounded-[4px] cursor-pointer shadow-lg shadow-violet-700/30">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5.23 3.001c-.13 0-.25.04-.36.12l10.97 10.97 3.32-1.9c1-.57 1-.15.22-.6zM3.4 3.511a1.2 1.2 0 0 0-.28.84v15.3c0 .35.1.65.28.84L14.7 9.2zM15.3 15.3l-10.97 10.97c.1.08.23.12.36.12.42 0 1.25-.24 2.25-.81l8.36-4.78z" /></svg>
                                Google Play
                            </span>
                        </div>
                    </div>

                    {/* Timeline & Smartphone Mockup in CSS */}
                    <div class="col-span-12 lg:col-span-5 flex justify-center">
                        <div class="relative w-72 h-[560px] bg-[#1a162b] border-[6px] border-[#373153] rounded-[36px] overflow-hidden shadow-2xl shadow-black/60 flex flex-col">
                            {/* Camera Notch */}
                            <div class="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-between px-4">
                                <span class="w-1.5 h-1.5 rounded-full bg-blue-900" />
                                <span class="w-2.5 h-1 rounded-full bg-gray-900" />
                            </div>

                            {/* App Interface Mockup */}
                            <div class="flex-grow flex flex-col relative z-10 pt-10">
                                {/* Monitor Panel */}
                                <div class="h-[200px] bg-black relative flex items-center justify-center">
                                    <div class="absolute inset-0 bg-cover bg-center opacity-60" style="background-image: url('/assets/screenshots/zenthra_viewer/01.png');" />
                                    {/* Playhead Center */}
                                    <div class="relative w-12 h-12 rounded-full bg-violet-600/80 flex items-center justify-center border border-violet-400">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                    <div class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-[10px] rounded text-white font-mono">00:04.12</div>
                                </div>

                                {/* Controls */}
                                <div class="p-3 flex justify-between items-center border-b border-white/5 bg-[#171326]">
                                    <span class="text-[10px] text-violet-300 font-mono">1080p · 60fps</span>
                                    <div class="flex gap-2">
                                        <button class="p-1 rounded bg-white/5 hover:bg-white/10 text-xs"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg></button>
                                        <button class="p-1 rounded bg-white/5 hover:bg-white/10 text-xs"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5v14h-3V5h3zm-6 0v14h-3V5h3z"/></svg></button>
                                        <button class="p-1 rounded bg-white/5 hover:bg-white/10 text-xs"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg></button>
                                    </div>
                                </div>

                                {/* Timeline Editor Area */}
                                <div class="flex-grow bg-[#110d21] p-3 flex flex-col gap-2 overflow-hidden">
                                    <div class="flex justify-between items-center text-[9px] text-violet-400 font-mono">
                                        <span>Tracks</span>
                                        <span>00:00 - 00:15</span>
                                    </div>

                                    {/* Track 1: Text Layer */}
                                    <div class="h-6 bg-[#2c1d49] border border-violet-500/30 rounded px-2 flex items-center justify-between text-[9px]">
                                        <span class="text-violet-200">💬 Text Layer</span>
                                        <span class="w-16 h-1.5 bg-violet-400 rounded-sm" />
                                    </div>

                                    {/* Track 2: Video Layer */}
                                    <div class="h-8 bg-[#1f285c] border border-indigo-500/30 rounded px-2 flex items-center justify-between text-[9px] relative overflow-hidden">
                                        <div class="absolute inset-y-0 left-4 right-10 bg-indigo-400/20" />
                                        <span class="z-10 text-indigo-200">🎬 clip_01.mp4</span>
                                        <span class="z-10 text-[8px] text-indigo-300">6.2s</span>
                                    </div>

                                    {/* Track 3: Audio Layer */}
                                    <div class="h-8 bg-[#1b4332] border border-emerald-500/30 rounded px-2 flex items-center justify-between text-[9px] relative overflow-hidden">
                                        {/* Waveform lines */}
                                        <div class="absolute bottom-0 left-0 right-0 h-4 flex items-end gap-0.5 px-2 opacity-30">
                                            {[3, 8, 4, 9, 6, 12, 7, 5, 9, 4, 8, 6, 10, 5, 7, 9, 4, 6, 8, 3, 5, 8, 4, 9].map((h, i) => (
                                                <div key={i} class="flex-1 rounded-sm bg-emerald-400" style={`height: ${h * 1}px`} />
                                            ))}
                                        </div>
                                        <span class="z-10 text-emerald-200">🎵 background_beat.wav</span>
                                    </div>

                                    {/* Vertical Playhead Line */}
                                    <div class="absolute top-[240px] bottom-0 left-[40%] w-[1.5px] bg-[#ff4a75] z-15 shadow-glow">
                                        <div class="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ff4a75]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Product Features Grid ── */}
                <div class="border-t border-white/10 pt-12 md:pt-20 mb-20">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-center text-white mb-12">Engineered for absolute performance.</h2>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">GPU Compositing</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                Powered by a custom rendering compositor written in Rust using target-specific EGL configs. Frame sequences are computed directly on the GPU, avoiding CPU bottlenecks and system freezes during editing preview.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Ghost AI Cutter Tracker</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                An integrated background editing assistant that cuts, splits, and stitches clips silently in the background while you monitor the playhead. Smoothly handles large file assets with an autonomous logic flow.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Offline Processing</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                No cloud accounts, subscription fees, or internet connections are required. Export timelines to full 4K UHD resolutions directly to your local file gallery with total privacy.
                            </p>
                        </div>
                        <div class="bg-white/5 border border-white/10 p-6 rounded-[4px] hover:border-violet-500 transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-white mb-2">Precise Multi-Track Layering</h3>
                            <p class="text-sm text-violet-200/80 leading-relaxed">
                                Build compound timelines with multiple channels of video, audio waveforms, text overlay, and transition handles. Scrub frame-by-frame with snap-locking for perfect sample-level alignment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Sub CTA Banner ── */}
                <div class="bg-[#171326] border border-violet-800/40 rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Ready to edit?</h2>
                        <p class="text-violet-300 text-sm">Download After Motion free on your device today.</p>
                    </div>
                    <div class="flex gap-4">
                        <span class="py-2.5 px-6 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-[4px] text-sm cursor-pointer transition-colors shadow-lg shadow-violet-700/20">
                            Download Now
                        </span>
                        <a href="/products" class="py-2.5 px-6 border border-white/20 text-white hover:bg-white/10 font-medium rounded-[4px] text-sm transition-colors">
                            All Products
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "After Motion — Mobile Video Editor | Zenthra Labs",
    meta: [
        { name: "description", content: "After Motion is a native, high-performance, subscription-free mobile video editor with precise multitrack composition." },
    ],
};
