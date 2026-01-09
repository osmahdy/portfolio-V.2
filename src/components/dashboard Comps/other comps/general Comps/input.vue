<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' }, // v-model value
  placeholder: { type: String, default: '', required: false },
  status: { type: Boolean, default: true }, // true = readonly
  isCounter: { type: Boolean, required: false },
  sizeAllowed: { type: Number, required: false },
});

const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="m-2">
    <!-- COUNTER (NUMBER) -->
    <input
      v-if="isCounter"
      type="number"
      class="max-w-25 rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
      :placeholder="placeholder"
      :readonly="status"
      :value="modelValue"
      name="counter number"
      @input="$emit('update:modelValue', Number($event.target.value))"
      :maxlength="sizeAllowed"
    />

    <!-- SHORT TEXT -->
    <input
      v-else-if="String(modelValue).length < 30"
      type="text"
      class="w-full rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
      :placeholder="placeholder"
      :readonly="status"
      :value="modelValue"
      name="short text"
      @input="$emit('update:modelValue', $event.target.value)"
      :maxlength="sizeAllowed"
    />

    <!-- LONG TEXT -->
    <textarea
      v-else
      class="min-h-30 w-full rounded-md border border-slate-200 p-2 text-xl text-slate-200 outline-none"
      :placeholder="placeholder"
      :readonly="status"
      :value="modelValue"
      name="long text"
      @input="$emit('update:modelValue', $event.target.value)"
      :maxlength="sizeAllowed"
    />
    <p v-if="sizeAllowed" class="w-full text-end text-sm text-white">{{ `${modelValue.length}/${sizeAllowed}` }}</p>
  </div>
</template>
