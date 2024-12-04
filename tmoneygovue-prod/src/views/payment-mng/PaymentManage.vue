<!-- 
  결제수단 관리
  pubPath: tmoney/Spa/DET/DET044.vue
  @author dh.kim
-->
<template>
  <sub-header title="결제수단 관리" />
  <main id="main" class="main det">
    <div class="container">
      <div class="payment_manage_area">
        <TmoneyBizPayComponent :onDeletionPossibility="deletionPossibility" />
        <NaverPayComponent :onDeletionPossibility="deletionPossibility" />
        <TossPayComponent :onDeletionPossibility="deletionPossibility" />
        <SmpcPayComponent :onDeletionPossibility="deletionPossibility" />
        <PaymentPasswordComponent :onDeletionPossibility="deletionPossibility" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import TmoneyBizPayComponent from './components/TmoneyBizPayComponent.vue'
import NaverPayComponent from './components/NaverPayComponent.vue'
import TossPayComponent from './components/TossPayComponent.vue'
import SmpcPayComponent from './components/SmpcPayComponent.vue'
import PaymentPasswordComponent from './components/PaymentPasswordComponent.vue'
import { usePaymentManageStore } from '@/service/payment/paymentManageModule'
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/dateUtils'
import type { RequestDeletionPossibility } from '@/service/payment/model/requestModel'
import { getAppBridge } from '@/utils'
import { useMessageModal } from '@/composables/useMessageModal'
import { PYM_MNS_ID } from '@/service/payment/paymentConsts'
import { useAuthStore } from '@/service/auth/authModule'
const { createSuccessModal } = useMessageModal()

const paymentManagementStore = usePaymentManageStore()
const authStore = useAuthStore()
const deletionPossibilityInfo = ref<RequestDeletionPossibility>({
  pymMnsId: '',
  paymentKey: ''
})

// mounted시 실행
onMounted(() => {
  const today = formatDate(new Date(), 'YYYYMMDDHHmmss')
  const params = {
    reqDtm: today,
    inqrDtm: today
  }
  // 대표결제수단 조회
  paymentManagementStore.requestRepresentManagement(params)
  // 사용자별 결제 수단 목록 조회
  paymentManagementStore.requestPaymentManagement()
  // 결제 비밀번호 상태 조회
  paymentManagementStore.requestPaymentStatusInfo()
})

const isPossibility = ref(false)

/**
 * 결제카드 삭제 가능 여부 조회
 * @param {string} pymMnsId 결제수단ID
 * @param {string} paymentKey 결제 Key(신용카드일 경우 필)
 */
const deletionPossibility = async (
  requestParams: RequestDeletionPossibility,
  onSuccess: Function
) => {
  // 삭제 가능 여부 조회 API 연동
  deletionPossibilityInfo.value.pymMnsId = requestParams.pymMnsId
  deletionPossibilityInfo.value.paymentKey = requestParams.paymentKey || ''

  // version Check 2.4.5 일때만 실행
  const currentVer = authStore.getAuthInfo.appVer
  if (currentVer == '2.4.5') {
    const res = await paymentManagementStore.requestDeletionPossibility(
      deletionPossibilityInfo.value
    )

    // 가능여부(dtlPsbYn) Y일 경우에만 삭제 진행
    if (res && res.dtlPsbYn === 'Y') {
      isPossibility.value = true
      onSuccess(isPossibility.value)
    } else {
      isPossibility.value = false
      onSuccess(isPossibility.value)
      createSuccessModal('', res?.msg || '재시도 해주시기 바랍니다.')
    }
  } else {
    isPossibility.value = true
    onSuccess(isPossibility.value)
  }

  return {
    deletionPossibility
  }
}
</script>
