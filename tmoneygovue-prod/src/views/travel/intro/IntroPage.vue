<!-- 여행상품 통합예매 -->
<template>
  <sub-header title="여행상품 통합예매" :bg-color="gray" :click-callback="moveTmoneyGo" />
  <main id="main" class="main">
    <div class="container">
      <!-- 검색영역 -->
      <div>
        <button type="button" class="searchbar" @click="goSearchPage" aria-label="검색">
          <span class="placeholder">여행 상품 / 테마 / 지역 검색</span>
          <uu-ic name="search" size="20" color="primary" />
        </button>
      </div>
      <!-- 조회 상품 영역 (회원) -->
      <div class="recent_product" v-if="getIsLogin && getRctlyPrd">
        <div class="badge">최근 조회 상품</div>
        <div class="product_name" @click="clickRecently">{{ getRctlyPrd.trvlPrdNm }}</div>
      </div>

      <!-- 스켈레톤UI 상단 노출 화면 API(카테고리, 인기여행지, 베스트상품) 응답을 모두 받을떄까지 노출 -->
      <div v-if="getCategoryList.length < 1">
        <div class="category_area">
          <ul class="category_list">
            <li v-for="i in 5" :key="i">
              <div class="category_btn"><Skeletor width="90%" height="6rem" /></div>
            </li>
          </ul>
        </div>
        <round-box title="">
          <ul class="xscroll_list travel_list">
            <li v-for="i in 5" :key="i">
              <div><Skeletor width="6rem" height="6rem" pill /></div>
            </li>
          </ul>
        </round-box>
        <round-box title="" class="best_product">
          <ul class="best_product_list">
            <li v-for="i in 15" :key="i">
              <div><Skeletor width="100%" height="15rem" /></div>
            </li>
          </ul>
        </round-box>
      </div>

      <!-- 카테고리 영역 -->
      <div class="category_area">
        <ul class="category_list">
          <li v-for="(item, index) in getCategoryList" :key="index">
            <button
              type="button"
              class="category_btn"
              @click="goPrdListPageByCtgr(item)"
              :aria-label="`${item.categoryName} 검색`"
            >
              <span class="category_img">
                <img
                  :src="item.imageUrl"
                  onerror="this.src='/assets/images/ic/ic_32_ticket.png'"
                  :alt="`${item.categoryName} 이미지`"
                />
              </span>
              <span class="category_name">{{ item.categoryName }}</span>
            </button>
          </li>
        </ul>
      </div>
      <!-- 예약 티켓 영역 (회원) -->
      <intro-tickets v-if="getIsLogin && trvlMrnpList && trvlMrnpList.length > 0" />
      <!-- 인기 여행지 영역 -->
      <round-box title="인기 여행지" v-if="popularAreaList && popularAreaList.length > 0">
        <ul class="xscroll_list travel_list">
          <li
            v-for="(item, index) in popularAreaList"
            :key="index"
            @click="goPrdListPageByArea(item)"
          >
            <button type="button" :aria-label="`${item.areaName} 검색`">
              <img :src="item.imageUrl" :alt="`${item.areaName} 이미지`" />
              <div class="txt">{{ item.areaName }}</div>
            </button>
          </li>
        </ul>
      </round-box>
      <!-- 이시간 베스트 상품 영역 -->
      <round-box
        title="이시간 베스트 상품"
        class="best_product"
        v-if="bestList && bestList.length > 0"
      >
        <ul class="best_product_list">
          <li v-for="(item, index) in bestList" :key="index" @click="goPrdDtlPage(item.trvlPrdId)">
            <button
              type="button"
              :aria-label="`${getCategoryNm(item) + item.trvlPrdNm + getPriceText(item.dcPrice && item.dcPrice > 0 ? item.dcPrice : item.prdPrice)} 이동`"
            >
              <img
                :src="item.imageUrl"
                :alt="`${getCategoryNm(item) + item.trvlPrdNm + getPriceText(item.dcPrice && item.dcPrice > 0 ? item.dcPrice : item.prdPrice)} 이미지`"
              />
              <div class="product_name">{{ getCategoryNm(item) }} {{ item.trvlPrdNm }}</div>
              <div class="price_wrap">
                <span class="price">{{
                  getPriceText(item.dcPrice && item.dcPrice > 0 ? item.dcPrice : item.prdPrice)
                }}</span
                >원
              </div>
            </button>
          </li>
        </ul>
      </round-box>
      <!-- 이벤트배너 영역 -->
      <uu-swiper
        v-if="bannerList && bannerList.length > 0"
        type="custom"
        :options="swiperOptions"
        navi-pagination
        class="event_banner_swiper"
      >
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <div class="swiper_inner">
            <button
              type="button"
              :aria-label="`${item.title} 이동`"
              @click="moveLink(item.linkUrl ?? '')"
            >
              <img :src="item.imageUrl" :alt="`${item.title} 이미지`" />
            </button>
          </div>
        </swiper-slide>
      </uu-swiper>
      <!-- 마케팅 영역 -->
      <ul class="xscroll_list banner_list" v-if="getMarketingList && getMarketingList.length > 0">
        <li v-for="item in getMarketingList" :key="item.sortSeq">
          <button :aria-label="`${item.advrImgCtt} 이동`" @click="moveLink(item.mvmnPathVal ?? '')">
            <img :src="item.advrImgPathVal" :alt="`${item.advrImgCtt} 이미지`" />
          </button>
        </li>
      </ul>
    </div>
    <!-- 공지사항 -->
    <intro-notice-alert
      :is-show="isShowNoticePopup"
      :list="noticePopupList"
      @close="isShowNoticePopup = false"
    />
    <!-- 이벤트 팝업 -->
    <intro-evt-popup
      :is-show="isShowEvtPopup"
      :list="getEvtPopupList"
      @close="isShowEvtPopup = false"
    />
  </main>
</template>
<script setup lang="ts">
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'

import { SwiperSlide } from 'swiper/vue'

import IntroTickets from './component/IntroTickets.vue'
import IntroEvtPopup from './component/IntroEvtPopup.vue'
import IntroNoticeAlert from './component/IntroNoticeAlert.vue'

import { onMounted, computed, ref } from 'vue'
import { useAuthStore } from '@/service/auth/authModule'
import { formatDate, isToday } from '@/utils/dateUtils'
import dayjs from 'dayjs'

import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTrvlIntroStore } from '@/service/travel/introModule'
import { useProductStore } from '@/service/travel/productModule'
import type { AdvrData, BestPrdData, CategoryData } from '@/service/travel/model/introModel'
import { swiperOptions, AdvrCd } from '@/service/travel/travelConsts'
import { getPriceText, productDtlUrlParsing } from '@/views/travel/travelUtils'
import { LocalStorageKey } from '@/utils/constants/globalConstants'
import type { Area } from '@/service/travel/model/trvlCmmModel'
import { getAppBridge } from '@/utils'
import { useReservationStore } from '@/service/travel/reservationModule'
import { useTrvlExbhtStore } from '@/service/travel/exhibitionModule'

const router = useRouter()

const authStore = useAuthStore()
const introStore = useTrvlIntroStore()
const exhbStore = useTrvlExbhtStore()
const prdStore = useProductStore()
const rsrvStore = useReservationStore()

const {
  trvlMrnpList,
  evtPopupList,
  evtBannerList,
  noticePopupList,
  popularAreaList,
  bestList,
  bannerList,
  getCategoryList
} = storeToRefs(introStore)
const { getIsLogin } = storeToRefs(authStore)

const gray = '#F4F4F4'

const isShowEvtPopup = ref(false) // 이벤트팝업노출여부
const isShowNoticePopup = ref(false)

// 배경색이 흰색이라 scrollTop 0 에서 main 영역이 아래로 당겨지면 흰색바탕이 보임
;(document.querySelector('body') as HTMLElement).style.backgroundColor = gray

onMounted(() => {
  initStore()
  reqInit().then(() => {
    isShowEvtPopup.value = showPopup()
    isShowNoticePopup.value = noticePopupList.value.length > 0
  })
})

const initStore = () => {
  exhbStore.initStore()
  prdStore.initStore()
  rsrvStore.initStore()
}
const reqInit = async () => {
  if (getIsLogin.value) await introStore.reqTrvlMrnp()

  introStore.reqAdvrPupStupInfo();
  await introStore.reqCatetory() // 통신실패 팝업처리
  await introStore.reqPopularArea()
  await introStore.reqBestPrdList()
  await introStore.reqEvtBannerList()
}

/**
 * @description 이벤트 팝업 그만보기 여부 조회
 */
const showPopup = () => {
  // 공지사항 표시 시 미노출
  if (noticePopupList.value.length > 0) return false
  // 이벤트팝업 없음
  if (getEvtPopupList.value.length < 1) return false
  // 오늘하루 그만보기
  const eventPopup = JSON.parse(localStorage.getItem(LocalStorageKey.STOP_EVT_POPUP) ?? '{}')
  if (eventPopup?.date !== undefined && isToday(eventPopup?.date ?? dayjs()) && eventPopup.value)
    return false

  localStorage.setItem(
    LocalStorageKey.STOP_EVT_POPUP,
    JSON.stringify({ date: formatDate(), value: false })
  )
  return true
}

/**
 * @description 이벤트팝업
 */
const getEvtPopupList = computed(() => {
  const list = evtPopupList.value.filter((item) => item.advrBltnTypCd === AdvrCd.P)
  return list.sort((a, b) => {
    return a.sortSeq - b.sortSeq
  })
})

/**
 * @description 이벤트배너
 */
const getMarketingList = computed(() => {
  const list: AdvrData[] = evtBannerList.value.filter((item) => item.advrBltnTypCd === AdvrCd.B)
  return list.sort((a, b) => {
    return a.sortSeq - b.sortSeq
  })
})

/**
 * @descript 최근조회상품
 */
const getRctlyPrd = computed(() => {
  const data = localStorage.getItem(LocalStorageKey.RCTLY_PRD)
  if (data) return JSON.parse(data)
  return null
})

/**
 * @description 베스트상품 대분류카테고리명
 * @param item
 */
const getCategoryNm = (item: BestPrdData) => {
  let result = ''
  if (item.categoryList) item.categoryList.forEach((d) => (result += `[${d.categoryName}]`))
  return result
}

/**
 * @description 최근조회상품 클릭
 */
const clickRecently = () => {
  goPrdDtlPage(getRctlyPrd.value.trvlPrdId)
}

/**
 * @description 마케팅배너 클릭 시 이동
 */
const moveLink = async (url: string) => {
  const res = productDtlUrlParsing(url)
  if (res) goPrdDtlPage(res.id)
}

/**
 * @description 카테고리 클릭 상품목록화면 이동
 */
const goPrdListPageByCtgr = (item?: CategoryData) => {
  goPrdListPage({ categoryId: item?.categoryId })
}
/**
 * @description 인기여행지 클릭 상품목록화면 이동
 */
const goPrdListPageByArea = (item?: Area) => {
  goPrdListPage({ areaIds: item?.areaId })
}
/**
 * @description 상품목록화면 이동
 */
const goPrdListPage = (param: { areaIds?: string; categoryId?: string }) => {
  router.push({
    name: 'travel-product',
    query: {
      ...(param.areaIds && { areaIds: param.areaIds }),
      ...(param.categoryId && { categoryId: param.categoryId })
    }
  })
}
/**
 * @description 상품상세화면 이동
 */
const goPrdDtlPage = (trvlPrdId: string) => {
  router.push({ name: 'product-detail', query: { trvlPrdId: trvlPrdId } })
}

const goSearchPage = () => {
  router.push({ name: 'travel-search' })
}

/**
 * 티머니고 홈으로 이동(웹뷰 닫기)
 */
const moveTmoneyGo = async () => {
  const appBridge = await getAppBridge()
  await appBridge.closeWebView()
}
</script>

<style scoped>
.event_banner_swiper {
  position: relative;
}

.navi_pagination_wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  height: 2.8rem;
  padding: 0 0.5rem;
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
