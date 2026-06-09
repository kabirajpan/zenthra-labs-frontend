import { component$, Slot } from "@builder.io/qwik";

export const UserLayout = component$(() => {
  return (
    <div class="min-h-screen bg-white text-[#1b1b21]">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <h1 class="text-2xl font-bold mb-6">User Dashboard</h1>
        <div class="bg-white rounded-[4px] border p-6">
          <Slot />
        </div>
      </div>
    </div>
  );
});

export default UserLayout;
