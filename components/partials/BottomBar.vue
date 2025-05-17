<template>
  <nav class="bg-white border-t border-gray-100 fixed left-0 right-0 bottom-0">
    <ResponsiveContainer>
      <!-- wrapper -->
      <section class="grid grid-cols-4 gap-0">
        <template v-for="menu in menus" :key="menu.name">
          <button class="p-6 hover:bg-secondary-100 duration-200 flex justify-center flex-col items-center"
            :class="currentMenu?.name === menu.name ? 'text-white bg-gradient-to-bl from-primary-900 to-secondary-900' : 'text-slate-300'">
            <i class="fa-solid" :class="menu.icon"></i>
            <small class="font-medium" v-if="currentMenu?.name === menu.name">{{ menu.name }}</small>
          </button>
        </template>
      </section>
    </ResponsiveContainer>
  </nav>
</template>

<script setup lang="ts">

// states
const menus: { name: string, icon: string }[] = [
  {
    name: "Home",
    icon: "fa-home"
  },
  {
    name: "Style",
    icon: "fa-palette"
  },
  {
    name: "Activity",
    icon: "fa-dumbbell"
  },
  {
    name: "Profile",
    icon: "fa-user"
  }
]

// getter
const currentMenu = computed(() => {
  return menus.find(menu => menu.name === "Home")
})

</script>