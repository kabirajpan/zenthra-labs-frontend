import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { NotificationItem } from "~/lib/notify";

export default component$(() => {
    const notifications = useSignal<NotificationItem[]>([]);

    const removeNotification = $((id: string) => {
        notifications.value = notifications.value.filter((n) => n.id !== id);
    });

    useVisibleTask$(() => {
        const handleNotifyEvent = (e: Event) => {
            const detail = (e as CustomEvent<NotificationItem>).detail;
            if (!detail) return;

            // Add notification (max 5 stacked)
            notifications.value = [detail, ...notifications.value.slice(0, 4)];

            // Auto dismiss after specified duration
            if (detail.duration && detail.duration > 0) {
                setTimeout(() => {
                    removeNotification(detail.id);
                }, detail.duration);
            }
        };

        window.addEventListener("app:notify", handleNotifyEvent);
        return () => window.removeEventListener("app:notify", handleNotifyEvent);
    });

    if (notifications.value.length === 0) return null;

    return (
        <div
            id="global-notification-container"
            class="fixed top-3 right-3 sm:top-4 sm:right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-1.5rem)] sm:w-96 pointer-events-none"
            aria-live="polite"
        >
            {notifications.value.map((item) => (
                <div
                    key={item.id}
                    class="pointer-events-auto group bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] rounded-[6px] p-3 sm:p-3.5 flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                >
                    {/* Icon indicator */}
                    <div class="shrink-0 mt-0.5">
                        {item.type === "error" && (
                            <div class="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/30">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                        )}
                        {item.type === "success" && (
                            <div class="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        )}
                        {item.type === "warning" && (
                            <div class="w-6 h-6 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                        )}
                        {item.type === "info" && (
                            <div class="w-6 h-6 rounded-full bg-[#4352a5]/15 text-[#4352a5] dark:text-indigo-400 flex items-center justify-center border border-[#4352a5]/30">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Notification content */}
                    <div class="flex-1 min-w-0 pr-1">
                        <p class="text-xs text-[#1b1b21] dark:text-white font-['DM_Sans',sans-serif] leading-snug font-medium break-words">
                            {item.message}
                        </p>
                    </div>

                    {/* Close / Dismiss button */}
                    <button
                        onClick$={() => removeNotification(item.id)}
                        class="shrink-0 p-1 text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white rounded-[3px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="Dismiss notification"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
});
