<script setup>
import { ref } from 'vue';
import { Copy, MailPlus, ThumbsUp, ThumbsDown, BookOpen, Paperclip } from 'lucide-vue-next';
defineProps({ message: { type: Object, required: true } });
const emit = defineEmits(['notice', 'feedback']);
const answer = ref(null);
async function copyAnswer() {
  try {
    await navigator.clipboard.writeText(answer.value?.innerText || '');
    emit('notice', '답변을 복사했습니다.');
  } catch {
    emit('notice', '복사하지 못했습니다. 브라우저의 클립보드 권한을 확인해 주세요.');
  }
}
function exportMail() {
  // 메일 서버로 전송하지 않고 초안 파일만 내려받습니다.
  const body = (answer.value?.innerText || '').replace(/\r?\n/g, '\r\n');
  const blob = new Blob(
    [
      'Subject: Samsung Gauss demo\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n',
      body
    ],
    { type: 'message/rfc822' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gauss-demo-draft.eml';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  emit('notice', '메일 초안을 내려받았습니다. Knox 메일 연동은 데모입니다.');
}
</script>
<template>
  <article
    class="sm-message"
    :class="{ 'sm-message--user': message.role === 'user' }"
    :aria-label="message.role === 'user' ? '내 질문' : 'Gauss 샘플 답변'"
  >
    <span v-if="message.role === 'assistant'" class="sm-avatar">G</span>
    <div class="sm-message__bubble">
      <template v-if="message.role === 'user'">
        <span v-if="message.attachment" class="sm-message__attachment">
          <Paperclip :size="13" />
          {{ message.attachment }}
        </span>
        <p class="sm-message__question">{{ message.text }}</p>
      </template>
      <template v-else>
        <header class="sm-message__heading">
          <strong>Samsung Gauss</strong>
          <span>샘플 답변</span>
          <small>{{ message.dept }} · {{ message.model }}</small>
        </header>
        <div ref="answer" class="sm-message__content">
          <!-- html은 원본 와이어프레임에서 가져온 정적 샘플만 사용합니다. 사용자 입력은 텍스트로 렌더링합니다. -->
          <div v-if="message.html" v-html="message.html" />
          <template v-else>
            <p><strong>업무 요청을 확인했습니다.</strong></p>
            <p>“{{ message.prompt }}”</p>
            <p>
              이 화면은 Vue UI 데모이므로 실제 AI 분석이나 사내 문서 검색은 수행하지 않습니다. 왼쪽
              샘플 대화에서 보고서 요약, 코드 리뷰, 출장 규정, 영문 메일 답변을 확인할 수 있습니다.
            </p>
            <p v-if="message.attachment">
              첨부 시연: {{ message.attachment }} (파일 내용은 읽거나 업로드하지 않습니다.)
            </p>
          </template>
        </div>
        <section
          v-if="message.sources?.length"
          class="sm-message__sources"
          aria-label="샘플 참조 출처"
        >
          <p>참조 사내 지식 출처 · 와이어프레임 예시</p>
          <button
            v-for="source in message.sources"
            :key="source.title"
            @click="emit('notice', '원본 문서는 연결되지 않은 샘플 출처입니다. ' + source.title)"
          >
            <BookOpen :size="13" />
            <strong>[{{ source.tag }}]</strong>
            {{ source.title }}
          </button>
        </section>
        <footer class="sm-message__actions">
          <div>
            <button @click="copyAnswer">
              <Copy :size="14" />
              답변 복사
            </button>
            <button @click="exportMail">
              <MailPlus :size="14" />
              메일 초안
            </button>
          </div>
          <div>
            <button
              :aria-pressed="message.feedback === 'up'"
              aria-label="도움이 됨"
              @click="emit('feedback', { id: message.id, value: 'up' })"
            >
              <ThumbsUp :size="14" />
            </button>
            <button
              :aria-pressed="message.feedback === 'down'"
              aria-label="개선 필요"
              @click="emit('feedback', { id: message.id, value: 'down' })"
            >
              <ThumbsDown :size="14" />
            </button>
          </div>
        </footer>
      </template>
    </div>
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/sm/mixins' as sm;
.sm-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  min-width: 0;
  > .sm-avatar {
    flex-shrink: 0;
    margin-top: 3px;
  }
  &__bubble {
    @include sm.panel;
    padding: 18px;
    min-width: 0;
    flex: 1;
    border-top-left-radius: 4px;
  }
  &--user {
    justify-content: flex-end;
    .sm-message__bubble {
      flex: initial;
      max-width: 85%;
      background: var(--sm-blue);
      color: #fff;
      border: 0;
      border-radius: 16px 4px 16px 16px;
      padding: 14px 18px;
    }
  }
  &__heading {
    @include sm.row;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--sm-border);
    padding-bottom: 11px;
    margin-bottom: 12px;
    font-size: 12px;
    span {
      font-size: 10px;
      color: var(--sm-accent);
      background: var(--sm-soft);
      border-radius: 4px;
      padding: 3px 6px;
    }
    small {
      margin-left: auto;
      font-size: 10px;
      color: var(--sm-muted);
    }
  }
  &__question {
    white-space: pre-wrap;
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 13px;
    line-height: 1.8;
  }
  &__attachment {
    @include sm.row;
    font-size: 11px;
    margin-bottom: 8px;
    overflow-wrap: anywhere;
  }
  &__content {
    font-size: 13px;
    line-height: 1.9;
    overflow-wrap: anywhere;
    :deep(p) {
      margin: 0 0 12px;
    }
    :deep(ul) {
      list-style: disc;
      padding-left: 20px;
      margin: 8px 0 16px;
    }
    :deep(li) {
      margin-bottom: 6px;
    }
    :deep(pre) {
      overflow-x: auto;
      padding: 16px;
      margin: 12px 0;
      border-radius: 10px;
      background: #111a2d;
      color: #dbeafe;
      font-size: 11px;
      line-height: 1.8;
    }
    :deep(code) {
      color: var(--sm-accent);
    }
    :deep(table) {
      min-width: 530px;
      font-size: 11px;
      margin: 12px 0;
    }
    :deep(div:has(> table)) {
      overflow-x: auto;
    }
    :deep(th),
    :deep(td) {
      padding: 10px;
      border: 1px solid var(--sm-border);
      color: inherit;
    }
    :deep(th) {
      background: var(--sm-soft);
    }
    :deep(hr) {
      border: 0;
      border-top: 1px solid var(--sm-border);
      margin: 14px 0;
    }
  }
  &__sources {
    border-top: 1px solid var(--sm-border);
    margin-top: 16px;
    padding-top: 10px;
    p {
      color: var(--sm-muted);
      font-size: 10px;
      margin: 0 0 8px;
    }
    button {
      @include sm.flat-button;
      @include sm.row(6px);
      flex-wrap: wrap;
      font-size: 10px;
      padding: 7px;
      text-align: left;
      margin-bottom: 4px;
      border: 1px solid var(--sm-border);
      strong {
        color: var(--sm-accent);
      }
    }
  }
  &__actions {
    @include sm.row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 12px;
    border-top: 1px solid var(--sm-border);
    padding-top: 10px;
    > div {
      @include sm.row(3px);
    }
    button {
      @include sm.flat-button;
      @include sm.row(5px);
      padding: 7px;
      font-size: 11px;
      color: var(--sm-muted);
      &[aria-pressed='true'] {
        background: var(--sm-soft);
        color: var(--sm-accent);
      }
    }
  }
  @media (max-width: 600px) {
    gap: 7px;
    > .sm-avatar {
      display: none;
    }
    &__bubble {
      padding: 12px;
    }
    &--user .sm-message__bubble {
      max-width: 95%;
    }
  }
}
</style>
