<script setup>
import { ref } from 'vue';
import { useModal } from '@/composables/useModal';
import { useToast } from '@/composables/useToast';
import { useConfirm } from '@/composables/useConfirm';
import BaseModal from '@/components/common/BaseModal.vue';
const { isOpen, open } = useModal();
const { toast } = useToast();
const confirmation = useConfirm();
const result = ref('확인 대기');
async function remove() {
  result.value = (await confirmation.confirm('프로젝트를 삭제할까요?'))
    ? '삭제를 승인했습니다.'
    : '삭제를 취소했습니다.';
}
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <button @click="open">useModal 열기</button>
      <button @click="toast('재사용 가능한 토스트입니다.')">useToast 실행</button>
      <button @click="remove">useConfirm 실행</button>
    </div>
    <output class="demo__output">{{ result }}</output>
    <BaseModal v-model="isOpen" title="Composable 모달">
      <p>UI 상태와 비즈니스 로직을 독립적인 함수로 분리합니다.</p>
    </BaseModal>
    <BaseModal v-model="confirmation.isOpen.value" title="삭제 확인">
      <p>{{ confirmation.message.value }}</p>
      <div class="demo__row">
        <button @click="confirmation.cancel">취소</button>
        <button class="demo__primary" @click="confirmation.accept">확인</button>
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
