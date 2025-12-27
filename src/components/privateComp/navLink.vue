<script setup>
import { ref } from 'vue';

const props = defineProps({
  to: {
    type: String, // The id of the section to scroll to
    required: true,
  },
  offset: {
    type: Number, // Optional offset for fixed headers
    default: 0,
  },
  duration: {
    type: Number, // Scroll duration in ms
    default: 500,
  },
});

function scrollToSection() {
  const el = document.getElementById(props.to);
  if (!el) return;

  const top = el.offsetTop - props.offset;

  // Smooth scroll
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
</script>

<template>
  <a @click.prevent="scrollToSection" class="cursor-pointer">
    <slot></slot>
  </a>
</template>
