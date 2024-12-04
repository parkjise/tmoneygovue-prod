<template>
  <div class="card_select_wrap">
    <button type="button" class="card_select_btn" @click="isShow = true">
      <uu-ic size="20" name="card" />
      <span>{{ crcmNm ? crcmNm : '' }} {{ trcrNo ? trcrNo : t('usageHistory.det_002_001_011') }}</span>
      <uu-ic size="20" name="menu_down" />
    </button>
    <button type="button" class="card_register_btn" @click="registTrafficCard">
      {{ t('usageHistory.det_002_001_012') }}
    </button>
  </div>
  <common-modal
    ref="modal01Ref"
    v-model="isShow"
    type="bottom"
    title="교통카드 선택"
    hide-footer
    add-class="card_select_bottom_sheet"
  >
    <template #modal_body>
      <form>
        <uu-radio v-model="trcrSno" value="" dropdown-radio @change="changeEvent" :aria-label="'전체'">
          <template #label>
            <p class="option_tit">{{ t('usageHistory.det_003_001_002') }}</p>
          </template>
        </uu-radio>
        <uu-radio
          v-model="trcrSno"
          :value="item.trcrNo"
          dropdown-radio
          @change="changeEvent(item.trcrNo, item.trcrSno, item.crcmNm)"
          v-for="(item, i) in items"
          :key="i"
          :ariaLabel="`${item.crcmNm ? item.crcmNm : t('usageHistory.det_003_001_003')} ${item.trcrNo}`"
        >
          <template #label>
            <p class="option_tit">
              {{ item.crcmNm ? item.crcmNm : t('usageHistory.det_003_001_003') }}
            </p>
            <span class="option_txt usage">{{ item.trcrNo }}</span>
          </template>
        </uu-radio>
      </form>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { TrafficCardModel } from '@/service/traffic-card/model/trafficCardModel';
import { useRouter } from 'vue-router';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { encodeUriRouterPath } from '@/utils/linkUtils';
import { useI18n } from '@/composables/useI18n';
const emit = defineEmits(['updateCardList', 'updateList', 'updateCardSno']);
const props = defineProps({
  items: {
    type: Array as () => TrafficCardModel[],
    required: true
  },
  pageNo: {
    type: Number,
    required: true
  }
});
// radio
const trcrSno = ref<string>(''); // Default checked
const trcrNo = ref<string>('');
const crcmNm = ref<string>('');
const modal01Ref = ref(); // Ref
const isShow = ref<boolean>(false); // v-model
const router = useRouter();
const { t } = useI18n();
/**
 * 교통카드 변경 시 이벤트
 * @param cardNo
 * @param cardSno
 * @param compNm
 */
function changeEvent(cardNo: string, cardSno: string, compNm: string) {
  isShow.value = false;
  trcrNo.value = cardNo;
  crcmNm.value = compNm;
  if (props.pageNo > 0) {
    emit('updateCardSno', cardSno);
  }
}
/**
 * 교통카드 등록 페이지 이동
 */
const registTrafficCard = () => {
  router.push({ path: encodeUriRouterPath('tmoneytia://reward/transfer/main') });
};
</script>
