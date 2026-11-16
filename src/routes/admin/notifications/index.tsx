import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useComputed$ } from "@builder.io/qwik";
import { notify } from "~/lib/notify";

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    link: string;
    thumbnail?: string | null;
    targetYoutube: boolean;
    targetTemplates: boolean;
    targetPush: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const parseAsUTC = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const str = (dateStr.endsWith("Z") || dateStr.includes("+") || dateStr.includes("-", 11))
        ? dateStr
        : `${dateStr}Z`;
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
};

const formatDateRelative = (dateStr?: string | null) => {
    const date = parseAsUTC(dateStr);
    if (!date) return "-";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
};

const formatFullDateIST = (dateStr?: string | null) => {
    const date = parseAsUTC(dateStr);
    if (!date) return "-";
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });
};

const extractYouTubeThumbnail = (url: string): string | null => {
    if (!url) return null;
    const trimmed = url.trim();

    // youtu.be/<id>
    const beMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (beMatch && beMatch[1]) {
        return `https://img.youtube.com/vi/${beMatch[1]}/hqdefault.jpg`;
    }

    // watch?v=<id>
    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch && watchMatch[1]) {
        return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
    }

    // /shorts/<id>
    const shortsMatch = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) {
        return `https://img.youtube.com/vi/${shortsMatch[1]}/hqdefault.jpg`;
    }

    return null;
};

export default component$(() => {
    const notifications = useSignal<AppNotification[]>([]);
    const isLoading = useSignal(true);
    const isRefreshing = useSignal(false);
    const isSaving = useSignal(false);

    // Selected item for right panel view
    const selectedId = useSignal<string | null>(null);

    // View / Edit / Create modes
    const isFormMode = useSignal(false);
    const isEditing = useSignal(false);

    // Filter controls
    const searchQuery = useSignal("");
    const statusFilter = useSignal<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

    // Form states
    const formId = useSignal("");
    const formTitle = useSignal("");
    const formMessage = useSignal("");
    const formLink = useSignal("");
    const formThumbnail = useSignal("");
    const formTargetYoutube = useSignal(true);
    const formTargetTemplates = useSignal(false);
    const formTargetPush = useSignal(true);
    const formIsActive = useSignal(true);

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const fetchNotifications = $(async (silent = false) => {
        if (!silent) isLoading.value = true;
        else isRefreshing.value = true;

        const token = await getCookie("zenthra_auth_token");
        if (!token) {
            isLoading.value = false;
            isRefreshing.value = false;
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/admin/notifications`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Could not fetch notifications");
            const data = await res.json();
            const list: AppNotification[] = data.notifications || [];
            notifications.value = list;

            // Auto-select first item if none selected and not in form mode
            if (!isFormMode.value && list.length > 0 && !selectedId.value) {
                selectedId.value = list[0].id;
            }
        } catch (err: any) {
            notify.error(err.message || "Failed to load notifications");
        } finally {
            isLoading.value = false;
            isRefreshing.value = false;
        }
    });

    useVisibleTask$(async () => {
        await fetchNotifications();
    });

    const filteredNotifications = useComputed$(() => {
        return notifications.value.filter(n => {
            if (statusFilter.value === "ACTIVE" && !n.isActive) return false;
            if (statusFilter.value === "INACTIVE" && n.isActive) return false;

            if (searchQuery.value.trim()) {
                const q = searchQuery.value.toLowerCase();
                const matchTitle = n.title.toLowerCase().includes(q);
                const matchMsg = n.message.toLowerCase().includes(q);
                const matchLink = n.link.toLowerCase().includes(q);
                if (!matchTitle && !matchMsg && !matchLink) return false;
            }

            return true;
        });
    });

    const selectedNotification = useComputed$(() => {
        if (!selectedId.value) return null;
        return notifications.value.find(n => n.id === selectedId.value) || null;
    });

    // Auto-detect thumbnail for form
    const detectedThumbnail = useComputed$(() => {
        if (formThumbnail.value.trim()) return formThumbnail.value.trim();
        return extractYouTubeThumbnail(formLink.value);
    });

    const openCreateForm = $(() => {
        formId.value = "";
        formTitle.value = "";
        formMessage.value = "";
        formLink.value = "";
        formThumbnail.value = "";
        formTargetYoutube.value = true;
        formTargetTemplates.value = false;
        formTargetPush.value = true;
        formIsActive.value = true;
        isEditing.value = false;
        isFormMode.value = true;
    });

    const openEditForm = $((notif: AppNotification) => {
        formId.value = notif.id;
        formTitle.value = notif.title;
        formMessage.value = notif.message;
        formLink.value = notif.link;
        formThumbnail.value = notif.thumbnail || "";
        formTargetYoutube.value = notif.targetYoutube;
        formTargetTemplates.value = notif.targetTemplates;
        formTargetPush.value = notif.targetPush;
        formIsActive.value = notif.isActive;
        isEditing.value = true;
        isFormMode.value = true;
    });

    const cancelForm = $(() => {
        isFormMode.value = false;
        isEditing.value = false;
    });

    const handleSave = $(async () => {
        if (!formTitle.value.trim()) {
            notify.error("Title is required");
            return;
        }
        if (!formTargetYoutube.value && !formTargetTemplates.value && !formTargetPush.value) {
            notify.error("Select at least one destination (YouTube, Templates, or Push)");
            return;
        }

        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        isSaving.value = true;
        try {
            const payload = {
                title: formTitle.value.trim(),
                message: formMessage.value.trim(),
                link: formLink.value.trim(),
                thumbnail: formThumbnail.value.trim() || null,
                targetYoutube: formTargetYoutube.value,
                targetTemplates: formTargetTemplates.value,
                targetPush: formTargetPush.value,
                isActive: formIsActive.value,
            };

            let res;
            if (isEditing.value && formId.value) {
                res = await fetch(`${API_BASE}/api/admin/notifications/${formId.value}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                res = await fetch(`${API_BASE}/api/admin/notifications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            }

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to save notification");
            }

            const data = await res.json();
            notify.success(isEditing.value ? "Notification updated!" : "Notification created & broadcasted!");
            
            isFormMode.value = false;
            isEditing.value = false;
            await fetchNotifications(true);

            if (data.notification?.id) {
                selectedId.value = data.notification.id;
            }
        } catch (err: any) {
            notify.error(err.message || "Failed to save notification");
        } finally {
            isSaving.value = false;
        }
    });

    const toggleNotificationActive = $(async (notif: AppNotification) => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        const newActive = !notif.isActive;
        try {
            const res = await fetch(`${API_BASE}/api/admin/notifications/${notif.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: newActive })
            });

            if (!res.ok) throw new Error("Could not update status");
            
            // Optimistic update
            notifications.value = notifications.value.map(n =>
                n.id === notif.id ? { ...n, isActive: newActive } : n
            );
            notify.success(newActive ? "Notification activated" : "Notification paused");
        } catch (err: any) {
            notify.error(err.message || "Status update failed");
        }
    });

    const handleDelete = $(async (id: string) => {
        if (!confirm("Are you sure you want to delete this notification?")) return;

        const token = await getCookie("zenthra_auth_token");
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/admin/notifications/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Failed to delete notification");

            notify.success("Notification deleted");
            notifications.value = notifications.value.filter(n => n.id !== id);
            if (selectedId.value === id) {
                selectedId.value = notifications.value[0]?.id || null;
            }
        } catch (err: any) {
            notify.error(err.message || "Delete failed");
        }
    });

    return (
        <div class="h-full flex flex-col min-h-0 bg-white dark:bg-[#121215] border border-black/10 dark:border-[#27272a] rounded-[4px] overflow-hidden shadow-sm">
            {/* Top Toolbar Header */}
            <div class="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-[#27272a] bg-zinc-50/50 dark:bg-[#16161a]">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-[4px] bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] flex items-center justify-center font-bold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h1 class="text-sm font-bold text-zinc-900 dark:text-white">App & Push Notifications</h1>
                            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                {notifications.value.length} total
                            </span>
                        </div>
                        <p class="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Manage Homescreen card badges & mobile system push notifications
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        onClick$={() => fetchNotifications(true)}
                        disabled={isRefreshing.value}
                        title="Refresh list"
                        class="p-2 rounded-[4px] border border-black/10 dark:border-[#27272a] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs"
                    >
                        <svg class={isRefreshing.value ? "animate-spin" : ""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                        </svg>
                    </button>

                    <button
                        onClick$={openCreateForm}
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        New Notification
                    </button>
                </div>
            </div>

            {/* Two-Pane Inbox Layout */}
            <div class="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-[#27272a]">
                
                {/* ── LEFT PANE: Compact Notification List (Inbox Style) ── */}
                <div class="md:col-span-5 lg:col-span-4 flex flex-col min-h-0 bg-zinc-50/40 dark:bg-[#151518]/70">
                    
                    {/* Search & Filter Bar */}
                    <div class="p-2.5 border-b border-black/10 dark:border-[#27272a] space-y-2">
                        <div class="relative">
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={searchQuery.value}
                                onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                                class="w-full text-xs pl-8 pr-3 py-1.5 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-white dark:bg-[#121215] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                            />
                            <svg class="absolute left-2.5 top-2 text-zinc-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>

                        {/* Status Filter Chips */}
                        <div class="flex items-center gap-1 text-[11px]">
                            {(["ALL", "ACTIVE", "INACTIVE"] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick$={() => statusFilter.value = tab}
                                    class={[
                                        "px-2.5 py-0.5 rounded-[3px] font-medium transition-colors",
                                        statusFilter.value === tab
                                            ? "bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] font-semibold"
                                            : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
                                    ].join(" ")}
                                >
                                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Compact List */}
                    <div class="flex-1 min-h-0 overflow-y-auto divide-y divide-black/5 dark:divide-[#27272a]/60">
                        {isLoading.value ? (
                            <div class="p-6 text-center text-xs text-zinc-400 flex flex-col items-center gap-2">
                                <div class="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                                Loading broadcasts...
                            </div>
                        ) : filteredNotifications.value.length === 0 ? (
                            <div class="p-8 text-center text-xs text-zinc-400">
                                No notifications match your filter.
                            </div>
                        ) : (
                            filteredNotifications.value.map(item => {
                                const isSelected = selectedId.value === item.id && !isFormMode.value;
                                return (
                                    <div
                                        key={item.id}
                                        onClick$={() => {
                                            selectedId.value = item.id;
                                            isFormMode.value = false;
                                        }}
                                        class={[
                                            "p-3 cursor-pointer transition-all border-l-2 text-left relative",
                                            isSelected
                                                ? "bg-white dark:bg-[#1e1e24] border-black dark:border-white shadow-xs"
                                                : "border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                        ].join(" ")}
                                    >
                                        <div class="flex items-start justify-between gap-2 mb-1">
                                            <div class="flex items-center gap-2 min-w-0">
                                                {/* Active status indicator dot */}
                                                <span
                                                    class={[
                                                        "w-2 h-2 rounded-full shrink-0",
                                                        item.isActive ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-zinc-400 dark:bg-zinc-600"
                                                    ].join(" ")}
                                                    title={item.isActive ? "Active / Broadcasting" : "Inactive / Paused"}
                                                />
                                                <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <span class="text-[10px] text-zinc-400 shrink-0">
                                                {formatDateRelative(item.createdAt)}
                                            </span>
                                        </div>

                                        {/* Truncated message preview */}
                                        <p class="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">
                                            {item.message || "(No description)"}
                                        </p>

                                        {/* Channel Badges */}
                                        <div class="flex items-center gap-1.5 flex-wrap">
                                            {item.targetYoutube && (
                                                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                    </svg>
                                                    YouTube
                                                </span>
                                            )}
                                            {item.targetTemplates && (
                                                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                        <line x1="3" y1="9" x2="21" y2="9"/>
                                                        <line x1="9" y1="21" x2="9" y2="9"/>
                                                    </svg>
                                                    Templates
                                                </span>
                                            )}
                                            {item.targetPush && (
                                                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                                    </svg>
                                                    Push
                                                </span>
                                            )}
                                            {item.thumbnail && (
                                                <span class="inline-flex items-center gap-0.5 text-[9px] text-zinc-400" title="Includes thumbnail image">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                                        <polyline points="21 15 16 10 5 21"/>
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ── RIGHT PANE: Details View OR Create/Edit Form ── */}
                <div class="md:col-span-7 lg:col-span-8 flex flex-col min-h-0 bg-white dark:bg-[#121215]">
                    
                    {/* MODE 1: CREATE / EDIT FORM */}
                    {isFormMode.value ? (
                        <div class="h-full flex flex-col min-h-0">
                            {/* Form Header */}
                            <div class="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-[#27272a] bg-zinc-50/30 dark:bg-[#16161a]/40">
                                <div>
                                    <h2 class="text-sm font-bold text-zinc-900 dark:text-white">
                                        {isEditing.value ? "Edit Notification" : "Compose New Broadcast"}
                                    </h2>
                                    <p class="text-[11px] text-zinc-500 dark:text-zinc-400">
                                        Deliver to app cards, system push bar, or both simultaneously
                                    </p>
                                </div>
                                <button
                                    onClick$={cancelForm}
                                    class="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Form Fields Body */}
                            <div class="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
                                {/* Title */}
                                <div>
                                    <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                        Notification Title <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. New YouTube Tutorial: Master 3D Shapes in AfterMotion!"
                                        value={formTitle.value}
                                        onInput$={(e) => formTitle.value = (e.target as HTMLInputElement).value}
                                        class="w-full text-xs px-3 py-2 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-white dark:bg-[#18181c] text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                        Short Message / Description <span class="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Brief summary displayed in push notification body and card tooltip..."
                                        value={formMessage.value}
                                        onInput$={(e) => formMessage.value = (e.target as HTMLTextAreaElement).value}
                                        class="w-full text-xs px-3 py-2 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-white dark:bg-[#18181c] text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 resize-none"
                                    />
                                </div>

                                {/* Target Link */}
                                <div>
                                    <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                        Target Link (Direct URL)
                                    </label>
                                    <div class="relative">
                                        <input
                                            type="url"
                                            placeholder="https://youtu.be/... or https://zenthralabs.com/templates/..."
                                            value={formLink.value}
                                            onInput$={(e) => formLink.value = (e.target as HTMLInputElement).value}
                                            class="w-full text-xs pl-8 pr-3 py-2 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-white dark:bg-[#18181c] text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 font-mono"
                                        />
                                        <svg class="absolute left-2.5 top-2.5 text-zinc-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                        </svg>
                                    </div>
                                    <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                                        When users tap the badge or push notification, this URL will open directly.
                                    </p>
                                </div>

                                {/* Target Destinations Checkboxes */}
                                <div>
                                    <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Target Destinations <span class="text-red-500">*</span>
                                    </label>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {/* YouTube Box Card */}
                                        <label
                                            class={[
                                                "flex items-start gap-3 p-3 rounded-[4px] border cursor-pointer transition-all",
                                                formTargetYoutube.value
                                                    ? "bg-red-500/5 border-red-500/40 text-red-950 dark:text-red-200"
                                                    : "bg-transparent border-black/10 dark:border-[#27272a] opacity-70"
                                            ].join(" ")}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formTargetYoutube.value}
                                                onChange$={(e) => formTargetYoutube.value = (e.target as HTMLInputElement).checked}
                                                class="mt-0.5 rounded border-zinc-400 text-red-600 focus:ring-red-500"
                                            />
                                            <div class="min-w-0">
                                                <div class="flex items-center gap-1.5">
                                                    <span class="text-xs font-bold">YouTube Box</span>
                                                </div>
                                                <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Badges the YouTube box on HomeScreen until user taps it
                                                </p>
                                            </div>
                                        </label>

                                        {/* Templates Box Card */}
                                        <label
                                            class={[
                                                "flex items-start gap-3 p-3 rounded-[4px] border cursor-pointer transition-all",
                                                formTargetTemplates.value
                                                    ? "bg-purple-500/5 border-purple-500/40 text-purple-950 dark:text-purple-200"
                                                    : "bg-transparent border-black/10 dark:border-[#27272a] opacity-70"
                                            ].join(" ")}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formTargetTemplates.value}
                                                onChange$={(e) => formTargetTemplates.value = (e.target as HTMLInputElement).checked}
                                                class="mt-0.5 rounded border-zinc-400 text-purple-600 focus:ring-purple-500"
                                            />
                                            <div class="min-w-0">
                                                <div class="flex items-center gap-1.5">
                                                    <span class="text-xs font-bold">Templates Box</span>
                                                </div>
                                                <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Badges the Templates box on HomeScreen until user taps it
                                                </p>
                                            </div>
                                        </label>

                                        {/* System Push Bar Card */}
                                        <label
                                            class={[
                                                "flex items-start gap-3 p-3 rounded-[4px] border cursor-pointer transition-all",
                                                formTargetPush.value
                                                    ? "bg-blue-500/5 border-blue-500/40 text-blue-950 dark:text-blue-200"
                                                    : "bg-transparent border-black/10 dark:border-[#27272a] opacity-70"
                                            ].join(" ")}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formTargetPush.value}
                                                onChange$={(e) => formTargetPush.value = (e.target as HTMLInputElement).checked}
                                                class="mt-0.5 rounded border-zinc-400 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div class="min-w-0">
                                                <div class="flex items-center gap-1.5">
                                                    <span class="text-xs font-bold">System Push</span>
                                                </div>
                                                <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Android status bar notification with thumbnail picture
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Thumbnail URL & Auto-detection Preview */}
                                <div class="p-3.5 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-zinc-50/50 dark:bg-[#16161a]">
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                            Thumbnail / Media Preview
                                        </label>
                                        {detectedThumbnail.value && (
                                            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Thumbnail detected
                                            </span>
                                        )}
                                    </div>

                                    <div class="flex flex-col sm:flex-row gap-3 items-start">
                                        {detectedThumbnail.value ? (
                                            <div class="w-36 h-20 rounded-[4px] overflow-hidden bg-black shrink-0 border border-black/10 dark:border-[#27272a]">
                                                <img
                                                    src={detectedThumbnail.value}
                                                    alt="Thumbnail preview"
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div class="w-36 h-20 rounded-[4px] border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-zinc-400 text-[10px] shrink-0">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-1">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                                    <polyline points="21 15 16 10 5 21"/>
                                                </svg>
                                                No thumbnail
                                            </div>
                                        )}

                                        <div class="flex-1 w-full space-y-1">
                                            <input
                                                type="url"
                                                placeholder="Custom thumbnail URL (auto-populated if YouTube link is used)"
                                                value={formThumbnail.value}
                                                onInput$={(e) => formThumbnail.value = (e.target as HTMLInputElement).value}
                                                class="w-full text-xs px-3 py-1.5 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-white dark:bg-[#18181c] text-zinc-900 dark:text-white font-mono text-[11px]"
                                            />
                                            <p class="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                For YouTube links, the HQ thumbnail is automatically extracted. You can also paste any custom image URL.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Immediately Toggle */}
                                <div class="flex items-center justify-between p-3.5 rounded-[4px] border border-black/10 dark:border-[#27272a] bg-zinc-50/50 dark:bg-[#16161a]">
                                    <div>
                                        <div class="text-xs font-semibold text-zinc-900 dark:text-white">Active Status</div>
                                        <div class="text-[10px] text-zinc-500 dark:text-zinc-400">
                                            When enabled, this notification becomes immediately live to all app users
                                        </div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formIsActive.value}
                                            onChange$={(e) => formIsActive.value = (e.target as HTMLInputElement).checked}
                                            class="sr-only peer"
                                        />
                                        <div class="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Form Footer */}
                            <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/10 dark:border-[#27272a] bg-zinc-50/30 dark:bg-[#16161a]/40">
                                <button
                                    onClick$={cancelForm}
                                    class="px-4 py-2 rounded-[4px] border border-black/10 dark:border-[#27272a] text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick$={handleSave}
                                    disabled={isSaving.value}
                                    class="flex items-center gap-1.5 px-5 py-2 rounded-[4px] bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] text-xs font-semibold hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
                                >
                                    {isSaving.value && (
                                        <div class="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    )}
                                    {isEditing.value ? "Save Changes" : "Publish Broadcast"}
                                </button>
                            </div>
                        </div>
                    ) : selectedNotification.value ? (
                        /* MODE 2: DETAILS VIEW */
                        <div class="h-full flex flex-col min-h-0">
                            {/* Details Header */}
                            <div class="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-[#27272a] bg-zinc-50/30 dark:bg-[#16161a]/40">
                                <div class="flex items-center gap-3">
                                    <span
                                        class={[
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-bold",
                                            selectedNotification.value.isActive
                                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                                : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/30"
                                        ].join(" ")}
                                    >
                                        <span class={["w-2 h-2 rounded-full", selectedNotification.value.isActive ? "bg-emerald-500" : "bg-zinc-400"].join(" ")} />
                                        {selectedNotification.value.isActive ? "LIVE / BROADCASTING" : "PAUSED / INACTIVE"}
                                    </span>
                                    <span class="text-xs text-zinc-400">
                                        Created: {formatFullDateIST(selectedNotification.value.createdAt)}
                                    </span>
                                </div>

                                <div class="flex items-center gap-2">
                                    <button
                                        onClick$={() => toggleNotificationActive(selectedNotification.value!)}
                                        class="px-3 py-1.5 rounded-[4px] border border-black/10 dark:border-[#27272a] text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                    >
                                        {selectedNotification.value.isActive ? "Pause" : "Activate"}
                                    </button>
                                    <button
                                        onClick$={() => openEditForm(selectedNotification.value!)}
                                        class="px-3 py-1.5 rounded-[4px] bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick$={() => handleDelete(selectedNotification.value!.id)}
                                        title="Delete notification"
                                        class="p-1.5 rounded-[4px] border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"/>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Details Body */}
                            <div class="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
                                {/* Title & Message */}
                                <div>
                                    <h2 class="text-base font-bold text-zinc-900 dark:text-white mb-2">
                                        {selectedNotification.value.title}
                                    </h2>
                                    <p class="text-xs text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                        {selectedNotification.value.message}
                                    </p>
                                </div>

                                {/* Destinations */}
                                <div>
                                    <h4 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Target Destinations</h4>
                                    <div class="flex items-center gap-2 flex-wrap">
                                        {selectedNotification.value.targetYoutube && (
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                                YouTube Homescreen Box Badge
                                            </div>
                                        )}
                                        {selectedNotification.value.targetTemplates && (
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                    <line x1="3" y1="9" x2="21" y2="9"/>
                                                    <line x1="9" y1="21" x2="9" y2="9"/>
                                                </svg>
                                                Templates Homescreen Box Badge
                                            </div>
                                        )}
                                        {selectedNotification.value.targetPush && (
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                                </svg>
                                                Android System Push Notification
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Link */}
                                {selectedNotification.value.link && (
                                    <div>
                                        <h4 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Target Action Link</h4>
                                        <div class="flex items-center gap-2 p-2.5 rounded-[4px] bg-zinc-50 dark:bg-[#18181c] border border-black/10 dark:border-[#27272a]">
                                            <span class="text-xs font-mono text-zinc-700 dark:text-zinc-300 truncate flex-1">
                                                {selectedNotification.value.link}
                                            </span>
                                            <a
                                                href={selectedNotification.value.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="flex items-center gap-1 px-2.5 py-1 rounded-[3px] bg-zinc-200 dark:bg-zinc-800 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 hover:opacity-80 transition-opacity shrink-0"
                                            >
                                                Open
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                                    <polyline points="15 3 21 3 21 9"/>
                                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Thumbnail Preview */}
                                {selectedNotification.value.thumbnail && (
                                    <div>
                                        <h4 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Attached Thumbnail Picture</h4>
                                        <div class="max-w-md rounded-[6px] overflow-hidden border border-black/10 dark:border-[#27272a] shadow-sm bg-black">
                                            <img
                                                src={selectedNotification.value.thumbnail}
                                                alt="Notification thumbnail"
                                                class="w-full h-auto object-cover max-h-56"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Realistic Mobile Notification Simulation Preview */}
                                <div>
                                    <h4 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Mobile Client Simulation Preview</h4>
                                    <div class="p-4 rounded-[8px] bg-zinc-900 text-white max-w-md border border-zinc-800 space-y-3">
                                        <div class="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800 pb-2">
                                            <div class="flex items-center gap-1.5">
                                                <div class="w-4 h-4 rounded bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-[9px] font-black">
                                                    A
                                                </div>
                                                <span>AfterMotion • Now</span>
                                            </div>
                                            <span>System Alert</span>
                                        </div>
                                        <div class="flex gap-3">
                                            <div class="flex-1 min-w-0">
                                                <div class="text-xs font-bold text-white mb-0.5 truncate">
                                                    {selectedNotification.value.title}
                                                </div>
                                                <div class="text-[11px] text-zinc-300 line-clamp-2">
                                                    {selectedNotification.value.message}
                                                </div>
                                            </div>
                                            {selectedNotification.value.thumbnail && (
                                                <img
                                                    src={selectedNotification.value.thumbnail}
                                                    alt="thumb"
                                                    class="w-12 h-12 rounded object-cover shrink-0 bg-zinc-800"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* MODE 3: EMPTY STATE */
                        <div class="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                            <div class="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center mb-3">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </div>
                            <h3 class="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                No Notification Selected
                            </h3>
                            <p class="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xs mb-4">
                                Select an active notification from the left list to review its configuration or broadcast a new update.
                            </p>
                            <button
                                onClick$={openCreateForm}
                                class="px-3.5 py-1.5 rounded-[4px] bg-[#1b1b21] dark:bg-white text-white dark:text-[#1b1b21] text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                            >
                                + New Notification
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

