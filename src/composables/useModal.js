import { ref } from 'vue';
export function useModal() {
  const isOpen = ref(false);
  return {
    isOpen,
    open: () => {
      isOpen.value = true;
    },
    close: () => {
      isOpen.value = false;
    }
  };
}
