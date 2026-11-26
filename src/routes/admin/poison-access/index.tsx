import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface PoisonEntry {
    id: string;
    name: string;
    age: number;
    email: string;
    product: string;
    version: string;
    createdAt: string;
}

export default component$(() => {
    const entries = useSignal<PoisonEntry[]>([]);
    const loading = useSignal(true);
    const configured = useSignal(true);
    const errorMsg = useSignal("");
    const search = useSignal("");

    const getToken = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split("; zenthra_auth_token=");
        return parts.length === 2 ? parts.pop()?.split(";").shift() || "" : "";
    };

    const fetchEntries$ = $(async () => {
        loading.value = true;
        errorMsg.value = "";
        try {
            const token = getToken();
            const res = await fetch("/api/poison-early-access", {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = (await res.json()) as {
                ok?: boolean;
                configured?: boolean;
                entries?: PoisonEntry[];
                error?: string;
            };
            if (!res.ok || !data.ok) {
                errorMsg.value = data.error || "Failed to load early access list.";
            } else {
                configured.value = data.configured !== false;
                entries.value = data.entries || [];
            }
        } catch {
            errorMsg.value = "Network error loading early access list.";
        } finally {
            loading.value = false;
        }
    });

    useVisibleTask$(() => {
        fetchEntries$();
    });

    const filtered = entries.value.filter((e) => {
        const q = search.value.trim().toLowerCase();
        if (!q) return true;
        return e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    });

    const exportCsv$ = $(() => {
        const header = "Name,Age,Email,Version,CreatedAt\n";
        const rows = filtered
            .map((e) =>
                [
                    `"${e.name.replace(/"/g, '""')}"`,
                    e.age,
                    `"${e.email.replace(/"/g, '""')}"`,
                    e.version,
                    e.createdAt,
                ].join(",")
            )
            .join("\n");
        const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "poison-early-access-emails.csv";
        a.click();
        URL.revokeObjectURL(url);
    });

    return (
        <div class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] dark:text-white">
                        Poison Early Access &amp; Downloads
                    </h1>
                    <p class="text-xs text-[#454651] dark:text-[#94a3b8] mt-0.5">
                        Users who registered for Play Store early access and downloaded Prototype v1.0.0 ({entries.value.length} total)
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        onClick$={fetchEntries$}
                        class="px-3 py-1.5 text-xs font-semibold rounded-[4px] border border-[#c6c5d3] dark:border-[#1e2030] bg-white dark:bg-[#1a1b26] text-[#1b1b21] dark:text-white hover:border-[#4352a5] cursor-pointer"
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick$={exportCsv$}
                        disabled={filtered.length === 0}
                        class="px-3 py-1.5 text-xs font-semibold rounded-[4px] bg-[#5c6bc0] text-white hover:brightness-110 disabled:opacity-50 cursor-pointer"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {!configured.value && (
                <div class="p-4 rounded-[6px] bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200">
                    <strong>Storage not connected yet:</strong> Add a free Upstash Redis / Vercel KV database in your Vercel Project &rarr; Storage (sets <code class="font-mono">KV_REST_API_URL</code> &amp; <code class="font-mono">KV_REST_API_TOKEN</code>) to persist signups across all visitors.
                </div>
            )}

            {errorMsg.value && (
                <div class="p-3 rounded-[6px] bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800/50 text-xs text-red-700 dark:text-red-300">
                    {errorMsg.value}
                </div>
            )}

            <div class="flex items-center justify-between gap-3">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search.value}
                    onInput$={(_, el) => (search.value = el.value)}
                    class="w-full max-w-xs px-3 py-1.5 text-xs rounded-[4px] bg-white dark:bg-[#1a1b26] border border-[#c6c5d3] dark:border-[#1e2030] text-[#1b1b21] dark:text-white focus:outline-none focus:border-[#5c6bc0]"
                />
            </div>

            <div class="rounded-[6px] bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="border-b border-[#e9e7ef] dark:border-[#1e2030] text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase text-[10px]">
                            <th class="py-3 px-4">#</th>
                            <th class="py-3 px-4">Name</th>
                            <th class="py-3 px-4">Age</th>
                            <th class="py-3 px-4">Email (Play Store)</th>
                            <th class="py-3 px-4">Version</th>
                            <th class="py-3 px-4">Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading.value ? (
                            <tr>
                                <td colSpan={6} class="py-8 text-center text-[#767683] dark:text-[#94a3b8]">
                                    Loading early access signups...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} class="py-8 text-center text-[#767683] dark:text-[#94a3b8]">
                                    No signups recorded yet.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    class="border-b border-[#e9e7ef] dark:border-[#1e2030]/60 last:border-none hover:bg-[#fbf8ff] dark:hover:bg-white/[0.02]"
                                >
                                    <td class="py-2.5 px-4 text-[#767683] dark:text-[#64748b] font-mono">
                                        {idx + 1}
                                    </td>
                                    <td class="py-2.5 px-4 font-semibold text-[#1b1b21] dark:text-white">
                                        {item.name}
                                    </td>
                                    <td class="py-2.5 px-4 text-[#454651] dark:text-[#cbd5e1]">
                                        {item.age}
                                    </td>
                                    <td class="py-2.5 px-4 font-mono text-[#4352a5] dark:text-[#818cf8]">
                                        {item.email}
                                    </td>
                                    <td class="py-2.5 px-4">
                                        <span class="px-2 py-0.5 rounded-[4px] bg-[#e2f7e6] dark:bg-emerald-950/60 text-[#147a32] dark:text-emerald-400 text-[10px] font-mono">
                                            {item.version}
                                        </span>
                                    </td>
                                    <td class="py-2.5 px-4 text-[#767683] dark:text-[#94a3b8] font-mono text-[11px]">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Poison Early Access — Admin | ZenthraLabs",
};
