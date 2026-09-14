import { API_BASE } from "~/lib/api";
import { component$, useSignal, useVisibleTask$, $, useContext } from "@builder.io/qwik";
import { AdminContext, setCachedAdminStore } from "~/stores/adminStore";

interface Stats {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    afterMotionCount: number;
    webAppCount: number;
}

interface RegistrationPoint {
    date: string;
    count: number;
}

interface ContinuousDay {
    date: string;
    count: number;
    label: string;
}

export default component$(() => {
    const adminStore = useContext(AdminContext);

    // Instant 0ms hydration from global store
    const stats = useSignal<Stats | null>(adminStore.stats);
    const statsLoading = useSignal(!adminStore.stats);

    const selectedDays = useSignal<number>(30);
    const registrations = useSignal<RegistrationPoint[]>(adminStore.registrations[30] || []);
    const regLoading = useSignal(!adminStore.registrations[30]);
    const hoveredIndex = useSignal<number | null>(null);

    const getCookie = $((name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    });

    const fetchStats = $(async () => {
        const token = await getCookie("zenthra_auth_token");
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                stats.value = data.stats;
                adminStore.stats = data.stats;
                adminStore.lastFetchedStats = Date.now();
                setCachedAdminStore({ stats: data.stats, lastFetchedStats: Date.now() });
            }
        } catch (err) {
            console.error("Failed to fetch admin stats:", err);
        } finally {
            statsLoading.value = false;
        }
    });

    const fetchRegistrations = $(async (days: number) => {
        // Use cached points from store immediately if available
        if (adminStore.registrations[days]) {
            registrations.value = adminStore.registrations[days];
            regLoading.value = false;
        } else {
            regLoading.value = true;
        }

        const token = await getCookie("zenthra_auth_token");
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/api/admin/registrations?days=${days}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                const points = data.registrations || [];
                registrations.value = points;
                adminStore.registrations[days] = points;
                setCachedAdminStore({ registrations: adminStore.registrations });
            }
        } catch (err) {
            console.error("Failed to fetch registrations:", err);
        } finally {
            regLoading.value = false;
        }
    });

    useVisibleTask$(async () => {
        await fetchStats();
    });

    useVisibleTask$(async ({ track }) => {
        const d = track(() => selectedDays.value);
        hoveredIndex.value = null;
        await fetchRegistrations(d);
    });

    // Generate unbroken daily series
    const buildContinuousDays = (days: number, data: RegistrationPoint[]): ContinuousDay[] => {
        const map = new Map<string, number>();
        for (const item of data) {
            map.set(item.date, Number(item.count));
        }

        const result: ContinuousDay[] = [];
        const now = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const dd = String(d.getDate()).padStart(2, "0");
            const dateKey = `${yyyy}-${mm}-${dd}`;
            const monthShort = d.toLocaleDateString("en-US", { month: "short" });
            result.push({
                date: dateKey,
                count: map.get(dateKey) ?? 0,
                label: `${monthShort} ${d.getDate()}`,
            });
        }
        return result;
    };

    // Donut chart helper
    const donut = (slices: { value: number; color: string }[], r = 54) => {
        const total = slices.reduce((s, x) => s + x.value, 0) || 1;
        const circ = 2 * Math.PI * r;
        let offset = 0;
        return slices.map((slice) => {
            const dash = (slice.value / total) * circ;
            const gap = circ - dash;
            const el = { color: slice.color, dash, gap, offset };
            offset += dash;
            return el;
        });
    };

    // Bar chart helper
    const bars = (values: number[]) => {
        const max = Math.max(...values, 1);
        return values.map((v) => Math.round((v / max) * 100));
    };

    const continuousDays = buildContinuousDays(selectedDays.value, registrations.value);
    const totalSignupsInPeriod = continuousDays.reduce((acc, cur) => acc + cur.count, 0);
    const peakSignupDay = continuousDays.reduce(
        (max, cur) => (cur.count > max.count ? cur : max),
        { date: "-", count: 0, label: "-" }
    );
    const dailyAverage = (totalSignupsInPeriod / selectedDays.value).toFixed(1);

    // Smooth cubic Bezier spline helper
    const getCurvedPath = (pts: { x: number; y: number }[], bottomY: number) => {
        if (pts.length === 0) return { line: "", area: "" };
        if (pts.length === 1) {
            const line = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
            const area = `${line} L ${pts[0].x.toFixed(1)},${bottomY} Z`;
            return { line, area };
        }

        let line = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[Math.max(i - 1, 0)];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[Math.min(i + 2, pts.length - 1)];

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = Math.min(bottomY, Math.max(15, p1.y + (p2.y - p0.y) / 6));
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = Math.min(bottomY, Math.max(15, p2.y - (p3.y - p1.y) / 6));

            line += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
        }

        const firstPt = pts[0];
        const lastPt = pts[pts.length - 1];
        const area = `${line} L ${lastPt.x.toFixed(1)},${bottomY} L ${firstPt.x.toFixed(1)},${bottomY} Z`;
        return { line, area };
    };

    // SVG Chart Geometry
    const svgWidth = 840;
    const svgHeight = 250;
    const pad = { top: 25, right: 35, bottom: 35, left: 45 };
    const plotW = svgWidth - pad.left - pad.right;
    const plotH = svgHeight - pad.top - pad.bottom;
    const bottomY = pad.top + plotH;

    const rawMax = Math.max(...continuousDays.map((d) => d.count), 0);
    const maxVal = rawMax === 0 ? 5 : Math.ceil(rawMax * 1.2);
    const yTicks = [0, Math.round(maxVal / 2), maxVal];

    const points = continuousDays.map((d, index) => {
        const x = pad.left + (continuousDays.length > 1 ? (index / (continuousDays.length - 1)) * plotW : plotW / 2);
        const y = pad.top + plotH - (d.count / maxVal) * plotH;
        return { ...d, x, y };
    });

    const { line: curvedLine, area: curvedArea } = getCurvedPath(points, bottomY);
    const stride = selectedDays.value <= 7 ? 1 : selectedDays.value <= 14 ? 2 : selectedDays.value <= 30 ? 5 : 15;

    const activePoint = hoveredIndex.value !== null && points[hoveredIndex.value] ? points[hoveredIndex.value] : null;

    return (
        <div class="space-y-6">
            {/* Header */}
            <div>
                <h1 class="font-['Syne',sans-serif] text-2xl font-bold text-[#1b1b21] dark:text-white tracking-tight">
                    Dashboard
                </h1>
                <p class="text-xs text-[#767683] dark:text-[#94a3b8] mt-1 font-['DM_Sans',sans-serif]">
                    Overview of user signups, application traction, and platform activity.
                </p>
            </div>

            {statsLoading.value ? (
                <div class="flex items-center gap-2 text-xs text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace]">
                    <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading platform metrics...
                </div>
            ) : stats.value ? (
                <>
                    {/* ── Stat Cards ── */}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { label: "Total Users", value: stats.value.totalUsers, color: "#4352a5", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
                            { label: "After Motion", value: stats.value.afterMotionCount || 0, color: "#7c3aed", icon: "M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" },
                            { label: "Web App", value: stats.value.webAppCount || 0, color: "#0891b2", icon: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
                            { label: "Admins", value: stats.value.adminCount, color: "#dc2626", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                        ].map((card) => (
                            <div key={card.label} class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:border-[#4352a5]/50 transition-colors">
                                <div class="shrink-0 w-9 h-9 rounded-[6px] flex items-center justify-center" style={`background:${card.color}18`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d={card.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase font-['JetBrains_Mono',monospace] tracking-wider">{card.label}</p>
                                    <p class="text-2xl font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mt-0.5">{card.value.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── User Registrations Chart Card ── */}
                    <div class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-4 sm:p-5 shadow-sm space-y-5">
                        {/* Header Controls */}
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0eff5] dark:border-[#1a1c28] pb-4">
                            <div class="flex items-center gap-3">
                                <span class="relative flex h-2.5 w-2.5">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4352a5] opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4352a5]"></span>
                                </span>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h2 class="text-sm font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif]">
                                            User Registrations
                                        </h2>
                                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-['JetBrains_Mono',monospace]">
                                            Live Trend
                                        </span>
                                    </div>
                                    <p class="text-[11px] text-[#767683] dark:text-[#94a3b8] mt-0.5 font-['DM_Sans',sans-serif]">
                                        Daily user registration curve and signup momentum.
                                    </p>
                                </div>
                            </div>

                            {/* Time range selector */}
                            <div class="flex items-center gap-1 p-1 bg-[#f4f2f8] dark:bg-[#1a1b26] border border-[#c6c5d3]/50 dark:border-[#1e2030] rounded-[6px] self-start sm:self-auto overflow-x-auto max-w-full">
                                {[
                                    { label: "7D", days: 7 },
                                    { label: "14D", days: 14 },
                                    { label: "30D", days: 30 },
                                    { label: "90D", days: 90 },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick$={() => selectedDays.value = item.days}
                                        class={[
                                            "px-3 py-1 text-[11px] font-['JetBrains_Mono',monospace] font-bold rounded-[4px] transition-all duration-150",
                                            selectedDays.value === item.days
                                                ? "bg-[#1b1b21] text-white dark:bg-white dark:text-[#1b1b21] shadow-xs"
                                                : "text-[#767683] hover:text-[#1b1b21] dark:text-[#94a3b8] dark:hover:text-white"
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary Metrics */}
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div class="p-3.5 rounded-[6px] bg-[#fbf8ff] dark:bg-[#161722] border border-[#e8e6f0] dark:border-[#1e2030]">
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase block">
                                    New Signups
                                </span>
                                <span class="text-xl font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mt-0.5 block">
                                    {totalSignupsInPeriod.toLocaleString()}
                                </span>
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] block mt-0.5">
                                    in past {selectedDays.value} days
                                </span>
                            </div>
                            <div class="p-3.5 rounded-[6px] bg-[#fbf8ff] dark:bg-[#161722] border border-[#e8e6f0] dark:border-[#1e2030]">
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase block">
                                    Daily Average
                                </span>
                                <span class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif] mt-0.5 block">
                                    {dailyAverage}
                                </span>
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] block mt-0.5">
                                    users / day
                                </span>
                            </div>
                            <div class="p-3.5 rounded-[6px] bg-[#fbf8ff] dark:bg-[#161722] border border-[#e8e6f0] dark:border-[#1e2030]">
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace] uppercase block">
                                    Peak Day
                                </span>
                                <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-['Syne',sans-serif] mt-0.5 block">
                                    {peakSignupDay.count}
                                </span>
                                <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] block mt-0.5 truncate">
                                    {peakSignupDay.label !== "-" ? peakSignupDay.label : "None"}
                                </span>
                            </div>
                        </div>

                        {/* Interactive Graph Box */}
                        <div class="relative w-full pt-2">
                            {regLoading.value && (
                                <div class="absolute inset-0 bg-white/70 dark:bg-[#12131b]/70 backdrop-blur-xs flex items-center justify-center z-20 rounded-[6px]">
                                    <div class="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#4352a5]">
                                        <div class="w-4 h-4 border-2 border-[#4352a5] border-t-transparent rounded-full animate-spin" />
                                        Updating curve...
                                    </div>
                                </div>
                            )}

                            {/* Floating Glassmorphic Tooltip */}
                            {activePoint && (
                                <div
                                    class="absolute pointer-events-none z-30 px-3 py-2 rounded-[6px] bg-[#1b1b21]/95 text-white dark:bg-white/95 dark:text-[#1b1b21] backdrop-blur-md shadow-xl border border-white/10 dark:border-black/10 text-xs font-['DM_Sans',sans-serif] transition-all duration-75 -translate-x-1/2 -translate-y-full"
                                    style={`left: ${(activePoint.x / svgWidth) * 100}%; top: ${(activePoint.y / svgHeight) * 100}%; margin-top: -12px;`}
                                >
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-bold font-['JetBrains_Mono',monospace]">
                                            {activePoint.count}
                                        </span>
                                        <span class="text-[11px] opacity-80">
                                            {activePoint.count === 1 ? "signup" : "signups"}
                                        </span>
                                    </div>
                                    <div class="text-[10px] opacity-70 font-['JetBrains_Mono',monospace] mt-0.5">
                                        {activePoint.label} ({activePoint.date})
                                    </div>
                                </div>
                            )}

                            {/* Responsive SVG with natural aspect ratio (NO stretching!) */}
                            <svg
                                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                                class="w-full h-auto max-h-[300px] select-none"
                            >
                                <defs>
                                    {/* Multi-stop soft luminous area gradient */}
                                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#4352a5" stop-opacity="0.38" />
                                        <stop offset="60%" stop-color="#4352a5" stop-opacity="0.08" />
                                        <stop offset="100%" stop-color="#4352a5" stop-opacity="0.00" />
                                    </linearGradient>

                                    {/* Line Glow filter */}
                                    <filter id="lineGlow" x="-10%" y="-20%" width="120%" height="150%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#4352a5" flood-opacity="0.35" />
                                    </filter>
                                </defs>

                                {/* Horizontal Gridlines & Y-axis labels */}
                                {yTicks.map((tick) => {
                                    const y = pad.top + plotH - (tick / maxVal) * plotH;
                                    return (
                                        <g key={tick}>
                                            <line
                                                x1={pad.left}
                                                y1={y}
                                                x2={svgWidth - pad.right}
                                                y2={y}
                                                stroke="currentColor"
                                                stroke-dasharray="3 4"
                                                class="text-black/10 dark:text-white/10"
                                            />
                                            <text
                                                x={pad.left - 10}
                                                y={y + 3.5}
                                                text-anchor="end"
                                                font-size="10"
                                                font-family="'JetBrains Mono', monospace"
                                                class="fill-[#767683] dark:fill-[#94a3b8]"
                                            >
                                                {tick}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Soft Area Fill under the curve */}
                                {curvedArea && (
                                    <path
                                        d={curvedArea}
                                        fill="url(#curveGradient)"
                                    />
                                )}

                                {/* Smooth Spline Curve with soft glow */}
                                {curvedLine && (
                                    <path
                                        d={curvedLine}
                                        fill="none"
                                        stroke="#4352a5"
                                        stroke-width="2.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        filter="url(#lineGlow)"
                                    />
                                )}

                                {/* Scrubber Guidelines on Hover */}
                                {activePoint && (
                                    <>
                                        {/* Vertical Scrubber Line */}
                                        <line
                                            x1={activePoint.x}
                                            y1={pad.top}
                                            x2={activePoint.x}
                                            y2={bottomY}
                                            stroke="#4352a5"
                                            stroke-width="1.5"
                                            stroke-dasharray="3 3"
                                            opacity="0.75"
                                        />
                                        {/* Horizontal Guideline to Axis */}
                                        <line
                                            x1={pad.left}
                                            y1={activePoint.y}
                                            x2={activePoint.x}
                                            y2={activePoint.y}
                                            stroke="#4352a5"
                                            stroke-width="1"
                                            stroke-dasharray="2 3"
                                            opacity="0.4"
                                        />
                                    </>
                                )}

                                {/* Data Dots & Perfect Non-Stretched Circles */}
                                {points.map((pt, i) => {
                                    const isHovered = hoveredIndex.value === i;
                                    // Show dots when small dataset, or hovered, or has activity
                                    const showDot = continuousDays.length <= 15 || isHovered || pt.count > 0;

                                    return (
                                        <g key={pt.date}>
                                            {/* Hover radar glow */}
                                            {isHovered && (
                                                <circle
                                                    cx={pt.x}
                                                    cy={pt.y}
                                                    r="10"
                                                    fill="#4352a5"
                                                    opacity="0.25"
                                                    class="animate-ping"
                                                />
                                            )}

                                            {/* Regular dot */}
                                            {showDot && (
                                                <circle
                                                    cx={pt.x}
                                                    cy={pt.y}
                                                    r={isHovered ? 5.5 : 3.5}
                                                    fill={isHovered ? "#4352a5" : "#ffffff"}
                                                    stroke="#4352a5"
                                                    stroke-width={isHovered ? 2.5 : 2}
                                                    class="transition-all duration-150 pointer-events-none"
                                                />
                                            )}

                                            {/* Interactive column hitbox */}
                                            <rect
                                                x={pt.x - (plotW / points.length) / 2}
                                                y={pad.top}
                                                width={Math.max(plotW / points.length, 12)}
                                                height={plotH}
                                                fill="transparent"
                                                class="cursor-pointer"
                                                onMouseEnter$={() => {
                                                    hoveredIndex.value = i;
                                                }}
                                                onMouseLeave$={() => {
                                                    if (hoveredIndex.value === i) {
                                                        hoveredIndex.value = null;
                                                    }
                                                }}
                                            />
                                        </g>
                                    );
                                })}

                                {/* X-axis Date Labels */}
                                {points.map((pt, i) => {
                                    const isLast = i === points.length - 1;
                                    const shouldShow = i % stride === 0 || isLast;
                                    if (!shouldShow) return null;

                                    return (
                                        <text
                                            key={`label-${pt.date}`}
                                            x={pt.x}
                                            y={bottomY + 20}
                                            text-anchor={i === 0 ? "start" : isLast ? "end" : "middle"}
                                            font-size="9.5"
                                            font-family="'JetBrains Mono', monospace"
                                            class="fill-[#767683] dark:fill-[#94a3b8]"
                                        >
                                            {pt.label}
                                        </text>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* ── Additional Breakdown Charts ── */}
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        {/* Donut — User by App */}
                        <div class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-5 shadow-sm hover:border-[#4352a5]/50 transition-colors">
                            <p class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mb-4">Users by App</p>
                            {(() => {
                                const total = stats.value!.totalUsers || 1;
                                const am = stats.value!.afterMotionCount || 0;
                                const web = stats.value!.webAppCount || 0;
                                const other = Math.max(0, total - am - web);
                                const sliceData = donut([
                                    { value: am, color: "#7c3aed" },
                                    { value: web, color: "#0891b2" },
                                    { value: other, color: "#e5e7eb" },
                                ]);
                                return (
                                    <div class="flex items-center gap-6">
                                        <svg width="140" height="140" viewBox="0 0 140 140" class="shrink-0">
                                            {sliceData.map((s, i) => (
                                                <circle
                                                    key={i}
                                                    cx="70" cy="70" r="54"
                                                    fill="none"
                                                    stroke={s.color}
                                                    stroke-width="18"
                                                    stroke-dasharray={`${s.dash} ${s.gap}`}
                                                    transform="rotate(-90 70 70)"
                                                    style={`stroke-dashoffset: -${s.offset - (2 * Math.PI * 54)}`}
                                                />
                                            ))}
                                            <text x="70" y="66" text-anchor="middle" font-size="18" font-weight="bold" fill="currentColor" class="fill-[#1b1b21] dark:fill-white font-['Syne',sans-serif]">{total.toLocaleString()}</text>
                                            <text x="70" y="82" text-anchor="middle" font-size="9" fill="#767683" class="font-['JetBrains_Mono',monospace]">TOTAL</text>
                                        </svg>
                                        <div class="space-y-2.5 text-xs font-['DM_Sans',sans-serif] flex-1">
                                            {[
                                                { label: "After Motion", value: am, color: "#7c3aed" },
                                                { label: "Web App", value: web, color: "#0891b2" },
                                                { label: "Other", value: other, color: "#d1d5db" },
                                            ].map((item) => (
                                                <div key={item.label} class="flex items-center gap-2">
                                                    <span class="w-2.5 h-2.5 rounded-full shrink-0" style={`background:${item.color}`} />
                                                    <span class="text-[#767683] dark:text-[#94a3b8]">{item.label}</span>
                                                    <span class="ml-auto font-bold text-[#1b1b21] dark:text-white font-['JetBrains_Mono',monospace]">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Bar Chart — Role split */}
                        <div class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-5 shadow-sm hover:border-[#4352a5]/50 transition-colors">
                            <p class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mb-4">Role Distribution</p>
                            {(() => {
                                const data = [
                                    { label: "Users", value: stats.value!.userCount || 0, color: "#4352a5" },
                                    { label: "Admins", value: stats.value!.adminCount || 0, color: "#dc2626" },
                                ];
                                const heights = bars(data.map((d) => d.value));
                                return (
                                    <div class="flex flex-col h-[120px] justify-end gap-2">
                                        <div class="flex items-end gap-4 h-[100px]">
                                            {data.map((d, i) => (
                                                <div key={d.label} class="flex flex-col items-center gap-1 flex-1">
                                                    <span class="text-[10px] font-bold text-[#1b1b21] dark:text-white font-['JetBrains_Mono',monospace]">{d.value.toLocaleString()}</span>
                                                    <div
                                                        class="w-full rounded-t-[4px] transition-all duration-700"
                                                        style={`height:${Math.max(heights[i], 4)}%; background:${d.color}; min-height:4px`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div class="flex gap-4">
                                            {data.map((d) => (
                                                <div key={d.label} class="flex items-center gap-1.5 flex-1">
                                                    <span class="w-2 h-2 rounded-sm shrink-0" style={`background:${d.color}`} />
                                                    <span class="text-[10px] text-[#767683] dark:text-[#94a3b8] font-['DM_Sans',sans-serif]">{d.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* App breakdown horizontal bars */}
                        <div class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-5 shadow-sm hover:border-[#4352a5]/50 transition-colors">
                            <p class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mb-4">App Breakdown</p>
                            {(() => {
                                const total = stats.value!.totalUsers || 1;
                                const items = [
                                    { label: "After Motion", value: stats.value!.afterMotionCount || 0, color: "#7c3aed" },
                                    { label: "Web App", value: stats.value!.webAppCount || 0, color: "#0891b2" },
                                ];
                                return (
                                    <div class="space-y-4 mt-2">
                                        {items.map((item) => {
                                            const pct = Math.round((item.value / total) * 100);
                                            return (
                                                <div key={item.label} class="space-y-1.5">
                                                    <div class="flex justify-between text-[11px] font-['DM_Sans',sans-serif]">
                                                        <span class="text-[#767683] dark:text-[#94a3b8]">{item.label}</span>
                                                        <span class="font-bold text-[#1b1b21] dark:text-white">{pct}%</span>
                                                    </div>
                                                    <div class="h-2 w-full bg-[#f4f2f8] dark:bg-[#1e2030] rounded-full overflow-hidden">
                                                        <div
                                                            class="h-full rounded-full transition-all duration-700"
                                                            style={`width:${pct}%; background:${item.color}`}
                                                        />
                                                    </div>
                                                    <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] font-['JetBrains_Mono',monospace]">{item.value.toLocaleString()} users</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* ── Summary Row ── */}
                    <div class="bg-white dark:bg-[#12131b] border border-[#c6c5d3] dark:border-[#1e2030] rounded-[8px] p-5 shadow-sm">
                        <p class="text-xs font-bold text-[#1b1b21] dark:text-white font-['Syne',sans-serif] mb-4">Platform Summary</p>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {[
                                { label: "Admin Ratio", value: `${stats.value.totalUsers ? ((stats.value.adminCount / stats.value.totalUsers) * 100).toFixed(1) : 0}%`, sub: "of all accounts" },
                                { label: "After Motion Share", value: `${stats.value.totalUsers ? (((stats.value.afterMotionCount || 0) / stats.value.totalUsers) * 100).toFixed(1) : 0}%`, sub: "of total users" },
                                { label: "Web App Share", value: `${stats.value.totalUsers ? (((stats.value.webAppCount || 0) / stats.value.totalUsers) * 100).toFixed(1) : 0}%`, sub: "of total users" },
                                { label: "Regular Users", value: (stats.value.userCount || 0).toLocaleString(), sub: "non-admin accounts" },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] uppercase font-['JetBrains_Mono',monospace] tracking-wider">{item.label}</p>
                                    <p class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif] mt-1">{item.value}</p>
                                    <p class="text-[10px] text-[#767683] dark:text-[#94a3b8] mt-0.5 font-['DM_Sans',sans-serif]">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p class="text-xs text-rose-500">Failed to load stats.</p>
            )}
        </div>
    );
});
