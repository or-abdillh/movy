<template>
  <NuxtLayout name="app-layout">
    <ResponsiveContainer class="mb-10">
      <!-- card welcome -->
      <header
        class="w-full px-12 lg:h-64 h-80 flex flex-col justify-center lg:rounded-lg bg-[url('/images/21e4f37f-36b6-4074-afbe-38f3785ce600.jpeg')] bg-cover bg-center text-white">
        <h1 class="font-bold text-3xl mb-6">
          <i class="fa-solid fa-paint-roller me-1"></i>
          Craft Your Workout. <br> <strong class="font-extrabold underline">Share</strong> the Journey.
        </h1>
        <p class="font-medium">Welcome back! Let’s turn that workout into something worth sharing.</p>
      </header>
    </ResponsiveContainer>

    <ResponsiveContainer class="px-5 lg:px-0 mb-10">
      <!-- styles -->
      <section>
        <!-- top -->
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-bold text-slate-800">Explore Our Styles</p>
          <i class="fa-solid fa-chevron-right"></i>
        </div>

        <!-- list -->
        <div class="overflow-scroll flex gap-3 no-scrollbar">
          <template v-for="style in styles" :key="style.id">
            <!-- style -->
            <div class="size-64 relative min-w-64 rounded-lg bg-cover bg-center" :style="{ background: `url('${style.cover}')` }">
              <!-- footer -->
              <div class="bg-slate-900 bg-opacity-30 rounded-b-lg backdrop-blur-sm text-white p-3 absolute bottom-0 left-0 right-0">
                <p class="text-center font-semibold">{{ style.name }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>
    </ResponsiveContainer>

    <!-- recently activity -->
    <ResponsiveContainer class="px-5 lg:px-0">
      <!-- top -->
      <header class="flex justify-between items-center mb-4">
          <p class="text-lg font-bold text-slate-800">Your Recently Activities</p>
          <i class="fa-solid fa-chevron-down"></i>
      </header>

      <!-- activities -->
      <section class="flex flex-col gap-3 mb-3">
        <template v-for="(activity, index) in athleteStore.activities" :key="activity.id">
          <CardsRecentActivityCard v-if="index < 5" :activity />
        </template>
      </section>

      <!-- see more -->
      <ButtonsPrimary class="w-full">See more</ButtonsPrimary>
    </ResponsiveContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { AthleteService } from "~/services/athlete.service";
import { StyleService } from "~/services/style.service";
import type { Style } from "~/ts/type";

definePageMeta({
  name: "app.index"
})

useHead({
  title: "App"
})

// services
const styleService = new StyleService()
const athleteService = new AthleteService()

// stores
const athleteStore = useAthleteStore()
const authStore = useAuthStore()

// refs
const styles = ref<Style[]>([]);

// on mounted
onMounted(async () => {

  // get styles
  styles.value = await styleService.getStyles()

  // get athlete activities if activities is empty
  if (athleteStore.activities.length === 0 && authStore.isAuthenticated) {
    
    // set token inside athlete service
    athleteService.setToken(authStore.credentials.accessToken)

    // get activities
    const activities =  await athleteService.getActivities(1, 10)

    // set activities
    athleteStore.setActivities(activities)
  }
})

</script>