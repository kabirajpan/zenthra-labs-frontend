import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="relative min-h-screen">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
                {/* ── Breadcrumbs ── */}
                <div class="flex items-center gap-2 mb-8 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-[#767683] hover:text-[#4352a5] transition-colors">Products</a>
                    <span class="text-[#c6c5d3]">/</span>
                    <a href="/products/zenthra" class="text-[#767683] hover:text-[#4352a5] transition-colors">Zenthra</a>
                    <span class="text-[#c6c5d3]">/</span>
                    <span class="text-[#1b1b21]">Zenthra View</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <span class="inline-block px-3 py-1 bg-[#e3e1e9] text-[#454651] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                            Example App · v1.0 Stable
                        </span>
                        <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1b1b21] leading-tight tracking-tight">
                            Zenthra View
                        </h1>
                        <p class="text-base sm:text-lg text-[#454651] leading-relaxed max-w-xl">
                            A blazing fast native desktop image viewer built with the Zenthra UI framework. Smoothly browse directories, view details, run slideshows, and slide through virtualized filmstrips.
                        </p>

                        <div class="grid grid-cols-3 gap-4 pt-4">
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">&lt; 4ms</div>
                                <div class="text-[10px] text-[#767683]">Render latency</div>
                            </div>
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">1.5 MB</div>
                                <div class="text-[10px] text-[#767683]">Binary size</div>
                            </div>
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">100K+</div>
                                <div class="text-[10px] text-[#767683]">Virtual items</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3 pt-6">
                            <span class="py-2.5 px-5 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all cursor-pointer">
                                Download for Linux (AppImage)
                            </span>
                            <span class="py-2.5 px-5 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] text-sm hover:bg-[#e9e7ef] transition-all cursor-pointer">
                                Download for Windows (.zip)
                            </span>
                        </div>
                    </div>

                    {/* Image Viewer Panel */}
                    <div class="col-span-12 lg:col-span-5 flex justify-center items-center">
                        <div class="w-full max-w-md rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-xl bg-white">
                            <img
                                src="/assets/screenshots/zenthra_viewer/04.jpeg"
                                alt="Zenthra View Screenshot"
                                class="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Features List ── */}
                <div class="border-t border-[#c6c5d3] pt-12 md:pt-20 mb-20">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-center text-[#1b1b21] mb-12">Core Application Strengths</h2>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white border border-[#c6c5d3] p-6 rounded-[4px] hover:border-[#4352a5] transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">Virtualized Filmstrip</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Fully virtualized scrolling that manages lists of 100,000+ files with zero layout lags. Memory is garbage collected dynamically, only keeping on-screen thumbnails cached.
                            </p>
                        </div>
                        <div class="bg-white border border-[#c6c5d3] p-6 rounded-[4px] hover:border-[#4352a5] transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">Immediate-Mode Layout</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Leverages Taffy layout engine and Cosmic Text libraries. Recalculates canvas bounding boxes on window resize in less than 1ms.
                            </p>
                        </div>
                        <div class="bg-white border border-[#c6c5d3] p-6 rounded-[4px] hover:border-[#4352a5] transition-colors col-span-12 sm:col-span-2 lg:col-span-1">
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">GPU Texture Blitting</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Uploads image textures directly to GPU buffers via WGPU pipeline. Zooming, panning, and rotations are computed in vertex shaders, maintaining locked 60 FPS redraws.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Realistic Code Sample ── */}
                <section class="border-t border-[#c6c5d3] pt-12 md:pt-20 mb-20">
                    <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] mb-4">Pure Immediate-Mode Logic</h2>
                            <p class="text-[#454651] text-sm leading-relaxed mb-4">
                                Zenthra View demonstrates the power of Zenthra's builder pattern. A single unified event closure controls UI structure, state updates, and rendering triggers.
                            </p>
                            <p class="text-[#454651] text-sm leading-relaxed">
                                By avoiding complex widget lifecycle frameworks, the application retains a light memory footprint and launches instantaneously.
                            </p>
                        </div>

                        {/* Dark code block showing actual Zenthra View code */}
                        <div class="bg-[#071025] rounded-[6px] overflow-hidden shadow-xl font-['JetBrains_Mono',monospace] w-full">
                            <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="ml-3 text-[11px] text-[#9aa6e0]">image_viewer/src/main.rs</span>
                            </div>
                            <div class="p-5 text-[10px] sm:text-[12px] leading-relaxed flex flex-col gap-0.5 text-white/90 overflow-x-auto">
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                                <div class="h-2" />
                                <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                                <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"Zenthra — Image Viewer"</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">size</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">1200</span><span class="text-[#bfc9d9]">, </span><span class="text-[#d19a66]">660</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">decorations</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">false</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">with_ui</span><span class="text-[#bfc9d9]">(move |ui| {"{"}</span></div>
                                <div class="pl-13"><span class="text-[#bfc9d9]">ui.container()</span></div>
                                <div class="pl-17"><span class="text-[#61afef]">.fill</span><span class="text-[#bfc9d9]">()</span></div>
                                <div class="pl-17"><span class="text-[#61afef]">.bg</span><span class="text-[#bfc9d9]">(colors.bg_base)</span></div>
                                <div class="pl-17"><span class="text-[#61afef]">.show</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                                <div class="pl-21"><span class="text-[#8a9ab0]">draw_title_bar(ui, &amp;mut state);</span></div>
                                <div class="pl-21"><span class="text-[#8a9ab0]">draw_viewer(ui, &amp;mut state);</span></div>
                                <div class="pl-17"><span class="text-[#bfc9d9]">{"}"});</span></div>
                                <div class="pl-9"><span class="text-[#bfc9d9]">{"}"})</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
                                <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Screenshots & Details Section ── */}
                <section class="border-t border-[#c6c5d3] pt-12 md:pt-20 mb-20">
                    <h2 class="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-center text-[#1b1b21] mb-4">Application Interface & Deep Dive</h2>
                    <p class="text-center text-sm text-[#454651] max-w-xl mx-auto mb-16 leading-relaxed">
                        Explore various workspaces and toolbars within Zenthra View, built with real-time immediate rendering layout modules.
                    </p>

                    <div class="space-y-24">
                        {/* Showcase Item 1: Left Image, Right Details */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenthra_viewer/01.png"
                                        alt="Seamless startup landing state"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Seamless Application Launch</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Zenthra View initializes its window, renderer, and directory trees in under 4ms. The lightweight startup state features a clean canvas with direct open hooks for local files and folder structures.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Instantaneous launch sequence (&lt; 4ms)
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Minimalist, distraction-free landing workspace
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 2: Left Details, Right Image */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenthra_viewer/02.png"
                                        alt="Workspace dark visualization layout"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">High-Performance Render Canvas</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    The active workspace operates directly on OpenGL hardware-accelerated drawing contexts. This enables instant zooming, viewport panning, and multi-threaded image decoding without locking the main thread.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        GPU-based anti-aliasing and interpolation
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Sub-millisecond input response latency
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 3: Left Image, Right Details */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenthra_viewer/03.png"
                                        alt="Directory list view screenshot"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Interactive Layout Controls</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Navigate through thousands of files seamlessly using side navigation panels. Includes filters for file formats, sorting systems, and a quick-action toolbar for rotation, fit-to-screen, and color profile inspects.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Split sidebar with tree directory browser
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Real-time file system watchers (hot reloading)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Showcase Item 4: Left Details, Right Image */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenthra_viewer/05.png"
                                        alt="Image details and metadata screen"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Advanced Metadata & Library Inspection</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Inspect comprehensive file statistics, dimensions, and color spaces directly from the sidebar interface. Double-click thumbnails to trigger virtualized filmstrip updates without reloading application state.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Real-time dimension and memory tracker
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Non-blocking background image metadata parser
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Sub CTA Banner ── */}
                <div class="bg-[#071025] rounded-[6px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">Build native apps like this.</h2>
                        <p class="text-[#9aa6e0] text-sm">Zenthra View is open source. Study its implementation pattern on GitHub.</p>
                    </div>
                    <div class="flex gap-4">
                        <a href="https://github.com/kabirajpan/zenthra" target="_blank" rel="noopener" class="py-2.5 px-6 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-colors shadow-lg shadow-[#5c6bc0]/25">
                            Browse Code
                        </a>
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
    title: "Zenthra View — Native Image Viewer | Zenthra Labs",
    meta: [
        { name: "description", content: "Zenthra View is a native cross-platform desktop image viewer featuring virtualized filmstrips, directory browsers, and GPU-driven canvas." },
    ],
};
