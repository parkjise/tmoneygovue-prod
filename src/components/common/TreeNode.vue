<script setup>
import { ref } from 'vue';
const props = defineProps({ node: { type: Object, required: true } });
const open = ref(true);
</script>
<template>
  <li class="tree-node">
    <button v-if="node.children" :aria-expanded="open" @click="open = !open">
      {{ open ? '⌄' : '›' }} ▱ {{ props.node.label }}
    </button>
    <span v-else class="tree-node__leaf">▤ {{ props.node.label }}</span>
    <ul v-if="node.children" v-show="open">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" />
    </ul>
  </li>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.tree-node {
  list-style: none;
  button {
    border: 0;
    background: none;
    text-align: left;
  }
  ul {
    padding-left: 24px;
    border-left: 1px solid var(--border);
    margin-left: 15px;
  }
  &__leaf {
    display: block;
    padding: 8px 16px;
    color: var(--muted);
    font-size: 13px;
  }
}
</style>
