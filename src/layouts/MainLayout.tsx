import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/footer";
import AbstractBackground from "../components/background/abstract-background";

const MainLayout = component$(() => {
  return (
    <div class="relative min-h-screen overflow-hidden">
      <AbstractBackground />
      <div class="relative z-10 bg-theme-bg/85 text-theme-primary font-['DM_Sans',sans-serif] antialiased min-h-screen flex flex-col justify-between transition-colors duration-200">
        <Navbar />
        <main>
          <Slot />
        </main>
        <Footer />
      </div>
    </div>
  );
});

export default MainLayout;
