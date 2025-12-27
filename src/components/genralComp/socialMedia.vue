<script setup>
const props = defineProps({
  type: {
    type: String,
  },
  link: {
    type: String,
  },
});
</script>

<template>
  <div
    class="m-2 flex h-12 w-12 items-center justify-center !rounded-full border border-solid !border-gray-500 bg-slate-400 !p-1 !text-2xl duration-300 hover:scale-110 hover:bg-slate-500 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-600"
  >
    <a :href="link" target="_blank">
      <i :class="`fa-brands fa-${type}`" v-if="type !== 'gmail'"></i>
      <i class="fa-regular fa-envelope" v-else></i>
    </a>
  </div>
</template>
