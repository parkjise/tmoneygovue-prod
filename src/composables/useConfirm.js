import { ref, onScopeDispose } from 'vue';
export function useConfirm() {
  const isOpen = ref(false);
  const message = ref('');
  let resolve;
  function settle(result) {
    isOpen.value = false;
    resolve?.(result);
    resolve = undefined;
  }
  function confirm(text) {
    settle(false);
    message.value = text;
    isOpen.value = true;
    return new Promise((done) => {
      resolve = done;
    });
  }
  onScopeDispose(() => settle(false));
  return { isOpen, message, confirm, accept: () => settle(true), cancel: () => settle(false) };
}
