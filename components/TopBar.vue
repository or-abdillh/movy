<template>
  <ResponsiveContainer class="flex justify-between items-center py-4 px-5">
    <!-- back -->
    <button @click="$router.back()" class="text-gray-700">
      <i class="fa-solid fa-arrow-left-long"></i>
    </button>

    <p class="text-lg font-semibold text-slate-700">{{ props.title }}</p>

    <button></button>
  </ResponsiveContainer>
</template>

<script setup lang="ts">

interface Props {
  title: string
}

// props
const props = defineProps<Props>()

</script>