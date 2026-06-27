import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
    const loc = useLocation();
    const isMenuOpen = useSignal(false);
    
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
        { label: "Download", href: "/download" },
        { label: "Open Source", href: "/open-source" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    ];

    return (
        <header class="w-full top-0 sticky z-50 bg-[#fbf8ff]/80 backdrop-blur-md border-b border-[#c6c5d3] transition-all duration-300">
            <nav class="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto relative z-50">
                <div class="flex items-center gap-8 lg:gap-12">
                    <a 
                        class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif]" 
                        href="/"
                    >
                        Zenthra Labs
                    </a>
                    
                    {/* Desktop Navigation Links */}
                    <div class="hidden md:flex items-center gap-6 lg:gap-8">
                        {links.map((link) => {
                            const isActive = loc.url.pathname.startsWith(link.href);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    class={[
                                        "relative py-1 text-sm font-medium transition-colors duration-300 group",
                                        isActive ? "text-[#4352a5] font-bold" : "text-[#454651] hover:text-[#4352a5]"
                                    ].join(" ")}
                                >
                                    {link.label}
                                    {/* Animated underline indicator */}
                                    <span 
                                        class={[
                                            "absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#4352a5] transition-transform duration-300 origin-left rounded-full",
                                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        ].join(" ")} 
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop Call to Actions */}
                <div class="hidden md:flex items-center gap-3">
                    {isLoggedIn.value ? (
                        <>
                            {userRole.value === "ADMIN" && (
                                <a 
                                    href="/admin" 
                                    class="px-4 py-1.5 border border-[#ffb300] hover:bg-[#ffb300]/10 text-[#c78200] transition-all duration-200 text-sm font-medium rounded-[4px]"
                                >
                                    Admin Panel
                                </a>
                            )}
                            <a 
                                href="/dashboard" 
                                class="px-4 py-1.5 text-[#454651] hover:bg-[#e9e7ef] hover:text-[#4352a5] transition-all duration-200 text-sm font-medium rounded-[4px]"
                            >
                                Dashboard
                            </a>
                            <button 
                                onClick$={handleSignOut}
                                class="px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-[4px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm font-medium cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <a 
                                href="/auth/signin" 
                                class="px-4 py-1.5 text-[#454651] hover:bg-[#e9e7ef] hover:text-[#4352a5] transition-all duration-200 text-sm font-medium rounded-[4px]"
                            >
                                Sign In
                            </a>
                            <a 
                                href="/auth/signup" 
                                class="px-4 py-1.5 bg-[#5c6bc0] hover:bg-[#4352a5] text-[#f8f6ff] rounded-[4px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm font-medium shadow-md shadow-[#5c6bc0]/15"
                            >
                                Get Started
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button 
                    onClick$={() => isMenuOpen.value = !isMenuOpen.value}
                    class="flex md:hidden items-center justify-center p-2 rounded-[4px] text-[#454651] hover:bg-[#e9e7ef] hover:text-[#4352a5] active:scale-95 transition-all cursor-pointer"
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
            </nav>

            {/* Mobile Navigation Drawer */}
            <div 
                class={[
                    "absolute top-16 left-0 w-full bg-[#fbf8ff] border-b border-[#c6c5d3] shadow-lg md:hidden transition-all duration-300 ease-in-out origin-top z-40",
                    isMenuOpen.value ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
                ].join(" ")}
            >
                <div class="px-6 py-6 flex flex-col gap-4">
                    {links.map((link) => {
                        const isActive = loc.url.pathname.startsWith(link.href);
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick$={() => isMenuOpen.value = false}
                                class={[
                                    "text-base font-semibold py-2 transition-colors duration-200 border-b border-[#e9e7ef]",
                                    isActive ? "text-[#4352a5]" : "text-[#454651]"
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
                                    class="w-full text-center py-2.5 text-[#454651] bg-[#e9e7ef] hover:text-[#4352a5] transition-all rounded-[4px] text-sm font-semibold"
                                >
                                    Dashboard
                                </a>
                                <button 
                                    onClick$={() => { isMenuOpen.value = false; handleSignOut(); }}
                                    class="w-full text-center py-2.5 bg-red-500 hover:bg-red-600 text-white transition-all rounded-[4px] text-sm font-semibold cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <a 
                                    href="/auth/signin"
                                    onClick$={() => isMenuOpen.value = false}
                                    class="w-full text-center py-2.5 text-[#454651] bg-[#e9e7ef] hover:text-[#4352a5] transition-all rounded-[4px] text-sm font-semibold"
                                >
                                    Sign In
                                </a>
                                <a 
                                    href="/auth/signup"
                                    onClick$={() => isMenuOpen.value = false}
                                    class="w-full text-center py-2.5 bg-[#5c6bc0] text-white hover:bg-[#4352a5] transition-all rounded-[4px] text-sm font-semibold shadow-md shadow-[#5c6bc0]/15"
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
