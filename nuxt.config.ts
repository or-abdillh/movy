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
    "@nuxt/image",
    "@formkit/auto-animate",
    "@vueuse/nuxt"
  ],

  runtimeConfig: {
    public: {
      app: {
        name: process.env.NUXT_PUBLIC_APP_NAME,
        url: process.env.NUXT_PUBLIC_APP_URL,
      },
      strava: {
        clientId: process.env.NUXT_PUBLIC_STRAVA_CLIENT_ID,
        redirectUri: process.env.NUXT_PUBLIC_STRAVA_REDIRECT_URI,
      },
      vercel: {
        blob: {
          endpoint: process.env.NUXT_PUBLIC_VERCEL_BLOB_ENDPOINT,
        }
      },
      imageKit: {
        endpoint: process.env.NUXT_PUBLIC_IMAGEKIT_ENDPOINT
      }
    },

    strava: {
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
    },

    cloudinary: {
      url: process.env.CLOUDINARY_URL,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
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