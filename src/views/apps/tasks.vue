<script setup>
import TaskList from '@/components/examples/TaskList.vue';
</script>
<template>
  <section class="demo">
    <TaskList title="팀 태스크" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
