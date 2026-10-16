import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useTask$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AdminContext, RevenueData, RevenueTimelinePoint, setCachedAdminStore } from "~/stores/adminStore";
import { notify } from "~/lib/notify";

export default component$(() => {
    const adminStore = useContext(AdminContext);

    // 0ms Instant Hydration from Global Redux-like Store
    const revenue = useSignal<RevenueData>(adminStore.revenue || {
        mrr: 0,
        arr: 0,
        totalVolume: 0,
        activeSubscribers: 0,
        monthlySubscribers: 0,
        yearlySubscribers: 0,
        arpu: 0,
        paddle: { subscribers: 0, volume: 0 },
        dodo: { subscribers: 0, volume: 0 },
        timeline: [],
    });

    const isLoading = useSignal(!adminStore.revenue);
    const isRefreshing = useSignal(false);
    const selectedDays = useSignal<number>(180);
    const hoveredPoint = useSignal<RevenueTimelinePoint | null>(null);

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const syncRevenue = $(async (showSpinner = false) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        if (showSpinner) isLoading.value = true;
        isRefreshing.value = true;

        try {
            const url = `${API_BASE}/api/admin/revenue?days=${selectedDays.value}`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Could not load revenue data");
            const data = await res.json();

            if (data.revenue) {
                revenue.value = data.revenue;
                adminStore.revenue = data.revenue;
                adminStore.lastFetchedRevenue = Date.now();
                setCachedAdminStore({
                    revenue: data.revenue,
                    lastFetchedRevenue: Date.now()
                });
            }
        } catch (e: any) {
            if (showSpinner) notify.error(e.message || "Failed to load revenue metrics");
        } finally {
            isLoading.value = false;
            isRefreshing.value = false;
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        const hasCached = !!adminStore.revenue;
        await syncRevenue(!hasCached);
    });

    useTask$(({ track }) => {
        track(() => selectedDays.value);
        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            // Keep existing data on screen while silently updating timeline in background
            syncRevenue(false);
        }
    });

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(val || 0);
    };

    const maxChartRev = Math.max(...(revenue.value.timeline || []).map((p) => p.revenue), 50);

    return (
        <div class="space-y-6">
            {/* ── Page Header ── */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d3] dark:border-[#1e2030]">
                <div>
                    <div class="flex items-center gap-2.5">
                        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <h1 class="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            Revenue Dashboard
                        </h1>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                            FINANCIAL OVERVIEW
                        </span>
                    </div>
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1">
                        High-level subscription run rates, recurring revenue (MRR/ARR), and payment provider splits.
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    {/* Time Window Switcher */}
                    <div class="flex items-center p-0.5 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030]">
                        <button
                            onClick$={() => selectedDays.value = 30}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                selectedDays.value === 30
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            30D
                        </button>
                        <button
                            onClick$={() => selectedDays.value = 90}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                selectedDays.value === 90
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            90D
                        </button>
                        <button
                            onClick$={() => selectedDays.value = 180}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                selectedDays.value === 180
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            6M
                        </button>
                        <button
                            onClick$={() => selectedDays.value = 365}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                selectedDays.value === 365
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            1Y
                        </button>
                    </div>

                    <button
                        onClick$={() => syncRevenue(false)}
                        disabled={isRefreshing.value}
                        class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                        title="Sync latest revenue metrics"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            class={isRefreshing.value ? "animate-spin" : ""}
                        >
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>{isRefreshing.value ? "Syncing..." : "Sync Latest"}</span>
                    </button>
                </div>
            </div>

            {/* ── KPI Metric Cards Grid ── */}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* MRR Card */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Monthly Recurring (MRR)
                        </span>
                        <div class="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <span class="text-[12px] font-bold">⚡</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {formatCurrency(revenue.value.mrr)}
                        </span>
                    </div>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-1">
                        Active run rate from monthly & annual subs
                    </p>
                </div>

                {/* ARR Card */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Annual Run Rate (ARR)
                        </span>
                        <div class="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {formatCurrency(revenue.value.arr)}
                        </span>
                    </div>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-1">
                        Projected 12-month recurring revenue
                    </p>
                </div>

                {/* Total Volume */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Total Processed Volume
                        </span>
                        <div class="w-6 h-6 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {formatCurrency(revenue.value.totalVolume)}
                        </span>
                    </div>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-1">
                        All-time cumulative processed charges
                    </p>
                </div>

                {/* ARPU */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            ARPU / Subscriber
                        </span>
                        <div class="w-6 h-6 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                            <span class="text-[11px] font-bold">★</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {formatCurrency(revenue.value.arpu)}
                        </span>
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8]">/ sub</span>
                    </div>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-1">
                        Average revenue per active subscriber
                    </p>
                </div>
            </div>

            {/* ── Monthly Revenue Chart Panel ── */}
            <div class="p-5 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                        <h2 class="text-sm font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif]">
                            Monthly Revenue Trajectory
                        </h2>
                        <p class="text-xs text-[#767683] dark:text-[#94a3b8]">
                            Historical monthly billing receipts and charge volume over selected timeframe
                        </p>
                    </div>

                    {hoveredPoint.value && (
                        <div class="px-3 py-1.5 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] flex items-center gap-3 text-xs">
                            <span class="font-bold text-[#1b1b21] dark:text-white font-['JetBrains_Mono',monospace]">{hoveredPoint.value.month}</span>
                            <span class="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(hoveredPoint.value.revenue)}</span>
                            <span class="text-[#767683] dark:text-[#94a3b8]">({hoveredPoint.value.count} txns)</span>
                        </div>
                    )}
                </div>

                {/* SVG Visual Bars */}
                <div class="h-56 w-full flex items-end gap-2 sm:gap-4 pt-6 pb-2 border-b border-[#c6c5d3] dark:border-[#1e2030]">
                    {(revenue.value.timeline || []).map((point) => {
                        const heightPct = Math.max(8, Math.round((point.revenue / maxChartRev) * 100));

                        return (
                            <div
                                key={point.month}
                                class="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                                onMouseEnter$={() => hoveredPoint.value = point}
                                onMouseLeave$={() => hoveredPoint.value = null}
                            >
                                <div class="text-[10px] text-[#767683] dark:text-[#94a3b8] mb-1 opacity-0 group-hover:opacity-100 transition-opacity font-['JetBrains_Mono',monospace]">
                                    ${point.revenue.toFixed(0)}
                                </div>
                                <div
                                    style={{ height: `${heightPct}%` }}
                                    class={[
                                        "w-full max-w-[48px] rounded-t-[4px] transition-all duration-300",
                                        hoveredPoint.value?.month === point.month
                                            ? "bg-emerald-500 dark:bg-emerald-400 shadow-md shadow-emerald-500/20"
                                            : "bg-[#1b1b21]/80 dark:bg-white/80 group-hover:bg-[#4352a5] dark:group-hover:bg-[#6366f1]"
                                    ].join(" ")}
                                />
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] mt-2 font-['JetBrains_Mono',monospace] truncate max-w-full">
                                    {point.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Secondary Breakdown Cards Grid ── */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Gateway Telemetry */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <h3 class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] uppercase tracking-wider">
                        Payment Gateway Split
                    </h3>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">Paddle Billing vs Dodo Payments</p>

                    <div class="mt-4 space-y-3">
                        {/* Paddle */}
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1">
                                <div class="flex items-center gap-1.5 font-semibold text-[#1b1b21] dark:text-white">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span>Paddle Billing</span>
                                </div>
                                <span class="font-['JetBrains_Mono',monospace] font-bold text-[#1b1b21] dark:text-white">
                                    {formatCurrency(revenue.value.paddle?.volume || 0)}
                                </span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-[#f1f0f5] dark:bg-[#1a1b26] overflow-hidden">
                                <div
                                    class="h-full bg-emerald-500 rounded-full"
                                    style={{
                                        width: `${revenue.value.totalVolume > 0 ? ((revenue.value.paddle?.volume || 0) / revenue.value.totalVolume) * 100 : 50}%`
                                    }}
                                />
                            </div>
                            <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] mt-1">
                                {revenue.value.paddle?.subscribers || 0} active subscribers
                            </p>
                        </div>

                        {/* Dodo */}
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1">
                                <div class="flex items-center gap-1.5 font-semibold text-[#1b1b21] dark:text-white">
                                    <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                                    <span>Dodo Payments</span>
                                </div>
                                <span class="font-['JetBrains_Mono',monospace] font-bold text-[#1b1b21] dark:text-white">
                                    {formatCurrency(revenue.value.dodo?.volume || 0)}
                                </span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-[#f1f0f5] dark:bg-[#1a1b26] overflow-hidden">
                                <div
                                    class="h-full bg-purple-500 rounded-full"
                                    style={{
                                        width: `${revenue.value.totalVolume > 0 ? ((revenue.value.dodo?.volume || 0) / revenue.value.totalVolume) * 100 : 50}%`
                                    }}
                                />
                            </div>
                            <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] mt-1">
                                {revenue.value.dodo?.subscribers || 0} active subscribers
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Plan Distribution */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <h3 class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] uppercase tracking-wider">
                        Subscription Plan Share
                    </h3>
                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">Annual ($39.99) vs Monthly ($4.99)</p>

                    <div class="mt-4 space-y-3">
                        {/* Annual */}
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1">
                                <span class="font-semibold text-amber-600 dark:text-amber-400">★ Annual Tier</span>
                                <span class="font-bold text-[#1b1b21] dark:text-white">
                                    {revenue.value.yearlySubscribers} users ({revenue.value.activeSubscribers > 0 ? Math.round((revenue.value.yearlySubscribers / revenue.value.activeSubscribers) * 100) : 0}%)
                                </span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-[#f1f0f5] dark:bg-[#1a1b26] overflow-hidden">
                                <div
                                    class="h-full bg-amber-500 rounded-full"
                                    style={{
                                        width: `${revenue.value.activeSubscribers > 0 ? (revenue.value.yearlySubscribers / revenue.value.activeSubscribers) * 100 : 0}%`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Monthly */}
                        <div>
                            <div class="flex items-center justify-between text-xs mb-1">
                                <span class="font-semibold text-blue-600 dark:text-blue-400">⚡ Monthly Tier</span>
                                <span class="font-bold text-[#1b1b21] dark:text-white">
                                    {revenue.value.monthlySubscribers} users ({revenue.value.activeSubscribers > 0 ? Math.round((revenue.value.monthlySubscribers / revenue.value.activeSubscribers) * 100) : 0}%)
                                </span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-[#f1f0f5] dark:bg-[#1a1b26] overflow-hidden">
                                <div
                                    class="h-full bg-blue-500 rounded-full"
                                    style={{
                                        width: `${revenue.value.activeSubscribers > 0 ? (revenue.value.monthlySubscribers / revenue.value.activeSubscribers) * 100 : 0}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Quick Navigation & Audit */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                    <div>
                        <h3 class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] uppercase tracking-wider">
                            Direct Audit Actions
                        </h3>
                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">Jump directly to granular views</p>
                    </div>

                    <div class="mt-4 space-y-2">
                        <Link
                            href="/admin/subscribers"
                            class="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] text-xs font-semibold text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            <span>Browse Pro Subscribers</span>
                            <span>→</span>
                        </Link>
                        <Link
                            href="/admin/transactions"
                            class="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] text-xs font-semibold text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            <span>Inspect Transactions Ledger</span>
                            <span>→</span>
                        </Link>
                        <Link
                            href="/admin/products"
                            class="flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] text-xs font-semibold text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            <span>Manage Production Products</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
});
