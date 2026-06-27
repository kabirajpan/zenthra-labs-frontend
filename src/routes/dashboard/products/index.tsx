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
                let deviceVal = p.device;
                let ipVal = p.ip;
                let loginVal = p.lastLogin;
                
                if (p.id === "after-motion") {
                    deviceVal = dbDevice.value || "Android Device";
                    ipVal = clientIp.value || "192.168.1.14";
                    const nowTime = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    loginVal = `Today, ${nowTime}`;
                } else if (p.id === "zenfile") {
                    deviceVal = dbDevice.value || "Linux Desktop Client";
                    ipVal = clientIp.value || "192.168.1.15";
                    const nowTime = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    loginVal = `Today, ${nowTime}`;
                } else {
                    deviceVal = dbDevice.value || p.device;
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

            {/* Integrated Products Layout */}
            <div class="w-full">
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
                    /* Unified List View (Full Width) */
                    <div class="space-y-4 max-w-5xl">
                        {visibleProducts.value.map((p) => (
                            <div
                                key={p.id}
                                class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-6 shadow-sm dark:shadow-xl flex flex-col md:flex-row gap-6 justify-between items-stretch transition-all"
                            >
                                {/* Left Side: App Icon and Info */}
                                <div class="flex-grow flex flex-col justify-between min-w-0">
                                    <div>
                                        <div class="flex items-center gap-3 pb-3 border-b border-[#c6c5d3]/50 dark:border-white/[0.05]">
                                            <div
                                                class="w-12 h-12 rounded-[4px] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                                                style={{ backgroundColor: p.badgeColor }}
                                            >
                                                {p.iconLetter}
                                            </div>
                                            <div class="min-w-0">
                                                <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white leading-none truncate">
                                                    {p.name}
                                                </h3>
                                                <div class="mt-1.5">
                                                    {p.status === "active" ? (
                                                        <span class="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[4px]">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            Active Session
                                                        </span>
                                                    ) : (
                                                        <span class="inline-flex items-center gap-1 text-[9px] font-bold text-neutral-500 dark:text-[#64748b] bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded-[4px]">
                                                            Offline
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="py-4">
                                            <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                                {p.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Telemetry Specs */}
                                <div class="w-full md:w-[320px] shrink-0 flex flex-col justify-center">
                                    <div class="space-y-2.5 bg-white dark:bg-[#09090b]/50 border border-[#c6c5d3] dark:border-white/[0.04] rounded-[4px] p-4 text-[11px] font-sans">
                                        <div class="flex justify-between items-center py-0.5">
                                            <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Last Login</span>
                                            <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{p.lastLogin}</span>
                                        </div>
                                        <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                            <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Device Type</span>
                                            <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-semibold truncate max-w-[180px]">{p.device}</span>
                                        </div>
                                        <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                            <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">IP Address</span>
                                            <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{p.ip}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Unified Grid View (Responsive Columns) */
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                        {visibleProducts.value.map((p) => (
                            <div
                                key={p.id}
                                class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-6 shadow-sm dark:shadow-xl flex flex-col justify-between min-h-[340px] transition-all"
                            >
                                <div>
                                    {/* Header */}
                                    <div class="flex items-center gap-3 pb-4 border-b border-[#c6c5d3]/50 dark:border-white/[0.05]">
                                        <div
                                            class="w-12 h-12 rounded-[4px] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                                            style={{ backgroundColor: p.badgeColor }}
                                        >
                                            {p.iconLetter}
                                        </div>
                                        <div class="min-w-0">
                                            <h3 class="font-['Syne',sans-serif] font-bold text-base text-[#1b1b21] dark:text-white leading-none truncate">
                                                {p.name}
                                            </h3>
                                            <div class="mt-1.5">
                                                {p.status === "active" ? (
                                                    <span class="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[4px]">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        Active Session
                                                    </span>
                                                ) : (
                                                    <span class="inline-flex items-center gap-1 text-[9px] font-bold text-neutral-500 dark:text-[#64748b] bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded-[4px]">
                                                        Offline
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div class="py-4">
                                        <p class="text-xs text-[#454651] dark:text-[#94a3b8] leading-relaxed">
                                            {p.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Telemetry Details */}
                                <div class="space-y-2 bg-white dark:bg-[#09090b]/50 border border-[#c6c5d3] dark:border-white/[0.04] rounded-[4px] p-4 text-[11px] font-sans">
                                    <div class="flex justify-between items-center py-0.5">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Last Login</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{p.lastLogin}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">Device Type</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-semibold truncate max-w-[180px]">{p.device}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-0.5 border-t border-neutral-200 dark:border-white/[0.03] pt-2">
                                        <span class="text-neutral-400 dark:text-[#64748b] font-medium font-mono uppercase tracking-wider text-[8px]">IP Address</span>
                                        <span class="text-[#1b1b21] dark:text-[#e2e8f0] font-mono font-semibold">{p.ip}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
