<template>
  <main ref="sunsetVita" data-role="card-template" :style="{ background: `url('${cover}')` }"
    :class="isExporting ? 'w-[1080px] h-[1920px]' : 'w-full lg:w-5/12 xl:w-4/12 mx-auto h-full'"
    class="bg-contain bg-center bg-no-repeat">
    <!-- inner layer -->
    <main :class="isExporting ? 'p-32' : 'p-8'"
      class="relative h-full bg-gradient-to-t from-white/90 via-gray-400/40 to-gray-800/20 flex flex-col justify-end gap-12">
      <header :class="isExporting ? 'top-16' : 'top-0'" class="flex justify-center items-center gap-6 absolute left-0 right-0 p-6">
        <BrandsMadeWithPrimary class="text-center" :style="{ transform: isExporting ? 'scale(2.5)' : 'scale(1)' }" />
      </header>

      <!-- toolbar -->
      <SkinsToolbar slug="sunset-vista"
        default-cover="https://images.stockcake.com/public/a/3/7/a373f47a-1ead-4d0d-a201-e883a980ec1c_large/sunset-run-silhouette-stockcake.jpg"
        v-model:parent-model="sunsetVita" v-model:activity="activity" v-model:cover="cover" />

      <!-- bottom -->
      <section>
        <!-- activity title -->
        <section class="grid grid-cols-10 justify-between items-center gap-3 mb-6">
          <h1 :class="isExporting ? 'text-6xl' : 'text-2xl'" class="col-span-8 font-bold text-slate-100">
            {{ activity?.name || 'Sunset Tempo Run - Central Park' }}
          </h1>
          <div class="col-span-2 grid place-items-center">
            <span :class="isExporting ? 'size-24 text-4xl' : 'size-10'" class="grid place-items-center bg-gradient-to-tl from-orange-600 to-orange-500 rounded-full">
              <i class="fa-solid fa-person-running text-slate-200"></i>
            </span>
          </div>
        </section>

        <!-- other details -->
        <section :class="isExporting ? 'gap-8' : 'gap-3'" class="grid grid-cols-2">
          <!-- timestamp -->
          <section :class="isExporting ? 'text-3xl px-12 py-8' : 'text-sm px-6 py-2'"
            class="col-span-2 bg-orange-100/20 backdrop-blur-sm-sm rounded-full text-slate-800 font-semibold">
            {{ moment(activity?.start_date ?? new Date()).format('MMMM DD, YYYY - hh:mm A') }}
          </section>

          <!-- distance -->
          <section :class="isExporting ? 'p-12' : 'p-3'" class="col-span-1 grid bg-gradient-to-tl from-orange-600 to-orange-500 rounded-xl">
            <div :class="isExporting ? 'text-3xl' : 'text-sm'" class="flex justify-between items-center gap-3">
              <p class="text-slate-100">Distance</p>
              <i class="fa-solid fa-caret-down text-orange-300"></i>
            </div>
            <p :class="isExporting ? 'text-7xl' : 'text-3xl'" class="font-bold text-white">
              {{ activity?.distance ? (activity.distance / 1000).toFixed(1) : '10.3' }}Km
            </p>
          </section>

          <!-- stats -->
          <section :class="isExporting ? 'gap-6' : 'gap-2'" class="col-span-1 flex flex-col">
            <!-- heart rate -->
            <div :class="isExporting ? 'px-12 py-8 text-4xl' : 'px-4 py-1'" class="bg-orange-100/20 backdrop-blur-sm rounded-full flex justify-between items-center">
              <span :class="isExporting ? 'text-2xl' : 'text-xs'" class="text-slate-800">
                HR
              </span>
              <strong class="text-slate-800">
                {{ activity?.average_heartrate ? activity.average_heartrate.toFixed(0) : '145' }} BPM
              </strong>
            </div>
            <!-- time -->
            <div :class="isExporting ? 'px-12 py-8 text-4xl' : 'px-4 py-1'" class="bg-orange-100/20 backdrop-blur-sm rounded-full flex justify-between items-center">
              <span :class="isExporting ? 'text-2xl' : 'text-xs'" class="text-slate-800">
                Time
              </span>
              <strong class="text-slate-800">
                {{ activity?.moving_time ? moment.utc(activity.moving_time * 1000).format('HH:mm:ss') : '00:45:30' }}
              </strong>
            </div>
            <!-- pace -->
            <div :class="isExporting ? 'px-12 py-8 text-4xl' : 'px-4 py-1'" class="bg-orange-100/20 backdrop-blur-sm rounded-full flex justify-between items-center">
              <span :class="isExporting ? 'text-2xl' : 'text-xs'" class="text-slate-800">
                Pace
              </span>
              <strong class="text-slate-800">
                {{ activity?.distance && activity.moving_time ? paceCounter(activity) : '04:25' }}
              </strong>
            </div>
          </section>
        </section>
      </section>
    </main>
  </main>
</template>

<script setup lang="ts">

import moment from 'moment'
import { paceCounter } from '~/utils/pace-counter.util'
import type { Activity } from '~/schemas/activity.schema'

// stores
const cardStore = useCardStore()

// refs
const sunsetVita = ref<HTMLElement>()
const cover = ref<string>("")
const activity = ref<Activity>()

// getter
const isExporting = computed(() => cardStore.isExporting)

</script>