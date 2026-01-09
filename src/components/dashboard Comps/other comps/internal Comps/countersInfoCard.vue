<script setup>
import { defineProps } from 'vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import { useExperience } from '../../../../store/experience.store';
import { ref } from 'vue';
import labelComp from '../general Comps/label.vue';
import inputComp from '../general Comps/input.vue';
import edit_save from '../general Comps/edit_save.vue';
import alert from '../../../genralComp/alert.vue';

const store = useExperience();

const status = ref(true);

const confSave = ref(null);

const props = defineProps({
  data: Array,
});

const countersData = ref(store.getCounterData);

const localData = ref(countersData.value);

const startEditing = () => {
  status.value = false;
};

const saveEdits = () => {
  status.value = true;
  confSave.value = true;
  store.setCounterData(localData.value);
  saveToDb();
};

const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);
async function saveToDb() {
  const success = await store.saveCountersToFirebase();
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
  <div class="countersCard">
    <div>
      <SubHeader heading="Counters" />
      <div class="flex">
        <labelComp label="Count" class="min-w-28!" />
        <labelComp label="Title" />
      </div>
      <div v-for="item in countersData" class="flex">
        <inputComp v-model="item.num" :status="status" :is-counter="true" />
        <inputComp v-model="item.label" :status="status" class="w-full!" />
      </div>
    </div>
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <edit_save v-model="confSave" card-id="counters" @edit-click="startEditing" @save-click="saveEdits" />
  </div>
</template>
