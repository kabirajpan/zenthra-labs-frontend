import { API_BASE } from "~/lib/api";
import { component$, Slot, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useNavigate, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const isAuthenticating = useSignal(true);
    const user = useSignal<{ firstName: string; lastName: string; email: string; role: string } | null>(null);
    const isMobileMenuOpen = useSignal(false);
    const isProfileOpen = useSignal(false);
    const theme = useSignal<"light" | "dark">("dark");
    const nav = useNavigate();
    const loc = useLocation();

    useVisibleTask$(() => {
        const savedTheme = localStorage.getItem("zenthra_theme") as "light" | "dark" | null;
        if (savedTheme) {
            theme.value = savedTheme;
        } else {
            theme.value = "dark";
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
            user.value = data.user;
            isAuthenticating.value = false;
        } catch (err) {
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
            <div class="flex items-center justify-center min-h-screen bg-[#fbf8ff] dark:bg-[#09090b] transition-colors duration-200">
                <div class="text-center space-y-4">
                    <div class="relative w-16 h-16 mx-auto">
                        <div class="absolute inset-0 rounded-full border-4 border-[#5c6bc0]/20 dark:border-indigo-500/20" />
                        <div class="absolute inset-0 rounded-full border-4 border-t-[#5c6bc0] dark:border-t-indigo-500 animate-spin" />
                    </div>
                    <p class="text-xs text-neutral-500 dark:text-[#94a3b8] font-medium font-mono tracking-wider uppercase">Initializing Workspace...</p>
                </div>
            </div>
        );
    }

    return (
        <div class="min-h-screen bg-[#fbf8ff] dark:bg-[#09090b] text-neutral-900 dark:text-[#e2e8f0] flex flex-col md:flex-row antialiased transition-colors duration-200 relative overflow-hidden">
            {/* Ambient glows */}
            <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
                <div class="absolute top-0 right-0 w-[40%] aspect-square rounded-full bg-indigo-500/10 blur-[100px]" />
                <div class="absolute bottom-0 left-[20%] w-[30%] aspect-square rounded-full bg-violet-500/10 blur-[100px]" />
            </div>

            {/* Sidebar */}
            <aside class={[
                "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#0c0d12] border-r border-[#c6c5d3] dark:border-[#1c1d24] flex flex-col transform md:translate-x-0 transition-all duration-300 ease-out",
                isMobileMenuOpen.value ? "translate-x-0" : "-translate-x-full"
            ].join(" ")}>
                {/* Logo Section */}
                <div class="p-6 border-b border-[#c6c5d3] dark:border-[#1c1d24] flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-[4px] bg-[#5c6bc0] flex items-center justify-center font-bold text-white shadow-sm shadow-[#5c6bc0]/25">Z</div>
                        <h2 class="font-['Syne',sans-serif] font-bold text-lg text-neutral-950 dark:text-white tracking-wide">Zenthra Labs</h2>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav class="flex-grow p-4 space-y-1.5 overflow-y-auto">
                    <a
                        href="/dashboard"
                        class={[
                            "flex items-center gap-3 px-4 py-2.5 rounded-[4px] text-xs font-bold transition-all duration-200 border",
                            loc.url.pathname === "/dashboard" || loc.url.pathname === "/dashboard/"
                                ? "bg-[#e9e7ef] text-[#4352a5] border-[#c6c5d3] dark:bg-white/5 dark:text-white dark:border-white/[0.05]"
                                : "text-neutral-500 border-transparent hover:bg-[#e9e7ef]/40 dark:text-[#94a3b8] dark:hover:bg-white/[0.02] hover:text-neutral-900 dark:hover:text-white"
                        ].join(" ")}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
                        </svg>
                        Workspace Overview
                    </a>

                    <a
                        href="/dashboard/products"
                        class={[
                            "flex items-center gap-3 px-4 py-2.5 rounded-[4px] text-xs font-bold transition-all duration-200 border",
                            loc.url.pathname === "/dashboard/products" || loc.url.pathname === "/dashboard/products/"
                                ? "bg-[#e9e7ef] text-[#4352a5] border-[#c6c5d3] dark:bg-white/5 dark:text-white dark:border-white/[0.05]"
                                : "text-neutral-500 border-transparent hover:bg-[#e9e7ef]/40 dark:text-[#94a3b8] dark:hover:bg-white/[0.02] hover:text-neutral-900 dark:hover:text-white"
                        ].join(" ")}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                        </svg>
                        Your Products
                    </a>

                    <a
                        href="/dashboard/plan"
                        class={[
                            "flex items-center gap-3 px-4 py-2.5 rounded-[4px] text-xs font-bold transition-all duration-200 border",
                            loc.url.pathname === "/dashboard/plan" || loc.url.pathname === "/dashboard/plan/"
                                ? "bg-[#e9e7ef] text-[#4352a5] border-[#c6c5d3] dark:bg-white/5 dark:text-white dark:border-white/[0.05]"
                                : "text-neutral-500 border-transparent hover:bg-[#e9e7ef]/40 dark:text-[#94a3b8] dark:hover:bg-white/[0.02] hover:text-neutral-900 dark:hover:text-white"
                        ].join(" ")}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        Subscription & Plan
                    </a>

                    {user.value?.role === "ADMIN" && (
                        <a
                            href="/admin"
                            class={[
                                "flex items-center gap-3 px-4 py-2.5 rounded-[4px] text-xs font-bold transition-all duration-200 border",
                                loc.url.pathname === "/admin" || loc.url.pathname === "/admin/"
                                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                                    : "text-neutral-500 border-transparent hover:bg-amber-500/5 dark:text-[#94a3b8] dark:hover:bg-amber-500/5 hover:text-amber-700 dark:hover:text-amber-400"
                            ].join(" ")}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Launch Admin Panel
                        </a>
                    )}
                </nav>

                {/* Sidebar Footer Stats */}
                <div class="p-4 border-t border-[#c6c5d3] dark:border-[#1c1d24] bg-neutral-50/50 dark:bg-black/10">
                    <div class="flex items-center justify-between text-[9px] font-mono text-neutral-400 dark:text-[#64748b]">
                        <span>System Load</span>
                        <span class="text-emerald-500 font-bold">12%</span>
                    </div>
                    <div class="w-full bg-neutral-200 dark:bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div class="bg-emerald-500 h-full w-[12%]" />
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header class="md:hidden bg-white dark:bg-[#0c0d12] border-b border-[#c6c5d3] dark:border-[#1c1d24] p-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-[4px] bg-[#5c6bc0] flex items-center justify-center font-bold text-white">Z</div>
                    <span class="font-['Syne',sans-serif] font-bold tracking-wide text-neutral-900 dark:text-white">Zenthra Dev</span>
                </div>
                <div class="flex items-center gap-3">
                    {/* Theme toggle mobile */}
                    <button
                        onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                        class="p-1.5 bg-[#fbf8ff] dark:bg-white/[0.02] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
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
                        class="p-1.5 bg-[#fbf8ff] dark:bg-white/[0.02] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[4px] text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
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
            <div class="flex-grow flex flex-col md:pl-64 min-h-screen relative z-10">
                {/* Desktop Top Header Bar */}
                <header class="hidden md:flex items-center justify-between px-10 py-6 border-b border-[#c6c5d3] dark:border-[#1c1d24] sticky top-0 bg-[#fbf8ff]/80 dark:bg-[#09090b]/80 backdrop-blur-md z-20 transition-colors duration-200">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2 text-sm text-neutral-500 dark:text-[#94a3b8]">
                            <span class="font-mono text-[#5c6bc0] dark:text-indigo-400">workspace</span>
                            <span>/</span>
                            <span class="text-neutral-800 dark:text-white font-semibold">dashboard</span>
                        </div>
                        {/* Live Status Pill */}
                        <div class="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            API: Operational
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        {/* Theme Switcher Desktop */}
                        <button
                            onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                            class="p-2 bg-white dark:bg-white/[0.02] border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] text-neutral-500 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
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

                        {/* Profile Dropdown Menu */}
                        <div class="relative">
                            <button
                                onClick$={() => isProfileOpen.value = !isProfileOpen.value}
                                class="w-8 h-8 rounded-[4px] bg-[#e9e7ef] dark:bg-[#1c1d24] flex items-center justify-center border border-[#c6c5d3] dark:border-white/[0.06] text-xs font-bold text-neutral-800 dark:text-[#e2e8f0] cursor-pointer hover:bg-neutral-200 dark:hover:bg-white/10 transition-all select-none"
                            >
                                {user.value?.firstName[0]}{user.value?.lastName[0]}
                            </button>

                            {isProfileOpen.value && (
                                <>
                                    {/* Click-outside backdrop to close */}
                                    <div
                                        onClick$={() => isProfileOpen.value = false}
                                        class="fixed inset-0 z-40 cursor-default"
                                    />
                                    {/* Dropdown Box */}
                                    <div class="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0c0d12] border border-[#c6c5d3] dark:border-[#1c1d24] rounded-[4px] shadow-lg py-1.5 z-50 animate-fade-in font-sans">
                                        <div class="px-4 py-2 border-b border-[#c6c5d3]/50 dark:border-white/[0.05]">
                                            <p class="text-xs font-bold text-neutral-900 dark:text-white truncate">
                                                {user.value?.firstName} {user.value?.lastName}
                                            </p>
                                            <p class="text-[10px] text-neutral-400 dark:text-[#64748b] truncate mt-0.5">
                                                {user.value?.email}
                                            </p>
                                            <span class="inline-block mt-1.5 px-1.5 py-0.5 bg-[#e3e1e9] text-[#4352a5] dark:bg-white/5 dark:text-neutral-300 text-[8px] font-bold uppercase rounded tracking-wider">
                                                {user.value?.role}
                                            </span>
                                        </div>
                                        <button
                                            onClick$={handleSignOut}
                                            class="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2 transition-all cursor-pointer"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                                            </svg>
                                            Exit Workspace
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Workspace Content */}
                <main class="flex-grow p-6 md:p-10 overflow-y-auto w-full">
                    <Slot />
                </main>
            </div>
        </div>
    );
});

