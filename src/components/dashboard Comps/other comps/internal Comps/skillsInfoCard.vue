<script setup>
import { useSkills } from '../../../../store/skills.store';
import { ref, watch } from 'vue';
import card from '../general Comps/skillCard.vue';
import dialoge from '../general Comps/dialoge.vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import confDelete from '../general Comps/confDelete.vue';
import draggable from 'vuedraggable';
import alert from '../../../genralComp/alert.vue';
const store = useSkills();

const isOpen = ref(false);

const dialogeData = ref(null);

const deleteIndex = ref(null);

const confDelDialogeState = ref(false);

const deleteThing = ref(null);

const isReorderMode = ref(false);

const skills = ref(store.getSkills);

const localData = ref(skills.value);

watch(
  () => isOpen.value,
  (open) => {
    if (open) {
      requestAnimationFrame(() => {
        document.body.classList.add('no-scroll');
      });
    } else {
      document.body.classList.remove('no-scroll');
    }
  },
);

const openDialoge = (skill) => {
  if (isReorderMode.value) return;
  dialogeData.value = skill;
  isOpen.value = true;
};

const updateSkills = (e) => {
  const index = localData.value.findIndex((item) => item.id === e.id);

  if (index !== -1) {
    // ✏️ edit
    localData.value[index] = e;
  } else {
    // ➕ add
    localData.value.push(e);
  }
  store.setSkills(localData.value);
  isOpen.value = false;
  saveToDb();
};

function deleteSkill(e) {
  if (isReorderMode.value) return;
  deleteIndex.value = e;
  confDelDialogeState.value = true;
  deleteThing.value = localData.value[e].name;
}

function isDeleteConfermed(e) {
  if (deleteIndex.value === null) return;

  e ? localData.value.splice(deleteIndex.value, 1) : false;
  deleteIndex.value = null;
  confDelDialogeState.value = false;
  saveToDb();
}

const addSkill = () => {
  const uid = Date.now().toString(36);
  dialogeData.value = {
    id: uid,
    img: '',
    color: '',
    name: '',
    order: localData.value.length,
  };
  isOpen.value = true;
};

function ReorderMode() {
  if (isReorderMode.value) {
    // leaving reorder mode → save the order
    saveOrder();
  }
  isReorderMode.value = !isReorderMode.value;
}

function saveOrder() {
  localData.value.forEach((skill, index) => {
    skill.order = index;
  });
  store.setSkills([...localData.value]);
  saveToDb();
}

const closeDialoge = () => {
  isOpen.value = false;
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
  <div>
    <SubHeader heading="Skills" />
    <div class="my-5">
      <draggable
        v-model="localData"
        item-key="id"
        :disabled="!isReorderMode"
        handle=".drag-handle"
        class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <template #item="{ element: skill, index }">
          <div :class="[isOpen ? 'pointer-events-none' : 'pointer-events-auto']">
            <p class="m-auto w-full text-center" v-if="isReorderMode">
              <i class="fa-solid fa-grip drag-handle text-2xl text-slate-500"></i>
            </p>
            <div class="flex">
              <card
                :item="skill"
                :index="index"
                group-name="skills"
                @open-dialog="openDialoge"
                @delete-skill="deleteSkill(index)"
              />
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="flex w-full flex-wrap justify-center">
      <!-- add new skill  -->
      <p
        :class="[
          isReorderMode ? 'pointer-events-none' : 'pointer-events-auto',
          'mx-2 my-3 min-w-60 cursor-pointer rounded-2xl border border-slate-400 bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700',
        ]"
        @click="addSkill"
      >
        <i class="fa-solid fa-plus"></i>
        <span>Add New</span>
      </p>
      <!-- reorder skills -->
      <p
        class="mx-2 my-3 min-w-60 cursor-pointer rounded-2xl border border-slate-400 bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700"
        @click="ReorderMode"
      >
        {{ isReorderMode ? 'Save' : 'Reorder' }}
      </p>
    </div>
    <!-- overlay -->
    <div class="fixed inset-0 z-40 bg-black/50" v-if="isOpen" @click="closeDialoge"></div>
    <!-- delete card dialoge -->
    <confDelete
      :conf-del-dialoge-state="confDelDialogeState"
      @conf-delete="isDeleteConfermed"
      :delete-thing="deleteThing"
    />
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <dialoge v-model="isOpen" :data="dialogeData" @save="updateSkills" />
  </div>
</template>
