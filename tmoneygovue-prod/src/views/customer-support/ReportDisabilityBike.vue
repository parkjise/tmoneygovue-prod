<template>
  <sub-header title="공공자전거 고장/장애 신고" :clickCallback="check" />
  <main id="main" class="main mor tabs">
    <div id="dclr" class="container no_padding" :class="{ bottom_btns: showBtn }">
      <uu-tabs class="support_tab" :tabIndex="getTabIndex" @selected="onSelected">
        <!-- 신고하기 -->
        <uu-tab title="신고하기" active>
          <div class="bike_report">
            <form>
              <div class="input_area">
                <uu-button class="btn_category" @click="isShowTypeBottomSheet = true">
                  {{ getCheckedBikeType === 'T' ? '따릉이' : '타슈' }}
                  <uu-ic size="20" name="arrow" />
                </uu-button>
                <uu-input
                  v-model="bicycleNumber"
                  label="QR코드 및 자전거 번호 입력"
                  placeholder="QR코드 및 자전거 번호 입력"
                  hide-label
                />
                <uu-button class="btn_qr" @click="clickQrcode">
                  <uu-ic size="24" name="qr" />
                  <span class="sr_only">QR코드</span>
                </uu-button>
              </div>
              <div class="recent_history">
                <uu-button @click="rentalPopup = true">
                  <uu-ic size="16" name="recent" />
                  <span>최근 이용 내역</span>
                </uu-button>
              </div>
              <div class="breakdown_check">
                <div class="top">
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_005" label="단말기" tabindex="0" />
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_003" label="안장" tabindex="0" />
                </div>
                <div class="img_area" aria-hidden="true">
                  <img src="/assets/images/ic/ic_seoulbike.png" tabindex="-1" />
                </div>
                <div class="bottom">
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_001" label="타이어" tabindex="0" />
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_004" label="페달" tabindex="0" />
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_002" label="체인" tabindex="0" />
                  <uu-checkbox v-model="dclrDvsMltpVal" value="ELB_006" label="기타" tabindex="0" />
                </div>
              </div>
              <div class="textarea_area">
                <div class="picture_area" v-if="dclrImgVal !== ''">
                  <div class="picture">
                    <img :src="imageURL" alt="preview" />
                    <uu-button @click="dclrImgVal = ''">
                      <span class="sr_only">사진 취소</span>
                    </uu-button>
                  </div>
                </div>
                <div class="flex_area">
                  <p>신고 내용</p>
                  <uu-button v-if="dclrImgVal === ''" @click="clickAddPicture">
                    사진 첨부
                    <uu-ic size="16" name="arrow_right_gray070" />
                  </uu-button>
                </div>
                <uu-textarea
                  id="dclrCtt"
                  v-model="dclrCtt"
                  label="신고 내용"
                  placeholder="신고 내용을 작성해주세요."
                  hide-label
                />
              </div>
            </form>
          </div>
        </uu-tab>
        <!-- // 신고하기 -->

        <!-- 신고내역 보기 -->
        <uu-tab title="신고내역 보기">
          <div class="bike_report_list" ref="itemRef">
            <!-- 데이터 없을 경우 -->
            <div class="no_data" v-if="reportDisabilityBikeList.length === 0">
              <uu-ic size="48" name="exclamation" />
              <p>신고 내역이 없습니다.</p>
            </div>
            <!-- // 데이터 없을 경우 -->
            <round-box hide-title v-for="(report, index) in reportDisabilityBikeList" :key="index">
              <div class="text_wrap">
                <div class="title">
                  <p class="img_area">
                    <!-- [240517] 아이콘 변경 -->
                    <img src="/assets/images/ic/ic_vehicle_bike.svg" alt="자전거 아이콘" role="presentation"/>
                  </p>
                  <p>{{ report.bcclNo }}</p>
                </div>
                <div class="badge_area">
                  <uu-badge
                    :label="dclrDvsMltpValMap.get(breakParts)"
                    size="sm"
                    v-for="(breakParts, index) in report.dclrDvsMltpVal"
                    :key="index"
                  />
                </div>
                <p class="text">{{ report.dclrCtt }}</p>
                <p class="date">{{ formatDate(report.rgtDtm, 'YYYY.MM.DD HH:mm') }}</p>
              </div>
              <uu-button label="삭제" @click="onClickDeleteReport(report, index)" />
            </round-box>
            <br v-if="reportDisabilityBikeList.length > 0" ref="lastItemRef" />
          </div>
        </uu-tab>
        <!-- // 신고내역 보기 -->
      </uu-tabs>
      <div v-if="showBtn" class="btn_area">
        <uu-button
          size="xl"
          btn-color="primary"
          :disabled="isDisabled"
          label="신고하기"
          @click="registReportDisabilityBike"
        />
      </div>
    </div>
  </main>
  <!-- 카테고리 선택 바텀시트 -->
  <BikeTypeBottom :isShowBottomSheet="isShowTypeBottomSheet" @close="isShowTypeBottomSheet = false" />
  <!-- 최근 이용 내역 풀팝업-->
  <CurrentUseagePopup :isShowPopup="rentalPopup" @ok="changeBicycleNumber" @close="rentalPopup = false" />
  <!-- 신고내역 삭제 팝업-->
  <DeleteBikePopup :isShow="deletePopup" @ok="deleteReport" @close="deletePopup = false" />
  <!-- 신고하기 뒤로가기 팝업 -->
  <RegisterCancelPopup :isShowPopup="backPopup" @ok="check" @isClose="backPopup = false" />
</template>

<script setup lang="ts">
import CurrentUseagePopup from '@/views/customer-support/components/CurrentUseagePopup.vue';
import RegisterCancelPopup from '@/views/customer-support/components/RegisterCancelPopup.vue';
import BikeTypeBottom from '@/views/customer-support/components/BikeTypeBottom.vue';
import DeleteBikePopup from './components/DeleteBikePopup.vue';
import { ref, computed, onMounted } from 'vue';
import { useReportBikeStore } from '@/service/customer-support/reportBikeModule';
import { useMessageModal } from '@/composables/useMessageModal';
import { useIntersectionObserver } from '@vueuse/core';
import { getAppBridge } from '@/utils';
import type { reportDisabilityBikeModel } from '@/service/customer-support/model/reportBikeModel';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { createNotificationModal } = useMessageModal();
const reportBikeStore = useReportBikeStore();
const { getTabIndex, getCheckedBikeType } = storeToRefs(reportBikeStore);

// 고장/장애 부위
const dclrDvsMltpValMap = new Map([
  ['ELB_001', '타이어'],
  ['ELB_002', '체인'],
  ['ELB_003', '안장'],
  ['ELB_004', '페달'],
  ['ELB_005', '단말기'],
  ['ELB_006', '기타']
]);

const lastItemRef = ref(null); // 스크롤 더보기용 element
const pageNo = ref(1); // 페이징
const showBtn = ref(false); // 신고하기 버튼 여부
const isShowTypeBottomSheet = ref(false); // 자전거 카테고리 선택 바텀시트

const rentalPopup = ref(false); // 최근 이용 내역 팝업
const deletePopup = ref(false); // 삭제 팝업
const backPopup = ref(false); // 뒤로가기 팝업

const deleteItem = ref(); // 삭제 item
const deleteIndex = ref(-1);
const dclrDvsMltpVal = ref<string[]>([]); // 고장/장애 부위
const dclrImgVal = ref(''); //base64 이미지
const imageURL = ref('');
const bicycleNumber = ref(''); //자전거번호
const lttd = ref(''); //위도
const lngt = ref(''); //경도
const dclrCtt = ref(''); // 신고내용

const reportDisabilityBikeList = computed(() => reportBikeStore.reportDisabilityBikeList);
const isLast = computed(() => reportBikeStore.isReportLast);
const isDisabled = computed(() => {
  if (bicycleNumber.value === '') {
    return true;
  }
  if (bicycleNumber.value === '') {
    return true;
  }
  if (dclrCtt.value.trim() === '') {
    return true;
  }
  if (dclrDvsMltpVal.value.length === 0) {
    return true;
  }
  return false;
});

// 탭 변경
const onSelected = (index: number) => {
  reportBikeStore.setTabIndex(index);
  index == 0 ? (showBtn.value = true) : (showBtn.value = false);
};

// 자전거 신고 내역
const getReportDisabiltyBikeList = async () => {
  await reportBikeStore.setReportDisabilityBikeList(pageNo.value);
};

// 최근 이용 내역에서 선택
const changeBicycleNumber = (bcclNo: string, utlzSvcDvsCd: string) => {
  setBicycleNumberInput(bcclNo, utlzSvcDvsCd);
  rentalPopup.value = false;
};

// QR코드
const clickQrcode = async () => {
  const appBridge = await getAppBridge();
  // getReportDisabilityBikeInfo type: qr
  const res = await appBridge.getReportDisabilityBikeInfo({ type: 'qr' });

  const bicycleNum = res.bicycleNumber ?? '';
  const bikeType = res.utlzSvcDvsCd ?? '';
  if (bikeType === 'T' || bikeType === 'D') {
    setBicycleNumberInput(bicycleNum, bikeType);
  } else if (bikeType !== 'NONE') {
    await appBridge.showToast({
      message: '유효하지 않는 QR코드 입니다.'
    });
  }
};

// 사진 첨부
const clickAddPicture = async () => {
  const appBridge = await getAppBridge();
  // getReportDisabilityBikeInfo type: image
  const res = await appBridge.getReportDisabilityBikeInfo({ type: 'image' });
  if (res.dclrImgVal) {
    dclrImgVal.value = res.dclrImgVal;
    b64toImgURL();
  }
};

//data:image/jpeg;base64 -> image URL
const b64toImgURL = () => {
  const b64Img = dclrImgVal.value;
  const byteCharacters = atob(b64Img);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  imageURL.value = URL.createObjectURL(new Blob([byteArray], { type: 'image/jpeg' }));
};

// 자전거 번호 입력
const setBicycleNumberInput = (bicycleNum: string, bikeType: string) => {
  if (bicycleNum.startsWith('SPB')) {
    bicycleNum = bicycleNum.substring(bicycleNum.length - 5);
  } else if (bicycleNum.startsWith('TASHU_')) {
    bicycleNum = bicycleNum.replace('TASHU_', '');
  }
  bicycleNum = bicycleNum.replaceAll(' ', '');
  reportBikeStore.setCheckedBikeType(bikeType);
  bicycleNumber.value = bicycleNum;
};

// 신고하기
const registReportDisabilityBike = async () => {
  if (!isReportable()) {
    return;
  }
  const appBridge = await getAppBridge();
  // getReportDisabilityBikeInfo type: location
  const resLocation = await appBridge.getReportDisabilityBikeInfo({ type: 'location' });
  if (
    !resLocation ||
    !resLocation.lttd ||
    !resLocation.lngt ||
    resLocation.lttd === '0.0' ||
    resLocation.lngt === '0.0'
  ) {
    // 위치 서비스 권한이 없는 경우
    return;
  }
  if (resLocation.lttd === '0' || resLocation.lngt === '0') {
    // 위치 서비스 권한이 없는 경우(IOS)
    createNotificationModal(
      '위치 정보 확인 불가',
      '서비스 이용을 위해 위치 서비스를 활성화 해주시기 바랍니다.\n\n ※일부 실내 지역에서는 위치정보 수집이 어려울수 있습니다.'
    );
    return;
  }
  lttd.value = resLocation.lttd;
  lngt.value = resLocation.lngt;
  const bicycleNum = bicycleNumber.value.replaceAll(' ', '');
  const param = {
    utlzSvcDvsCd: getCheckedBikeType.value,
    bcclNo: getCheckedBikeType.value === 'T' ? 'SPB-' + bicycleNum.padStart(5, '0') : 'TASHU_' + bicycleNum,
    dclrDvsMltpVal: dclrDvsMltpVal.value,
    dclrCtt: dclrCtt.value,
    dclrImgVal: dclrImgVal.value,
    lttd: lttd.value,
    lngt: lngt.value
  };

  const res = await reportBikeStore.registReportDisabilityBike(param);
  if (res.data) {
    if (res.data.ctrnYn === 'Y') {
      formRefresh();
      pageNo.value = 1;
      getReportDisabiltyBikeList();
      onSelected(1);
    } else if (res.data.msg) {
      createNotificationModal('알림', res.data.msg);
    } else {
      createNotificationModal('알림', '등록에 실패했습니다.');
    }
  } else {
    if (res.rspMsg) {
      createNotificationModal('알림', res.rspMsg);
    } else {
      createNotificationModal('알림', '등록에 실패했습니다.');
    }
  }
};

// 등록폼 새로고침
const formRefresh = () => {
  reportBikeStore.setCheckedBikeType('T');
  bicycleNumber.value = '';
  dclrDvsMltpVal.value = [];
  dclrCtt.value = '';
  dclrImgVal.value = '';
  imageURL.value = '';
  lttd.value = '';
  lngt.value = '';
};

// 신고하기 유효성 검증
const isReportable = () => {
  if (bicycleNumber.value === '') {
    createNotificationModal('알림', '자전거 번호 입력은 필수 입니다.');
    return false;
  }
  if (bicycleNumber.value.trim().length < 4) {
    createNotificationModal('알림', '유효하지 않은 자전거 번호 입니다.');
    return false;
  }
  if (dclrCtt.value.trim() === '') {
    createNotificationModal('알림', '신고 내용 입력은 필수 입니다.');
    return false;
  }
  if (getCheckedBikeType.value === 'D' && dclrImgVal.value === '') {
    createNotificationModal('알림', '사진 첨부 등록은 필수 입니다.');
    return false;
  }
  if (dclrDvsMltpVal.value.length === 0) {
    createNotificationModal('알림', '자전거 고장/신고 항목(기타)\n입력은 필수 입니다.');
    return false;
  }
  return true;
};

// 삭제 click
const onClickDeleteReport = (item: reportDisabilityBikeModel, index: number) => {
  deleteItem.value = item;
  deleteIndex.value = index;
  deletePopup.value = true;
};

// 신고내역 삭제
const deleteReport = async () => {
  const appBridge = await getAppBridge();
  const param = {
    utlzSvcDvsCd: deleteItem.value.utlzSvcDvsCd, // T: 따릉이, D: 타슈
    dclrSno: deleteItem.value.dclrSno
  };
  const res = await reportBikeStore.deleteReportDisabilityBike(param);
  if (res.data.scsYn === 'Y') {
    reportBikeStore.setDeletedReportBike(deleteIndex.value);
    await appBridge.showToast({
      message: '문의가 삭제되었습니다.'
    });
  }
  deletePopup.value = false;
};

// 신고 내역 더보기용 Observer
useIntersectionObserver(
  lastItemRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLast.value) return;
    updateList();
  },
  { threshold: 0.5 }
);

// 신고 내역 추가
const updateList = async () => {
  pageNo.value++;
  await getReportDisabiltyBikeList();
};

// 신고하기 뒤로가기 팝업
const check = () => {
  if (dclrCtt.value != '' && !backPopup.value) {
    if (getTabIndex.value === 1) {
      onSelected(0); // 문의하기 tab으로 이동
    }
    backPopup.value = true;
    return;
  }
  backPopup.value = false;
  router.back();
};

onMounted(() => {
  const bikeType = (route.query.serviceType as 'T' | 'D') ?? 'T';
  const bikeNumber = (route.query.bikeNumber as string) ?? '';
  setBicycleNumberInput(bikeNumber, bikeType);
  getReportDisabiltyBikeList();
  onSelected(0);
});
</script>
