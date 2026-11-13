// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@primevue/nuxt-module"],
  primevue: {
    options: {
      // ripple: true,
      // unstyled: true, // Disables default style injection globally
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
          href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap",
        },
      ],
      script: [
        {
          async: true,
          src: "https://www.googletagmanager.com/gtm.js?id=GTM-MKBSJV62",
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // 'out-in' helps prevent layout jumps
    },
  },
  css: ["primeicons/primeicons.css", "@/assets/css/main.css"],
  hooks: {
    "pages:extend"(pages) {
      // Reuse the listing component for each clean pagination/sort URL.
      const categoryPage = pages.find((page) =>
        page.file?.replaceAll("\\", "/").endsWith("/categories/[slug].vue"),
      );
      if (!categoryPage) throw new Error("Category listing route not found");
      for (const [name, path] of [
        ["category-page", "/categories/:slug/page/:page"],
        ["category-latest", "/categories/:slug/latest"],
        ["category-latest-page", "/categories/:slug/latest/page/:page"],
      ] as const) {
        pages.push({ name, path, file: categoryPage.file });
      }
    },
  },
  // Static pages plus browser-rendered categories and cake details.
  routeRules: {
    // SSG ("Static Site Generation" / prerender)
    "/": { prerender: true },
    "/categories/**": { ssr: false, prerender: false },
    "/contact": { prerender: true },
    // Apache serves /200.html for these URLs; the browser fetches the data.
    "/cakes/**": { ssr: false, prerender: false },

    //SWR caching  ("Stale-While-Revalidate", show  cached version for x time until revalidating and serving fresh version)
    // "/cakes/**": { swr: 60 * 5 }, //5 minutes
    // "/categories/**": { swr: 60 * 60 }, //1 hour

    // SSR ("Server Side Rendering". For frequently updated content)
    // "/cakes/**": { prerender: false },

    // CSR ("Client Side Rendering")
    // "/admin/**": { ssr: false },
    // "/baker/**": { ssr: false },
  },
});
