<template>
  <SkinsPicker v-if="card" :card="card" />
</template>

<script lang="ts" setup>
import { CardService } from '~/services/card.service'
import type { Card } from '~/ts/type'

// refs
const card = ref<Card>()

definePageMeta({
  name: "app.card.preview"
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