// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      // ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  css: ["primeicons/primeicons.css"],
  nitro: {
    prerender: {
      crawlLinks: false, // don't accidentally prerender content
    },
  },
  // NOTE: This requires Nitro/Node hosting. Do not deploy as pure static if you want /cakes SSR.
  routeRules: {
    // SSG / prerender
    "/": { prerender: true },
    "/categories/**": { prerender: true },

    "/contact": { prerender: true },
    // "/about": { prerender: true },

    // SSR (frequently updated)
    // "/cakes/**": { prerender: false },

    //SWR caching  (Stale-While-Revalidate)
    "/cakes/**": { swr: 60 * 5 }, //5 minutes

    // CSR (app/admin)
    "/admin/**": { ssr: false },
    "/baker/**": { ssr: false },
  },
});
