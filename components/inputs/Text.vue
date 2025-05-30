<template>
  <div>
    <label v-if="label" class="block mb-2 text-sm font-semibold text-slate-900 capitalize">{{ label }}</label>
    <input type="text" v-model="model"
      class="bg-slate-100/50 backdrop-blur-sm border border-slate-500 text-slate-900 focus:outline-slate-600 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full px-2.5 py-3"
      :placeholder :required />
  </div>
</template>

<script lang="ts" setup>

interface Props {
  label?: string;
  placeholder?: string;
  required?: boolean;
}

// Props
const { label, placeholder = "Placeholder here", required = true } = defineProps<Props>()

// model
const model = defineModel({
  type: String,
  default: ''
})

</script>