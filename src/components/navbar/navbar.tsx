import { component$ } from "@builder.io/qwik";

export const Navbar = component$(() => {
  return (
    <header class="w-full top-0 sticky z-50 bg-[#fbf8ff] border-b border-[#c6c5d3]">
      <nav class="flex justify-between items-center h-16 px-12 max-w-7xl mx-auto">
        <div class="flex items-center gap-12">
          <a class="text-xl font-bold text-[#4352a5] font-['Syne',sans-serif]" href="/">Zenthra Labs</a>
          <div class="hidden md:flex items-center gap-8">
            <a class="text-[#454651] hover:text-[#4352a5] transition-colors font-bold border-b-2 border-[#4352a5] py-4 text-sm" href="/products">Products</a>
            <a class="text-[#454651] hover:text-[#4352a5] transition-colors text-sm" href="/open-source">Open Source</a>
            <a class="text-[#454651] hover:text-[#4352a5] transition-colors text-sm" href="/about">About</a>
            <a class="text-[#454651] hover:text-[#4352a5] transition-colors text-sm" href="/blog">Blog</a>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <a href="/auth/signin" class="px-4 py-1.5 text-[#454651] hover:bg-[#f5f2fa] transition-colors text-sm font-medium rounded-[4px]">Sign In</a>
          <a href="/auth/signup" class="px-4 py-1.5 bg-[#5c6bc0] text-[#f8f6ff] rounded-[4px] hover:brightness-110 transition-all text-sm font-medium">Get Started</a>
        </div>
      </nav>
    </header>
  );
});
