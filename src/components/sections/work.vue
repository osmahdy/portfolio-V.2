<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import sectionHeader from '../genralComp/sectionHeader.vue';
import timeLine from '../privateComp/timeLine.vue';
import counter from '../genralComp/counter.vue';
import { useExperience } from '../../store/experience.store';
const store = useExperience();
const type = 'work';
const counterSec = ref(null);
const activateCounter = ref(false); // boolean to pass to child

function printOffset() {
  if (!counterSec.value) return;
  const rect = counterSec.value.getBoundingClientRect();

  if (rect.top <= window.innerHeight - 500 && rect.bottom >= 0) {
    if (!activateCounter.value) {
      activateCounter.value = true; // trigger child
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', printOffset);
  printOffset(); // initial print
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', printOffset);
});
</script>
<template>
  <div class="work h-full min-h-100" ref="counterSec">
    <sectionHeader heading="My Exprience Working"></sectionHeader>
    <div class="flex flex-col items-start justify-between md:flex-row">
      <timeLine :stages-data="store.getWorkData" :type="type" />
      <div class="mt-8 flex w-full flex-wrap items-center justify-center md:mt-0 md:w-fit md:flex-col md:items-end">
        <counter :count-data="store.getCounterData" :activate="activateCounter" />
      </div>
    </div>
  </div>
</template>
