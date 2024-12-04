---
outline: deep
---

# Etc Bridge Web To Native Interface

etc 브릿지 인터페이스 정의서

## getLocaleInfo(언어정보조회)

언어 정보 조회.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| localeType | string | true | 언어타입 | - ko: 한글<br> - en: 영어|

### Request

```json
{}
```

### Response

```json
{
  "localeType": "ko", // ko: 한글, en: 영어
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## openView(화면 오픈)

외부 화면 오픈

- 인웹뷰\_바디웹뷰혜터네이티브: 약관상세, 더보기 > 설정 > 약관 및 정책
- 외부브라우져: 결제수단 관리 > 티머니란.
- 네이티브화면: 이용내역상세, 딥링크
- urlscheme: 토스앱 오픈 

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| url | string | true | url | 웹뷰의 경우는 https로 시작하는 url|
| viewType | string | true | 화면 타입 |- in: 인웹뷰\_바디웹뷰헤더네이티브<br> - ex: 외부브라우져<br> - native: 네이티브화면, deeplink: 딥링크(tmoneytia://) <br> - app: 앱호출 - urlscheme: 토스앱오픈(앱설치유무 분기처리x)|
| headerTitle | string | false | 헤더타이틀 | 화면타입이 in 일때, 헤더에 노출할 타이틀. null이면 헤더 미노출, 빈값이면 해더는 노출하되 비어있는 헤더 |
| viewJsonValue | string | false | viewJson값 | 특정 화면을 열떄, 필요한 값을 json형태로 전달|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "url": "https://tiaapid.tmoney.co.kr:20328/webview/pym/auth/v2/reqBzpyAuth.do",
  "viewType": "in",
  "headerTitle": "서비스 이용약관",
  "viewJsonValue": "{'utlzSvcDvsCd': '1', 'pmGrpDvsCd': 'M'}"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## terminateApp(APP종료)

APP 종료

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## openEncKeypad(암호화 키패드 열기)

인풋에 포커스 되는 시점에 암호화 키패드를 호출한다.  
입력값의 길이가 maxLength 인 경우 return 한다.

**변경이력**
| 일자 | 변경내용 |
| --- | --- |
| 5/23 | 브릿지명 변경(callEncKeypad -> openEncKeypad) |
| 7/17 | requst추가(inputMinLength, label, hint, maxAlert, minAlert) |

**request**

| Parameter      | Type    | IsRequired | Description           | Notes                                                                                                                                                                                                                    |
| -------------- | ------- | ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| inputMaxLength | number  | true       | 입력 총 길이          |                                                                                                                                                                                                                          |
| inputMinLength | number  | false      | 입력 최소 길이        |                                                                                                                                                                                                                          |
| keypadType     | string  | true       | 호출 키패드 타입      | - M: mTransKey. 카드 등록 > 카드번호/<br> - K: keypadSuit. 신용(체크)카드 등록/변경(교통카드등록)<br> - P : password-mTransKey. 결제비밀번호 입력<br> - F : MTransKey-full. 카드비밀번호, CVC, 주민번호 앞자리(생년월일) |
| label          | string  | false      | 라벨                  |                                                                                                                                                                                                                          |
| hint           | string  | false      | 힌트                  |                                                                                                                                                                                                                          |
| maxAlert       | string  | false      | 최대입력alert메세지   |                                                                                                                                                                                                                          |
| minAlert       | string  | false      | 최소입력alert메세지   |                                                                                                                                                                                                                          |
| isAddCardPwKb  | boolean | true       | KB 암호화값 추가 여부 | 카드비밀번호 일떄 true로 전달                                                                                                                                                                                            |
| inputFieldId   | string  | true       | input field의 ID      | 입력시마다 화면에 변경사항이 반영되어야 하는경우 사용. inputEncKeypad 브릿지에서 해당값 함께 web에 전달필요                                                                                                              |

**response**

| Parameter     | Type   | IsRequired | Description           | Notes                                                  |
| ------------- | ------ | ---------- | --------------------- | ------------------------------------------------------ |
| encInputValue | string | true       | 암호화 입력 값        | 키패드 암호화 전달.                                    |
| encHmac       | string | false      | 암호화 hmac           | keypadType: keypadSuit 케이스에만 전달.                |
| encToken      | string | false      | 암호화 token          | keypadType: keypadSuit 케이스에만 전달.                |
| encCardPwKb   | string | false      | 암호화 KB카드비밀번호 | isAddCardPwKb 가 true일때 전달. 카드비빌번호 에서 사용 |

### Request

```json
{
  "inputMaxLength": 2,
  "inputMinLength": 2,
  "keypadType": "M",
  "label": "비밀번호 앞 2자리를 입력하세요",
  "hint": "앞 2자리",
  "maxAlert": "최대 글자 2자를 입력하셨습니다.",
  "minAlert": "비밀번호를 확인해주세요.",
  "isAddCardPwKb": false,
  "inputFieldId": "passwordInput"
}
```

### Response

```json
{
  "encInputValue": "xxxxxxxxxx",
  "encHmac": "a3eOQye06rZRe81ZhFaROY8a6G4xwvtdHA/AUcUvfkqBsEdEXWkR+6H12rCLJ2t4hZ+lFWTlf9dlltVmtl5h9g==",
  "encToken": "AABC1A==",
  "encValKb": "xxxxxxx",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## closeEncKeypad(암호화 키패드 닫기)

암호화 입력 항목 이외에 다른 항목으로 포커스를 이동한경우, 암호화 키패드를 강제로 닫는 브릿지

**request**

| Parameter | Type | IsRequired | Description | Notes |
| --------- | ---- | ---------- | ----------- | ----- |

**response**

| Parameter | Type | IsRequired | Description | Notes |
| --------- | ---- | ---------- | ----------- | ----- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## showToast(toast 노출)

앱 toast 이용함에 따라 추가.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| message | string | true | 토스트 메세지 | |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "message": "등록 완료되었습니다."
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## getReportDisabilityBikeInfo(자전거 고장/장애 신고 입력 정보 조회). TODO 사진타입 확인 후 수정

자전거 고장신고 등록화면에서 사용
**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| type | string | true | 타입 | -qr: 자전거 QR CODE 스캔 <br> -image: 사진첨부 <br> - location: 위치정보 |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| bicycleNumber | string | false | 자전거번호 | QR CODE 스캔 |
| utlzSvcDvsCd | string | false | 이용서비스구분코드 | QR CODE 스캔 |
| dclrImgVal | string | false | base64 이미지 | 사진 첨부 |
| lttd | string | false | 위도 | 위치정보 (위치 권한 허용이 안된 경우 null) |
| lngt | string | false | 경도 | 위치정보 |

### Request

```json
{
  "type": "qr"
}
```

### Response

```json
{
  "bicycleNumber": "22B00862", // 자전거번호
  "utlzSvcDvsCd": "D", // 이용서비스구분코드 T:따릉이, D:타슈
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## openContact(연락처 앱 오픈 / 연락처 조회 )

연락처 앱 오픈 / 연락처 조회.  
쿠폰 > 목록 > 선물하기에서 사용

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| phoneNumber | string | false | 연락처 | 휴대전화 번호. 취소하면 null로 응답 |

### Request

```json
{}
```

### Response

```json
{
  "phoneNumber": "01012341234",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## encSeoulBikePassword(따릉이 비밀번호 암호화)

암호화 된 따릉이 패스워드를 반환(따릉이 비밀번호 변경 화면에서 사용)

**request**

| Parameter | Type   | IsRequired | Description  | Notes |
| --------- | ------ | ---------- | ------------ | ----- |
| oldPw     | string | true       | 현재비밀번호 |       |
| newPw     | string | true       | 변경비밀번호 |       |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| cipherOldPw | string | true | 암호화 된 현재비밀번호 | |
| cipherNewPw | string | true | 암호화 된 변경비밀번호 | |

### Request

```json
{
  "oldPw": "ghikq1@!",
  "newPw": "ghikq2@!"
}
```

### Response

```json
{
  "cipherOldPw": "dfasgeqrhdfsgsd212",
  "cipherNewPw": "sadfafgab23r11241",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## logoutClearTGoData(로그아웃 APP 데이터 삭제 요청)

로그아웃

**request**

| Parameter | Type | IsRequired | Description | Notes |
| --------- | ---- | ---------- | ----------- | ----- |

**response**

| Parameter | Type | IsRequired | Description | Notes |
| --------- | ---- | ---------- | ----------- | ----- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## showTabbar(하단탭바노출)

메인화면 tab bar 노출여부

**request**

| Parameter | Type    | IsRequired | Description | Notes                             |
| --------- | ------- | ---------- | ----------- | --------------------------------- |
| isShow    | boolean | true       | 노출여부    | - true: 노출 <br> - false: 미노출 |

**response**

| Parameter | Type | IsRequired | Description | Notes |
| --------- | ---- | ---------- | ----------- | ----- |

### Request

```json
{
  "isShow": true
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## callIdentityVerify(본인인증)

본인인증(휴대폰 인증) 호출\
성공여부에 따른 분기처리.

**변경이력**

| 일자 | 변경내용                              |
| ---- | ------------------------------------- |
| 6/11 | 인증 구분 타입 추가 및 문서 위치 이동 |
| 11/26 | 응답값 수정 |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| verifyType | number | true | 본인인증 인증 타입 구분 | SING_UP(0), PARENTS(2), PASSWORD_RESET(6) |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| prntAuthSno | string | false | 부모인증일련번호 | PARENTS(2) 인증요청의 경우만 전달 |
| prsnAuthResult | object | false | 본인인증정보 |  |

**prsnAuthResult**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| prntAuthSno | string | false | 부모인증일련번호 | PARENTS(2) 인증요청의 경우만 전달 |
| prsnAuthSno | string | false | 본인인증일련번호 |  |
| ageDvsCd | string | false | 사용자 연령코드 | 0:UNKNOWN, 1: 성인, 2: 만 13세, 3: 만 13세 미만 |
| joinYn | string | false | 가입여부 | Y/N |
| tGo1Yn | string | false | 최초 1회 동의 팝업 flas | Y : 팝업 노출, N : 팝업 미노출 |

### Request

```json
{}
```

### Response

```json
{
  "prntAuthSno": "20201124114323000001",
  "prsnAuthResult": {
    "prntAuthSno": "20201124114323000001",
    "prsnAuthSno": "20241126000000032226",
    "ageDvsCd": "2",
    "joinYn": "Y",
    "tGo1Yn": "Y",
  },
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## closeWebView(웹뷰닫기)

웹뷰 닫기. 웹뷰를 닫는다  
moveWebView 브릿지로 호출된 화면이 첫화면에서 뒤로가기를 했을때 해당 브릿지를 호출한다.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## readyForMoveWebView(웹뷰이동준비)

moveWebView 브릿지로 호출받을 준비 완료가 되었을떄, APP에 호출한다.
app에서 moveWebView 브릿지를 호출할떄 webview를 생성하는데, 화면 이동 페이지(/common/init-move-web-view)로 이동 후 moveWebView가 호출하게끔 하기해서 사용.
vue가 랜더링이 된 이후에 첫화면을 이동하기전에 moveWebView가 호출되면 해당 이동은 안되고 첫화면으로 이동하므로 해당 브릿지가 호출된 이후 moveWebView 호출

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## shareKakaoTalk(카카오톡공유하기)

카카오톡을 통해서 이미지를 공유한다

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| shareImageUrl | string | true | 공유이미지URL | ex. https://tiaapid.tmoney.co.kr:20328/resources/appImg/mui/my/T0A2024001/main_card_image_bbik01.png |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "shareImageUrl": "https://tiaapid.tmoney.co.kr:20328/resources/appImg/mui/my/T0A2024001/main_card_image_bbik01.png"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## shareLink (SNS 공유하기)

SNS\_공유하기

**request**
| Parameter | Type | IsRequired | Description | Notes |
| target | string | true | 타켓(카카오/인스타그램) | --- |
| tempId | string | true | 템플릿ID | --- |
| data | string | true | 동적데이터 | --|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "target": "kakao",
  "tempId": "",
  "data": "{
    'code': ''
  }"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## getAppMode(APP모드조회)

APP모드를 조회한다. 디버깅을 위해 사용. ex. 설정 > 오픈오스 라이선스 > 개발자 메뉴

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| isDebugAppMode | boolean | true | 디버그APP모드여부 | |

### Request

```json
{}
```

### Response

```json
{
  "isDebugAppMode": true,
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## callAppPreference(APP preference 호출)

APP Preference 를 호출한다. 해당 저장소에 있는 값을 조회/저장한다.
동적으로 처리하기 위해서 key/value 형식으로 값을 조회/저장한다

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| type | string | true | get: 조회, set: 저장 | |
| key | string | true | app preference key 값 | |
| value | string | true | app preference value 값 | |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| value | string | false | app preference value 값. type=get 일떄 응답한다. set일떄는 키는 있되 null로 응답 | |

### Request

```json
{
  "type": "get",
  "key": "key",
  "value": ""
}
```

### Response

```json
{
  "response": {
    "value": "value",
    "code": "0000",
    "message": "OK"
  }
}
```

## sendAdbrix(애드브릭스 전송)

애드브릭스 이벤트 전송. APP이벤트 트래킹을 위해 사용.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| eventId | string | true | 이벤트ID | |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "eventId": "EVENT_CLICK_TRAVEL"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## resetBadgeCount(알림 뱃지 초기화)

알림 뱃지 초기화를 위한 브릿지.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## setBadgeCount(알림 뱃지 업데이트)

알림 뱃지 업데이트 위한 브릿지.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| noReadNtfcCnt | number | false | 미확인알림카운트 | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "noReadNtfcCnt": 1
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## removeMemberData(사용자정보 제거)

사용자정보 제거

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```
