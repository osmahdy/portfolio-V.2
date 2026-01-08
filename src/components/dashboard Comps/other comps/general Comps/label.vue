<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  label: {
    type: [String, Number],
  },
});
</script>

<template>
  <p class="m-2 ml-0 min-w-60 p-2 text-start text-xl font-semibold text-slate-100">{{ label }}</p>
</template>
