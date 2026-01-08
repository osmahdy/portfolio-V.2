<script setup>
import alert from '../../../genralComp/alert.vue';
import { useSettings } from '../../../../store/settings.store';
import { signOut } from 'firebase/auth';
import router from '../../../../router';
import { auth } from '../../../../firebase/auth';
import { ref } from 'vue';

const store = useSettings();

const showAlert = ref(false);
const alertMessage = ref('');
const alertState = ref('good');

// true = CLOSED
const collapsBar = ref(true);

const logout = () => {
  store.logout();
  signOut(auth);
  showAlertFn('logged out successfully', 'good');
  setTimeout(() => router.push('/a-panel-login'), 3000);
};

const collaps = () => {
  collapsBar.value = !collapsBar.value;
};

const showAlertFn = (message, state) => {
  showAlert.value = false;
  setTimeout(() => {
    alertMessage.value = message;
    alertState.value = state;
    showAlert.value = true;
  }, 0);
};

const openSection = (e) => {
  store.setOpenedSection(e);
  collapsBar.value = true;
};

const sections = [
  { name: 'General', icon: 'fa-solid fa-viruses', id: 'general' },
  { name: 'Profile', icon: 'fa-solid fa-house text-lg', id: 'profile' },
  { name: 'Skills', icon: 'fa-solid fa-hexagon-nodes text-lg', id: 'skills' },
  { name: 'Experience', icon: 'fa-solid fa-user text-lg', id: 'experience' },
  { name: 'Projects', icon: 'fa-solid fa-graduation-cap text-lg', id: 'projects' },
];
</script>

<template>
  <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
  <!-- Overlay (ALL screens) -->
  <div v-if="!collapsBar" @click="collaps" class="fixed inset-0 z-40 bg-black/50"></div>

  <!-- Sidebar (Floating everywhere) -->
  <aside
    :class="[
      collapsBar ? '-translate-x-full' : 'translate-x-0',
      'fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between bg-slate-900 transition-transform duration-300',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center p-4">
      <p
        @click="collaps"
        :class="[
          collapsBar ? 'fixed top-5 -right-10 rounded-r-full bg-slate-500 p-2' : false,
          'z-50 cursor-pointer text-2xl',
        ]"
      >
        <i class="fa-solid fa-bars-staggered"></i>
      </p>
      <p class="ml-4 text-3xl font-bold">Dashboard</p>
    </div>

    <!-- Sections -->
    <nav class="flex-1">
      <div
        v-for="section in sections"
        :key="section.name"
        class="my-1 ml-5 flex cursor-pointer items-center gap-4 rounded-l-4xl p-3 px-6 text-xl transition hover:bg-slate-500"
        :class="[store.getOpenedSection === section.id ? 'bg-slate-500' : 'bg-transparent']"
        @click="openSection(section.id)"
      >
        <i :class="section.icon"></i>
        <span>{{ section.name }}</span>
      </div>
    </nav>

    <!-- Logout -->
    <p
      @click="logout"
      class="m-4 flex cursor-pointer items-center gap-3 rounded-xl p-3 text-lg transition hover:bg-red-500"
    >
      <i class="fa-solid fa-power-off"></i>
      <span>Log out</span>
    </p>
  </aside>
</template>
