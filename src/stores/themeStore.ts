import { createContextId, useContext, $, type QRL } from "@builder.io/qwik";

export type ThemeMode = "dark" | "light";

export interface ThemeStoreState {
    theme: ThemeMode;
}

export const ThemeContext = createContextId<ThemeStoreState>("zenthra-theme-context");

export const THEME_STORAGE_KEY = "zenthra_theme";

export const useTheme = () => {
    const state = useContext(ThemeContext);

    const toggleTheme: QRL<() => void> = $(() => {
        const next: ThemeMode = state.theme === "dark" ? "light" : "dark";
        state.theme = next;
        if (typeof document !== "undefined") {
            if (next === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            try {
                localStorage.setItem(THEME_STORAGE_KEY, next);
                localStorage.theme = next;
            } catch (e) {
                // Ignore localStorage errors in private browsing / iframe mode
                void e;
            }
        }
    });

    const setTheme: QRL<(mode: ThemeMode) => void> = $((mode: ThemeMode) => {
        state.theme = mode;
        if (typeof document !== "undefined") {
            if (mode === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            try {
                localStorage.setItem(THEME_STORAGE_KEY, mode);
                localStorage.theme = mode;
            } catch (e) {
                // Ignore localStorage errors in private browsing / iframe mode
                void e;
            }
        }
    });

    return {
        state,
        toggleTheme,
        setTheme,
    };
};
