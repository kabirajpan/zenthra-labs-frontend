import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useTask$ } from "@builder.io/qwik";

interface User {
    id: string;
    email: string | null;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    createdAt: string;
    lastDevice?: string | null;
    loggedInProducts?: string[];
}

interface Stats {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    afterMotionCount: number;
    webAppCount: number;
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
    const users = useSignal<User[]>([]);
    const stats = useSignal<Stats | null>(null);
    const searchQuery = useSignal("");
    const roleFilter = useSignal<"ALL" | "ADMIN" | "USER">("ALL");
    
    // Pagination signals
    const currentPage = useSignal(1);
    const totalPages = useSignal(1);
    const totalUsersCount = useSignal(0);
    const limit = useSignal(10);

    const errorMsg = useSignal("");
    const actionMsg = useSignal("");
    const isActionLoading = useSignal(false);
    const isRefreshing = useSignal(false);

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const fetchUsers = $(async () => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        try {
            const roleParam = roleFilter.value !== "ALL" ? `&role=${roleFilter.value}` : "";
            const url = `${API_BASE}/api/admin/users?page=${currentPage.value}&limit=${limit.value}&search=${encodeURIComponent(searchQuery.value)}${roleParam}`;
            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Could not fetch users");
            const data = await res.json();
            users.value = data.users || [];
            if (data.pagination) {
                totalUsersCount.value = data.pagination.totalUsers;
                totalPages.value = data.pagination.totalPages;
                currentPage.value = data.pagination.currentPage;
            }
        } catch (e: any) {
            errorMsg.value = e.message;
        }
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
        } catch (e: any) {
            errorMsg.value = e.message;
        }
    });

    useVisibleTask$(async () => {
        await fetchUsers();
        await fetchStats();
    });

    useTask$(({ track }) => {
        track(() => searchQuery.value);
        track(() => roleFilter.value);
        track(() => currentPage.value);
        track(() => limit.value);

        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            fetchUsers();
        }
    });

    const handleRoleToggle = $(async (user: User) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
        isActionLoading.value = true;
        actionMsg.value = "";
        errorMsg.value = "";

        try {
            const res = await fetch(`${API_BASE}/api/admin/users/${user.id}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update role");

            actionMsg.value = `Updated role for ${user.firstName}`;
            await fetchUsers();
            await fetchStats();
        } catch (err: any) {
            errorMsg.value = err.message;
        } finally {
            isActionLoading.value = false;
        }
    });

    const handleDeleteUser = $(async (userId: string, email: string) => {
        if (!confirm(`Delete user ${email}?`)) return;

        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        isActionLoading.value = true;
        actionMsg.value = "";
        errorMsg.value = "";

        try {
            const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete user");

            actionMsg.value = `Deleted ${email}`;
            await fetchUsers();
            await fetchStats();
        } catch (err: any) {
            errorMsg.value = err.message;
        } finally {
            isActionLoading.value = false;
        }
    });

    return (
        <div class="space-y-6">
            {/* Header */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                        User Directory
                    </h1>
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1 font-['DM_Sans',sans-serif]">
                        Manage accounts, assigned roles, and connected applications.
                    </p>
                </div>
                <button
                    type="button"
                    onClick$={async () => {
                        isRefreshing.value = true;
                        actionMsg.value = "";
                        errorMsg.value = "";
                        await Promise.all([fetchUsers(), fetchStats()]);
                        isRefreshing.value = false;
                    }}
                    disabled={isRefreshing.value}
                    class="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-[4px] bg-[#f4f2f8] dark:bg-[#12131b] text-[#1b1b21] dark:text-white border border-[#c6c5d3] dark:border-[#1e2030] hover:bg-[#e6e4ed] dark:hover:bg-[#1a1c29] active:scale-95 transition-all disabled:opacity-50 font-['DM_Sans',sans-serif] cursor-pointer shadow-sm"
                    title="Refresh Directory Data"
                >
                    <svg
                        class={`w-3.5 h-3.5 ${isRefreshing.value ? 'animate-spin' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    <span>{isRefreshing.value ? "Refreshing..." : "Refresh"}</span>
                </button>
            </div>

            {/* Notifications */}
            {errorMsg.value && (
                <div class="p-3 text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-[4px]">
                    {errorMsg.value}
                </div>
            )}
            {actionMsg.value && (
                <div class="p-3 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-[4px]">
                    {actionMsg.value}
                </div>
            )}

            {/* Minimal Indicators */}
            {stats.value && (
                <div class="grid grid-cols-3 gap-4 font-['JetBrains_Mono',monospace]">
                    <div class="p-4 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px]">
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase block">Total Users</span>
                        <span class="text-xl font-bold text-[#1b1b21] dark:text-white mt-1 block">{stats.value.totalUsers}</span>
                    </div>

                    <div class="p-4 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px]">
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase block">After Motion</span>
                        <span class="text-xl font-bold text-[#1b1b21] dark:text-white mt-1 block">{stats.value.afterMotionCount || 0}</span>
                    </div>

                    <div class="p-4 bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px]">
                        <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase block">Admins</span>
                        <span class="text-xl font-bold text-[#1b1b21] dark:text-white mt-1 block">{stats.value.adminCount}</span>
                    </div>
                </div>
            )}

            {/* Search & Filter Bar */}
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery.value}
                    onInput$={(e) => {
                        searchQuery.value = (e.target as HTMLInputElement).value;
                        currentPage.value = 1;
                    }}
                    class="w-full sm:w-64 px-3 py-2 text-xs bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white placeholder-[#767683] focus:outline-none focus:border-[#1b1b21] dark:focus:border-white font-['DM_Sans',sans-serif]"
                />

                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={roleFilter.value}
                        onChange$={(e) => {
                            roleFilter.value = (e.target as HTMLSelectElement).value as any;
                            currentPage.value = 1;
                        }}
                        class="px-3 py-2 text-xs bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white focus:outline-none font-['DM_Sans',sans-serif]"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ADMIN">Admins Only</option>
                        <option value="USER">Users Only</option>
                    </select>

                    <select
                        value={limit.value}
                        onChange$={(e) => {
                            limit.value = parseInt((e.target as HTMLSelectElement).value, 10);
                            currentPage.value = 1;
                        }}
                        class="px-3 py-2 text-xs bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white focus:outline-none font-['DM_Sans',sans-serif]"
                    >
                        <option value={10}>10 / page</option>
                        <option value={25}>25 / page</option>
                        <option value={50}>50 / page</option>
                    </select>
                </div>
            </div>

            {/* Clean Table */}
            <div class="border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] overflow-hidden bg-white dark:bg-[#0b0c11]">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-['DM_Sans',sans-serif]">
                        <thead>
                            <tr class="bg-[#f4f2f8] dark:bg-[#12131b] border-b border-[#c6c5d3] dark:border-[#1e2030] text-[#767683] dark:text-[#94a3b8] font-mono text-[11px]">
                                <th class="p-3">User</th>
                                <th class="p-3">Email / Phone</th>
                                <th class="p-3">Registered Date (IST)</th>
                                <th class="p-3">Time (IST)</th>
                                <th class="p-3">App</th>
                                <th class="p-3">Role</th>
                                <th class="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#c6c5d3]/50 dark:divide-[#1e2030]">
                            {users.value.length === 0 ? (
                                <tr>
                                    <td colSpan={7} class="p-6 text-center text-[#767683] dark:text-[#94a3b8]">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.value.map((user) => {
                                    const products = user.loggedInProducts || [];
                                    const createdDate = formatDateIST(user.createdAt);
                                    const createdTime = formatTimeIST(user.createdAt);
                                    return (
                                        <tr key={user.id} class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td class="p-3 font-semibold text-[#1b1b21] dark:text-white">
                                                {user.firstName} {user.lastName}
                                            </td>

                                            <td class="p-3 text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace]">
                                                {user.email || user.phoneNumber || "-"}
                                            </td>

                                            <td class="p-3 text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace]">
                                                {createdDate}
                                            </td>

                                            <td class="p-3 text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace]">
                                                {createdTime}
                                            </td>

                                            <td class="p-3 font-['JetBrains_Mono',monospace] text-[11px]">
                                                {products.includes("after-motion") ? (
                                                    <span class="text-purple-600 dark:text-purple-400 font-bold">After Motion</span>
                                                ) : (
                                                    <span class="text-[#767683]">Web</span>
                                                )}
                                            </td>

                                            <td class="p-3 font-['JetBrains_Mono',monospace] text-[10px]">
                                                <span class={user.role === "ADMIN" ? "font-bold text-[#1b1b21] dark:text-white" : "text-[#767683]"}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td class="p-3 text-right space-x-2">
                                                <button
                                                    onClick$={() => handleRoleToggle(user)}
                                                    disabled={isActionLoading.value}
                                                    class="px-2.5 py-1 text-[11px] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[2px] hover:bg-[#1b1b21] hover:text-white dark:hover:bg-white dark:hover:text-[#1b1b21] transition-colors"
                                                >
                                                    {user.role === "ADMIN" ? "Make User" : "Make Admin"}
                                                </button>

                                                <button
                                                    onClick$={() => handleDeleteUser(user.id, user.email || user.firstName)}
                                                    disabled={isActionLoading.value}
                                                    class="px-2.5 py-1 text-[11px] text-rose-600 dark:text-rose-400 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div class="px-4 py-3 bg-[#f4f2f8] dark:bg-[#12131b] border-t border-[#c6c5d3] dark:border-[#1e2030] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-['DM_Sans',sans-serif]">
                    <div class="text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] text-[11px]">
                        Showing <span class="font-bold text-[#1b1b21] dark:text-white">{users.value.length}</span> of <span class="font-bold text-[#1b1b21] dark:text-white">{totalUsersCount.value}</span> total users
                    </div>

                    <div class="flex items-center gap-2">
                        <button
                            onClick$={() => (currentPage.value = Math.max(1, currentPage.value - 1))}
                            disabled={currentPage.value <= 1}
                            class="px-3 py-1.5 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-xs font-semibold text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            &larr; Prev
                        </button>

                        <span class="px-3 py-1 bg-white dark:bg-[#0b0c11] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-xs font-['JetBrains_Mono',monospace] text-[#1b1b21] dark:text-white font-bold">
                            Page {currentPage.value} of {totalPages.value}
                        </span>

                        <button
                            onClick$={() => (currentPage.value = Math.min(totalPages.value, currentPage.value + 1))}
                            disabled={currentPage.value >= totalPages.value}
                            class="px-3 py-1.5 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-xs font-semibold text-[#1b1b21] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
