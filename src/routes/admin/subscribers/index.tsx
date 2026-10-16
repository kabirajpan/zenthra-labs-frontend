import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useTask$ } from "@builder.io/qwik";
import { notify } from "~/lib/notify";

interface SubscriberItem {
    id: string;
    email: string | null;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    isPro: boolean;
    isActive: boolean;
    proPlan: "MONTHLY" | "ANNUAL" | string;
    proExpiresAt: string | null;
    daysRemaining: number | null;
    provider: "PADDLE" | "DODO" | string;
    dodoSubscriptionId?: string | null;
    dodoCustomerId?: string | null;
    paddleSubscriptionId?: string | null;
    paddleCustomerId?: string | null;
    createdAt: string;
    updatedAt: string;
}

interface SubscriberSummary {
    totalActive: number;
    monthlyCount: number;
    yearlyCount: number;
    paddleCount: number;
    dodoCount: number;
    mrr: number;
}

const parseAsUTC = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const str = (dateStr.endsWith("Z") || dateStr.includes("+") || dateStr.includes("-", 11))
        ? dateStr
        : `${dateStr}Z`;
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
};

const formatDateIST = (dateStr?: string | null) => {
    const date = parseAsUTC(dateStr);
    if (!date) return "-";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
};

export default component$(() => {
    const subscribers = useSignal<SubscriberItem[]>([]);
    const summary = useSignal<SubscriberSummary>({
        totalActive: 0,
        monthlyCount: 0,
        yearlyCount: 0,
        paddleCount: 0,
        dodoCount: 0,
        mrr: 0,
    });

    const isLoading = useSignal(true);
    const isRefreshing = useSignal(false);
    const searchQuery = useSignal("");
    const planFilter = useSignal<"ALL" | "MONTHLY" | "ANNUAL">("ALL");
    const statusFilter = useSignal<"all" | "active" | "expiring_soon" | "expired">("active");
    const providerFilter = useSignal<"ALL" | "PADDLE" | "DODO">("ALL");

    const currentPage = useSignal(1);
    const totalPages = useSignal(1);
    const totalCount = useSignal(0);
    const limit = useSignal(12);

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const fetchSubscribers = $(async (silent = false) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        if (!silent) isLoading.value = true;
        isRefreshing.value = true;

        try {
            const planParam = planFilter.value !== "ALL" ? `&plan=${planFilter.value}` : "";
            const statusParam = `&status=${statusFilter.value}`;
            const providerParam = providerFilter.value !== "ALL" ? `&provider=${providerFilter.value}` : "";
            const searchParam = searchQuery.value.trim() ? `&search=${encodeURIComponent(searchQuery.value.trim())}` : "";

            const url = `${API_BASE}/api/admin/subscribers?page=${currentPage.value}&limit=${limit.value}${planParam}${statusParam}${providerParam}${searchParam}`;

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Could not load subscribers");
            const data = await res.json();

            subscribers.value = data.subscribers || [];
            if (data.summary) {
                summary.value = data.summary;
            }
            if (data.pagination) {
                totalCount.value = data.pagination.total;
                totalPages.value = data.pagination.totalPages;
                currentPage.value = data.pagination.currentPage;
            }
        } catch (e: any) {
            if (!silent) notify.error(e.message || "Failed to fetch subscribers");
        } finally {
            isLoading.value = false;
            isRefreshing.value = false;
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        await fetchSubscribers();
    });

    useTask$(({ track }) => {
        track(() => planFilter.value);
        track(() => statusFilter.value);
        track(() => providerFilter.value);
        track(() => searchQuery.value);
        track(() => currentPage.value);

        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            fetchSubscribers(true);
        }
    });

    const copyToClipboard = $((text: string, label: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            notify.success(`Copied ${label} to clipboard`);
        }
    });

    return (
        <div class="space-y-6">
            {/* ── Page Header ── */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d3] dark:border-[#1e2030]">
                <div>
                    <div class="flex items-center gap-2.5">
                        <span class="flex h-2.5 w-2.5 relative">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <h1 class="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            Subscribers
                        </h1>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                            PRO TIER
                        </span>
                    </div>
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1">
                        Live monitoring of paying subscribers, recurring billing terms, and renewal tracking.
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        onClick$={() => fetchSubscribers(false)}
                        disabled={isRefreshing.value}
                        class="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                        title="Reload subscribers list"
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
                        <span>{isRefreshing.value ? "Refreshing..." : "Refresh"}</span>
                    </button>
                </div>
            </div>

            {/* ── KPI Metric Cards Row ── */}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Active Paid Subscribers */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Active Pro Users
                        </span>
                        <div class="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5" /></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.totalActive}
                        </span>
                        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Active Now</span>
                    </div>
                </div>

                {/* Monthly Recurring Revenue */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Est. Monthly MRR
                        </span>
                        <div class="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            ${summary.value.mrr.toFixed(2)}
                        </span>
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8]">/ month</span>
                    </div>
                </div>

                {/* Annual Subscribers */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Annual Subscribers
                        </span>
                        <div class="w-6 h-6 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                            <span class="text-[11px] font-bold">★</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.yearlyCount}
                        </span>
                        <span class="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            {summary.value.totalActive > 0 ? Math.round((summary.value.yearlyCount / summary.value.totalActive) * 100) : 0}% share
                        </span>
                    </div>
                </div>

                {/* Monthly Subscribers */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Monthly Subscribers
                        </span>
                        <div class="w-6 h-6 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <span class="text-[11px] font-bold">⚡</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.monthlyCount}
                        </span>
                        <span class="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                            {summary.value.totalActive > 0 ? Math.round((summary.value.monthlyCount / summary.value.totalActive) * 100) : 0}% share
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Filter & Search Toolbar ── */}
            <div class="p-3.5 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                {/* Search Bar */}
                <div class="relative flex-1 min-w-[220px]">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-[#767683] dark:text-[#94a3b8]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search subscriber name, email, subscription ID..."
                        value={searchQuery.value}
                        onInput$={(e, el) => {
                            searchQuery.value = el.value;
                            currentPage.value = 1;
                        }}
                        class="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white placeholder-[#767683] dark:placeholder-[#64748b] focus:outline-hidden focus:border-[#4352a5] dark:focus:border-[#6366f1] transition-colors"
                    />
                    {searchQuery.value && (
                        <button
                            onClick$={() => { searchQuery.value = ""; currentPage.value = 1; }}
                            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#767683] hover:text-[#1b1b21] dark:hover:text-white cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div class="flex flex-wrap items-center gap-2">
                    {/* Plan Filter (All, Monthly, Annual) */}
                    <div class="flex items-center p-0.5 rounded-[4px] bg-[#f1f0f5] dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030]">
                        <button
                            onClick$={() => { planFilter.value = "ALL"; currentPage.value = 1; }}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                planFilter.value === "ALL"
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            All Plans
                        </button>
                        <button
                            onClick$={() => { planFilter.value = "MONTHLY"; currentPage.value = 1; }}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                planFilter.value === "MONTHLY"
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            Monthly
                        </button>
                        <button
                            onClick$={() => { planFilter.value = "ANNUAL"; currentPage.value = 1; }}
                            class={[
                                "px-2.5 py-1 text-[11px] font-semibold rounded-[3px] transition-all cursor-pointer",
                                planFilter.value === "ANNUAL"
                                    ? "bg-white dark:bg-[#252839] text-[#1b1b21] dark:text-white shadow-xs"
                                    : "text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white"
                            ].join(" ")}
                        >
                            Yearly ★
                        </button>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter.value}
                        onChange$={(e, el) => {
                            statusFilter.value = el.value as any;
                            currentPage.value = 1;
                        }}
                        class="px-2.5 py-1.5 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white cursor-pointer focus:outline-hidden"
                    >
                        <option value="active">Active Subscribers</option>
                        <option value="expiring_soon">Expiring in 7 Days</option>
                        <option value="expired">Expired Past Due</option>
                        <option value="all">All Statuses</option>
                    </select>

                    {/* Provider Filter */}
                    <select
                        value={providerFilter.value}
                        onChange$={(e, el) => {
                            providerFilter.value = el.value as any;
                            currentPage.value = 1;
                        }}
                        class="px-2.5 py-1.5 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white cursor-pointer focus:outline-hidden"
                    >
                        <option value="ALL">All Gateways</option>
                        <option value="PADDLE">Paddle Only</option>
                        <option value="DODO">Dodo Only</option>
                    </select>
                </div>
            </div>

            {/* ── Subscribers Table ── */}
            <div class="rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-[#c6c5d3] dark:border-[#1e2030] bg-[#faf9fc] dark:bg-[#161722] text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                                <th class="py-3 px-4">Subscriber</th>
                                <th class="py-3 px-4">Plan</th>
                                <th class="py-3 px-4">Payment Gateway</th>
                                <th class="py-3 px-4">Subscription ID</th>
                                <th class="py-3 px-4">Renewal / Expiry</th>
                                <th class="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#c6c5d3]/50 dark:divide-[#1e2030]/60 text-xs">
                            {isLoading.value ? (
                                <tr>
                                    <td colSpan={6} class="py-12 text-center text-[#767683] dark:text-[#94a3b8]">
                                        <div class="w-6 h-6 mx-auto mb-2 border-2 border-[#1b1b21] dark:border-white border-t-transparent animate-spin rounded-full" />
                                        <span>Loading subscribers...</span>
                                    </td>
                                </tr>
                            ) : subscribers.value.length === 0 ? (
                                <tr>
                                    <td colSpan={6} class="py-14 text-center">
                                        <div class="w-10 h-10 mx-auto mb-2 text-[#767683] dark:text-[#64748b] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                        </div>
                                        <p class="text-sm font-semibold text-[#1b1b21] dark:text-white">No subscribers found</p>
                                        <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-0.5">Try adjusting your search query, plan filter, or status criteria.</p>
                                    </td>
                                </tr>
                            ) : (
                                subscribers.value.map((sub) => {
                                    const isAnnual = sub.proPlan === "ANNUAL";
                                    const subId = sub.paddleSubscriptionId || sub.dodoSubscriptionId || "-";
                                    const custId = sub.paddleCustomerId || sub.dodoCustomerId;

                                    return (
                                        <tr key={sub.id} class="hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors">
                                            {/* Subscriber User */}
                                            <td class="py-3.5 px-4">
                                                <div class="flex items-center gap-3">
                                                    <div class={[
                                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-['Syne',sans-serif] shrink-0 text-white shadow-xs",
                                                        isAnnual ? "bg-gradient-to-tr from-amber-600 to-yellow-500" : "bg-gradient-to-tr from-blue-600 to-indigo-500"
                                                    ].join(" ")}>
                                                        {sub.firstName?.[0] || "U"}{sub.lastName?.[0] || ""}
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="flex items-center gap-1.5">
                                                            <p class="font-semibold text-[#1b1b21] dark:text-white truncate">
                                                                {sub.firstName} {sub.lastName}
                                                            </p>
                                                            {sub.role === "ADMIN" && (
                                                                <span class="text-[9px] font-['JetBrains_Mono',monospace] px-1 py-0.2 bg-[#1b1b21] text-white dark:bg-white dark:text-[#1b1b21] font-bold rounded-[2px] uppercase">
                                                                    ADMIN
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] truncate font-['JetBrains_Mono',monospace]">
                                                            {sub.email || sub.phoneNumber || sub.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Plan Badge */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                {isAnnual ? (
                                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                                                        <span>★</span>
                                                        <span>ANNUAL ($39.99/yr)</span>
                                                    </span>
                                                ) : (
                                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                                                        <span>⚡</span>
                                                        <span>MONTHLY ($4.99/mo)</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Gateway Provider */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-1.5">
                                                    {sub.provider === "PADDLE" ? (
                                                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            Paddle Billing
                                                        </span>
                                                    ) : (
                                                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                            Dodo Payments
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Subscription ID */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-1.5 group">
                                                    <span class="font-['JetBrains_Mono',monospace] text-[11px] text-[#1b1b21] dark:text-[#cbd5e1]">
                                                        {subId !== "-" ? subId : "sub_direct_db"}
                                                    </span>
                                                    {subId !== "-" && (
                                                        <button
                                                            onClick$={() => copyToClipboard(subId, "Subscription ID")}
                                                            class="opacity-0 group-hover:opacity-100 p-1 text-[#767683] hover:text-[#1b1b21] dark:hover:text-white transition-opacity cursor-pointer"
                                                            title="Copy ID"
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                {custId && (
                                                    <p class="text-[10px] text-[#767683] dark:text-[#64748b] font-['JetBrains_Mono',monospace]">
                                                        cust: {custId}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Renewal / Expiry Date */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div>
                                                    <p class="font-medium text-[#1b1b21] dark:text-white">
                                                        {formatDateIST(sub.proExpiresAt)}
                                                    </p>
                                                    <div class="flex items-center gap-1 mt-0.5">
                                                        {sub.daysRemaining !== null && sub.daysRemaining !== undefined ? (
                                                            sub.daysRemaining > 7 ? (
                                                                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                                                    Renews in {sub.daysRemaining} days
                                                                </span>
                                                            ) : sub.daysRemaining >= 0 ? (
                                                                <span class="text-[10px] text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                                                                    Expires in {sub.daysRemaining} days
                                                                </span>
                                                            ) : (
                                                                <span class="text-[10px] text-rose-500 dark:text-rose-400 font-semibold">
                                                                    Expired {Math.abs(sub.daysRemaining)} days ago
                                                                </span>
                                                            )
                                                        ) : (
                                                            <span class="text-[10px] text-[#767683] dark:text-[#64748b]">Auto-renewing</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                {sub.isActive ? (
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Expired
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination Footer ── */}
                <div class="px-4 py-3 border-t border-[#c6c5d3] dark:border-[#1e2030] bg-[#faf9fc] dark:bg-[#161722] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#767683] dark:text-[#94a3b8]">
                    <span>
                        Showing {subscribers.value.length} of {totalCount.value} subscribers
                    </span>
                    <div class="flex items-center gap-2">
                        <button
                            onClick$={() => currentPage.value = Math.max(1, currentPage.value - 1)}
                            disabled={currentPage.value <= 1 || isLoading.value}
                            class="px-2.5 py-1 rounded-[3px] border border-[#c6c5d3] dark:border-[#1e2030] bg-white dark:bg-[#1a1b26] disabled:opacity-40 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span class="font-['JetBrains_Mono',monospace]">
                            Page {currentPage.value} of {totalPages.value}
                        </span>
                        <button
                            onClick$={() => currentPage.value = Math.min(totalPages.value, currentPage.value + 1)}
                            disabled={currentPage.value >= totalPages.value || isLoading.value}
                            class="px-2.5 py-1 rounded-[3px] border border-[#c6c5d3] dark:border-[#1e2030] bg-white dark:bg-[#1a1b26] disabled:opacity-40 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
