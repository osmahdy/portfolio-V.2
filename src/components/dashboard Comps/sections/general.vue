<script setup>
import dashboardHeader from '../other comps/general Comps/dashboardHeader.vue';
import dataCounter from '../other comps/general Comps/dataCounter.vue';
import { useProfileStore } from '../../../store/profile.store';
import { useProjectsStore } from '../../../store/projects.store';
import { useExperience } from '../../../store/experience.store';
import { useSkills } from '../../../store/skills.store';
import { useSettings } from '../../../store/settings.store';
import router from '../../../router';

const projectsStore = useProjectsStore();

const experienceStore = useExperience();

const skillsStore = useSkills();

const profileStore = useProfileStore();

const store = useSettings();

store.setLastSignIn(new Date());

function downloadDB() {
  const data = {
    allData: profileStore.getAllData(),
    skills: skillsStore.getSkills,
    eduction: experienceStore.getEduData,
    tagsList: experienceStore.getTagsList,
    work: experienceStore.getWorkData,
    counters: experienceStore.getCounterData, 
    projects: projectsStore.getProjectsData,
    categories: store.getCategories,
    settings: { 'Last SignIn': store.getLastSignIn },
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
function GoHome() {
  router.push('/');
}
</script>
<template>
  <div class="general md:p-5" id="general">
    <dashboardHeader header="GENERAL SECTION" />
    <div class="my-5 flex flex-col items-center justify-center">
      <div class="lastSignIng">
        <p
          class="mt-10 flex flex-row flex-wrap items-center justify-center text-center text-2xl text-slate-300 md:text-3xl"
        >
          <!-- {{ store.getLastSignIn }} -->
          <span class="mr-5 font-bold">Last Sign In:</span>
          <span> {{ store.timeAgo(store.getLastSignIn) }}</span>
        </p>
      </div>
      <div class="grid w-full grid-cols-1 gap-5 p-5 md:grid-cols-2">
        <dataCounter label="Projects Count" :count="projectsStore.getProjectsData.length" />

        <dataCounter label="Skills Count" :count="skillsStore.getSkills.length" />
        <dataCounter label="Education Count" :count="experienceStore.getEduData.length" />
        <dataCounter label="Work Count" :count="experienceStore.getWorkData.length" />
      </div>
      <div class="flex flex-col items-center justify-center md:flex-row">
        <button
          @click="downloadDB"
          class="flex min-h-12 min-w-60 cursor-pointer items-center justify-center rounded-xl border border-slate-400! bg-slate-800 px-3 py-2 text-lg! text-white duration-300 outline-none! select-none hover:bg-slate-700 md:ml-5"
        >
          Download Backup
        </button>
        <a
          @click="GoHome"
          target="_blank"
          class="my-3 flex min-h-12 min-w-60 cursor-pointer items-center justify-center rounded-xl border border-slate-400! bg-slate-800 px-3 py-2 text-lg! text-white duration-300 outline-none! select-none hover:bg-slate-700 md:ml-5"
        >
          Go Home
        </a>
      </div>
    </div>
  </div>
</template>
