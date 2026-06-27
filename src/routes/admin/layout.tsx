import { API_BASE } from "~/lib/api";
import { component$, Slot, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useNavigate, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const isAuthenticating = useSignal(true);
    const user = useSignal<{ firstName: string; lastName: string; email: string; role: string } | null>(null);
    const isMobileMenuOpen = useSignal(false);
    const theme = useSignal<"light" | "dark">("light");
    const nav = useNavigate();
    const loc = useLocation();

    useVisibleTask$(() => {
        const savedTheme = localStorage.getItem("zenthra_theme") as "light" | "dark" | null;
        if (savedTheme) {
            theme.value = savedTheme;
        }
    });

    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        localStorage.setItem("zenthra_theme", theme.value);
        if (theme.value === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

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

        try {
            const res = await fetch(`${API_BASE}/api/auth/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Unauthorized");
            }

            const data = await res.json();
            if (data.user.role !== "ADMIN") {
                nav("/dashboard");
                return;
            }

            user.value = data.user;
            isAuthenticating.value = false;
        } catch {
            document.cookie = "zenthra_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            nav("/auth/signin");
        }
    });

    const handleSignOut = $(() => {
        document.cookie = "zenthra_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
    });

    if (isAuthenticating.value) {
        return (
            <div class="flex items-center justify-center min-h-screen bg-[#f8fafc] dark:bg-[#07070b] transition-colors duration-200">
                <div class="text-center space-y-4">
                    <div class="relative w-16 h-16 mx-auto">
                        <div class="absolute inset-0 rounded-full border-4 border-amber-600/20 dark:border-amber-500/20" />
                        <div class="absolute inset-0 rounded-full border-4 border-t-amber-650 dark:border-t-amber-500 animate-spin" />
                    </div>
                    <p class="text-xs text-neutral-500 dark:text-[#94a3b8] font-medium font-mono tracking-wider uppercase">Checking Clearance...</p>
                </div>
            </div>
        );
    }

    return (
        <div class="min-h-screen bg-[#f8fafc] dark:bg-[#07070b] text-neutral-900 dark:text-[#e2e8f0] flex flex-col md:flex-row antialiased transition-colors duration-200">
            {/* Sidebar */}
            <aside class={[
                "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#0a0b10] border-r border-neutral-200 dark:border-[#1e2030] flex flex-col transform md:translate-x-0 transition-all duration-300 ease-out",
                isMobileMenuOpen.value ? "translate-x-0" : "-translate-x-full"
            ].join(" ")}>
                {/* Logo Section */}
                <div class="p-6 border-b border-neutral-200 dark:border-[#1e2030] flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 rounded bg-amber-500 flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/30">Z</div>
                            <h2 class="font-['Syne',sans-serif] font-bold text-lg text-neutral-950 dark:text-white tracking-wide">Zenthra Admin</h2>
                        </div>
                        <p class="text-[10px] text-neutral-400 dark:text-[#64748b] font-mono mt-1">CONTROL CENTER</p>
                    </div>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" title="System admin active" />
                </div>

                {/* Navigation Menu */}
                <nav class="flex-grow p-4 space-y-2 overflow-y-auto">
                    <a
                        href="/admin"
                        class={[
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 border",
                            loc.url.pathname === "/admin" || loc.url.pathname === "/admin/"
                                ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-500 shadow-md shadow-amber-500/5"
                                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-[#94a3b8] dark:border-transparent dark:hover:bg-white/[0.03] dark:hover:text-white"
                        ].join(" ")}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        User Directory
                    </a>

                    <a
                        href="/dashboard"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-[#94a3b8] dark:hover:bg-white/[0.03] dark:hover:text-white transition-all duration-200 border border-transparent"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
                        </svg>
                        Exit to Telemetry
                    </a>
                </nav>

                {/* Profile Card & Exit */}
                <div class="p-4 border-t border-neutral-200 dark:border-[#1e2030] space-y-3 bg-neutral-50 dark:bg-[#08090d]">
                    <div class="p-3 bg-neutral-100/50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.04] rounded-lg">
                        <p class="text-[10px] text-neutral-400 dark:text-[#64748b] uppercase tracking-wider font-mono">Security Level</p>
                        <p class="text-sm font-bold text-neutral-900 dark:text-white truncate mt-0.5">{user.value?.firstName} {user.value?.lastName}</p>
                        <span class="inline-block mt-2 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-500 dark:border-amber-500/20 text-[9px] font-bold uppercase rounded tracking-wider">
                            System Admin
                        </span>
                    </div>

                    <button
                        onClick$={handleSignOut}
                        class="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header class="md:hidden bg-white dark:bg-[#0a0b10] border-b border-neutral-200 dark:border-[#1e2030] p-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded bg-amber-500 flex items-center justify-center font-bold text-black">Z</div>
                    <span class="font-['Syne',sans-serif] font-bold tracking-wide text-neutral-900 dark:text-white">Zenthra Admin</span>
                </div>
                <div class="flex items-center gap-3">
                    {/* Theme toggle mobile */}
                    <button
                        onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                        class="p-1.5 bg-neutral-100 dark:bg-white/[0.02] border border-neutral-200 dark:border-[#1e2030] rounded-lg text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
                    >
                        {theme.value === "light" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                        )}
                    </button>
                    <button
                        onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}
                        class="p-1.5 bg-neutral-100 dark:bg-white/[0.02] border border-neutral-200 dark:border-[#1e2030] rounded-lg text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            {isMobileMenuOpen.value ? (
                                <line x1="18" y1="6" x2="6" y2="18"/>
                            ) : (
                                <line x1="3" y1="12" x2="21" y2="12"/>
                            )}
                            {isMobileMenuOpen.value ? (
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <line x1="3" y1="18" x2="21" y2="18"/>
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Backdrop for Mobile Sidebar */}
            {isMobileMenuOpen.value && (
                <div
                    onClick$={() => isMobileMenuOpen.value = false}
                    class="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
                />
            )}

            {/* Main Workspace Frame */}
            <div class="flex-grow flex flex-col md:pl-64 min-h-screen">
                {/* Desktop Top Header Bar */}
                <header class="hidden md:flex items-center justify-between px-10 py-6 border-b border-neutral-200 dark:border-[#1e2030] sticky top-0 bg-[#f8fafc]/80 dark:bg-[#07070b]/80 backdrop-blur-md z-20 transition-colors duration-200">
                    <div class="flex items-center gap-2 text-sm text-neutral-500 dark:text-[#94a3b8]">
                        <span class="font-mono text-amber-600">admin</span>
                        <span>/</span>
                        <span class="text-neutral-800 dark:text-white font-semibold">user-directory</span>
                    </div>

                    <div class="flex items-center gap-4">
                        {/* Theme Switcher Desktop */}
                        <button
                            onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                            class="p-2 bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-[#1e2030] rounded-lg text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
                            title={`Switch to ${theme.value === "light" ? "dark" : "light"} theme`}
                        >
                            {theme.value === "light" ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                </svg>
                            )}
                        </button>

                        <div class="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-lg text-xs font-mono">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            Security Protocol: ACTIVE
                        </div>
                        <div class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1e2030] flex items-center justify-center border border-neutral-200 dark:border-white/[0.06] text-xs font-bold text-neutral-800 dark:text-[#e2e8f0]">
                            {user.value?.firstName[0]}{user.value?.lastName[0]}
                        </div>
                    </div>
                </header>

                {/* Workspace Content */}
                <main class="flex-grow p-6 md:p-10 overflow-y-auto w-full max-w-7xl mx-auto">
                    <Slot />
                </main>
            </div>
        </div>
    );
});
