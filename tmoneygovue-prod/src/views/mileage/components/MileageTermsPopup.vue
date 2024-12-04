<template>
  <common-modal v-model="showPopup" type="bottom" add-class="bef_modal" hide-overlay @close="close" @ok="agreeCallback">
    <template #modal_header> 마일리지 적립을 위해 동의가 필요합니다. </template>
    <template #modal_body>
      <uu-checkbox
        style="margin-bottom: 0.8rem"
        v-for="item in getSpfStplInfo"
        :key="item.stplSno"
        label="개인정보 수집 이용 동의 (필수)"
        value="개인정보 수집 이용 동의 (필수)"
        v-model="item.stplCheck"
        @change="milegeStore.getIsAllCheck"
        class="mileage_form_checkbox"
      >
        <span>{{ item.stplTtlNm }}</span>
        <uu-button
          btn-style="none"
          @click="showDetailPopup.open(item.extlUrl, item.stplTtlNm)"
          v-if="item.extlUrl != null"
        >
          <uu-ic size="24" name="navi_right" />
        </uu-button>
      </uu-checkbox>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="동의" size="xl" :disabled="isDisabledButton" @click="btnActions.ok" />
    </template>
  </common-modal>
  <mileage-terms-detail-popup ref="showDetailPopup" />
</template>

<script setup lang="ts">
import MileageTermsDetailPopup from './MileageTermsDetailPopup.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { storeToRefs } from 'pinia';
import { watch, ref, computed } from 'vue';

const milegeStore = useGoMileageStore();
const { getSpfStplInfo } = storeToRefs(milegeStore);

const emit = defineEmits(['close', 'ok']);
const props = defineProps({
  isShowTerm: {
    type: Boolean,
    required: true
  }
});

const showDetailPopup = ref();
const showPopup = ref(false);
const isDisabledButton = computed(() => !milegeStore.getIsAllCheck());

watch(
  () => props.isShowTerm,
  () => {
    showPopup.value = props.isShowTerm;
  }
);

const close = () => {
  emit('close');
};

const agreeCallback = () => {
  emit('ok');
};
</script>

<style scoped>
.mileage_form_checkbox {
  margin-bottom: 0.8rem;
}

.mileage_form_checkbox:last-child {
  margin-bottom: 0 !important;
}
</style>
