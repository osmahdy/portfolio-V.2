<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: Array,
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const input = ref('');

const addTag = () => {
  if (!input.value.trim()) return;
  if (props.modelValue.some((t) => t.name === input.value.trim())) return;
  const toEmit = [...props.modelValue, { name: input.value.trim() }];
  emit('update:modelValue', toEmit);
  input.value = '';
};

const removeTag = (index) => {
  const copy = [...props.modelValue];
  copy.splice(index, 1);
  emit('update:modelValue', copy);
};
</script>
<template>
  <div class="my-4">
    <div class="mb-2 flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in modelValue"
        :key="tag.name"
        class="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-lg"
      >
        {{ tag.name }}
        <i v-if="!disabled" class="fa-solid fa-xmark cursor-pointer text-xs" @click="removeTag(index)" />
      </span>
    </div>

    <input
      v-if="!disabled"
      v-model="input"
      @keydown.enter.prevent="addTag"
      placeholder="Add keyword and press Enter"
      class="text-md w-full rounded-lg border border-slate-300   p-2 outline-none"
    />
  </div>
</template>
