import { component$ } from "@builder.io/qwik";

export const HeroSquares = component$(() => {
  return (
    <div
      aria-hidden="true"
      class="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      <div class="hero-grid-mesh" />
      <div class="hero-grid-fade" />
    </div>
  );
});

export default HeroSquares;
