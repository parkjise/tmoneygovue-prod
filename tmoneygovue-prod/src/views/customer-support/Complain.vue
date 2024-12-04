<template>
  <sub-header title="1:1 문의" :clickCallback="check" />
  <main id="main" class="main mor">
    <div id="cvcp" class="container no_padding" :class="{ bottom_btns: showBtn }">
      <uu-tabs class="support_tab" :tabIndex="getTabIndex" @selected="onSelectedTap">
        <!-- 문의하기 -->
        <uu-tab title="문의하기">
          <button
            type="button"
            class="select_btn"
            :aria-label="
              complainStore.checkedCvcpTypDtlCd == ''
                ? '문의 유형을 선택하세요'
                : `${complainStore.checkedCvcpTypGrpNm} 다음 ${complainStore.checkedCvcpTypDtlNm}`
            "
            @click="selectTypeBottom = true"
          >
            <span class="placeholder" v-if="complainStore.checkedCvcpTypDtlCd == ''">문의 유형을 선택하세요</span>
            <div class="value" v-else>
              <span>{{ complainStore.checkedCvcpTypGrpNm }}</span>
              <uu-ic name="arrow" size="16" color="primary" />
              <span>{{ complainStore.checkedCvcpTypDtlNm }}</span>
            </div>
            <uu-ic name="arrow" size="20" />
          </button>
          <form>
            <uuTextarea
              id="cvcpCtt"
              v-model="cvcpCtt"
              placeholder="문의하실 내용을 작성해 주세요."
              hide-label
              label="문의내용작성"
            />
          </form>
          <p class="support_info">
            <uu-ic name="exclamation" size="16" />
            주말, 공휴일을 제외하고 3일 이내에 답변드릴 예정입니다.
          </p>
          <a href="tel:1644-9255" class="call_center_btn">
            <uu-ic name="phone" size="12" />
            고객센터 1644-9255
          </a>
        </uu-tab>
        <!-- // 문의하기 -->

        <!-- 문의내역 보기 -->
        <uu-tab title="문의내역 보기">
          <template v-if="!noResult">
            <ul class="inquiry_list">
              <li v-for="(complain, index) in complainList" :key="index">
                <button type="button" @click="onClickDetail(complain)">
                  <div class="inquiry_title_wrap">
                    <div class="inquiry_title">{{ complain.cvcpTtlNm }}</div>
                    <button
                      type="button"
                      class="del_btn"
                      :aria-haspopup="true"
                      aria-controls="modal01"
                      @click.stop.prevent="onClickdeleteComplain(complain.cvcpSno, index)"
                    >
                      삭제
                    </button>
                  </div>
                  <div class="inquiry_txt">{{ complain.cvcpCtt }}</div>
                  <div class="inquiry_detail split">
                    <span class="date">{{ dayjs(complain.rgtDtm).format('YYYY.MM.DD HH:mm') }}</span>
                    <span class="inquiry_status" v-if="complain.answYn == 'N'">답변대기</span>
                    <span class="inquiry_status done" v-else>답변완료</span>
                  </div>
                </button>
              </li>
              <br ref="lastItemRef" />
            </ul>
          </template>
          <template v-else>
            <div class="no_result">
              <uuIc v-bind="{ name: 'exclamation', size: '48' }" />
              <div class="no_result_txt">내역이 없습니다.</div>
            </div>
          </template>
        </uu-tab>
        <!-- // 문의내역 보기 -->
      </uu-tabs>
      <div v-if="showBtn" class="btn_area">
        <uu-button size="xl" btn-color="primary" label="문의하기" :disabled="isDisabled" @Click="registComplain" />
      </div>
    </div>
  </main>

  <!-- 1차 카테고리 -->
  <ComplainCaseBottomSheet
    :detail="false"
    :isShow="selectTypeBottom"
    @next="showDetailType"
    @isClose="selectTypeBottom = false"
  />
  <!-- 2차 카테고리 -->
  <ComplainCaseBottomSheet
    :detail="true"
    :isShow="selectTypeDetailBottom"
    @next="showDetailType"
    @ok="selectTypeDetailBottom = false"
    @isClose="selectTypeDetailBottom = false"
  />
  <!-- 삭제 팝업 -->
  <ComplainDeletePopup
    :isDeletePopup="deletePopup"
    :deleteIndex="deleteIndex"
    :deleteCvcpSno="deleteCvcpSno"
    @ok="deleteOkCallback"
    @close="deletePopup = false"
  />
  <!-- 문의하기 뒤로가기 팝업 -->
  <RegisterCancelPopup :isShowPopup="backPopup" @ok="check" @isClose="backPopup = false" />
</template>

<script setup lang="ts">
import ComplainCaseBottomSheet from '@/views/customer-support/components/ComplainCaseBottomSheet.vue';
import RegisterCancelPopup from '@/views/customer-support/components/RegisterCancelPopup.vue';
import ComplainDeletePopup from '@/views/customer-support/components/ComplainDeletePopup.vue';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useComplainStore } from '@/service/customer-support/complainModule';
import { formatDate } from '@/utils/dateUtils';
import { useMessageModal } from '@/composables/useMessageModal';
import { useIntersectionObserver } from '@vueuse/core';
import type { complainInfoModel } from '@/service/customer-support/model/complainModel';
import { getAppBridge } from '@/utils';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();

const { createNotificationModal } = useMessageModal();
const complainStore = useComplainStore();
const { getTabIndex } = storeToRefs(complainStore);

const lastItemRef = ref(null); // 스크롤 더보기용 element ref
const selectTypeBottom = ref<boolean>(false); // 1차 카테고리
const selectTypeDetailBottom = ref<boolean>(false); // 2차 카테고리
const backPopup = ref<boolean>(false); // 뒤로가기 팝업
const deletePopup = ref<boolean>(false); // 삭제 팝업
const deleteCvcpSno = ref('');
const deleteIndex = ref(-1);
const cvcpCtt = ref(''); // 문의 내역
const showBtn = ref(false); // 문의하기 버튼 여부
const pageNo = ref<number>(1);

onMounted(async () => {
  onSelectedTap(history.state.tap == 1 ? 1 : getTabIndex.value);
  getComplainList(); // 민원 내역 조회
  await getComplaiTypeList(); // 민원 유형 코드 조회
  complainStore.setComplainTypeInit();
});

const noResult = computed(() => complainStore.complainInfoList.length === 0);
const isLast = computed(() => complainStore.isLast);
const complainList = computed(() => complainStore.complainInfoList);
const isDisabled = computed(() => {
  return !(complainStore.checkedCvcpTypDtlCd != '' && cvcpCtt.value != '');
});

// 2차 카테고리 뒤로가기
function showDetailType(isback: boolean) {
  if (isback) {
    selectTypeBottom.value = true;
    selectTypeDetailBottom.value = false;
  } else {
    complainStore.checkedCvcpTypDtlNm = '';
    complainStore.checkedCvcpTypDtlCd = '';
    selectTypeDetailBottom.value = true;
    selectTypeBottom.value = false;
  }
}

// 탭 선택
const onSelectedTap = (index: number) => {
  complainStore.setTabIndex(index);
  index == 0 ? (showBtn.value = true) : (showBtn.value = false);
};

// 민원 내역 조회
const getComplainList = async () => {
  await complainStore.setComplainList(pageNo.value);
};

// 민원 유형 코드 조회
const getComplaiTypeList = async () => {
  const param = {
    inqrtDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
  };
  await complainStore.setComplainTypeListAction(param);
};

// 문의하기
const registComplain = async () => {
  const appBridge = await getAppBridge();
  const param = {
    cvcpTypCd: complainStore.checkedCvcpTypDtlCd,
    cvcpTtlNm: complainStore.checkedCvcpTypGrpNm + ' - ' + complainStore.checkedCvcpTypDtlNm,
    cvcpCtt: cvcpCtt.value
  };
  const res = await complainStore.registComplainAction(param);
  if (res.scsYn == 'Y') {
    await appBridge.showToast({
      message: `문의가 정상적으로 접수 되었습니다.`
    });
    complainStore.setComplainTypeInit();
    cvcpCtt.value = '';
    onSelectedTap(1); // 문의내역보기 tab으로 이동
    pageNo.value = 1;
    getComplainList();
  } else {
    await appBridge.showToast({
      message: `연결상태가 원활하지 않습니다.\n다시 시도해 주세요.`
    });
    createNotificationModal('알림', '민원 등록 실패');
  }
};

// 삭제버튼 click
const onClickdeleteComplain = (cvcpSno: string, index: number) => {
  deleteCvcpSno.value = cvcpSno;
  deleteIndex.value = index;
  deletePopup.value = true;
};

// 문의 내역 삭제
const deleteOkCallback = async () => {
  const param = {
    cvcpSno: deleteCvcpSno.value
  };
  const res = await complainStore.deleteComplainAction(param);
  let title = '알림';
  let message = '';
  if (res.scsYn == 'Y') {
    message = '해당 문의가 삭제되었습니다.';
    complainStore.setDeletedComplain(deleteIndex.value);
  } else {
    message = '문의를 삭제할 수 없습니다.';
  }
  createNotificationModal(title, message);
  const appBridge = await getAppBridge();
  await appBridge.showToast({
    message: `문의가 삭제되었습니다.`
  });
  deletePopup.value = false;
};

// 문의 내역 더보기용 Observer
useIntersectionObserver(
  lastItemRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLast.value) return;
    updateList();
  },
  { threshold: 0.5 }
);

// 문의 내역 추가
const updateList = async () => {
  pageNo.value++;
  await getComplainList();
};

// 문의내역 상세보기
const onClickDetail = (complain: complainInfoModel) => {
  complainStore.setComplainDetail(complain);
  router.push('/customer-support/complain-detail');
};

// 문의하기 뒤로가기 팝업
const check = () => {
  if (cvcpCtt.value != '' && !backPopup.value) {
    if (getTabIndex.value === 1) {
      onSelectedTap(0); // 문의하기 tab으로 이동
    }
    backPopup.value = true;
    return;
  }
  backPopup.value = false;
  router.back();
};

onUnmounted(() => {
  complainStore.setTabIndex(0);
});
</script>
