import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";

interface CardStackProps {
    images: string[];
    altPrefix: string;
}

export const CardStackPreview = component$<CardStackProps>(({ images, altPrefix }) => {
    const activeIndex = useSignal(0);
    const containerRef = useSignal<HTMLElement>();

    const goPrev = $(() => {
        activeIndex.value = (activeIndex.value - 1 + images.length) % images.length;
    });
    const goNext = $(() => {
        activeIndex.value = (activeIndex.value + 1) % images.length;
    });

    useVisibleTask$(({ cleanup }) => {
        const el = containerRef.value;
        if (!el) return;

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                activeIndex.value = (activeIndex.value - 1 + images.length) % images.length;
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                activeIndex.value = (activeIndex.value + 1) % images.length;
            }
        };

        el.addEventListener("keydown", handleKeydown);
        cleanup(() => el.removeEventListener("keydown", handleKeydown));
    });

    // Horizontal fan with a subtle diagonal drop, tighter spacing, no rotation
    const STACK = [
        { x: 0, y: 0, scale: 1, z: 50 },
        { x: 22, y: 6, scale: 1, z: 40 },
        { x: 44, y: 12, scale: 1, z: 30 },
        { x: 66, y: 18, scale: 1, z: 20 },
        { x: 88, y: 24, scale: 1, z: 10 },
    ];

    const order = (i: number) => {
        const total = images.length;
        return (i - activeIndex.value + total) % total;
    };

    return (
        <div class="relative" ref={containerRef} tabIndex={0} style="outline: none;">
            <div class="relative h-[280px] sm:h-[340px] select-none pr-24 pb-8 sm:pr-28 sm:pb-10" style="perspective: 1200px;">
                {images.map((src, i) => {
                    const pos = order(i);
                    if (pos >= STACK.length) return null;
                    const f = STACK[pos];
                    return (
                        <button
                            key={src}
                            type="button"
                            onClick$={() => (activeIndex.value = i)}
                            class="absolute left-0 top-0 rounded-[6px] border border-[#c6c5d3] overflow-hidden bg-white shadow-lg transition-all duration-300 ease-out cursor-pointer"
                            style={{
                                width: "min(64%, 300px)",
                                transform: `translate(${f.x}px, ${f.y}px) scale(${f.scale})`,
                                zIndex: String(f.z),
                                boxShadow: pos === 0
                                    ? "0 20px 40px rgba(2,6,23,0.18)"
                                    : "0 8px 20px rgba(2,6,23,0.10)",
                            }}
                            aria-label={`Show ${altPrefix} ${i + 1}`}
                        >
                            <img
                                src={src}
                                alt={`${altPrefix} ${i + 1}`}
                                class="w-full h-full object-cover aspect-[4/3] pointer-events-none"
                                draggable={false}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Arrows + dots */}
            <div class="flex items-center justify-between mt-6">
                <div class="flex items-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick$={() => (activeIndex.value = i)}
                            aria-label={`Go to ${altPrefix} ${i + 1}`}
                            class={`h-1.5 rounded-full transition-all ${i === activeIndex.value ? "bg-[#5c6bc0] w-6" : "bg-[#c6c5d3] w-1.5 hover:bg-[#9ca0c4]"
                                }`}
                        />
                    ))}
                </div>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        onClick$={goPrev}
                        aria-label={`Previous ${altPrefix}`}
                        class="w-8 h-8 flex items-center justify-center rounded-full border border-[#c6c5d3] text-[#454651] hover:bg-[#f5f2fa] hover:border-[#4352a5] transition-all"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        type="button"
                        onClick$={goNext}
                        aria-label={`Next ${altPrefix}`}
                        class="w-8 h-8 flex items-center justify-center rounded-full border border-[#c6c5d3] text-[#454651] hover:bg-[#f5f2fa] hover:border-[#4352a5] transition-all"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CardStackPreview;
