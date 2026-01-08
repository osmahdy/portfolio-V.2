<script setup>
import { useProjectsStore } from '../../store/projects.store';
import { ref } from 'vue';
const projectsStore = useProjectsStore();
const categories = ref(projectsStore.getCategories);
</script>
<template>
  <div
    class="mx-auto my-10 flex flex-wrap w-fit items-center justify-center gap-4 rounded-full rounded-xl bg-slate-400 px-4 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  >
    <p
      class="mx-1 cursor-pointer p-1 text-center font-semibold duration-300 md:p-2 md:text-lg"
      v-for="(cat, index) in categories"
      :key="index"
      :class="{ active: projectsStore.getCategoryClicked === cat }"
      @click="projectsStore.setCategoryClicked(cat)"
    >
      {{ cat.name }}
    </p>
  </div>
</template>

<style scoped>
p,
.active {
  position: relative;
}

p::after,
p::before {
  transition: all 0.3s ease;
}
p::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  border: 2px solid transparent;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  pointer-events: none;
}
/* ACTIVE STATE */
.active::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  border: 2px solid #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  z-index: 1;
}

/* HOVER STATE */
p:hover::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  border: 2px solid #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}
p::after {
  opacity: 0;
  transform: scale(0.9);
}

.active::after,
p:hover::after {
  opacity: 1;
  transform: scale(1);
}
</style>
