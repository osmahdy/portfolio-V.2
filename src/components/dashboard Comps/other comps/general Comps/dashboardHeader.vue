<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  header: {
    type: String,
  },
});
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <p
      class="mt-10 w-fit rounded-full border-3 border-solid border-slate-800 bg-slate-300 px-6 py-2 text-center text-2xl font-bold text-slate-950 md:mt-0 md:min-w-100 md:text-3xl md:text-4xl"
    >
      {{ header }}
    </p>
  </div>
</template>
