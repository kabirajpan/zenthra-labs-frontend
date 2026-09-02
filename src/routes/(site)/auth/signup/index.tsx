import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
    const authType = useSignal<"email" | "phone">("email");
    const firstName = useSignal("");
    const lastName = useSignal("");
    const email = useSignal("");
    const phoneNumber = useSignal("");
    const password = useSignal("");
    const errorMessage = useSignal("");
    const successMessage = useSignal("");
    const isLoading = useSignal(false);
    const nav = useNavigate();

    const isVerifying = useSignal(false);
    const verificationCode = useSignal("");

    const handleSignup = $(async () => {
        const cleanEmail = email.value.trim().toLowerCase();
        const cleanFirstName = firstName.value.trim();
        const cleanLastName = lastName.value.trim();
        const cleanPassword = password.value.trim();

        if (!cleanFirstName || !cleanLastName || !cleanPassword) {
            errorMessage.value = "First Name, Last Name, and Password are required.";
            return;
        }

        if (cleanPassword.length < 8) {
            errorMessage.value = "Password must be at least 8 characters long.";
            return;
        }

        const payload: Record<string, any> = {
            firstName: cleanFirstName,
            lastName: cleanLastName,
            password: cleanPassword
        };

        if (authType.value === "email") {
            if (!cleanEmail) {
                errorMessage.value = "Please provide an email address.";
                return;
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(cleanEmail)) {
                errorMessage.value = "Invalid email format (e.g. name@domain.com). Please check for typos.";
                return;
            }
            payload.email = cleanEmail;
        } else {
            if (!phoneNumber.value.trim()) {
                errorMessage.value = "Please provide a phone number.";
                return;
            }
            payload.phoneNumber = phoneNumber.value.trim();
        }

        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";

        try {
            const res = await fetch(`${API_BASE}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            document.cookie = `zenthra_auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            
            if (data.verificationToken) {
                isVerifying.value = true;
                successMessage.value = `Account created! Please enter verification code: ${data.verificationToken}`;
            } else {
                successMessage.value = "Registration successful! Redirecting...";
                setTimeout(() => {
                    nav("/dashboard");
                }, 1200);
            }
        } catch (err: any) {
            errorMessage.value = err.message || "Something went wrong. Please try again.";
        } finally {
            isLoading.value = false;
        }
    });

    const handleVerify = $(async () => {
        if (!verificationCode.value.trim()) {
            errorMessage.value = "Please enter the verification code.";
            return;
        }

        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";

        try {
            const res = await fetch(`${API_BASE}/api/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value.trim().toLowerCase(),
                    code: verificationCode.value.trim(),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Verification failed");
            }

            successMessage.value = "Email verified successfully! Redirecting to workspace...";
            setTimeout(() => {
                nav("/dashboard");
            }, 1200);
        } catch (err: any) {
            errorMessage.value = err.message || "Verification failed. Please check the code and try again.";
        } finally {
            isLoading.value = false;
        }
    });

    const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID || "512164843791-q6ivi4qlcsspupcfrouudrgau78siovd.apps.googleusercontent.com";

    const handleGoogleSignup = $(async () => {
        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";

        try {
            if (typeof window !== "undefined" && (window as any).google?.accounts?.oauth2) {
                const client = (window as any).google.accounts.oauth2.initTokenClient({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: "email profile openid",
                    callback: async (tokenResponse: any) => {
                        if (tokenResponse.error) {
                            errorMessage.value = "Google sign-in was canceled or closed.";
                            isLoading.value = false;
                            return;
                        }
                        try {
                            const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                            });
                            const userInfo = await userRes.json();

                            const res = await fetch(`${API_BASE}/api/auth/google`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    googleId: userInfo.sub,
                                    email: userInfo.email,
                                    firstName: userInfo.given_name || userInfo.name || "User",
                                    lastName: userInfo.family_name || "",
                                }),
                            });

                            const data = await res.json();
                            if (!res.ok) {
                                throw new Error(data.error || "Google registration failed");
                            }

                            successMessage.value = "Google account linked successfully! Redirecting...";
                            document.cookie = `zenthra_auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            
                            setTimeout(() => {
                                if (data.user?.role === "ADMIN") {
                                    nav("/admin");
                                } else {
                                    nav("/dashboard");
                                }
                            }, 1000);
                        } catch (err: any) {
                            errorMessage.value = err.message || "Google sign-up error. Please try again.";
                        } finally {
                            isLoading.value = false;
                        }
                    }
                });
                client.requestAccessToken();
            } else if (typeof window !== "undefined" && (window as any).google?.accounts?.id) {
                (window as any).google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (response: any) => {
                        try {
                            const payload = JSON.parse(atob(response.credential.split('.')[1]));
                            const res = await fetch(`${API_BASE}/api/auth/google`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    googleId: payload.sub,
                                    email: payload.email,
                                    firstName: payload.given_name || payload.name || "User",
                                    lastName: payload.family_name || "",
                                }),
                            });

                            const data = await res.json();
                            if (!res.ok) {
                                throw new Error(data.error || "Google registration failed");
                            }

                            successMessage.value = "Google account linked successfully! Redirecting...";
                            document.cookie = `zenthra_auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            
                            setTimeout(() => {
                                if (data.user?.role === "ADMIN") {
                                    nav("/admin");
                                } else {
                                    nav("/dashboard");
                                }
                            }, 1000);
                        } catch (err: any) {
                            errorMessage.value = err.message || "Google sign-up error. Please try again.";
                        } finally {
                            isLoading.value = false;
                        }
                    }
                });
                (window as any).google.accounts.id.prompt();
            } else {
                throw new Error("Google Sign-In is initializing. Please try again in a moment.");
            }
        } catch (err: any) {
            errorMessage.value = err.message || "Google sign-up failed. Please try again.";
            isLoading.value = false;
        }
    });

    useVisibleTask$(() => {
        const initGoogle = () => {
            if (typeof window !== "undefined" && (window as any).google?.accounts?.id) {
                (window as any).google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (response: any) => {
                        isLoading.value = true;
                        errorMessage.value = "";
                        successMessage.value = "";
                        try {
                            const payload = JSON.parse(atob(response.credential.split('.')[1]));
                            const res = await fetch(`${API_BASE}/api/auth/google`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    googleId: payload.sub,
                                    email: payload.email,
                                    firstName: payload.given_name || payload.name || "User",
                                    lastName: payload.family_name || "",
                                }),
                            });

                            const data = await res.json();
                            if (!res.ok) {
                                throw new Error(data.error || "Google registration failed");
                            }

                            successMessage.value = "Google account linked successfully! Redirecting...";
                            document.cookie = `zenthra_auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                            
                            setTimeout(() => {
                                if (data.user?.role === "ADMIN") {
                                    nav("/admin");
                                } else {
                                    nav("/dashboard");
                                }
                            }, 1000);
                        } catch (err: any) {
                            errorMessage.value = err.message || "Google sign-up error. Please try again.";
                        } finally {
                            isLoading.value = false;
                        }
                    }
                });

                const btnContainer = document.getElementById("google-signup-btn-container");
                if (btnContainer) {
                    btnContainer.innerHTML = "";
                    (window as any).google.accounts.id.renderButton(btnContainer, {
                        theme: "outline",
                        size: "large",
                        width: "100%",
                        text: "continue_with"
                    });
                }
            } else {
                setTimeout(initGoogle, 300);
            }
        };
        initGoogle();
    });

    return (
        <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex items-center justify-center min-h-[calc(100vh-16rem)] bg-[#f8fafc] dark:bg-[#07070b] transition-colors duration-200">
            <script src="https://accounts.google.com/gsi/client" async defer />
            <div class="w-full max-w-lg bg-white dark:bg-[#0b0c11]/80 border border-neutral-200 dark:border-[#1e2030] rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden transition-all">
                <div class="text-center mb-8">
                    <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Get Started
                    </h1>
                    <p class="text-sm text-neutral-500 dark:text-[#94a3b8] max-w-sm mx-auto">
                        Create a Zenthra Developer Account to synchronize timelines, manage variables, and monitor telemetry.
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

                {/* Registration or Verification Form */}
                {isVerifying.value ? (
                    <form preventdefault:submit onSubmit$={handleVerify} class="space-y-4 mb-6">
                        <div>
                            <label class="block text-xs font-bold text-neutral-700 dark:text-[#e2e8f0] mb-1.5">6-Digit Verification Code</label>
                            <input 
                                type="text" 
                                placeholder="123456" 
                                value={verificationCode.value}
                                onInput$={(e) => verificationCode.value = (e.target as HTMLInputElement).value}
                                class="w-full text-center tracking-widest font-mono text-lg border border-neutral-200 dark:border-[#1e2030] rounded-lg p-3 outline-none bg-neutral-50 dark:bg-black/30 text-neutral-900 dark:text-white focus:border-indigo-500 transition-colors" 
                                disabled={isLoading.value}
                                maxLength={6}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            class={[
                                "w-full py-2.5 text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer",
                                isLoading.value ? "bg-neutral-300 dark:bg-white/10 cursor-not-allowed text-neutral-500" : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                            ].join(" ")}
                            disabled={isLoading.value}
                        >
                            {isLoading.value ? "Verifying..." : "Verify Email & Continue"}
                        </button>
                    </form>
                ) : (
                    <>
                        <form preventdefault:submit onSubmit$={handleSignup} class="space-y-4 mb-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-neutral-700 dark:text-[#e2e8f0] mb-1.5">First Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John" 
                                    value={firstName.value}
                                    onInput$={(e) => firstName.value = (e.target as HTMLInputElement).value}
                                    class="w-full border border-neutral-200 dark:border-[#1e2030] rounded-lg p-2.5 text-sm outline-none bg-neutral-50 dark:bg-black/30 text-neutral-900 dark:text-white focus:border-indigo-500 transition-colors" 
                                    disabled={isLoading.value}
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-neutral-700 dark:text-[#e2e8f0] mb-1.5">Last Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    value={lastName.value}
                                    onInput$={(e) => lastName.value = (e.target as HTMLInputElement).value}
                                    class="w-full border border-neutral-200 dark:border-[#1e2030] rounded-lg p-2.5 text-sm outline-none bg-neutral-50 dark:bg-black/30 text-neutral-900 dark:text-white focus:border-indigo-500 transition-colors" 
                                    disabled={isLoading.value}
                                    required
                                />
                            </div>
                        </div>

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

                        <div>
                            <label class="block text-xs font-bold text-neutral-700 dark:text-[#e2e8f0] mb-1.5">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password.value}
                                onInput$={(e) => password.value = (e.target as HTMLInputElement).value}
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
                            {isLoading.value ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-neutral-200 dark:border-[#1e2030]" />
                        </div>
                        <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-white dark:bg-[#0b0c11] px-2 text-neutral-400 font-mono text-[10px] tracking-wider">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick$={handleGoogleSignup}
                        disabled={isLoading.value}
                        class="w-full py-2.5 px-4 bg-neutral-50 hover:bg-neutral-100 dark:bg-black/30 dark:hover:bg-white/5 border border-neutral-200 dark:border-[#1e2030] rounded-lg text-xs font-semibold text-neutral-800 dark:text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer mb-6"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.04.0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        <span>Sign in with Google</span>
                    </button>
                    </>
                )}

                <div class="text-center mt-6 space-y-2">
                    <p class="text-xs text-neutral-500 dark:text-[#94a3b8]">
                        Already have an account?{" "}
                        <a href="/auth/signin" class="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">
                            Sign In
                        </a>
                    </p>
                    <div>
                        <a href="/" class="text-xs text-neutral-400 dark:text-[#64748b] hover:text-neutral-700 dark:hover:text-white font-bold transition-colors">
                            &larr; Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Get Started — Zenthra Developer Portal",
    meta: [
        { name: "description", content: "Access your Zenthra Developer Workspace." },
    ],
    scripts: [
        {
            props: {
                src: "https://accounts.google.com/gsi/client",
                async: true,
                defer: true,
            }
        }
    ]
};
