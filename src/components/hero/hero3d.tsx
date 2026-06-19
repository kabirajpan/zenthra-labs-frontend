import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Token {
    text: string;
    className: string;
}

const CODE_DATA: Token[][] = [
    // use zenthra::prelude::*;
    [
        { text: "use", className: "hpc-kw" },
        { text: " ", className: "hpc-plain" },
        { text: "zenthra", className: "hpc-fn" },
        { text: "::", className: "hpc-plain" },
        { text: "prelude", className: "hpc-fn" },
        { text: "::*;", className: "hpc-plain" }
    ],
    // empty line
    [],
    // fn main() {
    [
        { text: "fn", className: "hpc-kw" },
        { text: " ", className: "hpc-plain" },
        { text: "main", className: "hpc-fn" },
        { text: "() {", className: "hpc-plain" }
    ],
    // App::new().title("Zenthra")
    [
        { text: "    App", className: "hpc-fn" },
        { text: "::", className: "hpc-plain" },
        { text: "new", className: "hpc-fn" },
        { text: "().", className: "hpc-plain" },
        { text: "title", className: "hpc-prop" },
        { text: "(", className: "hpc-plain" },
        { text: "\"Zenthra\"", className: "hpc-str" },
        { text: ")", className: "hpc-plain" }
    ],
    // .with_ui(|ui| {
    [
        { text: "    .with_ui", className: "hpc-prop" },
        { text: "(|ui| {", className: "hpc-plain" }
    ],
    // ui.text("Hello!").show();
    [
        { text: "        ui.", className: "hpc-plain" },
        { text: "text", className: "hpc-prop" },
        { text: "(", className: "hpc-plain" },
        { text: "\"Hello!\"", className: "hpc-str" },
        { text: ").", className: "hpc-plain" },
        { text: "show", className: "hpc-prop" },
        { text: "();", className: "hpc-plain" }
    ],
    // })
    [
        { text: "    })", className: "hpc-plain" }
    ],
    // .run();
    [
        { text: "    .", className: "hpc-plain" },
        { text: "run", className: "hpc-prop" },
        { text: "();", className: "hpc-plain" }
    ],
    // }
    [
        { text: "}", className: "hpc-plain" }
    ]
];

export const Hero3DScene = component$(() => {
    const barRef = useSignal<HTMLElement>();
    const timeRef = useSignal<HTMLElement>();
    const sizeRef = useSignal<HTMLElement>();
    const latRef = useSignal<HTMLElement>();
    const visibleCount = useSignal(0);
    const isFinished = useSignal(false);

    // Virtual Cursor Signals
    const cursorX = useSignal("20%");
    const cursorY = useSignal("80%");
    const cursorOpacity = useSignal(0);
    const cursorTransition = useSignal("none");
    const isPlayButtonHovered = useSignal(false);
    const isPlayButtonActive = useSignal(false);

    useVisibleTask$(async ({ cleanup }) => {
        const { animate } = await import("animejs");

        // Flatten code data to simulate a human character stream
        const flatChars: { char: string; lineIdx: number }[] = [];
        CODE_DATA.forEach((line, lineIdx) => {
            if (line.length === 0) {
                flatChars.push({ char: "\n", lineIdx });
            } else {
                line.forEach((token) => {
                    for (let i = 0; i < token.text.length; i++) {
                        flatChars.push({ char: token.text[i], lineIdx });
                    }
                });
                flatChars.push({ char: "\n", lineIdx });
            }
        });

        const totalChars = flatChars.length;
        const activeTimeouts: any[] = [];
        let scanAnim: any = null;

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

        const startTyping = () => {
            isFinished.value = false;
            visibleCount.value = 0;
            cursorOpacity.value = 0;
            cursorX.value = "20%";
            cursorY.value = "80%";
            cursorTransition.value = "none";
            isPlayButtonHovered.value = false;
            isPlayButtonActive.value = false;
            
            if (scanAnim) {
                scanAnim.pause();
            }

            const typeNextChar = () => {
                if (visibleCount.value < totalChars) {
                    const currentCharObj = flatChars[visibleCount.value];
                    visibleCount.value += 1;

                    // Baseline human typing speed (40ms - 85ms jitter)
                    let delay = 40 + Math.random() * 45;

                    if (currentCharObj.char === "\n") {
                        // End of line pause (500ms - 650ms)
                        delay = 500 + Math.random() * 150;
                    } else if (currentCharObj.char === " ") {
                        // Indent spaces are typed rapidly (10ms)
                        const nextCharObj = flatChars[visibleCount.value];
                        if (nextCharObj && nextCharObj.char === " ") {
                            delay = 10;
                        } else {
                            delay = 25 + Math.random() * 20; // normal space
                        }
                    }

                    const nextTimeout = setTimeout(typeNextChar, delay);
                    activeTimeouts.push(nextTimeout);
                } else {
                    // Typing finished! Wait 600ms, then show virtual cursor
                    const cursorShowTimeout = setTimeout(() => {
                        cursorOpacity.value = 1;
                        cursorTransition.value = "opacity 0.4s ease-out";
                        
                        // Wait 300ms, then animate cursor to play button in the top right
                        const cursorMoveTimeout = setTimeout(() => {
                            cursorTransition.value = "left 1.2s cubic-bezier(0.25, 0.8, 0.25, 1), top 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)";
                            cursorX.value = "94%";
                            cursorY.value = "18px";
                            
                            // Wait 1200ms for movement to complete
                            const hoverTimeout = setTimeout(() => {
                                isPlayButtonHovered.value = true;
                                
                                // Wait 250ms hover delay, then click!
                                const clickTimeout = setTimeout(() => {
                                    isPlayButtonActive.value = true;
                                    document.dispatchEvent(new CustomEvent("zenthra:compile"));
                                    
                                    // Release click state after 150ms
                                    const releaseTimeout = setTimeout(() => {
                                        isPlayButtonActive.value = false;
                                        isPlayButtonHovered.value = false;
                                        
                                        // Wait 400ms, then fade out virtual cursor
                                        const fadeOutTimeout = setTimeout(() => {
                                            cursorOpacity.value = 0;
                                            cursorTransition.value = "opacity 0.4s ease-out";
                                        }, 400);
                                        activeTimeouts.push(fadeOutTimeout);
                                    }, 150);
                                    activeTimeouts.push(releaseTimeout);
                                }, 250);
                                activeTimeouts.push(clickTimeout);
                            }, 1200);
                            activeTimeouts.push(hoverTimeout);
                        }, 300);
                        activeTimeouts.push(cursorMoveTimeout);
                    }, 600);
                    activeTimeouts.push(cursorShowTimeout);

                    const restartTimeout = setTimeout(() => {
                        startTyping();
                    }, 8000); // restart typing loop
                    activeTimeouts.push(restartTimeout);
                }
            };

            // Initial start pause
            const startTimeout = setTimeout(typeNextChar, 250);
            activeTimeouts.push(startTimeout);
        };

        // Start human typing loop
        startTyping();

        // Listen for compile clicks
        const compileListener = () => {
            visibleCount.value = totalChars;
            isFinished.value = true;
            cursorOpacity.value = 0; // hide virtual cursor if compiled manually
            runBuild();

            if (scanAnim) {
                scanAnim.restart();
            } else {
                scanAnim = animate(".hpc-scan", {
                    top: ["-2px", "100%"],
                    opacity: [0, 0.6, 0],
                    duration: 1800,
                    ease: "linear",
                    loop: true,
                });
            }
        };
        document.addEventListener("zenthra:compile", compileListener);

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

        cleanup(() => {
            if (scanAnim) scanAnim.pause();
            document.removeEventListener("zenthra:compile", compileListener);
            activeTimeouts.forEach(clearTimeout);
        });
    });

    return (
        <div class="hpc-wrap">
            {/* Code panel — dark */}
            <div class="hpc-editor">
                {/* Scan line */}
                <div 
                    class="hpc-scan" 
                    style={{ 
                        opacity: isFinished.value ? 1 : 0, 
                        transition: "opacity 0.3s ease-in-out" 
                    }} 
                />

                {/* Virtual Mouse Cursor */}
                <div 
                    class="hpc-virtual-cursor"
                    style={{
                        position: "absolute",
                        width: "16px",
                        height: "16px",
                        pointerEvents: "none",
                        zIndex: 50,
                        transform: "translate(-10%, -10%)",
                        left: cursorX.value,
                        top: cursorY.value,
                        opacity: cursorOpacity.value,
                        transition: cursorTransition.value
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1.5">
                        <path d="M4.5 3v15.27l4.31-4.32 3.19 7.42 2.76-1.19-3.21-7.44h5.66z" />
                    </svg>
                </div>

                {/* Editor header */}
                <div class="hpc-editor-bar">
                    <span class="hpc-dot" style="background:#ff6058" />
                    <span class="hpc-dot" style="background:#ffbd2e" />
                    <span class="hpc-dot" style="background:#28ca41" />
                    <span class="hpc-fname">main.rs</span>
                    
                    <div class="ml-auto flex items-center gap-3">
                        <span class="hpc-caption">Live demo — Zenthra in action</span>
                        {/* Play/Compile Button */}
                        <button 
                            id="hpc-play-btn"
                            onClick$={() => {
                                document.dispatchEvent(new CustomEvent("zenthra:compile"));
                            }}
                            class={[
                                "p-1.5 rounded flex items-center justify-center cursor-pointer transition-all duration-150 relative border border-[#28ca41]/30",
                                isPlayButtonHovered.value ? "bg-white/10 text-[#52e06b] scale-105 border-[#28ca41]" : "text-[#28ca41]",
                                isPlayButtonActive.value ? "scale-90" : ""
                            ].join(" ")}
                            title="Compile & Run"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Syntax-highlighted code */}
                <div class="hpc-code">
                    {(() => {
                        let charAccumulator = 0;
                        return CODE_DATA.map((line, lineIdx) => {
                            const lineLength = line.reduce((sum, t) => sum + t.text.length, 0);

                            // Empty line case
                            if (lineLength === 0) {
                                const isCurrentLine = visibleCount.value >= charAccumulator && visibleCount.value < charAccumulator + 2;
                                const isLineVisible = visibleCount.value >= charAccumulator;
                                charAccumulator += 2;
                                return (
                                    <div 
                                        key={lineIdx} 
                                        class="hpc-line hpc-empty" 
                                        style={{ opacity: isLineVisible ? 1 : 0 }}
                                    >
                                        {isCurrentLine && (
                                            <span class="inline-block w-[6.5px] h-4 bg-white animate-[pulse_0.8s_infinite] align-middle" />
                                        )}
                                        &nbsp;
                                    </div>
                                );
                            }

                            const isCurrentLine = visibleCount.value >= charAccumulator && visibleCount.value < charAccumulator + lineLength;
                            const isLineVisible = visibleCount.value >= charAccumulator;

                            let lineCharRendered = 0;
                            const lineTokens = line.map((token, tokenIdx) => {
                                const tokenLength = token.text.length;
                                const tokenStartAbs = charAccumulator + lineCharRendered;
                                lineCharRendered += tokenLength;

                                if (visibleCount.value < tokenStartAbs) {
                                    return null;
                                }

                                const visibleTextLen = Math.min(tokenLength, visibleCount.value - tokenStartAbs);
                                const visibleText = token.text.slice(0, visibleTextLen);

                                return (
                                    <span key={tokenIdx} class={token.className}>
                                        {visibleText}
                                    </span>
                                );
                            });

                            charAccumulator += lineLength + 1; // plus 1 for newline

                            return (
                                <div 
                                    key={lineIdx} 
                                    class="hpc-line" 
                                    style={{ opacity: isLineVisible ? 1 : 0 }}
                                >
                                    {lineTokens}
                                    {isCurrentLine && (
                                        <span class="inline-block w-[6.5px] h-4 bg-white ml-0.5 animate-[pulse_0.8s_infinite] align-middle" />
                                    )}
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>

            {/* Metrics bar — light */}
            <div 
                class={[
                    "hpc-metrics",
                    isFinished.value ? "is-visible" : ""
                ].join(" ")}
            >
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
