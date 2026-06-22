import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import CardStackPreview from "../../../../../../components/showcase/card-stack-preview";

const MULTI_COLOR_FOLDER = [
    "/assets/screenshots/zenfile/multi-color-folder/01-default.png",
    "/assets/screenshots/zenfile/multi-color-folder/02.png",
    "/assets/screenshots/zenfile/multi-color-folder/03.png",
    "/assets/screenshots/zenfile/multi-color-folder/04.png",
    "/assets/screenshots/zenfile/multi-color-folder/05.png",
];

const MULTI_COLOR_HIGHLIGHT = [
    "/assets/screenshots/zenfile/multi-color-highlight/01-default.png",
    "/assets/screenshots/zenfile/multi-color-highlight/02.png",
    "/assets/screenshots/zenfile/multi-color-highlight/03.png",
    "/assets/screenshots/zenfile/multi-color-highlight/04.png",
    "/assets/screenshots/zenfile/multi-color-highlight/05.png",
];

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
                    <span class="text-[#1b1b21]">ZenFile</span>
                </div>

                {/* ── Hero ── */}
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-20">
                    <div class="col-span-12 lg:col-span-7 space-y-6">
                        <span class="inline-block px-3 py-1 bg-[#e3e1e9] text-[#454651] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                            Example App · v0.1 Stable
                        </span>
                        <h1 class="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1b1b21] leading-tight tracking-tight">
                            ZenFile
                        </h1>
                        <p class="text-base sm:text-lg text-[#454651] leading-relaxed max-w-xl">
                            A native, dependency-light desktop file manager built with the Zenthra UI framework. Browse directories, manage files, and navigate your filesystem with instant, native-speed rendering.
                        </p>

                        <div class="grid grid-cols-3 gap-4 pt-4">
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">&lt; 4ms</div>
                                <div class="text-[10px] text-[#767683]">Render latency</div>
                            </div>
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">Native</div>
                                <div class="text-[10px] text-[#767683]">Filesystem access</div>
                            </div>
                            <div class="bg-white border border-[#c6c5d3] rounded-[4px] p-4 text-center">
                                <div class="font-['Syne',sans-serif] text-base sm:text-lg font-bold text-[#4352a5]">v0.1.0</div>
                                <div class="text-[10px] text-[#767683]">Latest release</div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3 pt-6">
                            <a href="/products/zenthra/apps/file-manager/download" class="py-2.5 px-6 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] hover:brightness-110 transition-all text-sm shadow-md shadow-[#5c6bc0]/25">
                                Download Application
                            </a>
                            <a href="https://github.com/kabirajpan/ZenFile" target="_blank" rel="noopener" class="py-2.5 px-6 bg-white border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] hover:bg-[#f5f2fa] transition-all text-sm flex items-center gap-2 shadow-sm shadow-[#c6c5d3]/10">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                GitHub Source
                            </a>
                        </div>
                    </div>

                    {/* Hero screenshot */}
                    <div class="col-span-12 lg:col-span-5 flex justify-center items-center">
                        <div class="w-full max-w-md rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-xl bg-white">
                            <img
                                src="/assets/screenshots/zenfile/main-default-size-and-color.png"
                                alt="ZenFile main interface"
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
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">Native Filesystem Access</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Reads directories directly from the OS filesystem with no virtualization layer — instant directory listings even on large folders.
                            </p>
                        </div>
                        <div class="bg-white border border-[#c6c5d3] p-6 rounded-[4px] hover:border-[#4352a5] transition-colors">
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">Immediate-Mode Layout</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Built entirely on the Zenthra widget tree — file lists, sidebars, and toolbars redraw in under 4ms on every interaction.
                            </p>
                        </div>
                        <div class="bg-white border border-[#c6c5d3] p-6 rounded-[4px] hover:border-[#4352a5] transition-colors col-span-1 sm:col-span-2 lg:col-span-1">
                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] mb-2">Cross-Platform Binary</h3>
                            <p class="text-sm text-[#454651] leading-relaxed">
                                Ships as a single standalone binary for Linux, macOS, and Windows — no runtime installs, no dependencies to configure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Code sample ── */}
                <section class="border-t border-[#c6c5d3] pt-12 md:pt-20 mb-20">
                    <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] mb-4">Built on Zenthra's core widgets.</h2>
                            <p class="text-[#454651] text-sm leading-relaxed mb-4">
                                ZenFile demonstrates Zenthra's builder pattern applied to a real, everyday productivity tool — directory trees, file lists, and toolbars composed from the same primitives used across every Zenthra app.
                            </p>
                            <p class="text-[#454651] text-sm leading-relaxed">
                                No separate file-system abstraction layer is needed — the application reads directly from disk and renders the result on the next frame.
                            </p>
                        </div>

                        <div class="bg-[#071025] rounded-[6px] overflow-hidden shadow-xl font-['JetBrains_Mono',monospace] w-full">
                            <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="ml-3 text-[11px] text-[#9aa6e0]">zenfile/src/main.rs</span>
                            </div>
                            <div class="p-5 text-[10px] sm:text-[12px] leading-relaxed flex flex-col gap-0.5 text-white/90 overflow-x-auto">
                                <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
                                <div class="h-2" />
                                <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
                                <div class="pl-5"><span class="text-[#bfc9d9]">App::new()</span></div>
                                <div class="pl-9"><span class="text-[#61afef]">.title</span><span class="text-[#bfc9d9]">(</span><span class="text-[#98c379]">"ZenFile"</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">size</span><span class="text-[#bfc9d9]">(</span><span class="text-[#d19a66]">1100</span><span class="text-[#bfc9d9]">, </span><span class="text-[#d19a66]">680</span><span class="text-[#bfc9d9]">)</span><span class="text-[#bfc9d9]">.</span><span class="text-[#61afef]">with_ui</span><span class="text-[#bfc9d9]">(move |ui| {"{"}</span></div>
                                <div class="pl-13"><span class="text-[#bfc9d9]">ui.container()</span></div>
                                <div class="pl-17"><span class="text-[#61afef]">.fill</span><span class="text-[#bfc9d9]">()</span></div>
                                <div class="pl-17"><span class="text-[#61afef]">.show</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
                                <div class="pl-21"><span class="text-[#8a9ab0]">draw_sidebar(ui, &amp;mut state);</span></div>
                                <div class="pl-21"><span class="text-[#8a9ab0]">draw_file_list(ui, &amp;mut state);</span></div>
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
                        Explore the interface, list views, and detail panels in ZenFile, built with real-time immediate rendering layout modules.
                    </p>

                    <div class="space-y-24">
                        {/* Item 1: List view */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenfile/zenfile-list-view.png"
                                        alt="ZenFile list view"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Clean List View</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Switch from grid to a dense list view for browsing large directories quickly, with file names, sizes, and types laid out for fast scanning.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Instant switch between grid and list layouts
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Sortable columns for name, size, and type
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 2: Right panel details + preview */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenfile/zenfile-right-panel-details-and-preview.png"
                                        alt="ZenFile details and preview panel"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Details & Live Preview Panel</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    A right-hand panel surfaces file metadata and a live preview without opening a separate window, so you can inspect files while staying in context.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Inline file metadata inspector
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Live preview pane for supported file types
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 3: Right-click menu */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenfile/right-click-menu-panel/wider-view.png"
                                        alt="ZenFile right-click context menu"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Contextual Right-Click Menu</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    A fast, native context menu gives quick access to common file operations directly from the grid or list, without breaking flow.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Native, immediate-mode context menu
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Common file actions one click away
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 4: Coding language support */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <div class="rounded-[6px] border border-[#c6c5d3] overflow-hidden shadow-lg bg-white">
                                    <img
                                        src="/assets/screenshots/zenfile/coding-language-support.png"
                                        alt="ZenFile coding language icon support"
                                        class="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Language-Aware File Icons</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Source files are recognized by extension and rendered with distinct icons for popular languages and frameworks, making project folders easy to scan visually.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Per-language icon recognition
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Instant visual project structure scanning
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Item 5: Multi-color folder labeling */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6">
                                <CardStackPreview images={MULTI_COLOR_FOLDER} altPrefix="Multi-color folder" />
                            </div>
                            <div class="col-span-12 md:col-span-6 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Multi-Color Folder Labeling</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Tag folders with custom colors to organize projects visually at a glance. Click through the stack to browse the available palette.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Custom color tagging per folder
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Instant visual grouping across the workspace
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Item 6: Multi-color highlight */}
                        <div class="grid grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="col-span-12 md:col-span-6 md:order-2">
                                <CardStackPreview images={MULTI_COLOR_HIGHLIGHT} altPrefix="Multi-color highlight" />
                            </div>
                            <div class="col-span-12 md:col-span-6 md:order-1 space-y-4">
                                <h3 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21]">Multi-Color Highlight</h3>
                                <p class="text-sm text-[#454651] leading-relaxed">
                                    Highlight selected files and folders with a color of your choice for quick visual grouping across the workspace.
                                </p>
                                <ul class="text-xs text-[#767683] space-y-2 font-['JetBrains_Mono',monospace]">
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Per-item highlight color selection
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                        Stands out clearly in both grid and list views
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
                        <p class="text-[#9aa6e0] text-sm">ZenFile is open source. Study its implementation pattern on GitHub.</p>
                    </div>
                    <div class="flex gap-4">
                        <a href="https://github.com/kabirajpan/ZenFile" target="_blank" rel="noopener" class="py-2.5 px-6 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white font-medium rounded-[4px] text-sm transition-colors shadow-lg shadow-[#5c6bc0]/25">
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
    title: "ZenFile — Native Desktop File Manager | Zenthra Labs",
    meta: [
        { name: "description", content: "ZenFile is a native, cross-platform desktop file manager built with the Zenthra UI framework, featuring instant directory listings and native filesystem access." },
        { property: "og:title", content: "ZenFile — Native Desktop File Manager | Zenthra Labs" },
        { property: "og:description", content: "ZenFile is a native, cross-platform desktop file manager built with the Zenthra UI framework, featuring instant directory listings and native filesystem access." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "ZenFile — Native Desktop File Manager | Zenthra Labs" },
        { name: "twitter:description", content: "ZenFile is a native, cross-platform desktop file manager built with the Zenthra UI framework, featuring instant directory listings and native filesystem access." },
    ],
};
