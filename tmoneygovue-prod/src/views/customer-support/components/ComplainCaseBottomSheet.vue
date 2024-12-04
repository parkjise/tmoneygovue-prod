<template>
  <common-modal
    v-model="showPopup"
    type="bottom"
    hide-footer
    :add-class="props.detail ? 'inquiry_type_detail' : ''"
    @ok="okCallback"
    @close="close"
    :title="!props.detail ? '문의 유형 선택' : complainStore.checkedCvcpTypGrpNm"
  >
    <template v-if="props.detail" #modal_header_top_cont>
      <button type="button" class="btn_back" @click="nextCallback(true)" aria-label="뒤로 가기">
        <uu-ic name="back" size="24" />
      </button>
    </template>
    <!-- <template #modal_header>{{ !props.detail ? '문의 유형 선택' : complainStore.checkedCvcpTypGrpNm }} </template> -->
    <template #modal_body>
      <form class="inquiry_type_select">
        <!-- 문의 유형 선택 -->
        <template v-if="!props.detail">
          <div v-for="(complainGroup, index) in complainTypeList" :key="index">
            <uu-radio
              v-model="complainStore.checkedCvcpTypGrpNm"
              :value="complainGroup.cvcpTypGrpNm"
              dropdown-radio
              @change="changeDetailTypes(complainGroup.cvcpTypDtlList)"
              @click="nextCallback(false)"
            >
              <template #label>
                <p>{{ complainGroup.cvcpTypGrpNm }}</p>
              </template>
            </uu-radio>
          </div>
        </template>
        <!--// 문의 유형 선택 -->
        <!-- 상세 문의 유형 선택 -->
        <template v-else>
          <div v-for="(complainType, index) in complainDetailTypes" :key="index">
            <uu-radio
              v-model="complainStore.checkedCvcpTypDtlNm"
              :value="complainType.cvcpTypDtlNm"
              dropdown-radio
              @change="okCallback(complainType.cvcpTypDtlCd)"
            >
              <template #label>
                <p>{{ complainType.cvcpTypDtlNm }}</p>
              </template>
            </uu-radio>
          </div>
        </template>
        <!--// 상세 문의 유형 선택 -->
      </form>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useComplainStore } from '@/service/customer-support/complainModule';
import type { complainTypeModel } from '@/service/customer-support/model/complainModel';

const complainStore = useComplainStore();
const showPopup = ref(false);

const props = defineProps({
  isShow: { type: Boolean, default: false },
  detail: { type: Boolean, default: false }
});
const emit = defineEmits(['ok', 'next', 'isClose']);

const nextCallback = (isback: boolean) => {
  emit('next', isback);
};

const changeDetailTypes = (complainTypes: complainTypeModel[]) => {
  if (complainTypes != undefined) {
    complainStore.setComplainDetailTypes(complainTypes);
  }
};

const okCallback = (cvcpTypDtlCd: string) => {
  emit('ok');
  complainStore.checkedCvcpTypDtlCd = cvcpTypDtlCd;
};

const close = () => {
  emit('isClose');
};

watch(
  () => props.isShow,
  () => (showPopup.value = props.isShow)
);

const complainTypeList = computed(() => complainStore.getComplainTypes);
const complainDetailTypes = computed(() => complainStore.getComplainDetailTypes);
</script>
