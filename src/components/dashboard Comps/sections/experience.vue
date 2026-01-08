<script setup>
import dashboardHeader from '../other comps/general Comps/dashboardHeader.vue';
import learningInfoCard from '../other comps/internal Comps/learningInfoCard.vue';
import workInfoCard from '../other comps/internal Comps/workInfoCard.vue';
import tagsnfoCard from '../other comps/internal Comps/tagsnfoCard.vue';
import countersInfoCard from '../other comps/internal Comps/countersInfoCard.vue';
</script>

<template>
  <div class="experience md:p-5" id="experience">
    <dashboardHeader header="EXPERIENCE SECTION" />
    <learningInfoCard />
    <tagsnfoCard />
    <workInfoCard />
    <countersInfoCard />
  </div>
</template>
