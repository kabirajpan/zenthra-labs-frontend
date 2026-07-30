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

    useVisibleTask$(async () => {
        await fetchStats();
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
                <div class="p-6 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] space-y-3">
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
