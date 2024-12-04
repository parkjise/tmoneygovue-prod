---
outline: deep
---

# 결제관련 브릿지 처리 현황

## 공통

결제관련 화면들에서 이용하는 공통 브릿지

**기능리스트**
| 화면 | 기능 | 브릿지명 |  IOS | AOS |
| --- | --- | --- | --- | --- |
| 공통 | 약관상세이동 | openView | O | O |
| 공통 | 토스트메시지 | showToast | O | O |

## 결제하기/결제수단관리

결제하기에서 이용하는 브릿지 내용 정리<br/>
기능별로 구분하여 적용

**기능리스트**
| 화면 | 기능 | 브릿지명 |  IOS | AOS | 오류상세 |
| --- | --- | --- | --- | --- | --- |
| 티머니 | 모바일티머니란? | openView | O | O | |
| 티머니 | 등록용정보조회 | getOtherAppVersionList | O | O |   |
| 티머니 | 모바일티머니등록 | openView | O |  |   | 
| 티머니 | 모바일티머니가기 | openView | O | O |   |
| 비즈페이 | 비즈페이등록 | openView | O |   |   |
| 네이버 | 네이버페이자동결제등록 | openView | O | O | 등록 후 공백화면, resonse 관련 확인 필요 |
| 토스 | 토스페이자동결제등록 | openView | O |   | 등록호출 url 변경적용, 새로테스트 필요 |
| 카드간편결제 | 고속시외(APPDB)카드조회 | getCardList | O | O |   |
| 카드간편결제 | 고속시외(APPDB)카드등록 | registCard | O | O |   |
| 카드간편결제 | 고속시외(APPDB)별명변경 | changeNickNameCard | O | O |   |
| 카드간편결제 | 고속시외(APPDB)주카드변경/삭제 | updateCard | O | O |   |
| 결제하기 | 일반결제요청(네이버/토스) | requestGeneralPay | O |   |   |
| 결제하기 | 이전결제수단조회 | getPreviousPaymentType | O | O |   |
| 결제하기 | 이전결제수단등록 | registPreviousPaymentType | O | O |   |
| 결제결과 | 고속버스연계 | openView | O | O |  |

## 결제비밀번호 입력

결제 비밀번호 입력 및 설정 화면

**기능리스트**
| 화면 | 기능 | 브릿지명 |  IOS | AOS |
| --- | --- | --- | --- | --- |
| 결제비밀번호입력 | 암호화키패드요청 | openEncKeypad | O | O |
| 결제비밀번호입력 | 암호화키패드닫기 | closeEncKeypad | O | O |
| 결제비밀번호입력 | 본인인증 | callIdentityVerify | O | O |

## 카드간편결제등록

카드간편결제 추가 등록 

**기능리스트**
| 화면 | 기능 | 브릿지명 |  IOS | AOS |   |
| --- | --- | --- | --- | --- | --- |
| 카드간편결제등록 | OCR요청 | readOCR | O | O |   |
| 카드간편결제등록 | 암호화키패드요청 | openEncKeypad | O | O | 입력완료안하고 종료시 암호화값 입력 여부 |
| 카드간편결제등록 | 암호화키패드닫기 | closeEncKeypad | O | O |   |

