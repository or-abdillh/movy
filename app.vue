<template>
  <VitePwaManifest />
  <NuxtPage />
</template>

<script setup lang="ts">

import { useRuntimeConfig } from '#app';

// composable
const config = useRuntimeConfig();

// default title
useHead({
  titleTemplate(title) {
    return title ? `${config.public.app.name} | ${title}` : config.public.app.name
  },
  script: [
    {
      src: "https://kit.fontawesome.com/b026c11a83.js",
      crossorigin: "anonymous",
    }
  ],
  meta: [
    { name: "title", content: "Movy – Create & Share Stunning Workout Cards" },
    { name: "description", content: "Movy is a modern platform to design, customize, and share stylish workout cards. Choose from various visual styles, personalize stats, and export with ease." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.movy.app/" },
    { property: "og:title", content: "Movy – Create & Share Stunning Workout Cards" },
    { property: "og:description", content: "Customize your fitness visuals with Movy. Choose your style, personalize your data, and export a card that fits your vibe." },
    { property: "og:image", content: "https://www.movy.app/og-cover.jpg" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: "https://www.movy.app/" },
    { property: "twitter:title", content: "Movy – Create & Share Stunning Workout Cards" },
    { property: "twitter:description", content: "Build and share personalized workout cards using sleek templates, vibrant styles, and real-time export features." },
    { property: "twitter:image", content: "https://www.movy.app/og-cover.jpg" },
    { name: "robots", content: "index, follow" },
    { name: "keywords", content: "movy, workout cards, fitness design, exercise visuals, card generator, gym stats, export fitness card, fitness design templates, gym social share, fitness tracker visual" },
    { name: "author", content: "Movy Team" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" }
  ],
  link: [
    { rel: "canonical", href: "https://www.movy.app/" }
  ]
})

</script>
