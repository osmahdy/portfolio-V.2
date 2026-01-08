<script setup>
import { useProfileStore } from '../../../../store/profile.store';
import { computed, ref } from 'vue';
import labelComp from '../general Comps/label.vue';
import inputComp from '../general Comps/input.vue';
import edit_save from '../general Comps/edit_save.vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import alert from '../../../genralComp/alert.vue';

const store = useProfileStore();

// card-level edit status
const status = ref(true); // true = readonly, false = editing

const confSave = ref(null);

// local copy of data to edit
const localData = ref({
  storyBoxDescription: store.storyBoxDescription,
});

const profileFields = computed(() => [
  {
    label: 'Story Description:',
    key: 'storyBoxDescription',
    placeholder: 'hero description',
  },
]);

const startEditing = () => {
  status.value = false;
};

const saveEdits = () => {
  status.value = true;

  confSave.value = true;

  // push local data to store
  store.setStoryBoxDescription(localData.value.storyBoxDescription);
  saveToDb();
};
const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveToFirebase();
  if (success) {
    // alertMsg.value = 'Saved to database';
    // alertState.value = 'good';
    showAlertFn('Saved to database', 'good');
  } else {
    // alertMsg.value = 'Failed to save to database';
    // alertState.value = 'bad';
    showAlertFn('Failed to save to database', 'bad');
  }
}

function showAlertFn(message, state) {
  showAlert.value = false;

  // wait for DOM update
  setTimeout(() => {
    alertMessage.value = message;
    alertState.value = state;
    showAlert.value = true;
  }, 0);
}
</script>

<template>
  <div class="generalInfo">
    <SubHeader heading="About section" class="flex-1" />
    <div
      class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start"
      v-for="field in profileFields"
      :key="field.key"
    >
      <labelComp :label="field.label" />
      <inputComp v-model="localData[field.key]" :placeholder="field.placeholder" :status="status" />
    </div>
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <edit_save v-model="confSave" card-id="about" @edit-click="startEditing" @save-click="saveEdits" />
  </div>
</template>
