<template>
  <section @click="emits('choosed')" class="bg-slate-50 p-3 group rounded-2xl overflow-hidden flex items-center border border-transparent hover:border-primary-200 hover:bg-primary-800 duration-150 cursor-pointer">
    <div>
      <span class="size-16 bg-primary-800 rounded-full grid place-items-center">
        <i class="fa-solid fa-person-running text-white text-2xl"></i>
      </span>
    </div>

    <!-- copywriter -->
    <div class="py-3 px-5">
      <small class="text-slate-500 group-hover:text-slate-200">{{ moment(activity.start_date).fromNow() }}</small>
      <p class="text-slate-700 group-hover:text-slate-100 font-semibold text-left text-sm mb-3">{{ activity.name }}</p>

      <!-- stats -->
      <div class="flex gap-3">
        <!-- distance -->
        <span class="text-slate-400 group-hover:text-slate-200 text-sm">
          <i class="fa-solid fa-road me-1"></i>
          {{ (activity.distance / 1000).toFixed(2) }}Km
        </span>
        
        <!-- avg heart rate -->
        <span class="text-slate-400 group-hover:text-slate-200 text-sm">
          <i class="fa-solid fa-heart-pulse me-1"></i>
          {{ activity.average_heartrate?.toFixed(0) }} bpm
        </span>

        <!-- thropy -->
        <span class="text-slate-400 group-hover:text-slate-200 text-sm">
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

// emits
const emits = defineEmits(["choosed"])

</script>