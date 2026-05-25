// https://nuxt.com/docs/api/configuration/nuxt-config
// import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  // modules: ["@primevue/nuxt-module"],
  // primevue: {
  //   options: {
  //     // ripple: true,
  //     theme: {
  //       preset: Aura,
  //     },
  //   },
  // },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // 'out-in' helps prevent layout jumps
    },
  },
  css: ["primeicons/primeicons.css", "@/assets/css/main.css"],
  // NOTE: This requires Nitro/Node hosting. Do not deploy as pure static (ie npm run generate) if we want /cakes SSR.
  routeRules: {
    // SSG ("Static Site Generation" / prerender)
    "/": { prerender: true },
    "/categories/**": { prerender: true },
    "/contact": { prerender: true },
    "/cakes/**": { prerender: true },

    //SWR caching  ("Stale-While-Revalidate", show  cached version for x time until revalidating and serving fresh version)
    // "/cakes/**": { swr: 60 * 5 }, //5 minutes

    // SSR ("Server Side Rendering". For frequently updated content)
    // "/cakes/**": { prerender: false },

    // CSR ("Client Side Rendering")
    // "/admin/**": { ssr: false },
    // "/baker/**": { ssr: false },
  },
});
