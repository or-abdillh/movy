<template>
  <NuxtLayout name="guest-layout">
    <main class="flex justify-center items-center gap-8 flex-col">
      <BrandsPrimary />

      <i class="fa-solid fa-spinner animate-spin"></i>

      <!-- copywriter -->
      <div class="text-center max-w-xl">
        <p class="text-xl font-semibold text-slate-700 mb-1">Redirecting you back to Movy...</p>
        <p class="text-slate-700 text-lg">
          We're syncing your <strong>Strava</strong> data — this won't take long.
          Hang tight, you're almost there!
        </p>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { useUrlSearchParams } from '@vueuse/core'
import type { StravaTokenExchangeResponse } from "~/ts/type";

useHead({
  title: "Please wait..."
})

// stores
const authStore = useAuthStore()

// composable
const params = useUrlSearchParams("history")

// hook: mounted
onMounted(async () => {

  // request to server
  const request = await $fetch<StravaTokenExchangeResponse>(`/api/auth/strava/callback?code=${params.code}`)

  // success
  if (request) {

    // store credentials
    authStore.setCredentials({
      accessToken: request.access_token,
      refreshToken: request.refresh_token,
      expiresAt: request.expires_at,
      expiresIn: request.expires_in,
      tokenType: request.token_type,
    })

    // store the athlete
    authStore.setAthlete(request.athlete)

    // redirect to app
    return navigateTo("/app")
  }
})

</script>