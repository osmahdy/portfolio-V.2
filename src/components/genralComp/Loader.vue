<template>
  <div
    class="relative h-dvh w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
  >
    <!-- ===== SHIP ===== -->
    <div class="ship absolute top-1/2 left-1/2 -translate-x-1/2">
      <!-- streak holder -->
      <span class="streak-holder">
        <span class="fazer f1"></span>
        <span class="fazer f2"></span>
        <span class="fazer f3"></span>
        <span class="fazer f4"></span>
      </span>

      <!-- base -->
      <div class="base">
        <span></span>
        <div class="face"></div>
      </div>
    </div>

    <!-- ===== BACKGROUND SPEED LINES ===== -->
    <div class="longfazers absolute inset-0">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- text -->
    <h1 class="absolute top-[58%] left-1/2 -translate-x-1/2 text-xs font-semibold uppercase">Loading...</h1>
  </div>
</template>

<script setup>
// no JS needed
</script>

<style scoped>
/* ================== SHIP ================== */
.ship {
  animation: speeder 0.4s linear infinite;
  position: absolute;
}

/* top streak bar */
.streak-holder {
  height: 5px;
  width: 35px;
  background: #fff;
  position: absolute;
  top: -19px;
  left: 60px;
  border-radius: 2px 10px 1px 0;
}

/* ================== BASE ================== */
.base span {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-right: 100px solid #fff;
  border-bottom: 6px solid transparent;
}

.base span::before {
  content: '';
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  right: -110px;
  top: -16px;
}

.base span::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-right: 55px solid #fff;
  border-bottom: 16px solid transparent;
  top: -16px;
  right: -98px;
}

/* ================== FACE ================== */
.face {
  position: absolute;
  height: 12px;
  width: 20px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  transform: rotate(-40deg);
  right: -125px;
  top: -15px;
}

.face::after {
  content: '';
  height: 12px;
  width: 12px;
  background: #fff;
  right: 4px;
  top: 7px;
  position: absolute;
  transform: rotate(40deg);
  border-radius: 0 0 0 2px;
}

/* ================== FAZERS ================== */
.fazer {
  width: 30px;
  height: 1px;
  background: #fff;
  position: absolute;
}

.f1 {
  animation: fazer1 0.2s linear infinite;
}
.f2 {
  top: 3px;
  animation: fazer2 0.4s linear infinite;
}
.f3 {
  top: 1px;
  animation: fazer3 0.4s linear infinite;
  animation-delay: -1s;
}
.f4 {
  top: 4px;
  animation: fazer4 1s linear infinite;
  animation-delay: -1s;
}

/* ================== BACKGROUND LINES ================== */
.longfazers span {
  position: absolute;
  height: 2px;
  width: 20%;
  background: #fff;
  opacity: 0.7;
}

.longfazers span:nth-child(1) {
  top: 20%;
  animation: lf 0.6s linear infinite;
}
.longfazers span:nth-child(2) {
  top: 40%;
  animation: lf2 0.8s linear infinite;
}
.longfazers span:nth-child(3) {
  top: 60%;
  animation: lf3 0.6s linear infinite;
}
.longfazers span:nth-child(4) {
  top: 80%;
  animation: lf4 0.5s linear infinite;
}

/* ================== KEYFRAMES ================== */
@keyframes fazer1 {
  from {
    left: 0;
  }
  to {
    left: -80px;
    opacity: 0;
  }
}
@keyframes fazer2 {
  from {
    left: 0;
  }
  to {
    left: -100px;
    opacity: 0;
  }
}
@keyframes fazer3 {
  from {
    left: 0;
  }
  to {
    left: -50px;
    opacity: 0;
  }
}
@keyframes fazer4 {
  from {
    left: 0;
  }
  to {
    left: -150px;
    opacity: 0;
  }
}

/* shake */
@keyframes speeder {
  0% {
    transform: translate(2px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -3px) rotate(-1deg);
  }
  20% {
    transform: translate(-2px, 0) rotate(1deg);
  }
  30% {
    transform: translate(1px, 2px) rotate(0);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 3px) rotate(-1deg);
  }
  60% {
    transform: translate(-1px, 1px) rotate(0);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-2px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(2px, 1px) rotate(0);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

/* background motion */
@keyframes lf {
  from {
    left: 200%;
  }
  to {
    left: -200%;
    opacity: 0;
  }
}
@keyframes lf2 {
  from {
    left: 200%;
  }
  to {
    left: -200%;
    opacity: 0;
  }
}
@keyframes lf3 {
  from {
    left: 200%;
  }
  to {
    left: -100%;
    opacity: 0;
  }
}
@keyframes lf4 {
  from {
    left: 200%;
  }
  to {
    left: -100%;
    opacity: 0;
  }
}
</style>
