import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const TextBtnDoc = component$(() => {
    const textCode = `ui.text("Welcome to Zenthra")
    .size(24.0)
    .bold()
    .color(Color::rgb(0.9, 0.9, 0.9))
    .monospace()
    .show();`;

    const buttonCode = `if ui.button("Submit Form")
    .width(140.0)
    .bg(Color::rgb(0.2, 0.4, 0.8))
    .hover_bg(Color::rgb(0.25, 0.45, 0.85))
    .radius_all(4.0)
    .show()
    .clicked
{
    // Execute submit actions
}`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Text &amp; Button</h1>
            <p class="text-base text-[#454651] mb-6">
                The <code>Text</code> and <code>Button</code> widgets represent the absolute core interface layers for displaying typographic logs and capturing user click interactions.
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Text Widget</h2>
            <p class="text-sm text-[#454651] mb-4">
                Renders hardware-accelerated text using GPU-uploaded font atlases. Supports inline markdown-like highlights, multi-line paragraph wrapping, custom typography styles, and background card properties.
            </p>

            <CodeBlock code={textCode} language="rust" filename="text.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Typography &amp; Style</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.size(s: f32)</code>:</strong> Sets the font size of the characters in logical pixels.</li>
                <li><strong><code>.color(c: Color)</code>:</strong> Sets the foreground fill color of the text.</li>
                <li><strong><code>.weight(w: FontWeight)</code>:</strong> Binds a custom font weight structure (e.g. <code>FontWeight::Light</code>).</li>
                <li><strong><code>.bold()</code>:</strong> Shortcut builder setting font weight to bold.</li>
                <li><strong><code>.italic()</code>:</strong> Applies italic character skew styles.</li>
                <li><strong><code>.family(f: impl Into&lt;String&gt;)</code>:</strong> Binds a custom system font family name.</li>
                <li><strong><code>.monospace()</code>:</strong> Shortcut configuring system monospace typography.</li>
                <li><strong><code>.line_height(factor: f32)</code>:</strong> Sets line spacing height factor multiplier.</li>
                <li><strong><code>.highlight(color: Color)</code>:</strong> Custom background overlay color for text highlights.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Position &amp; Layout</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.pos(x: f32, y: f32)</code>:</strong> Force-positions text bounds to absolute screen coordinates.</li>
                <li><strong><code>.min_width(w: f32)</code>:</strong> Sets lower boundary width for wrapping.</li>
                <li><strong><code>.max_width(w: f32)</code>:</strong> Sets wrapping trigger boundary width.</li>
                <li><strong><code>.fill_x(enabled: bool)</code>:</strong> Toggle to consume full parent container width.</li>
                <li><strong><code>.align(alignment: Align)</code>:</strong> Aligns paragraph blocks (Left, Center, Right).</li>
                <li><strong><code>.wrap(strategy: TextWrap)</code>:</strong> Text line-wrapping strategy (e.g., <code>TextWrap::Wrap</code>).</li>
                <li><strong><code>.ellipsis(enabled: bool)</code>:</strong> Toggles trailing dots (<code>...</code>) when character bounds overflow.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Background &amp; Box Container</h3>
            <p class="text-sm text-[#454651] mb-3">
                Apply background styling directly onto the text block bounding box:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.bg(color: Color)</code>:</strong> Draws a background color box behind the text.</li>
                <li><strong><code>.padding(t, r, b, l)</code>:</strong> Spacing boundaries inside the background container.</li>
                <li><strong><code>.padding_all(p: f32)</code>:</strong> Uniform padding around the text content.</li>
                <li><strong><code>.margin(t, r, b, l)</code>:</strong> Outer margin offset boundaries to advance cursor position.</li>
                <li><strong><code>.border(color: Color, width: f32)</code>:</strong> Renders outlines with defined logical pixel widths.</li>
                <li><strong><code>.radius_all(r: f32)</code>:</strong> Corner radii settings. Can use specific sides like <code>.radius_top(r)</code>.</li>
                <li><strong><code>.shadow(color, x, y, blur)</code>:</strong> Soft background box drop shadow.</li>
                <li><strong><code>.opacity(o: f32)</code>:</strong> Alpha channel transparency of the entire text element.</li>
            </ul>

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Mouse &amp; Schedule</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-8">
                <li><strong><code>.cursor(c: CursorIcon)</code>:</strong> Custom pointer shapes (Default, Text, Pointer, Crosshair, ColResize).</li>
                <li><strong><code>.render_mode(mode: RenderMode)</code>:</strong> Directs repaint schedules (Static or Continuous).</li>
            </ul>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Button Widget</h2>
            <p class="text-sm text-[#454651] mb-4">
                A click listener container that wraps a label. Tracks hover and clicked state triggers inside immediate mode scopes.
            </p>

            <CodeBlock code={buttonCode} language="rust" filename="button.rs" />

            <h3 class="font-['Syne',sans-serif] font-bold text-sm text-[#4352a5] uppercase tracking-wider mb-3">Button Builder Methods</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong><code>.width(w: f32)</code>:</strong> Fixes logical width layout bounds.</li>
                <li><strong><code>.height(h: f32)</code>:</strong> Fixes logical height layout bounds.</li>
                <li><strong><code>.bg(color: Color)</code>:</strong> Sets default background color.</li>
                <li><strong><code>.hover_bg(color: Color)</code>:</strong> Background color override when mouse is over button.</li>
                <li><strong><code>.active_bg(color: Color)</code>:</strong> Background color override while pressed.</li>
                <li><strong><code>.radius_all(r: f32)</code>:</strong> Uniform roundness of button edges.</li>
                <li><strong><code>.padding_all(p: f32)</code>:</strong> Inner padding offsets surrounding the label.</li>
                <li><strong><code>.on_click(closure)</code>:</strong> Inline callback closure executed when the button is clicked.</li>
            </ul>
        </>
    );
});

export const ImageDoc = component$(() => {
    const imageCode = `ui.image(ImageSource::Path("assets/photo.jpg"))
    .width(200.0)
    .height(200.0)
    .radius(8.0)
    .show();`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Image</h1>
            <p class="text-base text-[#454651] mb-6">
                Highly-optimized asynchronous image rendering widget. Loads image files or memory bytes in the background without blocking the rendering thread.
            </p>
            <CodeBlock code={imageCode} language="rust" filename="image.rs" />
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">ImageSource options</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><code>ImageSource::Path(&amp;str)</code> — Load from host disk path.</li>
                <li><code>ImageSource::Bytes(&amp;[u8])</code> — Load from raw embedded bytes (e.g. <code>include_bytes!</code>).</li>
                <li><code>ImageSource::Thumbnail(&amp;str)</code> — Asynchronous thumbnail generator.</li>
            </ul>
        </>
    );
});

export const IndicatorsDoc = component$(() => {
    const sliderCode = `ui.slider(&mut value, "slider_id").range(0.0, 100.0).show();`;
    const progressCode = `ui.progress_bar(0.65).show();`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Slider &amp; ProgressBar</h1>
            <p class="text-base text-[#454651] mb-6">
                Numeric tracking and progress controls.
            </p>
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Slider</h3>
            <p class="text-sm text-[#454651] mb-4">Allows draggable numeric value selections within a specified minimum and maximum range.</p>
            <CodeBlock code={sliderCode} language="rust" filename="slider.rs" />
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">ProgressBar</h3>
            <p class="text-sm text-[#454651] mb-4">Renders a visual indicator displaying completion progression from <code>0.0</code> to <code>1.0</code>.</p>
            <CodeBlock code={progressCode} language="rust" filename="progress_bar.rs" />
        </>
    );
});
