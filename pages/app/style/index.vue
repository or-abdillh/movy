<template>
  <NuxtLayout name="app-layout">
    <ResponsiveContainer class="px-5 mt-8 lg:mt-0">
      <header class="mb-8">
        <h1 class="text-slate-700 text-3xl font-semibold border-s-primary-600 border-s-4 ps-3 mb-4">Styles</h1>
        <p class="text-slate-500 mt-2">
          Browse all the style categories we offer on this page. Discover a variety of styles to suit your preferences.
        </p>
      </header>

      <!-- list styles -->
      <section class="grid grid-cols-2 gap-5">
        <template v-for="style in styles" :key="style.id">
          <!-- style -->
          <div @click="navigateTo({ name: 'app.style.show', params: { slug: style.slug } })"
            class="cursor-pointer hover:-translate-y-2 hover:-rotate-1 duration-200 col-span-1 flex flex-col justify-between gap-12 bg-gradient-to-br from-secondary-200 to-secondary-50 rounded-lg p-4">
            <header class="flex justify-between items-center text-slate-900">
              <span class="text-sm font-semibold">{{ style.name }}</span>
              <i class="fa-solid fa-chevron-right"></i>
            </header>

            <!-- album -->
            <div class="flex justify-end relative">
              <img :src="style.cover"
                class="size-20 lg:size-32 rounded translate-x-10 lg:translate-x-28 -translate-y-1" />
              <span class="size-20 lg:size-32 rounded bg-slate-800"></span>
            </div>
          </div>
        </template>
      </section>
    </ResponsiveContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { StyleService } from '~/services/style.service';
import type { Style } from '~/ts/type';

definePageMeta({
  name: "app.style.index",
})

useHead({
  title: "Styles",
})

// services
const styleService = new StyleService()

// states
const styles = ref<Style[]>([])

// hook
onMounted(async () => {

  // get styles
  styles.value = await styleService.getStyles()
})

</script>