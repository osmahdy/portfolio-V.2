import { createApp, watch } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/auth';
import { useSettings } from './store/settings.store';
import { useExperience } from './store/experience.store';
import { useSkills } from './store/skills.store';
import { useProfileStore } from './store/profile.store';
import { useProjectsStore } from './store/projects.store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

AOS.init({ duration: 800, once: true });

/**
 * 🔑 Restore auth state on refresh
 * This MUST exist
 */
let firstAuthCheck = true;
onAuthStateChanged(auth, async (user) => {
  const settingsStore = useSettings();
  settingsStore.setAuthenticated(!!user);
  settingsStore.setAuthenticated(true);

  settingsStore.setLoading(true);
  if (user) {
    await settingsStore.getLastSignInFromFirebase();

    // ✅ only update when user just signed in
    if (!firstAuthCheck) {
      await settingsStore.saveLastSignInToFirebase(new Date().toISOString());
      // await settingsStore.saveLastSignInToFirebase(new Date().toISOString());
    }
  }

  firstAuthCheck = false;
});
const profileStore = useProfileStore();
const experienceStore = useExperience();
const projectsStore = useProjectsStore();
const skillsStore = useSkills();
const settingsStore = useSettings();
watch(
  () => [experienceStore.loaded, profileStore.loaded, skillsStore.loaded, projectsStore.loaded],
  (loadedStates) => {
    if (loadedStates.every(Boolean)) {
      settingsStore.setLoading(false);
    }
  },
  { immediate: true },
);
app.mount('#app');
