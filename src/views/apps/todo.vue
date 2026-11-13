<script setup>
import TaskList from '@/components/examples/TaskList.vue';
</script>
<template>
  <section class="demo">
    <TaskList title="오늘의 할 일" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
