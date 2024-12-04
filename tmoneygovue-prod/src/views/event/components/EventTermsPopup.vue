<template>
  <common-modal v-model="showPopup" type="bottom" hide-overlay @ok="okCallback" @close="close">
    <template #modal_header> 약관동의가 필요합니다 </template>
    <template #modal_body>
      <div class="event_agree">
        <uu-checkbox
          label="전체동의"
          v-model="allCheck"
          value="전체동의"
          class="all"
          @change="eventStore.setAllCheck"
        />
        <div class="flex_area" v-for="item in getEventStplInfo" :key="item.stplSno">
          <uu-checkbox
            label="개인정보 수집 이용 동의 (필수)"
            v-model="item.stplCheck"
            @change="eventStore.getIsAllCheck"
          >
            {{
              item.stplTtlNm.indexOf('(') != -1
                ? item.stplTtlNm.substring(0, item.stplTtlNm.indexOf('('))
                : item.stplTtlNm
            }}<span>{{
              item.stplTtlNm.indexOf('(') != -1 ? item.stplTtlNm.slice(item.stplTtlNm.indexOf('(')) : ''
            }}</span>
          </uu-checkbox>
          <uu-button>
            <uu-ic size="20" name="arrow" direction="left" @click="clickDetail(item)" v-if="item.extlUrl != null" />
          </uu-button>
        </div>
      </div>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" label="동의" size="xl" :disabled="isDisabledButton" @click="btnActions.ok" />
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEventStore } from '@/service/event/eventModule';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { resStplInfo } from '@/service/terms/model/responseModel';
import { getAppBridge } from '@/utils';
import CommonModal from '@/views/common/components/CommonModal.vue';

const eventStore = useEventStore();
const { getEventStplInfo } = storeToRefs(eventStore);

const emit = defineEmits(['close', 'agree']);
const props = defineProps({ isShowTerm: { type: Boolean, required: true } });

const showPopup = ref(false);
const allCheck = ref(eventStore.getIsAllCheck()); // 전체동의

/**
 * @description 버튼 비활성화
 */
const isDisabledButton = computed(() => {
  if (
    getEventStplInfo.value.filter((item) => item.stplCheck && item.stplMndtYn === 'Y').length ===
    getEventStplInfo.value.filter((item) => item.stplMndtYn === 'Y').length
  ) {
    return false;
  } else {
    return true;
  }
});

const clickDetail = async (item: resStplInfo) => {
  // 약관 상세 이동
  const appBridge = await getAppBridge();
  if (item.extlUrl !== undefined && item.extlUrl !== null && item.extlUrl !== '') {
    await appBridge.openView({ url: item.extlUrl, headerTitle: item.stplTtlNm, viewType: 'in' });
  }
};

watch([() => eventStore.getIsAllCheck(), () => props.isShowTerm], ([newAllCheck]) => {
  allCheck.value = newAllCheck;
  showPopup.value = props.isShowTerm;
});

const okCallback = () => {
  emit('agree');
};

const close = () => {
  emit('close');
};
</script>
