<script setup>
import eduPhase from './eduPhase.vue';
import subHeader from '../genralComp/subHeader.vue';
const props = defineProps({
  stagesData: {
    type: Array,
  },
  subHeaderTxt: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="timeLine">
    <subHeader v-if="subHeaderTxt" :title="subHeaderTxt" />
    <eduPhase :stagesData="stagesData" />
  </div>
</template>
