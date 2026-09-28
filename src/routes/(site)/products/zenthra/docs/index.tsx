import {
    component$,
    useSignal,
    useVisibleTask$,
    useTask$,
    $,
} from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import {
    docSequence,
    treeData,
    filterTree,
    getInitialExpanded,
    type TreeNode,
} from "~/components/docs/docData";
import { DocSidebar } from "~/components/docs/DocSidebar";
import { DocPagination } from "~/components/docs/DocPagination";
import { DocContent } from "~/components/docs/content/DocContent";

export default component$(() => {
    const loc = useLocation();
    const queryDoc = loc.url.searchParams.get("doc");
    const validInitial = queryDoc && docSequence.some(d => d.id === queryDoc) ? queryDoc : "intro";

    const activeDoc = useSignal(validInitial);
    const expandedPaths = useSignal<Record<string, boolean>>(getInitialExpanded(validInitial));
    const searchQuery = useSignal("");

    const autoExpandPathForFile = $((fileId: string) => {
        if (fileId.startsWith("widget-")) {
            expandedPaths.value = { ...expandedPaths.value, widgets: true };
            if (["widget-container", "widget-panel-card", "widget-window-dialog", "widget-title-bar", "widget-lazy"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, widgets: true, "widgets/layout": true };
            } else if (["widget-text-btn", "widget-image", "widget-indicators"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, widgets: true, "widgets/controls": true };
            } else if (["widget-inputs", "widget-selection", "widget-menus"].includes(fileId)) {
                expandedPaths.value = { ...expandedPaths.value, widgets: true, "widgets/selection": true };
            }
        } else if (fileId.startsWith("arch-")) {
            expandedPaths.value = { ...expandedPaths.value, architecture: true };
        } else if (["intro", "hello-world"].includes(fileId)) {
            expandedPaths.value = { ...expandedPaths.value, "getting-started": true };
        } else if (["custom-shaders", "compositor-blur"].includes(fileId)) {
            expandedPaths.value = { ...expandedPaths.value, advanced: true };
        }
    });

    // Keep activeDoc synced with browser URL and history
    useVisibleTask$(({ cleanup }) => {
        try {
            // Clean up any legacy saved doc so intro remains the clean default
            localStorage.removeItem("zenthra_active_doc");
        } catch (e) {
            void e;
        }

        const urlDoc = new URL(window.location.href).searchParams.get("doc");
        if (urlDoc) {
            autoExpandPathForFile(urlDoc);
        }

        const onPopState = () => {
            const currentParam = new URL(window.location.href).searchParams.get("doc") || "intro";
            if (activeDoc.value !== currentParam && docSequence.some(d => d.id === currentParam)) {
                activeDoc.value = currentParam;
                autoExpandPathForFile(currentParam);
            }
        };
        window.addEventListener("popstate", onPopState);
        cleanup(() => window.removeEventListener("popstate", onPopState));
    });

    const togglePath = $((path: string) => {
        expandedPaths.value = {
            ...expandedPaths.value,
            [path]: !expandedPaths.value[path],
        };
    });

    const selectFile = $((fileId: string) => {
        activeDoc.value = fileId;
        autoExpandPathForFile(fileId);
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            if (fileId !== "intro") {
                url.searchParams.set("doc", fileId);
            } else {
                url.searchParams.delete("doc");
            }
            window.history.replaceState(null, "", url.toString());
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // Automatically expand tree folders containing search matches
    useTask$(({ track }) => {
        track(() => searchQuery.value);
        const query = searchQuery.value.trim().toLowerCase();
        if (query !== "") {
            const newExpanded = { ...expandedPaths.value };

            const checkAndExpand = (nodes: TreeNode[]) => {
                nodes.forEach(node => {
                    if (node.type === "folder") {
                        const matches = node.label.toLowerCase().includes(query) ||
                            (node.children && hasAnyMatch(node.children, query));
                        if (matches) {
                            newExpanded[node.path] = true;
                        }
                        if (node.children) {
                            checkAndExpand(node.children);
                        }
                    }
                });
            };

            const hasAnyMatch = (nodes: TreeNode[], q: string): boolean => {
                return nodes.some(n => {
                    if (n.label.toLowerCase().includes(q)) return true;
                    if (n.type === "folder" && n.children) {
                        return hasAnyMatch(n.children, q);
                    }
                    return false;
                });
            };

            checkAndExpand(treeData);
            expandedPaths.value = newExpanded;
        }
    });

    const filteredTree = filterTree(treeData, searchQuery.value);

    // Find current index in pagination sequence
    const currentIndex = docSequence.findIndex(item => item.id === activeDoc.value);
    const prevDoc = currentIndex > 0 ? docSequence[currentIndex - 1] : null;
    const nextDoc = currentIndex < docSequence.length - 1 ? docSequence[currentIndex + 1] : null;

    return (
        <div class="relative min-h-screen bg-neutral-50/50 dark:bg-[#07080d] text-neutral-900 dark:text-[#e2e8f0] transition-colors duration-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
                {/* Breadcrumbs */}
                <div class="flex items-center gap-2 mb-6 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/products" class="text-neutral-500 dark:text-[#94a3b8] hover:text-[#5c6bc0] dark:hover:text-[#818cf8] transition-colors">Products</a>
                    <span class="text-neutral-300 dark:text-[#1e2230]">/</span>
                    <a href="/products/zenthra" class="text-neutral-500 dark:text-[#94a3b8] hover:text-[#5c6bc0] dark:hover:text-[#818cf8] transition-colors">Zenthra</a>
                    <span class="text-neutral-300 dark:text-[#1e2230]">/</span>
                    <span class="text-neutral-900 dark:text-white font-semibold">Documentation</span>
                </div>

                <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                    {/* Left Sidebar */}
                    <DocSidebar
                        filteredTree={filteredTree}
                        searchQuery={searchQuery}
                        activeDoc={activeDoc}
                        expandedPaths={expandedPaths}
                        onToggle$={togglePath}
                        onSelectFile$={selectFile}
                    />

                    {/* Main Content Area */}
                    <div class="flex-1 min-w-0 w-full">
                        <article class="doc-article border border-neutral-200 dark:border-[#1e2230] rounded-[6px] bg-white dark:bg-[#0e1017] p-6 sm:p-10 shadow-xl font-['Inter',sans-serif] text-neutral-900 dark:text-[#e2e8f0] transition-colors duration-200">
                            <DocContent activeDoc={activeDoc.value} />

                            <DocPagination
                                prevDoc={prevDoc}
                                nextDoc={nextDoc}
                                onSelect$={selectFile}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Documentation — Zenthra UI Framework",
    meta: [
        { name: "description", content: "Explore tutorials, API guides, and architecture manuals for Zenthra UI framework." },
    ],
};
