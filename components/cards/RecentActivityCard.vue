<template>
  <section class="bg-white p-3 rounded-lg overflow-hidden flex items-center">
    <img
      src="https://res.cloudinary.com/diundang-digital/image/upload/w_100/v1747489097/movy/images/illustrations/running.jpg"
      alt="Movy" class="size-16 lg:size-32 rounded-xl">

    <!-- copywriter -->
    <div class="py-3 px-5">
      <small class="text-slate-500">{{ moment(activity.start_date).fromNow() }}</small>
      <p class="text-slate-700 font-semibold text-left text-sm mb-3">{{ activity.name }}</p>

      <!-- stats -->
      <div class="flex gap-3">
        <!-- distance -->
        <span class="text-slate-400 text-sm">
          <i class="fa-solid fa-road me-1"></i>
          {{ (activity.distance / 1000).toFixed(2) }}Km
        </span>
        
        <!-- avg heart rate -->
        <span class="text-slate-400 text-sm">
          <i class="fa-solid fa-heart-pulse me-1"></i>
          {{ activity.average_heartrate?.toFixed(0) }} bpm
        </span>

        <!-- thropy -->
        <span class="text-slate-400 text-sm">
          <i class="fa-solid fa-trophy me-1"></i>
          {{ activity.pr_count }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import moment from "moment"
import type { Activity } from '~/schemas/activity.schema';

interface Props {
  activity: Activity
}

// props
const { activity } = defineProps<Props>()

</script>