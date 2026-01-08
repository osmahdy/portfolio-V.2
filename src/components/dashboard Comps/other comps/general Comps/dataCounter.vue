<script setup>
import labelComp from './label.vue';

const props = defineProps({
  label: String,
  count: {
    type: [Number, String],
    required: false,
  },
});
</script>
<template>
  <div class="dataCounter flex w-full items-center justify-center">
    <div
      class="m-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-3 border-slate-800 bg-slate-500 p-2 text-lg text-white duration-300 select-none hover:bg-slate-400 md:min-w-80 lg:min-w-100"
    >
      <labelComp :label="label" class="text-center! text-3xl!" />
      <labelComp :label="count" class="text-center! text-4xl!" />
    </div>
  </div>
</template>
