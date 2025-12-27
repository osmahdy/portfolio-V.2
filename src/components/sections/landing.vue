<script setup>
import imgContainer from '../genralComp/imgContainer.vue';
import { useProfileStore } from '../../store/profile.store';
const store = useProfileStore();
</script>
<template>
  <div class="landingDetails m-auto w-full px-5 pt-50 md:pt-30 lg:flex-row">
    <imgContainer
      v-if="store.getProfileImg1"
      :img-src="store.getProfileImg1"
      class="flex justify-center"
      img-style="w-3xs "
    ></imgContainer>
    <div class="mt-10 size-full w-full text-center">
      <p class="w-full text-3xl font-bold lg:text-4xl">{{ store.getJobTitle }}</p>
      <p class="my-2 w-full text-2xl font-bold lg:text-4xl">
        Hi, I am
        <span class="animate-glow !text-3xl text-blue-500 lg:!text-5xl">{{ store.getName }}</span>
      </p>

      <p class="text-md m-auto my-5 text-center text-gray-800 md:w-[70%] lg:text-xl dark:text-gray-400">
        {{ store.getHeroDescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style></style>
