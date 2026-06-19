import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="w-full border-t border-[#c6c5d3] bg-[#fbf8ff]">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center py-16 px-6 md:px-12 max-w-7xl mx-auto gap-10">
        <div class="space-y-4">
          <a class="font-['Syne',sans-serif] text-xl font-bold text-[#4352a5] block" href="/">Zenthra Labs</a>
          <p class="text-[#454651] max-w-xs text-sm leading-relaxed">Forging the next generation of industrial-grade software infrastructure.</p>
          <p class="text-xs text-[#767683] pt-4">Made with ❤️ in India 🇮🇳 <br/> © 2026 Zenthra Labs.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-10 w-full md:w-auto">
          <div>
            <h4 class="font-bold text-[#1b1b21] mb-4 text-sm">Navigation</h4>
            <ul class="space-y-2 text-[#454651] text-sm">
              <li><a class="hover:text-[#4352a5] transition-colors" href="/products">Products</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/download">Download</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/open-source">Open Source</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/about">About</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/blog">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#1b1b21] mb-4 text-sm">Legal</h4>
            <ul class="space-y-2 text-[#454651] text-sm">
              <li><a class="hover:text-[#4352a5] transition-colors" href="/legal/privacy">Privacy</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/legal/terms">Terms</a></li>
              <li><a class="hover:text-[#4352a5] transition-colors" href="/legal/licenses">Licenses</a></li>
            </ul>
          </div>
          <div class="col-span-2 md:col-span-1">
            <h4 class="font-bold text-[#1b1b21] mb-4 text-sm">Subscribe</h4>
              <div class="flex border border-[#c6c5d3] rounded-[4px] overflow-hidden">
                <input class="bg-[#fbf8ff] text-sm p-2.5 w-full outline-none text-[#1b1b21] placeholder:text-[#767683]" placeholder="email@domain.com" type="email"/>
                <button class="bg-[#5c6bc0] text-white px-3 py-1.5 rounded-[4px] hover:brightness-110 transition-all">→</button>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
