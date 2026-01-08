<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  groupName: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between">
    <div class="flex items-center md:justify-between" :style="{ pointerEvents: status ? 'none' : 'auto' }">
      <input
        type="radio"
        :name="groupName"
        :id="`true-${groupName}`"
        class="h-5 w-5"
        :checked="modelValue === true"
        @change="updateValue(true)"
      />
      <label class="m-2 p-2 text-xl text-slate-200 select-none" :for="`true-${groupName}`"
        >Still {{ groupName.substring(0, groupName.indexOf('-')) }}</label
      >
    </div>
    <div class="flex items-center justify-between" :style="{ pointerEvents: status ? 'none' : 'auto' }">
      <input
        type="radio"
        :id="`false-${groupName}`"
        :name="groupName"
        class="h-5 w-5"
        :checked="modelValue === false"
        @change="updateValue(false)"
      />
      <label :for="`false-${groupName}`" class="m-2 p-2 text-xl text-slate-200 select-none"
        >Finished {{ groupName.substring(0, groupName.indexOf('-')) }}</label
      >
    </div>
  </div>
</template>
