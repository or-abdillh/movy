<style scoped>

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-down {
  animation: slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

</style>

<template>
  <aside>
    <!-- container -->
    <main v-if="isBottomSheetOpen" class="fixed bottom-0 left-0 right-0 top-0 bg-gray-900/50 z-50 flex flex-col justify-end">
      <ResponsiveContainer :class="props.show ? 'animate-slide-up' : 'animate-slide-down'" class="min-h-80 no-scrollbar max-h-[55vh] overflow-auto duration-200 bg-white rounded-t-3xl border-t border-gray-200 shadow">
        <!-- close -->
        <section @click="emits('closed')" class="flex px-6 py-4 gap-3 mb-4 sticky top-0 bg-white cursor-pointer">
          <button>
            <i class="fa-solid fa-x"></i>
          </button>

          <p class="font-semibold text-slate-700">{{ props.title }}</p>
        </section>

        <slot />
      </ResponsiveContainer>
    </main>
  </aside>
</template>

<script lang="ts" setup>

interface Props {
  show: boolean;
  title: string
}

// props
const props = defineProps<Props>()

// emits
const emits = defineEmits(["closed"])

// refs
const isBottomSheetOpen = ref(false)

// hooks
onMounted(() => {

  // remove overflow-hidden class from body when component is mounted
  document.body.classList.remove('overflow-hidden')
})

// watchers
watch(
  () => props.show,
  () => {

    // adding class to body when bottom sheet is shown
    if (props.show) {
      document.body.classList.add('overflow-hidden')

      isBottomSheetOpen.value = true
    } else {
      document.body.classList.remove('overflow-hidden')

      setTimeout(() => {
        
        isBottomSheetOpen.value = false
      }, 300);
    }
  }
)

</script>
