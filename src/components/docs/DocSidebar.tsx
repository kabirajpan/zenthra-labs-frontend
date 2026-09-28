import { component$, PropFunction, Signal } from "@builder.io/qwik";
import type { TreeNode } from "./docData";

export const TreeNodeView = component$<{
    node: TreeNode;
    level: number;
    activeDoc: Signal<string>;
    expandedPaths: Signal<Record<string, boolean>>;
    onToggle: PropFunction<(path: string) => void>;
    onSelectFile: PropFunction<(fileId: string) => void>;
}>(({ node, level, activeDoc, expandedPaths, onToggle, onSelectFile }) => {
    const isFolder = node.type === "folder";
    const isExpanded = expandedPaths.value[node.path] || false;
    const isActive = !isFolder && activeDoc.value === node.fileId;

    return (
        <div class="w-full flex flex-col">
            <button
                onClick$={async () => {
                    if (isFolder) {
                        await onToggle(node.path);
                    } else if (node.fileId) {
                        await onSelectFile(node.fileId);
                    }
                }}
                style={{ paddingLeft: `${level * 12 + 6}px` }}
                class={[
                    "w-full flex items-center gap-2 py-1.5 pr-2 text-left text-xs font-['Inter',sans-serif] hover:bg-neutral-100 dark:hover:bg-[#12141f] rounded-[4px] transition-all cursor-pointer group select-none",
                    isActive
                        ? "text-[#5c6bc0] dark:text-[#818cf8] bg-indigo-50 dark:bg-[#1a1e2e] font-bold border-l-2 border-[#5c6bc0] -ml-[2px]"
                        : "text-neutral-600 dark:text-[#94a3b8] font-medium"
                ].join(" ")}
            >
                {isFolder ? (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class={[
                            "w-3 h-3 text-neutral-400 dark:text-[#64748b] shrink-0 transition-transform duration-150",
                            isExpanded ? "rotate-90" : ""
                        ].join(" ")}
                    >
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                ) : (
                    <span class="w-3 shrink-0" />
                )}

                <span class="truncate">{node.label}</span>
            </button>

            {isFolder && isExpanded && node.children && (
                <div class="w-full flex flex-col mt-0.5">
                    {node.children.map((child) => (
                        <TreeNodeView
                            key={child.path}
                            node={child}
                            level={level + 1}
                            activeDoc={activeDoc}
                            expandedPaths={expandedPaths}
                            onToggle={onToggle}
                            onSelectFile={onSelectFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

export const DocSidebar = component$<{
    filteredTree: TreeNode[];
    searchQuery: Signal<string>;
    activeDoc: Signal<string>;
    expandedPaths: Signal<Record<string, boolean>>;
    onToggle$: PropFunction<(path: string) => void>;
    onSelectFile$: PropFunction<(fileId: string) => void>;
}>(({ filteredTree, searchQuery, activeDoc, expandedPaths, onToggle$, onSelectFile$ }) => {
    return (
        <aside class="w-full lg:w-72 shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] flex flex-col">
            <div class="border border-neutral-200 dark:border-[#1e2230] rounded-[6px] bg-white dark:bg-[#0e1017] p-3 shadow-lg font-['Inter',sans-serif] flex flex-col h-full overflow-hidden transition-colors">
                <div class="mb-3 shrink-0">
                    <div class="relative">
                        <input
                            type="text"
                            placeholder="Filter documentation..."
                            value={searchQuery.value}
                            onInput$={(e) => {
                                searchQuery.value = (e.target as HTMLInputElement).value;
                            }}
                            class="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#07080d] border border-neutral-200 dark:border-[#1e2230] rounded-[4px] focus:outline-none focus:border-[#5c6bc0] text-neutral-900 dark:text-[#e2e8f0] placeholder-neutral-400 dark:placeholder-[#64748b] transition-colors"
                        />
                        <svg
                            class="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-400 dark:text-[#64748b]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchQuery.value && (
                            <button
                                onClick$={() => {
                                    searchQuery.value = "";
                                }}
                                class="absolute right-2.5 top-2 text-xs text-neutral-400 dark:text-[#64748b] hover:text-neutral-700 dark:hover:text-white"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <div class="text-[10px] font-bold text-neutral-500 dark:text-[#64748b] uppercase tracking-wider mb-2 px-1 shrink-0 font-['JetBrains_Mono',monospace]">
                    Zenthra Architecture &amp; APIs
                </div>

                <nav class="flex-grow overflow-y-auto space-y-0.5 pr-1 -mr-1">
                    {filteredTree.length > 0 ? (
                        filteredTree.map((node) => (
                            <TreeNodeView
                                key={node.path}
                                node={node}
                                level={0}
                                activeDoc={activeDoc}
                                expandedPaths={expandedPaths}
                                onToggle={onToggle$}
                                onSelectFile={onSelectFile$}
                            />
                        ))
                    ) : (
                        <div class="py-6 text-center text-xs text-neutral-500 dark:text-[#64748b] font-medium italic">
                            No matches found
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
});
