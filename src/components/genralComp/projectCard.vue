<script setup>
import { computed, ref, defineProps, inject, onMounted } from 'vue';
import tag from './tag.vue';

const animationType = inject('animationType');
const animationDuration = inject('animationDuration');
const animationDelay = inject('animationDelay');
const animationTiming = inject('animationTiming');
const props = defineProps({
  projectData: {
    type: Array,
    required: true,
  },
});

const MAX_LENGTH = window.innerWidth < 768 ? 2 : 3;
// This stores which text blocks are expanded
const showAll = ref(false);

// full filtered projects
const allProjects = computed(() => props.projectData);

// projects to display
const visibleProjects = computed(() => {
  if (showAll.value) return allProjects.value;
  return allProjects.value.slice(0, MAX_LENGTH);
});

// show button only if needed
const showViewMoreButton = computed(() => {
  return allProjects.value.length > MAX_LENGTH;
});

// Toggle expand/collapse
const toggle = () => {
  showAll.value = !showAll.value;
};
onMounted(() => {
  console.log('project card section: ', visibleProjects);
});
</script>

<template>
  <div class="projectsSection" id="projects">
    <div
      class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
      :data-aos="animationType"
      :data-aos-duration="animationDuration"
      :data-aos-delay="animationDelay"
      :data-aos-easing="animationTiming"
    >
      <div
        class="projectCard relative rounded-lg bg-gray-400 p-2 shadow-lg hover:shadow-xl dark:bg-gray-800"
        v-for="(data, index) in visibleProjects"
        :key="index"
      >
        <img v-if="data.image" :src="data.image" alt="" class="projectImg w-full rounded-lg" />

        <div
          class="floating absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col justify-center rounded-lg bg-gray-500/90 p-5 opacity-0 transition-all duration-300 dark:bg-gray-800/90"
        >
          <h3 class="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">{{ data.title }}</h3>
          <p class="mb-4 font-semibold text-gray-800 dark:text-gray-300">{{ data.description }}</p>
          <div class="tags flex flex-wrap justify-center">
            <tag
              v-if="data.tags"
              v-for="tagVal in data.tags"
              :tag-name="tagVal"
              class="!rounded-2xl"
              :tag-type="data.tagType"
            />
          </div>
          <div class="flex flex-wrap items-center justify-center">
            <a
              :href="data.liveLink"
              class="m-2 w-fit rounded-lg bg-slate-400 px-5 text-lg font-semibold hover:underline dark:bg-slate-800"
              >View Project</a
            >
            <a
              :href="data.github"
              class="m-2 w-fit rounded-lg bg-slate-400 px-5 text-lg font-semibold hover:underline dark:bg-slate-800"
              >GitHub</a
            >
          </div>
        </div>
      </div>
    </div>
    <button
      class="my-5 w-full border border-solid !border-gray-500 bg-slate-400 text-gray-800 duration-300 hover:bg-slate-500 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-600"
      v-if="showViewMoreButton"
      @click="toggle"
    >
      {{ showAll ? 'View Less' : 'View More' }}
    </button>
  </div>
</template>

<style scoped>
.projectCard {
  position: relative;
  overflow: hidden;
}

.projectImg {
  transition: 0.3s;
}

.floating {
  transition: 0.3s;
}

/* hover on parent */
.projectCard:hover .floating {
  opacity: 100%;
}

.projectCard:hover .projectImg {
  filter: blur(4px);
  transform: scale(1.05);
}
</style>
