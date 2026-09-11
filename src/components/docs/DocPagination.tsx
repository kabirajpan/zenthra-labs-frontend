import { component$, PropFunction } from "@builder.io/qwik";
import type { DocSequenceItem } from "./docData";

export const DocPagination = component$<{
    prevDoc: DocSequenceItem | null;
    nextDoc: DocSequenceItem | null;
    onSelect$: PropFunction<(fileId: string) => void>;
}>(({ prevDoc, nextDoc, onSelect$ }) => {
    return (
        <div class="mt-12 pt-6 border-t border-[#e9e7ef] flex justify-between gap-4">
            {prevDoc ? (
                <button
                    onClick$={() => onSelect$(prevDoc.id)}
                    class="flex flex-col text-left py-2 px-4 rounded-[4px] hover:bg-[#e9e7ef]/30 text-[#4352a5] border border-[#c6c5d3] max-w-[220px] w-full cursor-pointer select-none transition-all"
                >
                    <span class="text-[10px] text-[#767683] uppercase font-bold mb-1">Previous</span>
                    <span class="text-sm font-semibold truncate">{prevDoc.label}</span>
                </button>
            ) : (
                <div class="max-w-[220px] w-full" />
            )}

            {nextDoc ? (
                <button
                    onClick$={() => onSelect$(nextDoc.id)}
                    class="flex flex-col text-right py-2 px-4 rounded-[4px] hover:bg-[#e9e7ef]/30 text-[#4352a5] border border-[#c6c5d3] max-w-[220px] w-full cursor-pointer select-none transition-all ml-auto"
                >
                    <span class="text-[10px] text-[#767683] uppercase font-bold mb-1">Next</span>
                    <span class="text-sm font-semibold truncate">{nextDoc.label}</span>
                </button>
            ) : (
                <div class="max-w-[220px] w-full ml-auto" />
            )}
        </div>
    );
});
