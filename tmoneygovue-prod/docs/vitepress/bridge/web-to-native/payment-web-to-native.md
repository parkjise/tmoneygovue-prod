---
outline: deep
---

# web to native I/F for Payment

## getOtherAppVersionList (타앱버전조회)

티머니페이/비즈페이 등록하기 URL호출을 위한 앱 설치 여부 및 앱 버젼 정보 요청

**변경이력**
| 일자 | 변경내용 | 
| --- | --- |
| 6/10 | 브릿지명 변경(appVersionList -> getOtherAppVersionList) | 

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| appState | string | true | 앱설치여부 | |
| versionList | AppVersionInfo[] | false | 앱버젼 정보 | AOS에서만 이용  |

### Request

```json
{}
```

### Response

```json
{
  "appState": "Y",
  "versionList": [
    {
      "packageFieldName": "MOBILE_TMONEY_APP_PKG_NAME",
      "packageName": "com.lgt.tmoney",
      "version": "????"
    },
    {
      "packageFieldName": "TMONEY_PAY_APP_PKG_NAME",
      "packageName": "com.tmoney.tmpay",
      "version": "????"
    }
  ],
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## goOtherApp(타앱호출) 삭제. openView로 대체

기기가 기등록된 경우 노출되는\
앱 이동 버튼 클릭시 해당 어플 실행

- appCd : 호출 앱 코드 (임의채번)
  - MT : 모바일 티머니
  - TB : 티머니 비즈페이

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| appCd | string | true | 호출앱코드 | ["MT", "TB"],"MT":모바일티머니,"TB":티머니비즈페이|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |


### Request

```json
{
  "appCd": "XX"
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

## getCardList(간편결제 고속/시외/항공 카드목록 조회)

고속,시외 항공 관련 정보 요청\
AppDatabase 에 저장된 카드 목록 조회.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| smpyPymList | AppSmpcPym[] | true | AppDatabse에 저장된 카드 목록 | --- |

### Request

```json
{}
```

### Response

```json
{
  "smpcPymList": [
    {
      "pKey" : "",
      "cardCode" : "368",
      "cardName" : "롯데일반신용",
      "cardCIImageWhite" : "/resources/images/ci/img_lottecard_logo_wh.png",
      "cardSecDat1": "adcafcfd62643e9767bcd0e85f0ef1b6846537f6da5e3d12a882536f8035609292b2b80577a0370ae1d6005755785b6ebf5144f59adc7c9ceeb16101beaae8d8",
      "cardSecDat2": "e904f9f01fb5b400d1af2e874370637b034083e868749cc361e5bb80ebc86e8480014d905e0e9eaccbdee66d68ac13754f78e2a88f021fef5edd8c655fdadcbe",
      "cardSecDat3": "b27e073254bd10681b33443c8e72f3ca44f23e9c23e20b629df972e44b148bc8d764a7e1ce57ea10c37fee10f106d09305e8c341fad47e4fb9a5acfbbf6c1661",
      "cardSecDat4": "9b2a64d03ac2652f782cb72745435444792fef6dc252d3ac54b895b28415ed80dccdd3927405f573d94467f7e1724f2433745e1b25df68adc4c418501713e330",
      "cardSecLen1" : 4,
      "cardSecLen2" : 4,
      "cardSecLen3" : 4,
      "cardSecLen4" : 4,
      "cardDecDat1": "1010",
      "cardDecDat4": "5409",
      "cardNickName" : "",
      "rprnCardYn": "N",
    }
  ],
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## registCard(간편결제 고속/시외/항공 등록)

카드정보 등록

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| cardSecData1 | string | true | 카드번호1 암호화 | --- |
| cardSecData2 | string | true | 카드번호2 암호화 | --- |
| cardSecData3 | string | true | 카드번호3 암호화 | --- |
| cardSecData4 | string | true | 카드번호4 암호화 | --- |
| cardSecBirth | string | true | 생년월일 암호화 | --- |
| cardSecLen1 | string | true | 카드번호1 평문화 길이 | --- |
| cardSecLen2 | string | true | 카드번호2 평문화 길이 | --- |
| cardSecLen3 | string | true | 카드번호3 평문화 길이 | --- |
| cardSecLen4 | string | true | 카드번호4 평문화 길이 | --- |
| cardSecLenBirth | string | true | 생년월일 평문화 길이 | --- |
| cardName | string | true | 카드이름 | --- |
| validity | string | true | 유효일자 | MMDD |
| paymentSystem | string | true | 사전결제시스템연동여부 | ['Y','N'] |
| cardCode | string | true | 카드코드 | --- |
| cardKinds | boolean | true | 법인여부 | true:법인, false:개인 |
| companyNumber | string | false | 사업자번호 | cardKinds, true일경우만 보냄 |
| nickName | string | false | 카드 별명 | --- |
| path1 | string | false | 카드로고 이미지 | --- |
| path2 | string | false | 카드로고 이미지 WH | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| rspCd | string | true | 처리 결과 코드 | --- |
| rspMsg | string | true | 처리 결과 메시지 | --- |


### Request

```json
{
  "cardSecDat1": "adcafcfd62643e9767bcd0e85f0ef1b6846537f6da5e3d12a882536f8035609292b2b80577a0370ae1d6005755785b6ebf5144f59adc7c9ceeb16101beaae8d8",
  "cardSecDat2": "e904f9f01fb5b400d1af2e874370637b034083e868749cc361e5bb80ebc86e8480014d905e0e9eaccbdee66d68ac13754f78e2a88f021fef5edd8c655fdadcbe",
  "cardSecDat3": "b27e073254bd10681b33443c8e72f3ca44f23e9c23e20b629df972e44b148bc8d764a7e1ce57ea10c37fee10f106d09305e8c341fad47e4fb9a5acfbbf6c1661",
  "cardSecDat4": "9b2a64d03ac2652f782cb72745435444792fef6dc252d3ac54b895b28415ed80dccdd3927405f573d94467f7e1724f2433745e1b25df68adc4c418501713e330",
  "cardSecBirth": "2fe0427a7cddeac0b51e4bd81cf4453bf55ac80dee363af8f2223f90de6e9a4327996833a9a37ca0efa6ea5f4060e9c94aac9e1313fda87260af929be9af4d83f6367cc22db892d326a6424fddc82619eb8aa71dafa57d54bec11069e81536c6",
  "cardSecLen1": "4",
  "cardSecLen2": "4",
  "cardSecLen3": "4",
  "cardSecLen4": "4",
  "cardSecLenBitrh": "6",
  "cardName": "국민카드",
  "validity": "0428",
  "paymentSystem": "Y",
  "cardCode": "08",
  "cardKinds": false,
  "companyNumber": "",
  "nickName": "",
  "path1": "/resources/images/ci/img_lottecard_logo_org.png",
  "path2": "/resources/images/ci/img_lottecard_logo_wh.png"
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

## changeNickNameCard(간편결제 고속/시외/항공 별명 변경)

고속,시외,항공 탭 AppDatabase에 저장된 카드의 별명 변경 처리

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| pKey | string | true | 고유키 | --- |
| nickName | string | true | 변경별명 | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "pKey": "1010990000125409",
  "nickName": "변경별명"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "처리 완료"
  }
}
```

## updateCard(간편결제 고속/시외/항공 주카드 처리 및 카드삭제)

고속,시외 항공 탭 AppDatabase에 저장된 카드의 주카드 처리

- C : 등록
- U : 취소
- D : 삭제 ( 카드 삭제 )

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| pKey | string | true | 고유키 | --- |
| type | string | true | 처리코드 | ["C","U","D"],"C":등록,"U":취소,"D":삭제(카드삭제)  |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "paymentKey": "1010990000125409",
  "type": "C"
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "처리 완료"
  }
}
```

## readOCR(OCR)

신용 체크카드 등록시 필요한 OCR 호출\
카드번호 암호화 필요함.

- cardNum1~4 : 입력 카드번호
- encCardNum3~4 : 3, 4번 카드번호 암호화 값
- exdt : 유효월연 정보.

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| cardNum1 | string | true | 카드번호 평문화1 | --- |
| cardNum2 | string | true | 카드번호 평문화2 | --- |
| cardNum3 | string | true | 카드번호 평문화3 | --- |
| cardNum4 | string | true | 카드번호 평문화4 | --- |
| encCardNum1 | string | true | 카드번호 암호화1 | --- |
| encCardNum2 | string | true | 카드번호 암호화2 | --- |
| encCardNum3 | string | true | 카드번호 암호화3 | --- |
| encCardNum4 | string | true | 카드번호 암호화4 | --- |
| exdt | string | true | 유효기간 | --- |


### Request

```json
{}
```

### Response

```json
{
  "cardNum1": "1111",
  "cardNum2": "2222",
  "cardNum3": "3333",
  "cardNum4": "4444",
  "encCardNum1": "xxxxxxxxxx",
  "encCardNum2": "xxxxxxxxxx",
  "encCardNum3": "xxxxxxxxxx",
  "encCardNum4": "xxxxxxxxxx",
  "exdt": "1127",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## decScsYn(카드번호 복호화 성공여부)

티머니 교통카드 등록 / 카드간편결제 등록 요청시 파라미터 / 운전면허번호 등록

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- | 
| encScsYn | string | true | 암호화성공여부 | 암호화된 문자열? |
| encDtm | string | true | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| decScsYn | string | true | --- | --- |

### Request

```json
{
  "encScsYn": "Y",
  "encDtm": "sufe2.."
}
```

### Response

```json
{
  "decScsYn": "...",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## getPreviousPaymentType(이전결제수단 조회)

1. 대표 결제 수단
2. 이전 결제 수단
3. Tmoney
4. 카드결제
   결제하기 화면 로딩시 결제수단 초기값세팅을 위한 데이터 조회

**변경이력**
| 일자 | 변경내용 | 
| --- | --- |
| 5/23 | 브릿지명 변경(callPreviousPaymentType -> getPreviousPaymentType) | 

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| paymentType | number | true | 결제수단 정보 | [0,1,2,3,11,12,13],(0:NONE,1:티머니,2:비즈페이,3:간편결제,4:일반카드결제,5:토스페이,6:네이버) |

### Request

```json
{}
```

### Response

```json
{
  "paymentType": 1,
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## registPreviousPaymentType(이전결제수단 등록)

다음 결제하기 화면 로딩시 결제수단 초기값세팅을 위한 데이터 등록

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| paymentType | number | true | 결제수단 정보 | [0,1,2,3,11,12,13],(0:NONE,1:티머니,2:비즈페이,3:간편결제,4:일반카드결제,5:토스페이,6:네이버) |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "paymentType": 1
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

## getMainCard(주카드 조회)

대표결제수단 할당을 위해 주카드 조회

**변경이력**
| 일자 | 변경내용 | 
| --- | --- |
| 5/23 | 브릿지명 변경(callMainCard -> getMainCard) | 
| 6/17 | 브릿지 미이용 |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| pKey | string | true | 주카드번호 | --- |

### Request

```json
{}
```

### Response

```json
{
  "pKey": "xxxxxxx",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## requestGeneralPay(토스페이/네이버페이 일반결제 요청)

토스페이/네이버페이 일반 결제호출 후 결과 값

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| paymentType | string | true | 페이구분값 호출 | ['N','T']( N:네이버페이, T:토스페이) |
| checkoutPage | string | true | 결제 화면 호출을 위한 url | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| result | string | true | 결과 | success:성공,fail:실패, cancel:취소 |
| oderSno | string | false | 주문번호 | 성공시 전달 |
| moappMbrsSno | string | false | 앱회원일련번호 | 성공시 전달 |
| billAuthData | Object | false | 결제 인증값 | 성공시 전달 |
| spreadOut | string | false | 할부개월 | 성공시 전달 |
| amount | number | false | 결제금액 | 성공시 전달 |
| message | string | true | 결과 메시지 | --- |


### Request

```json
{
  "paymentType" : "N",
  "checkoutPage" : "https://m.pay.naver.com/payments/auth-pay/20221114NlVDSzBEZ2ZuZ1d3dkhaYVFKUjk2bFVJanNBPQ=="
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  },
  "result" : "success",
  "oderSno" : "20220901130112345678",
  "moappMbrsSno" : "20221212000000001234",
  "billAuthData" : {
    "card":"1234567890123456", 
    "auth":""
  },
  "amount" : 15000,
  "spreadOut" : "00",
  "message" : "정상처리되었습니다."
}
```
## getCardGeneralPayment(신용체크카드 일반결제정보 조회)
신용체크카드 일반결제 입력 정보 조회. 일반결제에서 필요한 정보를 조회한다

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| isInstallment | boolean | true | 할부 가능 여부 |  |
| paymentAmount | number | true | 결제금액 |  |


### Request

```json
{
}
```

### Response

```json
{
  "isInstallment": true,
  "paymentAmount": 55000,
  "response": {
    "code": "0000",
    "message": "OK"
  },
}
```

## sendCardGeneralPayment(신용체크카드 일반결제정보 전달)
신용체크카드 일반결제 입력 정보 전달

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| cardSecDat1 | string | true | 암호화 카드번호1 |  |
| cardSecDat2 | string | true | 암호화 카드번호2 |  |
| cardSecDat3 | string | true | 암호화 카드번호3 |  |
| cardSecDat4 | string | true | 암호화 카드번호4 |  |
| cardSecLen1 | string | true | 카드번호1 평문화 길이 | --- |
| cardSecLen2 | string | true | 카드번호2 평문화 길이 | --- |
| cardSecLen3 | string | true | 카드번호3 평문화 길이 | --- |
| cardSecLen4 | string | true | 카드번호4 평문화 길이 | --- |
| cardPw | string | true | 카드비밀번호 |  |
| cardPwkb | string | true | kb카드비밀번호 |  |
| validity | string | true | 유효기간 |  |
| crpcId | string | true | 카드발행사ID| |
| crpcNm | string | true | 승인기관코드명 | |
| checkCardYN | string | true | 체크카드여부 | |
| cprtCardYn | string | true | 법인카드여부 | |
| issurCd | string | true | 발급사코드| |
| cardImgPath | string | true | 카드이미지경로 | |
| ~~cardKinds~~ | ~~boolean~~ | ~~true~~ | ~~법인카드여부~~ | ~~true:법인, false:개인. cprtCardYn 으로 대체~~ |
| cardSecBirth | string | true | 암호화 생년월일 |  |
| companyNumber | string | false | 암호화 사업자등록번호 |  |
| monthlyInstallment | string | true | 할부개월수 | 00: 일시불 |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |


### Request

```json
{
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
}
```

### Response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  },
}
```