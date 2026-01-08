<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  data: Array,
  modelValue: Array,
});
const emit = defineEmits(['update:modelValue']);

function toggle(index) {
  // create new array with toggled checked
  const updated = props.modelValue.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item));

  emit('update:modelValue', updated);
}
</script>

<template>
  <div class="selectInputs">
    <div v-for="(value, index) in data" :key="value.category">
      <input type="checkbox" :id="index" :checked="value.checked" @change="toggle(index)" class="h-3 w-3" />
      <label :for="index" class="m-2 p-2 text-start text-xl text-slate-200 select-none">{{ value.category }}</label>
    </div>
  </div>
</template>
