---
outline: deep
---

# Travel Bridge Web To Native Interface

## downloadReceiptImg (이용내역 영수증 저장)

이용상세\_영수증 저장

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| imgData | string | true | 영수증 binary 문자열 | --|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "imgData": ""
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

## shareRsrvInfo (예약정보 공유하기)

이용상세\_예약정보 공유하기

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| imgData | string | true | QR코드,예약정보 이미지 binary 문자열 | --|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "imgData": ""
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
