<script setup>
import sideBar from '../../components/dashboard Comps/other comps/general Comps/sideBar.vue';
import experience from '../../components/dashboard Comps/sections/experience.vue';
import profile from '../../components/dashboard Comps/sections/profile.vue';
import skills from '../../components/dashboard Comps/sections/skills.vue';
import projects from '../../components/dashboard Comps/sections/projects.vue';
import general from '../../components/dashboard Comps/sections/general.vue';
import { useSettings } from '../../store/settings.store';
import Loader from '../../components/genralComp/Loader.vue';
import ArrowLoader from '../../components/genralComp/ArrowLoader.vue';
import RingLoader from '../../components/genralComp/RingLoader.vue';
const settingsStore = useSettings();
</script>

<template>
  <div>
    <div
      class="flex h-full min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 xl:px-25"
    >
      <div class="dashboardPage mb-10 flex min-h-screen w-full">
        <sideBar />
        <div class="z-3 container mx-auto px-5">
          <div class="sections">
            <general v-show="settingsStore.getOpenedSection === 'general' ? true : false" />
            <profile v-show="settingsStore.getOpenedSection === 'profile' ? true : false" />
            <experience v-show="settingsStore.getOpenedSection === 'experience' ? true : false" />
            <skills v-show="settingsStore.getOpenedSection === 'skills' ? true : false" />
            <projects v-show="settingsStore.getOpenedSection === 'projects' ? true : false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
