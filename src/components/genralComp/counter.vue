<script setup>
import { watch, ref, defineProps, inject } from 'vue';

const animationType = inject('animationType');
const animationDuration = inject('animationDuration');
const animationDelay = inject('animationDelay');
const animationTiming = inject('animationTiming');

const animatedValues = ref([]);
let started = false;

const props = defineProps({
  countData: {
    type: Array,
  },
  activate: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.activate,
  (newVal) => {
    if (newVal) {
      started = true;
      startCounting();
    }
  },
);

function startCounting() {
  animatedValues.value = props.countData.map(() => 0);

  const duration = 1500; // total animation time in ms
  const intervalTime = 30; // ms
  const ticks = duration / intervalTime;

  props.countData.forEach((item, index) => {
    const target = item.num;
    const step = target / ticks;

    const interval = setInterval(() => {
      animatedValues.value[index] += step;

      if (animatedValues.value[index] >= target) {
        animatedValues.value[index] = target;
        clearInterval(interval);
      }
    }, intervalTime);
  });
}
</script>

<template>
  <div
    :data-aos="animationType"
    :data-aos-duration="animationDuration"
    :data-aos-delay="animationDelay"
    :data-aos-easing="animationTiming"
    class="w-full"
  >
    <div
      class="counter bottom m-5 min-w-[250px] scale-100 cursor-pointer rounded-2xl border border-solid border-gray-600 bg-slate-400 p-4 duration-500 hover:scale-105 dark:border-gray-400 dark:bg-slate-950"
      v-for="(counter, index) in countData"
    >
      <p class="animate-glow my-3 text-center text-3xl font-semibold text-white ease-in">
        {{ Math.floor(animatedValues[index] ?? 0) }}+
      </p>
      <p class="md:text-1xl text-center text-xl font-semibold">{{ counter.label }}</p>
    </div>
  </div>
</template>
