<script setup>
import flasher from '../genralComp/flasher.vue';
</script>
<template>
  <div class="img relative z-3">
    <img
      v-if="imgSrc"
      :src="imgSrc"
      alt="profile Img"
      :class="['z-1', imgStyle]"
      :style="{ borderRadius: `${roundedValue}%` }"
    />
    <flasher></flasher>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    imgSrc: {
      type: String,
    },
    roundedValue: {
      type: Number,
      default: 50,
    },
    imgStyle: {
      type: String,
    },
  },
};
</script>
