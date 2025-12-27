<script setup>
import { ref } from 'vue';
import skillCard from '../privateComp/skillCard.vue';
import sectionHeader from '../genralComp/sectionHeader.vue';
import { useSkills } from '../../store/skills.store';
const store = useSkills();
const test = ref('');
</script>
<template>
  <div class="skills relative">
    <sectionHeader heading="My Skills"></sectionHeader>
    <div class="skillCards grid justify-center-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <skillCard
        v-for="(skill, index) in store.getSkills"
        :key="index"
        :img-url="skill.img"
        :color="skill.color"
        :lan-name="skill.name"
      />
    </div>
  </div>
</template>
