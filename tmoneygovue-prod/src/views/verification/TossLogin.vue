<template>
  <sub-header :title="'토스인증'" :hide-title="true" :bg-color="'#FFF'" />
  <main class="main verification">
    <div class="container bg-white bottom_btns pt12">
      <p class="img_area">
        <img src="/assets/images/toss_logo.svg" alt="토스앱" />
      </p>
      <div class="verification_txt">
        <p class="b_txt">토스(TOSS) 인증서 확인</p>
        <p class="s_txt">개인정보 입력 후 인증을 요청해 주세요.</p>
      </div>
      <round-box :hideTitle="true">
        <form>
          <uu-input
            v-model="tossDetails.userName"
            :label="'이름'"
            :aria-label="'이름'"
            placeholder="이름"
            :required="true"
            :error="!isNameValid && isNameTouched"
            :error-message="'이름을 입력해주세요.'"
            @input="isNameTouched = true"
          />
          <uu-input
            v-model="tossDetails.userBirthday"
            :label="'생년월일'"
            :aria-label="'생년월일 숫자 8자리'"
            placeholder="생년월일 숫자 8자리"
            :type="'number'"
            :max-length="8"
            :required="true"
            :error="!isBirthValid && isBirthTouched"
            :error-message="'생년월일 숫자 8자리를 입력해 주세요.'"
            @input="isBirthTouched = true"
          />
          <uu-input
            v-model="tossDetails.userPhone"
            :label="'휴대전화'"
            :aria-label="'전화번호 숫자 11자리'"
            placeholder="01012341234"
            :type="'tel'"
            :max-length="11"
            :required="true"
            :error="!isPhoneValid && isPhoneTouched"
            :error-message="'휴대전화번호 숫자 11자리를 입력해 주세요.'"
            @input="isPhoneTouched = true"
          />
        </form>
      </round-box>
      <div class="btn_area">
        <uu-button
          :size="'xl'"
          :btn-color="'primary'"
          :label="'인증하기'"
          @click="isShowBottom = true"
          :disabled="isDisabled"
        />
      </div>
    </div>
  </main>
  <toss-terms-popup
    :isShowBottomSheet="isShowBottom"
    @accept="openToss"
    @close="isShowBottom = false"
  />
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import { computed, reactive, ref } from 'vue'
import TossTermsPopup from '@/views/verification/component/TossTermsPopup.vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import RoundBox from '@/components/layout/RoundBox.vue'
import router from '@/router'
import type { reqTossLoginModel } from '@/service/member/model/memberModel'
import { useMemberStore } from '@/service/member/memberModule'
import { useAuthStore } from '@/service/auth/authModule'
import { getAppBridge } from '@/utils'

const authStore = useAuthStore()
const memberStore = useMemberStore()
const isShowBottom = ref(false)

const isNameTouched = ref(false)
const isPhoneTouched = ref(false)
const isBirthTouched = ref(false)
const isDisabled = computed(() => {
  return !(isNameValid.value && isPhoneValid.value && isBirthValid.value)
})
const isNameValid = computed(() => checkName(tossDetails.userName))
const isPhoneValid = computed(() => checkPhoneNumber(tossDetails.userPhone))
const isBirthValid = computed(() => /^\d{8}$/.test(tossDetails.userBirthday))

const tossDetails: reqTossLoginModel = reactive({
  triggerType: 'APP_SCHEME', //고정값
  userName: '',
  userPhone: '',
  userBirthday: ''
})

const checkName = (value: string) => {
  if (!value) return false

  const regex = /^[가-힣]+$/
  return regex.test(value)
}

const checkPhoneNumber = (value: string) => {
  if (!value) return false

  const regex = /^01[016789]{1}[0-9]{8}$/
  return regex.test(value)
}

/**
 * @description 토스 인증 호출
 */
const openToss = async () => {
  isShowBottom.value = false
  try {
    const reg = await memberStore.actionTossAuth(tossDetails)
    if (reg && reg.rspCd && reg.rspCd == '0000') {
      //토스 대기화면으로 이동
      router.replace({ path: '/verification/toss' })
    } else {
      router.replace({ path: '/verification/fail' })
    }
  } catch (error) {
    console.error('Toss 인증 요청 실패:', error)
  }
}
</script>
