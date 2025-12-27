import { ref, watch } from 'vue';

const isDark = ref(false);
let initialized = false;

function initTheme() {
  if (initialized) return;
  initialized = true;

  const saved = localStorage.getItem('theme');

  if (saved) {
    isDark.value = saved === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  watch(
    isDark,
    (val) => {
      document.documentElement.classList.toggle('dark', val);
      localStorage.setItem('theme', val ? 'dark' : 'light');
    },
    { immediate: true },
  );
}

export function useTheme() {
  initTheme();

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggleTheme };
}
