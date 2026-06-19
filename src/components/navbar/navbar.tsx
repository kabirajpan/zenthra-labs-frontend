import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
    const loc = useLocation();

    const links = [
        { label: "Products", href: "/products" },
        { label: "Open Source", href: "/open-source" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    ];

    return (
        <header class="w-full top-0 sticky z-50 bg-[#fbf8ff]/80 backdrop-blur-md border-b border-[#c6c5d3] transition-all duration-300">
            <nav class="flex justify-between items-center h-16 px-12 max-w-7xl mx-auto">
                <div class="flex items-center gap-12">
                    <a 
                        class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif]" 
                        href="/"
                    >
                        Zenthra Labs
                    </a>
                    <div class="hidden md:flex items-center gap-8">
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
                <div class="flex items-center gap-3">
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
                </div>
            </nav>
        </header>
    );
});
