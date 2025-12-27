<script setup>
import eduPhase from './eduPhase.vue';
import subHeader from '../genralComp/subHeader.vue';
import { onMounted } from 'vue';
const props = defineProps({
  stagesData: {
    type: Array,
  },
  subHeaderTxt: {
    type: String,
    required: false,
  },
});
onMounted(() => {
  // console.log('stagesData timeline secion', props.stagesData);
});
</script>
<template>
  <div class="timeLine">
    <subHeader v-if="subHeaderTxt" :title="subHeaderTxt" />
    <eduPhase :stagesData="stagesData" />
  </div>
</template>
