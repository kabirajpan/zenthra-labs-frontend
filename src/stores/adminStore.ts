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

export interface SubscriberItem {
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

export interface SubscriberSummary {
    totalActive: number;
    monthlyCount: number;
    yearlyCount: number;
    paddleCount: number;
    dodoCount: number;
    mrr: number;
}

export interface TransactionItem {
    id: string;
    userId: string;
    provider: "PADDLE" | "DODO" | string;
    providerPaymentId?: string | null;
    subscriptionId?: string | null;
    customerId?: string | null;
    amount: number;
    currency: string;
    plan: "MONTHLY" | "ANNUAL" | string;
    status: "COMPLETED" | "REFUNDED" | "FAILED" | string;
    createdAt: string;
    user?: {
        email: string | null;
        firstName: string;
        lastName: string;
    };
}

export interface TransactionSummary {
    totalVolume: number;
    totalCount: number;
    paddleCount: number;
    dodoCount: number;
}

export interface RevenueTimelinePoint {
    month: string;
    revenue: number;
    count: number;
}

export interface RevenueData {
    mrr: number;
    arr: number;
    totalVolume: number;
    activeSubscribers: number;
    monthlySubscribers: number;
    yearlySubscribers: number;
    arpu: number;
    paddle: {
        subscribers: number;
        volume: number;
    };
    dodo: {
        subscribers: number;
        volume: number;
    };
    timeline: RevenueTimelinePoint[];
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

    // Subscribers global state (Redux-like cache)
    subscribers: SubscriberItem[];
    subscriberSummary: SubscriberSummary | null;
    totalSubscribersCount: number;
    lastFetchedSubscribers: number;

    // Transactions global state
    transactions: TransactionItem[];
    transactionSummary: TransactionSummary | null;
    totalTransactionsCount: number;
    lastFetchedTransactions: number;

    // Revenue global state
    revenue: RevenueData | null;
    lastFetchedRevenue: number;
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
