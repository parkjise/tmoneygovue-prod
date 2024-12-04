<template>
  <common-modal v-model="showBottomSheet" type="bottom" title="공공자전거 유형 선택" hide-footer @close="closeCallback">
    <!-- <template #modal_header> 공공자전거 유형 선택 </template> -->
    <template #modal_body>
      <form class="inquiry_type_select">
        <uu-radio v-model="reportBikeStore.checkedUtlzSvcDvsCd" value="T" dropdown-radio @click="closeCallback">
          <template #label>
            <p>따릉이</p>
          </template>
        </uu-radio>
        <uu-radio v-model="reportBikeStore.checkedUtlzSvcDvsCd" value="D" dropdown-radio @click="closeCallback">
          <template #label>
            <p>타슈</p>
          </template>
        </uu-radio>
      </form>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { useReportBikeStore } from '@/service/customer-support/reportBikeModule';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { ref, watch } from 'vue';
const reportBikeStore = useReportBikeStore();
const emit = defineEmits(['close']);

const showBottomSheet = ref(false);

const props = defineProps({
  isShowBottomSheet: { type: Boolean, default: false }
});

const closeCallback = () => {
  emit('close');
};

watch(
  () => props.isShowBottomSheet,
  () => {
    showBottomSheet.value = props.isShowBottomSheet;
  }
);
</script>
