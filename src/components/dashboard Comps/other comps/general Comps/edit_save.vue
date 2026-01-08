<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  cardId: { type: String, required: true }, // pass card id from parent
  modelValue: Boolean,
});

const emits = defineEmits(['edit-click', 'save-click', 'update:modelValue']);

const isEditing = ref(false);

const toggleEdit = () => {
  if (isEditing.value) {
    emits('save-click', props.cardId);
  } else {
    emits('edit-click', props.cardId);
    isEditing.value = true;
  }
};

// 🔥 THIS fixes double click
watch(
  () => props.modelValue,
  (saved) => {
    if (saved) {
      isEditing.value = false;
      emits('update:modelValue', false); // reset
    }
  },
);

const startEditing = () => {
  if (!isEditing.value) {
    emits('edit-click', props.cardId);
    isEditing.value = true;
  }
};

defineExpose({ startEditing });
</script>
<template>
  <div class="text-md flex w-fit w-full items-center justify-center rounded-full p-1">
    <!-- Edit button -->
    <p
      :class="[
        !isEditing ? 'bg-slate-300' : 'pointer-events-none bg-slate-500',
        'flex cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-slate-950 duration-300 select-none hover:bg-slate-300',
      ]"
      @click="toggleEdit"
    >
      <i class="fa-solid fa-pencil"></i>
      <span class="ml-2">Edit</span>
    </p>

    <!-- Save button -->
    <p
      :class="[
        isEditing ? 'bg-slate-300' : 'pointer-events-none bg-slate-500',
        'ml-5 flex cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-slate-950 duration-300 select-none hover:bg-slate-300',
      ]"
      @click="toggleEdit"
    >
      <i class="fa-solid fa-check"></i>
      <span class="ml-2">Save</span>
    </p>
  </div>
</template>
