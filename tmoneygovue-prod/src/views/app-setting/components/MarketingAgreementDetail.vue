<template>
  <common-modal
    v-model="showPopup"
    type="full"
    title="마케팅 정보 수신 동의"
    hide-title
    hide-footer
    add-class="setting_marketing"
    :isBack="false"
    @close="closeCallback"
    @ok="okCallback"
  >
    <template #modal_body>
      <h4>마케팅 정보 수신 동의</h4>
      <p>
        예약/결제 정보 등 필수 안내사항은<br />
        마케팅 정보 수신 동의와 무관하게 제공됩니다.
      </p>
      <dl>
        <dt>목적</dt>
        <dd>앱 신규/제휴 서비스 알림</dd>
        <dd>회원별 맞춤 서비스 제공</dd>
        <dd>할인 및 프로모션 이벤트 제공</dd>
        <dd>
          회사가 제공하는 모든 서비스(티머니, 고속/시외버스, 온다 택시, 모바일 티머니 등)와 향후 추가되는 신규 서비스의
          프로모션, 이벤트 등 광고성 정보의 안내
        </dd>
      </dl>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({
  isShowPopup: { type: Boolean, default: false }
});
const emit = defineEmits(['ok', 'isClose']);
const showPopup = ref(false);

const okCallback = () => {
  emit('ok');
};

const closeCallback = () => {
  emit('isClose');
};

watch(
  () => props.isShowPopup,
  () => (showPopup.value = props.isShowPopup)
);
</script>
