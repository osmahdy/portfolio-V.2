<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  heading: {
    type: String,
  },
});
</script>

<template>
  <div class="subheader">
    <p
      class="my-3 w-full min-w-40 border-2 border-solid border-transparent border-b-slate-200 p-2 text-start text-2xl font-semibold text-slate-200"
    >
      {{ heading }}
    </p>
  </div>
</template>
