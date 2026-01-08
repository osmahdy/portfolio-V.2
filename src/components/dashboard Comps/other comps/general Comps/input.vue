<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' }, // v-model value
  placeholder: { type: String, default: '', required: false },
  status: { type: Boolean, default: true }, // true = readonly
  isCounter: { type: Boolean, required: false },
});

const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <!-- COUNTER (NUMBER) -->
  <input
    v-if="isCounter"
    type="number"
    class="m-2 max-w-25 rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
    :placeholder="placeholder"
    :readonly="status"
    :value="modelValue"
    name="counter number"
    @input="$emit('update:modelValue', Number($event.target.value))"
  />

  <!-- SHORT TEXT -->
  <input
    v-else-if="String(modelValue).length < 30"
    type="text"
    class="m-2 w-full rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
    :placeholder="placeholder"
    :readonly="status"
    :value="modelValue"
    name="short text"
    @input="$emit('update:modelValue', $event.target.value)"
  />

  <!-- LONG TEXT -->
  <textarea
    v-else
    class="m-2 min-h-30 w-full rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
    :placeholder="placeholder"
    :readonly="status"
    :value="modelValue"
    name="long text"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
