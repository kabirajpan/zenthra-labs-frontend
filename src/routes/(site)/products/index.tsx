import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// ── Thumbnails ────────────────────────────────────────────────────────────────

const ZenthraThumbnail = component$(() => (
    <div class="w-full h-full bg-[#071025] flex flex-col p-4 font-['JetBrains_Mono',monospace]">
        <div class="flex items-center gap-1.5 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
            <span class="ml-2 text-[10px] text-[#9aa6e0]">zenthra.rs</span>
        </div>
        <div class="flex flex-col gap-1 text-[11px] leading-relaxed">
            <div><span class="text-[#c792ea]">use </span><span class="text-[#61afef]">zenthra</span><span class="text-[#bfc9d9]">::prelude::*;</span></div>
            <div class="h-1" />
            <div><span class="text-[#c792ea]">fn </span><span class="text-[#61afef]">main</span><span class="text-[#bfc9d9]">() {"{"}</span></div>
            <div class="pl-4"><span class="text-[#bfc9d9]">App::new()</span></div>
            <div class="pl-8"><span class="text-[#61afef] font-bold">.with_ui</span><span class="text-[#bfc9d9]">(|ui| {"{"}</span></div>
            <div class="pl-12"><span class="text-[#bfc9d9]">ui.text(</span><span class="text-[#98c379]">"Hello!"</span><span class="text-[#bfc9d9]">).show();</span></div>
            <div class="pl-8"><span class="text-[#bfc9d9]">{"}"})</span></div>
            <div class="pl-8"><span class="text-[#61afef]">.run</span><span class="text-[#bfc9d9]">();</span></div>
            <div><span class="text-[#bfc9d9]">{"}"}</span></div>
        </div>
        <div class="mt-auto flex gap-3">
            <span class="text-[10px] text-[#7ee787]">▲ build 4ms</span>
            <span class="text-[10px] text-[#9aa6e0]">0 deps</span>
            <span class="text-[10px] text-[#9aa6e0]">99.9% uptime</span>
        </div>
    </div>
));

const ZenthraViewThumbnail = component$(() => (
    <div class="w-full h-full bg-[#e9e7ef] flex items-center justify-center">
        <img
            src="/assets/screenshots/zenthra_viewer/04.jpeg"
            alt="Zenthra View"
            class="w-full h-full object-cover"
        />
    </div>
));

const AfterMotionThumbnail = component$(() => (
    <div class="w-full h-full relative overflow-hidden flex items-center justify-center"
        style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);">
        <div class="absolute inset-0 opacity-10"
            style="background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 48px);" />
        <div class="relative flex flex-col items-center gap-3">
            <div class="w-14 h-14 rounded-full flex items-center justify-center"
                style="background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.25);">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <span class="text-white text-xs font-['DM_Sans',sans-serif] font-medium tracking-wide opacity-80">After Motion</span>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-8 flex items-end gap-0.5 px-4 pb-2 opacity-30">
            {[3, 5, 8, 4, 9, 6, 11, 7, 5, 9, 4, 8, 6, 10, 5, 7, 9, 4, 6, 8].map((h, i) => (
                <div key={i} class="flex-1 rounded-sm bg-white" style={`height: ${h * 2}px`} />
            ))}
        </div>
    </div>
));

const DomoThumbnail = component$(() => (
    <div class="w-full h-full bg-[#f5f2fa] flex items-end justify-center gap-2 px-6 pb-4">
        {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
            <div key={i} class="flex-1 rounded-t-sm bg-[#5c6bc0] opacity-70" style={`height: ${h}%`} />
        ))}
    </div>
));

const FutureLabsThumbnail = component$(() => (
    <div class="w-full h-full bg-[#f5f2fa] flex flex-col items-center justify-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c6c5d3" stroke-width="1.5">
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        </svg>
        <span class="text-[10px] font-['JetBrains_Mono',monospace] text-[#c6c5d3] tracking-widest">R&D</span>
    </div>
));

// ── Actions ───────────────────────────────────────────────────────────────────

const ZenthraActions = component$(() => (
    <div class="flex gap-3">
        <a href="/products/zenthra" class="py-2 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">View Details</a>
        <a href="https://github.com" target="_blank" rel="noopener" class="py-2 px-4 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] text-sm flex items-center gap-1.5 hover:bg-[#e9e7ef] transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            GitHub
        </a>
    </div>
));

const ZenthraViewActions = component$(() => (
    <div class="flex gap-3">
        <a href="/products/zenthra/apps/zenthra-view" class="py-2 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">View Details</a>
        <a href="/download" class="py-2 px-4 border border-[#c6c5d3] text-[#1b1b21] font-medium rounded-[4px] text-sm hover:bg-[#e9e7ef] transition-all">Download</a>
    </div>
));

const AfterMotionActions = component$(() => (
    <div class="flex gap-3">
        <a href="/products/after-motion" class="py-2 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">View Details</a>
        <span class="py-2 px-4 bg-[#e9e7ef] text-[#767683] font-medium rounded-[4px] text-sm">App Stores Soon</span>
    </div>
));

const DomoActions = component$(() => (
    <div class="flex gap-3">
        <a href="/products/domo" class="py-2 px-4 bg-[#5c6bc0] text-[#f8f6ff] font-medium rounded-[4px] text-sm hover:brightness-110 transition-all">View Details</a>
    </div>
));

const FutureLabsActions = component$(() => (
    <div class="flex gap-3">
        <span class="py-2 px-4 bg-[#e9e7ef] text-[#767683] font-medium rounded-[4px] text-sm cursor-default">Coming Soon</span>
    </div>
));

// ── Shared card ───────────────────────────────────────────────────────────────

interface CardProps {
    thumbnail: any;
    title: string;
    badge?: string;
    badgeVariant?: "default" | "green" | "muted";
    category: string;
    description: string;
    comingSoon?: boolean;
    Actions: any;
}

const ProductCard = component$<CardProps>(({
    thumbnail: Thumbnail,
    title, badge, badgeVariant = "default",
    category, description, comingSoon = false, Actions,
}) => {
    const badgeClass = {
        default: "bg-[#e9e7ef] text-[#454651]",
        green: "bg-[#d7f5df] text-[#1f6b3a]",
        muted: "bg-[#e9e7ef] text-[#767683]",
    }[badgeVariant];

    return (
        <div class={[
            "bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col h-full transition-all duration-200",
            comingSoon ? "opacity-70 border-dashed" : "hover:border-[#4352a5] hover:-translate-y-1",
        ].join(" ")}>
            <div class="aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa]">
                <Thumbnail />
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-2">{category}</p>
                <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21]">{title}</h3>
                    {badge && <span class={`px-2 py-0.5 text-xs rounded-[4px] font-medium ${badgeClass}`}>{badge}</span>}
                </div>
                <p class="text-[#454651] text-sm leading-relaxed flex-grow">{description}</p>
                <div class="mt-4"><Actions /></div>
            </div>
        </div>
    );
});

// ── Page ─────────────────────────────────────────────────────────────────────

export default component$(() => {
    return (
        <section class="max-w-7xl mx-auto px-12 py-16">
            <div class="mb-10">
                <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21]">Products</h1>
                <p class="text-[#454651] mt-2 text-sm">A portfolio of projects, demos, and future work.</p>
            </div>

            <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-4">Frameworks &amp; Tools</p>
            <div class="grid gap-6 md:grid-cols-3 mb-14">
                <ProductCard thumbnail={ZenthraThumbnail} title="Zenthra" badge="v1.2 Stable" category="UI Framework"
                    description="A high-performance, Rust-based UI framework for building complex user interfaces with zero-runtime overhead."
                    Actions={ZenthraActions} />
                <ProductCard thumbnail={ZenthraViewThumbnail} title="Zenthra View" badge="Example App" category="Desktop App"
                    description="A native desktop image viewer built with Zenthra — file browser, zoom, slideshow, and thumbnail filmstrip."
                    Actions={ZenthraViewActions} />
                <ProductCard thumbnail={FutureLabsThumbnail} title="Future Labs" category="R&D"
                    description="Mobile apps and games — exploring next-generation interface metaphors and GPU-accelerated rendering."
                    comingSoon={true} Actions={FutureLabsActions} />
            </div>

            <p class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#767683] mb-4">Apps</p>
            <div class="grid gap-6 md:grid-cols-3">
                <ProductCard thumbnail={AfterMotionThumbnail} title="After Motion" badge="Live" badgeVariant="green" category="Mobile Video Editor"
                    description="A production-ready mobile video editor built for fast, fluid, on-device editing. No subscriptions. No cloud required."
                    Actions={AfterMotionActions} />
                <ProductCard thumbnail={DomoThumbnail} title="Domo" badge="Demo" category="Interactive Demo"
                    description="A small demo exploring interactive data visualizations and live previews."
                    Actions={DomoActions} />
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Products — Zenthra Labs",
    meta: [{ name: "description", content: "Products, demos, and experimental projects from Zenthra Labs." }],
};
