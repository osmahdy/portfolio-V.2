<script setup>
import navlink from './navLink.vue';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const router = useRouter();
const route = useRoute();

function scrollOrRoute(path, sectionId) {
  if (route.path === path) {
    // Already on the route → scroll to section
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth',
      });
    }
  } else {
    // Not on the route → navigate normally
    router.push(path);
  }
}

const modeIcon = computed(() => (isDark.value ? 'fa-solid fa-sun' : 'fa-regular fa-moon'));

const animating = ref(false); 
const targetTheme = ref('to-dark'); // or to-light

function toggleTheme(e) { 

  // 👈 حدّد الثيم القادم
  targetTheme.value = isDark.value ? 'to-light' : 'to-dark';

  animating.value = true;

  // بدّل الثيم بعد ما الدائرة تغطي الشاشة
  setTimeout(() => {
    toggleDark();
  }, 300);

  setTimeout(() => {
    animating.value = false;
  }, 600);
}

const circleStyle = computed(() => ({ 
  left: '50%',
  top: '50%',
}));
</script>

<template>
  <nav
    class="text-s to-salte-700 fixed top-[10px] left-[50%] z-100 mt-[20px] flex translate-x-[-50%] items-center justify-center rounded-[40px] border-2 border-solid border-gray-600 bg-transparent bg-linear-to-b via-transparent py-[5px] text-gray-800 shadow-xl backdrop-blur-lg dark:border-gray-400 dark:from-slate-700 dark:text-gray-200"
  >
    <!-- home page -->
    <navlink
      to="landing"
      class="group relative flex items-center justify-center border-r-2 border-gray-600 px-1 dark:border-gray-400"
    >
      <!-- Hover & Active Circle -->

      <span
        class="group-exact-active:bg-blue-600 group-exact-active:text-white flex h-10 w-10 items-center justify-center rounded-full transition duration-300 group-active:bg-blue-600 group-active:text-white hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
      >
        <i class="fa-solid fa-house text-xl"></i>
      </span>
    </navlink>

    <div class="flex flex-wrap lg:flex-nowrap">
      <div class="flex flex-1">
        <!-- about section -->
        <navlink
          to="about"
          class="mx-[5px] flex flex-1 cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
        >
          <i class="fa-solid fa-user text-xl"></i>
          <p class="ml-[10px] hidden sm:block">About</p>
        </navlink>

        <!-- skills section -->
        <navlink
          to="skills"
          class="mx-[5px] flex flex-1 cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
        >
          <i class="fa-solid fa-hexagon-nodes text-xl"></i>
          <p class="ml-[10px] hidden sm:block">Skills</p>
        </navlink>

        <!-- learning section -->
        <navlink
          to="learning"
          class="mx-[5px] flex flex-1 cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
        >
          <i class="fa-solid fa-graduation-cap text-xl"></i>
          <p class="ml-[10px] hidden sm:block">Education</p>
        </navlink>
      </div>
      <div class="flex">
        <!-- work section -->
        <navlink
          to="work"
          class="mx-[5px] flex cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
          active-class="bg-[#9595954d] text-white"
          exact-active-class="bg-[#9595954d] text-white"
        >
          <i class="fa-solid fa-briefcase text-xl"></i>
          <p class="ml-[10px] hidden sm:block">Experience</p>
        </navlink>

        <!-- projects section -->
        <navlink
          to="projects"
          class="mx-[5px] flex cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
          active-class="bg-[#9595954d] text-white"
          exact-active-class="bg-[#9595954d] text-white"
        >
          <i class="fa-solid fa-diagram-project text-xl"></i>
          <p class="ml-[10px] hidden sm:block">Projects</p>
        </navlink>

        <!-- contact section -->
        <navlink
          to="contact"
          class="mx-[5px] flex cursor-pointer items-center justify-center rounded-[30px] px-[10px] py-[5px] text-inherit transition duration-500 hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
          active-class="bg-[#9595954d] text-white"
          exact-active-class="bg-[#9595954d] text-white"
        >
          <i class="fa-solid fa-envelope text-xl"></i>
          <p class="ml-[10px] hidden sm:block">Contact</p>
        </navlink>
      </div>
    </div>

    <!-- theme toggle -->
    <p
      class="relative z-50 cursor-pointer border-l-2 border-solid border-l-gray-600 px-1 text-inherit dark:border-l-gray-400"
      @click="toggleTheme"
    >
      <span
        class="group-exact-active:bg-blue-600 group-exact-active:text-white flex h-10 w-10 items-center justify-center rounded-full transition duration-300 group-active:bg-blue-600 group-active:text-white hover:bg-gray-400/40 dark:hover:bg-gray-400/30"
      >
        <i :class="[modeIcon, 'text-xl']"></i>
      </span>
    </p>
  </nav>
  <!-- Expanding circle -->
  <div v-if="animating" :style="circleStyle" :class="['theme-circle', targetTheme]" />
</template>

<style>
.active-link > span {
  background-color: #9595954d; /* blue-600 */
  color: white;
}
.theme-circle {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 0;
  animation: expand 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none;
}

.theme-circle.to-dark {
  background: #020617; /* slate-950 */
}

.theme-circle.to-light {
  background: #f1f5f9; /* slate-100 */
}

@keyframes expand {
  to {
    transform: translate(-50%, -50%) scale(150);
  }
}
</style>
