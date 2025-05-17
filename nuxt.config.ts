// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    "pinia-plugin-persistedstate",
    "@nuxt/image"
  ],

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      strava: {
        clientId: process.env.NUXT_PUBLIC_STRAVA_CLIENT_ID,
        redirectUri: process.env.NUXT_PUBLIC_STRAVA_REDIRECT_URI,
      }
    },

    strava: {
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
    }
  },

  fonts: {
    families: [
      {
        name: "Plus Jakarta Sans",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal", "italic"],
      },
      {
        name: "Inter",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal", "italic"],
      }
    ]
  },

  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/diundang-digital/image/upload"
    }
  }
})