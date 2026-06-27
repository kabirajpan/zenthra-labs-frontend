import { API_BASE } from "~/lib/api";
import { component$, useSignal, $ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    const contactMethod = useSignal<"email" | "phone">("email");
    const email = useSignal("");
    const phoneNumber = useSignal("");
    const errorMessage = useSignal("");
    const successMessage = useSignal("");
    const isLoading = useSignal(false);

    const handleResetRequest = $(async () => {
        const value = contactMethod.value === "email" ? email.value : phoneNumber.value;
        if (!value) {
            errorMessage.value = `Please provide your registered ${contactMethod.value}.`;
            return;
        }

        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";

        try {
            const payload = contactMethod.value === "email" 
                ? { email: value } 
                : { phoneNumber: value };

            const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Request failed");
            }

            successMessage.value = data.message || "A secure password reset link has been dispatched to your contact details.";
        } catch (err: any) {
            errorMessage.value = err.message || "Failed to process request. Please try again.";
        } finally {
            isLoading.value = false;
        }
    });

    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex items-center justify-center min-h-[calc(100vh-16rem)] bg-[#f8fafc] dark:bg-[#07070b] transition-colors duration-200">
            <div class="w-full max-w-lg bg-white dark:bg-[#0b0c11]/80 border border-neutral-200 dark:border-[#1e2030] rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden transition-all">
                {/* Accent line */}
                <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700" />

                <div class="text-center mb-8">
                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Reset Password
                    </h1>
                    <p class="text-sm text-neutral-500 dark:text-[#94a3b8] max-w-sm mx-auto">
                        Enter your registered email address or phone number, and we will send you instructions to reset your password.
                    </p>
                </div>

                {errorMessage.value && (
                    <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 mb-6 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span>{errorMessage.value}</span>
                    </div>
                )}

                {successMessage.value && (
                    <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>{successMessage.value}</span>
                    </div>
                )}

                {/* Form */}
                <form preventdefault:submit onSubmit$={handleResetRequest} class="space-y-4 mb-6">
                    <div>
                        <label class="block text-xs font-bold text-neutral-700 dark:text-[#e2e8f0] mb-1.5">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@domain.com" 
                            value={email.value}
                            onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
                            class="w-full border border-neutral-200 dark:border-[#1e2030] rounded-lg p-2.5 text-sm outline-none bg-neutral-50 dark:bg-black/30 text-neutral-900 dark:text-white focus:border-indigo-500 transition-colors" 
                            disabled={isLoading.value}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        class={[
                            "w-full py-2.5 text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer",
                            isLoading.value ? "bg-neutral-300 dark:bg-white/10 cursor-not-allowed text-neutral-500" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                        ].join(" ")}
                        disabled={isLoading.value}
                    >
                        {isLoading.value ? "Sending Request..." : "Send Reset Code"}
                    </button>
                </form>

                <div class="text-center mt-6">
                    <a href="/auth/signin" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold transition-colors">
                        &larr; Back to Sign In
                    </a>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Reset Password — Zenthra Developer Portal",
    meta: [
        { name: "description", content: "Recover your developer credentials." },
    ],
};
