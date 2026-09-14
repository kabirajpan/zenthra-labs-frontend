import { component$, useSignal, $ } from "@builder.io/qwik";

export interface CodeBlockProps {
    code: string;
    language?: "rust" | "toml" | "text" | "wgsl";
    filename?: string;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function highlightRust(code: string): string {
    // Escape HTML first for segments not matched by tokens
    const parts: string[] = [];
    let lastIndex = 0;

    // Unified regex for Rust syntax
    const tokenRegex =
        /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(#!?\[[^\]]*\])|(\b(?:fn|pub|use|struct|enum|impl|let|mut|if|else|match|for|while|loop|return|break|continue|move|const|static|type|trait|as|where|in|ref|async|await)\b)|(\b(?:true|false|None|Some|Ok|Err)\b)|(\b(?:u8|u16|u32|u64|usize|i8|i16|i32|i64|isize|f32|f64|bool|char|str|String|Option|Result|Self|self|Ui|App|AppState|Color|Signal|Computed|Effect|ArcSignal|BorderAlignment|Align|FontWeight|CursorIcon|RenderMode|ImageSource|Wrap|TextWrap|DrawCommand|Id|RectDraw|TextDraw|BlurDraw|FloatingWindowBuilder|MenuItemBuilder|Response|BackdropUniforms|Duration)\b)|(\b\d+(?:\.\d+)?(?:f32|f64|u32|u64|usize|i32|i64)?\b)|(\b[a-z_][a-z0-9_]*!)|(\.[a-z_][a-z0-9_]*(?=\s*[(<]))|(\bfn\s+([a-z_][a-z0-9_]*))/g;

    let match: RegExpExecArray | null;
    while ((match = tokenRegex.exec(code)) !== null) {
        // Push preceding plain text (escaped)
        if (match.index > lastIndex) {
            parts.push(escapeHtml(code.slice(lastIndex, match.index)));
        }

        const [
            full,
            comment,
            str,
            attr,
            keyword,
            boolOrEnum,
            typeName,
            number,
            macroName,
            methodCall,
            fnDecl,
            fnName,
        ] = match;

        if (comment) {
            parts.push(`<span class="text-[#6a7b8a] italic">${escapeHtml(comment)}</span>`);
        } else if (str) {
            parts.push(`<span class="text-[#98c379]">${escapeHtml(str)}</span>`);
        } else if (attr) {
            parts.push(`<span class="text-[#e5c07b] font-medium">${escapeHtml(attr)}</span>`);
        } else if (keyword) {
            parts.push(`<span class="text-[#c792ea] font-medium">${escapeHtml(keyword)}</span>`);
        } else if (boolOrEnum) {
            parts.push(`<span class="text-[#d19a66]">${escapeHtml(boolOrEnum)}</span>`);
        } else if (typeName) {
            parts.push(`<span class="text-[#e5c07b]">${escapeHtml(typeName)}</span>`);
        } else if (number) {
            parts.push(`<span class="text-[#d19a66]">${escapeHtml(number)}</span>`);
        } else if (macroName) {
            parts.push(`<span class="text-[#61afef] font-semibold">${escapeHtml(macroName)}</span>`);
        } else if (methodCall) {
            parts.push(`.<span class="text-[#61afef]">${escapeHtml(methodCall.slice(1))}</span>`);
        } else if (fnDecl && fnName) {
            parts.push(`<span class="text-[#c792ea] font-medium">fn</span> <span class="text-[#61afef] font-semibold">${escapeHtml(fnName)}</span>`);
        } else {
            parts.push(escapeHtml(full));
        }

        lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < code.length) {
        parts.push(escapeHtml(code.slice(lastIndex)));
    }

    return parts.join("");
}

function highlightToml(code: string): string {
    const lines = code.split("\n");
    return lines
        .map((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("#")) {
                return `<span class="text-[#6a7b8a] italic">${escapeHtml(line)}</span>`;
            }
            if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
                return `<span class="text-[#e5c07b] font-bold">${escapeHtml(line)}</span>`;
            }
            const eqIndex = line.indexOf("=");
            if (eqIndex !== -1) {
                const key = line.slice(0, eqIndex);
                const val = line.slice(eqIndex + 1);
                return `<span class="text-[#61afef]">${escapeHtml(key)}</span>=<span class="text-[#98c379]">${escapeHtml(val)}</span>`;
            }
            return escapeHtml(line);
        })
        .join("\n");
}

function highlightCode(code: string, language: string): string {
    if (language === "rust" || language === "wgsl") {
        return highlightRust(code);
    }
    if (language === "toml") {
        return highlightToml(code);
    }
    return escapeHtml(code);
}

export const CodeBlock = component$<CodeBlockProps>(({ code, language = "rust", filename }) => {
    const copied = useSignal(false);

    const onCopy$ = $(async () => {
        try {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
                await navigator.clipboard.writeText(code);
                copied.value = true;
                setTimeout(() => {
                    copied.value = false;
                }, 2000);
            }
        } catch { /* clipboard not available */ }
    });

    const displayFilename = filename || (language === "rust" ? "example.rs" : language === "toml" ? "Cargo.toml" : undefined);
    const highlighted = highlightCode(code, language);

    return (
        <div class="rounded-[6px] overflow-hidden shadow-lg border border-white/5 bg-[#071025] mb-6 font-['JetBrains_Mono',monospace]">
            {/* Header bar with mac dots, filename, and copy button */}
            <div class="flex items-center justify-between px-4 py-2.5 bg-[#0b162e] border-b border-white/10 select-none">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ff6058] inline-block opacity-85" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block opacity-85" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#28ca41] inline-block opacity-85" />
                    {displayFilename && (
                        <span class="ml-2 text-[11px] text-[#9aa6e0] font-medium tracking-wide">
                            {displayFilename}
                        </span>
                    )}
                </div>

                <button
                    onClick$={onCopy$}
                    title="Copy code"
                    class="flex items-center gap-1.5 text-[11px] py-1 px-2 rounded-[3px] text-[#9aa6e0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                    {copied.value ? (
                        <>
                            <svg class="w-3.5 h-3.5 text-[#7ee787]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-[#7ee787] font-semibold text-[10px]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2" />
                            </svg>
                            <span class="text-[10px]">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Body */}
            <pre class="p-4 sm:p-5 text-xs text-[#e0e6ed] overflow-x-auto leading-relaxed whitespace-pre font-['JetBrains_Mono',monospace]">
                <code dangerouslySetInnerHTML={highlighted} />
            </pre>
        </div>
    );
});
