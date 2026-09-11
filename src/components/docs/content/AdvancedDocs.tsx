import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const CustomShadersDoc = component$(() => {
    const shaderCode = `App::new()
    .register_custom_shader("wave", include_str!("wave.wgsl"))
    .with_ui(|ui| {
        ui.container()
            .post_process_shader("wave")
            .show(|ui| { ... });
    })`;

    const uniformsCode = `struct BackdropUniforms {
    radius: vec4<f32>,
    rect_pos: vec2<f32>,
    rect_size: vec2<f32>,
    screen_size: vec2<f32>,
    time: f32,
}`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Custom WGSL Shaders</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra allows developer-written WGSL fragment shaders to be dynamically loaded onto layout containers. Use the <code>.register_custom_shader()</code> API on window start:
            </p>
            <CodeBlock code={shaderCode} language="rust" filename="main.rs" />
            <p class="text-sm text-[#454651] mb-4">
                Custom post-processors receive a <code>BackdropUniforms</code> block containing layout metrics and elapsed timeline values:
            </p>
            <CodeBlock code={uniformsCode} language="wgsl" filename="uniforms.wgsl" />
        </>
    );
});

export const CompositorBlurDoc = component$(() => {
    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Wayland / X11 Compositor Blur</h1>
            <p class="text-base text-[#454651] mb-6">
                To enable hardware blurred window backgrounds automatically under Linux compositors, Zenthra supports native background request protocols:
            </p>
            <ul class="list-disc pl-5 space-y-3 text-sm text-[#454651] mb-8">
                <li><strong>KDE Plasma (Wayland/X11):</strong> Communicates with KWin using the <code>org_kde_kwin_blur</code> protocol extension and interning <code>_KDE_NET_WM_BLUR_BEHIND_REGION</code> window flags.</li>
                <li><strong>GNOME (Wayland):</strong> Standard background blur requests are sent to Mutter compositors requesting background effect shaders.</li>
            </ul>
        </>
    );
});
