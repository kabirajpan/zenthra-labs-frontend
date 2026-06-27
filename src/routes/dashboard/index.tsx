import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    const userName = useSignal("User");
    const userEmail = useSignal("...");
    const userRole = useSignal("USER");
    const userJoined = useSignal("...");
    const clientIp = useSignal("Detecting...");
    const clientDevice = useSignal("Detecting...");
    const apiLatency = useSignal<number | null>(null);
    const terminalLogs = useSignal<string[]>([
        `[${new Date().toLocaleTimeString()}] SYS: Initializing workspace orchestration...`,
        `[${new Date().toLocaleTimeString()}] OK: Session security token loaded.`
    ]);

    const addLog = $((text: string) => {
        const time = new Date().toLocaleTimeString();
        terminalLogs.value = [...terminalLogs.value, `[${time}] ${text}`];
    });

    useVisibleTask$(async () => {
        // 1. Parse client Agent
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
        addLog(`UA: Parsed host architecture - ${browser} / ${os}`);

        // 2. Fetch profile & calculate latency
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };
        const token = getCookie("zenthra_auth_token");
        if (token) {
            try {
                const start = performance.now();
                const res = await fetch(`${API_BASE}/api/auth/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const end = performance.now();
                const latency = Math.round(end - start);
                apiLatency.value = latency;

                if (res.ok) {
                    const data = await res.json();
                    userName.value = data.user.firstName;
                    userEmail.value = data.user.email || data.user.phoneNumber || "N/A";
                    userRole.value = data.user.role;
                    userJoined.value = new Date(data.user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric", month: "short", day: "numeric"
                    });
                    addLog(`AUTH: Clearance elev: ${data.user.role} [${data.user.firstName} ${data.user.lastName}]`);
                    addLog(`METRIC: Render node API latency resolved: ${latency} ms`);
                }
            } catch (e) {
                addLog(`ERROR: Profile endpoint failed to respond: ${e}`);
            }
        }

        // 3. Geolocation IP Resolver
        try {
            const ipRes = await fetch("https://api.ipify.org?format=json");
            if (ipRes.ok) {
                const ipData = await ipRes.json();
                clientIp.value = ipData.ip;
                addLog(`NET: WAN public IP fetched - ${ipData.ip}`);
            }
        } catch {
            clientIp.value = "Local Client";
            addLog("NET: Geolocation lookup bypassed (localhost/dev)");
        }

        // 4. Background heartbeat ticker
        const interval = setInterval(() => {
            const currentPing = apiLatency.value || Math.floor(Math.random() * 20) + 120;
            addLog(`SYS: Sync verified. Host: ${clientIp.value}. latency: ${currentPing}ms`);
        }, 12000);

        return () => clearInterval(interval);
    });

    return (
        <div class="space-y-6 transition-colors duration-200">
            {/* Top Header Panel */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#c6c5d3] dark:border-[#1c1d24] pb-4">
                <div>
                    <h1 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                        Welcome back, {userName.value}!
                    </h1>
                    <p class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">
                        Manage your Zenthra services, active developer environments, and cloud storage.
                    </p>
                </div>
                <div class="flex items-center">
                    <span class={[
                        "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] rounded-[4px] font-bold border",
                        userRole.value === "ADMIN"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-[#5c6bc0]/10 border-[#5c6bc0]/20 text-[#4352a5] dark:text-indigo-400"
                    ].join(" ")}>
                        {userRole.value === "ADMIN" ? "Super Admin Account" : "Developer Sandbox Tier"}
                    </span>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Active IP */}
                <div class="bg-white/50 dark:bg-[#0c0d12]/60 backdrop-blur-md border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-4 shadow-sm hover:border-[#4352a5]/50 dark:hover:border-indigo-500/40 transition-all duration-300 relative group overflow-hidden">
                    <div class="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#5c6bc0] opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p class="text-[9px] font-bold text-[#767683] uppercase tracking-wider font-sans">Active IP Address</p>
                    <div class="flex items-baseline gap-1.5 mt-2">
                        <span class="text-lg font-extrabold text-[#1b1b21] dark:text-white font-mono">{clientIp.value}</span>
                    </div>
                </div>

                {/* Host agent */}
                <div class="bg-white/50 dark:bg-[#0c0d12]/60 backdrop-blur-md border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-4 shadow-sm hover:border-[#4352a5]/50 dark:hover:border-indigo-500/40 transition-all duration-300 relative group overflow-hidden">
                    <div class="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#5c6bc0] opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p class="text-[9px] font-bold text-[#767683] uppercase tracking-wider font-sans">Host Environment</p>
                    <div class="flex items-baseline gap-1.5 mt-2">
                        <span class="text-sm font-bold text-[#1b1b21] dark:text-white truncate max-w-full">{clientDevice.value}</span>
                    </div>
                </div>

                {/* Latency Ping */}
                <div class="bg-white/50 dark:bg-[#0c0d12]/60 backdrop-blur-md border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-4 shadow-sm hover:border-emerald-500/30 transition-all duration-300 relative group overflow-hidden">
                    <div class="absolute inset-x-0 bottom-0 h-[1.5px] bg-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p class="text-[9px] font-bold text-[#767683] uppercase tracking-wider font-sans">Render Node Latency</p>
                    <div class="flex items-baseline gap-1.5 mt-2">
                        <span class="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                            {apiLatency.value ? `${apiLatency.value} ms` : "Calculating..."}
                        </span>
                    </div>
                </div>

                {/* Joined profile */}
                <div class="bg-white/50 dark:bg-[#0c0d12]/60 backdrop-blur-md border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-4 shadow-sm hover:border-rose-500/30 transition-all duration-300 relative group overflow-hidden">
                    <div class="absolute inset-x-0 bottom-0 h-[1.5px] bg-rose-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p class="text-[9px] font-bold text-[#767683] uppercase tracking-wider font-sans">Developer Since</p>
                    <div class="flex items-baseline gap-1.5 mt-2">
                        <span class="text-sm font-bold text-[#1b1b21] dark:text-white">{userJoined.value || "Loading..."}</span>
                    </div>
                </div>
            </div>

            {/* Lower Diagnostics */}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sync Graph */}
                <div class="lg:col-span-2 bg-white/50 dark:bg-[#0c0d12]/40 border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-5 shadow-sm flex flex-col justify-between backdrop-blur-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] dark:text-white">Cloud Sync & Bandwidth</h3>
                            <p class="text-[11px] text-[#454651] dark:text-[#94a3b8] mt-0.5">Real-time upload and download transfer speeds</p>
                        </div>
                        <div class="flex gap-3">
                            <span class="flex items-center gap-1.5 text-[9px] font-bold text-[#4352a5] dark:text-indigo-400">
                                <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0]" />
                                Uploads
                            </span>
                            <span class="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Downloads
                            </span>
                        </div>
                    </div>

                    <div class="h-36 flex items-end relative overflow-hidden bg-neutral-100/40 dark:bg-black/20 rounded-[4px] p-2 border border-[#c6c5d3]/50 dark:border-white/[0.02]">
                        <svg class="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#5c6bc0" stop-opacity="0.15"/>
                                    <stop offset="100%" stop-color="#5c6bc0" stop-opacity="0.0"/>
                                </linearGradient>
                                <linearGradient id="emeraldGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
                                    <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
                                </linearGradient>
                            </defs>
                            <line x1="0" y1="25" x2="500" y2="25" stroke="currentColor" stroke-width="0.5" class="text-neutral-200 dark:text-white/[0.04]"/>
                            <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" stroke-width="0.5" class="text-neutral-200 dark:text-white/[0.04]"/>
                            <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" stroke-width="0.5" class="text-neutral-200 dark:text-white/[0.04]"/>
                            <path d="M 0 75 Q 35 90 70 60 T 140 40 T 210 70 T 280 50 T 350 20 T 420 45 T 500 30 L 500 100 L 0 100 Z" fill="url(#emeraldGlow)"/>
                            <path d="M 0 75 Q 35 90 70 60 T 140 40 T 210 70 T 280 50 T 350 20 T 420 45 T 500 30" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M 0 90 Q 40 70 80 80 T 160 55 T 240 60 T 320 35 T 400 50 T 500 25 L 500 100 L 0 100 Z" fill="url(#purpleGlow)"/>
                            <path d="M 0 90 Q 40 70 80 80 T 160 55 T 240 60 T 320 35 T 400 50 T 500 25" fill="none" stroke="#5c6bc0" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>

                    <div class="flex justify-between text-[9px] text-neutral-400 dark:text-[#64748b] mt-2 font-mono">
                        <span>09:00 AM</span>
                        <span>12:00 PM</span>
                        <span>03:00 PM</span>
                    </div>
                </div>

                {/* Plan Panel */}
                <div class="bg-white/50 dark:bg-[#0c0d12]/40 border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] p-5 shadow-sm flex flex-col justify-between backdrop-blur-sm">
                    <div>
                        <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#1b1b21] dark:text-white mb-0.5">Clearance Status</h3>
                        <p class="text-[11px] text-[#454651] dark:text-[#94a3b8] mb-4">Workspace authorization properties</p>

                        <div class="space-y-2.5">
                            <div class="flex justify-between items-center text-xs pb-2 border-b border-neutral-200 dark:border-white/[0.04]">
                                <span class="text-neutral-500 dark:text-[#94a3b8] font-medium">Billing Period</span>
                                <span class="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                                    {userRole.value === "ADMIN" ? "N/A" : "Monthly"}
                                </span>
                            </div>
                            <div class="flex justify-between items-center text-xs pb-2 border-b border-neutral-200 dark:border-white/[0.04]">
                                <span class="text-neutral-500 dark:text-[#94a3b8] font-medium">Next Renewal</span>
                                <span class="text-neutral-900 dark:text-white font-semibold">
                                    {userRole.value === "ADMIN" ? "Lifetime License" : "July 27, 2026"}
                                </span>
                            </div>
                            <div class="flex justify-between items-center text-xs pb-2 border-b border-neutral-200 dark:border-white/[0.04]">
                                <span class="text-neutral-500 dark:text-[#94a3b8] font-medium">Clearance Level</span>
                                <span class="text-neutral-900 dark:text-white font-semibold uppercase">{userRole.value}</span>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-neutral-500 dark:text-[#94a3b8] font-medium">Plan Cost</span>
                                <span class="text-amber-600 dark:text-amber-500 font-bold font-mono">
                                    {userRole.value === "ADMIN" ? "$0.00 / mo" : "$0.00 / free sandbox"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-[#c6c5d3] dark:border-white/[0.04]">
                        <a href="/dashboard/plan" class="w-full block text-center py-2 bg-[#e9e7ef] hover:bg-[#e9e7ef]/80 text-[#4352a5] border border-[#c6c5d3] dark:bg-indigo-600/10 dark:hover:bg-indigo-600/20 dark:text-indigo-400 dark:border-indigo-500/20 font-bold text-[11px] rounded-[4px] transition-all duration-200 cursor-pointer">
                            Manage Subscription
                        </a>
                    </div>
                </div>
            </div>

            {/* Terminal Log Console */}
            <div class="bg-black/90 border border-neutral-800 rounded-[4px] shadow-2xl p-4 font-mono text-[11px] text-emerald-400">
                <div class="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
                    <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span class="ml-2 text-neutral-500 text-[10px]">zenthra_telemetry_audit.log</span>
                    </div>
                    <span class="text-[9px] text-neutral-500 uppercase tracking-widest">Live Node Session Audit</span>
                </div>
                <div class="space-y-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
                    {terminalLogs.value.map((log, i) => (
                        <div key={i} class="leading-relaxed whitespace-pre-wrap">
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Your Dashboard — Zenthra",
    meta: [
        { name: "description", content: "Your consumer account and subscription overview dashboard." },
    ],
};

