<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
  },
  state: {
    type: String,
  },
});
const alertClass = computed(() => [
  props.state === 'good' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white',
  'alert fixed top-3 right-0 z-600 m-3 flex items-center justify-start rounded-lg p-3 text-lg md:w-[94%]  w-[85%] ',
]);
</script>

<template>
  <div :class="alertClass">
    <i class="fa-regular fa-circle-check" v-if="state == 'good'"></i>
    <i class="fa-solid fa-circle-xmark" v-if="state == 'bad'"></i>
    <p class="mx-1">{{ message }}</p>
  </div>
</template>

<style scoped>
@keyframes slideInOut {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

div {
  animation: slideInOut 5s ease-in-out forwards;
}
</style>
