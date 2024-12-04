<template>
  <common-modal
    ref="CheckDriverLicenseRef"
    v-model="driverLicense"
    type="full"
    title="운전면허 등록"
    hide-title
    add-class="driver_regist"
    @ok="checkDriverLicense"
    @close="close"
  >
    <!-- <template #modal_header>
      <button type="button" class="btn_close close_left" aria-label="팝업 닫기">
        <uu-ic name="close" size="24" />
      </button>
    </template> -->
    <template #modal_body>
      <h4>운전면허 등록</h4>
      <p class="desc">운전면허증을 등록해 주세요</p>
      <round-box hide-title>
        <form>
          <uu-input
            ref="nmRef"
            v-model="memberNm"
            label="이름"
            placeholder="홍길동"
            :error="checkEngNm"
            :error-message="'영문일 경우 대문자/공백 없이 입력해 주세요.(예:KIMTIGO)'"
          />
          <uu-input
            ref="brdtRef"
            v-model="authStore.getAuthInfo.mbrBrdt"
            label="생년월일"
            placeholder="19771122"
            readonly
            @focus="brdtRef.blur()"
          />
          <div class="driver_case">
            <p>면허종류</p>
            <uu-button
              ref="driverCase"
              btn-style="line"
              :label="licenseStore.checkedLcnsKndNm"
              @click="driverCaseOpen"
              aria-controls="bottomSheetModal"
              aria-expanded="false"
            >
              <span>{{ licenseStore.checkedLcnsKndNm }}</span>
              <uu-ic size="20" name="arrow" />
              <span class="sr_only">면허종류 선택하기</span>
            </uu-button>
          </div>
          <div class="driver_num">
            <p>운전면허번호</p>
            <div class="inline_form_wrap">
              <uu-input
                ref="lcnsNo1Ref"
                type="text"
                v-model="lcnsNo1"
                inline
                placeholder="지역or코드"
                hide-label
                :aria-label="`운전면허번호 첫번째 지역 또는 코드 ${lcnsNo1.length ? '' : '힌트'}`"
                label="지역 또는 코드"
                :maxLength="2"
                @input="checklcnsNo($event, 2, lcnsNo2Ref)"
              />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="lcnsNo2Ref"
                type="text"
                v-model="lcnsNo2"
                inputmode="numeric"
                inline
                placeholder="00"
                hide-label
                label="지역 코드 앞 2자리"
                :aria-label="`운전면허번호 두번째 자리 최초 면허 발급년도 ${lcnsNo2.length ? '' : '힌트'}`"
                :maxLength="2"
                @input="checklcnsNo($event, 2, lcnsNo3Ref)"
              />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="lcnsNo3Ref"
                type="text"
                v-model="lcnsNo3"
                inputmode="numeric"
                inline
                placeholder="000000"
                hide-label
                label="지역 코드 중간 6자리"
                :aria-label="`운전면허번호 세번째 자리 연도별 일련번호 ${lcnsNo3.length ? '' : '힌트'}`"
                :maxLength="6"
                @input="checklcnsNo($event, 6, lcnsNo4Ref)"
              />
              <span class="dash" aria-hidden="true">-</span>
              <uu-input
                ref="lcnsNo4Ref"
                type="text"
                v-model="lcnsNo4"
                inputmode="numeric"
                inline
                placeholder="00"
                hide-label
                label="지역 코드 뒤 2자리"
                :aria-label="`지역 코드 뒤 2자리 ${lcnsNo4.length ? '' : '힌트'}`"
                :maxLength="2"
                @input="checklcnsNo($event, 2)"
              />
            </div>
            <p class="error" v-show="!isValidInputLcnsNo">운전면허번호를 정확히 입력해주세요.</p>
          </div>
          <div class="img_area">
            <img
              src="/assets/images/img_driver.png"
              alt="자동차운전면허증 예시, 일련번호 첫번째 두자리는 지역코드로 서울 또는 11 등으로 표기 됩니다."
            />
          </div>
          <div class="checkbox_area">
            <div class="flex_area" v-for="(term, index) in driverLicenceTermList" :key="index">
              <uu-checkbox
                v-model="term.stplCheck"
                :value="term.stplSno"
                :aria-label="
                  term.stplTtlNm.endsWith('(필수)') || term.stplTtlNm.endsWith('(선택)')
                    ? term.stplTtlNm
                    : term.stplTtlNm + ' (' + (term.stplMndtYn == 'Y' ? '필수' : '선택') + ')'
                "
              >
                <span>{{
                  term.stplTtlNm.endsWith('(필수)') || term.stplTtlNm.endsWith('(선택)')
                    ? term.stplTtlNm
                    : term.stplTtlNm + ' (' + (term.stplMndtYn == 'Y' ? '필수' : '선택') + ')'
                }}</span>
              </uu-checkbox>
              <uu-button
                v-if="detailUrl(term.extlUrl, term.stplUrl) !== null"
                @click="onClickTermDetailPage(term)"
              >
                <uu-ic size="16" name="arrow_right_gray" />
                <span class="sr_only" aria-hidden="false"
                  >{{ term.stplTtlNm }} 페이지 이동하기</span
                >
              </uu-button>
            </div>
          </div>
        </form>
      </round-box>
    </template>
    <template #modal_footer>
      <uu-button
        btn-color="primary"
        size="xl"
        label="완료"
        @click="checkDriverLicense"
        :disabled="isDisabled"
      />
    </template>
  </common-modal>
  <!--면허 종류 선택-->
  <driver-case-bottom-sheet
    :is-show="showDriverCase"
    @close="closeDriverCase"
    ref="bottomSheetModal"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DriverCaseBottomSheet from '@/views/member/components/DriverCaseBottomSheet.vue'
import { useDriverLicense } from '@/service/member/driverLicenseModule'
import { useMessageModal } from '@/composables/useMessageModal'
import { useCommonStore } from '@/service/common/commonModule'
import { encodeUriRouterPath } from '@/utils/linkUtils'
import type { stplInfo } from '@/service/member/model/driverLicenseModel'
import { useAuthStore } from '@/service/auth/authModule'
import { getAppBridge } from '@/utils'
import { logger } from '@/utils/logger'
import { useRouter } from 'vue-router'
import { FlexResponseCode } from '@/utils/hybrid/type'
import { throttle } from 'lodash-es'
import CommonModal from '../common/components/CommonModal.vue'

const router = useRouter()
const { createNotificationModal } = useMessageModal()
const licenseStore = useDriverLicense()

const driverLicense = ref(true)
const nmRef = ref()
const brdtRef = ref()

const showDriverCase = ref(false) // 면허 종류 선택
const authStore = useAuthStore()

const lcnsNo1 = ref('')
const lcnsNo2 = ref('')
const lcnsNo3 = ref('')
const lcnsNo4 = ref('')

const lcnsNo1Ref = ref()
const lcnsNo2Ref = ref()
const lcnsNo3Ref = ref()
const lcnsNo4Ref = ref()

const memberNm = ref(authStore.getAuthInfo.mbrNm)

const driverCase = ref()

const driverLicenceTermList = computed(() => licenseStore.getDriverLicenceTermList) // 약관목록

// 운전면허 등록 입력 정보 유효성 검사(등록 버튼 활성화/비활성화)
const isDisabled = computed(() => {
  return !(
    memberNm.value.length > 1 &&
    lcnsNo1.value.length === 2 &&
    lcnsNo2.value.length === 2 &&
    lcnsNo3.value.length === 6 &&
    lcnsNo4.value.length === 2 &&
    checkTerm.value &&
    licenseStore.checkedLcnsKndCd != ''
  )
})

const checkEngNm = computed(() => {
  return !/^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/.test(memberNm.value)
})

// 운전면허 번호 유효성 검사
const isValidInputLcnsNo = computed(() => {
  if (lcnsNo1.value || lcnsNo2.value || lcnsNo3.value || lcnsNo4.value) {
    const isLcnsNo1Korean = /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/.test(lcnsNo1.value)
    const isLcnsNo1Valid =
      lcnsNo1.value.length === 2 && (!/^[A-Za-z]{2}$/.test(lcnsNo1.value) || isLcnsNo1Korean)

    return (
      isLcnsNo1Valid &&
      lcnsNo2.value.length === 2 &&
      lcnsNo3.value.length === 6 &&
      lcnsNo4.value.length === 2
    )
  } else {
    return true
  }
})

// 필수 약관 체크 확인
const checkTerm = computed(() => {
  let flag = true
  for (let el of driverLicenceTermList.value) {
    if (el.stplMndtYn == 'Y' && !el.stplCheck) {
      flag = false
      break
    }
  }
  return flag
})

// 약관 목록 조회
async function getDriverLicenceTermList() {
  await licenseStore.setDriverLicenceTermList('mbrsDrvReg1')
}

// 운전면허 등록
async function checkDriverLicense() {
  const param = {
    mbrsNm: memberNm.value ? memberNm.value : authStore.getAuthInfo.mbrNm, // 회원명
    mbrsBrdt: authStore.getAuthInfo.mbrBrdt, // 생년월일
    lcnsNo1: lcnsNo1.value,
    lcnsNo2: lcnsNo2.value,
    lcnsNo3: lcnsNo3.value,
    lcnsNo4: lcnsNo4.value,
    reqEncYn: 'Y',
    lcnsKndCd: licenseStore.checkedLcnsKndCd // 면허코드
  }

  const res = await licenseStore.checkDriverLicense(param)

  if (res.scsYn == 'Y') {
    //TODO 암호화 해제 브릿지
    const appBridge = await getAppBridge()
    const getXXScsYn = await appBridge.decScsYn({ encScsYn: res.encScsYn, encDtm: res.encDtm })

    if (getXXScsYn.response.code === FlexResponseCode.OK && getXXScsYn.decScsYn === 'Y') {
      logger.debug('운전면허증 복호화 브릿지')
      // 네이티브에서 운전면허 등록 여부 체크하기 위해 callAppPreference 브릿지 호출하여 preference 값 설정
      await appBridge.callAppPreference({ type: 'set', key: 'sctrLicenseYN', value: 'Y' })
      router.back()
    } else {
      createNotificationModal('등록불가', res.msg)
    }
  } else {
    createNotificationModal('등록불가', res.msg)
  }
}

const driverCaseOpen = () => {
  showDriverCase.value = true
}

const closeDriverCase = () => {
  showDriverCase.value = false
}

// input event
const checklcnsNo = throttle((event: any, max: number, lcnsNoRef?: any) => {
  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/
  if (koreanRegex.test(event)) {
    // 첫번째 input이 한글이면
    return
  } else {
    if (event.length === max && lcnsNoRef) {
      lcnsNoRef.focus()
    }
  }
}, 400)

// 약관 상세 보기
const onClickTermDetailPage = async (term: stplInfo) => {
  const url = detailUrl(term.extlUrl, term.stplUrl)
  if (url.includes('/webview/')) {
    const commonStore = useCommonStore()
    commonStore.setRouterHeaderTitle(term.stplTtlNm || null)
    router.push({ path: encodeUriRouterPath(url) })
    return
  }
  // openView 브릿지 호출
  const appBridge = await getAppBridge()
  await appBridge.openView({
    url: url,
    headerTitle: term.stplTtlNm,
    viewType: 'in'
  })
}

// 약관상세 URL
const detailUrl = (extlUrl: string, stplUrl: string) => {
  return extlUrl ? extlUrl : stplUrl ? '' : stplUrl
}

onMounted(() => {
  getDriverLicenceTermList()
})

const close = () => {
  router.back()
}
</script>

<style scoped>
.modal.driver_regist
  .modal_dialog
  .modal_content
  .modal_body
  .round_box
  form
  .checkbox_area
  .flex_area
  .btn {
  height: 1.6rem;
  position: relative;
}
</style>
