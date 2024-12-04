<template>
  <sub-header title="GO마일리지 전환" />
  <main id="main" class="main mor">
    <div class="container bottom_btns">
      <div class="go_mileage_transform">
        <round-box hide-title>
          <uu-input v-model="myGoMileage" label="나의 GO마일리지" readonly />
          <uu-input v-model="myTMileage" label="나의 T마일리지" readonly />
          <div class="point_area">
            <uu-input
              inputmode="decimal"
              ref="inputRef"
              v-model.number="exchangeMileage"
              label="전환할 GO마일리지"
              placeholder="전환할 GO마일리지"
              btn-clear
              @input="handleInput"
              @blur="handleBlur"
              @click="exchangeMileage = exchangeMileage?.replaceAll(',', '')"
            />
            <uu-button label="모두전환" btn-style="line" size="lg" @click="allChange" />
          </div>
        </round-box>
        <div class="ticket_notice">
          <p class="title">
            <uu-ic size="16" name="exclamation_gray090" />
            마일리지 전환 유의사항
          </p>
          <ul>
            <li
              :class="{ red: /<font color='red'>/.test(item) }"
              v-for="(item, index) in getMileageExchangeNotes"
              :key="index"
              v-html="item"
            ></li>
          </ul>
        </div>
      </div>
      <div class="btn_area">
        <uu-button
          btn-color="primary"
          size="xl"
          label="전환 신청하기"
          :disabled="isDisabled"
          @click="onClickExchange"
        />
      </div>
    </div>
  </main>
  <!-- 마일리지 전환 완료 팝업 -->
  <mileage-exchange-success-popup :isShow="successPopup" @ok="exchangeComplete" />
</template>

<script setup lang="ts">
import uuButton from '@/components/uu-components/UuButton.vue';
import { useGoMileageStore } from '@/service/mileage/goMileageModule';
import { storeToRefs } from 'pinia';
import { computed, nextTick, ref, watch } from 'vue';
import { formatAmount } from '@/utils/amountUtils';
import MileageExchangeSuccessPopup from './components/MileageExchangeSuccessPopup.vue';
import { useAuthStore } from '@/service/auth/authModule';
import { getAppBridge } from '@/utils';

const authStore = useAuthStore();
const milegeStore = useGoMileageStore();
const { getMileageExchangeNotes, getMileageBeforeInfo, getMileageExchangeInfo } = storeToRefs(milegeStore);

const myGoMileage = ref(formatAmount(`${getMileageBeforeInfo.value.GOMlgAmt}M`)); // 나의 GO마일리지
const myTMileage = ref(formatAmount(`${getMileageBeforeInfo.value.TMlgAmt}M`)); // 나의 T마일리지
const exchangeMileage = ref(); // 전환할 GO마일리지
const successPopup = ref(false); // 전환완료 팝업
const inputRef = ref();

// 마일리지 전환 신청
const onClickExchange = async () => {
  //10M 단위인지 확인
  if (Number(exchangeMileage.value.replace(',', '')) % 10 !== 0) {
    const appBridge = await getAppBridge();
    await appBridge.showToast({ message: `GO마일리지는 10M 단위로 전환됩니다.` });
    return;
  }

  const params = {
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '',
    mlgSwtcTgtAmt: Number(exchangeMileage.value.replace(',', ''))
  };
  await milegeStore.requestMileageExchange(params);

  if (getMileageExchangeInfo.value.rspCd === '0000') {
    successPopup.value = true; // 마일리지 전환 완료 확인팝업
  }
};

// 마일리지 전환 완료
const exchangeComplete = async () => {
  successPopup.value = false;
  await milegeStore.requestMileageBeforeInfo({ moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || '' });
  exchangeMileage.value = '';
};

// 모두전환
const allChange = () => {
  exchangeMileage.value = getMileageBeforeInfo.value.GOMlgAmt;
  nextTick(() => {
    inputRef.value.onInput();
    exchangeMileage.value = formatAmount(Math.floor(exchangeMileage.value / 10) * 10);
  });
};

watch(getMileageBeforeInfo, (newValue) => {
  myGoMileage.value = formatAmount(`${newValue.GOMlgAmt}M`);
  myTMileage.value = formatAmount(`${newValue.TMlgAmt}M`);
});

// 전환신청하기 버튼 비활성화
const isDisabled = computed(
  () => exchangeMileage.value === '' || exchangeMileage.value == undefined || exchangeMileage.value < 10
);

// inputEvent
const handleInput = async (event: any) => {
  if (event == 0) {
    exchangeMileage.value = '';
  }

  if (getMileageBeforeInfo.value.GOMlgAmt < event) {
    // toast : 보유하신 GO마일리지를 초과하여 입력할 수 없습니다.
    inputRef.value.blur();
    exchangeMileage.value = formatAmount(getMileageBeforeInfo.value.GOMlgAmt);
    const appBridge = await getAppBridge();
    await appBridge.showToast({ message: `보유하신 GO마일리지를 초과하여 입력할 수 없습니다.` });
  }
};
const handleBlur = (event: any) => {
  exchangeMileage.value = formatAmount(event);
  if (event == '') {
    exchangeMileage.value = undefined;
  }
};
</script>
