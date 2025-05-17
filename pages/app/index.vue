<template>
  <NuxtLayout name="app-layout">
    <ResponsiveContainer>
      <!-- card welcome -->
      <header
        class="w-full mb-8 px-12 lg:h-64 h-80 flex flex-col justify-center lg:rounded-lg bg-[url('/images/21e4f37f-36b6-4074-afbe-38f3785ce600.jpeg')] bg-cover bg-center text-white">
        <h1 class="font-bold text-3xl mb-6">
          <i class="fa-solid fa-dumbbell me-2"></i>
          Craft Your Workout. <br> Share the Journey.
        </h1>
        <p class="font-medium">Welcome back! Let’s turn that workout into something worth sharing.</p>
      </header>
    </ResponsiveContainer>

    <ResponsiveContainer class="px-5 lg:px-0">
      <!-- styles -->
      <section>
        <!-- top -->
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold text-slate-800">Explore our styles</p>
          <i class="fa-solid fa-chevron-right"></i>
        </div>

        <!-- list -->
        <div class="overflow-scroll flex gap-3 no-scrollbar">
          <template v-for="style in shareCardStyles" :key="style.id">
            <!-- style -->
            <div class="size-52 relative min-w-52 rounded-lg" :style="{ background: style.gradient }">
              <!-- footer -->
              <div class="bg-slate-900 bg-opacity-30 rounded-b-lg backdrop-blur-sm text-white p-3 absolute bottom-0 left-0 right-0">
                <p class="text-center font-semibold">{{ style.name }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>
    </ResponsiveContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">

import type { ShareCardStyle } from "~/ts/type";

useHead({
  title: "App"
})

// stores
const authStore = useAuthStore();

// The list of share card styles
const shareCardStyles: ShareCardStyle[] = [
  {
    id: "classic-clean",
    name: "Classic Clean",
    description: "Minimalist layout with clean lines, subtle shadows, and easy-to-read stats. Timeless and versatile.",
    gradient: "linear-gradient(135deg, #ffffff, #e5e7eb)"
  },
  {
    id: "bold-energy",
    name: "Bold Energy",
    description: "Vibrant colors, big typography, and dynamic shapes — perfect for showing off intense workouts.",
    gradient: "linear-gradient(135deg, #FD2F73, #FE922D)"
  },
  {
    id: "gradient-flow",
    name: "Gradient Flow",
    description: "Smooth gradients with brand colors, soft curves, and dreamy vibes. Feels modern and elegant.",
    gradient: "linear-gradient(135deg, #C536C9, #FD2F73, #FE922D)"
  },
  {
    id: "retro-vibes",
    name: "Retro Vibes",
    description: "Inspired by 80s–90s design — bold blocks, pixel patterns, or retro typography.",
    gradient: "linear-gradient(135deg, #FF5F6D, #FFC371)"
  },
  {
    id: "monochrome-mode",
    name: "Monochrome Mode",
    description: "High-contrast, black-and-white or single-tone design — great for a sleek, powerful feel.",
    gradient: "linear-gradient(135deg, #000000, #333333)"
  },
  {
    id: "nature-pulse",
    name: "Nature Pulse",
    description: "Earthy tones and organic shapes — ideal for outdoor activities like hiking, trail running, or cycling.",
    gradient: "linear-gradient(135deg, #56ab2f, #a8e063)"
  },
  {
    id: "sporty-pro",
    name: "Sporty Pro",
    description: "Feels like a performance dashboard — sharp edges, stat highlights, and techy fonts.",
    gradient: "linear-gradient(135deg, #28313B, #485563)"
  },
  {
    id: "photo-focus",
    name: "Photo Focus",
    description: "Puts user photos front and center with minimal overlays — perfect for scenic shots or selfies.",
    gradient: "linear-gradient(135deg, #ffffff, #eaeaea)"
  },
  {
    id: "artistic-touch",
    name: "Artistic Touch",
    description: "Paint strokes, sketch lines, or collage-style layering. Feels hand-crafted and expressive.",
    gradient: "linear-gradient(135deg, #FFDEE9, #B5FFFC)"
  },
  {
    id: "social-friendly",
    name: "Social Friendly",
    description: "Optimized for social sharing with IG-style layouts, reaction icons, and clean caption space.",
    gradient: "linear-gradient(135deg, #FD2F73, #C536C9)"
  }
];

</script>