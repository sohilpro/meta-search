// https://nuxt.com/docs/api/configuration/nuxt-config
import lang from "./lang/language";

export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      // pdfExport: "http://localhost:5000/download",
      pdfExport: "https://ticket-fake.liara.run/download",
    },
  },

  modules: [
    "@morev/vue-transitions/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@samk-dev/nuxt-vcalendar",
    "nuxt-swiper",
    "@vueuse/nuxt",
  ],
  i18n: {
    locales: lang,
    defaultLocale: "en",
    defaultDirection: "ltr",
    lazy: true,
    langDir: "lang",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
});
