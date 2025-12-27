<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  tagName: {
    type: String,
    required: true,
  },
  tagType: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div>
    <div class="cursor-pointer">
      <p class="m-1 flex min-w-6 items-center justify-end" v-if="tagType == 'img'">
        <img v-if="tagName" :src="tagName" alt="tag" class="max-h-6 max-w-fit" />
      </p>
      <p class="m-2 w-fit rounded-lg bg-slate-400 px-5 text-lg font-semibold dark:bg-slate-800" v-else>{{ tagName }}</p>
    </div>
  </div>
</template>
