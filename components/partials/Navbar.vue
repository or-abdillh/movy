<template>
  <nav class="fixed top-0 left-0 right-0 bg-white z-40 bg-opacity-50 backdrop-blur">
    <!-- container -->
    <ResponsiveContainer>
      <section class="lg:py-5 py-3 px-8 lg:px-0 flex justify-between items-center">
        <!-- brand -->
        <section>
          <BrandsSecondary />
        </section>
  
        <!-- user -->
        <section class="flex items-center gap-4">
          <img :src="auth.athlete?.profile" alt="Movy" class="rounded-full w-10 h-10 object-cover" />
        </section>
      </section>
    </ResponsiveContainer>
  </nav>
</template>

<script setup lang="ts">

// stores
const auth = useAuthStore()

</script>