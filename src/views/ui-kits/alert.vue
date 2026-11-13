<script setup>
import { ref } from 'vue';
const alerts = ref([
  { id: 1, text: '변경사항을 저장했습니다.', tone: 'success' },
  { id: 2, text: '입력 내용을 다시 확인하세요.', tone: 'warning' },
  { id: 3, text: '연결에 실패했습니다.', tone: 'danger' }
]);
</script>
<template>
  <section class="demo">
    <article
      v-for="alert in alerts"
      :key="alert.id"
      class="alert"
      :class="`alert--${alert.tone}`"
      role="alert"
    >
      <span>{{ alert.text }}</span>
      <button
        :aria-label="alert.text + ' 알림 닫기'"
        @click="alerts = alerts.filter((a) => a.id !== alert.id)"
      >
        ×
      </button>
    </article>
    <button
      v-if="!alerts.length"
      @click="alerts = [{ id: Date.now(), text: '새 알림입니다.', tone: 'success' }]"
    >
      알림 다시 표시
    </button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.alert {
  @include flex-between;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid;
  &--success {
    color: #059669;
    background: #10b98112;
    border-color: #10b98133;
  }
  &--warning {
    color: #b7790b;
    background: #f59e0b12;
    border-color: #f59e0b33;
  }
  &--danger {
    color: var(--danger);
    background: #ef444412;
    border-color: #ef444433;
  }
  button {
    padding: 0 6px;
    background: transparent;
    border: 0;
    color: inherit;
  }
}
</style>
