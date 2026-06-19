import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import AbstractBackground from "../../components/background/abstract-background";

export default component$(() => {
    return (
        <div class="relative min-h-screen overflow-hidden">
            <AbstractBackground />
            <div class="relative z-10 bg-[rgba(251,248,255,0.82)] text-[#1b1b21] font-['DM_Sans',sans-serif] antialiased">
                <Navbar />
                <main>
                    <Slot />
                </main>
                <Footer />
            </div>
        </div>
    );
});
