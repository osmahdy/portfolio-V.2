<script setup>
import { defineProps, ref, computed, defineEmits, watch } from 'vue';
import inputComp from './input.vue';
import labelComp from './label.vue';

const props = defineProps({
  modelValue: Boolean,
  data: Object,
});

const emit = defineEmits(['update:modelValue', 'save']);

const dialogeState = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const dataCopy = ref(null);

const errors = ref({
  img: '',
  color: '',
  name: '',
});

// ✅ sync when dialog opens / data changes
watch(
  () => dialogeState.value,
  (isOpen) => {
    if (isOpen && props.data) {
      // 🔥 fresh clone every open
      dataCopy.value = { ...props.data };
    }
  },
);

const closeDialoge = () => {
  dialogeState.value = false;
};

const save = () => {
  if (!validate()) return; // ❌ stop if invalid
  emit('save', dataCopy.value); // ✅ send edited data
  closeDialoge();
};

const isValidColor = (value) => {
  if (!value?.trim()) return false;

  // Create a temporary element's style object
  const s = new Option().style;

  // Ask the browser to apply the color
  s.color = value.trim();

  // If browser accepted it → valid color
  return s.color !== '';
};

const validate = () => {
  let isValid = true;

  // reset errors
  errors.value = {
    img: '',
    color: '',
    name: '',
  };

  if (!dataCopy.value.img?.trim()) {
    errors.value.img = 'Image link is required';
    isValid = false;
  }

  if (!dataCopy.value.color?.trim()) {
    errors.value.color = 'Skill color is required';
    isValid = false;
  }

  if (!isValidColor(dataCopy.value.color)) {
    errors.value.color = 'Invalid color value';
    isValid = false;
  }

  if (!dataCopy.value.name?.trim()) {
    errors.value.name = 'Skill name is required';
    isValid = false;
  }

  return isValid;
};
</script>

<template>
  <div
    :class="[
      dialogeState ? 'scale-100' : 'scale-0',
      'dialoge fixed top-1/2 left-1/2 z-6000 flex min-h-50 min-w-100 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-slate-800 p-4 text-slate-950 duration-300',
    ]"
  >
    <div v-if="dialogeState && dataCopy" class="flex w-full flex-col items-center justify-center">
      <img :src="dataCopy.img" alt="skill img" class="w-50" />
      <div class="w-full">
        <labelComp label="Image Link" class="m-0!" />
        <inputComp v-model="dataCopy.img" class="m-0!" :status="false" />
        <p v-if="errors.img" class="mt-1 text-sm text-red-500">
          {{ errors.img }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Skill Color" class="m-0!" />
        <inputComp v-model="dataCopy.color" class="m-0!" :status="false" />
        <p v-if="errors.color" class="mt-1 text-sm text-red-500">
          {{ errors.color }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Skill Name" class="m-0!" />
        <inputComp v-model="dataCopy.name" class="m-0!" :status="false" />
        <p v-if="errors.name" class="mt-1 text-sm text-red-500">
          {{ errors.name }}
        </p>
      </div>

      <p
        class="mx-2 my-3 w-full cursor-pointer rounded-2xl border border-slate-400 bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700"
        @click="save"
      >
        Save
      </p>
      <p @click="closeDialoge">
        <i class="fa-solid fa-x absolute top-5 right-5 cursor-pointer text-xl text-white"></i>
      </p>
    </div>
  </div>
</template>
