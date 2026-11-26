import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { API_BASE } from "~/lib/api";

const POISON_APK_DIRECT_URL =
    "https://drive.google.com/uc?export=download&id=1rJk1X9Q-wK8viFwEZVoXNsY5qdRRgsNR";
const POISON_APK_DRIVE_URL =
    "https://drive.google.com/file/d/1rJk1X9Q-wK8viFwEZVoXNsY5qdRRgsNR/view?usp=drivesdk";

const POISON_SCREENSHOTS = [
    "/assets/screenshots/poison/Screenshot_20261126-140808.png",
    "/assets/screenshots/poison/Screenshot_20261126-140819.png",
    "/assets/screenshots/poison/Screenshot_20261126-140848.png",
    "/assets/screenshots/poison/Screenshot_20261126-140855.png",
    "/assets/screenshots/poison/Screenshot_20261126-140919.png",
    "/assets/screenshots/poison/Screenshot_20261126-140927.png",
    "/assets/screenshots/poison/Screenshot_20261126-140933.png",
];

const STORAGE_KEY = "poison_early_access_v1";

export default component$(() => {
    const name = useSignal("");
    const age = useSignal("");
    const email = useSignal("");
    const errorMsg = useSignal("");
    const submitting = useSignal(false);
    const unlocked = useSignal(false);

    useVisibleTask$(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY)) {
                unlocked.value = true;
            }
        } catch {
            // ignore storage errors
        }
    });

    const handleSubmit$ = $(async () => {
        errorMsg.value = "";
        const trimmedName = name.value.trim();
        const parsedAge = Number.parseInt(age.value.trim(), 10);
        const trimmedEmail = email.value.trim();

        if (trimmedName.length < 2) {
            errorMsg.value = "Please enter your name.";
            return;
        }
        if (Number.isNaN(parsedAge) || parsedAge < 13 || parsedAge > 120) {
            errorMsg.value = "Please enter a valid age (13–120).";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            errorMsg.value = "Please enter a valid email address for Play Store early access.";
            return;
        }

        submitting.value = true;
        const payload = {
            name: trimmedName,
            age: parsedAge,
            email: trimmedEmail,
            product: "poison",
            version: "v1.0.0",
            submittedAt: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${API_BASE}/api/app/poison-early-access`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errData = (await res.json().catch(() => ({}))) as { error?: string };
                errorMsg.value = errData.error || "Could not register. Please try again.";
                submitting.value = false;
                return;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch {
            errorMsg.value = "Network error while registering. Please try again.";
            submitting.value = false;
            return;
        } finally {
            submitting.value = false;
        }
        unlocked.value = true;
    });

    return (
        <section class="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
            {/* Breadcrumb */}
            <div class="mb-8 flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#767683] dark:text-[#94a3b8]">
                <a href="/products" class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors">
                    Products
                </a>
                <span>/</span>
                <span class="text-[#1b1b21] dark:text-white">Poison</span>
            </div>

            {/* Hero + Early Access Form */}
            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] p-8 md:p-12 shadow-sm">
                <div class="flex flex-wrap items-center gap-2.5 mb-4">
                    <span class="px-2.5 py-1 bg-[#e2f7e6] dark:bg-emerald-950/60 text-[#147a32] dark:text-emerald-400 border border-transparent dark:border-emerald-800/40 text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider rounded-[4px]">
                        Prototype v1.0.0 · Android APK
                    </span>
                    <span class="px-2.5 py-1 bg-[#dee0ff] dark:bg-[#1e2235] text-[#2f3f92] dark:text-[#818cf8] text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider rounded-[4px]">
                        Play Store Early Access
                    </span>
                </div>

                <h1 class="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                    Poison
                </h1>
                <p class="mt-4 text-base sm:text-lg text-[#454651] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
                    Fast-paced native Android game developed by <strong class="text-[#1b1b21] dark:text-white font-semibold">Contr</strong> and published by <strong class="text-[#1b1b21] dark:text-white font-semibold">ZenthraLabs</strong>. Sign up for Google Play Store early access and download the Prototype v1.0.0 APK immediately.
                </p>

                {/* Early Access Registration Form or Unlocked Download */}
                <div class="mt-8">
                    {!unlocked.value ? (
                        <form
                            preventdefault:submit
                            onSubmit$={handleSubmit$}
                            class="max-w-xl bg-[#fbf8ff] dark:bg-[#07080d] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] p-6 space-y-4"
                        >
                            <div>
                                <h2 class="font-['Syne',sans-serif] text-lg font-bold text-[#1b1b21] dark:text-white">
                                    Play Store Early Access &amp; Prototype v1.0.0
                                </h2>
                                <p class="text-xs text-[#454651] dark:text-[#94a3b8] mt-1">
                                    Enter your details to join the Google Play closed test list and unlock the v1.0.0 APK download.
                                </p>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div class="sm:col-span-2">
                                    <label class="block text-xs font-medium text-[#1b1b21] dark:text-[#e2e8f0] mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        value={name.value}
                                        onInput$={(_, el) => (name.value = el.value)}
                                        class="w-full px-3 py-2 text-sm rounded-[4px] bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white focus:outline-none focus:border-[#5c6bc0]"
                                    />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-[#1b1b21] dark:text-[#e2e8f0] mb-1">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min={13}
                                        max={120}
                                        placeholder="18"
                                        value={age.value}
                                        onInput$={(_, el) => (age.value = el.value)}
                                        class="w-full px-3 py-2 text-sm rounded-[4px] bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white focus:outline-none focus:border-[#5c6bc0]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-[#1b1b21] dark:text-[#e2e8f0] mb-1">
                                    Email (Google Play Account)
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@gmail.com"
                                    value={email.value}
                                    onInput$={(_, el) => (email.value = el.value)}
                                    class="w-full px-3 py-2 text-sm rounded-[4px] bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white focus:outline-none focus:border-[#5c6bc0]"
                                />
                            </div>

                            {errorMsg.value && (
                                <p class="text-xs text-red-600 dark:text-red-400 font-medium">
                                    {errorMsg.value}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting.value}
                                class="w-full sm:w-auto py-3 px-6 bg-[#5c6bc0] text-white font-semibold rounded-[4px] text-sm hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 shadow-md shadow-[#5c6bc0]/25 disabled:opacity-60 cursor-pointer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                {submitting.value
                                    ? "Registering..."
                                    : "Join Early Access & Download v1.0.0"}
                            </button>
                        </form>
                    ) : (
                        <div class="space-y-4">
                            <div class="max-w-xl px-4 py-3 rounded-[4px] bg-[#e2f7e6] dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/50 text-xs text-[#147a32] dark:text-emerald-300 font-medium">
                                Registered for Play Store Early Access. Your Poison Prototype v1.0.0 APK download is unlocked below.
                            </div>
                            <div class="flex flex-wrap items-center gap-3">
                                <a
                                    href={POISON_APK_DIRECT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="py-3 px-6 bg-[#5c6bc0] text-white font-semibold rounded-[4px] text-sm hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-md shadow-[#5c6bc0]/25"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Download Poison Prototype v1.0.0 APK
                                </a>

                                <a
                                    href={POISON_APK_DRIVE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="py-3 px-5 border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all inline-flex items-center gap-2"
                                >
                                    Open in Google Drive
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Metadata */}
                <div class="mt-10 pt-8 border-t border-[#e9e7ef] dark:border-[#1e2230] grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Version
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#1b1b21] dark:text-white">
                            Prototype v1.0.0 (Android APK)
                        </div>
                    </div>
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Credits
                        </div>
                        <div class="mt-1 text-sm font-semibold text-[#1b1b21] dark:text-white">
                            Developed by Contr · Published by ZenthraLabs
                        </div>
                    </div>
                    <div>
                        <div class="text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#767683] dark:text-[#64748b]">
                            Install Note
                        </div>
                        <div class="mt-1 text-sm text-[#454651] dark:text-[#94a3b8]">
                            Allow &ldquo;Install unknown apps&rdquo; in browser settings if prompted.
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshots Gallery */}
            <div class="mt-12">
                <h2 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white mb-6">
                    Screenshots
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {POISON_SCREENSHOTS.map((src, idx) => (
                        <div
                            key={src}
                            class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[6px] overflow-hidden shadow-sm"
                        >
                            <img
                                src={src}
                                alt={`Poison screenshot ${idx + 1}`}
                                class="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Poison Prototype v1.0.0 — Early Access | ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "Join Google Play Store early access and download Poison Prototype v1.0.0 APK from ZenthraLabs.",
        },
    ],
};
