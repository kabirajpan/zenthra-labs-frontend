import { createContextId } from "@builder.io/qwik";

export interface AdminStats {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    afterMotionCount: number;
    webAppCount: number;
}

export interface RegistrationPoint {
    date: string;
    count: number;
}

export interface AdminUserItem {
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

export interface AdminStoreState {
    stats: AdminStats | null;
    registrations: Record<number, RegistrationPoint[]>;
    users: AdminUserItem[];
    totalUsersCount: number;
    totalPages: number;
    currentPage: number;
    lastFetchedStats: number;
    lastFetchedUsers: number;
    lastFetchedRegistrations: Record<number, number>;
}

export const AdminContext = createContextId<AdminStoreState>("admin-store-context");

const CACHE_KEY = "zenthra_admin_store_cache";

export const getCachedAdminStore = (): Partial<AdminStoreState> | null => {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const setCachedAdminStore = (data: Partial<AdminStoreState>) => {
    if (typeof window === "undefined") return;
    try {
        const existing = getCachedAdminStore() || {};
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...existing, ...data }));
    } catch (e) {
        console.warn("Failed to set admin store cache:", e);
    }
};
