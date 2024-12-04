---
outline: deep
---

# Bridge Native To Web Interface

브릿지(native to web) 인터페이스 정의서

## backWebView(뒤로가기)

뒤로가기

**변경이력**
| 일자 | 변경내용 |
| --- | --- |
| 5/23 | 브릿지명 변경(webViewBack -> backWebView) |

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

## moveWebView(웹뷰이동)

spa 웹뷰화면 이동. 딥링크도 url파라메터로 전달  
native에서 spa로 변경된 화면 처리하기 위해 딥링크도 spa로 전달받아서 처리

**변경이력**
| 일자 | 변경내용 |
| --- | --- |
| 5/23 | 브릿지 추가 |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| url | string | true | 이동할 url | ex1. /main/more-main , ex2. tmoneytia://event/list|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### Request

```json
{
  "url": "/main/more-main"
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

## inputEncKeypad(보안키패드 입력)

callEncKeypad에 입력(keyin) 시점에 호출.

**변경이력**
| 일자 | 변경내용 |
| --- | --- |
| 5/23 | 브릿지명 변경(receiveEncKeypad -> inputEncKeypad) |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| inputFieldId | string | true |input field의 ID | 입력시마다 화면에 변경사항이 반영되어야 하는경우 사용. callEncKeypad 브릿지에서 해당값 함께 web에 전달필요 |
| inputValue | string | true | 입력값 | |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### request

```json
{
  "inputFieldId": "iptCardNo1",
  "inputValue": "12"
}
```

### response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## openTermPage(약관화면 호출)

약관화면 호출

**변경이력**
| 일자 | 변경내용 |
| --- | --- |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |
| svcDvsCd | string | true | 서비스 구분 코드 | --- |
| stplGrpCd | string | true | 이용약관 그룹 코드 | --- |
| utlzSvcDvsCd | string | true | 이용서비스구분코드 | --- |
| linkUrl | string | true | 확인후 연결 url | openView(native) 호출|

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### request

```json
{
  "svcDvsCd": "2",
  "stplGrpCd": "BJ",
  "utlzSvcDvsCds": "B",
  "linkUrl": "tmoneytia://bus/main"
}
```

### response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```

## loadAuthInfo(인증데이터 로드)

인증 데이터 로드. 로그인(native) 완료 시점에 webview가 다시 인증데이터를 로드 하도록 호출

**변경이력**
| 일자 | 변경내용 |
| --- | --- |

**request**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

**response**
| Parameter | Type | IsRequired | Description | Notes |
| --- | --- | --- | --- | --- |

### request

```json
{}
```

### response

```json
{
  "response": {
    "code": "0000",
    "message": "OK"
  }
}
```