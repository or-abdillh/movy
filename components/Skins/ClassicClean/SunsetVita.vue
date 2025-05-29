<template>
  <ResponsiveContainer class="bg-[url('https://images.stockcake.com/public/a/3/7/a373f47a-1ead-4d0d-a201-e883a980ec1c_large/sunset-run-silhouette-stockcake.jpg')] bg-cover bg-center bg-no-repeat">
    <!-- inner layer -->
    <main class="min-h-screen relative bg-gradient-to-t from-white via-gray-400/40 to-gray-800/20 flex flex-col justify-end gap-12 p-8">
      <header class="flex justify-center items-center gap-6 absolute top-0 left-0 right-0 p-6">
        <BrandsMadeWithPrimary class="text-center" />
      </header>

      <!-- bottom -->
      <section>
        <!-- activity title -->
        <section class="grid grid-cols-10 justify-between items-center gap-3 mb-6">
          <h1 class="col-span-8 text-2xl font-bold text-slate-100">Sunset Tempo Run - Central Park</h1>
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
            July 20, 2023 - 06:30 AM
          </section>
  
          <!-- distance -->
          <section class="col-span-1 grid bg-gradient-to-tl from-orange-600 to-orange-500 p-3 rounded-xl">
            <div class="flex justify-between items-center gap-3">
              <p class="text-sm text-slate-100">Distance</p>
              <i class="fa-solid fa-caret-down text-orange-300"></i>
            </div>
            <p class="text-3xl font-bold text-white">10,2KM</p>
          </section>
  
          <!-- stats -->
          <section class="col-span-1 flex flex-col gap-2">
            <!-- heart rate -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">HR</span>
              <strong class="text-slate-800">149BPM</strong>
            </div>
            <!-- time -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">Time</span>
              <strong class="text-slate-800">01:06:32</strong>
            </div>
            <!-- pace -->
            <div class="bg-orange-100/20 backdrop-blur-sm px-4 py-1 rounded-full flex justify-between items-center">
              <span class="text-xs text-slate-800">Pace</span>
              <strong class="text-slate-800">6:38</strong>
            </div>
          </section>
        </section>
      </section>
    </main>
  </ResponsiveContainer>
</template>

<script setup lang="ts">

</script>