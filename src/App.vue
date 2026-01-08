<script setup>
import { useSettings } from './store/settings.store';
import { useProfileStore } from './store/profile.store';
import { useExperience } from './store/experience.store';
import { useSkills } from './store/skills.store';
import { useProjectsStore } from './store/projects.store';
import { onMounted, watch, onUnmounted } from 'vue';
import Loader from './components/genralComp/Loader.vue';

const profileStore = useProfileStore();
const experienceStore = useExperience();
const projectsStore = useProjectsStore();
const skillsStore = useSkills();
const settingsStore = useSettings();

onMounted(() => {
  // settingsStore.setLoading(true);
  experienceStore.subscribe();
  profileStore.subscribe();
  skillsStore.subscribe();
  projectsStore.subscribe();
});

// watch(
//   () => [experienceStore.loaded, profileStore.loaded, skillsStore.loaded, projectsStore.loaded],
//   (loadedStates) => {
//     if (loadedStates.every(Boolean)) {
//       settingsStore.setLoading(false);
//     }
//   },
//   { immediate: true },
// );

onUnmounted(() => {
  experienceStore.unsubscribe();
  profileStore.unsubscribe();
  skillsStore.unsubscribe();
  projectsStore.unsubscribe();
});
</script>

<template>
  <div v-if="settingsStore.isLoading">
    <Loader />
    <!-- <ArrowLoader /> -->
    <!-- <RingLoader /> -->
  </div>
  <div v-else >
    <router-view />
  </div>
</template>
