import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const Hero3DScene = component$(() => {
  const barRef    = useSignal<HTMLElement>();
  const timeRef   = useSignal<HTMLElement>();
  const sizeRef   = useSignal<HTMLElement>();
  const latRef    = useSignal<HTMLElement>();

  useVisibleTask$(async ({ cleanup }) => {
    const { animate, stagger } = await import("animejs");

    // Animate code lines fading in staggered
    const lines = animate(".hpc-line", {
      opacity: [0, 1],
      translateX: [-8, 0],
      duration: 380,
      ease: "outQuad",
      delay: stagger(80, { start: 200 }),
    });

    // Build bar fills then loops
    const runBuild = () => {
      if (!barRef.value) return;
      barRef.value.style.width = "0%";
      if (timeRef.value) timeRef.value.textContent = "—";

      animate(barRef.value, {
        width: ["0%", "100%"],
        duration: 900,
        ease: "outExpo",
        onComplete: () => {
          if (timeRef.value) timeRef.value.textContent = "4ms";
        },
      });
    };

    runBuild();
    const buildLoop = setInterval(runBuild, 4200);

    // Count-up for bundle size (demo -> crates)
    const deps = { value: 0 };
    animate(deps, {
      value: 12,
      duration: 1200,
      easing: "outExpo",
      update: () => {
        if (sizeRef.value) sizeRef.value.textContent = Math.round(deps.value) + ' crates';
      },
    });

    // Latency pulse number
    if (latRef.value) latRef.value.textContent = "4ms";

    // Subtle scan line
    const scan = animate(".hpc-scan", {
      top: ["-2px", "100%"],
      opacity: [0, 0.6, 0],
      duration: 1800,
      ease: "linear",
      loop: true,
      delay: 600,
    });

    cleanup(() => {
      lines.pause();
      scan.pause();
      clearInterval(buildLoop);
    });
  });

  return (
    <div class="hpc-wrap ">
      {/* Code panel — dark */}
      <div class="hpc-editor">
        {/* Scan line */}
        <div class="hpc-scan" />

        {/* Editor header */}
        <div class="hpc-editor-bar">
          <span class="hpc-dot" style="background:#ff6058" />
          <span class="hpc-dot" style="background:#ffbd2e" />
          <span class="hpc-dot" style="background:#28ca41" />
          <span class="hpc-fname">zenthra.config.rs</span>
          <span class="hpc-caption">Live demo — Zenthra in action</span>
        </div>

        {/* Syntax-highlighted code */}
        <div class="hpc-code">
          <div class="hpc-line">
            <span class="hpc-kw">use</span>
            <span class="hpc-plain"> </span>
            <span class="hpc-fn">zenthra</span>
            <span class="hpc-plain">::</span>
            <span class="hpc-fn">ZenthraConfig</span>
          </div>
          <div class="hpc-line hpc-empty">&nbsp;</div>
          <div class="hpc-line">
            <span class="hpc-kw">pub</span>
            <span class="hpc-plain"> </span>
            <span class="hpc-kw">fn</span>
            <span class="hpc-plain"> </span>
            <span class="hpc-fn">config</span>
            <span class="hpc-plain">() -&gt; </span>
            <span class="hpc-fn">ZenthraConfig</span>
            <span class="hpc-plain">{"{"}</span>
          </div>
          <div class="hpc-line hpc-indent">
            <span class="hpc-fn">ZenthraConfig</span>
            <span class="hpc-plain">{"{"}</span>
          </div>
          <div class="hpc-line hpc-indent2">
            <span class="hpc-prop">runtime</span>
            <span class="hpc-plain">: </span>
            <span class="hpc-str">"zero"</span>
            <span class="hpc-plain">,</span>
          </div>
          <div class="hpc-line hpc-indent2">
            <span class="hpc-prop">target</span>
            <span class="hpc-plain">: </span>
            <span class="hpc-str">"native"</span>
            <span class="hpc-plain">,</span>
          </div>
          <div class="hpc-line hpc-indent2">
            <span class="hpc-prop">latency_ms</span>
            <span class="hpc-plain">: </span>
            <span class="hpc-num">4</span>
            <span class="hpc-plain">, </span>
            <span class="hpc-comment">// ms</span>
          </div>
          <div class="hpc-line hpc-indent">
            <span class="hpc-plain">{"}"}</span>
          </div>
          <div class="hpc-line">
            <span class="hpc-plain">{"}"}</span>
          </div>
        </div>
      </div>

      {/* Metrics bar — light */}
      <div class="hpc-metrics">
        {/* Build */}
        <div class="hpc-metric-block">
          <div class="hpc-metric-label"><svg class="hpc-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> <span>Build</span></div>
          <div class="hpc-bar-track">
            <div ref={barRef} class="hpc-bar-fill" style="width:0%" />
          </div>
          <div ref={timeRef} class="hpc-metric-value">—</div>
        </div>
        {/* Bundle */}
        <div class="hpc-metric-block">
          <div class="hpc-metric-label"><svg class="hpc-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73L13 3l-7 3.27A2 2 0 0 0 5 8v8a2 2 0 0 0 1 1.73L11 21l7-3.27A2 2 0 0 0 19 16z"/></svg> <span>Crates</span></div>
          <div ref={sizeRef} class="hpc-metric-value hpc-green">0 crates</div>
        </div>
        {/* Latency */}
        <div class="hpc-metric-block">
          <div class="hpc-metric-label"><svg class="hpc-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg> <span>Latency</span></div>
          <div ref={latRef} class="hpc-metric-value">4ms</div>
        </div>
        {/* Uptime */}
        <div class="hpc-metric-block">
          <div class="hpc-metric-label"><svg class="hpc-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 17.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.25"/></svg> <span>Uptime</span></div>
          <div class="hpc-metric-value hpc-green">99.9%</div>
        </div>
      </div>
    </div>
  );
});

export default Hero3DScene;
