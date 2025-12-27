<script setup>
import tag from '../genralComp/tag.vue';
import { defineProps, inject } from 'vue';
import { useExperience } from '../../store/experience.store';
const store = useExperience();
const animationType = inject('animationType');
const animationDuration = inject('animationDuration');
const animationDelay = inject('animationDelay');
const animationTiming = inject('animationTiming');
const props = defineProps({
  stagesData: {
    type: Array,
  },
});
</script>

<template>
  <div
    :data-aos="animationType"
    :data-aos-duration="animationDuration"
    :data-aos-delay="animationDelay"
    :data-aos-easing="animationTiming"
  >
    <div
      class="flex max-w-[600px] p-5 pl-0 duration-300 hover:scale-105 lg:max-w-[800px]"
      v-for="(value, index) in stagesData"
      :key="index"
    >
      <div
        class="icon relative mx-5 w-20 before:absolute before:top-0 before:left-[50%] before:-z-1 before:h-full before:w-[2px] before:-translate-x-[50%] before:bg-slate-400"
      >
        <p
          class="absolute top-0 left-[50%] flex h-10 !w-10 -translate-x-[50%] items-center justify-center rounded-full bg-slate-400"
        >
          <!-- working -->
          <i class="fa-solid fa-laptop-code text-2xl" v-if="!value.studyState && value.workState"></i>
          <!-- still study -->
          <i class="fa-solid fa-book-open text-2xl" v-else-if="value.studyState && !value.workState"></i>
          <!-- finished -->
          <i class="fa-solid fa-graduation-cap text-2xl" v-else></i>
        </p>
      </div>

      <div class="data text-start">
        <tag :tag-name="value.period" class="!m-0 !mb-3 !rounded-2xl" />
        <p class="pb-3 text-2xl font-semibold text-gray-800 dark:text-white" v-if="value.title">{{ value.title }}</p>
        <p class="-mt-3 pb-3 text-sm font-semibold text-gray-800 dark:text-white" v-if="value.subTitle">
          {{ value.subTitle }}
        </p>
        <p class="text-lg text-gray-800 dark:text-gray-400">
          {{ value.description }}
        </p>
        <div class="tags flex">
          <tag v-if="value.tags" v-for="tag in value.tags" :tag-name="tag" :tag-type="value.tagType" />
          <!-- <div class="tags flex mt-2 text-lg">
              <div v-if="value.tags" v-for="tag in value.tags" :class="tag"></div>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
