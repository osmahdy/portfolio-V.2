<template>
  <div
    class="overlay absolute top-1/2 left-1/2 z-[-1] h-[100px] w-[50px] rounded-[47%_53%_51%_49%_/_35%_61%_39%_65%] bg-white shadow-[0_0_200px_50px_#99a1af]"
  ></div>
</template>

<style>
.overlay {
  animation: animateOverlay 2s linear infinite alternate;
}
@keyframes animateOverlay {
  from {
    transform: translate(-50%, -50%) rotate(20deg) scale(1.2);
  }
  to {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
}
</style>
