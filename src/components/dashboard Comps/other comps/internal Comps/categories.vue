<script setup>
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import { useProjectsStore } from '../../../../store/projects.store';
import { ref, computed } from 'vue';
import KeywordsInput from './KeywordsInput.vue';
import edit_save from '../general Comps/edit_save.vue';
import alert from '../../../genralComp/alert.vue';

const store = useProjectsStore();

const status = ref(true);

const sharedValue = ref(null);

const categories = ref(store.getCategories);

// const localCopy = ref([...categories.value]);
const localCopy = ref(store.getCategories ? [...store.getCategories] : []);

if (!localCopy.value) localCopy.value = [];

const startEditing = () => {
  status.value = false;
};

const saveEdits = () => {
  status.value = true;
  sharedValue.value = true;
  store.setCategory([...localCopy.value]);
  store.syncProjectsWithCategories();
  store.saveProjectsToFirebase();
  saveToDb();
  // Reset local copy to store's updated state
  localCopy.value = [...store.categories];
};

const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveCategoriesToFirebase();
  if (success) {
    // alertMsg.value = 'Saved to database';
    // alertState.value = 'good';
    store.setCategory([...localCopy.value]);
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
  <div>
    <SubHeader heading="Categories" />
    <KeywordsInput v-model="localCopy" :disabled="status" />
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <edit_save v-model="sharedValue" card-id="category" @edit-click="startEditing" @save-click="saveEdits" />
  </div>
</template>
