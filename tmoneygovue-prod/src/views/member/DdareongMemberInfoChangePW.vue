<template>
  <sub-header title="따릉이 비밀번호 변경" bg-color="#F4F4F4" />
  <main id="main" class="main mor">
    <div class="container bottom_btns">
      <div class="user_bike_change">
        <p class="desc">비밀번호는 8~12자리의 영문, 숫자, 특수문자 조합으로 만들어주세요.</p>
        <round-box hide-title>
          <form>
            <uu-input
              ref="currentPwRef"
              v-model="currentPw"
              type="password"
              label="사용중인 비밀번호"
              placeholder="영문/숫자/특수문자 8~12자리"
              :error="currentPwError"
              :error-message="currentPwWarning"
            />
            <uu-input
              v-model="newPw"
              type="password"
              label="신규 비밀번호"
              placeholder="영문/숫자/특수문자 8~12자리"
              :error="newPwError"
              :error-message="newPwWarning"
            />
            <uu-input
              v-model="newPwAgain"
              type="password"
              label="신규 비밀번호 재입력"
              placeholder="영문/숫자/특수문자 8~12자리"
              :error="newPwAgainError"
              :error-message="newPwAgainWarning"
            />
          </form>
        </round-box>
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" :disabled="isDisabled" label="변경하기" @Click="changePW" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useMessageModal } from '@/composables/useMessageModal';
import { useMemberStore } from '@/service/member/memberModule';
import { useAuthStore } from '@/service/auth/authModule';
import { getAppBridge } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberStore = useMemberStore();
const authStore = useAuthStore();
const { createNotificationModal } = useMessageModal();

const currentPwRef = ref();
const currentPw = ref(''); // 현재 비밀번호
const newPw = ref(''); // 신규 비밀번호
const newPwAgain = ref(''); // 신규 비밀번호 확인
const currentPwError = ref(false); // 현재 비밀번호 유효성 에러
const newPwError = ref(false); // 신규 비밀번호 유효성 에러
const newPwAgainError = ref(false); // 신규 재입력 비밀번호 유효성 에러
const currentPwWarning = ref(''); // 현재 비밀번호 에러 메시지
const newPwWarning = ref(''); // 신규 비밀번호 에러 메시지
const newPwAgainWarning = ref(''); // 신규 재입력 비밀번호 에러 메시지
// const passwordFont = ref(authStore.getAuthInfo.osKnd === 'I');

// 신규 비밀번호 체크
const isValidPw = (pw: string) => {
  // 비밀번호 정규식 (특수문자/문자/숫자 포함 형태의 8~12자리 이내의 암호 정규식)
  // ~!@#$%^&*()<>{}[\]_\-+=\\/.,;:'"
  const regex =
    /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()<>{}[\]_\-+=\\/.,;:'"])(?=.*[0-9])[a-zA-Z~!@#$%^&*()<>{}[\]_\-+=\\/.,;:'"0-9]{8,12}$/;
  return pw ? regex.test(pw) : true;
};

// 기존 비밀번호 체크
const isValidShortPW = (pw: string) => {
  let ret = false;
  if (pw.length >= 6) {
    ret = true;
  }
  return ret;
};

// 비밀번호 변경하기 버튼 활성화/비활성화
const isDisabled = computed(() => {
  return (
    currentPwError.value ||
    newPwError.value ||
    newPwAgainError.value ||
    !currentPw.value ||
    !newPw.value ||
    !newPwAgain.value
  );
});

watch([currentPw, newPw, newPwAgain], () => {
  if (!isValidShortPW(currentPw.value)) {
    currentPwWarning.value = '형식에 맞게 입력해 주세요.';
    currentPwError.value = true;
  } else {
    currentPwError.value = false;
  }
  if (!isValidPw(newPw.value)) {
    newPwWarning.value = '형식에 맞게 입력해 주세요.';
    newPwError.value = true;
  } else if (currentPw.value && newPw.value && newPw.value === currentPw.value) {
    newPwWarning.value = '사용중인 비밀번호와 동일하여 사용 할 수 없습니다.';
    newPwError.value = true;
  } else {
    newPwError.value = false;
  }
  if (newPwAgain.value && newPw.value && newPw.value !== newPwAgain.value) {
    newPwAgainWarning.value = '신규 비밀번호가 일치하지 않습니다.';
    newPwAgainError.value = true;
  } else {
    newPwAgainError.value = false;
  }
});

// 비밀번호 변경
const changePW = async () => {
  const appBridge = await getAppBridge();
  // 따릉이 비밀번호 암호화 브릿지
  const encPw = await appBridge.encSeoulBikePassword({ oldPw: currentPw.value, newPw: newPw.value });
  const res = await memberStore.changeDdareongPW(encPw.cipherOldPw, encPw.cipherNewPw, authStore.getAuthInfo.mbrphNo);
  if (res.scsYn === 'Y') {
    createNotificationModal('회원정보 변경', '새로운 비밀번호로 변경되었습니다.', () => goMemberStatPage());
  } else {
    currentPwWarning.value = '기존 비밀번호와 일치하지 않습니다.';
    currentPwError.value = true;
    currentPwRef.value.focus();
  }
};

const goMemberStatPage = () => {
  router.back();
};
</script>
