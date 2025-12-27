<script setup>
import socialMedia from '../genralComp/socialMedia.vue';
import { useProfileStore } from '../../store/profile.store';
const store = useProfileStore();
</script>

<template>
  <footer class="w-full rounded-3xl border-2 border-solid border-slate-700 px-5">
    <div class="up flex flex-col items-center justify-between lg:flex-row">
      <div class="left flex flex-col items-center justify-start md:flex-row">
        <img v-if="store.getIconLink" :src="store.getIconLink" alt="logo" class="w-30 rounded-3xl" />
        <div
          class="quote px-5 text-gray-800 md:border md:border-solid md:border-transparent md:border-l-slate-700 md:text-lg dark:text-gray-200"
        >
          {{ store.getFooterHook }}
        </div>
      </div>
      <div class="media flex">
        <socialMedia type="gmail" :link="store.getEmailLink" />
        <socialMedia type="linkedin" :link="store.getLinkedIn" />
        <socialMedia type="github" :link="store.getGithub" />
        <socialMedia type="whatsapp" :link="store.getWhatsappLink" />
        <socialMedia type="instagram" :link="store.getInstagram" />
      </div>
    </div>

    <div
      class="copright flex w-full flex-wrap items-center justify-center border border-solid border-transparent border-t-slate-700 py-3 text-gray-800 md:text-lg dark:text-gray-200"
    >
      <i class="fa-solid fa-copyright"></i>
      <span class="mx-2">2025 - {{ new Date().getFullYear() }}</span>
      <p>{{ store.getFooterCopyrights }}</p>
    </div>
  </footer>
</template>
