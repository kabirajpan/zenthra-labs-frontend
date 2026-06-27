import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useTask$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

interface User {
    id: string;
    email: string | null;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    createdAt: string;
}

interface Stats {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    telemetry: {
        activeBuilds: number;
        avgLatencyMs: number;
        platformUptime: string;
        cpuLoad: string;
        memoryUsed: string;
    };
}

export default component$(() => {
    const users = useSignal<User[]>([]);
    const stats = useSignal<Stats | null>(null);
    const searchQuery = useSignal("");
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
            const url = `/api/admin/users?search=${encodeURIComponent(searchQuery.value)}`;
            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Could not fetch user directory");
            const data = await res.json();
            users.value = data.users;
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
            if (!res.ok) throw new Error("Could not fetch platform stats");
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
            const res = await fetch(`/api/admin/users/${user.id}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to update role");
            }

            actionMsg.value = `Successfully updated role for ${user.email} to ${newRole}`;
            await fetchUsers();
            await fetchStats();
        } catch (err: any) {
            errorMsg.value = err.message;
        } finally {
            isActionLoading.value = false;
        }
    });

    const handleDeleteUser = $(async (userId: string, email: string) => {
        if (!confirm(`Are you absolutely sure you want to delete account ${email}? This cannot be undone.`)) {
            return;
        }

        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        isActionLoading.value = true;
        actionMsg.value = "";
        errorMsg.value = "";

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete user");
            }

            actionMsg.value = `Successfully deleted account ${email}`;
            await fetchUsers();
            await fetchStats();
        } catch (err: any) {
            errorMsg.value = err.message;
        } finally {
            isActionLoading.value = false;
        }
    });

    return (
        <div class="space-y-8 transition-colors duration-200">
            {/* Top Header Title */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c6c5d3] dark:border-[#1e2030] pb-6">
                <div>
                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                        User Directory & Control
                    </h1>
                    <p class="text-sm text-[#454651] dark:text-[#94a3b8] mt-1">
                        System configuration database. Audit accounts, elevate access, or terminate active keys.
                    </p>
                </div>
            </div>

            {/* Notifications */}
            {errorMsg.value && (
                <div class="bg-rose-500/10 border border-rose-500/20 rounded-[4px] p-4 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{errorMsg.value}</span>
                </div>
            )}

            {actionMsg.value && (
                <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-[4px] p-4 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>{actionMsg.value}</span>
                </div>
            )}

            {/* Platform Stats Grid */}
            {stats.value && (
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 shadow-sm dark:shadow-xl">
                        <p class="text-[10px] font-bold text-[#767683] uppercase tracking-wider font-sans">Total Accounts</p>
                        <h4 class="text-2xl font-extrabold text-[#1b1b21] dark:text-white font-sans mt-2">
                            {stats.value.totalUsers}
                        </h4>
                    </div>
                    <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 shadow-sm dark:shadow-xl">
                        <p class="text-[10px] font-bold text-[#767683] uppercase tracking-wider font-sans">Administrators</p>
                        <h4 class="text-2xl font-extrabold text-amber-600 dark:text-amber-500 font-sans mt-2">
                            {stats.value.adminCount}
                        </h4>
                    </div>
                    <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 shadow-sm dark:shadow-xl">
                        <p class="text-[10px] font-bold text-[#767683] uppercase tracking-wider font-sans">Developers</p>
                        <h4 class="text-2xl font-extrabold text-[#4352a5] dark:text-indigo-400 font-sans mt-2">
                            {stats.value.userCount}
                        </h4>
                    </div>
                    <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 shadow-sm dark:shadow-xl">
                        <p class="text-[10px] font-bold text-[#767683] uppercase tracking-wider font-sans">CPU Core Load</p>
                        <h4 class="text-2xl font-extrabold text-[#1b1b21] dark:text-white font-sans mt-2">
                            {stats.value.telemetry.cpuLoad}
                        </h4>
                    </div>
                    <div class="bg-[#fbf8ff] dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] p-5 shadow-sm dark:shadow-xl">
                        <p class="text-[10px] font-bold text-[#767683] uppercase tracking-wider font-sans">API Latency</p>
                        <h4 class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans mt-2">
                            {stats.value.telemetry.avgLatencyMs}ms
                        </h4>
                    </div>
                </div>
            )}

            {/* Users Directory Table card */}
            <div class="bg-white dark:bg-[#0b0c11]/80 border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] shadow-sm dark:shadow-xl overflow-hidden">
                <div class="p-6 border-b border-[#c6c5d3] dark:border-[#1e2030] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 class="font-['Syne',sans-serif] font-bold text-[#1b1b21] dark:text-white text-base">Registered Developer Directory</h3>
                    {/* Search Field */}
                    <div class="w-full sm:max-w-xs relative">
                        <input
                            type="text"
                            placeholder="Search email or name..."
                            value={searchQuery.value}
                            onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                            class="w-full pl-9 pr-4 py-2 border border-[#c6c5d3] focus:border-[#4352a5]/50 rounded-[4px] text-xs outline-none bg-[#fbf8ff] text-neutral-900 placeholder-neutral-400 dark:border-[#1e2030] dark:bg-black/30 dark:text-white dark:placeholder-[#64748b] transition-all"
                        />
                        <svg class="absolute left-3 top-2.5 text-neutral-400 dark:text-[#64748b]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-neutral-50 dark:bg-black/20 border-b border-[#c6c5d3] dark:border-[#1e2030] text-xs font-bold text-[#767683] dark:text-[#94a3b8]">
                                <th class="p-4">Developer Profile</th>
                                <th class="p-4">Contact Info</th>
                                <th class="p-4">Clearance Level</th>
                                <th class="p-4">Created On</th>
                                <th class="p-4 text-right">Administrative Options</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-neutral-100 dark:divide-[#1e2030] text-sm text-[#1b1b21] dark:text-[#e2e8f0]">
                            {users.value.length === 0 ? (
                                <tr>
                                    <td colSpan={5} class="p-8 text-center text-xs text-neutral-400 dark:text-[#64748b] font-mono">
                                        No registered accounts match search filter criteria.
                                    </td>
                                </tr>
                            ) : (
                                users.value.map((u) => (
                                    <tr key={u.id} class="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01] transition-colors duration-150">
                                        <td class="p-4 font-semibold text-[#1b1b21] dark:text-white">
                                            {u.firstName} {u.lastName}
                                        </td>
                                        <td class="p-4 text-xs font-mono text-[#767683] dark:text-[#94a3b8]">
                                            {u.email || u.phoneNumber || "No contact info"}
                                        </td>
                                        <td class="p-4">
                                            {u.role === "ADMIN" ? (
                                                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-500 dark:border-amber-500/20 text-[10px] font-bold rounded-[4px]">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
                                                    ADMIN
                                                </span>
                                            ) : (
                                                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#e3e1e9] text-[#4352a5] border border-[#c6c5d3] dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 text-[10px] font-bold rounded-[4px]">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-[#5c6bc0] shadow-[0_0_6px_#6366f1]" />
                                                    USER
                                                </span>
                                            )}
                                        </td>
                                        <td class="p-4 text-xs text-[#767683] dark:text-[#94a3b8]">
                                            {new Date(u.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                             })}
                                        </td>
                                        <td class="p-4 text-right space-x-2">
                                            <button
                                                onClick$={async () => await handleRoleToggle(u)}
                                                disabled={isActionLoading.value}
                                                class="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-[#f5f2fa] text-[#1b1b21] border border-[#c6c5d3] dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10 rounded-[4px] transition-all duration-150 cursor-pointer disabled:opacity-50"
                                            >
                                                Toggle Role
                                            </button>
                                            <button
                                                onClick$={async () => await handleDeleteUser(u.id, u.email || "No Email")}
                                                disabled={isActionLoading.value}
                                                class="px-3 py-1.5 text-xs font-semibold bg-[#fbf8ff] hover:bg-[#f5f2fa] text-[#1b1b21] border border-[#c6c5d3] dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/20 rounded-[4px] transition-all duration-150 cursor-pointer disabled:opacity-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Admin Panel — Zenthra Control",
    meta: [
        { name: "description", content: "Platform administration and user accounts management." },
    ],
};
