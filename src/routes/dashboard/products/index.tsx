import { API_BASE } from "~/lib/api";
import { component$, useSignal, useComputed$, useVisibleTask$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

interface ProductSession {
    id: string;
    name: string;
    description: string;
    status: "active" | "offline";
    lastLogin: string;
    device: string;
    ip: string;
    badgeColor: string;
    launchUrl: string;
    iconLetter: string;
}

export default component$(() => {
    const products = useSignal<ProductSession[]>([
        {
            id: "after-motion",
            name: "After Motion",
            description: "Advanced timeline video compositor and animation canvas. Designed for high-performance frame sequencing and video editing.",
            status: "active",
            lastLogin: "Today, 6:42 PM",
            device: "Chrome / Linux (Ubuntu)",
            ip: "192.168.1.14",
            badgeColor: "#5c6bc0",
            launchUrl: "http://localhost:5173/editor",
            iconLetter: "AM"
        },
        {
            id: "zenfile",
            name: "ZenFile",
            description: "Distributed file manager and assets syncing vault. Allows developers to share, version control, and lock media assets.",
            status: "active",
            lastLogin: "Today, 3:15 PM",
            device: "ZenFile Desktop Client v1.2",
            ip: "192.168.1.14",
            badgeColor: "#f59e0b",
            launchUrl: "#",
            iconLetter: "ZF"
        },
        {
            id: "zenthra-mail",
            name: "Zenthra Mail",
            description: "Key-signed encrypting communications node for developers. Guarantees end-to-end encryption for team discussions.",
            status: "offline",
            lastLogin: "June 24, 2026, 11:20 AM",
            device: "Firefox / Android",
            ip: "102.16.89.204",
            badgeColor: "#767683",
            launchUrl: "#",
            iconLetter: "ZM"
        },
        {
            id: "zenthra-cloud",
            name: "Zenthra Cloud Sync",
            description: "Edge key-value blob container. Provides real-time synchronization pipelines for serverless databases.",
            status: "offline",
            lastLogin: "May 12, 2026, 04:05 PM",
            device: "Server Node / Rust CLI",
            ip: "12.230.45.89",
            badgeColor: "#8b5cf6",
            launchUrl: "#",
            iconLetter: "ZC"
        },
        {
            id: "zenthra-db",
            name: "Database Hub",
            description: "Vector query caching & database coordinator. Accelerates AI embeddings indexing and metadata storage search.",
            status: "offline",
            lastLogin: "Never connected",
            device: "Not applicable",
            ip: "Not applicable",
            badgeColor: "#ec4899",
            launchUrl: "#",
            iconLetter: "DB"
        },
        {
            id: "zenthra-console",
            name: "Dev Console",
            description: "Telemetry analytics & administration cockpit. Controls pipeline resource loads and elevations.",
            status: "active",
            lastLogin: "Today, 12:40 PM",
            device: "Chrome / Linux",
            ip: "192.168.1.14",
            badgeColor: "#10b981",
            launchUrl: "/admin",
            iconLetter: "DC"
        }
    ]);

    // View mode state: list (Split Inspector) or grid (Launcher Grid)
    const currentViewMode = useSignal<"list" | "grid">("list");



    // Master-Detail selected state
    const selectedProductId = useSignal<string | null>(null);

    // Client environment signals
    const clientIp = useSignal("Detecting...");
    const clientDevice = useSignal("Detecting...");
    const dbDevice = useSignal<string | null>(null);
    const userLoggedInProducts = useSignal<string[]>([]);

    useVisibleTask$(async () => {
        // Parse client Agent
        const ua = navigator.userAgent;
        let os = "Unknown OS";
        if (ua.includes("Windows")) os = "Windows PC";
        else if (ua.includes("Macintosh")) os = "macOS Device";
        else if (ua.includes("Linux")) os = "Linux PC";
        else if (ua.includes("Android")) os = "Android Device";
        else if (ua.includes("iPhone")) os = "iOS Device";

        let browser = "Browser";
        if (ua.includes("Chrome")) browser = "Chrome";
        else if (ua.includes("Firefox")) browser = "Firefox";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
        else if (ua.includes("Edge")) browser = "Edge";

        clientDevice.value = `${browser} on ${os}`;

        try {
            const ipRes = await fetch("https://api.ipify.org?format=json");
            if (ipRes.ok) {
                const ipData = await ipRes.json();
                clientIp.value = ipData.ip;
            }
        } catch {
            clientIp.value = "127.0.0.1";
        }

        // Fetch user last login device and logged in products from profile
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };
        const token = getCookie("zenthra_auth_token");
        if (token) {
            try {
                const res = await fetch(`${API_BASE}/api/auth/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user.lastDevice) {
                        dbDevice.value = data.user.lastDevice;
                    }
                    if (data.user.loggedInProducts) {
                        userLoggedInProducts.value = data.user.loggedInProducts;
                    }
                }
            } catch {
                // Ignore fallback
            }
        }
    });

    const visibleProducts = useComputed$(() => {
        return products.value
            .filter(p => userLoggedInProducts.value.includes(p.id))
            .map(p => {
                const status: "active" | "offline" = "active";
                let deviceVal = "";
                let ipVal = p.ip;
                let loginVal = p.lastLogin;
                
                const dbDeviceLower = (dbDevice.value || "").toLowerCase();
                
                if (dbDeviceLower.includes("android") || dbDeviceLower.includes("aftermotion")) {
                    deviceVal = "Android";
                } else if (dbDeviceLower.includes("ios") || dbDeviceLower.includes("iphone") || dbDeviceLower.includes("ipad")) {
                    deviceVal = "iOS";
                } else if (dbDeviceLower.includes("linux") || dbDeviceLower.includes("ubuntu")) {
                    deviceVal = "Linux";
                } else if (dbDeviceLower.includes("windows") || dbDeviceLower.includes("win32") || dbDeviceLower.includes("win64")) {
                    deviceVal = "Windows";
                } else if (dbDeviceLower.includes("mac") || dbDeviceLower.includes("macintosh") || dbDeviceLower.includes("macos")) {
                    deviceVal = "macOS";
                } else {
                    // Fallback defaults if no device info matched
                    if (p.id === "after-motion") {
                        deviceVal = "Android";
                    } else if (p.id === "zenfile") {
                        deviceVal = "Linux";
                    } else {
                        deviceVal = "Linux";
                    }
                }

                if (p.id === "after-motion") {
                    ipVal = clientIp.value || "192.168.1.14";
                    const nowTime = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    loginVal = `Today, ${nowTime}`;
                } else if (p.id === "zenfile") {
                    ipVal = clientIp.value || "192.168.1.15";
                    const nowTime = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    loginVal = `Today, ${nowTime}`;
                } else {
                    ipVal = clientIp.value || p.ip;
                    const nowTime = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    loginVal = `Today, ${nowTime}`;
                }
                
                return {
                    ...p,
                    status,
                    device: deviceVal,
                    ip: ipVal,
                    lastLogin: loginVal
                };
            });
    });

    const activeProduct = useComputed$(() => {
        const activeId = selectedProductId.value || visibleProducts.value[0]?.id || null;
        const found = visibleProducts.value.find(p => p.id === activeId) || null;
        return found;
    });


    return (
        <div class="space-y-8 transition-colors duration-200">
            {/* Page Header */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c6c5d3] dark:border-[#1e2030] pb-6">
                <div>
                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                        Your Connected Products
                    </h1>
                    <p class="text-sm text-[#454651] dark:text-[#94a3b8] mt-1">
                        Manage single-sign-on access, view connected devices, and launch Zenthra products.
                    </p>
                </div>

                {/* View switcher buttons */}
                <div class="flex items-center bg-[#e9e7ef] dark:bg-[#0b0c11]/85 border border-[#c6c5d3] dark:border-[#1e2030] p-1 rounded-[4px] shrink-0 self-start sm:self-auto shadow-sm">
                    <button
                        onClick$={() => currentViewMode.value = "list"}
                        class={[
                            "px-3 py-1.5 text-xs font-bold rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer border",
                            currentViewMode.value === "list"
                                ? "bg-white text-[#4352a5] border-[#c6c5d3] shadow-sm dark:bg-white/10 dark:text-white dark:border-white/10"
                                : "text-neutral-500 hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent"
                        ].join(" ")}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                        </svg>
                        List View
                    </button>
                    <button
                        onClick$={() => currentViewMode.value = "grid"}
                        class={[
                            "px-3 py-1.5 text-xs font-bold rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer border",
                            currentViewMode.value === "grid"
                                ? "bg-white text-[#4352a5] border-[#c6c5d3] shadow-sm dark:bg-white/10 dark:text-white dark:border-white/10"
                                : "text-neutral-500 hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent"
                        ].join(" ")}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Grid View
                    </button>
                </div>
            </div>

            {/* Master-Detail Split Layout */}
            <div class="flex flex-col md:flex-row gap-6 items-start w-full">
                
                {/* Left Panel: Compact Product List / Grid (60% width minus half gap) */}
                <div class="w-full md:w-[calc(60%-12px)]">
                    {visibleProducts.value.length === 0 ? (
                        <div class="flex flex-col items-center justify-center p-8 border border-dashed border-[#c6c5d3] dark:border-white/[0.08] rounded-[4px] min-h-[220px] text-center bg-[#fbf8ff] dark:bg-[#0b0c11]/40">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-neutral-400 dark:text-[#64748b] mb-3">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <p class="text-xs font-semibold text-neutral-500 dark:text-[#94a3b8]">No Active Apps Found</p>
                            <p class="text-[10px] text-neutral-400 dark:text-[#64748b] mt-1.5 max-w-[240px] leading-relaxed">
                                You haven't signed in to any zenthralabs products/applications (such as After Motion) yet. Once you log in from the application client, it will appear here.
                            </p>
                        </div>
                    ) : currentViewMode.value === "list" ? (
                        /* Master-Detail List View */
                        <div class="space-y-2">
                            {visibleProducts.value.map((p) => {
                                const isSelected = p.id === selectedProductId.value || (!selectedProductId.value && visibleProducts.value[0]?.id === p.id);
                                return (
                                    <div
                                        key={p.id}
                                        onClick$={() => selectedProductId.value = p.id}
                                        class={[
                                            "p-3 border rounded-[4px] flex items-center justify-between gap-3 cursor-pointer transition-all duration-150 select-none relative group",
                                            isSelected
                                                ? "bg-[#e9e7ef] border-[#4352a5] dark:bg-indigo-900/20 dark:border-indigo-500"
                                                : "bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border-[#c6c5d3] dark:border-[#1e2030] hover:border-[#4352a5]/50 hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]"
                                        ].join(" ")}
                                    >
                                        {/* Active indicator strip */}
                                        {isSelected && (
                                            <div class="absolute inset-y-0 left-0 w-[3px] bg-[#5c6bc0] dark:bg-indigo-500 rounded-l-[4px]" />
                                        )}

                                        <div class="flex items-center gap-3 min-w-0">
                                            <div
                                                class="w-10 h-10 rounded-[4px] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm"
                                                style={{ backgroundColor: p.badgeColor }}
                                            >
                                                {p.iconLetter}
                                            </div>
                                            <div class="min-w-0">
                                                <h3 class="font-['Syne',sans-serif] font-bold text-[#1b1b21] dark:text-white text-sm truncate">
                                                    {p.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-3 shrink-0">
                                            {p.status === "active" ? (
                                                <span class="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[4px]">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span class="inline-flex items-center gap-1 text-[9px] font-bold text-neutral-500 dark:text-[#64748b] bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded-[4px]">
                                                    Offline
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Launcher Grid View (2 Columns because of 60% container width) */
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {visibleProducts.value.map((p) => {
                                const isSelected = p.id === selectedProductId.value || (!selectedProductId.value && visibleProducts.value[0]?.id === p.id);
                                return (
                                    <div
                                        key={p.id}
                                        onClick$={() => selectedProductId.value = p.id}
                                        class={[
                                            "bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border rounded-[4px] p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:-translate-y-[1px] transition-all duration-200 relative group",
                                            isSelected
                                                ? "border-[#4352a5] bg-[#e9e7ef] dark:bg-indigo-900/20 dark:border-indigo-500"
                                                : "border-[#c6c5d3] dark:border-[#1e2030] hover:border-[#4352a5]/50"
                                        ].join(" ")}
                                    >
                                        {/* Hover/Active accent line at bottom */}
                                        <div class={[
                                            "absolute inset-x-0 bottom-0 h-[2px] transition-colors",
                                            isSelected ? "bg-[#5c6bc0]" : "bg-transparent group-hover:bg-[#5c6bc0]"
                                        ].join(" ")} />

                                        {/* Logo */}
                                        <div
                                            class="w-10 h-10 rounded-[4px] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm"
                                            style={{ backgroundColor: p.badgeColor }}
                                        >
                                            {p.iconLetter}
                                        </div>

                                        {/* Text details */}
                                        <div class="flex-grow min-w-0 pr-1">
                                            <div class="flex items-center justify-between gap-3">
                                                <h3 class="font-['Syne',sans-serif] font-bold text-[#1b1b21] dark:text-white text-sm truncate">
                                                    {p.name}
                                                </h3>
                                                <span class={`w-1.5 h-1.5 rounded-full shrink-0 ${p.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right Panel: Sticky Information Inspector Card (40% width minus half gap) */}
                <div class="w-full md:w-[calc(40%-12px)] md:sticky md:top-6 shrink-0 bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-6 shadow-sm dark:shadow-xl">
                    {!activeProduct.value ? (
                        <div class="flex flex-col items-center justify-center min-h-[300px] text-center py-10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-neutral-400 dark:text-[#64748b] mb-3 animate-pulse">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            </svg>
                            <p class="text-xs font-semibold text-neutral-500 dark:text-[#94a3b8]">No Product Selected</p>
                            <p class="text-[10px] text-neutral-400 dark:text-[#64748b] mt-1.5 max-w-[200px] leading-relaxed">
                                Select a product launcher on the left to view device telemetry and access tokens.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div class="flex items-center gap-3 pb-5 border-b border-[#c6c5d3]/50 dark:border-white/[0.05]">
                                <div
                                    class="w-12 h-12 rounded-[4px] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                                    style={{ backgroundColor: activeProduct.value.badgeColor }}
                                >
                                    {activeProduct.value.iconLetter}
                                </div>
                                <div>
                                    <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white leading-none">
                                        {activeProduct.value.name}
                                    </h3>
                                    <span class={[
                                        "inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-[4px] mt-2",
                                        activeProduct.value.status === "active"
                                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                                            : "text-neutral-500 dark:text-[#64748b] bg-neutral-100 dark:bg-white/5"
                                    ].join(" ")}>
                                        {activeProduct.value.status === "active" ? "Connected Session" : "Offline"}
                                    </span>
                                </div>
                            </div>

                            <div class="py-5 space-y-5">
                                <div>
                                    <h4 class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-[#64748b] font-mono mb-2">Description</h4>
                                    <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                        {activeProduct.value.description}
                                    </p>
                                </div>

                                <div class="space-y-3 bg-white dark:bg-[#09090b]/50 border border-[#c6c5d3] dark:border-white/[0.04] rounded-[4px] p-4 text-[11px] font-sans">
                                    <div class="flex justify-between items-center py-0.5">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Last Login</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{activeProduct.value.lastLogin}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Device Type</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-semibold truncate max-w-[150px]">{activeProduct.value.device}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">IP Address</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{activeProduct.value.ip}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Connected Products — Zenthra Developer Portal",
    meta: [
        { name: "description", content: "Your connected products and active login sessions." }
    ]
};
