import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '@vue/compiler-dom';
import { highlightCode } from '../src/composables/codeHighlight.js';
function renderedText(html) {
  const ast = parse('<pre>' + html + '</pre>', { whitespace: 'preserve' });
  function text(node) {
    if (node.type === 2) return node.content;
    if (node.type === 1)
      assert.ok(['pre', 'span'].includes(node.tag), `Unexpected HTML: ${node.tag}`);
    return (node.children || []).map(text).join('');
  }
  return text(ast);
}
test('highlighting preserves code exactly and never creates executable source elements', () => {
  const input = `const html = '<img src=x onerror="alert(1)"><script>alert(1)</script>';
// <iframe src="javascript:alert(1)"> & &lt; &#39;
const value = 42;`;
  for (const language of ['js', 'html', 'scss', 'vue', 'plaintext', 'unknown-language']) {
    const result = highlightCode(input, language);
    assert.equal(renderedText(result), input);
    assert.doesNotMatch(result, /<(?:img|script|iframe)\b/i);
  }
  assert.match(highlightCode(input, 'js'), /hljs-keyword/);
});
test('Vue SFC bodies use JavaScript and SCSS grammars alongside template tokens', () => {
  const source = `<template><h2 class="card">Hello &amp; Vue</h2></template>
<script setup lang="ts">const count: number = 12;</script>
<style lang="scss">// comment
.card { color: #fff; &__title { margin: 8px; } }</style>`;
  const result = highlightCode(source, 'vue');
  assert.equal(renderedText(result), source);
  for (const token of [
    'hljs-name',
    'hljs-keyword',
    'hljs-number',
    'hljs-selector-class',
    'hljs-comment'
  ])
    assert.ok(result.includes(token), token);
});
