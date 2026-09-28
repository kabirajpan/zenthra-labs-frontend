import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useTheme } from "../../stores/themeStore";

const ThemeToggleIcon = component$(({ isDark }: { isDark: boolean }) => {
    if (isDark) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        );
    }
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
});

const isLinkActive = (linkHref: string, currentPath: string) => {
    if (linkHref === "/products") {
        return currentPath.startsWith("/products") && !currentPath.startsWith("/products/zenthra/docs");
    }
    return currentPath.startsWith(linkHref);
};

export const Navbar = component$(() => {
    const loc = useLocation();
    const isMenuOpen = useSignal(false);
    const { state: themeState, toggleTheme } = useTheme();
    
    // Auth status signals
    const isLoggedIn = useSignal(false);
    const userRole = useSignal<string | null>(null);

    useVisibleTask$(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };
        const token = getCookie("zenthra_auth_token");
        if (token) {
            isLoggedIn.value = true;
            try {
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const decoded = JSON.parse(atob(base64));
                userRole.value = decoded.role || "USER";
            } catch {
                isLoggedIn.value = false;
                userRole.value = null;
            }
        }
    });

    const handleSignOut = $(() => {
        document.cookie = "zenthra_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        isLoggedIn.value = false;
        userRole.value = null;
        window.location.href = "/";
    });

    const links = [
        { label: "Products", href: "/products" },
        { label: "Research", href: "/research" },
        { label: "Docs", href: "/products/zenthra/docs/" },
        { label: "Download", href: "/download" },
        { label: "Open Source", href: "/open-source" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    ];

    return (
        <header class="w-full top-0 sticky z-50 bg-white/85 dark:bg-[#07080d]/85 backdrop-blur-md border-b border-neutral-200 dark:border-[#1e2230] transition-colors duration-300">
            <nav class="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto relative z-50">
                <div class="flex items-center gap-8 lg:gap-12">
                    <a 
                        class="text-xl font-bold text-neutral-900 dark:text-white hover:text-[#5c6bc0] dark:hover:text-[#818cf8] font-['Syne',sans-serif] transition-colors" 
                        href="/"
                    >
                        ZenthraLabs
                    </a>
                    
                    {/* Desktop Navigation Links */}
                    <div class="hidden md:flex items-center gap-6 lg:gap-8">
                        {links.map((link) => {
                            const isActive = isLinkActive(link.href, loc.url.pathname);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    class={[
                                        "relative py-1 text-sm font-medium transition-colors duration-300 group",
                                        isActive 
                                            ? "text-[#5c6bc0] dark:text-[#818cf8] font-bold" 
                                            : "text-neutral-600 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
                                    ].join(" ")}
                                >
                                    {link.label}
                                    {/* Animated underline indicator */}
                                    <span 
                                        class={[
                                            "absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#5c6bc0] dark:bg-[#818cf8] transition-transform duration-300 origin-left rounded-full",
                                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        ].join(" ")} 
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop Call to Actions + Theme Toggle */}
                <div class="hidden md:flex items-center gap-3">
                    {/* Dark/Light Mode Switcher Button */}
                    <button 
                        type="button"
                        onClick$={toggleTheme}
                        class="p-2 rounded-[6px] text-neutral-600 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#151928] border border-neutral-200 dark:border-[#1e2230] transition-all cursor-pointer flex items-center justify-center"
                        title={themeState.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        aria-label="Toggle theme"
                    >
                        <ThemeToggleIcon isDark={themeState.theme === "dark"} />
                    </button>

                    {isLoggedIn.value ? (
                        <>
                            {userRole.value === "ADMIN" && (
                                <a 
                                    href="/admin" 
                                    class="px-4 py-1.5 border border-[#ffb300]/60 hover:bg-[#ffb300]/10 text-[#f59e0b] transition-all duration-200 text-sm font-medium rounded-[4px]"
                                >
                                    Admin Panel
                                </a>
                            )}
                            <a 
                                href="/dashboard" 
                                class="px-4 py-1.5 text-neutral-700 dark:text-[#cbd5e1] hover:bg-neutral-100 dark:hover:bg-[#151928] hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-[#1e2230] transition-all duration-200 text-sm font-medium rounded-[4px]"
                            >
                                Dashboard
                            </a>
                            <button 
                                onClick$={handleSignOut}
                                class="px-4 py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-800/40 rounded-[4px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm font-medium cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <a 
                                href="/auth/signin" 
                                class="px-4 py-1.5 text-neutral-700 dark:text-[#cbd5e1] hover:bg-neutral-100 dark:hover:bg-[#151928] hover:text-neutral-900 dark:hover:text-white border border-transparent hover:border-neutral-200 dark:hover:border-[#1e2230] transition-all duration-200 text-sm font-medium rounded-[4px]"
                            >
                                Sign In
                            </a>
                            <a 
                                href="/auth/signup" 
                                class="px-4 py-1.5 bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white rounded-[4px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm font-medium shadow-md shadow-[#5c6bc0]/20"
                            >
                                Get Started
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Header: Theme Switcher + Menu Hamburger */}
                <div class="flex md:hidden items-center gap-1.5">
                    <button 
                        type="button"
                        onClick$={toggleTheme}
                        class="p-2 rounded-[4px] text-neutral-600 dark:text-[#94a3b8] hover:bg-neutral-100 dark:hover:bg-[#151928] hover:text-neutral-900 dark:hover:text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        title={themeState.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        aria-label="Toggle theme"
                    >
                        <ThemeToggleIcon isDark={themeState.theme === "dark"} />
                    </button>

                    <button 
                        onClick$={() => isMenuOpen.value = !isMenuOpen.value}
                        class="flex items-center justify-center p-2 rounded-[4px] text-neutral-600 dark:text-[#94a3b8] hover:bg-neutral-100 dark:hover:bg-[#151928] hover:text-neutral-900 dark:hover:text-white active:scale-95 transition-all cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen.value ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div 
                class={[
                    "absolute top-16 left-0 w-full bg-white/95 dark:bg-[#0b0d14]/95 backdrop-blur-lg border-b border-neutral-200 dark:border-[#1e2230] shadow-2xl md:hidden transition-all duration-300 ease-in-out origin-top z-40",
                    isMenuOpen.value ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
                ].join(" ")}
            >
                <div class="px-6 py-6 flex flex-col gap-4">
                    {links.map((link) => {
                        const isActive = isLinkActive(link.href, loc.url.pathname);
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick$={() => isMenuOpen.value = false}
                                class={[
                                    "text-base font-semibold py-2 transition-colors duration-200 border-b border-neutral-200 dark:border-[#1e2230]",
                                    isActive 
                                        ? "text-[#5c6bc0] dark:text-[#818cf8]" 
                                        : "text-neutral-700 dark:text-[#94a3b8] hover:text-neutral-900 dark:hover:text-white"
                                ].join(" ")}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    <div class="flex flex-col gap-3 pt-3">
                        {isLoggedIn.value ? (
                            <>
                                {userRole.value === "ADMIN" && (
                                    <a 
                                        href="/admin" 
                                        onClick$={() => isMenuOpen.value = false}
                                        class="w-full text-center py-2.5 bg-amber-500 hover:bg-amber-600 text-white transition-all rounded-[4px] text-sm font-semibold"
                                    >
                                        Admin Panel
                                    </a>
                                )}
                                <a 
                                    href="/dashboard" 
                                    onClick$={() => isMenuOpen.value = false}
                                    class="w-full text-center py-2.5 text-neutral-800 dark:text-[#cbd5e1] bg-neutral-100 dark:bg-[#12141f] border border-neutral-200 dark:border-[#1e2230] hover:text-neutral-900 dark:hover:text-white transition-all rounded-[4px] text-sm font-semibold"
                                >
                                    Dashboard
                                </a>
                                <button 
                                    onClick$={() => { isMenuOpen.value = false; handleSignOut(); }}
                                    class="w-full text-center py-2.5 bg-red-600 hover:bg-red-700 text-white transition-all rounded-[4px] text-sm font-semibold cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <a 
                                    href="/auth/signin" 
                                    onClick$={() => isMenuOpen.value = false}
                                    class="w-full text-center py-2.5 text-neutral-800 dark:text-[#cbd5e1] bg-neutral-100 dark:bg-[#12141f] border border-neutral-200 dark:border-[#1e2230] hover:text-neutral-900 dark:hover:text-white transition-all rounded-[4px] text-sm font-semibold"
                                >
                                    Sign In
                                </a>
                                <a 
                                    href="/auth/signup" 
                                    onClick$={() => isMenuOpen.value = false}
                                    class="w-full text-center py-2.5 bg-[#5c6bc0] text-white hover:bg-[#4d5cb0] transition-all rounded-[4px] text-sm font-semibold shadow-md shadow-[#5c6bc0]/20"
                                >
                                    Get Started
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Navbar;
