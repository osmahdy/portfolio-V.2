<script setup>
import { defineProps, defineEmits } from 'vue';
import labelComp from '../general Comps/label.vue';

const props = defineProps({
  item: Object,
  status: Boolean,
  isOpen: Boolean,
  index: Number,
  groupName: String,
});
const emit = defineEmits(['openDialog', 'deleteSkill']);
</script>

<template>
  <div class="min-h-full overflow-hidden rounded-3xl border border-slate-800">
    <div class="flex h-90 cursor-pointer flex-col items-center justify-between bg-slate-600 p-4">
      <div class="flex flex-col items-center justify-center font-semibold">
        <div class="rounded-3xl bg-slate-300 p-2">
          <img :src="item.img" alt="skill img" class="h-30 w-30 select-none md:h-40 md:w-40" />
        </div>
        <labelComp :label="item.name" class="text-center! text-2xl!" />
      </div>
      <p
        class="flex w-full cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-slate-200 duration-300 select-none hover:bg-slate-800"
        @click="$emit('openDialog', item)"
      >
        Edit
      </p>
      <p
        class="my-2 flex w-full cursor-pointer items-center justify-center rounded-xl bg-red-900 px-3 py-2 text-slate-200 duration-300 select-none hover:bg-red-800"
        @click="$emit('deleteSkill', item)"
      >
        Remove
      </p>
    </div>
  </div>
</template>
