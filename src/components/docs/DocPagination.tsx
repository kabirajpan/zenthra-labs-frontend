import { component$, PropFunction } from "@builder.io/qwik";
import type { DocSequenceItem } from "./docData";

export const DocPagination = component$<{
    prevDoc: DocSequenceItem | null;
    nextDoc: DocSequenceItem | null;
    onSelect$: PropFunction<(fileId: string) => void>;
}>(({ prevDoc, nextDoc, onSelect$ }) => {
    return (
        <div class="mt-12 pt-6 border-t border-neutral-200 dark:border-[#1e2230] flex justify-between gap-4">
            {prevDoc ? (
                <button
                    onClick$={() => onSelect$(prevDoc.id)}
                    class="flex flex-col text-left py-2 px-4 rounded-[4px] hover:bg-neutral-100 dark:hover:bg-[#12141f] text-[#5c6bc0] dark:text-[#818cf8] border border-neutral-200 dark:border-[#1e2230] bg-neutral-50 dark:bg-[#0e1017] max-w-[220px] w-full cursor-pointer select-none transition-all"
                >
                    <span class="text-[10px] text-neutral-500 dark:text-[#64748b] uppercase font-bold mb-1">Previous</span>
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{prevDoc.label}</span>
                </button>
            ) : (
                <div class="max-w-[220px] w-full" />
            )}

            {nextDoc ? (
                <button
                    onClick$={() => onSelect$(nextDoc.id)}
                    class="flex flex-col text-right py-2 px-4 rounded-[4px] hover:bg-neutral-100 dark:hover:bg-[#12141f] text-[#5c6bc0] dark:text-[#818cf8] border border-neutral-200 dark:border-[#1e2230] bg-neutral-50 dark:bg-[#0e1017] max-w-[220px] w-full cursor-pointer select-none transition-all ml-auto"
                >
                    <span class="text-[10px] text-neutral-500 dark:text-[#64748b] uppercase font-bold mb-1">Next</span>
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{nextDoc.label}</span>
                </button>
            ) : (
                <div class="max-w-[220px] w-full ml-auto" />
            )}
        </div>
    );
});
