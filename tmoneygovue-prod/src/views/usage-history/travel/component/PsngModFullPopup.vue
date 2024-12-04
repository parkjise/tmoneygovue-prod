<!-- 이용자 정보 수정 -->
<template>
  <common-modal
    ref="infoModifyModal"
    v-model="showPopup"
    type="full"
    title="이용자 정보 입력"
    full-content
    round-footer
    :is-back="false"
    @close="emits('close')"
  >
    <template #modal_body>
      <div class="user_modal bg_gray">
        <div class="content_wrap">
          <!-- 이용자 정보 입력 영역 -->
          <passenger-info
            :is-rsrv-page="false"
            :list="getPsngList"
            :sats-list="selSatsList"
            :max-cnt="trvlMrnpDtlList.length ?? 0"
            @valid="validInfo"
          />
        </div>
      </div>
    </template>
    <template #modal_footer>
      <div class="btn_wrap">
        <uu-button
          btn-color="primary"
          size="xl"
          label="저장하기"
          aria-label="저장하기"
          :disabled="btnDisabled"
          @click="agreeModifyTerms"
        />
      </div>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import PassengerInfo from '@/views/travel/reservation/info/PassengerInfo.vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

import { ref, watch, computed } from 'vue';
import { useHistoryStore } from '@/service/usage-history/travelHistoryModule';
import { useMessageModal, type modalFooterType } from '@/composables/useMessageModal';
import type { PassengerData } from '@/service/travel/reservationModule';
import { storeToRefs } from 'pinia';

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emits = defineEmits(['close', 'update']);

const historyStore = useHistoryStore();
const { trvlMrnpDtlList } = storeToRefs(historyStore);

const { createSuccessModalAndOption } = useMessageModal();

const showPopup = ref(false);
const infoModifyModal = ref();
const btnDisabled = ref(false);

watch(
  () => props.isShow,
  async () => {
    showPopup.value = props.isShow;
    if (props.isShow) {
      await historyStore.reqUserInfoList();
    }
  }
);

/**
 * @description 이용자정보 기본 리스트
 */
const getPsngList = computed(() => {
  return trvlMrnpDtlList.value.map((item) => {
    return {
      psngFrnm: item.psngFrnm,
      psngMbphNo: item.psngMbphNo,
      psngGndrCd: item.psngGndrCd,
      typeCd: item.busTckKndCd,
      typeNm: item.busTckKndNm,
      evcpUseYn: item.evcpUseYn,
      isShow: item.psngFrnm !== null && item.psngMbphNo !== null && item.psngGndrCd !== null
    };
  });
});
/**
 * @description 티켓데이터
 */
const selSatsList = computed(() => {
  return trvlMrnpDtlList.value.map((d) => {
    return {
      busTckKndCd: d.busTckKndCd,
      busTckKndNm: d.busTckKndNm,
      fee: 0,
      busTckCnt: trvlMrnpDtlList.value.filter((item) => item.busTckKndCd === d.busTckKndCd).length
    };
  });
});
/**
 * @description 이용자정보 store 저장
 * @param valid 이용자정보 유효성검사 결과
 * @param info 이용자정보
 */
const validInfo = (valid: boolean, info: PassengerData[]) => {
  btnDisabled.value = !valid;
  let passengerList = [...info];

  selSatsList.value.forEach((d) => {
    const typeCd = d.busTckKndCd;
    const typeNm = d.busTckKndNm;
    const addPsng = passengerList.filter((data) => typeCd === data.typeCd);
    // 해당 종류의 예약 인원수 <= 해당 종류의 추가된 이용자정보
    if (d.busTckCnt > addPsng.length) {
      passengerList.push({ psngFrnm: '', psngMbphNo: '', psngGndrCd: '', typeCd: typeCd, typeNm: typeNm });
    }
  });
  if (valid) historyStore.setUserPsngInfo(passengerList);
};

/**
 * @description 이용자정보 수정 요청
 */
const agreeModifyTerms = async () => {
  const result = await historyStore.reqUpdatePassengerInfo();

  if (result)
    createSuccessModalAndOption(
      {
        title: '알림',
        footer: [
          {
            name: 'ok',
            label: '확인',
            click: () => {
              emits('update');
            },
            btnStyle: 'none',
            btnColor: 'primary'
          }
        ] as Array<modalFooterType>
      },
      '이용자 정보가 저장되었습니다.'
    );
};
</script>
