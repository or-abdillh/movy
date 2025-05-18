<template>
  <NuxtLayout name="guest-layout">
    <main class="flex flex-col gap-24 justify-center items-center bg-white max-w-2xl mx-auto p-12 rounded-lg shadow-sm min-h-screen">
      <!-- brand -->
      <BrandsPrimary />

      <!-- header -->
      <header class="text-center max-w-xl">
        <p class="text-3xl font-semibold text-slate-700 mb-6">Turn Your Workouts into <br> Shareable Moments</p>
        <p class="text-slate-700 text-xl">Connect your <strong>Strava</strong> account to start creating beautiful share
          cards from your workouts.</p>
      </header>

      <!-- wrapper actions -->
      <section class="flex flex-col gap-4 w-full max-w-sm">
        <!-- connect to strava -->
        <a :href="stravaUrl"
          class="flex gap-1 bg-orange-600 mb-4 rounded-lg overflow-hidden items-center ring-transparent ring-2 ring-offset-2 hover:ring-orange-500 duration-200">
          <img src="/images/strava.png" alt="Strava" class="size-14">
          <div class="py-3 ps-4 pe-5 text-white font-semibold">Continue with Strava</div>
        </a>

        <!-- info -->
        <span class="text-slate-600 text-sm">
          <i class="fa-solid fa-circle-info me-1"></i>
          Automatically pull your activities — like distance, time, and route — and turn them into customizable visuals
          made to share.
        </span>
      </section>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">

useHead({
  title: "Login"
})

// composable
const config = useRuntimeConfig()

// stores
const authStore = useAuthStore()

// states
const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${config.public.strava.clientId}&response_type=code&redirect_uri=${config.public.strava.redirectUri}&approval_prompt=force&scope=read,activity:read_all,profile:read_all`;

// hook
onMounted(() => {
  
  // check if user is already logged in
  if (authStore.isAuthenticated) {
    navigateTo({ name: "app.index" })
  }
})

</script>