<template>
  <!-- <div>
    약관동의
  </div> -->
  <!-- header -->
  <sub-header
    :title="'약관 동의'"
    :hide-title="true"
    :bg-color="'#F4F4F4'"
    :click-callback="backPage"
  />
  <!-- // header -->
  <!-- main -->
  <main class="main det">
    <div class="container bottom_btns pt12">
      <div class="card_agree_area">
        <h4>약관 동의</h4>
        <p class="text">약관동의를 진행해 주세요</p>
        <form>
          <round-box :hide-title="true">
            <uu-checkbox :label="'전체동의'" v-model="allChecked" @change="handleAllCheckChange" />
          </round-box>
          <!-- <p class="desc">{{ termsInfo.stplList[0]?.stplGrpDesc }}</p> -->
          <!-- 아코디언 -->
          <round-box v-if="termsInfo.stplList.length > 1" :hideTitle="false" class="item_check">
            <div class="flex-between" v-for="item in termsInfo.stplList">
              <uu-accordion multiple>
                <uu-accordion-item :header="item.isRequired ? `${item.stplGrpNm} 필수` : `${item.stplGrpNm} 선택`" :is-icon-aria-hidden="false" :checkType="true">
                  <template #accordion_header>
                    <uu-checkbox
                      :label="
                        item.isRequired
                          ? `${item.stplGrpNm}`
                          : `${item.stplGrpNm}<span class='choice'>(선택)</span>`
                      "
                      :value="item.utlzSvcDvsCd"
                      v-model="item.isChecked"
                      :isHtmlLabel="true"
                      @change="(value) => handleGroupCheckChange(item.utlzSvcDvsCd, value)"
                    />
                  </template>
                  <template #accordion_body>
                    <div v-for="stplDtl in item.stplDtlList" >
                      <uu-checkbox
                        v-if="item.isRequired"
                        :label="
                          stplDtl.mndtYn == 'Y'
                            ? `${stplDtl.ttl}<span>(필수)</span>`
                            : `${stplDtl.ttl}<span class='choice'>(선택)</span>`
                        "
                        :value="stplDtl.sno"
                        v-model="stplDtl.stplCheck"
                        :isHtmlLabel="true"
                        @change="(value) => handleCheckChange()"
                      />
                      <div class="check_none">
                        <span v-if="!item.isRequired">{{ stplDtl.ttl }}</span>
                      </div>
                      <uu-button :label="stplDtl.ttl" @click="goHistoryPage(stplDtl)" :aria-label="stplDtl.ttl+' 이동'">
                        <uu-ic :size="24" :name="'navi_right'" />
                      </uu-button>
                    </div>
                  </template>
                </uu-accordion-item>
              </uu-accordion>
            </div>
          </round-box>
          <!-- 노아코디언 -->
          <round-box v-else>
            <div v-if="termsInfo.stplList[0]">
              <uu-checkbox
                :label="`${termsInfo.stplList[0].stplGrpNm}`"
                :value="`${termsInfo.stplList[0].utlzSvcDvsCd}`"
                v-model="termsInfo.stplList[0].isChecked"
                :isHtmlLabel="true"
                @change="
                  (value) => handleGroupCheckChange(termsInfo.stplList[0].utlzSvcDvsCd, value)
                "
              />
              <div class="agree_check_detail">
                <div v-for="stplDtl in termsInfo.stplList[0].stplDtlList">
                  <uu-checkbox
                    :label="
                      stplDtl.mndtYn == 'Y'
                        ? `${stplDtl.ttl}<span>(필수)</span>`
                        : `${stplDtl.ttl}<span class='choice'>(선택)</span>`
                    "
                    :value="stplDtl.sno"
                    v-model="stplDtl.stplCheck"
                    :isHtmlLabel="true"
                    @change="(value) => handleCheckChange()"
                  />
                  <uu-button :label="'${stplDtl.ttl}'" @click="goHistoryPage(stplDtl)">
                    <uu-ic :size="24" :name="'navi_right'" />
                  </uu-button>
                </div>
              </div>
            </div>
          </round-box>
        </form>
      </div>
      <div class="btn_area">
        <uu-button
          :size="'xl'"
          :btn-color="'primary'"
          :label="'다음'"
          :disabled="!getStplListCanAgree"
          @click="termsAgree"
        />
      </div>
    </div>
  </main>
  <!-- // main -->
  <!-- 최초가입 약관동의 팝업 -->
  <accept-terms-popup :is-show="termsPopup" @accept="termsPopup = false" @close="close" />
  <!-- 회원가입 취소 팝업 -->
  <join-cancel-popup :is-show="cancelPopup" @accept="close" @close="cancelPopup = false" />
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import uuIc from '@/components/uu-components/UuIc.vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import RoundBox from '@/components/layout/RoundBox.vue'
import UuCheckbox from '@/components/uu-components/UuCheckbox.vue'
import { useMessageModal } from '@/composables/useMessageModal'
import type { ReqTermsAgree } from '@/service/terms/model/requestModel'
import { useTermsStore, type ServiceMap } from '@/service/terms/termsModule'
import { useAuthStore } from '@/service/auth/authModule';
import { onMounted, ref } from 'vue'
import { crtnMbrsLnkgSvcInfo } from '@/service/terms/termsApi'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { getAppBridge } from '@/utils'
import type { StplDtlInfo } from '@/service/terms/model/termsModel'
import { useRoute } from 'vue-router'
import AcceptTermsPopup from '@/views/verification/component/AcceptTermsPopup.vue';
import JoinCancelPopup from '@/views/verification/component/JoinCancelPopup.vue';

const route = useRoute()
const termsStore = useTermsStore()
const authStore = useAuthStore();
const { reqTermsInfo, termsInfo, getAgreedStplList, getStplListCanAgree, allChecked } =
  storeToRefs(termsStore)
const { createErrorModal } = useMessageModal()
const termsPopup = ref(false); //약관동의 팝업
const cancelPopup = ref(false); //회원가입 취소 팝업
const { getIdentityInfo } = storeToRefs(authStore);
const page: keyof ServiceMap | any = route.query?.page || 'S'
const prePage = authStore.getPreVerification
const isLogin = ref(false); 

// 약관 호출부
onMounted(async () => {
  if(getIdentityInfo.value.prsnAuthResult?.tGo1Yn == 'Y'){
    termsPopup.value = true;
  }else{
    termsPopup.value = false;
  }

  //전체 약관조회 api 호출
  await termsStore.setHttpTermsListAll()

  console.log('page : ',page);
  if(getIdentityInfo.value.prsnAuthResult?.joinYn != 'Y'){//신규가입
    isLogin.value = true;
    if (page == 'S') {
      termsInfo.value.stplList = termsInfo.value.stplList.filter((item) => {
        if (['S', 'O', 'B'].includes(item.utlzSvcDvsCd)) {
          if (item.utlzSvcDvsCd == 'S') item.isRequired = true
          else item.isRequired = false
          return item
        }
      })
    } else {
      termsInfo.value.stplList = termsInfo.value.stplList.filter((item) => {
        if (['S', page].includes(item.utlzSvcDvsCd)) {
          item.isRequired = true
          return item
        }
      })
    }
  }else{//기존회원
    isLogin.value = false;
    termsInfo.value.stplList = termsInfo.value.stplList.filter((item) => item.utlzSvcDvsCd == page)
  }
})

// 전체동의 체크시 리스트 전체 체크처리 변경
const handleAllCheckChange = (isChecked: boolean) => {
  termsStore.checkAllList(isChecked)
}

// 그룹별동의 체크시 그룹전체 체크처리 변경
const handleGroupCheckChange = (group: string, isChecked: boolean) => {
  termsStore.checkGroupList(group, isChecked)
}

// 개별 동의 체크
const handleCheckChange = () => {
  termsStore.allCheckChange()
}

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
 const moveTmoneyGo = async () => {
  console.log('moveTmoneyGo');
  const appBridge = await getAppBridge();
  await appBridge.closeWebView();
};

/**
 * 닫기
 */
 const close = async () => {
  if (prePage) {
    authStore.setPreVerification(null);
    router.replace({ path: '/main/more-main' })
  } else {
    moveTmoneyGo()
  }
}

/**
 * 닫기
 */
 const backPage = async () => {
  if (isLogin.value) {
    cancelPopup.value = true;
  } else {
    moveTmoneyGo()
  }
}

// 약관 상세 이동시
const url = `${import.meta.env.VITE_TMONEY_URL}/webview/mbrs/stpl/v2/`
const goHistoryPage = async (stplDtl: StplDtlInfo) => {
  const appBridge = await getAppBridge()
  let urlPath = ''
  if (stplDtl.extlUrl !== undefined && stplDtl.extlUrl !== null && stplDtl.extlUrl !== '') {
    urlPath = stplDtl.extlUrl
  } else if (stplDtl.url?.startsWith('http')) {
    urlPath = stplDtl.url
  } else {
    urlPath = `${url}${stplDtl.sno}.do`
  }
  if (urlPath !== '') {
    await appBridge.openView({
      url: urlPath,
      viewType: 'in',
      headerTitle: stplDtl.ttl
    })
  }
}

// 동의처리
const termsAgree = async () => {
  console.log('termsAgree : ', getIdentityInfo)
  const authTkn = getIdentityInfo.value.prsnAuthResult?.authTkn || '1a2s3d4f5g'
  console.log('authTkn : ',authTkn);
  if(getIdentityInfo.value.prsnAuthResult?.joinYn != 'Y'){ // 신규가입의 경우 회원가입 api에서 약관정보 같이 전달
    //13세 이하인 경우 부모 동의 필요
    if(getIdentityInfo.value.prsnAuthResult?.ageDvsCd == '2' || getIdentityInfo.value.prsnAuthResult?.ageDvsCd == '3'){
      //보호자 본인인증 페이지로 이동
      router.push({path:'/verification/parents'});
    }else{
      //회원정보 확인 페이지로 이동
      router.push({path:'/verification/my'});
    }
  } else{ // 기존회원의 경우 약관동의 API 호출
    const params: ReqTermsAgree = {
      lnkgSvcCd: reqTermsInfo.value.stplGrpCd || 'MJ',
      stplList: getAgreedStplList.value
    }
    const res = await crtnMbrsLnkgSvcInfo(params, authTkn).catch(() => {
      createErrorModal('', '약관동의API통신실패')
      return
    })
    if (res) {
      if (res.scsYn === 'Y') {
        console.log('executeCallback 호출')
        termsStore.executeCallback()
      } else {
        createErrorModal('', res.msg ?? '실패')
      }
    } 
  }
}

onMounted(async () => {
})
</script>
