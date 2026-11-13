<script setup>
import { ref, nextTick, onUnmounted } from 'vue';
const input = ref('');
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    text: '안녕하세요! Vue Atelier 데모 어시스턴트입니다. Vue 3에 대해 무엇이 궁금한가요?'
  }
]);
const pending = ref(false);
const feed = ref(null);
let timer;
async function scroll() {
  await nextTick();
  feed.value?.scrollTo({ top: feed.value.scrollHeight, behavior: 'smooth' });
}
function send() {
  const text = input.value.trim();
  if (!text || pending.value) return;
  messages.value.push({ id: Date.now(), role: 'user', text });
  input.value = '';
  pending.value = true;
  scroll();
  timer = setTimeout(() => {
    let answer = text.toLowerCase().includes('computed')
      ? 'computed는 반응형 의존성을 추적하고 결과를 캐싱합니다. 반응형 핵심 가이드에서 직접 실험해 보세요.'
      : text.includes('안녕')
        ? '반가워요! 문법 가이드, 실무 패턴, UI Kit 중 궁금한 주제를 입력해 주세요.'
        : 'Vue 3에서는 <script setup>과 Composition API로 관심사를 분리합니다. 사이드바의 문법·실무 패턴에서 실행 가능한 예제를 확인하세요.';
    messages.value.push({ id: Date.now(), role: 'assistant', text: answer });
    pending.value = false;
    scroll();
  }, 700);
}
onUnmounted(() => clearTimeout(timer));
</script>
<template>
  <section class="demo">
    <section class="chat">
      <header>
        <span class="chat__avatar">✦</span>
        <section>
          <h3>Atelier Assistant</h3>
          <small>● Online · 로컬 응답 데모</small>
        </section>
        <button @click="messages = messages.slice(0, 1)" :disabled="pending">대화 초기화</button>
      </header>
      <section ref="feed" class="chat__feed" role="log" aria-live="polite" aria-label="채팅 메시지">
        <article
          v-for="message in messages"
          :key="message.id"
          class="chat__message"
          :class="{ 'chat__message--user': message.role === 'user' }"
        >
          <small>{{ message.role === 'user' ? 'You' : '✦ Atelier AI' }}</small>
          <p>{{ message.text }}</p>
        </article>
        <p v-if="pending" class="demo__muted" role="status">어시스턴트가 입력 중…</p>
      </section>
      <form @submit.prevent="send">
        <input
          v-model="input"
          aria-label="메시지"
          placeholder="메시지를 입력하세요..."
          :disabled="pending"
          required
        />
        <button class="demo__primary" type="submit" :disabled="pending || !input.trim()">
          전송 ↗
        </button>
      </form>
      <footer>미리 작성된 로컬 응답을 표시합니다. 외부 AI API와 연결되어 있지 않습니다.</footer>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.chat {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  > header {
    @include flex-between;
    padding: 18px 22px;
    background: var(--canvas);
    h3 {
      font-size: 14px;
    }
    small {
      color: var(--success);
      font-size: 10px;
    }
    section {
      margin-right: auto;
    }
  }
  &__avatar {
    background: var(--soft);
    color: var(--primary);
    padding: 8px 13px;
    border-radius: 12px;
    font-size: 22px;
  }
  &__feed {
    height: 380px;
    overflow: auto;
    @include custom-scrollbar;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__message {
    align-self: flex-start;
    max-width: 80%;
    small {
      font-size: 10px;
      color: var(--caption);
    }
    p {
      margin-top: 5px;
      padding: 14px 18px;
      background: var(--canvas);
      border: 1px solid var(--border);
      border-radius: 0 12px 12px 12px;
      font-size: 13px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    &--user {
      align-self: flex-end;
      p {
        background: var(--primary);
        color: white;
        border: 0;
        border-radius: 12px 0 12px 12px;
      }
      small {
        display: block;
        text-align: right;
      }
    }
  }
  form {
    display: flex;
    gap: 12px;
    padding: 18px;
    border-top: 1px solid var(--border);
    input {
      flex: 1;
    }
  }
  > footer {
    text-align: center;
    color: var(--caption);
    font-size: 9px;
    padding: 0 12px 14px;
  }
}
</style>
