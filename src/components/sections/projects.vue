<script setup>
import sectionHeader from '../genralComp/sectionHeader.vue';
import projectsBar from '../privateComp/projectsBar.vue';
import projectCard from '../genralComp/projectCard.vue';
import { useProjectsStore } from '../../store/projects.store';
const projectsStore = useProjectsStore();
</script>

<template>
  <div class=" ">
    <sectionHeader heading="My Projects" />
    <projectsBar />
    <div class="sections-viewport w-full overflow-hidden">
      <div
        class="sections flex w-[200%] transition-transform duration-500"
        :style="{
          width: projectsStore.getCategories.length * 100 + '%',
          transform: `translateX(-${projectsStore.getCategoryClickedIndex * (100 / projectsStore.getCategories.length)}%)`,
        }"
      >
        <div v-for="cat in projectsStore.getCategories" :key="cat" :class="cat">
          <projectCard :project-data="projectsStore.getProjectsByCategory(cat)" />
        </div>
      </div>
    </div>
  </div>
</template>
