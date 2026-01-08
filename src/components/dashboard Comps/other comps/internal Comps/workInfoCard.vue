<script setup>
import { useExperience } from '../../../../store/experience.store';
import { computed, ref } from 'vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import accurdion from '../general Comps/accurdion.vue';
import Edit_save from '../general Comps/edit_save.vue';
import alert from '../../../genralComp/alert.vue';
const store = useExperience();

const WorkData = ref(store.getWorkData);

const localData = ref(WorkData.value);

function saveData(data) {
  store.setWorkData(data);
  saveToDb();
}

const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveWorkToFirebase();
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
  <div class="workInfo">
    <SubHeader heading="Work section" class="flex-1" />
    <accurdion v-model="localData" group-name="work" @save="saveData" />
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
  </div>
</template>
