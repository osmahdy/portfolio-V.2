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
  props.state === 'good' ? 'bg-emerald-950 text-emerald-500' : 'bg-red-900 text-red-200',
  'alert  fixed top-[10%] right-0 z-50 m-3 flex items-center justify-start rounded-lg p-3 text-lg',
]);
</script>

<template>
  <div :class="alertClass">
    <i class="fa-regular fa-circle-check" v-if="state == 'good'"></i>
    <i class="fa-solid fa-circle-xmark" v-if="state == 'bad'"></i>
    <p class="mx-1 mr-20">{{ message }}</p>
  </div>
</template>

<style scoped>
@keyframes slideInOut {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  10% {
    transform: translateX(0);
    opacity: 1;
  }
  90% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
div {
  animation: slideInOut 5s ease-in-out forwards;
}
</style>
