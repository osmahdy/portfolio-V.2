<script setup>
import { defineProps, inject } from 'vue';
import subHeader from '../genralComp/subHeader.vue';
import tag from '../genralComp/tag.vue';

const animationType = inject('animationType');
const animationDuration = inject('animationDuration');
const animationDelay = inject('animationDelay');
const animationTiming = inject('animationTiming');
const props = defineProps({
  tags: {
    type: Array,
    default: () => ['Html', 'Css', 'JS', 'Web Development'],
  },
});
</script>

<template>
  <div class="tag max-w-full md:max-w-[30%]">
    <subHeader title="Knowledges"></subHeader>
    <div class="mt-5 flex flex-wrap">
      <tag
        v-for="(tagVal, index) in tags"
        :tag-name="tagVal.name"
        :key="index"
        :data-aos="animationType"
        :data-aos-duration="animationDuration"
        :data-aos-delay="animationDelay"
        :data-aos-easing="animationTiming"
      />
    </div>
  </div>
</template>
