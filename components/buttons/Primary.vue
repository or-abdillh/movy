<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'solid' | 'outline'
}>()

const classes = computed(() => {
  if (props.variant === 'outline') {
    return 'bg-transparent border border-primary-600 text-primary-600 font-semibold py-2 px-4 rounded-xl outline outline-transparent hover:outline-primary-400 outline-offset-2 transition duration-200 ease-in-out'
  }
  // default: solid
  return 'bg-primary-600 text-white font-semibold py-2 px-4 rounded-xl outline outline-transparent hover:outline-primary-400 outline-offset-2 transition duration-200 ease-in-out'
})
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>