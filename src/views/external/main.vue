<script setup>
import { onMounted, ref, provide } from 'vue';
import navBar from '../../components/privateComp/navBar.vue';
import landing from '../../components/sections/landing.vue';
import skills from '../../components/sections/skills.vue';
import shadowCircle from '../../components/privateComp/shadowCircle.vue';
import about from '../../components/sections/about.vue';
import learning from '../../components/sections/learning.vue';
import work from '../../components/sections/work.vue';
import projects from '../../components/sections/projects.vue';
import contact from '../../components/sections/contact.vue';
import footerSec from '../../components/sections/footer.vue';
import AOS from 'aos';
import Loader from '../../components/genralComp/Loader.vue';
import ArrowLoader from '../../components/genralComp/ArrowLoader.vue';
import RingLoader from '../../components/genralComp/RingLoader.vue';
import { useSettings } from '../../store/settings.store';
onMounted(() => {
  AOS.refresh();
});

const animationType = ref('fade-up');
const animationDuration = ref('600');
const animationDelay = ref('100');
const animationTiming = ref('ease-out-cubic');
provide('animationType', animationType);
provide('animationDuration', animationDuration);
provide('animationDelay', animationDelay);
provide('animationTiming', animationTiming);
// used inject in all animationed child components: eduPhase.vue / skillCard.vue / tag.vue / projectCard.vue / counter.vue

const settingsStore = useSettings();
</script>

<template>
  <div class="app w-full bg-slate-300 text-slate-900 xl:px-25 dark:bg-slate-950 dark:text-slate-100">
    <div class="mainPage relative overflow-hidden text-center">
      <div class="background-effects pointer-events-none fixed top-0 left-0 z-0 h-full w-full">
        <shadowCircle pos-x="0%" pos-y="0px" class="z-2" />
        <shadowCircle pos-x="100%" pos-y="100vh" class="z-2" />
      </div>
      <div class="z-3 container mx-auto px-5">
        <div class="landingPage m-auto w-full px-5" id="landing">
          <navBar />
          <landing
            class="z-3"
            data-aos="zoom-out"
            data-aos-duration="1000"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          />
        </div>
        <about
          id="about"
          class="relative z-3"
          :animation-type="animationType"
          :animation-duration="animationDuration"
          :animation-delay="animationDelay"
          :animation-timing="animationTiming"
        />

        <skills id="skills" class="relative z-3" />

        <learning id="learning" class="relative z-3" />

        <work id="work" class="relative z-3" />

        <projects id="projects" class="relative z-3" />

        <contact
          id="contact"
          class="relative z-3"
          :data-aos="animationType"
          :data-aos-duration="animationDuration"
          :data-aos-delay="animationDelay"
          :data-aos-easing="animationTiming"
        />

        <footerSec class="relative z-3" />
      </div>
    </div>
  </div>
</template>
