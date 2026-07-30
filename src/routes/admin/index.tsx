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

export default component$(() => {
    const users = useSignal<User[]>([]);
    const stats = useSignal<Stats | null>(null);
    const searchQuery = useSignal("");
    const roleFilter = useSignal<"ALL" | "ADMIN" | "USER">("ALL");
    
    const errorMsg = useSignal("");
    const actionMsg = useSignal("");
    const isActionLoading = useSignal(false);

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
            const url = `${API_BASE}/api/admin/users?search=${encodeURIComponent(searchQuery.value)}`;
            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Could not fetch users");
            const data = await res.json();
            users.value = data.users || [];
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

    const filteredUsers = users.value.filter(u => {
        if (roleFilter.value !== "ALL" && u.role !== roleFilter.value) return false;
        return true;
    });

    return (
        <div class="space-y-6">
            {/* Header */}
            <div>
                <h1 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                    User Directory
                </h1>
                <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1 font-['DM_Sans',sans-serif]">
                    Manage accounts, assigned roles, and connected applications.
                </p>
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
                    onInput$={(e) => (searchQuery.value = (e.target as HTMLInputElement).value)}
                    class="w-full sm:w-64 px-3 py-2 text-xs bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white placeholder-[#767683] focus:outline-none focus:border-[#1b1b21] dark:focus:border-white font-['DM_Sans',sans-serif]"
                />

                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={roleFilter.value}
                        onChange$={(e) => (roleFilter.value = (e.target as HTMLSelectElement).value as any)}
                        class="px-3 py-2 text-xs bg-[#f4f2f8] dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-[#1b1b21] dark:text-white focus:outline-none font-['DM_Sans',sans-serif]"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ADMIN">Admins Only</option>
                        <option value="USER">Users Only</option>
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
                                <th class="p-3">Registered Date</th>
                                <th class="p-3">Time</th>
                                <th class="p-3">App</th>
                                <th class="p-3">Role</th>
                                <th class="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#c6c5d3]/50 dark:divide-[#1e2030]">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} class="p-6 text-center text-[#767683] dark:text-[#94a3b8]">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => {
                                    const products = user.loggedInProducts || [];
                                    const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
                                    const createdTime = user.createdAt ? new Date(user.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) : "-";
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
            </div>
        </div>
    );
});
