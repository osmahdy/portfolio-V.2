<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="subHeader my-10 w-fit border-b-2 border-slate-700 pb-3 select-none">
    <p class="text-3xl font-bold">{{ title }}</p>
  </div>
</template>
