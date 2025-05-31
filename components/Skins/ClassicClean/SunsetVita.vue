<template>
  <main ref="sunsetVita" :style="{ background: `url('${cover}')` }"
    class="w-full lg:w-5/12 xl:w-4/12 mx-auto bg-contain bg-center bg-no-repeat h-full">
    <!-- inner layer -->
    <main
      class="relative h-full bg-gradient-to-t from-white via-gray-400/40 to-gray-800/20 flex flex-col justify-end gap-12 p-8">
      <header class="flex justify-center items-center gap-6 absolute top-0 left-0 right-0 p-6">
        <BrandsMadeWithPrimary class="text-center" />
      </header>

      <!-- toolbar -->
      <SkinsToolbar
        slug="sunset-vista"
        default-cover="https://images.stockcake.com/public/a/3/7/a373f47a-1ead-4d0d-a201-e883a980ec1c_large/sunset-run-silhouette-stockcake.jpg"
        v-model:parent-model="sunsetVita"
        v-model:activity="activity"
        v-model:cover="cover" />

      <!-- bottom -->
      <section>
        <!-- activity title -->
        <section class="grid grid-cols-10 justify-between items-center gap-3 mb-6">
          <h1 class="col-span-8 text-2xl font-bold text-slate-100">
            {{ activity?.name || 'Sunset Tempo Run - Central Park' }}
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
          <section
            class="col-span-2 bg-orange-100/20 backdrop-blur-sm-sm px-6 py-2 rounded-full text-slate-800 font-semibold text-sm">
            {{ moment(activity?.start_date ?? new Date()).format('MMMM DD, YYYY - hh:mm A') }}
          </section>

          <!-- distance -->
          <section class="col-span-1 grid bg-gradient-to-tl from-orange-600 to-orange-500 p-3 rounded-xl">
            <div class="flex justify-between items-center gap-3">
              <p class="text-sm text-slate-100">Distance</p>
              <i class="fa-solid fa-caret-down text-orange-300"></i>
            </div>
            <p class="text-3xl font-bold text-white">
              {{ activity?.distance ? (activity.distance / 1000).toFixed(1) : '10.3' }}Km
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
                {{ activity?.average_heartrate ? activity.average_heartrate.toFixed(0) : '145' }} BPM
              </strong>
            </div>
            <!-- time -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">
                Time
              </span>
              <strong class="text-slate-800">
                {{ activity?.moving_time ? moment.utc(activity.moving_time * 1000).format('HH:mm:ss') : '00:45:30' }}
              </strong>
            </div>
            <!-- pace -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">
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

// refs
const sunsetVita = ref<HTMLElement>()
const cover = ref<string>("")
const activity = ref<Activity>()

</script>