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
    return title ? `${config.public.appName} | ${title}` : config.public.appName
  },
})

</script>
