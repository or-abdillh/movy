<template>
  <!-- tools -->
  <section
    class="absolute top-0 right-0 flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-bl-2xl px-4 py-2">

    <!-- tools: change cover -->
    <label for="cover" :class="{ 'animate-pulse': isUploading }"
      class="size-8 cursor-pointer bg-primary-600/60 backdrop-blur-sm rounded-full grid place-items-center">
      <span v-if="isUploading" class="relative inline-block w-6 h-6">
        <svg class="absolute top-0 left-0" viewBox="0 0 32 32" width="24" height="24">
          <circle class="text-orange-200/30" cx="16" cy="16" r="14" fill="none" stroke="currentColor"
            stroke-width="4" />
          <circle class="text-orange-500" cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="4"
            :stroke-dasharray="2 * Math.PI * 14" :stroke-dashoffset="2 * Math.PI * 14 * (1 - progress.percentage / 100)"
            stroke-linecap="round" style="transition: stroke-dashoffset 0.3s;" />
        </svg>
      </span>
      <i v-else class="fa-solid fa-camera-rotate text-sm text-slate-200"></i>
    </label>

    <!-- tool: edit activity -->
    <button @click="isShowBottomSheet = true" :disabled="!activityModel"
      class="size-8 cursor-pointer bg-primary-600/60 backdrop-blur-sm rounded-full grid place-items-center">
      <i class="fa-solid fa-pencil text-slate-200 text-sm"></i>
    </button>
    
    <!-- tool: preview -->
    <button v-if="$router.currentRoute.value.name !== 'app.card.preview'" @click="navigateTo({ name: 'app.card.preview', params: { slug: slug } })"
      class="size-8 cursor-pointer bg-primary-600/60 backdrop-blur-sm rounded-full grid place-items-center">
      <i class="fa-solid fa-expand text-slate-200 text-sm"></i>
    </button>

    <!-- field input file -->
    <input v-if="!isUploading" @change="handlePictureUpload" class="hidden" type="file" id="cover" accept="image/*">
  </section>

  <!-- bottom sheet: more edit activity -->
  <BottomSheet title="Edit This Activity" :show="isShowBottomSheet" @closed="isShowBottomSheet = false">
    <form v-if="activityModel" class="px-6 pb-8 flex flex-col gap-6">

      <!-- name  -->
      <InputsText label="Actiivty Title" v-model="activityModel.name" :placeholder="cardStore.selectedActivity?.name || 'new activity'" />

      <!-- other stats -->
      <section class="grid grid-cols-5">
        <div class="col-span-3 flex flex-col gap-6">
          <!-- time -->
          <div>
            <label class="block mb-3 text-sm font-semibold text-slate-900 capitalize">Duration (Moving Time)</label>
            <div class="flex items-center -translate-x-4">
              <!-- decrement -->
              <button type="button" :disabled="activityModel.moving_time <= 1" @click="activityModel.moving_time -= 1"
                class="size-8 active:scale-90 duration-200 disabled:bg-opacity-50 bg-slate-800 translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-minus"></i>
              </button>

              <input readonly type="text"
                class="text-xl w-7/12 bg-slate-100/50 px-1 py-1  text-center font-semibold text-slate-800"
                :value="moment.utc(activityModel.moving_time * 1000 || 100000).format('HH:mm:ss')">

              <!-- increment -->
              <button type="button" @click="activityModel.moving_time += 1"
                class="size-8 bg-slate-800 active:scale-90 duration-200 disabled:bg-opacity-50 -translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- distance -->
          <div>
            <label class="block mb-3 text-sm font-semibold text-slate-900 capitalize">Distance (In Kilometers)</label>
            <div class="flex items-center -translate-x-4">
              <!-- decrement -->
              <button :disabled="activityModel.distance <= 100" type="button" @click="activityModel.distance -= 100"
                class="size-8 active:scale-90 duration-200 disabled:bg-opacity-50 bg-slate-800 translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-minus"></i>
              </button>

              <input readonly type="text"
                class="text-xl w-7/12 bg-slate-100/50 px-1 py-1  text-center font-semibold text-slate-800"
                :value="`${(activityModel.distance / 1000 || 10).toFixed(1)} Km`">

              <!-- increment -->
              <button type="button" @click="activityModel.distance += 100"
                class="size-8 bg-slate-800 active:scale-90 disabled:bg-opacity-50 duration-200 -translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- heart rate -->
          <div v-if="activityModel.average_heartrate">
            <label class="block mb-3 text-sm font-semibold text-slate-900 capitalize">Hear Rate (Average)</label>
            <div class="flex items-center -translate-x-4">
              <!-- decrement -->
              <button :disabled="activityModel.average_heartrate <= 0" type="button" @click="activityModel.average_heartrate -= 1"
                class="size-8 active:scale-90 duration-200 disabled:bg-opacity-50 bg-slate-800 translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-minus"></i>
              </button>

              <input readonly type="text"
                class="text-xl w-7/12 bg-slate-100/50 px-1 py-1  text-center font-semibold text-slate-800"
                :value="`${activityModel.average_heartrate.toFixed() ?? 149} BPM`">

              <!-- increment -->
              <button type="button" :disabled="activityModel.average_heartrate >= 219" @click="activityModel.average_heartrate += 1"
                class="size-8 bg-slate-800 active:scale-90 disabled:bg-opacity-50 duration-200 -translate-x-1/4 shadow backdrop-blur-sm rounded-full grid place-items-center text-white">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- pace -->
        <div
          class="col-span-2 p-4 bg-slate-100/50 border border-slate-100 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 text-center">
          <p class="font-semibold text-slate-900">Pace</p>
          <p class="text-xl font-bold text-slate-900">
            {{ activityModel.distance && activityModel.moving_time
              ? paceCounter(activityModel)
              : '05:00' }} /km
          </p>
        </div>
      </section>

    </form>
  </BottomSheet>
</template>

<script lang="ts" setup>

import moment from 'moment';
import { useElementSize } from '@vueuse/core'
import { paceCounter } from '~/utils/pace-counter.util';
import type { Activity } from '~/schemas/activity.schema';

interface Props {
  defaultCover?: string,
  slug: string
}

// stores
const cardStore = useCardStore()

// Props
const { defaultCover, slug } = defineProps<Props>()

// models
const activityModel = defineModel<Activity>("activity")
const coverModel = defineModel<string>("cover")
const parentModel = defineModel<HTMLElement>("parentModel")

// refs
const uploadedVercelBlob = ref<string>('')
const isShowBottomSheet = ref<boolean>(false)

// composables
const { width, height } = useElementSize(parentModel)
const { transformedUrl, transformingImage } = useImageKit()
const { isUploading, upload, progress } = useVercelBlob({
  prefix: 'sunset-vita',
})

// hooks
onMounted(() => {

  // set initial cover if provided
  coverModel.value = defaultCover || ''
})

// watchers
watch(
  () => cardStore.selectedActivity,
  (selectedActivity) => {

    // If the selected activity is not null, update the activity model
    if (selectedActivity) {
      activityModel.value = JSON.parse(JSON.stringify(selectedActivity))
    } else {
      // Reset the activity model if no activity is selected
      activityModel.value = {} as Activity
    }
  },
  { immediate: true }
)

// handler: file upload
const handlePictureUpload = async (event: Event) => {

  // Get the file input element and check if files are selected
  const input = event.target as HTMLInputElement

  // If the input has files, process the first file
  if (input.files && input.files.length > 0) {

    // Get the first file from the input
    const picture = input.files[0]

    // upload
    const uploaded = await upload(picture)

    // success
    if (uploaded) {

      // transform the uploaded image URL
      transformingImage(uploaded.url, {
        dimension: {
          width: width.value,
          height: height.value,
        }
      })

      // Set the uploaded URL to the uploadedVercelBlob ref
      uploadedVercelBlob.value = uploaded.url

      // Update the cover model with the uploaded image URL
      coverModel.value = transformedUrl.value

      // Optionally, you can reset the input value to allow re-uploading the same file
      input.value = ''
    } else {
      // Handle upload failure (optional)
      console.error('Upload failed')
    }
  }
}


</script>