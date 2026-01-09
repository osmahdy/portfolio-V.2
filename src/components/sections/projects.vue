<script setup>
import sectionHeader from '../genralComp/sectionHeader.vue';
import projectsBar from '../privateComp/projectsBar.vue';
import projectCard from '../genralComp/projectCard.vue';
import { useProjectsStore } from '../../store/projects.store';
import { ref, onMounted, watch, nextTick } from 'vue';

const projectsStore = useProjectsStore();

const currentHeight = ref(0);

function onSectionHeight(height) {
  currentHeight.value = height;
}
</script>

<template>
  <div class=" ">
    <sectionHeader heading="My Projects" />
    <projectsBar />

    <div class="sections-viewport w-full overflow-hidden" :style="{ height: currentHeight + 'px' }">
      <div
        class="sections flex w-[250%] gap-15 transition-transform duration-500"
        :style="{
          width: projectsStore.getCategories.length * 100 + '%',
          transform: `translateX(-${projectsStore.getCategoryClickedIndex * (100 / projectsStore.getCategories.length)}%)`,
        }"
      >
        <div v-for="(cat, index) in projectsStore.getCategories" :key="cat.name" :class="[cat.name, 'w-full px-10']">
          <projectCard
            :project-data="projectsStore.getProjectsByCategory(cat.name)"
            @update-height="onSectionHeight"
            :active="cat.name === projectsStore.getCategoryClicked.name ? true : false"
            :is-initial="projectsStore.getCategoryClickedIndex === -1 && index === 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
