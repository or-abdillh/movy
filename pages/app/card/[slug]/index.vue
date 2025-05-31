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

            <button @click="shareCardHandler" class="btn__secondary--outline">
              Export
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
          <CardsChooseActivityCard :activity
            @choosed="[cardStore.setSelectedActivity(activity), isShowBottomSheets = false]" />
        </template>
      </section>
    </BottomSheet>

    <!-- bottom sheet exporting result -->
    <BottomSheet :show="isShowExportingBottomSheets" @closed="closeExportingBottomSheetHandler" title="Exporting Card">
      <!-- state of exporting card -->
      <div class="flex flex-col items-center justify-center py-8" v-if="cardStore.isExporting">
        <i class="fa-solid fa-spinner fa-spin text-3xl text-slate-500 mb-4"></i>
        <span class="text-slate-600 text-lg font-medium">Exporting your card, please wait...</span>
      </div>

      <main>
        <!-- preview of exported card -->
        <section ref="exportedResultEl">
        </section>

        <section v-if="!cardStore.isExporting" class="flex flex-col items-center gap-4 mt-6 px-6 mb-4">
          <button class="btn__primary w-full" @click="downloadExportedCardImage" :disabled="cardStore.isExporting">
            <i class="fa-solid fa-download me-2"></i>
            Download Image
          </button>

          <button class="btn__secondary--outline w-full" @click="shareExportedCardImage"
            :disabled="cardStore.isExporting">
            <i class="fa-solid fa-share-nodes me-2"></i>
            Share
          </button>
        </section>
      </main>
    </BottomSheet>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { CardService } from '~/services/card.service'
import * as htmlToImage from 'html-to-image';
import type { Card } from '~/ts/type'

// stores
const cardStore = useCardStore()

// refs
const card = ref<Card>()
const eportedCardDataUrl = ref<string>()
const exportedResultEl = ref<HTMLElement>()
const isShowBottomSheets = ref(false)
const isShowExportingBottomSheets = ref(false)

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

// handler: set card as exporting
const shareCardHandler = async () => {

  // updated card as exporting
  cardStore.setIsExporting(true)

  // show exporting bottom sheet
  isShowExportingBottomSheets.value = true

  // remove previously exported result
  if (exportedResultEl.value) {
    exportedResultEl.value.innerHTML = ''
  }

  // reset exported card data URL
  eportedCardDataUrl.value = ''

  // get node
  const node = document.querySelector<HTMLElement>("[data-role=card-template]")

  // if node is not found, return
  if (!node) {
    console.error("Card template not found")
    return
  }

  // waiting for the node to be rendered
  await nextTick()

  // convert node to image
  htmlToImage
    .toPng(node)
    .then((dataUrl) => {

      // create image
      const img = new Image()

      // set image source to data URL
      img.src = dataUrl

      // set image class
      img.className = "w-4/12 mx-auto"

      // append image to body
      exportedResultEl.value?.appendChild(img)

      // set exported card data URL
      eportedCardDataUrl.value = dataUrl

      // reset exporting state
      cardStore.setIsExporting(false)
    })
    .catch((err) => {
      console.error('oops, something went wrong!', err)
      alert('Failed to convert card to image. Please try again later.')
    })
}

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

// handler: download exported card image
const downloadExportedCardImage = () => {
  if (!eportedCardDataUrl.value) return

  // create a link element
  const link = document.createElement('a')

  // set link attributes
  link.href = eportedCardDataUrl.value
  link.download = `${card.value?.name || 'exported-card'}.png`

  // append link to the body, trigger click, and remove it
  document.body.appendChild(link)

  // trigger download
  link.click()

  // remove link from the document
  document.body.removeChild(link)
}

// handler: share exported card image
const shareExportedCardImage = async () => {
  if (!eportedCardDataUrl.value) return

  try {
    const response = await fetch(eportedCardDataUrl.value)
    const blob = await response.blob()
    const file = new File([blob], `${card.value?.name || 'exported-card'}.png`, { type: blob.type })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: card.value?.name || 'Exported Card',
        text: 'Check out this card!',
      })
    } else {
      alert('Sharing is not supported on this device/browser.')
    }
  } catch (error) {
    console.error('Failed to share image:', error)
    alert('Failed to share image. Please try again later.')
  }
}

// handler: close bottom sheet
const closeExportingBottomSheetHandler = () => {

  // skip process if card is exporting
  if (cardStore.isExporting) {
    return
  }

  // close bottom sheet
  isShowExportingBottomSheets.value = false

  // reset exported card data URL
  eportedCardDataUrl.value = ''

  // reset exported result element
  if (exportedResultEl.value) {
    exportedResultEl.value.innerHTML = ''
  }
}
</script>