export interface TreeNode {
    label: string;
    path: string;
    type: "folder" | "file";
    fileId?: string;
    children?: TreeNode[];
}

export interface DocSequenceItem {
    id: string;
    label: string;
}

export const docSequence: DocSequenceItem[] = [
    { id: "intro", label: "Introduction" },
    { id: "hello-world", label: "Hello World" },
    { id: "arch-overview", label: "Overview" },
    { id: "arch-render", label: "Render Pipeline" },
    { id: "arch-layout", label: "Layout Engine" },
    { id: "arch-state", label: "State Management" },
    { id: "arch-lazy", label: "LazyContainer Virtualization" },
    { id: "widget-container", label: "Container" },
    { id: "widget-panel-card", label: "Panel & Card" },
    { id: "widget-window-dialog", label: "Window & Dialog" },
    { id: "widget-title-bar", label: "Title Bar & Window Controls" },
    { id: "widget-lazy", label: "LazyContainer" },
    { id: "widget-text-btn", label: "Text & Button" },
    { id: "widget-image", label: "Image" },
    { id: "widget-indicators", label: "Slider & ProgressBar" },
    { id: "widget-inputs", label: "Input & TextArea" },
    { id: "widget-selection", label: "Checkbox & Switch" },
    { id: "widget-menus", label: "Dropdown & Menu" },
    { id: "custom-shaders", label: "Custom WGSL Shaders" },
    { id: "compositor-blur", label: "Wayland / X11 Compositor Blur" },
];

export const treeData: TreeNode[] = [
    {
        label: "Getting Started",
        path: "getting-started",
        type: "folder",
        children: [
            { label: "Introduction", path: "getting-started/intro", type: "file", fileId: "intro" },
            { label: "Hello World", path: "getting-started/hello-world", type: "file", fileId: "hello-world" },
        ]
    },
    {
        label: "Architecture",
        path: "architecture",
        type: "folder",
        children: [
            { label: "Overview", path: "architecture/overview", type: "file", fileId: "arch-overview" },
            { label: "Render Pipeline", path: "architecture/render", type: "file", fileId: "arch-render" },
            { label: "Layout Engine", path: "architecture/layout", type: "file", fileId: "arch-layout" },
            { label: "State Management", path: "architecture/state", type: "file", fileId: "arch-state" },
            { label: "LazyContainer Virtualization", path: "architecture/lazy", type: "file", fileId: "arch-lazy" },
        ]
    },
    {
        label: "Widgets",
        path: "widgets",
        type: "folder",
        children: [
            {
                label: "Layout & Windows",
                path: "widgets/layout",
                type: "folder",
                children: [
                    { label: "Container", path: "widgets/layout/container", type: "file", fileId: "widget-container" },
                    { label: "Panel & Card", path: "widgets/layout/panel-card", type: "file", fileId: "widget-panel-card" },
                    { label: "Window & Dialog", path: "widgets/layout/window-dialog", type: "file", fileId: "widget-window-dialog" },
                    { label: "Title Bar & Window Controls", path: "widgets/layout/title-bar", type: "file", fileId: "widget-title-bar" },
                    { label: "LazyContainer", path: "widgets/layout/lazy", type: "file", fileId: "widget-lazy" },
                ]
            },
            {
                label: "Basic Controls",
                path: "widgets/controls",
                type: "folder",
                children: [
                    { label: "Text & Button", path: "widgets/controls/text-btn", type: "file", fileId: "widget-text-btn" },
                    { label: "Image", path: "widgets/controls/image", type: "file", fileId: "widget-image" },
                    { label: "Slider & ProgressBar", path: "widgets/controls/indicators", type: "file", fileId: "widget-indicators" },
                ]
            },
            {
                label: "Inputs & Selection",
                path: "widgets/selection",
                type: "folder",
                children: [
                    { label: "Input & TextArea", path: "widgets/selection/inputs", type: "file", fileId: "widget-inputs" },
                    { label: "Checkbox & Switch", path: "widgets/selection/selection", type: "file", fileId: "widget-selection" },
                    { label: "Dropdown & Menu", path: "widgets/selection/menus", type: "file", fileId: "widget-menus" },
                ]
            }
        ]
    },
    {
        label: "Advanced Customization",
        path: "advanced",
        type: "folder",
        children: [
            { label: "Custom WGSL Shaders", path: "advanced/shaders", type: "file", fileId: "custom-shaders" },
            { label: "Compositor Blur", path: "advanced/blur", type: "file", fileId: "compositor-blur" },
        ]
    }
];

export const filterTree = (nodes: TreeNode[], query: string): TreeNode[] => {
    if (!query) return nodes;
    const lowerQuery = query.toLowerCase();

    return nodes
        .map(node => {
            if (node.type === "file") {
                return node.label.toLowerCase().includes(lowerQuery) ? node : null;
            } else if (node.type === "folder") {
                const filteredChildren = filterTree(node.children || [], query);
                if (filteredChildren.length > 0 || node.label.toLowerCase().includes(lowerQuery)) {
                    return {
                        ...node,
                        children: filteredChildren
                    };
                }
                return null;
            }
            return null;
        })
        .filter((node): node is TreeNode => node !== null);
};

export const getInitialExpanded = (docId: string): Record<string, boolean> => {
    const base: Record<string, boolean> = {
        "getting-started": true,
        "architecture": false,
        "widgets": true,
        "widgets/layout": true,
        "widgets/controls": false,
        "widgets/selection": false,
        "advanced": false,
    };
    if (docId.startsWith("arch-")) {
        base["architecture"] = true;
    } else if (docId.startsWith("widget-")) {
        base["widgets"] = true;
        if (["widget-container", "widget-panel-card", "widget-window-dialog", "widget-title-bar", "widget-lazy"].includes(docId)) {
            base["widgets/layout"] = true;
        } else if (["widget-text-btn", "widget-image", "widget-indicators"].includes(docId)) {
            base["widgets/controls"] = true;
        } else if (["widget-inputs", "widget-selection", "widget-menus"].includes(docId)) {
            base["widgets/selection"] = true;
        }
    } else if (["custom-shaders", "compositor-blur"].includes(docId)) {
        base["advanced"] = true;
    }
    return base;
};
