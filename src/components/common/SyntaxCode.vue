<script setup>
import { computed } from 'vue';
import { highlightCode } from '@/composables/codeHighlight';
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: 'plaintext' },
  label: { type: String, default: '소스 코드' }
});
const highlighted = computed(() => highlightCode(props.code, props.language));
</script>
<template>
  <pre class="syntax-code" tabindex="0" :aria-label="label"><code v-html="highlighted" /></pre>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.syntax-code {
  @include custom-scrollbar;
  @include focus-ring;
  margin: 0;
  padding: 22px 24px;
  max-height: 600px;
  overflow: auto;
  background: #1e1e1e;
  color: #d4d4d4;
  color-scheme: dark;
  white-space: pre;
  tab-size: 2;
  text-align: left;
  font:
    13px/1.85 'SFMono-Regular',
    Consolas,
    'Liberation Mono',
    monospace;
  code {
    font: inherit;
    background: transparent;
    color: inherit;
    padding: 0;
  }
  &::selection,
  :deep(::selection) {
    background: #264f78;
  }
  :deep(.hljs-comment),
  :deep(.hljs-quote) {
    color: #6a9955;
  }
  :deep(.hljs-keyword),
  :deep(.hljs-selector-tag),
  :deep(.hljs-literal) {
    color: #569cd6;
  }
  :deep(.hljs-tag) {
    color: #808080;
  }
  :deep(.hljs-name) {
    color: #569cd6;
  }
  :deep(.hljs-attr),
  :deep(.hljs-attribute),
  :deep(.hljs-variable),
  :deep(.hljs-property),
  :deep(.hljs-params) {
    color: #9cdcfe;
  }
  :deep(.hljs-string),
  :deep(.hljs-regexp),
  :deep(.hljs-template-tag),
  :deep(.hljs-template-variable) {
    color: #ce9178;
  }
  :deep(.hljs-number),
  :deep(.hljs-symbol),
  :deep(.hljs-bullet) {
    color: #b5cea8;
  }
  :deep(.hljs-title),
  :deep(.hljs-built_in),
  :deep(.hljs-function) {
    color: #dcdcaa;
  }
  :deep(.hljs-title.class_),
  :deep(.hljs-type) {
    color: #4ec9b0;
  }
  :deep(.hljs-selector-class),
  :deep(.hljs-selector-id),
  :deep(.hljs-selector-pseudo) {
    color: #d7ba7d;
  }
  :deep(.hljs-meta),
  :deep(.hljs-doctag) {
    color: #c586c0;
  }
  :deep(.hljs-operator),
  :deep(.hljs-punctuation) {
    color: #d4d4d4;
  }
  :deep(.hljs-addition) {
    color: #b5cea8;
    background: #283b26;
  }
  :deep(.hljs-deletion) {
    color: #ce9178;
    background: #482c2c;
  }
  @include responsive(mobile) {
    padding: 16px;
    font-size: 12px;
  }
}
</style>
