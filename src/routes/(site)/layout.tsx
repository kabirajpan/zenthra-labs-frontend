import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import AbstractBackground from "../../components/background/abstract-background";

export default component$(() => {
    return (
        <div class="relative min-h-screen">
            <AbstractBackground />
            <div class="relative z-10 bg-[rgba(251,248,255,0.82)] text-[#1b1b21] font-['DM_Sans',sans-serif] antialiased min-h-screen flex flex-col justify-between">
                <Navbar />
                <main class="flex-grow">
                    <Slot />
                </main>
                <Footer />
            </div>
        </div>
    );
});
