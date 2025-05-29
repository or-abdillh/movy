<template>
  <NuxtLayout name="app-layout">
    <TopBar v-if="style" :title="style.name" />

    <template v-if="style">
      <ResponsiveContainer class="px-5 mt-5">
        <header>
          <span class="text-slate-800 font-semibold">About</span>
          <p class="text-slate-600 border-s-2 border-primary-600 ps-2 mt-2">{{ style.description }}</p>
        </header>

        <!-- list of all cards -->
        <section class="grid grid-cols-2 gap-5 mt-8">
          <template v-for="card in cards" :key="card.id">
            <!-- card -->
            <div @click="navigateTo({ name: 'app.card.show', params: { slug: card.slug } })"
              class="cursor-pointer relative hover:-translate-y-2 hover:-rotate-1 duration-200 col-span-1 grid place-items-center rounded-lg overflow-hidden">
              <!-- thumbnail -->
              <img :src="card.thumbnail" alt="Movy" class="w-full">

              <!-- name -->
              <div
                class="absolute text-sm text-white font-medium left-0 bottom-0 right-0 bg-slate-900 p-3 bg-opacity-20 backdrop-blur text-center">
                {{ card.name }}
              </div>
            </div>
          </template>
        </section>
      </ResponsiveContainer>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>

import { StyleService } from '~/services/style.service'
import type { Card, Style } from '~/ts/type'

definePageMeta({
  name: "app.style.show"
})

// refs
const style = ref<Style>()
const cards = ref<Card[]>()

useHead({
  title() {
    return style.value?.name
  },
})

// services
const styleService = new StyleService()

// composables
const route = useRoute()

// computeds
const slug = computed(() => route.params.slug as string)

// hooks
onMounted(async () => {

  // get style
  style.value = await styleService.getStyle(slug.value)

  // redirect if not found
  if (!style.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Style not found',
      fatal: true,
    })
  }

  // get cards
  cards.value = await styleService.getCards(style.value)
})

</script>