import { ref, watch } from 'vue';
let stored = 'light';
try {
  stored = localStorage.getItem('atelier-theme') || 'light';
} catch {
  /* Storage may be unavailable. */
}
const theme = ref(stored === 'dark' ? 'dark' : 'light');
watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem('atelier-theme', value);
    } catch {
      /* Theme still applies in memory. */
    }
  },
  { immediate: true }
);
export function useTheme() {
  return {
    theme,
    toggle: () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    }
  };
}
