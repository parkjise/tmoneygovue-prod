<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

const props = defineProps({
  html: {
    type: Boolean,
    default: false
  },
  css: {
    type: Boolean,
    default: false
  },
  script: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    defalut: false
  }
});
onUpdated(() => {
  Prism.highlightAll();
});
onMounted(() => {
  Prism.highlightAll();
});

const open = ref(props.show);
</script>
<template>
  <div class="view_code" :class="{ is_open: open }">
    <button type="button" class="btn_view_code" @click="open = !open">
      {{ (props.html && 'Html') || (props.script && 'Script') || (props.css && 'Css') }} Code
      <i class="ic ic_12_arrow_gray" aria-hidden="true" />
    </button>
    <pre
      v-show="open"
      :class="[
        { 'language-markup': props.html },
        { 'language-css': props.css },
        { 'language-javascript': props.script }
      ]"
    ><code><slot /></code></pre>
  </div>
</template>

<style lang="scss">
code[class*='language-'],
pre[class*='language-'] {
  font-family: Arial, Helvetica, sans-serif;
  tab-size: 2;
  letter-spacing: 0.05rem;
}
pre[class*='language-'] {
  margin: 0;
  padding: 0;
  background: #f0f2f9;
}
div.code_toolbar {
  // display: none;
  > .toolbar {
    top: -2.9rem;
    left: 10.6rem;
    right: auto;
    opacity: 1;
    > .toolbar_item > button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 2.4rem;
      padding: 0 0.8rem;
      box-shadow: none;
      background-color: #f0f2f9;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      color: #000;
      &:hover,
      &:focus {
        background-color: #2257c5;
        color: #fff;
      }
    }
  }
}
</style>
