import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  adapter: netlify(),
  integrations: [partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })],
});