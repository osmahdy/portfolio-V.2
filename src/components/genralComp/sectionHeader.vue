<script setup>
const props = defineProps({
  heading: {
    type: String,
  },
});
</script>

<template>
  <div
    class="overflow-hiddens mx-auto my-10 mt-20 w-fit max-w-[300px] min-w-[200px] px-8 md:my-20 md:mt-40 md:max-w-[500px] select-none"
  >
    <p
      class="font-simibold relative m-auto cursor-pointer rounded-2xl border-y border-y-4 border-y-slate-500 p-3 text-2xl duration-500 before:bg-slate-500 after:bg-slate-500 md:text-4xl dark:border-y-slate-400 dark:before:bg-slate-400 dark:after:bg-slate-400"
    >
      <span class="relative z-10">{{ heading }}</span>
    </p>
  </div>
</template>

<style scoped>
p::after,
p::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: 1s;
}
p::after {
  right: -30px;
}
p::before {
  left: -30px;
}
p:hover::after {
  z-index: -1;
  animation: right_move 0.6s linear forwards;
}
p:hover::before {
  /* left: 50%; */
  animation: left_move 0.6s linear forwards;
  z-index: -1;
}
@keyframes left_move {
  0% {
    left: -30px;
    top: 50%;
    transform: translatey(-50%);
    border-radius: 50%;
  }

  75% {
    left: 0;
    top: 50%;
    transform: translatey(-50%);
    border-radius: 50%;
  }

  100% {
    left: 0;
    width: calc(50% + 1px);
    height: 100%;
    border-top-right-radius: 0;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 10px;
  }
}

@keyframes right_move {
  0% {
    right: -30px;
    top: 50%;
    transform: translatey(-50%);
    border-radius: 50%;
  }

  75% {
    right: 0;
    top: 50%;
    transform: translatey(-50%);
    border-radius: 50%;
  }

  100% {
    right: 0;
    width: calc(50% + 1px);
    height: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
}
</style>
