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
  ]
})

</script>
