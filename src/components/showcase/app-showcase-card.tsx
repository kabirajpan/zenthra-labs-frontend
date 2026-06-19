import { component$, Slot, useSignal, $ } from "@builder.io/qwik";

export interface AppShowcaseCardProps {
    /** One or more screenshots. Omit for a "coming soon" placeholder card. */
    images?: string[];
    imageAlt?: string;
    title: string;
    badge?: string;
    description: string;
    /** If true, renders a dashed/muted "coming soon" style card instead of a real showcase. */
    comingSoon?: boolean;
}

export const AppShowcaseCard = component$<AppShowcaseCardProps>(
    ({ images, imageAlt, title, badge, description, comingSoon = false }) => {
        const activeIndex = useSignal(0);

        if (comingSoon) {
            return (
                <div class="bg-[#fbf8ff] border border-dashed border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col h-full opacity-80">
                    <div class="aspect-[16/10] flex items-center justify-center border-b border-dashed border-[#c6c5d3]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#767683" stroke-width="1.5">
                            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
                        </svg>
                    </div>
                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#767683] mb-1">{title}</h3>
                        <p class="text-[#767683] text-sm leading-relaxed flex-grow">{description}</p>
                        <span class="text-[#767683] font-medium text-xs mt-4">Coming Soon</span>
                    </div>
                </div>
            );
        }

        const hasMultiple = (images?.length ?? 0) > 1;

        const goPrev = $(() => {
            if (!images) return;
            activeIndex.value = (activeIndex.value - 1 + images.length) % images.length;
        });

        const goNext = $(() => {
            if (!images) return;
            activeIndex.value = (activeIndex.value + 1) % images.length;
        });

        return (
            <div class="bg-white border border-[#c6c5d3] rounded-[4px] overflow-hidden flex flex-col h-full hover:border-[#4352a5] transition-all hover:-translate-y-1 duration-200">
                {images && images.length > 0 && (
                    <div class="relative aspect-[16/10] overflow-hidden border-b border-[#c6c5d3] bg-[#f5f2fa] group">
                        <img
                            src={images[activeIndex.value]}
                            alt={imageAlt ?? title}
                            class="w-full h-full object-cover"
                            width="1366"
                            height="768"
                        />

                        {hasMultiple && (
                            <>
                                {/* Prev / Next arrows */}
                                <button
                                    type="button"
                                    onClick$={goPrev}
                                    aria-label="Previous screenshot"
                                    class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick$={goNext}
                                    aria-label="Next screenshot"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg>
                                </button>

                                {/* Dots */}
                                <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick$={() => (activeIndex.value = i)}
                                            aria-label={`Show screenshot ${i + 1}`}
                                            class={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIndex.value ? "bg-white w-3" : "bg-white/50"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="font-['Syne',sans-serif] text-base font-bold text-[#1b1b21]">{title}</h3>
                        {badge && (
                            <span class="px-2 py-0.5 bg-[#e9e7ef] text-[#454651] text-xs rounded-[4px] font-medium">
                                {badge}
                            </span>
                        )}
                    </div>
                    <p class="text-[#454651] text-sm leading-relaxed flex-grow">{description}</p>
                    <Slot />
                </div>
            </div>
        );
    },
);

export default AppShowcaseCard;
