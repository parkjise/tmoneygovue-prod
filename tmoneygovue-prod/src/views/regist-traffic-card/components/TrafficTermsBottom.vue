<template>
  <common-modal v-model="showBottomSheet" type="bottom" hide-footer hideCloseBtn @ok="okCallback" @close="closeCallback">
    <template #modal_header> 교통카드 등록 안내 </template>
    <template #modal_body>
      <form>
          <div class="modal_regitration">
            <p class="desc">티머니GO 교통카드 등록시 마일리지 적립이 가능해요.<br>
              교통 카드 등록을 진행하시겠어요?</p>
            <div class="all_check">
              <uu-checkbox :label="'전체동의'" v-model="allChecked" @change="setAllCheck" />
            </div>
            <div class="detail_agree">
              <li v-for="(item, i) in creditCardStplList" :key="i" class="flex-between">
                <uu-checkbox 
                  :label="`${item.stplTtlNm.replace(/(\(.*?\))/g, item.stplMndtYn=='Y' ? '<span class=required >$1</span>' : '<span class=optional >$1</span>')}`" 
                  v-model="item.stplCheck"
                  @change="isCheckTerm"
                  :isHtmlLabel="true" />
                <uu-button v-if="item.extlUrl != null" @click="clickTermsDetail(item)">
                  <uu-ic size="24" name="navi_right" />
                </uu-button>
              </li>
            </div>
            <div class="btn_area">
              <uu-button
                  :label="'취소'"
                  :btn-style="'line'"
                  @click="closeCallback"
                  :size="'xl'"
              ></uu-button>
              <uu-button
                  :label="'등록하기'"
                  :btn-color="'primary'"
                  @click="okCallback"
                  :disabled="disabledButton"
                  :size="'xl'"
              ></uu-button>
            </div>
          </div>
        </form>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import CommonModal from '@/views/common/components/CommonModal.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import uuIc from '@/components/uu-components/UuIc.vue';
import UuButton from '@/components/uu-components/UuButton.vue';
import UuCheckbox from '@/components/uu-components/UuCheckbox.vue';
import { storeToRefs } from 'pinia';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import type { stplInfo } from '@/service/regist-traffic-card/model/registTrafficCardModel';
import { getAppBridge } from '@/utils';
import { useAppSetting } from '@/service/app-setting/appSettingModule';

const registTrafficCardStore = useRegistTrafficCardStore();
const { getCreditCardStplList } = storeToRefs(registTrafficCardStore);
const allChecked = ref(false); // 약관 전체동의 여부
const emit = defineEmits(['close', 'ok']);
const creditCardStplList = reactive<stplInfo[]>([]); // 약관목록
const settingStore = useAppSetting();
const showBottomSheet = ref(false);

const props = defineProps({
  isShowBottomSheet: { type: Boolean, default: false }
});

onMounted(async () => {
  await registTrafficCardStore.requestCreditNotes('TrcrReg4'); // 유의사항, 배너, 약관
  const cardStplList = getCreditCardStplList.value.map((item) => ({
    ...item,
    stplCheck: item.stplAgrmYn === 'Y' ? true : false // 체크
  })); // 약관목록

  creditCardStplList.splice(0, creditCardStplList.length, ...cardStplList);
});

// 약관 상세 이동
const clickTermsDetail = async (item: stplInfo) => {
  const appBridge = await getAppBridge();
  if (item.extlUrl !== undefined && item.extlUrl !== null && item.extlUrl !== '') {
    await appBridge.openView({ url: item.extlUrl, headerTitle: item.stplTtlNm, viewType: 'in' });
  }
};

// 약관 체크 이벤트
const isCheckTerm = () => {
  if (creditCardStplList.filter((item) => item.stplCheck === false).length > 0) {
    allChecked.value = false;
  } else {
    allChecked.value = true;
  }
};

// 약관 전체동의 체크
const setAllCheck = (isChecked: boolean) => {
  creditCardStplList.forEach((item) => (item.stplCheck = isChecked));
};

// 카드등록 버튼 비활성화
const disabledButton = computed(() => {
  if (
    creditCardStplList.filter((item) => item.stplCheck && item.stplMndtYn === 'Y').length ===
      creditCardStplList.filter((item) => item.stplMndtYn === 'Y').length
  ) {
    return false;
  } else {
    return true;
  }
});

const closeCallback = () => {
  emit('close');
};

const okCallback = () => {
  creditCardStplList.forEach((item) => {
    if(item.stplSno == '20210616000000000228' && item.stplCheck){
      // 마케팅 정보 수신동의
      updateMarketingAgreement('Y');
    }
  });
  emit('ok');
};


// 회원 수신 동의 정보 변경 요청
async function updateMarketingAgreement(stplCheck: string) {
  const param = {
    mrkgRcvYn: stplCheck,
    pushRcvYn: stplCheck,
    mailRcvYn: stplCheck,
    smsRcvYn: stplCheck
  };
  await settingStore.updateMarketingAgreement(param);
}

watch(
  () => props.isShowBottomSheet,
  async (newVal) => {
    showBottomSheet.value = props.isShowBottomSheet;
    if (newVal) {
      // 바텀시트가 열릴 때마다 데이터를 새로 불러오기
      await registTrafficCardStore.requestCreditNotes('TrcrReg4'); // 유의사항, 배너, 약관
      const cardStplList = getCreditCardStplList.value.map((item) => ({
        ...item,
        stplCheck: item.stplAgrmYn === 'Y' ? true : false // 체크 여부 설정
      }));
      // creditCardStplList을 새로 업데이트
      creditCardStplList.splice(0, creditCardStplList.length, ...cardStplList);

      isCheckTerm();
    }
  },
  { immediate: true } // 초기 상태에서 한 번 실행되도록 설정
);

</script>
