<template>
  <round-box ref="roundBoxRefs" hide-title v-show="item.isShow" v-for="(item, index) in passengerList" :key="index">
    <div class="box_title box_top_title" v-if="index === 0">
      이용자 정보
      <button type="button" aria-label="이용자 정보 입력 안내" @click="bottomRef.open()">
        <uu-ic v-bind="{ name: 'exclamation', size: '16' }" />
      </button>
    </div>
    <!-- 예약하기 -->
    <template v-if="props.isRsrvPage">
      <div class="user_detail">
        <uu-ic v-bind="{ name: 'people_gray040', size: '20' }" />
        <div class="user_detail_txt">{{ item.typeNm || '' }}{{ getIndex(item, index) }}</div>
        <uu-checkbox
          v-if="index === 0"
          v-model="sameInfo"
          label="예매자 정보와 동일"
          aria-label="예매자 정보와 동일"
          @change="setPassengerSameInfo"
        />
        <uu-button
          v-else
          class="right_btn del_btn"
          size="xs"
          btn-style="line"
          label="삭제"
          aria-label="삭제"
          @click="deletePassenger(index)"
        />
      </div>
    </template>
    <!-- 이용자정보수정 -->
    <div class="user_detail" v-if="!props.isRsrvPage">
      <uu-ic v-bind="{ name: 'people', size: '20' }" />
      <div class="user_detail_txt">{{ item.typeNm }}{{ getIndex(item, index) }}</div>
      <div class="coupon_badge" v-if="!props.isRsrvPage && item.evcpUseYn === 'Y'">쿠폰</div>
      <uu-button
        v-if="index > 0"
        class="right_btn del_btn"
        size="xs"
        btn-style="line"
        label="삭제"
        aria-label="삭제"
        @click="deletePassenger(index)"
      />
    </div>
    <form>
      <uu-input
        v-model="item.psngFrnm"
        placeholder="이름 입력"
        label="이름 (필수)"
        :aria-label="`이름${index} (선택)`"
        :max-length="nameMaxLength"
        @input="setSameInfo(index === 0)"
      />
      <uu-input
        v-model="item.psngMbphNo"
        placeholder="-를 제외한 숫자 입력"
        label="연락처 (필수)"
        :aria-label="`연락처${index} (선택)`"
        :max-length="mbphMaxLength"
        inputmode="numeric"
        @input="setSameInfo(index === 0)"
      />
      <div>
        <p class="title">성별(필수)</p>
        <uu-radio
          v-model="item.psngGndrCd"
          label="남"
          :aria-label="`성별${index}남`"
          :value="GenderType.M"
          inline
          @change="validation(index === 0)"
        />
        <uu-radio
          v-model="item.psngGndrCd"
          label="여"
          :aria-label="`성별${index}여`"
          :value="GenderType.F"
          inline
          @change="validation(index === 0)"
        />
      </div>
    </form>
  </round-box>
  <div class="user_add_btn">
    <uu-button aria-label="이용자 정보 추가하기" btn-style="line" size="lg" @click="addPassenger">
      <template #label>
        이용자 정보 추가하기
        <uu-ic v-bind="{ name: 'plus_gray090', size: '16' }" />
      </template>
    </uu-button>
  </div>
  <passenger-bottom ref="bottomRef" />
</template>

<script setup lang="ts">
import PassengerBottom from '@/views/travel/reservation/component/PassengerBottom.vue';
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/service/auth/authModule';
import { type PassengerData, type TckData } from '@/service/travel/reservationModule';
import { GenderType } from '@/service/travel/travelConsts';
import { getAppBridge } from '@/utils';

interface Props {
  isRsrvPage: boolean;
  title?: String;
  list: PassengerData[];
  satsList: TckData[];
  maxCnt: number;
  isSame?: boolean;
}

const authStore = useAuthStore();
const props = defineProps<Props>();
const emits = defineEmits(['valid', 'bottom']);

const bottomRef = ref();

const passengerList = ref<PassengerData[]>([]);

const nameMaxLength = 30; // 이름 최대길이
const mbphMaxLength = 11; // 연락처 최대길이

const sameInfo = ref(false); // 예약자정보동일 체크박스

const roundBoxRefs = ref([]);
const nameRegx = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
const mobRegx = /^01[0-9][0-9]{3,4}[0-9]{4}$/;

onMounted(() => {
  passengerList.value = props.list;
  sameInfo.value = props.isSame ?? false;
});

watch(
  () => props.list,
  () => {
    passengerList.value = props.list;
  },
  { deep: true }
);
watch(
  () => passengerList.value,
  async () => {
    validation();
  },
  { deep: true }
);

/**
 * @description 예약자와 이용자1 동일 정보 세팅
 */
const setPassengerSameInfo = (checked: boolean) => {
  passengerList.value[0].psngFrnm = checked ? authStore.getMbrNm : '';
  passengerList.value[0].psngMbphNo = checked ? authStore.getAuthInfo.mbrphNo : '';
  passengerList.value[0].psngGndrCd = checked ? authStore.getAuthInfo.genderCode : '';
};
/**
 * @description 티켓종류별 인원수 카운팅
 * @param data
 * @param idx
 */
const getIndex = (data: PassengerData, idx: number) => {
  if (idx === 0) return 1;
  const beforeTypeCd = passengerList.value[idx - 1]?.typeCd || '';
  if (beforeTypeCd !== data.typeCd) return 1;
  const list = passengerList.value.slice(0, idx - 1);
  let cnt = 2;
  list.reverse().some((d) => {
    if (d.typeCd === data.typeCd) cnt++;
    else return true;
  });

  return cnt;
};
/**
 * @description 이용자추가 예매 인원수까지만 이용자 추가 가능
 */

const addPassenger = async () => {
  const userInfo = passengerList.value.find((data) => data.isShow === false);
  if (userInfo) userInfo.isShow = true;
  else {
    const appBridge = await getAppBridge();
    if (passengerList.value.length >= props.maxCnt) {
      appBridge.showToast({ message: '예매 인원수를 초과하였습니다.' });
      return;
    }
  }
};

/**
 * @description 이용자정보 삭제
 */
const deletePassenger = (index: number) => {
  if (!passengerList.value.find((data, idx) => idx === index)) return;
  const userIdx = passengerList.value.findIndex((data, idx) => idx === index);

  if (userIdx > -1) {
    passengerList.value[userIdx].psngFrnm = '';
    passengerList.value[userIdx].psngMbphNo = '';
    passengerList.value[userIdx].psngGndrCd = '';
    passengerList.value[userIdx].isShow = false;
  }
};
/**
 * @description input 입력시 예약자정보와 동일하기 체크해제
 * @param isFirst
 */
const setSameInfo = (isFirst: boolean) => {
  if (!props.isRsrvPage || !isFirst) return;
  sameInfo.value = false;
};

/**
 * @description 이용자정보 유효성검사
 */
const validation = async (isFirst?: boolean) => {
  if (isFirst) sameInfo.value = false;
  let noValid = true;
  if (passengerList.value.length > 0) {
    noValid = passengerList.value
      .filter((d) => d.isShow)
      .some((d) => {
        return (
          !nameRegx.test(d.psngFrnm ?? '') || !mobRegx.test(d.psngMbphNo ?? '') || !d.psngGndrCd || d.psngGndrCd === ''
        );
      });
  }
  emits('valid', !noValid, passengerList.value, sameInfo.value);
};
</script>
