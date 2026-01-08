<script setup>
import { useExperience } from '../../../../store/experience.store';
import { ref } from 'vue';
import edit_save from '../general Comps/edit_save.vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import KeywordsInput from './KeywordsInput.vue';
import alert from '../../../genralComp/alert.vue';

const store = useExperience();

const status = ref(true);

const confSave = ref(null);

const tagsList = ref(store.getTagsList);

const localData = ref(store.getTagsList ? [...store.getTagsList] : []); // copy for editing
if (!localData.value) localData.value = [];

const startEditing = () => {
  status.value = false;
};

// only ONE open at a time
const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const saveEdits = () => {
  status.value = true;
  confSave.value = true;
  store.setTagsList([...localData.value]); // update store with current edits
  saveToDb();
};

const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveTagsToFirebase();
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
  <div class="tagsInfo">
    <SubHeader heading="Tags" class="flex-1" />
    <KeywordsInput v-model="localData" :disabled="status" />
    <edit_save v-model="confSave" card-id="tags" @edit-click="startEditing" @save-click="saveEdits" />
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
  </div>
</template>
