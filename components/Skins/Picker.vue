<template>
    <!-- preview card -->
    <section :class="$router.currentRoute.value.name === 'app.card.preview' ? 'h-screen' : 'h-[75vh]'" class="w-full">
      <component :is="skins[card.slug]" />
    </section>
</template>

<script setup lang="ts">

import type { Card } from '~/ts/type';
import {
  SkinsClassicCleanSunsetVita
} from "#components";
import type { DefineComponent } from 'vue';

interface Props {
  card: Card
}

// Props
const { card } = defineProps<Props>();

// components
const skins: Record<string, DefineComponent<{}, {}, {}, {}, {}>> = {
  "sunset-vista": SkinsClassicCleanSunsetVita,
}

</script>