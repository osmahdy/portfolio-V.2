<script setup>
import { defineProps, ref } from 'vue';
import sectionHeader from '../genralComp/sectionHeader.vue';
import imgContainer from '../genralComp/imgContainer.vue';
import textBox from '../genralComp/textBox.vue';
import { useProfileStore } from '../../store/profile.store';
const store = useProfileStore();
const props = defineProps({
  animationType: {
    type: String,
  },
  animationDuration: {
    type: String,
  },
  animationDelay: {
    type: String,
  },
  animationTiming: {
    type: String,
  },
});
</script>

<template>
  <div class="size-full">
    <sectionHeader heading="About Me"></sectionHeader>
    <div class="bottom flex flex-col items-center justify-center lg:flex-row">
      <div class="order-1 sm:order-0">
        <imgContainer
          v-if="store.getProfileImg2"
          :img-src="store.getProfileImg2"
          class="flex justify-center"
          img-style="min-w-sm max-w-sm md:m-10"
          :rounded-value="5"
          :data-aos="animationType"
          :data-aos-duration="animationDuration"
          :data-aos-delay="animationDelay"
          :data-aos-easing="animationTiming"
          v-show="!store.gethHideAboutImg"
        ></imgContainer>
        <a
          download
          class="m-auto my-3 block rounded-lg border border-solid !border-gray-500 bg-slate-400 px-6 py-3 text-xl font-semibold text-gray-800 duration-300 hover:bg-slate-500 md:w-[85%] dark:bg-gray-950 dark:text-white dark:hover:bg-gray-600"
          :href="store.formatDriveDownloadLink(store.getCvLink)"
        >
          <!-- :href="store.formatCvLink(store.getCvLink)" -->
          Download My CV
        </a>
      </div>
      <div class="order-0 flex flex-col sm:order-1">
        <div
          :data-aos="animationType"
          :data-aos-duration="animationDuration"
          :data-aos-delay="animationDelay"
          :data-aos-easing="animationTiming"
        >
          <textBox title="My Story" :texts="store.getStoryDescription"></textBox>
        </div>
        <div
          :data-aos="animationType"
          :data-aos-duration="animationDuration"
          :data-aos-delay="animationDelay"
          :data-aos-easing="animationTiming"
        >
          <textBox class="text-start" :texts="store.getDetailsBox"></textBox>
        </div>
      </div>
    </div>
  </div>
</template>
