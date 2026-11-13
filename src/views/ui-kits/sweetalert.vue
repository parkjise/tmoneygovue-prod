<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';
const open = ref(false);
const result = ref('');
</script>
<template>
  <section class="demo">
    <button class="demo__primary" @click="open = true">작업을 삭제할까요?</button>
    <p class="demo__muted">네이티브 dialog: 포커스 트랩, ESC 닫기, 이전 포커스 복원 지원</p>
    <output>{{ result }}</output>
    <BaseModal v-model="open" title="작업을 삭제할까요?">
      <p>작업 내용을 확인한 후 선택하세요.</p>
      <div class="demo__row">
        <button
          @click="
            open = false;
            result = '취소했습니다.';
          "
        >
          취소
        </button>
        <button
          class="demo__primary"
          @click="
            open = false;
            result = '확인했습니다.';
          "
        >
          확인
        </button>
      </div>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
