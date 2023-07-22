/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        mono: ["var(--font-spacemono)"],
      },

      backgroundColor: {
        "gradient-blur":
          "radial-gradient(71.86% 50% at 50% 0%,rgba(168,127,255,.04) 0%,rgba(168,127,255,0) 100%),rgba(4,1,21,.1)",
      },
      backgroundImage: {
        "gradient-glow":
          "radial-gradient(190.82% 190.82% at 50% 100%, rgb(15 254 150) 0%, rgb(64 168 109 / 62%) 18.09%);",
        "image-gradient-glow":
          "radial-gradient(202.04% 202.04% at 50% 94.22%, rgba(255, 254, 241, 0.4) 0%, rgba(171, 171, 171, 0.4) 40.95%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        emphasis: "#111827",
        subtle: "#6B7280",
        muted: "#9CA3AF",

        error: "#752522",
      },
    },
  },
  plugins: [],
};
