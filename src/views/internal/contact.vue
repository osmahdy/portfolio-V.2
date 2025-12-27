<template>
  <div class="about relative z-1">
    <shadowCircle></shadowCircle>
    <div class="container mx-auto flex min-h-dvh items-center justify-center px-5">
      <navBar />
      <h1>contact page</h1>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/privateComp/navBar.vue';
import shadowCircle from '../../components/privateComp/shadowCircle.vue';
export default {
  components: {
    shadowCircle,
    navBar,
  },
};
</script>
