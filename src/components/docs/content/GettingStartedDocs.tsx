import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const IntroDoc = component$(() => {
    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Introduction</h1>
            <p class="text-base text-[#454651] mb-6">
                Welcome to <strong>Zenthra</strong>, a high-performance, design-first, immediate-mode UI framework written in Rust. Zenthra compiles your user interface code down to a flat sequence of WGPU draw calls, offering extreme speed and control.
            </p>
            <div class="border-l-4 border-[#5c6bc0] bg-[#f5f2fa] p-4 rounded-r-[4px] mb-8 font-['JetBrains_Mono',monospace] text-xs text-[#4352a5]">
                // 4ms Input Latency · Zero-Runtime Overhead · Linux, macOS, and Windows.
            </div>
            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">Why Zenthra?</h2>
            <p class="text-sm text-[#454651] mb-4">
                Modern GUI toolkits carry massive performance overhead due to browser engines (Webviews) or heavy reactive lifecycle managers. Zenthra compiles down to pure, native code with direct access to GPU pipelines, allowing you to draw smooth animations, frosted glass, and custom shaders at a constant 60+ FPS.
            </p>
        </>
    );
});

export const HelloWorldDoc = component$(() => {
    const cargoToml = `[dependencies]
zenthra = "0.1.2"`;

    const mainRs = `use zenthra::prelude::*;

fn main() {
    App::new()
        .title("My App")
        .size(800, 600)
        .with_ui(|ui| {
            ui.container()
                .fill()
                .show(|ui| {
                    ui.text("Hello Zenthra!").show();
                });
        })
        .run();
}`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Hello World</h1>
            <p class="text-base text-[#454651] mb-6">
                To start a new project with Zenthra, initialize a new Cargo project and add <code>zenthra</code> to your dependencies:
            </p>
            <CodeBlock code={cargoToml} language="toml" filename="Cargo.toml" />
            <p class="text-sm text-[#454651] mb-4">
                Then, replace the contents of <code>src/main.rs</code> with the following:
            </p>
            <CodeBlock code={mainRs} language="rust" filename="src/main.rs" />
        </>
    );
});
