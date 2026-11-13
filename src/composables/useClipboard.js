import { ref, onUnmounted } from 'vue';
import { useToast } from './useToast';
export function useClipboard() {
  const copied = ref(false);
  const { toast } = useToast();
  let timer;
  async function copy(value, language = 'Vue') {
    try {
      await navigator.clipboard.writeText(value);
      copied.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        copied.value = false;
      }, 2000);
      toast(`클립보드에 ${language} 코드가 복사되었습니다.`);
    } catch {
      toast('복사할 수 없습니다. 브라우저의 클립보드 권한을 확인해 주세요.', 'error');
    }
  }
  onUnmounted(() => clearTimeout(timer));
  return { copied, copy };
}
