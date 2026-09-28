import { component$, isDev, useStore, useContextProvider, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import GlobalNotification from "./components/common/GlobalNotification";
import { ThemeContext, type ThemeStoreState, THEME_STORAGE_KEY } from "./stores/themeStore";

import "./global.css";

export default component$(() => {
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Don't remove the `<head>` and `<body>` elements.
     */

    const themeState = useStore<ThemeStoreState>({
        theme: "dark",
    });
    useContextProvider(ThemeContext, themeState);

    useVisibleTask$(() => {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.theme;
            const isDark = saved ? saved === "dark" : true;
            themeState.theme = isDark ? "dark" : "light";
            if (isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } catch (e) {
            // Ignore localStorage errors in private browsing / iframe mode
            void e;
        }
    });

    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono&display=swap" rel="stylesheet"/>
                {!isDev && (
                    <link
                        rel="manifest"
                        href={`${import.meta.env.BASE_URL}manifest.json`}
                    />
                )}
                {/* Instant theme setup before paint to prevent flashing */}
                <script
                    dangerouslySetInnerHTML={`
                        (function() {
                            try {
                                var theme = localStorage.getItem('${THEME_STORAGE_KEY}') || localStorage.theme;
                                var isDark = theme ? theme === 'dark' : true;
                                if (isDark) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                            } catch (e) {}
                        })();
                    `}
                />
                <RouterHead />
            </head>
            <body lang="en" class="bg-theme-bg text-theme-primary selection:bg-[#5c6bc0]/30 selection:text-white transition-colors duration-200">
                <RouterOutlet />
                <GlobalNotification />
            </body>
        </QwikCityProvider>
    );
});
