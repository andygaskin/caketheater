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
    // SSG ("Static Site Generation" / prerender)
    "/": { prerender: true },
    "/categories/**": { prerender: true },
    "/contact": { prerender: true },

    //SWR caching  ("Stale-While-Revalidate", show  cached version for x time until revalidating and serving fresh version)
    "/cakes/**": { swr: 60 * 5 }, //5 minutes

    // SSR ("Server Side Rendering". For frequently updated content)
    // "/cakes/**": { prerender: false },

    // CSR ("Client Side Rendering")
    "/admin/**": { ssr: false },
    "/baker/**": { ssr: false },
  },
});
