<template>
  <NuxtLayout name="app-layout">
    <template v-if="card">
      <TopBar :title="card.name" />

      <!-- card preview -->
      <main class="px-4">
        <SkinsPicker class="rounded-xl overflow-hidden" :card="card" />
      </main>

      <footer class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <ResponsiveContainer class="py-3 flex flex-col items-center justify-center gap-6 w-full">
          <!-- actions -->
          <section class="grid grid-cols-3 gap-3 items-center justify-center w-full px-6">
            <button class="btn__primary col-span-2" @click="isShowBottomSheets = true">
              <i class="fa-solid fa-person-running me-2"></i>
              Insert Activity
            </button>

            <button class="btn__secondary--outline">
              <i class="fa-solid fa-paper-plane me-2"></i>
              Share
            </button>
          </section>
        </ResponsiveContainer>
      </footer>
    </template>

    <!-- bottom sheet for customize -->
    <BottomSheet @closed="isShowBottomSheets = false" :show="isShowBottomSheets" title="Choose Activity">
      <section class="px-3 flex flex-col gap-3">
        <template v-for="activity in athleteStore.activities" :key="activity.id">
          <!-- list -->
          <CardsChooseActivityCard :activity @choosed="[cardStore.setSelectedActivity(activity), isShowBottomSheets = false]" />
        </template>
      </section>
    </BottomSheet>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { CardService } from '~/services/card.service'
import type { Card } from '~/ts/type'

// stores
const cardStore = useCardStore()

// refs
const card = ref<Card>()
const isShowBottomSheets = ref(false)

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

// stores
const athleteStore = useAthleteStore()

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