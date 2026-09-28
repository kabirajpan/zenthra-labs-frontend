import { component$ } from "@builder.io/qwik";
// Square checks background (tiled) to sit behind page content
export const AbstractBackground = component$(() => {
    return (
        <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Light Mode Abstract Background */}
            <div class="block dark:hidden w-full h-full">
                <svg class="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="checks-light" width="36" height="36" patternUnits="userSpaceOnUse">
                            <rect width="36" height="36" fill="transparent" />
                            <rect width="18" height="18" fill="#e8eaf0" />
                            <rect x="18" y="18" width="18" height="18" fill="#e8eaf0" />
                        </pattern>
                        <radialGradient id="light1-light" cx="50%" cy="40%" r="50%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                        </radialGradient>
                        <radialGradient id="light2-light" cx="50%" cy="60%" r="50%">
                            <stop offset="0%" stop-color="#f7f6ff" />
                            <stop offset="100%" stop-color="#f7f6ff" stop-opacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1440" height="800" fill="#fbf8ff" />
                    <rect width="1440" height="800" fill="url(#checks-light)" opacity="0.18" />
                    <circle cx="220" cy="140" r="220" fill="url(#light1-light)" opacity="0.14" />
                    <circle cx="1180" cy="640" r="260" fill="url(#light2-light)" opacity="0.12" />
                </svg>
            </div>

            {/* Dark Mode Abstract Background */}
            <div class="hidden dark:block w-full h-full">
                <svg class="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="checks-dark" width="36" height="36" patternUnits="userSpaceOnUse">
                            <rect width="36" height="36" fill="transparent" />
                            <rect width="18" height="18" fill="#151928" />
                            <rect x="18" y="18" width="18" height="18" fill="#151928" />
                        </pattern>
                        <radialGradient id="glow1-dark" cx="30%" cy="25%" r="60%">
                            <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.22" />
                            <stop offset="100%" stop-color="#07080d" stop-opacity="0" />
                        </radialGradient>
                        <radialGradient id="glow2-dark" cx="75%" cy="65%" r="55%">
                            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.14" />
                            <stop offset="100%" stop-color="#07080d" stop-opacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1440" height="800" fill="#07080d" />
                    <rect width="1440" height="800" fill="url(#checks-dark)" opacity="0.35" />
                    <circle cx="280" cy="180" r="380" fill="url(#glow1-dark)" />
                    <circle cx="1180" cy="580" r="420" fill="url(#glow2-dark)" />
                </svg>
            </div>
        </div>
    );
});
export default AbstractBackground;
