<script setup>
import { ref } from 'vue';
const value = ref(64);
</script>
<template>
  <section class="demo">
    <label>
      진행률 {{ value }}%
      <input v-model.number="value" type="range" min="0" max="100" />
    </label>
    <label class="demo__field">
      프로젝트 진행
      <progress :value="value" max="100" :aria-label="'프로젝트 진행률 ' + value + '%'" />
    </label>
    <div
      class="progress-demo"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="사용량"
    >
      <span :style="{ width: value + '%' }" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.progress-demo {
  height: 14px;
  background: var(--soft);
  border-radius: 9999px;
  overflow: hidden;
  span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #b4a2f0);
    transition: width 0.2s;
  }
}
</style>
