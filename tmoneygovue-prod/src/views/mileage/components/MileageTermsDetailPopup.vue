<template>
  <common-modal
    v-model="showPopup"
    type="full"
    :isBack="false"
    hide-title
    hide-footer
    has-header-bg
    has-bg
    @close="showPopup = false"
  >
    <template #modal_body>
      <div class="go_mileage" v-if="extlUrl">
        <p class="desc">티머니GO 마일리지 적립을 위해 최초 1회의 개인정보 관련 동의가 필요합니다.</p>
        <div class="bg_white">
          <h4>{{ stplTitle }}</h4>
          <iframe
            :src="extlUrl"
            width="100%"
            height="300px"
            scrolling="auto"
            marginWidth="0"
            marginHeight="0"
            frameborder="0"
          />
        </div>
      </div>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const showPopup = ref<boolean>(false);
const extlUrl = ref(''); // 약관상세 url
const stplTitle = ref(''); // 약관명

const open = (url: string, title: string) => {
  extlUrl.value = url;
  stplTitle.value = title;
  showPopup.value = true;
};

defineExpose({ open });
</script>
