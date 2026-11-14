<script setup>
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { staticDeployment, staticAiStatus } from '@/composables/aiDeployment';
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Square,
  MessageCircle
} from 'lucide-vue-next';
import { useClipboard } from '@/composables/useClipboard';
import { buildConversation, answerBlocks } from '@/composables/assistantText';
const provider = ref('gemini');
const names = { gemini: 'Gemini', openai: 'OpenAI' };
const status = ref(null),
  statusError = ref(''),
  error = ref('');
const messages = ref([]),
  question = ref(''),
  pending = ref(''),
  busy = ref(false);
const feed = ref(null),
  input = ref(null),
  copiedId = ref(null);
const { copy, copied } = useClipboard();
const active = computed(() => status.value?.providers?.[provider.value]);
const ready = computed(() => active.value?.configured === true);
const valid = computed(() => question.value.trim().length > 0 && question.value.length <= 4000);
let sequence = 0,
  controller,
  statusController;
async function checkStatus() {
  if (staticDeployment) {
    status.value = staticAiStatus();
    statusError.value = '';
    return;
  }
  statusController?.abort();
  statusController = new AbortController();
  status.value = null;
  statusError.value = '';
  try {
    const response = await fetch('/api/bem/status', { signal: statusController.signal });
    const data = await response.json();
    if (
      !response.ok ||
      typeof data.csrfToken !== 'string' ||
      !['gemini', 'openai'].every((name) => typeof data.providers?.[name]?.configured === 'boolean')
    )
      throw new Error();
    status.value = data;
  } catch (e) {
    if (e.name !== 'AbortError')
      statusError.value = '서버에 연결할 수 없습니다. 개발 서버를 확인한 후 다시 시도하세요.';
  }
}
async function scroll() {
  await nextTick();
  feed.value?.scrollTo({ top: feed.value.scrollHeight, behavior: 'smooth' });
}
async function send() {
  if (!ready.value || !valid.value || busy.value) return;
  const text = question.value.trim(),
    selected = provider.value;
  const history = buildConversation(messages.value, text);
  busy.value = true;
  pending.value = text;
  error.value = '';
  controller = new AbortController();
  scroll();
  try {
    const response = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-BEM-Token': status.value.csrfToken },
      body: JSON.stringify({ provider: selected, messages: history }),
      signal: controller.signal
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('서버 응답을 읽지 못했습니다. 연결 상태를 확인하세요.');
    }
    if (!response.ok) throw new Error(data.error || '답변을 받지 못했습니다. 다시 시도하세요.');
    if (typeof data.answer !== 'string' || !data.answer.trim())
      throw new Error('답변이 비어 있습니다. 다시 질문해 주세요.');
    messages.value.push(
      { id: ++sequence, role: 'user', content: text },
      {
        id: ++sequence,
        role: 'assistant',
        content: data.answer,
        provider: data.provider || selected,
        model: data.model
      }
    );
    question.value = '';
  } catch (e) {
    error.value =
      e.name === 'AbortError'
        ? '답변 요청을 취소했습니다. 질문은 유지됩니다.'
        : e instanceof TypeError
          ? '서버에 연결하지 못했습니다. 네트워크를 확인하세요.'
          : e.message;
  } finally {
    pending.value = '';
    busy.value = false;
    await scroll();
    input.value?.focus();
  }
}
function reset() {
  messages.value = [];
  error.value = '';
  question.value = '';
  copiedId.value = null;
  input.value?.focus();
}
function sample() {
  messages.value = [
    { id: ++sequence, role: 'user', content: 'Vue의 computed와 watch는 언제 사용하나요?' },
    {
      id: ++sequence,
      role: 'assistant',
      provider: 'sample',
      model: '로컬 샘플',
      content:
        'computed는 상태에서 새로운 값을 계산할 때 사용합니다. watch는 상태 변경에 따라 API 호출 같은 부수 효과를 실행할 때 사용합니다.\n\n```js\nconst total = computed(() => price.value * quantity.value)\nwatch(keyword, (value) => search(value))\n```\n이 대화는 미리 작성한 로컬 샘플이며 API를 호출하지 않았습니다.'
    }
  ];
  scroll();
}
async function copyAnswer(message) {
  await copy(message.content, '답변');
  if (copied.value) copiedId.value = message.id;
}
function usePrompt(text) {
  question.value = text;
  input.value?.focus();
}
onMounted(checkStatus);
onUnmounted(() => {
  controller?.abort();
  statusController?.abort();
});
</script>
<template>
  <section class="demo ai-assistant">
    <header class="ai-assistant__intro">
      <span class="ai-assistant__symbol"><Sparkles :size="26" /></span>
      <section>
        <h3>궁금한 것을 물어보세요.</h3>
        <p>개발 질문부터 개념 설명, 글 정리까지. 이어지는 질문도 함께 나눠요.</p>
      </section>
    </header>
    <section class="ai-assistant__settings">
      <label>
        AI 공급자
        <select
          v-model="provider"
          aria-label="질문 AI 공급자"
          :disabled="busy"
          @change="error = ''"
        >
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI (GPT)</option>
        </select>
      </label>
      <section aria-live="polite">
        <strong>
          {{
            staticDeployment
              ? '공개 데모 · AI 서버 미연결'
              : statusError
                ? '서버 확인 필요'
                : status === null
                  ? '설정 확인 중…'
                  : ready
                    ? names[provider] + ' API 키 설정됨'
                    : names[provider] + ' API 키 미설정'
          }}
        </strong>
        <p v-if="active">{{ active.model }}</p>
      </section>
      <button :disabled="busy" @click="checkStatus">
        <RefreshCw :size="14" />
        설정 확인
      </button>
    </section>
    <p v-if="statusError" class="demo__error" role="alert">{{ statusError }}</p>
    <aside v-if="staticDeployment" class="ai-assistant__notice">
      공개 화면에서는 샘플 대화만 제공합니다. 실제 질문 전송은 개인 키를 설정한 로컬 서버에서
      이용하세요.
    </aside>
    <aside v-else-if="status && !ready" class="ai-assistant__notice">
      기존 BEM 생성기와 같은 개인 API 키를 사용합니다.
      <RouterLink to="/tools/bem-generator">API 연결 방법 보기 →</RouterLink>
    </aside>
    <header class="ai-assistant__toolbar">
      <span>
        <MessageCircle :size="15" />
        {{ messages.length ? '대화 중 · ' + Math.floor(messages.length / 2) + '문답' : '새 대화' }}
      </span>
      <button :disabled="busy || !messages.length" @click="reset">
        <Trash2 :size="14" />
        대화 초기화
      </button>
    </header>
    <section
      ref="feed"
      class="ai-assistant__feed"
      role="log"
      aria-live="polite"
      aria-label="AI 질문과 답변"
      tabindex="0"
    >
      <section v-if="!messages.length && !busy" class="ai-assistant__empty">
        <Sparkles :size="32" />
        <h4>어떤 질문으로 시작할까요?</h4>
        <p>질문 예시를 눌러 내용을 바꾼 뒤 전송하세요.</p>
        <div class="ai-assistant__prompts">
          <button
            v-for="prompt in [
              'Vue의 computed와 watch 차이를 알려줘',
              'SCSS Mixin을 쉬운 예제로 설명해줘',
              '좋은 회의 안건을 작성하는 방법을 알려줘'
            ]"
            :key="prompt"
            @click="usePrompt(prompt)"
          >
            {{ prompt }} ↗
          </button>
        </div>
        <button class="ai-assistant__sample" @click="sample">샘플 대화 보기 · API 호출 없음</button>
      </section>
      <article
        v-for="message in messages"
        :key="message.id"
        class="ai-assistant__message"
        :class="{ 'ai-assistant__message--user': message.role === 'user' }"
      >
        <header>
          <span>
            {{
              message.role === 'user'
                ? '나'
                : message.provider === 'sample'
                  ? '로컬 샘플'
                  : names[message.provider] || 'AI'
            }}
          </span>
          <small v-if="message.model">{{ message.model }}</small>
        </header>
        <section class="ai-assistant__bubble">
          <template v-if="message.role === 'assistant'">
            <template v-for="(block, i) in answerBlocks(message.content)" :key="i">
              <section v-if="block.type === 'code'" class="ai-assistant__code">
                <small>{{ block.language || 'code' }}</small>
                <SyntaxCode :code="block.text" :language="block.language" label="답변 코드" />
              </section>
              <p v-else>{{ block.text }}</p>
            </template>
          </template>
          <p v-else>{{ message.content }}</p>
        </section>
        <button
          v-if="message.role === 'assistant'"
          class="ai-assistant__copy"
          :aria-label="'답변 ' + message.id + ' 복사'"
          @click="copyAnswer(message)"
        >
          <Check v-if="copied && copiedId === message.id" :size="12" />
          <Copy v-else :size="12" />
          {{ copied && copiedId === message.id ? '복사됨 ✓' : '답변 복사' }}
        </button>
      </article>
      <article v-if="busy" class="ai-assistant__message ai-assistant__message--user">
        <header>나</header>
        <p class="ai-assistant__bubble">{{ pending }}</p>
      </article>
      <p v-if="busy" class="ai-assistant__thinking" role="status">
        {{ names[provider] }}가 답변을 작성하고 있습니다…
      </p>
    </section>
    <form class="ai-assistant__form" @submit.prevent="send">
      <label class="demo__field">
        질문
        <textarea
          ref="input"
          v-model="question"
          aria-label="AI에게 질문"
          rows="3"
          maxlength="4000"
          :disabled="busy"
          placeholder="궁금한 것을 입력하세요. Shift+Enter로 줄바꿈, Enter로 전송"
          @keydown.enter.exact="
            (event) => {
              if (!event.isComposing) {
                event.preventDefault();
                send();
              }
            }
          "
        />
      </label>
      <footer>
        <span>{{ question.length.toLocaleString() }} / 4,000</span>
        <button v-if="busy" type="button" @click="controller?.abort()">
          <Square :size="13" />
          취소
        </button>
        <button type="submit" class="demo__primary" :disabled="busy || !ready || !valid">
          <Send :size="14" />
          질문 전송
        </button>
      </footer>
    </form>
    <p v-if="error" role="alert" class="demo__error">{{ error }}</p>
    <aside v-if="staticDeployment" class="ai-assistant__privacy">
      샘플 대화는 미리 작성된 예시이며 외부 AI API를 호출하지 않습니다.
    </aside>
    <aside v-else class="ai-assistant__privacy">
      <p>
        질문과 최근 대화가 선택한 API로 전송되며 계정의 사용 한도·과금 설정이 적용됩니다. 공급자를
        바꾸면 다음 질문의 최근 대화도 해당 공급자에게 전송됩니다.
      </p>
      <p>
        대화는 이 화면의 메모리에만 유지되며 새로고침하면 지워집니다. 긴 대화는 최근 일부만
        참조합니다. 실시간 인터넷 검색이나 프로젝트 파일 자동 열람은 지원하지 않습니다.
      </p>
    </aside>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.ai-assistant {
  @include custom-scrollbar;
  min-width: 0;
  gap: 20px;
  &__intro {
    display: flex;
    align-items: center;
    gap: 15px;
    h3 {
      font-size: 21px;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 5px;
    }
  }
  &__symbol {
    @include flex-center;
    width: 54px;
    height: 54px;
    background: var(--soft);
    border-radius: 16px;
    color: var(--primary);
    flex-shrink: 0;
  }
  &__settings {
    @include card-surface;
    @include flex-between;
    flex-wrap: wrap;
    padding: 16px;
    label {
      font-size: 12px;
    }
    strong {
      font-size: 11px;
    }
    p {
      font-size: 10px;
      color: var(--caption);
    }
    section {
      margin-right: auto;
    }
    button {
      font-size: 11px;
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }
  &__notice {
    background: var(--soft);
    padding: 14px;
    border-radius: 10px;
    font-size: 12px;
    a {
      color: var(--primary);
    }
  }
  &__toolbar {
    @include flex-between;
    font-size: 11px;
    color: var(--muted);
    span,
    button {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    button {
      font-size: 11px;
    }
  }
  &__feed {
    @include custom-scrollbar;
    background: var(--canvas);
    border: 1px solid var(--border);
    border-radius: 14px;
    height: 520px;
    max-height: 70vh;
    min-height: 300px;
    padding: 24px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  &__empty {
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 12px;
    text-align: center;
    min-height: 100%;
    > svg {
      color: var(--primary);
    }
    h4 {
      font-size: 19px;
    }
    p {
      color: var(--caption);
      font-size: 12px;
    }
  }
  &__prompts {
    display: grid;
    gap: 8px;
    max-width: 100%;
    margin: 8px 0;
    button {
      text-align: left;
      font-size: 12px;
      padding: 12px 16px;
    }
  }
  &__sample {
    font-size: 10px;
    color: var(--muted);
    border: 0;
    background: none;
  }
  &__message {
    align-self: flex-start;
    max-width: 90%;
    min-width: 0;
    header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 7px;
      color: var(--muted);
      small {
        font-size: 9px;
        font-weight: 400;
        color: var(--caption);
      }
    }
    &--user {
      align-self: flex-end;
      header {
        justify-content: flex-end;
      }
      .ai-assistant__bubble {
        background: var(--primary);
        color: white;
        border: 0;
        border-radius: 14px 0 14px 14px;
      }
    }
  }
  &__bubble {
    padding: 16px 20px;
    border: 1px solid var(--border);
    border-radius: 0 14px 14px 14px;
    background: var(--surface);
    font-size: 13px;
    line-height: 1.9;
    overflow-wrap: anywhere;
    p {
      white-space: pre-wrap;
    }
    p:empty {
      display: none;
    }
  }
  &__code {
    background: #1e1e1e;
    color: #d4d4d4;
    border-radius: 8px;
    margin: 12px 0;
    overflow: hidden;
    small {
      display: block;
      font-size: 9px;
      padding: 7px 14px;
      border-bottom: 1px solid #334155;
    }
    :deep(.syntax-code) {
      @include custom-scrollbar;
      overflow: auto;
      padding: 14px;
      margin: 0;
      font-size: 11px;
      line-height: 1.8;
      max-height: 350px;
    }
  }
  &__copy {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    border: 0;
    padding: 4px 0;
    background: none;
    color: var(--caption);
  }
  &__thinking {
    font-size: 12px;
    color: var(--primary);
    padding: 10px;
  }
  &__form {
    display: grid;
    gap: 10px;
    label {
      font-size: 12px;
    }
    textarea {
      resize: vertical;
      min-height: 90px;
      font-size: 13px;
    }
    footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      font-size: 10px;
      color: var(--caption);
      span {
        margin-right: auto;
      }
      button {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 12px;
      }
    }
  }
  &__privacy {
    border-top: 1px solid var(--border);
    padding-top: 15px;
    color: var(--caption);
    font-size: 10px;
    p + p {
      margin-top: 6px;
    }
  }
  @include responsive(mobile) {
    &__intro h3 {
      font-size: 18px;
    }
    &__settings {
      gap: 12px;
    }
    &__feed {
      padding: 16px;
      max-height: 60vh;
    }
    &__message {
      max-width: 96%;
    }
    &__bubble {
      padding: 13px 15px;
      font-size: 12px;
    }
    &__empty h4 {
      font-size: 16px;
    }
    &__prompts button {
      font-size: 11px;
    }
  }
}
</style>
