<template>
  <NuxtLayout name="app-layout">
    <template v-if="card">
      <TopBar :title="card.name" />

      <!-- card preview -->
      <main class="px-5">
        <SkinsPicker class="rounded-xl overflow-hidden" :card="card" />
      </main>

      <footer class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <ResponsiveContainer class="py-3 flex flex-col items-center justify-center gap-6 w-full">
          <!-- actions -->
          <section class="flex gap-3 items-center justify-center w-full">
            <ButtonsPrimary>
              <i class="fa-solid fa-paintbrush me-2"></i>
              Customize
            </ButtonsPrimary>
  
            <ButtonsPrimary @click="navigateTo({ name: 'app.card.preview', params: { slug: card.slug } })" variant="outline">
              <i class="fa-solid fa-expand me-2"></i>
              Preview
            </ButtonsPrimary>
          </section>
        </ResponsiveContainer>
      </footer>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { CardService } from '~/services/card.service'
import type { Card } from '~/ts/type'

// refs
const card = ref<Card>()

definePageMeta({
  name: "app.card.show"
})

useHead({
  title() {
    return card.value?.name
  },
})

// services
const cardService = new CardService()

// computed
const slug = computed(() => {
  return useRoute().params.slug as string
})

// hooks
onMounted(async () => {

  // get card by slug
  await getCardHandler(slug.value)
})

// watchers
watch(
  () => slug.value,
  async (slugCard) => {

    // refetch card by slug
    await getCardHandler(slugCard)
  }
)

// handler: get card by slug
const getCardHandler = async (slugCard: string) => {

  // get card by slug
  card.value = await cardService.getCardBySlug(slugCard)

  // redirect if not found
  if (!card.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Card not found',
      fatal: true,
    })
  }
}
</script>