import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="w-full border-t border-[#c6c5d3] dark:border-[#1e2230] bg-[#fbf8ff] dark:bg-[#07080d] transition-colors duration-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center py-16 px-6 md:px-12 max-w-7xl mx-auto gap-10">
        <div class="space-y-4">
          <a class="font-['Syne',sans-serif] text-xl font-bold text-[#4352a5] dark:text-white hover:text-[#5c6bc0] dark:hover:text-[#818cf8] transition-colors block" href="/">ZenthraLabs</a>
          <p class="text-[#454651] dark:text-[#94a3b8] max-w-xs text-sm leading-relaxed">Forging the next generation of industrial-grade software infrastructure.</p>
          <p class="text-xs text-[#767683] dark:text-[#64748b] pt-4">© 2026 ZenthraLabs.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-10 w-full md:w-auto">
          <div>
            <h4 class="font-bold text-[#1b1b21] dark:text-white mb-4 text-sm">Navigation</h4>
            <ul class="space-y-2 text-[#454651] dark:text-[#94a3b8] text-sm">
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/products">Products</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/download">Download</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/open-source">Open Source</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/about">About</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/blog">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#1b1b21] dark:text-white mb-4 text-sm">Legal</h4>
            <ul class="space-y-2 text-[#454651] dark:text-[#94a3b8] text-sm">
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/legal/privacy">Privacy</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/legal/terms">Terms</a></li>
              <li><a class="hover:text-[#4352a5] dark:hover:text-[#818cf8] transition-colors" href="/legal/licenses">Licenses</a></li>
            </ul>
          </div>
          <div class="col-span-2 md:col-span-1">
            <h4 class="font-bold text-[#1b1b21] dark:text-white mb-4 text-sm">Subscribe</h4>
              <div class="flex border border-[#c6c5d3] dark:border-[#1e2230] rounded-[4px] overflow-hidden bg-white dark:bg-[#0e1017]">
                <input class="bg-transparent text-sm p-2.5 w-full outline-none text-[#1b1b21] dark:text-[#e2e8f0] placeholder:text-[#767683] dark:placeholder:text-[#64748b]" placeholder="email@domain.com" type="email"/>
                <button class="bg-[#5c6bc0] hover:bg-[#4d5cb0] text-white px-3.5 py-1.5 transition-all">→</button>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
