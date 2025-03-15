import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import netlify from "@astrojs/netlify";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: netlify(),
  integrations: [
    partytown({
        config: {
          forward: ["dataLayer.push"],
        },
    }),
],
});