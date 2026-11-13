import { ref } from 'vue';
const messages = ref([]);
let sequence = 0;
export function useToast() {
  function dismiss(id) {
    messages.value = messages.value.filter((item) => item.id !== id);
  }
  function toast(text, type = 'success') {
    const id = ++sequence;
    messages.value.push({ id, text, type });
    setTimeout(() => dismiss(id), 4000);
  }
  return { messages, toast, dismiss };
}
