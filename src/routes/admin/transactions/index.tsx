import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useContext } from "@builder.io/qwik";
import { AdminContext, TransactionItem, TransactionSummary, setCachedAdminStore } from "~/stores/adminStore";
import { notify } from "~/lib/notify";

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

const formatTimeIST = (dateStr?: string | null) => {
    const date = parseAsUTC(dateStr);
    if (!date) return "-";
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });
};

export default component$(() => {
    const adminStore = useContext(AdminContext);

    // 0ms Instant Hydration from Global Redux-like Store
    const allTransactions = useSignal<TransactionItem[]>(adminStore.transactions || []);
    const summary = useSignal<TransactionSummary>(adminStore.transactionSummary || {
        totalVolume: 0,
        totalCount: 0,
        paddleCount: 0,
        dodoCount: 0,
    });

    const isLoading = useSignal(adminStore.transactions.length === 0);
    const isRefreshing = useSignal(false);

    // Filter Controls
    const searchQuery = useSignal("");
    const providerFilter = useSignal<"ALL" | "PADDLE" | "DODO">("ALL");
    const planFilter = useSignal<"ALL" | "MONTHLY" | "ANNUAL">("ALL");
    const statusFilter = useSignal<"ALL" | "COMPLETED" | "REFUNDED" | "FAILED">("ALL");

    // Pagination
    const currentPage = useSignal(1);
    const pageSize = 15;

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    // Background Synchronization
    const syncTransactions = $(async (showSpinner = false) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        if (showSpinner) isLoading.value = true;
        isRefreshing.value = true;

        try {
            const url = `${API_BASE}/api/admin/transactions?limit=100`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Could not sync transactions");
            const data = await res.json();

            const items: TransactionItem[] = data.transactions || [];
            allTransactions.value = items;
            adminStore.transactions = items;
            adminStore.lastFetchedTransactions = Date.now();

            if (data.summary) {
                summary.value = data.summary;
                adminStore.transactionSummary = data.summary;
            }

            setCachedAdminStore({
                transactions: items,
                transactionSummary: data.summary,
                lastFetchedTransactions: Date.now()
            });
        } catch (e: any) {
            if (showSpinner) notify.error(e.message || "Failed to load transactions");
        } finally {
            isLoading.value = false;
            isRefreshing.value = false;
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        const hasCached = adminStore.transactions.length > 0;
        await syncTransactions(!hasCached);
    });

    const copyToClipboard = $((text: string, label: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            notify.success(`Copied ${label} to clipboard`);
        }
    });

    // 0ms Instant In-Memory Filter Computation (Never reloads or shows spinner!)
    const getFilteredList = () => {
        let list = allTransactions.value;

        // Provider Filter
        if (providerFilter.value !== "ALL") {
            list = list.filter((t) => t.provider === providerFilter.value);
        }

        // Plan Filter
        if (planFilter.value !== "ALL") {
            list = list.filter((t) => t.plan === planFilter.value);
        }

        // Status Filter
        if (statusFilter.value !== "ALL") {
            list = list.filter((t) => t.status === statusFilter.value);
        }

        // Search Filter
        const q = searchQuery.value.trim().toLowerCase();
        if (q) {
            list = list.filter((t) => {
                const id = t.id.toLowerCase();
                const paymentId = (t.providerPaymentId || "").toLowerCase();
                const subId = (t.subscriptionId || "").toLowerCase();
                const email = (t.user?.email || "").toLowerCase();
                const name = `${t.user?.firstName || ""} ${t.user?.lastName || ""}`.toLowerCase();
                return id.includes(q) || paymentId.includes(q) || subId.includes(q) || email.includes(q) || name.includes(q);
            });
        }

        return list;
    };

    const displayedTransactions = getFilteredList();
    const totalFiltered = displayedTransactions.length;
    const totalPagesCount = Math.max(1, Math.ceil(totalFiltered / pageSize));
    const safeCurrentPage = Math.min(currentPage.value, totalPagesCount);
    const paginatedTransactions = displayedTransactions.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

    return (
        <div class="space-y-6">
            {/* ── Page Header ── */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d3] dark:border-[#1e2030]">
                <div>
                    <div class="flex items-center gap-2.5">
                        <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        <h1 class="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            Transactions
                        </h1>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-[4px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                            PAYMENT LEDGER
                        </span>
                    </div>
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1">
                        Instant audit trail of subscription transactions, processed charges, and checkout events.
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        onClick$={() => syncTransactions(false)}
                        disabled={isRefreshing.value}
                        class="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                        title="Sync transactions"
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

            {/* ── KPI Metric Cards Row ── */}
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Total Processed Volume */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Total Volume
                        </span>
                        <div class="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            ${summary.value.totalVolume.toFixed(2)}
                        </span>
                        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">USD</span>
                    </div>
                </div>

                {/* Total Transactions */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Total Transactions
                        </span>
                        <div class="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.totalCount}
                        </span>
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8]">charges</span>
                    </div>
                </div>

                {/* Paddle Transactions */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Paddle Billing
                        </span>
                        <div class="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <span class="text-[10px] font-bold">P</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.paddleCount}
                        </span>
                        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            {summary.value.totalCount > 0 ? Math.round((summary.value.paddleCount / summary.value.totalCount) * 100) : 0}%
                        </span>
                    </div>
                </div>

                {/* Dodo Transactions */}
                <div class="p-4 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                            Dodo Payments
                        </span>
                        <div class="w-6 h-6 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <span class="text-[10px] font-bold">D</span>
                        </div>
                    </div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-2xl font-bold font-['Syne',sans-serif] text-[#1b1b21] dark:text-white">
                            {summary.value.dodoCount}
                        </span>
                        <span class="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                            {summary.value.totalCount > 0 ? Math.round((summary.value.dodoCount / summary.value.totalCount) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Search & Filter Toolbar (0ms Instant Filtering) ── */}
            <div class="p-3.5 rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                {/* Search */}
                <div class="relative flex-1 min-w-[220px]">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-[#767683] dark:text-[#94a3b8]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search transaction ID, user name, email, subscription..."
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
                    {/* Provider */}
                    <select
                        value={providerFilter.value}
                        onChange$={(e, el) => {
                            providerFilter.value = el.value as any;
                            currentPage.value = 1;
                        }}
                        class="px-2.5 py-1.5 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white cursor-pointer focus:outline-hidden"
                    >
                        <option value="ALL">All Gateways</option>
                        <option value="PADDLE">Paddle Billing</option>
                        <option value="DODO">Dodo Payments</option>
                    </select>

                    {/* Plan */}
                    <select
                        value={planFilter.value}
                        onChange$={(e, el) => {
                            planFilter.value = el.value as any;
                            currentPage.value = 1;
                        }}
                        class="px-2.5 py-1.5 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white cursor-pointer focus:outline-hidden"
                    >
                        <option value="ALL">All Plans</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="ANNUAL">Annual ★</option>
                    </select>

                    {/* Status */}
                    <select
                        value={statusFilter.value}
                        onChange$={(e, el) => {
                            statusFilter.value = el.value as any;
                            currentPage.value = 1;
                        }}
                        class="px-2.5 py-1.5 text-xs bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white cursor-pointer focus:outline-hidden"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="REFUNDED">Refunded</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>
            </div>

            {/* ── Transactions Table (Instant Render, Zero Flashing) ── */}
            <div class="rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-[#c6c5d3] dark:border-[#1e2030] bg-[#faf9fc] dark:bg-[#161722] text-[11px] font-semibold text-[#767683] dark:text-[#94a3b8] uppercase tracking-wider font-['JetBrains_Mono',monospace]">
                                <th class="py-3 px-4">Transaction / Date</th>
                                <th class="py-3 px-4">Customer</th>
                                <th class="py-3 px-4">Gateway</th>
                                <th class="py-3 px-4">Plan</th>
                                <th class="py-3 px-4">Amount</th>
                                <th class="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#c6c5d3]/50 dark:divide-[#1e2030]/60 text-xs">
                            {isLoading.value ? (
                                <tr>
                                    <td colSpan={6} class="py-12 text-center text-[#767683] dark:text-[#94a3b8]">
                                        <div class="w-6 h-6 mx-auto mb-2 border-2 border-[#1b1b21] dark:border-white border-t-transparent animate-spin rounded-full" />
                                        <span>Loading transactions...</span>
                                    </td>
                                </tr>
                            ) : paginatedTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} class="py-14 text-center">
                                        <div class="w-10 h-10 mx-auto mb-2 text-[#767683] dark:text-[#64748b] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                                <line x1="1" y1="10" x2="23" y2="10" />
                                            </svg>
                                        </div>
                                        <p class="text-sm font-semibold text-[#1b1b21] dark:text-white">No transactions match current filter</p>
                                        <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-0.5">Try selecting another gateway, plan, or clearing the search bar.</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedTransactions.map((tx) => {
                                    const isAnnual = tx.plan === "ANNUAL";
                                    const displayId = tx.providerPaymentId || tx.id;

                                    return (
                                        <tr key={tx.id} class="hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors">
                                            {/* Transaction ID & Date */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-1.5 group">
                                                    <span class="font-['JetBrains_Mono',monospace] text-[11px] font-semibold text-[#1b1b21] dark:text-white">
                                                        {displayId}
                                                    </span>
                                                    <button
                                                        onClick$={() => copyToClipboard(displayId, "Transaction ID")}
                                                        class="opacity-0 group-hover:opacity-100 p-1 text-[#767683] hover:text-[#1b1b21] dark:hover:text-white transition-opacity cursor-pointer"
                                                        title="Copy ID"
                                                    >
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5">
                                                    {formatDateIST(tx.createdAt)} • {formatTimeIST(tx.createdAt)} IST
                                                </p>
                                            </td>

                                            {/* Customer */}
                                            <td class="py-3.5 px-4">
                                                <div class="min-w-0">
                                                    <p class="font-semibold text-[#1b1b21] dark:text-white truncate">
                                                        {tx.user?.firstName ? `${tx.user.firstName} ${tx.user.lastName || ""}`.trim() : "Subscriber"}
                                                    </p>
                                                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] truncate font-['JetBrains_Mono',monospace]">
                                                        {tx.user?.email || tx.userId}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Gateway */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                {tx.provider === "PADDLE" ? (
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
                                            </td>

                                            {/* Plan */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                {isAnnual ? (
                                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                                                        ★ Annual
                                                    </span>
                                                ) : (
                                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                                                        ⚡ Monthly
                                                    </span>
                                                )}
                                            </td>

                                            {/* Amount */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-['Syne',sans-serif] text-sm font-bold text-[#1b1b21] dark:text-white">
                                                    ${tx.amount.toFixed(2)}
                                                </span>
                                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] ml-1 font-['JetBrains_Mono',monospace]">
                                                    {tx.currency}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                {tx.status === "COMPLETED" ? (
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Completed
                                                    </span>
                                                ) : tx.status === "REFUNDED" ? (
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        Refunded
                                                    </span>
                                                ) : (
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Failed
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
                        Showing {paginatedTransactions.length} of {totalFiltered} transactions {totalFiltered !== allTransactions.value.length && `(filtered from ${allTransactions.value.length})`}
                    </span>
                    <div class="flex items-center gap-2">
                        <button
                            onClick$={() => currentPage.value = Math.max(1, currentPage.value - 1)}
                            disabled={safeCurrentPage <= 1 || isLoading.value}
                            class="px-2.5 py-1 rounded-[3px] border border-[#c6c5d3] dark:border-[#1e2030] bg-white dark:bg-[#1a1b26] disabled:opacity-40 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span class="font-['JetBrains_Mono',monospace]">
                            Page {safeCurrentPage} of {totalPagesCount}
                        </span>
                        <button
                            onClick$={() => currentPage.value = Math.min(totalPagesCount, safeCurrentPage + 1)}
                            disabled={safeCurrentPage >= totalPagesCount || isLoading.value}
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
