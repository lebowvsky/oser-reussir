export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',

  // srcDir 'app/' est appliqué automatiquement par compatibilityVersion: 4

  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Nunito:wght@300;400;600;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    apiSecret: '',
    apiBaseServer: process.env.NUXT_API_BASE_SERVER ?? 'http://backend:4000',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:4000',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
