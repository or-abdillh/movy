<template>
  <nav v-if="currentMenu" class="bg-white border-t border-gray-100 fixed left-0 right-0 bottom-0">
    <ResponsiveContainer>
      <!-- wrapper -->
      <section class="grid grid-cols-4 gap-0">
        <template v-for="menu in menus" :key="menu.name">
          <NuxtLink :to="{ name: menu.route }"
            class="p-6 hover:bg-secondary-100 duration-200 flex justify-center flex-col gap-1 items-center"
            :class="currentMenu?.name === menu.name ? 'text-white bg-gradient-to-bl from-primary-900 to-secondary-900' : 'text-slate-300'">
            <i class="fa-solid" :class="menu.icon"></i>
            <small class="font-medium" v-if="currentMenu?.name === menu.name">{{ menu.name }}</small>
          </NuxtLink>
        </template>
      </section>
    </ResponsiveContainer>
  </nav>
</template>

<script setup lang="ts">

// states
const menus: { name: string, icon: string, route: string }[] = [
  {
    name: "Home",
    icon: "fa-home",
    route: "app.index"
  },
  {
    name: "Style",
    icon: "fa-palette",
    route: "app.style.index"
  },
  {
    name: "Activity",
    icon: "fa-dumbbell",
    route: "app.index"
  },
  {
    name: "Profile",
    icon: "fa-user",
    route: "app.index"
  }
]

// composables
const route = useRoute()

// getter
const currentMenu = computed(() => {
  return menus.find((menu) => menu.route === route.name)
})

</script>