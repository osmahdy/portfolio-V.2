<script setup>
const props = defineProps({
  confDelDialogeState: Boolean,
  deleteThing: String,
});
const emit = defineEmits(['confDelete']);
</script>

<template>
  <div
    :class="[
      confDelDialogeState ? 'scale-100' : 'scale-0',
      'dialoge fixed top-1/2 left-1/2 z-7000 flex min-h-30 min-w-100 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-white p-4 text-slate-950 duration-300',
    ]"
  >
    <p class="text-2xl">
      Confirm Delete <b>{{ deleteThing }}</b>
    </p>
    <div class="mt-5 flex w-full items-center justify-center">
      <p
        @click="$emit('confDelete', true)"
        class="mx-2 w-30 cursor-pointer rounded-2xl bg-red-800 p-2 text-center text-lg text-white select-none hover:bg-red-700"
      >
        Delete
      </p>
      <p
        @click="$emit('confDelete', false)"
        class="mx-2 w-30 cursor-pointer rounded-2xl bg-slate-800 p-2 text-center text-lg text-white select-none hover:bg-slate-700"
      >
        Undo
      </p>
    </div>
  </div>
</template>
