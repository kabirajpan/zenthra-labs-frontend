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
            <div class="flex items-center justify-center min-h-screen bg-[#fbf8ff] dark:bg-[#0b0c11] transition-colors duration-200">
                <div class="text-center space-y-4">
                    <div class="w-8 h-8 mx-auto border-2 border-[#1b1b21] dark:border-white border-t-transparent animate-spin rounded-full" />
                    <p class="text-xs text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase tracking-wider">Authenticating Admin...</p>
                </div>
            </div>
        );
    }

    return (
        <div class="min-h-screen bg-[#fbf8ff] dark:bg-[#0b0c11] text-[#1b1b21] dark:text-white flex flex-col md:flex-row font-['DM_Sans',sans-serif] antialiased transition-colors duration-200">
            {/* Sidebar */}
            <aside class={[
                "fixed inset-y-0 left-0 z-40 w-64 bg-[#f4f2f8] dark:bg-[#12131b] border-r border-[#c6c5d3] dark:border-[#1e2030] flex flex-col transform md:translate-x-0 transition-all duration-200 ease-out",
                isMobileMenuOpen.value ? "translate-x-0" : "-translate-x-full"
            ].join(" ")}>
                {/* Logo Section */}
                <div class="p-6 border-b border-[#c6c5d3] dark:border-[#1e2030] flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-['Syne',sans-serif] font-extrabold text-xl text-[#1b1b21] dark:text-white tracking-tight">Zenthra</span>
                            <span class="text-[9px] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 bg-[#1b1b21] text-white dark:bg-white dark:text-[#1b1b21] font-bold rounded-[2px] uppercase">ADMIN</span>
                        </div>
                    </div>
                    <button
                        onClick$={() => theme.value = theme.value === "light" ? "dark" : "light"}
                        class="p-1 text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white transition-colors"
                        title="Toggle theme"
                    >
                        {theme.value === "light" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        )}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav class="flex-grow p-4 space-y-1 overflow-y-auto">
                    <a
                        href="/admin"
                        class={[
                            "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border",
                            loc.url.pathname === "/admin" || loc.url.pathname === "/admin/"
                                ? "bg-[#1b1b21] text-white border-[#1b1b21] dark:bg-white dark:text-[#1b1b21] dark:border-white shadow-sm"
                                : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                        ].join(" ")}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        User Directory
                    </a>

                    <a
                        href="/admin/products"
                        class={[
                            "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all duration-150 border",
                            loc.url.pathname.startsWith("/admin/products")
                                ? "bg-[#1b1b21] text-white border-[#1b1b21] dark:bg-white dark:text-[#1b1b21] dark:border-white shadow-sm"
                                : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                        ].join(" ")}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                        </svg>
                        Production Products
                    </a>
                </nav>

                {/* Profile Card & Logout */}
                <div class="p-4 border-t border-[#c6c5d3] dark:border-[#1e2030] space-y-3 bg-[#f4f2f8] dark:bg-[#12131b]">
                    <div class="text-xs space-y-0.5 font-['JetBrains_Mono',monospace]">
                        <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase">Signed In As</p>
                        <p class="font-bold text-[#1b1b21] dark:text-white truncate">{user.value?.firstName} {user.value?.lastName}</p>
                    </div>

                    <button
                        onClick$={handleSignOut}
                        class="w-full text-left text-xs text-rose-600 dark:text-rose-400 hover:underline font-mono py-1 transition-colors"
                    >
                        [ Sign Out ]
                    </button>
                </div>
            </aside>

            {/* Mobile Topbar */}
            <div class="md:hidden bg-[#f4f2f8] dark:bg-[#12131b] border-b border-[#c6c5d3] dark:border-[#1e2030] p-4 flex items-center justify-between sticky top-0 z-30">
                <div class="flex items-center gap-2">
                    <span class="font-['Syne',sans-serif] font-bold text-base">Zenthra Admin</span>
                </div>
                <button
                    onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}
                    class="p-2 text-[#1b1b21] dark:text-white"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                </button>
            </div>

            {/* Main Content Area */}
            <main class="flex-1 md:ml-64 p-6 lg:p-10 max-w-7xl">
                <Slot />
            </main>
        </div>
    );
});
