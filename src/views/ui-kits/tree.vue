<script setup>
import TreeNode from '@/components/common/TreeNode.vue';
const tree = {
  id: 'src',
  label: 'src',
  children: [
    {
      id: 'components',
      label: 'components',
      children: [
        {
          id: 'common',
          label: 'common',
          children: [
            { id: 'button', label: 'BaseButton.vue' },
            { id: 'modal', label: 'BaseModal.vue' }
          ]
        }
      ]
    },
    { id: 'views', label: 'views', children: [{ id: 'dashboard', label: 'dashboard.vue' }] },
    { id: 'main', label: 'main.js' }
  ]
};
</script>
<template>
  <section class="demo">
    <ul class="tree-demo" aria-label="프로젝트 파일 트리">
      <TreeNode :node="tree" />
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tree-demo {
  padding: 0;
  margin: 0;
}
</style>
