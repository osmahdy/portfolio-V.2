<script setup>
import { defineProps, ref, computed, defineEmits, watch } from 'vue';
import inputComp from './input.vue';
import labelComp from './label.vue';
import selectionInputs from './selectionInputs.vue';
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

const selectedCats = ref(null);

const errors = ref({
  title: '',
  description: '',
  categories: '',
  image: '',
  liveLink: '',
  github: '',
});

// ✅ sync when dialog opens / data changes
watch(
  () => dialogeState.value,
  (isOpen) => {
    if (isOpen && props.data) {
      // 🔥 fresh clone every open
      dataCopy.value = { ...props.data };
      // clone the categories array for v-model
      selectedCats.value = dataCopy.value.categories.map((cat) => ({ ...cat }));
    }
  },
);

const closeDialoge = () => {
  dialogeState.value = false;
};

const save = () => {
  if (!validate()) return; // ❌ stop if invalid
  // sync selectedCats back to dataCopy
  dataCopy.value.categories = selectedCats.value.map((cat) => ({ ...cat }));
  emit('save', dataCopy.value); // ✅ send data
  closeDialoge();
};

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const validate = () => {
  let isValid = true;

  // reset errors
  errors.value = {
    title: '',
    description: '',
    categories: null,
    image: '',
    liveLink: '',
    github: '',
  };

  if (!dataCopy.value.title?.trim()) {
    errors.value.title = 'title is required';
    isValid = false;
  }

  if (!dataCopy.value.description?.trim()) {
    errors.value.description = 'description is required';
    isValid = false;
  }

  if (!dataCopy.value.image?.trim()) {
    errors.value.image = 'image link is required';
    isValid = false;
  }

  if (!isValidUrl(dataCopy.value.image)) {
    errors.value.liveLink = 'image link is not true';
    isValid = false;
  }

  if (!dataCopy.value.liveLink?.trim()) {
    errors.value.liveLink = 'liveLink link is required';
    isValid = false;
  }

  if (!isValidUrl(dataCopy.value.liveLink)) {
    errors.value.liveLink = 'liveLink link is not true';
    isValid = false;
  }

  if (!dataCopy.value.github?.trim()) {
    errors.value.github = 'github link is required';
    isValid = false;
  }

  if (!isValidUrl(dataCopy.value.github)) {
    errors.value.liveLink = 'github link is not true';
    isValid = false;
  }

  return isValid;
};
</script>

<template>
  <div
    :class="[
      dialogeState ? 'scale-100' : 'scale-0',
      'dialoge fixed top-1/2 left-1/2 z-6000 flex max-h-[85vh] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-slate-800 p-4 pt-15 text-slate-950 duration-300 md:w-[30rem]',
    ]"
  >
    <div v-if="dataCopy && dialogeState" class="flex w-full flex-1 flex-col gap-3 overflow-y-auto px-2">
      <div class="img flex w-full justify-center">
        <img :src="dataCopy.image" alt="project" class="w-full" />
      </div>
      <div class="w-full">
        <labelComp label="Projects Image Link" class="m-0!" />
        <inputComp v-model="dataCopy.image" class="m-0!" :status="false" />
        <p v-if="errors.image" class="mt-1 text-sm text-red-500">
          {{ errors.image }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Project Title" class="m-0!" />
        <inputComp v-model="dataCopy.title" class="m-0!" :status="false" />
        <p v-if="errors.title" class="mt-1 text-sm text-red-500">
          {{ errors.title }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Projects Description" class="m-0!" />
        <inputComp v-model="dataCopy.description" class="m-0!" :status="false" />
        <p v-if="errors.description" class="mt-1 text-sm text-red-500">
          {{ errors.description }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Projects Categories" class="m-0!" />
        <selectionInputs :data="dataCopy.categories" v-model="selectedCats" />
        <p v-if="errors.categories" class="mt-1 text-sm text-red-500">
          {{ errors.categories }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Projects Live Link" class="m-0!" />
        <inputComp v-model="dataCopy.liveLink" class="m-0!" :status="false" />
        <p v-if="errors.liveLink" class="mt-1 text-sm text-red-500">
          {{ errors.liveLink }}
        </p>
      </div>
      <div class="w-full">
        <labelComp label="Projects Github Link" class="m-0!" />
        <inputComp v-model="dataCopy.github" class="m-0!" :status="false" />
        <p v-if="errors.github" class="mt-1 text-sm text-red-500">
          {{ errors.github }}
        </p>
      </div>

      <p
        class="mx-2 my-3 w-[95%] cursor-pointer rounded-2xl border border-slate-400 bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700"
        @click="save"
      >
        Save
      </p>
      <p @click="closeDialoge">
        <i class="fa-solid fa-x absolute top-5 right-5 cursor-pointer text-xl"></i>
      </p>
    </div>
  </div>
</template>
