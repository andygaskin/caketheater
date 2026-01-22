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
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href: "https://use.typekit.net/xok1wfz.css",
      //   },
      // ],
    },
  },
  css: ["primeicons/primeicons.css", "@/assets/css/main.css"],
  nitro: {
    prerender: {
      crawlLinks: true, // *****set to FALSE when deploying non-SSG!! This ensures we don't accidentally prerender content pages******
    },
  },
  // NOTE: This requires Nitro/Node hosting. Do not deploy as pure static (ie npm run generate) if you want /cakes SSR.
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
