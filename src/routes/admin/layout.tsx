import { API_BASE } from "~/lib/api";
import { component$, Slot, useSignal, useVisibleTask$, $, useStore, useContextProvider } from "@builder.io/qwik";
import { useLocation, useNavigate, Link } from "@builder.io/qwik-city";
import { AdminContext, AdminStoreState, getCachedAdminStore } from "~/stores/adminStore";

interface User {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
}

export default component$(() => {
    const loc = useLocation();
    const nav = useNavigate();
    const user = useSignal<User | null>(null);
    const isAuthenticating = useSignal(true);
    const isMobileMenuOpen = useSignal(false);
    const isProfileMenuOpen = useSignal(false);
    const theme = useSignal<"light" | "dark">("light");

    // Initialize Global Admin Store (Redux-like state shared across all admin routes)
    const cachedStore = getCachedAdminStore();
    const adminStore = useStore<AdminStoreState>({
        stats: cachedStore?.stats || null,
        registrations: cachedStore?.registrations || {},
        users: cachedStore?.users || [],
        totalUsersCount: cachedStore?.totalUsersCount || 0,
        totalPages: cachedStore?.totalPages || 1,
        currentPage: cachedStore?.currentPage || 1,
        lastFetchedStats: cachedStore?.lastFetchedStats || 0,
        lastFetchedUsers: cachedStore?.lastFetchedUsers || 0,
        lastFetchedRegistrations: cachedStore?.lastFetchedRegistrations || {},
    });
    useContextProvider(AdminContext, adminStore);

    // Initialize theme from DOM/localStorage
    useVisibleTask$(() => {
        const isDark = document.documentElement.classList.contains("dark") ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
            localStorage.theme === "dark";
        theme.value = isDark ? "dark" : "light";
    });

    // React to theme changes
    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        if (theme.value === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    });

    // Authenticate admin with immediate cache restoration
    useVisibleTask$(async () => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };

        const token = getCookie("zenthra_auth_token");
        if (!token) {
            nav("/auth/signin");
            return;
        }

        // Fast path: load cached admin profile immediately so UI renders in 0ms without spinner
        const cachedAdmin = localStorage.getItem("zenthra_admin_user");
        if (cachedAdmin) {
            try {
                const parsed = JSON.parse(cachedAdmin);
                if (parsed.role === "ADMIN") {
                    user.value = parsed;
                    isAuthenticating.value = false;
                }
            } catch (err) {
                console.warn("Invalid admin user cache:", err);
            }
        }

        try {
            const res = await fetch(`${API_BASE}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Unauthorized");

            const data = await res.json();
            if (data.user?.role !== "ADMIN") {
                nav("/dashboard");
                return;
            }

            user.value = data.user;
            localStorage.setItem("zenthra_admin_user", JSON.stringify(data.user));
            isAuthenticating.value = false;
        } catch {
            document.cookie = "zenthra_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            localStorage.removeItem("zenthra_admin_user");
            nav("/auth/signin");
        }
    });

    const handleSignOut = $(() => {
        document.cookie = "zenthra_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem("zenthra_admin_user");
        sessionStorage.removeItem("zenthra_admin_store_cache");
        window.location.href = "/";
    });

    if (isAuthenticating.value) {
        return (
            <div class="flex items-center justify-center min-h-screen bg-[#e5e2ed] dark:bg-[#07080b] transition-colors duration-200">
                <div class="text-center space-y-4">
                    <div class="w-8 h-8 mx-auto border-2 border-[#1b1b21] dark:border-white border-t-transparent animate-spin rounded-full" />
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase tracking-wider">Authenticating Admin...</p>
                </div>
            </div>
        );
    }

    return (
        /* ── Full Cover Background (Fixed Viewport, No Leak) ── */
        <div class="h-screen bg-[#e5e2ed] dark:bg-[#07080b] text-[#1b1b21] dark:text-white font-['DM_Sans',sans-serif] antialiased transition-colors duration-200 p-1.5 md:p-2 flex flex-col md:flex-row gap-1.5 md:gap-2 overflow-hidden">

            {/* Mobile backdrop */}
            {isMobileMenuOpen.value && (
                <div
                    class="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"
                    onClick$={() => isMobileMenuOpen.value = false}
                />
            )}

            {/* ── Left Side Panel (Sidebar) - Full Height & Fixed ── */}
            <aside class={[
                "w-64 shrink-0 rounded-[7px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)] flex flex-col p-3.5 transition-all duration-200 ease-out h-full overflow-hidden",
                "fixed inset-y-1.5 left-1.5 z-40 md:static md:inset-auto md:z-auto",
                isMobileMenuOpen.value ? "translate-x-0" : "-translate-x-[calc(100%+2rem)] md:translate-x-0"
            ].join(" ")}>
                {/* Brand Box with Inner Shadow */}
                <div class="shrink-0 mb-3">
                    <div class="flex items-center justify-center w-full py-4 px-3 rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]">
                        <Link href="/admin/dashboard" class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif]">ZenthraLabs</Link>
                    </div>
                </div>

                {/* Navigation Box with Inner Shadow (No Scroll) */}
                <nav class="flex-grow overflow-hidden">
                    <div class="w-full p-2 rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] space-y-1">
                        <Link
                            href="/admin/dashboard"
                            class={[
                                "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border",
                                loc.url.pathname.startsWith("/admin/dashboard")
                                    ? "bg-[#1b1b21] text-white border-[#1b1b21] dark:bg-white dark:text-[#1b1b21] dark:border-white shadow-sm"
                                    : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                            ].join(" ")}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Dashboard
                        </Link>

                        <Link
                            href="/admin"
                            class={[
                                "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border",
                                loc.url.pathname === "/admin" || loc.url.pathname === "/admin/"
                                    ? "bg-[#1b1b21] text-white border-[#1b1b21] dark:bg-white dark:text-[#1b1b21] dark:border-white shadow-sm"
                                    : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                            ].join(" ")}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            User Directory
                        </Link>

                        <Link
                            href="/admin/products"
                            class={[
                                "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border",
                                loc.url.pathname.startsWith("/admin/products")
                                    ? "bg-[#1b1b21] text-white border-[#1b1b21] dark:bg-white dark:text-[#1b1b21] dark:border-white shadow-sm"
                                    : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                            ].join(" ")}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
                            </svg>
                            Production Products
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* ── Right Side Column with Gap ── */}
            <div class="flex-1 min-w-0 flex flex-col gap-1.5 md:gap-2 h-full overflow-hidden">

                {/* ── Top Floating Navbar Panel Card ── */}
                <header class="h-14 rounded-[7px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)] flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
                    {/* Left: hamburger for mobile */}
                    <div class="flex items-center gap-3">
                        <button
                            class="md:hidden p-1.5 text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white transition-colors"
                            onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}
                            title="Toggle menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Right: ADMIN badge · dark mode toggle · profile */}
                    <div class="flex items-center gap-2.5">
                        <span class="text-[9px] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 bg-[#1b1b21] text-white dark:bg-white dark:text-[#1b1b21] font-bold rounded-[2px] uppercase select-none">ADMIN</span>

                        <button
                            onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                            class="p-1.5 text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white transition-colors rounded-[4px] hover:bg-black/5 dark:hover:bg-white/5"
                            title="Toggle theme"
                        >
                            {theme.value === "light" ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                            )}
                        </button>

                        <div class="w-px h-4 bg-[#c6c5d3] dark:bg-[#1e2030]" />

                        {/* Profile menu */}
                        <div class="relative">
                            <button
                                onClick$={() => isProfileMenuOpen.value = !isProfileMenuOpen.value}
                                class="flex items-center justify-center w-8 h-8 rounded-full bg-[#4352a5] text-white text-xs font-bold font-['Syne',sans-serif] hover:bg-[#3a489a] transition-colors shadow-sm"
                                title="Profile menu"
                            >
                                {user.value?.firstName?.[0]}{user.value?.lastName?.[0]}
                            </button>

                            {isProfileMenuOpen.value && (
                                <div class="absolute right-0 top-10 w-56 bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[6px] shadow-lg overflow-hidden z-50">
                                    {/* User info */}
                                    <div class="px-4 py-3 border-b border-[#c6c5d3] dark:border-[#1e2030]">
                                        <p class="text-xs font-bold text-[#1b1b21] dark:text-white truncate">{user.value?.firstName} {user.value?.lastName}</p>
                                        <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] truncate mt-0.5 font-['JetBrains_Mono',monospace]">{user.value?.email}</p>
                                        <span class="inline-block mt-1.5 text-[9px] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 bg-[#1b1b21] text-white dark:bg-white dark:text-[#1b1b21] font-bold rounded-[2px] uppercase">
                                            {user.value?.role}
                                        </span>
                                    </div>

                                    {/* Sign out */}
                                    <button
                                        onClick$={handleSignOut}
                                        class="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-semibold"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── Main Content Panel Card (Internally Scrollable, Never Leaks) ── */}
                <main class="flex-1 min-h-0 rounded-[7px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Slot />
                </main>
            </div>
        </div>
    );
});
