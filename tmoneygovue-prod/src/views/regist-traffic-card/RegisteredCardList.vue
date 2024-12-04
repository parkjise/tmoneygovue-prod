<template>
  <round-box  title="등록 카드">
    <div class="tmoney_regist" :class="{ no_data: tmoneyCardList.length == 0 }">
      <div v-if="tmoneyCardList.length == 0">
        <uu-ic size="48" name="exclamation" />
        <span class="title"> 등록된 카드가 없습니다. </span>
      </div>

      <div class="registration_card">
        <ul class="card_list"  v-if="tmoneyCardList.length != 0">
          <li
            :class="['card', CardClass[Number(item.crpcId ?? '999')]]"
            v-for="item in tmoneyCardList"
            :key="item.trcrSno"
          >
            <span class="card_title">
              <img
                :src="`${imgUrl}/assets/images/logo/logo_${CardClass[Number(item.crpcId ?? '999')]}card.svg`"
                alt="카드 로고"
              />
              <span class="card_num">{{ item.trcrNo }}</span>
            </span>
            <uu-button label="삭제" btn-style="line" size="xs" @click="deleteCard(item)" />
          </li>
        </ul>
      </div>
    </div>
  </round-box>
  <!-- 카드 삭제 팝업 -->
  <DeleteTrafficCreditCardPopup
    :isShowPopup="isShowPopup"
    :item="selectedItem"
    @ok="deleteOkCallback"
    @close="isShowPopup = false"
  />
</template>

<script setup lang="ts">
import DeleteTrafficCreditCardPopup from './components/DeleteTrafficCreditCardPopup.vue';
import { onMounted, computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import type { RefundCardInfoModel } from '@/service/regist-traffic-card/model/registTrafficCardModel';
import { getAppBridge } from '@/utils';
import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { CardClass } from '@/utils/constants/cardConstants';
import { formatDate } from '@/utils/dateUtils';


const registTrafficCardStore = useRegistTrafficCardStore();
const { getRegisteredTrafficCardList } = storeToRefs(registTrafficCardStore);

const tmoneyCardList = computed(() => getRegisteredTrafficCardList.value);
const isShowPopup = ref(false);
const selectedItem = ref<RefundCardInfoModel>({} as RefundCardInfoModel);
const imgUrl = import.meta.env.VITE_IMAGE_BASE_PATH;

const emit = defineEmits(['ok', 'listCallback']);
const props = defineProps({ callTmoneyList: { type: Boolean, default: false } });

onMounted(() => {
});

// 등록된 카드 목록
const registeredTrafficTmoneyCardApi = async () => {
  registTrafficCardStore.initRegisteredCreditCardList();
  await registTrafficCardStore.requestRegisteredTrafficCardList('0');

  // 등록된 교통카드 개수 조회
  const reqDtm = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  await registTrafficCardStore.requestRegisteredTrafficCardCnt(reqDtm)
};

const deleteCard = (item: RefundCardInfoModel) => {
  selectedItem.value = item;
  isShowPopup.value = true;
};


// 카드 삭제
const deleteOkCallback = async () => {
  isShowPopup.value = false;
  if (selectedItem.value) {
    const res = await registTrafficCardStore.requestRemoveCardNo(selectedItem.value.trcrSno);
    if (res === 'Y') {
      emit('ok');
      registeredTrafficTmoneyCardApi();
      // toast 교통카드가 삭제되었습니다.
      const appBridge = await getAppBridge();
      await appBridge.showToast({ message: `교통카드가 삭제되었습니다.` });
      sendAdbrix(AdbrixEvtId.dTmoney);
    }
  }
};

watch(
  () => props.callTmoneyList,
  () => {
    if (props.callTmoneyList) {
      registeredTrafficTmoneyCardApi();
      emit('listCallback');
    }
  }
);
</script>
