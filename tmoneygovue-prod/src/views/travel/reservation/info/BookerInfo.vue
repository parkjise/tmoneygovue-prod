<template>
  <round-box title="예약자 정보">
    <ul ref="bookerUlRef" class="normal_list" :class="classList">
      <li>
        <div class="list_tit">예약자</div>
        <div class="list_txt">{{ props.info.psngFrnm }}</div>
      </li>
      <li>
        <div class="list_tit">연락처</div>
        <div class="list_txt">{{ getMbphNo }}</div>
      </li>
      <template v-if="!isRsrvPage && !isTicketPrd">
        <li>
          <div class="list_tit">이메일</div>
          <div class="list_txt">{{ props.info.psngEmail }}</div>
        </li>
        <li>
          <div class="list_tit">요청사항</div>
          <div class="list_txt">{{ props.info.mrnpReqCtt }}</div>
        </li>
        <p class="paraphrase">*이용자 정보는 출발일 기준 24시간 이전에만 입력 가능합니다.</p>
        <div class="btn_area">
          <uu-button
            size="md"
            btn-style="line"
            label="이용자 정보 수정"
            aria-label="이용자 정보 수정"
            :disabled="modifyDisabeld"
            @click="clickModify"
          />
        </div>
      </template>
    </ul>
    <form v-if="isRsrvPage">
      <uu-input
        v-model="psngEmail"
        label="이메일 (선택)"
        aria-label="이메일 (선택)"
        placeholder="이메일 주소를 입력해 주세요"
        validation="email"
        :required="false"
        :error-message="emailErrMsg"
        :max-length="emailMaxLen"
        @valid="setValidEmail"
      />
      <uu-input
        v-model="mrnpReqCtt"
        label="추가 요청사항 (선택)"
        aria-label="추가 요청사항 (선택)"
        placeholder="최대 50자 이내로 입력해주세요"
        :max-length="reqCttMaxLen"
      />
    </form>
  </round-box>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

interface Booker {
  info: {
    psngFrnm: string;
    psngMbphNo: string;
    psngEmail?: string;
    mrnpReqCtt?: string;
  };
  isTicketPrd: boolean;
  modifyDisabeld?: boolean;
  /**
   * 예약하기-정보입력 true
   * 이용내역-예약정보 false
   */
  isRsrvPage?: boolean;
}

const props = defineProps<Booker>();
const emits = defineEmits(['modify', 'email', 'reqCtt']);

const bookerUlRef = ref();
const classList = ref<String[]>([]);

const emailMaxLen = 30; // 이메일 max length
const reqCttMaxLen = 50; // 요청사항 max length
const psngEmail = ref(''); // 예약자 이메일 input
const mrnpReqCtt = ref(''); // 요청사항 input

const validEmail = ref(true); // 이메일 유효성검사

const emailErrMsg = ref('이메일을 정확히 입력해주세요.');

watch(
  () => {
    props.info.psngEmail, props.info.mrnpReqCtt;
  },
  () => setBooker(),
  { deep: true }
);
onMounted(() => {
  setBooker();
  classList.value = props.isRsrvPage ? ['user_info_list'] : ['between'];
  const valid = props.info.psngFrnm !== '' && props.info.psngMbphNo !== '';
  emits('email', valid, psngEmail.value);
  emits('reqCtt', mrnpReqCtt.value);
});

const getMbphNo = computed(() => {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const match = props.info.psngMbphNo.match(regex);
  return match ? `01${match[1]}-${match[2]}-${match[3]}` : '';
});

const sliceReqContent = computed(() => {
  return mrnpReqCtt.value.slice(0, reqCttMaxLen);
});

const setBooker = () => {
  psngEmail.value = props.info.psngEmail ?? '';
  mrnpReqCtt.value = props.info.mrnpReqCtt ?? '';
};

watch(sliceReqContent, (newValue) => {
  if (newValue !== mrnpReqCtt.value) {
    mrnpReqCtt.value = newValue;
  }
});
watch(
  () => mrnpReqCtt.value,
  () => {
    emits('reqCtt', mrnpReqCtt.value);
  }
);

/**
 * @description 이메일 체크
 * @param valid
 */
const setValidEmail = (valid: boolean) => {
  validEmail.value = valid;
  emits('email', valid, psngEmail.value);
};

const clickModify = () => {
  emits('modify', psngEmail.value, mrnpReqCtt.value);
};
</script>
