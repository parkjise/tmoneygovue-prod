<template>
  <uu-modal
    v-model="isShowNotFoundModal"
    type="full"
    title="에러"
    has-bg
    has-header-bg
    hide-title
    hide-footer
    @close="moveToBack"
  >
    <template #modal_body>
      <div class="error_area">
        <div class="img_area">
          <img src="/assets/images/img_tmoney_character_error.png" alt="에러 티머니 캐릭터" />
        </div>
        <div class="desc_area">
          <p class="title">비정상 접근입니다.</p>
          <p class="desc">잠시 후 다시 시도해 주시기 바랍니다.</p>
        </div>
      </div>
    </template>
  </uu-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UuModal from '@/components/uu-components/UuModal.vue';

const isShowNotFoundModal = ref(true);

// 뒤로가기
const moveToBack = () => {
  history.back();
};
</script>
