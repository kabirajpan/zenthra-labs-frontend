import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="max-w-7xl mx-auto px-12 py-16">
            <div class="mb-6">
                <h1 class="font-['Syne',sans-serif] text-3xl font-bold text-[#1b1b21]">Domo — Demo App</h1>
                <p class="text-[#454651] mt-2">A small demo exploring interactive data visualizations and live previews.</p>
            </div>

            <div class="bg-white border border-[#c6c5d3] rounded-[6px] p-6">
                <p class="text-[#454651]">This is a placeholder details page for the <strong>Domo</strong> demo. Add screenshots, description, and download links here.</p>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: "Domo — Demo App | Zenthra Labs",
    meta: [{ name: "description", content: "Domo demo: interactive visualizations and live previews." }],
};
