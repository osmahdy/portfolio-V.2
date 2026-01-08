<script setup>
import dashboardHeader from '../other comps/general Comps/dashboardHeader.vue';
import projectsInfoCard from '../other comps/internal Comps/projectsInfoCard.vue';
import categories from '../other comps/internal Comps/categories.vue';
</script>

<template>
  <div class="projects md:p-5" id="projects">
    <dashboardHeader header="PROJECTS SECTION" />
    <categories />
    <projectsInfoCard />
  </div>
</template>
