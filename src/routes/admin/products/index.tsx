import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

interface Stats {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    afterMotionCount: number;
    webAppCount: number;
}

export default component$(() => {
    const stats = useSignal<Stats | null>(null);
    const adStrategy = useSignal<string>("ADMOB_FALLBACK_STARTIO");
    const selectedStrategy = useSignal<string>("ADMOB_FALLBACK_STARTIO");
    const isEditing = useSignal<boolean>(false);
    const isSaving = useSignal<boolean>(false);
    const statusMessage = useSignal<string>("");

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const fetchStats = $(async () => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/admin/stats`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Could not fetch stats");
            const data = await res.json();
            stats.value = data.stats;
        } catch {
            // silent
        }
    });

    const fetchAdConfig = $(async () => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/admin/config/ads`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.strategy) {
                    adStrategy.value = data.strategy;
                    selectedStrategy.value = data.strategy;
                }
            }
        } catch {
            // silent
        }
    });

    const saveAdConfig = $(async (newStrategy: string) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        isSaving.value = true;
        statusMessage.value = "";
        try {
            const res = await fetch(`${API_BASE}/api/admin/config/ads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ strategy: newStrategy })
            });
            if (res.ok) {
                adStrategy.value = newStrategy;
                selectedStrategy.value = newStrategy;
                isEditing.value = false;
                statusMessage.value = "Ad strategy updated successfully!";
                setTimeout(() => {
                    statusMessage.value = "";
                }, 3500);
            } else {
                statusMessage.value = "Failed to update ad strategy.";
            }
        } catch {
            statusMessage.value = "Error updating ad strategy.";
        } finally {
            isSaving.value = false;
        }
    });

    useVisibleTask$(async () => {
        await Promise.all([fetchStats(), fetchAdConfig()]);
    });

    return (
        <div class="space-y-6 font-['DM_Sans',sans-serif]">
            {/* Header */}
            <div>
                <h1 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                    Production Products
                </h1>
                <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1">
                    Live products and services running on Zenthra backend.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* After Motion */}
                <div class="p-6 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] dark:text-white">After Motion</h3>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] text-emerald-600 dark:text-emerald-400 font-bold uppercase">[ Live Play Store ]</span>
                    </div>

                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] leading-relaxed">
                        Android 3D Video & Motion Graphics Editor. Keyframing, speed graphs, 3D orbit camera, and AI captions.
                    </p>

                    <div class="pt-3 border-t border-[#c6c5d3] dark:border-[#1e2030] flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
                        <span class="text-[#767683]">Platform: Android</span>
                        <span class="text-[#1b1b21] dark:text-white font-bold">Users: {stats.value?.afterMotionCount || 0}</span>
                    </div>

                    {/* Ad Monetization Routing Control */}
                    <div class="pt-4 border-t border-[#c6c5d3] dark:border-[#1e2030] space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-['Syne',sans-serif] font-bold text-[#1b1b21] dark:text-white uppercase tracking-wider">
                                Ad Routing Strategy
                            </span>
                            <div class="flex items-center gap-2">
                                {statusMessage.value && (
                                    <span class="text-[11px] font-['JetBrains_Mono',monospace] text-emerald-600 dark:text-emerald-400 animate-pulse">
                                        {statusMessage.value}
                                    </span>
                                )}
                                {!isEditing.value ? (
                                    <button
                                        type="button"
                                        onClick$={() => {
                                            selectedStrategy.value = adStrategy.value;
                                            isEditing.value = true;
                                        }}
                                        class="px-2.5 py-1 text-[11px] font-bold font-['JetBrains_Mono',monospace] bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick$={() => {
                                            selectedStrategy.value = adStrategy.value;
                                            isEditing.value = false;
                                        }}
                                        class="px-2.5 py-1 text-[11px] font-['JetBrains_Mono',monospace] bg-gray-500/20 hover:bg-gray-500/30 text-[#767683] dark:text-[#94a3b8] rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        {!isEditing.value ? (
                            /* View Mode: Clean summary card */
                            <div class="p-3 bg-purple-500/10 border border-purple-500/40 rounded text-xs space-y-1">
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-[#1b1b21] dark:text-white flex items-center gap-2">
                                        {adStrategy.value === "ADMOB_FALLBACK_STARTIO" && "AdMob + Start.io Fallback"}
                                        {adStrategy.value === "ADMOB_ONLY" && "Full AdMob Only"}
                                        {adStrategy.value === "STARTIO_ONLY" && "Full Start.io Only"}
                                        {adStrategy.value === "ADS_DISABLED" && "All Ads Disabled (Kill Switch)"}
                                    </span>
                                    <span class="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold rounded">
                                        ACTIVE
                                    </span>
                                </div>
                                <p class="text-[11px] text-[#767683] dark:text-[#94a3b8]">
                                    {adStrategy.value === "ADMOB_FALLBACK_STARTIO" && "AdMob primary (instant 0ms). If no fill or network fails, Start.io handles fallback."}
                                    {adStrategy.value === "ADMOB_ONLY" && "100% AdMob. Start.io is completely OFF. Blocks export if no fill."}
                                    {adStrategy.value === "STARTIO_ONLY" && "100% Start.io. AdMob is completely OFF. Useful if AdMob freezes."}
                                    {adStrategy.value === "ADS_DISABLED" && "Zero ads served app-wide across all devices."}
                                </p>
                            </div>
                        ) : (
                            /* Edit Mode: Strategy Radio Options with Save button */
                            <div class="space-y-2">
                                {/* Strategy 1: AdMob + Start.io Fallback */}
                                <label
                                    class={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition-all ${
                                        selectedStrategy.value === "ADMOB_FALLBACK_STARTIO"
                                            ? "bg-purple-500/10 border-purple-500/50 dark:border-purple-500/60"
                                            : "bg-white/40 dark:bg-[#0c0d14] border-[#c6c5d3] dark:border-[#1e2030] hover:border-purple-400/40"
                                    }`}
                                    onClick$={() => { selectedStrategy.value = "ADMOB_FALLBACK_STARTIO"; }}
                                >
                                    <input
                                        type="radio"
                                        name="ad_strategy"
                                        value="ADMOB_FALLBACK_STARTIO"
                                        checked={selectedStrategy.value === "ADMOB_FALLBACK_STARTIO"}
                                        disabled={isSaving.value}
                                        class="mt-0.5 text-purple-600"
                                    />
                                    <div>
                                        <div class="font-bold text-[#1b1b21] dark:text-white flex items-center gap-2">
                                            AdMob + Start.io Fallback
                                            <span class="text-[9px] px-1.5 py-0.2 bg-purple-500/20 text-purple-400 rounded font-mono">RECOMMENDED</span>
                                        </div>
                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">
                                            AdMob primary (instant 0ms). If no fill or network fails, Start.io handles fallback.
                                        </p>
                                    </div>
                                </label>

                                {/* Strategy 2: AdMob Only */}
                                <label
                                    class={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition-all ${
                                        selectedStrategy.value === "ADMOB_ONLY"
                                            ? "bg-purple-500/10 border-purple-500/50 dark:border-purple-500/60"
                                            : "bg-white/40 dark:bg-[#0c0d14] border-[#c6c5d3] dark:border-[#1e2030] hover:border-purple-400/40"
                                    }`}
                                    onClick$={() => { selectedStrategy.value = "ADMOB_ONLY"; }}
                                >
                                    <input
                                        type="radio"
                                        name="ad_strategy"
                                        value="ADMOB_ONLY"
                                        checked={selectedStrategy.value === "ADMOB_ONLY"}
                                        disabled={isSaving.value}
                                        class="mt-0.5 text-purple-600"
                                    />
                                    <div>
                                        <div class="font-bold text-[#1b1b21] dark:text-white">Full AdMob Only</div>
                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">
                                            100% AdMob. Start.io is completely OFF. Blocks export if no fill.
                                        </p>
                                    </div>
                                </label>

                                {/* Strategy 3: Start.io Only */}
                                <label
                                    class={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition-all ${
                                        selectedStrategy.value === "STARTIO_ONLY"
                                            ? "bg-purple-500/10 border-purple-500/50 dark:border-purple-500/60"
                                            : "bg-white/40 dark:bg-[#0c0d14] border-[#c6c5d3] dark:border-[#1e2030] hover:border-purple-400/40"
                                    }`}
                                    onClick$={() => { selectedStrategy.value = "STARTIO_ONLY"; }}
                                >
                                    <input
                                        type="radio"
                                        name="ad_strategy"
                                        value="STARTIO_ONLY"
                                        checked={selectedStrategy.value === "STARTIO_ONLY"}
                                        disabled={isSaving.value}
                                        class="mt-0.5 text-purple-600"
                                    />
                                    <div>
                                        <div class="font-bold text-[#1b1b21] dark:text-white">Full Start.io Only</div>
                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">
                                            100% Start.io. AdMob is completely OFF. Useful if AdMob freezes.
                                        </p>
                                    </div>
                                </label>

                                {/* Strategy 4: Ads Disabled */}
                                <label
                                    class={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition-all ${
                                        selectedStrategy.value === "ADS_DISABLED"
                                            ? "bg-red-500/10 border-red-500/50 dark:border-red-500/60"
                                            : "bg-white/40 dark:bg-[#0c0d14] border-[#c6c5d3] dark:border-[#1e2030] hover:border-red-400/40"
                                    }`}
                                    onClick$={() => { selectedStrategy.value = "ADS_DISABLED"; }}
                                >
                                    <input
                                        type="radio"
                                        name="ad_strategy"
                                        value="ADS_DISABLED"
                                        checked={selectedStrategy.value === "ADS_DISABLED"}
                                        disabled={isSaving.value}
                                        class="mt-0.5 text-red-600"
                                    />
                                    <div>
                                        <div class="font-bold text-red-600 dark:text-red-400">All Ads Disabled (Kill Switch)</div>
                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">
                                            Zero ads served app-wide across all devices.
                                        </p>
                                    </div>
                                </label>

                                <div class="flex items-center gap-2 pt-2">
                                    <button
                                        type="button"
                                        disabled={isSaving.value}
                                        onClick$={() => saveAdConfig(selectedStrategy.value)}
                                        class="px-3 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded transition-colors"
                                    >
                                        {isSaving.value ? "Updating..." : "Update Strategy"}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isSaving.value}
                                        onClick$={() => {
                                            selectedStrategy.value = adStrategy.value;
                                            isEditing.value = false;
                                        }}
                                        class="px-3 py-1.5 text-xs bg-gray-500/20 hover:bg-gray-500/30 text-[#767683] dark:text-[#94a3b8] rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zenthra Web */}
                <div class="p-6 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] dark:text-white">Zenthra Web</h3>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] text-blue-600 dark:text-blue-400 font-bold uppercase">[ Live Web ]</span>
                    </div>

                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] leading-relaxed">
                        Official web portal, authentication backend, user account management, and developer tools.
                    </p>

                    <div class="pt-3 border-t border-[#c6c5d3] dark:border-[#1e2030] flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
                        <span class="text-[#767683]">Platform: Web</span>
                        <span class="text-[#1b1b21] dark:text-white font-bold">Users: {stats.value?.webAppCount || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});
