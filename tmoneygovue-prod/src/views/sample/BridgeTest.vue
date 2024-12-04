<template>
  <div>
    <v-select
      label="bridge name"
      :items="bridges"
      item-title="text"
      item-valse="value"
      v-model="selectedBridge"
    ></v-select>
    <p>- Request</p>
    <v-textarea label="request value" placeholder="Enter some text..." v-model="bridgeRequestValue"></v-textarea>

    <v-btn color="primary" @click="callWebToNative">call bridge</v-btn>

    <p>- Response</p>
    <v-textarea
      rows="20"
      label="Description"
      placeholder="Enter some text..."
      v-model="bridgeResponseValue"
    ></v-textarea>
  </div>
</template>

<script setup lang="ts">
import { getAppBridge } from '@/utils';
import type AppBridge from '@/utils/hybrid';
import { onMounted, ref, watch } from 'vue';
import { VSelect, VTextarea, VBtn } from 'vuetify/components';
const bridgeRequestValue = ref('{}');
const bridgeResponseValue = ref('');

let appBridge: AppBridge;
onMounted(async () => {
  appBridge = await getAppBridge();
});

interface bridgeType {
  text: string;
  value: string;
  defaultRequest: string;
}

// 브릿지 목록. 추가될때 마다 해당 배열에 추가
const bridges: bridgeType[] = [
  { text: 'getAuthInfo(인증정보 조회)', value: 'getAuthInfo', defaultRequest: `{}` },
  {
    text: 'updateAuthTknInfo(회원 인증토큰 갱신)',
    value: 'updateAuthTknInfo',
    defaultRequest: `{}`
  },
  { text: 'getLocaleInfo(언어정보조회)', value: 'getLocaleInfo', defaultRequest: `{}` },
  {
    text: 'openView(화면 오픈)',
    value: 'openView',
    defaultRequest: `{
      "url": "https://tiaapid.tmoney.co.kr:20328/webview/pym/auth/v2/reqBzpyAuth.do",
      "viewType": "in",
      "headerTitle": "서비스 이용약관",
      "viewJsonValue": "{'utlzSvcDvsCd': '1', 'pmGrpDvsCd': 'M'}"
    }`
  },
  {
    text: 'terminateApp(APP종료 요청)',
    value: 'terminateApp',
    defaultRequest: `{}`
  },
  {
    text: 'openEncKeypad(암호화 키패드 열기)',
    value: 'openEncKeypad',
    defaultRequest: `{
      "inputMaxLength": 2,
      "inputMinLength": 2,
      "keypadType": "M",
      "label": "비밀번호 앞 2자리를 입력하세요",
      "hint": "앞 2자리",
      "maxAlert": "최대 글자 2자를 입력하셨습니다.",
      "minAlert": "비밀번호를 확인해주세요.",
      "isAddCardPwKb": false,
      "inputFieldId": "passwordInput"
    }`
  },
  {
    text: 'closeEncKeypad(암호화 키패드 닫기)',
    value: 'closeEncKeypad',
    defaultRequest: `{}`
  },
  {
    text: 'showToast(toast 노출)',
    value: 'showToast',
    defaultRequest: `{
      "message": "등록 완료되었습니다"
    }`
  },
  {
    text: 'getReportDisabilityBikeInfo(자전거 고장/장애 신고 입력 정보 조회). TODO 사진타입 확인 후 수정',
    value: 'getReportDisabilityBikeInfo',
    defaultRequest: `{
      "type": "qr"
    }`
  },
  {
    text: 'openContact(연락처 앱 오픈 / 연락처 조회 )',
    value: 'openContact',
    defaultRequest: `{}`
  },
  {
    text: 'encSeoulBikePassword(따릉이 비밀번호 암호화)',
    value: 'encSeoulBikePassword',
    defaultRequest: `{
      "oldPw": "ghikq1@!",
      "newPw": "ghikq2@!"
    }`
  },
  {
    text: 'logoutClearTGoData(로그아웃 APP 데이터 삭제 요청)',
    value: 'logoutClearTGoData',
    defaultRequest: `{}`
  },
  {
    text: 'showTabbar(하단탭바노출)',
    value: 'showTabbar',
    defaultRequest: `{
      "isShow": true
    }`
  },
  {
    text: 'getOtherAppVersionList(타앱버젼조회)',
    value: 'getOtherAppVersionList',
    defaultRequest: `{}`
  },
  {
    text: 'getCardList(앱버전조회)',
    value: 'getCardList',
    defaultRequest: `{}`
  },
  {
    text: 'registCard(간편결제 고속/시외/항공 등록)',
    value: 'registCard',
    defaultRequest: `{
      "cardSecData1": "ECC89E45407E2AF69A8CA0EA573031B00B7EEECA59CC9F28827FD8075EA9C43FC279DE24700E21B44937025891E385DF9863AD211667B86E623F41ADBD336B16",
      "cardSecData2": "ECBC212F459519C6E0D6D3E43F03D459119EE82A5D22E16D43A6971095C525AD390596301FB3427A2EF2BCE6AEE448F9A8599E52B2028ADC6EBE9259344B2052",
      "cardSecData3": "E75BD6275642973946B52434738D8F68D198EAB4C971FBF356543F00557BFD57B629B8241348467E59C5DACF4F0E77246BF857DFB8D3286E6C4BCC5A90E4A0AD",
      "cardSecData4": "6B27A3586A7F13E930CCB371C542A212C635C305CA279DF05B06D6DBFF6B421BBDE942C61A3CCEA01AEBCA698D61E6867EF4A8A01C2CF91AEA263B2540111157",
      "cardSecBirth": "CFE5F4CD927CFFD7188F76BC9F872FEC6C4740B5C8ECF1B398C260F1FBE302E274282F076D96DD31A24B14805283C77132037BB2A39DBF9DAA6E19696FCB98FA94AEF619C5FD72D4CE166256C2A0E2EAF023F774277F4439887A410CB5E6980C",
      "cardSecLen1": "4",
      "cardSecLen2": "4",
      "cardSecLen3": "4",
      "cardSecLen4": "4",
      "cardSecLenBitrh": "6",
      "cardName": "롯데카드",
      "validity": "0828",
      "paymentSystem": "N",
      "cardCode": "03",
      "cardKinds": false,
      "companyNumber": "",
      "nickName": "",
      "path1": "/resources/images/ci/img_lottecard_logo_org.png",
      "path2": "/resources/images/ci/img_lottecard_logo_wh.png"
    }`
  },
  {
    text: 'changeNickNameCard(간편결제 고속/시외/항공 별명 변경)',
    value: 'changeNickNameCard',
    defaultRequest: `{
      "paymentKey": "1010990000125409",
      "nickName": "변경별명"
    }`
  },
  {
    text: 'updateCard(간편결제 고속/시외/항공 주카드 처리 및 카드삭제)',
    value: 'updateCard',
    defaultRequest: `{
      "paymentKey": "1010990000125409",
      "type": "C"
    }`
  },
  {
    text: 'readOCR(OCR)',
    value: 'readOCR',
    defaultRequest: `{}`
  },
  {
    text: 'decScsYn(카드번호 복호화 성공여부)',
    value: 'decScsYn',
    defaultRequest: `{
      "encScsYn": "Y",
      "encDtm": "sufe2.."
    }`
  },
  {
    text: 'callIdentityVerify(본인인증)',
    value: 'callIdentityVerify',
    defaultRequest: `{
      "verifyType": "P"
    }`
  },
  {
    text: 'getPrsnAuthInfo(회원정보 전달)',
    value: 'getPrsnAuthInfo',
    defaultRequest: `{
      "gndrCd": "M",
      "prsnAuthScsYn": "Y",
      "prsnAuthSno": "20241126000000032226",
      "prntAuthSno": null,
      "mbphNo": "01092352224",
      "ageDvsCd": "1",
      "userBrdt": "19860111",
      "frndInvnTgtYn": "N",
      "userNm": "곽현준",
      "drmbYn": "N",
      "moappMbrsSno": "20240507000000029667",
      "joinYn": "Y",
      "authTkn": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDUwNzAwMDAwMDAyOTY2NyIsImlhdCI6MTczMjYwNzU4MSwiZXhwIjoxNzMyNjkzOTgxfQ.VmIouX6ogu3rkKClSuMJ-JOvTp-I7d5UqwR6qvJfn3g",
      "tGo1Yn": "N",
      "prsnAuthErmsCtt": null,
      "prsnAuthRstMsg": null
    }`
  },
  {
    text: 'getPreviousPaymentType(이전결제수단 조회)',
    value: 'getPreviousPaymentType',
    defaultRequest: `{}`
  },
  {
    text: 'registPreviousPaymentType(이전결제수단 등록)',
    value: 'registPreviousPaymentType',
    defaultRequest: `{
      "paymentType": 1
    }`
  },
  {
    text: 'requestGeneralPay(토스페이/네이버페이 일반결제 요청)',
    value: 'requestGeneralPay',
    defaultRequest: `{
      "paymentType" : "N",
      "checkoutPage" : "https://m.pay.naver.com/payments/auth-pay/20221114NlVDSzBEZ2ZuZ1d3dkhaYVFKUjk2bFVJanNBPQ=="
    }`
  },
  {
    text: 'shareRsrvInfo(예약정보 공유하기)',
    value: 'shareRsrvInfo',
    defaultRequest: `{
      "imgData": ""
    }`
  },
  {
    text: 'closeWebView(웹뷰 닫기)',
    value: 'closeWebView',
    defaultRequest: `{}`
  },
  {
    text: 'readyForMoveWebView(웹뷰이동준비완료)',
    value: 'readyForMoveWebView',
    defaultRequest: `{}`
  },
  {
    text: 'shareKakaoTalk(카카오톡공유하기)',
    value: 'shareKakaoTalk',
    defaultRequest: `{"shareImageUrl" : "https://tiaapid.tmoney.co.kr:20328/resources/appImg/mui/my/T0A2024001/main_card_image_bbik01.png"}`
  },
  {
    text: 'shareLink(sns공유하기)',
    value: 'shareLink',
    defaultRequest: `{
      "target": "kakao",
      "tempId": "37032",
      "data": "{\\"code\\":\\"123456\\"}"
    }`
  },
  {
    text: 'getAppMode(APP모드조회)',
    value: 'getAppMode',
    defaultRequest: `{}`
  },
  {
    text: 'callAppPreference(APP Peference 호출)',
    value: 'callAppPreference',
    defaultRequest: `{
      "type": "get",
      "key" : "key",
      "value" : ""
    }`
  },
  {
    text: 'sendAdbrix(애드브릭스전송)',
    value: 'sendAdbrix',
    defaultRequest: `{"eventId" : "EVENT_CLICK_TRAVEL"}`
  },
  {
    text: 'getCardGeneralPayment(신용체크카드 일반결제정보 조회)',
    value: 'getCardGeneralPayment',
    defaultRequest: `{}`
  },
  {
    text: 'sendCardGeneralPayment(신용체크카드 일반결제정보 전달)',
    value: 'sendCardGeneralPayment',
    defaultRequest: `{
      "cardSecDat1": "adcafcfd62643e9767bcd0e85f0ef1b6846537f6da5e3d12a882536f8035609292b2b80577a0370ae1d6005755785b6ebf5144f59adc7c9ceeb16101beaae8d8",
      "cardSecDat2": "e904f9f01fb5b400d1af2e874370637b034083e868749cc361e5bb80ebc86e8480014d905e0e9eaccbdee66d68ac13754f78e2a88f021fef5edd8c655fdadcbe",
      "cardSecDat3": "b27e073254bd10681b33443c8e72f3ca44f23e9c23e20b629df972e44b148bc8d764a7e1ce57ea10c37fee10f106d09305e8c341fad47e4fb9a5acfbbf6c1661",
      "cardSecDat4": "9b2a64d03ac2652f782cb72745435444792fef6dc252d3ac54b895b28415ed80dccdd3927405f573d94467f7e1724f2433745e1b25df68adc4c418501713e330",
      "cardSecLen1" : 4,
      "cardSecLen2" : 4,
      "cardSecLen3" : 4,
      "cardSecLen4" : 4,
      "cardPw" : "",
      "cardPwkb" : "",
      "validity": "0428",
      "crpcId" : "041",
      "crpcNm" : "우리카드",
      "checkCardYN" : "Y",
      "cprtCardYn" : "N",
      "issurCd" : "WRC",
      "cardImgPath" : "/resources/images/cardLogo/card_logo_woori.png",
      "cardSecBirth" : "",
      "companyNumber" : "",
      "monthlyInstallment" : "00"
    }`
  },
  {
    text: 'resetBadgeCount(알림 뱃지 초기화)',
    value: 'resetBadgeCount',
    defaultRequest: `{}`
  },
  {
    text: 'setBadgeCount(알림 뱃지 업데이트)',
    value: 'setBadgeCount',
    defaultRequest: `{"noReadNtfcCnt" : 1}`
  },
  {
    text: 'removeMemberData(사용자정보 제거)',
    value: 'removeMemberData',
    defaultRequest: `{}`
  },
  {
    text: 'getAccessibility(접근성 활성화 여부)',
    value: 'getAccessibility',
    defaultRequest: `{}`
  }
];

// 선택된 브릿지
const selectedBridge = ref('getAuthInfo');

// 선택된 브릿지의 기본 request 값
const getBridgeDefaultRequest = (bridgeValue: String) => {
  return bridges.find((bridge) => bridge.value === bridgeValue);
};

// 브릿지 변경시 기본 디폴트 request 값 변경
watch(selectedBridge, () => {
  const bridgeName = selectedBridge.value;
  bridgeRequestValue.value = getBridgeDefaultRequest(bridgeName)?.defaultRequest || '';
});

// 브릿지 호출
const callWebToNative = async () => {
  const bridgeName = selectedBridge.value;
  const bridgeRequestVal = bridgeRequestValue.value;

  const bridgeRequest = JSON.parse(bridgeRequestVal);
  const result = await appBridge[bridgeName](bridgeRequest);
  bridgeResponseValue.value = JSON.stringify(result, null, 2);
};
</script>

<style scoped></style>
