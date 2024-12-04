<template>
  <sub-header title="따릉이 이메일 변경" bg-color="#F4F4F4" />
  <main id="main" class="main mor">
    <div class="container bottom_btns">
      <div class="user_bike_change">
        <p class="desc">현재 사용중인 이메일 주소와 변경할 이메일 주소를 입력해 주세요.</p>
        <round-box hide-title>
          <form>
            <uu-input
              v-model="currentEmail"
              label="현재 이메일"
              placeholder="현재 이메일 주소"
              :error="currentEmailError"
              :error-message="currentEmailWarning"
            />
            <uu-input
              v-model="newEmail"
              label="변경할 이메일 주소"
              placeholder="변경할 이메일 주소"
              validation="email"
              :error="newEmailError"
              :error-message="newEmailWarning"
              @valid="setValidNewEmail"
            />
          </form>
        </round-box>
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" :disabled="isDisabled" label="변경하기" @click="changeEmail" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { useMemberStore } from '@/service/member/memberModule';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createNotificationModal } = useMessageModal();
const memberStore = useMemberStore();
const { getDdareongEmail } = storeToRefs(memberStore);

const currentEmail = ref(''); // 현재 이메일
const newEmail = ref(''); // 변경할 이메일
const isValidEmail = ref(true); //이메일 형식 확인
const currentEmailWarning = ref('이메일 주소와 일치하지 않습니다.'); // 현재 이메일 에러 메시지

const currentEmailError = computed(() => Boolean(currentEmail.value) && isNotCurrentEmail.value); // 현재 이메일 유효성 에러
const newEmailError = computed(() => Boolean(newEmail.value) && (!isValidEmail.value || isSameEmail.value)); // 변경할 이메일 유효성 에러

const isNotCurrentEmail = computed(() => currentEmail.value !== getDdareongEmail.value); // 입력한 이메일 = 현재 이메일
const isSameEmail = computed(() => getDdareongEmail.value === newEmail.value); //현재 이메일 = 변경할 이메일

// 새로운 이메일 에러 메시지
const newEmailWarning = computed(() => {
  if (isSameEmail.value) {
    return '로그인 중인 이메일 주소와 동일하여 사용할 수 없습니다.';
  }
  return '이메일 형식을 따라서 작성해 주세요.';
});

// 이메일 변경하기 버튼 활성화/비활성화
const isDisabled = computed(() => {
  return currentEmailError.value || newEmailError.value || !currentEmail.value || !newEmail.value;
});

// 이메일 체크
const setValidNewEmail = (valid: boolean) => {
  isValidEmail.value = valid;
};

// 이메일 변경
const changeEmail = async () => {
  const param = {
    entrDvsCd: 'T',
    prsMail: currentEmail.value,
    modMail: newEmail.value
  };
  const res = await memberStore.changeDdareongEmail(param);
  if (res.scsYn === 'Y') {
    createNotificationModal('회원정보 변경', '새로운 이메일로 변경되었습니다.', () => goMemberStatPage());
  }
};

const goMemberStatPage = () => {
  router.back();
};
</script>
