<template>
  <ResponsiveContainer :style="{ background: `url('${cover}')` }" class="bg-contain bg-center bg-no-repeat">
    <!-- inner layer -->
    <main :class="pageName === 'app.card.preview' ? 'min-h-screen' : 'min-h-[75vh]'" class="relative bg-gradient-to-t from-white via-gray-400/40 to-gray-800/20 flex flex-col justify-end gap-12 p-8">
      <header class="flex justify-center items-center gap-6 absolute top-0 left-0 right-0 p-6">
        <BrandsMadeWithPrimary class="text-center" />
      </header>

      <!-- tools: change cover -->
      <label v-if="false" for="cover" class="size-10 animate-bounce cursor-pointer bg-primary-600/50 backdrop-blur-sm rounded-full grid place-items-center absolute top-32 right-12">
        <i class="fa-solid fa-camera-rotate text-slate-200"></i>
      </label>

      <!-- field input file -->
      <input @change="handlePictureUpload" class="hidden" type="file" id="cover" accept="image/*">

      <!-- bottom -->
      <section>
        <!-- activity title -->
        <section class="grid grid-cols-10 justify-between items-center gap-3 mb-6">
          <h1 class="col-span-8 text-2xl font-bold text-slate-100">
            {{ actvity?.name || 'Sunset Tempo Run - Central Park' }}
          </h1>
          <div class="col-span-2 grid place-items-center">
            <span class="size-10 grid place-items-center bg-gradient-to-tl from-orange-600 to-orange-500 rounded-full">
              <i class="fa-solid fa-person-running text-slate-200"></i>
            </span>
          </div>
        </section>
  
        <!-- other details -->
        <section class="grid grid-cols-2 gap-3">
          <!-- timestamp -->
          <section class="col-span-2 bg-orange-100/20 backdrop-blur-sm-sm px-6 py-2 rounded-full text-slate-800 font-semibold text-sm">
            {{ moment(actvity?.start_date ?? new Date()).format('MMMM DD, YYYY - hh:mm A') }}
          </section>
  
          <!-- distance -->
          <section class="col-span-1 grid bg-gradient-to-tl from-orange-600 to-orange-500 p-3 rounded-xl">
            <div class="flex justify-between items-center gap-3">
              <p class="text-sm text-slate-100">Distance</p>
              <i class="fa-solid fa-caret-down text-orange-300"></i>
            </div>
            <p class="text-3xl font-bold text-white">
              {{ actvity?.distance ? (actvity.distance / 1000).toFixed(1) : '10.3' }}Km
            </p>
          </section>
  
          <!-- stats -->
          <section class="col-span-1 flex flex-col gap-2">
            <!-- heart rate -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">
                HR
              </span>
              <strong class="text-slate-800">
                {{ actvity?.average_heartrate ? actvity.average_heartrate.toFixed(0) : '145' }} BPM
              </strong>
            </div>
            <!-- time -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">
                Time
              </span>
              <strong class="text-slate-800">
                {{ actvity?.moving_time ? moment.utc(actvity.moving_time * 1000).format('HH:mm:ss') : '00:45:30' }}
              </strong>
            </div>
            <!-- pace -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">
                Pace
              </span>
              <strong class="text-slate-800">
                {{ actvity?.distance && actvity?.moving_time
                  ? (() => {
                      const pace = actvity.moving_time / (actvity.distance / 1000);
                      const min = Math.floor(pace / 60);
                      const sec = Math.round(pace % 60).toString().padStart(2, '0');
                      return `${min}:${sec} /km`;
                    })()
                  : '4:24 /km'
                }}
              </strong>
            </div>
          </section>
        </section>
      </section>
    </main>
  </ResponsiveContainer>
</template>

<script setup lang="ts">

import moment from 'moment'

// composables
const route = useRoute()

// stores
const cardStore = useCardStore()

// refs
const customPicture = ref<string>()
const defaultPicture = ref<string>('https://images.stockcake.com/public/a/3/7/a373f47a-1ead-4d0d-a201-e883a980ec1c_large/sunset-run-silhouette-stockcake.jpg')

// computed
const pageName = computed(() => {
  return route.name as string
})

const actvity = computed(() => {
  return cardStore.selectedActivity
})

const cover = computed(() => {
  // If custom picture is set, return it; otherwise, return the default picture
  return customPicture.value || defaultPicture.value
})

// handler: file upload
const handlePictureUpload = (event: Event) => {

  console.log('Picture upload triggered')

  // Get the file input element and check if files are selected
  const input = event.target as HTMLInputElement

  console.log('Input files:', input.files)

  // If the input has files, process the first file
  if (input.files && input.files.length > 0) {
    
    // Get the first file from the input
    const picture = input.files[0]

    console.log('Selected file:', picture)

    // Generate data URL for the selected image and store it in customPicture
    const reader = new FileReader()
    reader.onload = (e) => {
      customPicture.value = e.target?.result as string
    }
    reader.readAsDataURL(picture)
  }
}

</script>