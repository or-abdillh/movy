<script setup lang="ts"></script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- gradient ellipse -->
    <span class="size-96 bg-primary-200 block rounded-full blur-2xl fixed top-0 left-0 -translate-y-2/4 -translate-x-1/4"></span>
    <span class="size-96 bg-primary-200 block rounded-full blur-2xl fixed bottom-0 right-0 translate-y-2/4 translate-x-1/4"></span>

    <!-- content -->
    <main class="min-h-screen p-8">
      <slot></slot>
    </main>
  </main>
</template>

<style scoped></style>
