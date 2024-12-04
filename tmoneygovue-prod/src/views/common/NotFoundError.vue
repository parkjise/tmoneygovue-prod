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
          <p class="title">페이지를 찾을 수 없습니다.</p>
          <p class="desc">
            요청하신 페이지를 찾을 수 없습니다.<br />
            다시 한 번 확인 후 시도해 주시기 바랍니다.
          </p>
        </div>
        <round-box hide-title>
          <div class="error_result">
            <p class="error_code">
              <uu-ic size="16" name="exclamation_gray090" />
              'ERROR : 404'
            </p>
            <p class="error_title">Page Not Found</p>
            <!-- <p class="error_desc"></p> -->
          </div>
        </round-box>
      </div>
    </template>
  </uu-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UuModal from '@/components/uu-components/UuModal.vue';
import RoundBox from '@/components/layout/RoundBox.vue';
import UuIc from '@/components/uu-components/UuIc.vue';

const isShowNotFoundModal = ref(true);

// 뒤로가기
const moveToBack = () => {
  history.back();
};
</script>
