<script setup>
import { useProjectsStore } from '../../../../store/projects.store';
import { ref, watch } from 'vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import dialoge from '../general Comps/projectsDialoge.vue';
import confDelete from '../general Comps/confDelete.vue';
import draggable from 'vuedraggable';
import alert from '../../../genralComp/alert.vue';

const store = useProjectsStore();

const deleteIndex = ref(null);

const confDelDialogeState = ref(false);

const deleteThing = ref(null);

const projects = ref(store.getProjectsData);

const isReorderMode = ref(false);

const localData = ref(projects.value);

const isOpen = ref(false);
const dialogeData = ref(null);

const openDialoge = (proj) => {
  dialogeData.value = localData.value[proj];
  isOpen.value = true;
};

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

const updateProjects = (e) => {
  const index = localData.value.findIndex((item) => item.id === e.id);

  if (index !== -1) {
    // ✏️ edit
    localData.value[index] = e;
  } else {
    // ➕ add
    localData.value.push(e);
  }

  store.setProjects(localData.value);
  saveToDb();
  closeDialoge();
};

function deleteProject(e) {
  if (isReorderMode.value) return;
  deleteIndex.value = e;
  confDelDialogeState.value = true;
  deleteThing.value = localData.value[e].title;
}

function isDeleteConfermed(e) {
  if (deleteIndex.value === null) return;
  e ? localData.value.splice(deleteIndex.value, 1) : false;
  deleteIndex.value = null;
  confDelDialogeState.value = false;
  saveToDb();
}

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
  store.setProjects([...localData.value]);
  saveToDb();
}

const addProject = () => {
  if (isReorderMode.value) return;
  const lastIndedx = localData.value.length;
  const cats = store.getCategories;
  const newProjCats = cats.map((i) => ({
    category: i.name,
    checked: false,
  }));
  dialogeData.value = {
    id: `p${lastIndedx + 1}`,
    title: '',
    description: '',
    categories: newProjCats,
    image: '',
    liveLink: '',
    github: '',
    order: lastIndedx,
  };
  isOpen.value = true;
};

const closeDialoge = () => {
  isOpen.value = false;
};

const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveProjectsToFirebase();
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
  <div class="projects">
    <SubHeader heading="Projects" />
    <draggable
      v-model="localData"
      item-key="id"
      :disabled="!isReorderMode"
      handle=".drag-handle"
      :class="[isOpen ? 'pointer-events-none' : 'pointer-events-auto']"
    >
      <template #item="{ element: proj, index }">
        <div>
          <div class="flex items-center justify-center duration-300 hover:scale-102">
            <p class="text-center" v-if="isReorderMode">
              <i class="fa-solid fa-grip-vertical drag-handle text-2xl text-slate-500"></i>
            </p>
            <div
              class="my-3 flex w-full flex-col items-start justify-between rounded-2xl border border-slate-400 bg-slate-800 p-2 text-slate-200"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center justify-center">
                  <p class="p-1 text-xl font-bold">{{ proj.order + 1 }}.</p>
                  <p class="mx-3 w-30 text-lg font-semibold">{{ proj.title }}</p>
                </div>
                <div class="options flex items-center justify-center">
                  <p
                    class="m-1 cursor-pointer text-lg text-red-500 duration-300 hover:scale-110"
                    @click="deleteProject(index)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </p>
                  <p
                    class="m-1 cursor-pointer text-lg text-white duration-300 hover:scale-110"
                    @click="openDialoge(index)"
                  >
                    <i class="fa-solid fa-circle-info"></i>
                  </p>
                </div>
              </div>
              <div class="flex w-full flex-col items-center justify-between md:flex-row">
                <p class="w-full text-lg">{{ proj.description.substring(0, 60) }}...</p>
                <div class="flex items-center justify-center">
                  <div
                    class="my-2 flex items-center justify-center"
                    v-for="(cat, index) in proj.categories"
                    :key="index"
                  >
                    <p v-if="cat.checked" class="mx-1 rounded-full bg-slate-950 px-2 text-sm font-bold">
                      {{ cat.category }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <!-- add new project -->
    <div
      class="addProject my-3 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-600 p-2 text-slate-950 duration-300 hover:scale-102 hover:bg-slate-500"
      @click="addProject"
    >
      <p class="flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-slate-950">
        <i class="fa-solid fa-plus text-4xl text-white"></i>
      </p>
    </div>
    <!-- reOrder -->
    <div class="flex w-full items-center justify-center">
      <p
        class="mx-2 min-w-60 cursor-pointer rounded-2xl border border-slate-400 bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700"
        @click="ReorderMode"
      >
        {{ isReorderMode ? 'Save' : 'Reorder' }}
      </p>
    </div>
    <!-- overlay -->
    <div class="fixed inset-0 z-40 bg-black/50" v-if="isOpen" @click="closeDialoge"></div>
    <!-- delete dialoge -->
    <confDelete
      :conf-del-dialoge-state="confDelDialogeState"
      @conf-delete="isDeleteConfermed"
      :delete-thing="deleteThing"
    />
    <!-- alert -->
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <!-- dialoge -->
    <dialoge v-model="isOpen" :data="dialogeData" @save="updateProjects" />
  </div>
</template>

<style>
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
