import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
});