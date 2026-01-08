<template>
  <main
    class="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 text-center text-white"
  >
    <div class="flex flex-col items-center gap-1">
      <!-- Row 1 -->
      <div class="flex">
        <div class="arrow up outer-18"></div>
        <div class="arrow down outer-17"></div>
        <div class="arrow up outer-16"></div>
        <div class="arrow down outer-15"></div>
        <div class="arrow up outer-14"></div>
      </div>

      <!-- Row 2 -->
      <div class="flex">
        <div class="arrow up outer-1"></div>
        <div class="arrow down outer-2"></div>
        <div class="arrow up inner-6"></div>
        <div class="arrow down inner-5"></div>
        <div class="arrow up inner-4"></div>
        <div class="arrow down outer-13"></div>
        <div class="arrow up outer-12"></div>
      </div>

      <!-- Row 3 -->
      <div class="flex">
        <div class="arrow down outer-3"></div>
        <div class="arrow up outer-4"></div>
        <div class="arrow down inner-1"></div>
        <div class="arrow up inner-2"></div>
        <div class="arrow down inner-3"></div>
        <div class="arrow up outer-11"></div>
        <div class="arrow down outer-10"></div>
      </div>

      <!-- Row 4 -->
      <div class="flex">
        <div class="arrow down outer-5"></div>
        <div class="arrow up outer-6"></div>
        <div class="arrow down outer-7"></div>
        <div class="arrow up outer-8"></div>
        <div class="arrow down outer-9"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
// no JS needed
</script>

<style scoped>
/* Arrow shape */
.arrow {
  width: 0;
  height: 0;
  margin: 0 -6px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 22px solid #fd7000;
  filter: drop-shadow(0 0 18px #fd7000);
  animation: blink 1s infinite;
}

.arrow.down {
  transform: rotate(180deg);
}

/* Animation */
@keyframes blink {
  0% {
    opacity: 0.1;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

/* Outer delays */
.outer-1 {
  animation-delay: -0.05s;
}
.outer-2 {
  animation-delay: -0.1s;
}
.outer-3 {
  animation-delay: -0.15s;
}
.outer-4 {
  animation-delay: -0.2s;
}
.outer-5 {
  animation-delay: -0.25s;
}
.outer-6 {
  animation-delay: -0.3s;
}
.outer-7 {
  animation-delay: -0.35s;
}
.outer-8 {
  animation-delay: -0.4s;
}
.outer-9 {
  animation-delay: -0.45s;
}
.outer-10 {
  animation-delay: -0.5s;
}
.outer-11 {
  animation-delay: -0.55s;
}
.outer-12 {
  animation-delay: -0.6s;
}
.outer-13 {
  animation-delay: -0.65s;
}
.outer-14 {
  animation-delay: -0.7s;
}
.outer-15 {
  animation-delay: -0.75s;
}
.outer-16 {
  animation-delay: -0.8s;
}
.outer-17 {
  animation-delay: -0.85s;
}
.outer-18 {
  animation-delay: -0.9s;
}

/* Inner delays */
.inner-1 {
  animation-delay: -0.16s;
}
.inner-2 {
  animation-delay: -0.32s;
}
.inner-3 {
  animation-delay: -0.48s;
}
.inner-4 {
  animation-delay: -0.64s;
}
.inner-5 {
  animation-delay: -0.8s;
}
.inner-6 {
  animation-delay: -1s;
}
</style>
