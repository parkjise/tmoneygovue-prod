<script setup>
import { ref, computed, useId, defineAsyncComponent } from 'vue';
const SyntaxCode = defineAsyncComponent(() => import('@/components/common/SyntaxCode.vue'));
import { Code2, Copy, Check, ChevronDown, FileCode2 } from 'lucide-vue-next';
import { extractBlock } from '@/data/codeSnippets/blocks';
import { useClipboard } from '@/composables/useClipboard';
const props = defineProps({
  title: { type: String, default: 'Live example' },
  description: { type: String, default: '' },
  files: { type: Object, required: true },
  initiallyExpanded: { type: Boolean, default: false },
  sourceOnly: { type: Boolean, default: false }
});
const expanded = ref(props.initiallyExpanded);
const selectedFile = ref(Object.keys(props.files)[0] || '');
const selectedTab = ref('full');
const id = useId();
const tabs = computed(() =>
  [
    {
      id: 'full',
      label: selectedFile.value.endsWith('.scss') ? '전체 코드 (.scss)' : '전체 코드 (.vue)'
    },
    { id: 'template', label: '<template>' },
    { id: 'script', label: '<script setup>' },
    { id: 'style', label: '<style scss>' }
  ].filter((tab) => !props.sourceOnly || tab.id === 'full')
);
const source = computed(
  () => props.files[selectedFile.value] ?? Object.values(props.files)[0] ?? ''
);
const code = computed(() => {
  if (
    selectedTab.value === 'full' ||
    (selectedTab.value === 'style' && selectedFile.value.endsWith('.scss'))
  )
    return source.value;
  const tag = selectedTab.value;
  return (
    extractBlock(source.value, tag) ||
    '이 파일에는 선택한 블록이 없습니다. 전체 코드 탭을 확인하세요.'
  );
});
const codeLanguage = computed(() =>
  selectedTab.value === 'template'
    ? 'html'
    : selectedTab.value === 'script'
      ? 'javascript'
      : selectedTab.value === 'style'
        ? 'scss'
        : selectedFile.value.split('.').pop()
);
const { copied, copy } = useClipboard();
</script>
<template>
  <article class="code-card">
    <header class="code-card__header">
      <section>
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </section>
      <span class="code-card__live">
        <span />
        {{ sourceOnly ? 'SOURCE FILES' : 'LIVE PREVIEW' }}
      </span>
    </header>
    <section class="code-card__preview" aria-label="동작 예제"><slot /></section>
    <footer class="code-card__toolbar">
      <button :aria-expanded="expanded" :aria-controls="id" @click="expanded = !expanded">
        <Code2 :size="16" />
        {{ sourceOnly ? 'SCSS' : 'Vue' }} 코드 {{ expanded ? '닫기' : '보기' }}
        <ChevronDown :size="14" :class="{ 'code-card__chevron--open': expanded }" />
      </button>
      <span class="code-card__hint">
        {{ sourceOnly ? 'SCSS · 원본 파일' : 'Vue 3 · Composition API' }}
      </span>
      <button
        :aria-label="'현재 코드 복사'"
        @click="copy(code, selectedFile.endsWith('.scss') ? 'SCSS' : 'Vue')"
      >
        <Check v-if="copied" :size="15" />
        <Copy v-else :size="15" />
        {{ copied ? '복사됨 ✓' : '코드 복사' }}
      </button>
    </footer>
    <section v-if="expanded" :id="id" class="code-card__source">
      <label class="code-card__file">
        <FileCode2 :size="15" />
        파일
        <select v-model="selectedFile" aria-label="소스 파일">
          <option v-for="(_, name) in files" :key="name" :value="name">{{ name }}</option>
          <option v-if="!selectedFile" value="" disabled>파일 선택</option>
        </select>
      </label>
      <nav class="code-card__tabs" aria-label="소스 코드 블록">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :aria-pressed="selectedTab === tab.id"
          @click="selectedTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>
      <SyntaxCode :code="code" :language="codeLanguage" label="소스 코드" />
    </section>
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.code-card {
  @include card-surface;
  overflow: hidden;
  &__header {
    @include flex-between;
    padding: 22px 26px;
    border-bottom: 1px solid var(--border);
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 4px;
    }
  }
  &__live {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 9px;
    letter-spacing: 1.2px;
    color: var(--caption);
    white-space: nowrap;
    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
    }
  }
  &__preview {
    padding: 28px;
    min-height: 160px;
  }
  &__toolbar {
    @include flex-between;
    background: var(--canvas);
    border-top: 1px solid var(--border);
    padding: 10px 20px;
    button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      border: 0;
      background: transparent;
    }
  }
  &__hint {
    margin-left: auto;
    color: var(--caption);
    font-size: 11px;
  }
  &__source {
    background: #1e1e1e;
    color: #d4d4d4;
    color-scheme: dark;
  }
  &__file {
    display: flex;
    padding: 14px 20px;
    gap: 10px;
    select {
      background: #252526;
      color: #e2e8f0;
      max-width: 85%;
    }
  }
  &__tabs {
    display: flex;
    overflow: auto;
    padding: 0 14px;
    border-bottom: 1px solid #3c3c3c;
    button {
      background: none;
      color: #94a3b8;
      border: 0;
      border-radius: 0;
      font-size: 12px;
      white-space: nowrap;
      &[aria-pressed='true'] {
        color: #c7d2fe;
        border-bottom: 2px solid #818cf8;
      }
    }
  }
  &__chevron--open {
    transform: rotate(180deg);
  }
  @include responsive(mobile) {
    &__header,
    &__preview {
      padding: 18px;
    }
    &__hint {
      display: none;
    }
    &__live {
      font-size: 8px;
    }
  }
}
</style>
