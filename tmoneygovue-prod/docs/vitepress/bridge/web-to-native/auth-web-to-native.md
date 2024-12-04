---
outline: deep
---

# Auth Bridge Web To Native Interface

auth 브릿지 인터페이스 정의서

## getAuthInfo(인증정보 조회)

로그인 정보 조회.   

**변경이력**
| 일자 | 변경내용 | 
| --- | --- |
| 6/13 | 응답값추가(ondaAuthToken) | 
| 6/27 | 응답값추가(genderCode) | 
| 11/18 | 응답값추가(pushToken) | 

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| token | string | true | 인증토큰 |
| uuid | string | true | UUID |
| appCode | string | true | 앱코드 |
| osKnd | string | true | OS구분 | A: Android, I: iOS|
| osVer | string | true | OS버젼 |
| appVer | string | true | 앱버젼 |
| appVerCode | string | true | 앱버젼코드 |
| mbrNm | string | true | 회원이름 |
| moappMbrsSno | string | true | 모바일앱회원일련번호 | 해당 값이 null이면 비로그인상태 |
| mbrBrdt | string | true | 회원생년월일 | 운전면허 등록에서 사용 |
| mbrphNo | string | true | 회원전화번호 | 따릉이 비밀번호 변경에서 사용 |
| ondaAuthToken | string | true | onda인증토큰 | 이용/결제 내역의 택시탭 API 통신에서 사용 |
| genderCode | string | true | 성별코드 | M: 남자, F: 여자|
| pushToken | string | true | 푸시토큰 |

### Request

```json
{}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDQxMjAwMDAwMDAyODg1NiIsImlhdCI6MTcxNTY1NjYyMSwiZXhwIjoxNzE1NzQzMDIxfQ.rw_WMPuXZ7n8TM0d4cw2OGneog-LxptoSSgmIdWSSyQ",
  "uuid": "f02355fc-fcb4-4111-a15e-da0de485ab34",
  "appCode": "MIC",
  "osKnd": "A",
  "osVer": "34",
  "appVer": "2.3.9",
  "appVerCode": "883",
  "mbrNm": "홍길동",
  "moappMbrsSno": "20240507000000029667",
  "mbrBrdt": "20240101",
  "mbrphNo": "01012345678",
  "genderCode": "M",
  "response": {
    "code": "0000",
    "message": "OK"
  },
  "pushToken": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDQxMjAwMDAwMDAyODg1NiIsImlhdCI6MTcxNTY1NjYyMSwiZXhwIjoxNzE1NzQzMDIxfQ.rw_WMPuXZ7n8TM0d4cw2OGneog-LxptoSSgmIdWSSyQ",
}
```

## updateAuthTknInfo(회원 인증토큰 갱신)

회원 인증토큰정보 갱신. api응답을 http 401 을 받으면 토큰갱신 수행. 갱신 실패시 token 빈값으로 응답

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| token | string | true | 인증토큰 |

### Request

```json
{}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDIzMDgxMTAwMDAwMDAyMDQ5MyIsImlhdCI6MTcxMzk0OTkwNiwiZXhwIjoxNzE0MDM2MzA2fQ.BxFVA_5m1uIJptDf9gicw2V218GsbLFemYpxuVEh0y8",
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```