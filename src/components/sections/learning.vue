<script setup>
import sectionHeader from '../genralComp/sectionHeader.vue';
import tagsBox from '../privateComp/tagsBox.vue';
import timeLine from '../privateComp/timeLine.vue';
import { useExperience } from '../../store/experience.store';
const store = useExperience();
const type = 'study';
</script>
<template>
  <div class="learning h-full min-h-100 w-full">
    <sectionHeader heading="My Learning Journey"></sectionHeader>
    <div class="flex flex-col items-start justify-between md:flex-row">
      <timeLine :stages-data="store.getEduData" sub-header-txt="Education" :type="type" />
      <tagsBox :tags="store.getTagsList" />
    </div>
  </div>
</template>
