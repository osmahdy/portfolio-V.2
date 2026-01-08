<script setup>
import { defineProps, inject } from 'vue';

const animationType = inject('animationType');
const animationDuration = inject('animationDuration');
const animationDelay = inject('animationDelay');
const animationTiming = inject('animationTiming');
const props = defineProps({
  imgUrl: {
    type: String,
  },
  color: {
    type: String,
  },
  lanName: {
    type: String,
  },
});
</script>

<template>
  <div
    class="m-auto my-10 w-fit p-0 md:mx-15"
    :data-aos="animationType"
    :data-aos-duration="animationDuration"
    :data-aos-delay="animationDelay"
    :data-aos-easing="animationTiming"
  >
    <div
      class="hexagon relative z-0 m-auto h-[8.66em] w-[5em] cursor-pointer rounded-[0.5em_/_0.25em] bg-slate-400 outline outline-[10px] outline-offset-[-10px] transition-transform duration-400 before:bg-slate-400 after:bg-slate-400 hover:scale-80 md:h-[12.12em] md:w-[7em] md:rounded-[0.8em_/_0.4em] dark:bg-gray-900 dark:before:bg-gray-900 dark:after:bg-gray-900"
      :style="{ outlineColor: color }"
    >
      <div class="img relative z-3 flex h-full flex-col items-center justify-center">
        <img v-if="imgUrl" :src="imgUrl" :alt="`${lanName} icon`" class="w-20 md:w-50" loading="lazy" />
        <p class="text-lg font-bold md:text-2xl">{{ lanName.substring(0, 12) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hexagon::before,
.hexagon::after {
  content: '';
  position: absolute;
  inset: 0;
  display: block;
  border-radius: inherit;
  /*background-color: #111827; /* gray-900 */
}

.hexagon::before {
  z-index: 1;
  transform: rotate(60deg);
}

.hexagon::after {
  z-index: 2;
  transform: rotate(-60deg);
}
</style>
