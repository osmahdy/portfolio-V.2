<script setup>
import { ref } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  texts: {
    type: Array,
    default: 'text....',
  },
});

const MAX_LENGTH = window.innerWidth < 768 ? 500 : 800;

// This stores which text blocks are expanded
const expanded = ref({});

// Toggle expand/collapse
const toggle = (i) => {
  expanded.value[i] = !expanded.value[i];
};

const getDisplayText = (fullText, i) => {
  if (fullText.length <= MAX_LENGTH) return fullText;
  return expanded.value[i] ? fullText : fullText.slice(0, MAX_LENGTH) + '...';
};
</script>

<template>
  <div
    class="bottom my-3 scale-100 cursor-pointer rounded-3xl border border-solid border-gray-600 bg-slate-400 p-4 duration-500 hover:scale-105 dark:border-gray-400 dark:bg-slate-950"
  >
    <p class="animate-glow my-3 text-3xl font-semibold text-white ease-in">{{ title }}</p>
    <p class="md:text-1xl text-justify" v-for="(text, index) in texts" :key="index">
      <span v-if="text.subTitle" class="mr-3 inline-block min-w-25 font-bold">
        {{ text.subTitle }}
      </span>

      <span class="my-2">
        {{ getDisplayText(text.subText, index) }}
      </span>

      <!-- Read More / Show Less -->
      <span v-if="text.subText.length > MAX_LENGTH" @click="toggle(index)" class="ml-2 cursor-pointer text-blue-600">
        {{ expanded[index] ? 'Show less' : 'Read more' }}
      </span>
    </p>
  </div>
</template>
