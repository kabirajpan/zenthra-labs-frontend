import { component$ } from "@builder.io/qwik";

// Square checks background (tiled) to sit behind page content
export const AbstractBackground = component$(() => {
  return (
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg class="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="checks" width="36" height="36" patternUnits="userSpaceOnUse">
              <rect width="36" height="36" fill="transparent" />
              <rect width="18" height="18" fill="#e8eaf0" />
              <rect x="18" y="18" width="18" height="18" fill="#e8eaf0" />
            </pattern>

            <radialGradient id="light1" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="light2" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#f7f6ff" />
              <stop offset="100%" stopColor="#f7f6ff" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* base background color */}
        <rect width="1440" height="800" fill="#fbf8ff" />

        {/* tiled checks overlay with moderate opacity */}
          <rect width="1440" height="800" fill="url(#checks)" opacity="0.18" />

        {/* an additional soft grid to add depth */}
        <g opacity="0.06">
            <rect x="0" y="0" width="1440" height="800" fill="none" stroke="#e6e6ec" {...{ 'stroke-width': '1' }} />
          </g>

          {/* subtle light spots for white theme visibility */}
          <circle cx="220" cy="140" r="220" fill="url(#light1)" opacity="0.14" />
          <circle cx="1180" cy="640" r="260" fill="url(#light2)" opacity="0.12" />
      </svg>
    </div>
  );
});

export default AbstractBackground;
