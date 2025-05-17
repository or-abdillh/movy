<template>
  <nav class="fixed top-0 left-0 right-0 bg-white">
    <!-- container -->
    <ResponsiveContainer>
      <section class="bg-white py-5 px-8 lg:px-0 flex justify-between items-center">
        <!-- brand -->
        <section>
          <BrandsSecondary class="lg:hidden" />
          <BrandsMono class="hidden lg:visible" />
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