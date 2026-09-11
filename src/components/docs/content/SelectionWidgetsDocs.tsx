import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "../CodeBlock";

export const InputsDoc = component$(() => {
    const inputCode = `ui.input(&mut input_str).placeholder("Enter text...").show();`;
    const textAreaCode = `ui.text_area(&mut text_str).height(200.0).show();`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Inputs &amp; TextAreas</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra handles interactive text inputs using mutable string references:
            </p>
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Input (Single Line)</h3>
            <CodeBlock code={inputCode} language="rust" filename="input.rs" />
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">TextArea (Multi Line)</h3>
            <CodeBlock code={textAreaCode} language="rust" filename="text_area.rs" />
        </>
    );
});

export const SelectionDoc = component$(() => {
    const checkboxCode = `ui.checkbox(&mut is_checked, "Remember Me").show();`;
    const toggleCode = `ui.toggle(&mut enable_mode).label("Enable Accelerator").show();`;
    const radioCode = `ui.radio(active_index == 1, "Choice 1").show();`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Checkbox, Switch &amp; Radio</h1>
            <p class="text-base text-[#454651] mb-6">
                Selection controls representing boolean options.
            </p>
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Checkbox</h3>
            <CodeBlock code={checkboxCode} language="rust" filename="checkbox.rs" />
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Toggle Switch</h3>
            <CodeBlock code={toggleCode} language="rust" filename="toggle.rs" />
            <h3 class="font-['Syne',sans-serif] font-bold text-lg text-[#1b1b21] mb-2">Radio Button</h3>
            <CodeBlock code={radioCode} language="rust" filename="radio.rs" />
        </>
    );
});

export const MenusDoc = component$(() => {
    const menuBarCode = `ui.menu_bar().show(|ui| {
    ui.menu("File").show(|ui| {
        if ui.menu_item("New Document").shortcut("Ctrl+N").show().clicked {
            // Handle new document
        }
        if ui.menu_item("Save").shortcut("Ctrl+S").show().clicked {
            // Handle save
        }
    });

    ui.menu("Edit").show(|ui| {
        ui.menu_item("Cut").shortcut("Ctrl+X").show();
        ui.menu_item("Copy").shortcut("Ctrl+C").show();
    });
});`;

    const subMenuCode = `ui.menu("Preferences").show(|ui| {
    // Submenu 1: Theme selection
    ui.sub_menu("Theme").show(|ui| {
        if ui.menu_item("● Dark").show().clicked {
            state.dark_theme = true;
            ui.request_redraw();
        }
        if ui.menu_item("  Light").show().clicked {
            state.dark_theme = false;
            ui.request_redraw();
        }

        // Nested Submenu 2: Accent Color choices
        ui.sub_menu("Accent Color").show(|ui| {
            if ui.menu_item("Sapphire").show().clicked {
                state.accent = Color::rgb(0.2, 0.5, 0.9);
                ui.request_redraw();
            }
            if ui.menu_item("Emerald").show().clicked {
                state.accent = Color::rgb(0.1, 0.8, 0.4);
                ui.request_redraw();
            }
        });
    });
});`;

    const lightDismissCode = `// At start of title bar frame: reset hover flag
let hover_flag_key = Id::from_u64(999999902);
ui.interaction_state.insert(hover_flag_key, 0.0);

// ... render title bar and menus ...

// At end of title bar frame: light dismiss on click outside
let active_menu_key = Id(999999900);
let active_submenu_key = Id(999999901);
let active_id = ui.interaction_state.get(&active_menu_key).copied().unwrap_or(0.0);
let is_hovered = ui.interaction_state.get(&hover_flag_key).copied().unwrap_or(0.0) > 0.5;

if active_id != 0.0 && ui.clicked && !is_hovered {
    ui.interaction_state.insert(active_menu_key, 0.0);
    ui.interaction_state.insert(active_submenu_key, 0.0);
    ui.request_redraw();
}`;

    const dropdownCode = `let options = &["Balanced Power", "High Performance", "Battery Saver"];
ui.dropdown(&mut selected_index, options).show();`;

    return (
        <>
            <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21] mb-6">Menu, Submenu &amp; Dropdown</h1>
            <p class="text-base text-[#454651] mb-6">
                Zenthra provides a hierarchical, hardware-accelerated menu system tailored for desktop applications and productivity tools. It includes full horizontal menu bars (<code>ui.menu_bar()</code>), individual dropdown menus (<code>ui.menu()</code>), shortcut-enabled action items (<code>ui.menu_item()</code>), cascading nested submenus (<code>ui.sub_menu()</code>), and standard form dropdowns (<code>ui.dropdown()</code>).
            </p>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">1. Menu Bar Container (<code>ui.menu_bar()</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                The <code>menu_bar()</code> container creates a full-width horizontal navigation strip at the top of your workspace or window. It automatically tracks open menu state and provides built-in <strong>light-dismissal</strong> (closing popups when clicking anywhere outside) and <strong>fluid hover-switching</strong> between sibling menus once an initial menu has been opened:
            </p>

            <CodeBlock code={menuBarCode} language="rust" filename="menu_bar.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">2. Menu Item Actions &amp; State Indicators</h2>
            <p class="text-sm text-[#454651] mb-4">
                <code>MenuItemBuilder</code> renders clickable list rows inside a menu popup. It returns a <code>Response</code> struct containing <code>.clicked</code> and <code>.hovered</code> flags.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">.shortcut(&amp;str)</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        Draws a muted, right-aligned keyboard shortcut pill (e.g. <code>Ctrl+Shift+P</code>, <code>F2</code>, <code>Del</code>) that aligns neatly across all items in the popup.
                    </p>
                </div>
                <div class="border border-[#c6c5d3] p-4 rounded-[6px] bg-white">
                    <div class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#4352a5] mb-2">Radio / Checkmark Markers</div>
                    <p class="text-xs text-[#454651] leading-relaxed">
                        For mutually exclusive choices (such as theme selection or view modes), prefix the label with <code>"● "</code> when active or <code>"  "</code> when inactive.
                    </p>
                </div>
            </div>

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">3. Cascading Submenus (<code>ui.sub_menu()</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                Zenthra includes support for nested submenus using <code>ui.sub_menu(label).show(|ui| ...)</code>. Submenus are built with desktop ergonomics:
            </p>

            <ul class="list-disc pl-5 space-y-2 text-sm text-[#454651] mb-6">
                <li><strong>Click-to-Toggle Opening:</strong> Submenus trigger cleanly on click rather than precarious hover delays, preventing accidental triggers when moving across dense menu hierarchies.</li>
                <li><strong>Right Chevron Indicator:</strong> Automatically renders a right arrow chevron (<code>NF_FA_CHEVRON_RIGHT</code>) on the right edge of the parent item.</li>
                <li><strong>Horizontal Overlay Positioning:</strong> Positions the nested popup immediately adjacent to the parent menu bounds (offset by <code>262.0px</code>) while matching the vertical line height.</li>
                <li><strong>Clipped Viewport Bypass:</strong> Submenu overlay popups explicitly disable bounding viewport clipping (<code>.clip(false)</code>) so deep cascading trees render seamlessly beyond the parent menu boundaries.</li>
            </ul>

            <CodeBlock code={subMenuCode} language="rust" filename="sub_menus.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">4. Standalone Title Bar Menus (Without MenuBar Wrapper)</h2>
            <p class="text-sm text-[#454651] mb-4">
                When building custom title bars, menus are often placed directly alongside brand icons and window controls inside a single title bar container rather than inside an isolated <code>menu_bar()</code> wrapper. In this setup, simply add the standard light-dismissal check at the end of your title bar drawing function:
            </p>

            <CodeBlock code={lightDismissCode} language="rust" filename="light_dismiss.rs" />

            <h2 class="font-['Syne',sans-serif] text-xl font-bold text-[#1b1b21] mb-4">5. In-Form Selection Dropdown (<code>ui.dropdown()</code>)</h2>
            <p class="text-sm text-[#454651] mb-4">
                For form controls, settings panes, and modals, use <code>ui.dropdown()</code> to let users pick from a list of options:
            </p>

            <CodeBlock code={dropdownCode} language="rust" filename="dropdown.rs" />
        </>
    );
});
