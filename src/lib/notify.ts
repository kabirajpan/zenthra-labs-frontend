export type NotificationType = "error" | "success" | "info" | "warning";

export interface NotificationItem {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

const emit = (type: NotificationType, message: string, duration?: number) => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent("app:notify", {
                detail: {
                    id: Math.random().toString(36).substring(2, 9),
                    type,
                    message,
                    duration: duration ?? (type === "error" ? 5000 : 4000),
                } as NotificationItem,
            })
        );
    }
};

export const notify = {
    error: (message: string, duration?: number) => emit("error", message, duration),
    success: (message: string, duration?: number) => emit("success", message, duration),
    info: (message: string, duration?: number) => emit("info", message, duration),
    warning: (message: string, duration?: number) => emit("warning", message, duration),
};
