<template>
  <common-modal
    v-model="showBottom"
    type="bottom"
    add-class="bef_modal"
    hide-overlay
    @close="close"
    @ok="agreeCallback"
  >
    <template #modal_header> 따릉이 사용을 위해 동의가 필요합니다. </template>
    <template #modal_body>
      <uu-checkbox
        v-for="item in getDdareongSpfStplInfo"
        :key="item.stplSno"
        label="개인정보 수집 이용 동의 (필수)"
        value="개인정보 수집 이용 동의 (필수)"
        v-model="item.stplCheck"
      >
        <span>{{ item.stplTtlNm }}</span>
        <uu-button btn-style="none" v-if="item.extlUrl != null" @click="openTermsDetail(item)">
          <uu-ic size="24" name="navi_right" />
        </uu-button>
      </uu-checkbox>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="동의" size="xl" :disabled="isDisabled" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/service/member/memberModule';
import CommonModal from '@/views/common/components/CommonModal.vue';
import type { resStplInfo } from '@/service/terms/model/responseModel';
import { getAppBridge } from '@/utils';
import { storeToRefs } from 'pinia';
import { watch, ref, computed } from 'vue';

const memberStore = useMemberStore();
const { getDdareongSpfStplInfo } = storeToRefs(memberStore);

const emit = defineEmits(['close', 'ok']);
const props = defineProps({ isShowTerm: { type: Boolean, required: true } });

const showBottom = ref(false);

// 버튼 비활성화
const isDisabled = computed(() => {
  // stplMndtYn === "Y" 필수약관
  if (
    getDdareongSpfStplInfo.value.filter((item) => item.stplCheck && item.stplMndtYn === 'Y').length ===
    getDdareongSpfStplInfo.value.filter((item) => item.stplMndtYn === 'Y').length
  ) {
    return false;
  } else {
    return true;
  }
});

// 약관 상세 open
const openTermsDetail = async (item: resStplInfo) => {
  const appBridge = await getAppBridge();
  if (item.extlUrl !== undefined && item.extlUrl !== null && item.extlUrl !== '') {
    await appBridge.openView({ url: item.extlUrl, headerTitle: item.stplTtlNm, viewType: 'in' });
  }
};

watch(
  () => props.isShowTerm,
  () => {
    showBottom.value = props.isShowTerm;
  }
);

const close = () => {
  emit('close');
};

const agreeCallback = () => {
  emit('ok');
};
</script>
