import { computed, nextTick, onUnmounted, ref } from 'vue';
import scenarios from '@/data/smScenarios.json';
import { hasSensitivePattern, maskSensitiveText } from '@/data/smDemo';

// 현재 페이지에서만 대화를 관리합니다. 페이지를 떠나면 입력·대화를 버리며 저장·API 통신은 하지 않습니다.
export function useSmChat() {
  const dept = ref('DS');
  const modelId = ref('language');
  const activeAgent = ref('');
  const draft = ref('');
  const attachment = ref('');
  const conversations = ref([]);
  const currentId = ref(null);
  const busy = ref(false);
  const notice = ref('');
  const composer = ref(null);
  const chatBody = ref(null);
  let serial = 0;
  let responseTimer;
  let noticeTimer;
  const current = computed(() => conversations.value.find((item) => item.id === currentId.value));
  const messages = computed(() => current.value?.messages || []);
  const history = computed(() => conversations.value.map(({ id, title }) => ({ id, title })));
  const sensitive = computed(() => hasSensitivePattern(draft.value));
  function showNotice(text) {
    clearTimeout(noticeTimer);
    notice.value = text;
    noticeTimer = setTimeout(() => {
      notice.value = '';
    }, 4500);
  }
  async function scrollBottom() {
    await nextTick();
    if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
  function cancelPending() {
    clearTimeout(responseTimer);
    busy.value = false;
  }
  function reset() {
    cancelPending();
    currentId.value = null;
    draft.value = '';
    attachment.value = '';
    activeAgent.value = '';
  }
  function selectConversation(id) {
    if (busy.value) {
      showNotice('답변 표시가 끝난 뒤 다른 대화를 열어 주세요.');
      return;
    }
    currentId.value = id;
    draft.value = '';
    attachment.value = '';
    activeAgent.value = '';
    scrollBottom();
  }
  function selectAgent(agent) {
    activeAgent.value = agent.id;
    draft.value = agent.prompt;
    nextTick(() => composer.value?.focus());
    showNotice('업무 에이전트의 프롬프트를 적용했습니다.');
  }
  function append(prompt, sample, modelName) {
    if (busy.value) return;
    if (!current.value) {
      const conversation = { id: ++serial, title: prompt.slice(0, 34), messages: [] };
      conversations.value.unshift(conversation);
      currentId.value = conversation.id;
    }
    const target = current.value;
    const file = attachment.value;
    const department = dept.value;
    target.messages.push({ id: ++serial, role: 'user', text: prompt, attachment: file });
    draft.value = '';
    attachment.value = '';
    busy.value = true;
    scrollBottom();
    responseTimer = setTimeout(() => {
      target.messages.push({
        id: ++serial,
        role: 'assistant',
        html: sample?.aiResponse || '',
        prompt,
        attachment: file,
        sources: sample?.sources || [],
        model: modelName,
        dept: department,
        feedback: ''
      });
      busy.value = false;
      scrollBottom();
    }, 650);
  }
  function send(modelName) {
    const text = draft.value.trim();
    if (!text || busy.value) return;
    if (sensitive.value) {
      showNotice('감지된 내용을 먼저 마스킹해 주세요.');
      return;
    }
    append(text, null, modelName);
  }
  function loadScenario(key, modelName) {
    const sample = scenarios[key];
    if (!sample || busy.value) return;
    append(sample.userPrompt, sample, modelName);
  }
  function applyMasking() {
    draft.value = maskSensitiveText(draft.value);
    showNotice('샘플 규칙에 해당하는 내용을 마스킹했습니다.');
    composer.value?.focus();
  }
  function securityDemo() {
    draft.value =
      '협력사 담당자 홍길동(주민번호: 880512-1234567, 연락처: 010-9876-5432)에게 1급기밀_신규라인_설계도면 관련 미팅 안내 메일을 작성해줘.';
    nextTick(() => composer.value?.focus());
  }
  function rateAnswer({ id, value }) {
    const message = messages.value.find((item) => item.id === id);
    if (message) {
      message.feedback = message.feedback === value ? '' : value;
      showNotice('평가를 화면에 반영했습니다. 외부로 전송하지 않습니다.');
    }
  }
  onUnmounted(() => {
    cancelPending();
    clearTimeout(noticeTimer);
  });
  return {
    dept,
    modelId,
    activeAgent,
    draft,
    attachment,
    busy,
    notice,
    composer,
    chatBody,
    messages,
    history,
    sensitive,
    showNotice,
    reset,
    selectConversation,
    selectAgent,
    send,
    loadScenario,
    applyMasking,
    securityDemo,
    rateAnswer
  };
}
