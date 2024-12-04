<template>
  <sub-header title="신용(체크)카드 등록/변경" />
  <!-- 등록된 카드 있을때 -->
  <main id="main" class="main mor" v-if="creditCardList.length != 0 && isShowInit">
    <div class="container">
      <round-box title="등록카드" class="regist">
        <div class="tmoney_regist card">
          <p class="desc">(최대 5개 등록 가능)</p>
          <ul class="card_list">
            <li
              :class="['card', CardClass[Number(item.crpcId ?? '366')]]"
              v-for="item in creditCardList"
              :key="item.trcrSno"
            >
              <p>
                <!-- <img :src="`${imgUrl}${item.crcmCiUrl}`" alt="비씨카드 로고" /> -->
                <img
                  :src="`${imgUrl}/assets/images/logo/logo_${CardClass[Number(item.crpcId)]}card.svg`"
                  alt="카드 로고"
                />
              </p>
              <p class="card_num">{{ item.trcrNo }}</p>
              <uu-button label="삭제" btn-style="line" size="xs" @click="deleteCreditCard(item)" />
            </li>
            <!-- <li class="card hyundai">
              <p class="img_area">
                <img src="/assets/images/logo/logo_hyundaicard.svg" alt="현대카드 로고" />
              </p>
              <p class="card_num">***1234</p>
              <uu-button label="삭제" btn-style="line" size="xs" />
            </li> -->
          </ul>
          <uu-button class="btn_card_regist" @click="onClickMoveRegistPage">
            <uu-ic size="20" name="plus" style="margin-right: 0.8rem" />
            신용/체크 카드 등록
          </uu-button>
        </div>
      </round-box>
    </div>
  </main>
  <!-- // 등록된 카드 있을때 -->

  <!-- 등록된 카드 없을때 -->
  <main id="main" class="main mor" v-if="creditCardList.length == 0 && isShowInit">
    <div class="container">
      <round-box title="등록카드" class="regist">
        <div class="tmoney_regist card">
          <p class="desc">(최대 5개 등록 가능)</p>
          <uu-button class="btn_card_regist" @click="onClickMoveRegistPage">
            <uu-ic size="20" name="plus" />
            신용/체크 카드 등록
          </uu-button>
        </div>
      </round-box>
      <div class="tmoney_regist no_data card">
        <uu-ic size="48" name="exclamation" />
        <p class="title">등록된 카드가 없습니다.</p>
      </div>
    </div>
  </main>
  <!-- // 등록된 카드 없을때 -->

  <!-- 카드 삭제 팝업 -->
  <DeleteTrafficCreditCardPopup
    :isShowPopup="isShowPopup"
    :item="selectedItem"
    @ok="deleteOkCallback"
    @close="isShowPopup = false"
  />
</template>

<script setup lang="ts">
import DeleteTrafficCreditCardPopup from '../components/DeleteTrafficCreditCardPopup.vue';
import { useRouter } from 'vue-router';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { RefundCardInfoModel } from '@/service/regist-traffic-card/model/registTrafficCardModel';
import { CardClass } from '@/utils/constants/cardConstants';
import { getAppBridge } from '@/utils';
import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const registTrafficCardStore = useRegistTrafficCardStore();
const { getRegisteredTrafficCardList } = storeToRefs(registTrafficCardStore);

const creditCardList = computed(() => getRegisteredTrafficCardList.value);
const isShowPopup = ref(false);
const selectedItem = ref();
const isShowInit = ref(false);
const imgUrl = import.meta.env.VITE_IMAGE_BASE_PATH;

// 등록된 신용(체크)카드 목록
const registeredTrafficCreditCardApi = async () => {
  isShowInit.value = false;
  await registTrafficCardStore.requestRegisteredTrafficCardList('2');
  isShowInit.value = true;
};

const deleteCreditCard = (item: RefundCardInfoModel) => {
  selectedItem.value = item;
  isShowPopup.value = true;
};

// 신용카드 삭제
const deleteOkCallback = async () => {
  isShowPopup.value = false;
  if (selectedItem.value) {
    const res = await registTrafficCardStore.requestRemoveCardNo(selectedItem.value.trcrSno);
    if (res === 'Y') {
      registTrafficCardStore.initRegisteredCreditCardList();
      registeredTrafficCreditCardApi();
      // toast 교통카드가 삭제되었습니다.
      const appBridge = await getAppBridge();
      await appBridge.showToast({ message: `교통카드가 삭제되었습니다.` });
      sendAdbrix(AdbrixEvtId.dCredit);
    }
  }
};

const onClickMoveRegistPage = () => {
  router.push({ path: '/regist-traffic-card/regist-traffic-credit-card' });
};

onMounted(() => registeredTrafficCreditCardApi());
</script>
