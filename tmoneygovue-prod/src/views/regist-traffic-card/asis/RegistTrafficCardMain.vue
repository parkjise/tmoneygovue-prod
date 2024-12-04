<template>
  <sub-header title="교통카드 등록/변경" />
  <main id="main" class="main mor">
    <div class="container">
      <div class="card_catalog">
        <h4>
          대중교통에 이용하시는<br />
          선/후불 교통카드를 등록하세요.
        </h4>
        <p class="desc">티머니/신용카드 각각 최대 5개까지 등록 가능합니다.</p>
        <round-box title="티머니 카드">
          <p class="box_desc">모바일티머니, 티머니카드, 기후동행카드, 삼성월렛 티머니</p>
          <div class="img_area">
            <img src="/assets/images/img_imoney_card.png" alt="티머니/삼성페이 카드" />
          </div>
          <div class="flex_area">
            <p v-if="getRegisteredTrafficCnt.prcrCnt == 0">등록된 카드가 없습니다.</p>
            <p v-else>
              <span>{{ getRegisteredTrafficCnt.prcrCnt }}</span
              >개의 카드가 등록되어 있습니다.
            </p>
            <uu-button label="등록/변경" btn-style="line" @click="onClickRegistTmoneyCard" />
          </div>
        </round-box>
        <round-box title="신용/체크 카드 (후불교통카드)">
          <div class="img_area">
            <img src="/assets/images/img_imoney_card_credit.png" alt="신용/체크 카드 (후불교통카드)" />
          </div>
          <div class="flex_area">
            <p v-if="getRegisteredTrafficCnt.dpcCnt == 0">등록된 카드가 없습니다.</p>
            <p v-else>
              <span>{{ getRegisteredTrafficCnt.dpcCnt }}</span
              >개의 카드가 등록되어 있습니다.
            </p>
            <uu-button label="등록/변경" btn-style="line" @click="onClickRegistCreditCard" />
          </div>
        </round-box>
        <div class="ticket_notice">
          <p class="title">
            <uu-ic size="16" name="exclamation_gray090" />
            유의사항
          </p>
          <ul v-for="(item, i) in traffcCardMainNotes" :key="i" :class="{ no_dots: !item.includes('·') }">
            <li v-html="item.includes('·') ? item.replace(/^· /, '') : '&nbsp&nbsp' + item"></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/service/auth/authModule';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';

import { formatDate, getToday } from '@/utils/dateUtils';
import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const registTrafficCardStore = useRegistTrafficCardStore();
const { getRegisteredTrafficCnt, getMainNotesInfo } = storeToRefs(registTrafficCardStore);

/**
 * @description: 유의사항
 */
const traffcCardMainNotes = computed(() => {
  const delimiter = getMainNotesInfo.value.includes('\r\n') ? '\r\n' : '\n';
  return getMainNotesInfo.value.split(delimiter);
});

onMounted(async () => {
  await registTrafficCardStore.requestRegisteredTrafficCardMain('TrcrReg1'); // 유의사항
  await registTrafficCardStore.requestRegisteredTrafficCardCnt(formatDate(new Date(), 'YYYYMMDDHHmmss')); // 등록된 교통카드 개수
});

// 티머니 교통카드 등록
const onClickRegistTmoneyCard = async () => {
  sendAdbrix(AdbrixEvtId.cTmoney);
  const param = {
    inqrDtm: formatDate(getToday(), 'YYYYMMDDHHmmss'),
    moappMbrsSno: authStore.getAuthInfo.moappMbrsSno || ''
  };
  const res = await registTrafficCardStore.requestMemberStat(param); // 회원 상태 조회
  // TODO if(task.isSuccessful())
  if (res) {
    if (Object.keys(res).length != 0) {
      router.push({ path: '/regist-traffic-card/regist-traffic-tmoney-card' });
    }
  }
};

// 신용(체크) 교통카드 등록
const onClickRegistCreditCard = () => {
  sendAdbrix(AdbrixEvtId.cCredit);
  if (getRegisteredTrafficCnt.value.dpcCnt == 0) {
    // 등록된 카드가 없는 경우
    router.push({ path: '/regist-traffic-card/regist-traffic-credit-card' });
  } else {
    // 등록된 카드가 있는 경우
    router.push({ path: '/regist-traffic-card/registered-credit-card-list' });
  }
};
</script>
