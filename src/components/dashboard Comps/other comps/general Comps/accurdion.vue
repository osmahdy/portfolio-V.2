<script setup>
import { watch, ref } from 'vue';
import labelComp from '../general Comps/label.vue';
import inputComp from '../general Comps/input.vue';
import checkInput from '../general Comps/checkInput.vue';
import edit_save from '../general Comps/edit_save.vue';
import confDelete from './confDelete.vue';
import draggable from 'vuedraggable';
const props = defineProps({
  index: Number,
  groupName: String,
  modelValue: Array,
});

const status = ref(true);

const sharedValue = ref(null);

const edit_saveRef = ref(null);

const deleteIndex = ref(null);

const confDelDialogeState = ref(false);

const deleteThing = ref(null);

const emit = defineEmits(['save', 'update:modelValue']);

const localModel = ref([...props.modelValue]);

// watch parent prop only when parent updates outside this component
watch(
  () => props.modelValue,
  (newVal) => {
    localModel.value = [...newVal];
  },
);

// only ONE open at a time
const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const errors = ref([]);

watch(
  localModel,
  (val) => {
    errors.value = val.map(() => ({
      period: '',
      title: '',
      subTitle: '',
      description: '',
    }));
  },
  { immediate: true },
);

function addEduPhase() {
  const newPhase = {
    id: Date.now(),
    period: '',
    title: '',
    subTitle: '',
    description: '',
    order: localModel.value.length,
    studyState: false,
  };

  localModel.value.push(newPhase);

  const newIndex = localModel.value.length - 1; // ✅ last item's index
  openIndex.value = newIndex; // directly set
  edit_saveRef.value.startEditing();
  status.value = false;

  errors.value.push({
    period: '',
    title: '',
    subTitle: '',
    description: '',
  });
}

function deleteEduPhase(e) {
  deleteIndex.value = e;
  confDelDialogeState.value = true;
  deleteThing.value = props.modelValue[e].title;
}

function isDeleteConfermed(e) {
  if (!confirm || deleteIndex.value === null) return;

  e ? localModel.value.splice(deleteIndex.value, 1) : false;

  // re-order after delete
  onReorder();

  deleteIndex.value = null;
  confDelDialogeState.value = false;
}

const onReorder = () => {
  localModel.value.forEach((step, index) => {
    step.order = index;
  });
};

const validate = () => {
  let isValid = true;
  const idx = openIndex.value;
  if (idx === null) return true;

  errors.value[idx] = {
    period: '',
    title: '',
    subTitle: '',
    description: '',
  };

  const item = localModel.value[idx];

  if (!item.period?.trim()) {
    errors.value[idx].period = 'period is required';
    isValid = false;
  }
  if (!item.title?.trim()) {
    errors.value[idx].title = 'title is required';
    isValid = false;
  }
  if (!item.description?.trim()) {
    errors.value[idx].description = 'description is required';
    isValid = false;
  }

  return isValid;
};

const startEditing = () => {
  status.value = false;
};

const saveEdits = () => {
  if (!validate()) return;

  status.value = true;
  sharedValue.value = true;

  onReorder();

  const payload = localModel.value.slice().sort((a, b) => a.order - b.order);

  emit('update:modelValue', payload);
  emit('save', payload);
};
</script>

<template>
  <div>
    <draggable v-model="localModel" item-key="id" :disabled="status" @end="onReorder" handle=".drag-handle">
      <template #item="{ element: item, index }">
        <div class="my-2 overflow-hidden">
          <!-- data viewed-->
          <div class="flex items-center justify-between">
            <p v-if="!status" class="drag-handle">
              <i class="fa-solid fa-grip-vertical text-2xl text-slate-500"></i>
            </p>
            <div
              class="flex w-full cursor-pointer items-center justify-between rounded-3xl border border-slate-400 bg-slate-800 p-4"
            >
              <div class="flex flex-col font-semibold md:flex-row md:items-center" @click="toggle(index)">
                <p class="min-w-35">{{ item.period.substring(0, 17) }}</p>
                <p class="border-solid border-transparent border-l-slate-300 md:ml-5 md:border md:pl-5">
                  {{ item.title.substring(0, 30) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="m-1 cursor-pointer text-lg duration-300 hover:scale-110" @click="deleteEduPhase(index)">
                  <i class="fa-solid fa-trash"></i>
                </p>
                <p @click="toggle(index)">
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': openIndex === index }"
                  />
                </p>
              </div>
            </div>
          </div>
          <!-- data hidden-->
          <div
            class="p-4 py-0 transition-all duration-500 ease-in-out"
            :class="openIndex === index ? 'max-h-[1000px] py-4 opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start">
              <labelComp label="Period" />
              <div class="w-full">
                <inputComp v-model="item.period" :status="status" :size-allowed="17" />
                <p v-if="errors[index]?.period" class="mt-1 text-sm text-red-500">
                  {{ errors[index]?.period }}
                </p>
              </div>
            </div>
            <div class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start">
              <labelComp label="Title" />
              <div class="w-full">
                <inputComp v-model="item.title" :status="status" :size-allowed="30" />
                <p v-if="errors[index]?.title" class="mt-1 text-sm text-red-500">
                  {{ errors[index]?.title }}
                </p>
              </div>
            </div>
            <div class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start">
              <labelComp label="SubTitle" />
              <div class="w-full">
                <inputComp v-model="item.subTitle" :status="status" :size-allowed="30" />
                <p v-if="errors[index]?.subTitle" class="mt-1 text-sm text-red-500">
                  {{ errors[index]?.subTitle }}
                </p>
              </div>
            </div>
            <div class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start">
              <labelComp label="Description" />
              <div class="w-full">
                <inputComp v-model="item.description" :status="status" :size-allowed="300" />
                <p v-if="errors[index]?.description" class="mt-1 text-sm text-red-500">
                  {{ errors[index]?.description }}
                </p>
              </div>
            </div>
            <div class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start">
              <labelComp :label="`${groupName} State`" />
              <checkInput
                v-model="item[groupName === 'work' ? 'workState' : 'studyState']"
                :group-name="`${groupName}-${index}`"
                :status="status"
              />
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <!-- Add new Phase -->
    <div
      class="mb-4 flex w-full cursor-pointer items-center justify-center rounded-t-3xl bg-slate-600 p-2 duration-300 hover:bg-slate-500"
      @click="addEduPhase"
    >
      <!-- @click="addEduPhase" -->
      <p class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-950">
        <i class="fa-solid fa-plus text-2xl text-white"></i>
      </p>
    </div>
    <!-- confirm delete -->
    <confDelete
      :conf-del-dialoge-state="confDelDialogeState"
      @conf-delete="isDeleteConfermed"
      :delete-thing="deleteThing"
    />
    <edit_save
      ref="edit_saveRef"
      :card-id="groupName"
      @edit-click="startEditing"
      v-model="sharedValue"
      @save-click="saveEdits"
    />
  </div>
</template>
