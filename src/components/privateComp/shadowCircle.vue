<template>
  <div
    class="absolute z-1 h-[400px] w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-blue-500/70 shadow-[0_0_70px_90px] shadow-blue-500/70 md:shadow-[0_0_140px_180px] dark:bg-slate-900 dark:shadow-slate-900"
    :style="{ top: posY, left: posX }"
  ></div>
</template>
<script>
export default {
  props: {
    posX: {
      type: String,
    },
    posY: {
      type: String,
    },
  },
};
</script>
