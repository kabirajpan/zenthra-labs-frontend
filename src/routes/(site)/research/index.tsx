import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const STAGES = [
    { id: "S1", neurons: "500",      latency: "< 0.05 ms", title: "Spinal Reflex Core",  desc: "Dale's Principle · Lateral Inhibition · Tool masking", active: true  },
    { id: "S2", neurons: "~3,000",   latency: "~0.30 ms",  title: "Central Complex",      desc: "Heading persistence · Multi-phase trajectory tracking",  active: false },
    { id: "S3", neurons: "~25,000",  latency: "~4.5 ms",   title: "Janelia Hemibrain",    desc: "Mushroom Body · Associative memory · STDP plasticity",    active: false },
    { id: "S4", neurons: "~139,255", latency: "~35 ms",    title: "FlyWire Whole-Brain",  desc: "Full behavioral emulation · Nature 2024 dataset",         active: false },
];

const INTENTS = [
    { label: "ASK",    color: "#16a34a", darkColor: "#22c55e", bg: "rgba(34,197,94,.06)",   border: "rgba(34,197,94,.18)"  },
    { label: "SEARCH", color: "#16a34a", darkColor: "#22c55e", bg: "rgba(34,197,94,.06)",   border: "rgba(34,197,94,.18)"  },
    { label: "PLAN",   color: "#2563eb", darkColor: "#60a5fa", bg: "rgba(96,165,250,.06)",  border: "rgba(96,165,250,.18)" },
    { label: "CODE",   color: "#2563eb", darkColor: "#60a5fa", bg: "rgba(96,165,250,.06)",  border: "rgba(96,165,250,.18)" },
    { label: "DEBUG",  color: "#d97706", darkColor: "#f59e0b", bg: "rgba(245,158,11,.06)",  border: "rgba(245,158,11,.18)" },
    { label: "TEST",   color: "#d97706", darkColor: "#f59e0b", bg: "rgba(245,158,11,.06)",  border: "rgba(245,158,11,.18)" },
    { label: "REVIEW", color: "#7c3aed", darkColor: "#a78bfa", bg: "rgba(167,139,250,.06)", border: "rgba(167,139,250,.18)"},
    { label: "DANGER", color: "#dc2626", darkColor: "#ef4444", bg: "rgba(239,68,68,.06)",   border: "rgba(239,68,68,.25)"  },
];

const METRICS = [
    { label: "Reflex Gate",  before: "~1,200 ms",    after: "< 0.05 ms" },
    { label: "Intent Route", before: "800-2,500 ms", after: "15-30 ms"  },
    { label: "RAM",          before: "500 MB+",      after: "< 2 MB"    },
    { label: "Destroy Rate", before: "2-5%",         after: "0.00%"     },
    { label: "Token Cost",   before: "1,500-4,000",  after: "0 tokens"  },
    { label: "API Lifespan", before: "3 turns",      after: "20+ turns" },
];

export default component$(() => {
    const activeStage = useSignal(0);

    return (
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">

                {/* Breadcrumb */}
                <div class="flex items-center gap-2 mb-10 text-xs font-['JetBrains_Mono',monospace]">
                    <a href="/" class="text-[#767683] dark:text-[#94a3b8] hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors">Home</a>
                    <span class="text-[#c6c5d3] dark:text-[#312e81]">/</span>
                    <span class="text-[#1b1b21] dark:text-white font-medium">Research & Development</span>
                </div>

                {/* Hero */}
                <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20 pb-20 border-b border-[#c6c5d3] dark:border-[#1e2230]">

                    <div class="col-span-12 lg:col-span-6 space-y-6">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active Research
                            </span>
                            <span class="px-2.5 py-1 bg-[#e9e7ef] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">Rust</span>
                            <span class="px-2.5 py-1 bg-[#e9e7ef] dark:bg-[#1e2235] text-[#4352a5] dark:text-[#818cf8] border border-[#c6c5d3]/50 dark:border-[#312e81]/40 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider rounded-[4px]">Neuroscience</span>
                        </div>

                        <div>
                            <h1 class="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1b21] dark:text-white tracking-tight mb-4 leading-[1.1]">
                                Fly Brain &{" "}
                                <span style="background:linear-gradient(135deg,#818cf8,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                                    ZENE Agent
                                </span>
                            </h1>
                            <p class="text-base text-[#454651] dark:text-[#94a3b8] leading-relaxed max-w-lg">
                                A 500-neuron biological connectome running in pure Rust as a sub-millisecond safety reflex, wired directly into ZENE — an autonomous multi-turn coding engine built into Zenthree.
                            </p>
                        </div>

                        <div class="grid grid-cols-4 gap-3">
                            {[
                                { val: "500",   label: "neurons"  },
                                { val: "~5K",   label: "synapses" },
                                { val: "50 KB", label: "RAM"      },
                                { val: "0",     label: "tokens"   },
                            ].map((s) => (
                                <div key={s.label} class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3 text-center shadow-sm">
                                    <div class="font-['JetBrains_Mono',monospace] text-sm font-bold text-[#4352a5] dark:text-[#818cf8]">{s.val}</div>
                                    <div class="text-[10px] text-[#767683] dark:text-[#64748b] mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-4 shadow-sm">
                            <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] uppercase tracking-widest mb-3">Decision Stack</p>
                            <div class="space-y-2">
                                {[
                                    { tier: "T1", label: "Fly Reflex Net",      sub: "500 neurons · Pure Rust · Dale's Principle",    latency: "< 0.05 ms",    color: "#22c55e" },
                                    { tier: "T2", label: "Laya Semantic Router", sub: "ModernBERT · 8-class intent · Model cascading", latency: "15-30 ms",     color: "#60a5fa" },
                                    { tier: "T3", label: "Cloud LLM",            sub: "Groq LLaMA-3.3 70B · Gemini 1.5 Pro",          latency: "500-2,000 ms",  color: "#a78bfa" },
                                ].map((t) => (
                                    <div key={t.tier} class="flex items-center gap-3 p-2.5 rounded-[4px] border border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 transition-all">
                                        <span
                                            class="shrink-0 text-[10px] font-bold font-['JetBrains_Mono',monospace] px-1.5 py-0.5 rounded-[3px]"
                                            style={`color:${t.color};background:${t.color}18;border:1px solid ${t.color}30`}
                                        >
                                            {t.tier}
                                        </span>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-xs text-[#1b1b21] dark:text-[#e2e8f0] font-medium">{t.label}</div>
                                            <div class="text-[10px] text-[#767683] dark:text-[#64748b] mt-0.5 truncate font-['JetBrains_Mono',monospace]">{t.sub}</div>
                                        </div>
                                        <span class="shrink-0 text-xs font-bold font-['JetBrains_Mono',monospace]" style={`color:${t.color}`}>{t.latency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3 pt-1">
                            <a
                                href="/products/zenthra/apps/zenthree"
                                class="inline-flex items-center gap-2 py-2.5 px-5 bg-[#5c6bc0] text-white font-medium rounded-[4px] text-sm hover:brightness-110 transition-all shadow-md shadow-[#5c6bc0]/20"
                            >
                                Zenthree IDE
                            </a>
                            <a
                                href="https://github.com/kabirajpan/zenthree"
                                target="_blank"
                                rel="noopener"
                                class="inline-flex items-center gap-2 py-2.5 px-5 bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] text-[#1b1b21] dark:text-white font-medium rounded-[4px] text-sm hover:bg-[#f5f2fa] dark:hover:bg-[#151928] hover:border-[#4352a5] dark:hover:border-[#312e81] transition-all shadow-sm"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Right: neural trajectory image */}
                    <div class="col-span-12 lg:col-span-6">
                        <div class="relative rounded-[6px] overflow-hidden border border-[#c6c5d3] dark:border-[#1e2230] bg-[#0c0916] shadow-2xl" style="height: 420px;">
                            <img
                                src="/assets/research/fly-decision-net/intent_neural_trajectories.png"
                                alt="Neural Trajectory Space — 8-class intent separation"
                                class="w-full h-full object-cover"
                            />
                            <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(11,8,25,0.90) 0%, transparent 55%)" />
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="font-['JetBrains_Mono',monospace] text-[10px] text-zinc-500 mb-1">outputs/intent_neural_trajectories.png</div>
                                <p class="font-['Syne',sans-serif] text-white text-sm font-semibold">Neural Trajectory Space</p>
                                <p class="text-zinc-400 text-xs mt-0.5">8-class intent separation in biological connectome latent space</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 02 + 03: Roadmap & ZENE */}
                <div class="grid lg:grid-cols-2 gap-12 mb-20 pb-20 border-b border-[#c6c5d3] dark:border-[#1e2230]">

                    <div>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold block mb-1">02 / Connectome Scaling</span>
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white mb-6">Roadmap to Whole-Brain</h2>
                        <div class="space-y-2.5">
                            {STAGES.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick$={() => { activeStage.value = i; }}
                                    class={[
                                        "w-full text-left p-4 rounded-[4px] border transition-all duration-150 cursor-pointer",
                                        activeStage.value === i
                                            ? "border-[#4352a5] dark:border-[#5c6bc0] bg-[#f0effe] dark:bg-[#0e1017] shadow-sm"
                                            : "border-[#c6c5d3] dark:border-[#1e2230] bg-white dark:bg-[#0e1017] hover:border-[#4352a5] dark:hover:border-[#5c6bc0]/60 hover:bg-[#fbf8ff] dark:hover:bg-[#12141f] hover:-translate-y-px",
                                    ].join(" ")}
                                >
                                    <div class="flex items-center justify-between mb-1.5">
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b]">{s.id}</span>
                                            <span class="font-['Syne',sans-serif] text-sm font-semibold text-[#1b1b21] dark:text-white">{s.title}</span>
                                            {s.active && (
                                                <span class="text-[9px] px-1.5 py-0.5 rounded-[3px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-['JetBrains_Mono',monospace] uppercase tracking-wide">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] shrink-0 ml-3">{s.latency}</span>
                                    </div>
                                    <p class="text-[11px] text-[#454651] dark:text-[#94a3b8] pl-7">{s.desc}</p>
                                    <p class="text-[10px] text-[#767683] dark:text-[#64748b] pl-7 mt-0.5 font-['JetBrains_Mono',monospace]">{s.neurons} neurons</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold block mb-1">03 / ZENE Agent</span>
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white mb-6">Autonomous Coding Engine</h2>

                        <div class="border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden mb-4 shadow-sm">
                            <div class="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                                <span class="ml-2 font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b]">
                                    crates/agent/src/agentic_loop/engine.rs
                                </span>
                            </div>
                            <div class="p-4 font-['JetBrains_Mono',monospace] text-[11px] leading-[1.8] bg-[#071025] overflow-x-auto">
                                <div><span class="text-[#c792ea]">pub async fn </span><span class="text-[#61afef]">run</span><span class="text-[#bfc9d9]">(&mut self, prompt: &str) {"{"}</span></div>
                                <div class="pl-5 text-[#6a7b8a] italic">{"// T1: Biological Fly Reflex  <0.05 ms"}</div>
                                <div class="pl-5"><span class="text-[#c792ea]">let </span><span class="text-[#e5c07b]">intent</span><span class="text-[#bfc9d9]"> = self.fly_reflex.classify(prompt)?;</span></div>
                                <div class="pl-5"><span class="text-[#c792ea]">if </span><span class="text-[#e5c07b]">intent</span><span class="text-[#bfc9d9]"> == Intent::DANGER {"{"} return Err(Lock); {"}"}</span></div>
                                <div class="pl-5 mt-1 text-[#6a7b8a] italic">{"// T2: Laya router — 15 ms"}</div>
                                <div class="pl-5"><span class="text-[#c792ea]">let </span><span class="text-[#e5c07b]">tools</span><span class="text-[#bfc9d9]"> = laya.mask_tools(intent);</span></div>
                                <div class="pl-5 mt-1 text-[#6a7b8a] italic">{"// T3: Cloud LLM"}</div>
                                <div class="pl-5"><span class="text-[#c792ea]">loop </span><span class="text-[#bfc9d9]">{"{"} self.provider.stream(&tools).await?; {"}"}</span></div>
                                <div><span class="text-[#bfc9d9]">{"}"}</span></div>
                                <div class="mt-3 pt-2.5 border-t border-white/10 flex gap-4 text-[10px]">
                                    <span class="text-emerald-400">▲ cargo check — 0 errors</span>
                                    <span class="text-[#64748b]">crates/agent ✓</span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3.5 shadow-sm">
                                <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] uppercase tracking-widest mb-3">Status</p>
                                <div class="space-y-2">
                                    {[
                                        { label: "Agentic Loop",    done: true  },
                                        { label: "Tool Suite 14+",  done: true  },
                                        { label: "Tree-sitter AST", done: true  },
                                        { label: "Skills Engine",   done: true  },
                                        { label: "Fly Reflex Gate", done: false },
                                        { label: "DANGER Lock",     done: false },
                                    ].map((item) => (
                                        <div key={item.label} class="flex items-center gap-2">
                                            <span class={`text-[10px] shrink-0 ${item.done ? "text-emerald-500" : "text-[#c6c5d3] dark:text-[#374151]"}`}>
                                                {item.done ? "✓" : "○"}
                                            </span>
                                            <span class={`text-[11px] ${item.done ? "text-[#454651] dark:text-[#94a3b8]" : "text-[#767683] dark:text-[#4b5563]"}`}>
                                                {item.label}
                                            </span>
                                            {!item.done && (
                                                <span class="ml-auto font-['JetBrains_Mono',monospace] text-[9px] text-[#5c6bc0] dark:text-[#818cf8]">wip</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div class="bg-white dark:bg-[#0e1017] border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] p-3.5 shadow-sm">
                                <p class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] uppercase tracking-widest mb-3">Engine</p>
                                <div class="space-y-2 text-[11px]">
                                    {[
                                        { k: "Providers",   v: "Gemini · Groq" },
                                        { k: "Tools",       v: "14+"           },
                                        { k: "Skill tiers", v: "3"             },
                                        { k: "AST parse",   v: "< 1 ms"        },
                                        { k: "Languages",   v: "5+"            },
                                    ].map((row) => (
                                        <div key={row.k} class="flex justify-between items-center">
                                            <span class="text-[#767683] dark:text-[#64748b]">{row.k}</span>
                                            <span class="font-['JetBrains_Mono',monospace] text-[#1b1b21] dark:text-[#e2e8f0] font-medium">{row.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 04: Intent Matrix */}
                <div class="mb-20 pb-20 border-b border-[#c6c5d3] dark:border-[#1e2230]">
                    <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold block mb-1">04 / Behavioral Matrix</span>
                    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                        <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white">8-Intent Classification</h2>
                        <p class="text-xs text-[#767683] dark:text-[#64748b] font-['JetBrains_Mono',monospace] max-w-xs text-right hidden sm:block">
                            Spinal reflex classifies each prompt into one of 8 behavioral gates before any LLM call.
                        </p>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                        {INTENTS.map((intent) => (
                            <div
                                key={intent.label}
                                class="p-3.5 rounded-[4px] border text-center hover:-translate-y-0.5 transition-all duration-150"
                                style={`background:${intent.bg};border-color:${intent.border}`}
                            >
                                <p class="text-xs font-bold font-['JetBrains_Mono',monospace] dark:hidden" style={`color:${intent.color}`}>{intent.label}</p>
                                <p class="text-xs font-bold font-['JetBrains_Mono',monospace] hidden dark:block" style={`color:${intent.darkColor}`}>{intent.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 05: Benchmarks */}
                <div class="mb-16 pb-16 border-b border-[#c6c5d3] dark:border-[#1e2230]">
                    <span class="text-[10px] font-['JetBrains_Mono',monospace] uppercase tracking-widest text-[#4352a5] dark:text-[#818cf8] font-semibold block mb-1">05 / Benchmarks</span>
                    <h2 class="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-[#1b1b21] dark:text-white mb-6">Performance Targets</h2>

                    <div class="border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden shadow-sm">
                        <div class="grid grid-cols-3 px-5 py-3 border-b border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d]">
                            <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] uppercase tracking-wider">Metric</span>
                            <span class="font-['JetBrains_Mono',monospace] text-[10px] text-[#767683] dark:text-[#64748b] uppercase tracking-wider">LLM Agents</span>
                            <span class="font-['JetBrains_Mono',monospace] text-[10px] text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">Fly Brain</span>
                        </div>
                        {METRICS.map((m, i) => (
                            <div
                                key={m.label}
                                class={[
                                    "grid grid-cols-3 px-5 py-3 border-b border-[#c6c5d3] dark:border-[#1e2230] last:border-0 transition-colors hover:bg-[#f5f2fa] dark:hover:bg-[#12141f]",
                                    i % 2 === 0 ? "bg-white dark:bg-[#0e1017]" : "bg-[#fbf8ff] dark:bg-[#07080d]",
                                ].join(" ")}
                            >
                                <span class="text-xs text-[#454651] dark:text-[#94a3b8] font-medium">{m.label}</span>
                                <span class="text-xs text-[#c6c5d3] dark:text-[#374151] line-through font-['JetBrains_Mono',monospace]">{m.before}</span>
                                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-['JetBrains_Mono',monospace]">{m.after}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div class="flex flex-wrap items-center gap-6 pt-2">
                    <a href="/products" class="text-xs text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white transition-colors font-['JetBrains_Mono',monospace]">
                        ← Products
                    </a>
                    <a href="https://github.com/kabirajpan/zenthree" target="_blank" rel="noopener" class="text-xs text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white transition-colors font-['JetBrains_Mono',monospace]">
                        Zenthree ↗
                    </a>
                    <a href="https://codex.flywire.ai" target="_blank" rel="noopener" class="text-xs text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white transition-colors font-['JetBrains_Mono',monospace]">
                        FlyWire Codex ↗
                    </a>
                    <a href="https://janelia.org" target="_blank" rel="noopener" class="text-xs text-[#767683] dark:text-[#94a3b8] hover:text-[#1b1b21] dark:hover:text-white transition-colors font-['JetBrains_Mono',monospace]">
                        Janelia ↗
                    </a>
                </div>

            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Research & Development — ZenthraLabs",
    meta: [
        {
            name: "description",
            content: "Fly Brain biological decision kernel and ZENE autonomous coding agent — biologically-grounded AI research at ZenthraLabs.",
        },
    ],
};
