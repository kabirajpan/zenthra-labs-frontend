import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/footer";

const MainLayout = component$(() => {
  return (
    <div class="min-h-screen bg-[#fbf8ff] text-[#1b1b21] font-['DM_Sans',sans-serif] antialiased">
      <Navbar />
      <main>
        <Slot />
      </main>
      <Footer />
    </div>
  );
});

export default MainLayout;
