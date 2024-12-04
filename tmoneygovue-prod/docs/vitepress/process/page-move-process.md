---
outline: deep
---

# 화면 이동처리
- APP에서 화면이동을 할때 3개(native, web(jsp), web(spa)) 화면을 이동하는 케이스가 있음. 이렇게 나눠져 있어서 뒤로가기 이슈 발생.
- ex. 1. spa -> 2. jsp -> 3. spa 일때 3번에서 뒤로가기를 하면 사용자 입장에서는 2번 jsp화면이 노출되어야 되는데 spa에서는 뒤로라기가 1번 spa 화면임.
- 이를 위해서 native가 뒤로가기 처리 or 특정화면으로 고정이동 시키는 개발 필요.  
-> jsp에서 spa를 호출하는 케이스를 없애긴했는데, 더 있을지 확인필요

## ~~JSP 화면 뒤로가기 처리 필요 화면~~
~~nativa에서 처리 필요. JSP 화면에서 뒤로가기 처리~~
- ~~알림(SPA) > 교통카드 리위드(JSP)~~
- ~~마이메인(SPA) > 나의 유형 스탬프(JSP)~~
- ~~마이메인(SPA) > 나의 이동거리(JSP)~~
- ~~마이메인(SPA) > 나의 교통비(JSP)~~
- ~~헤택메인(SPA) > 교통카드 리위드(JSP)~~  
-> openView 브릿지 활용. native에서 처리

## openView 브릿지 viewType 별 화면 맵핑
### app: 앱호출. viewType=app 케이스
| url | 화면명 | 
| --- | --- | 
| homeMain | 홈화면 | 

### deeplink: 딥링크. viewType=deeplink 케이스
해당 딥링크는 native->spa로 변환된 화면으로 해당 딥링크는 spa에서 처리  
| url | 화면명 | spaUrl| 
| --- | --- | --- | 
| tmoneytia://my | MY메인 | /main/my-main | 
| tmoneytia://viewmore/main | 더보기메인 | /main/more-main |
| tmoneytia://viewmore/settings | 앱설정 | /app-setting/setting | 
| tmoneytia://announcement/list | 알림내역 | /notice/notice-list | 
| tmoneytia://push/history | 푸시내역 | /notification/notification-list | 
| tmoneytia://event/list | 이벤트목록 | /event/event-list | 
| tmoneytia://event/detail | 이벤트상세 | /event/event-detail | 
| tmoneytia://coupon/list | 쿠폰목록 | /coupon/coupon-list | 
| tmoneytia://coupon/register | 쿠폰등록 | /coupon/coupon-list | 
| tmoneytia://coupon/bus | 쿠폰 고속/시외 | /coupon/coupon-list?category=bus |   
| tmoneytia://coupon/taxi | 쿠폰 택시 | /coupon/coupon-list?category=taxi |   
| tmoneytia://coupon/bike | 쿠폰 자전거 | /coupon/coupon-list?category=bike |   
| tmoneytia://coupon/kickboard | 쿠폰 킥보드 | /coupon/coupon-list?category=kickboard |   
| tmoneytia://coupon/rentercar | 쿠폰 렌터카 | /coupon/coupon-list?category=rentercar |   
| tmoneytia://mywallet/tmoneypay | 결제수단관리 | /payment/payment-manage | 
| tmoneytia://transportation_card/register/main | 교통카드등록 | /regist-traffic-card/regist-traffic-card-main |
| tmoneytia://mileage/history | GO마일리지 내역 | /mileage/mileage-history | 
| tmoneytia://mileage/transfer | GO마일리지 전환 | /mileage/mileage-exchange-main | 
| tmoneytia://manual/bus | 이용가이드 버스 | /customer-support/user-guide?category=bus |
| tmoneytia://manual/taxi | 이용가이드 택시 | /customer-support/user-guide?category=taxi |
| tmoneytia://manual/bike | 이용가이드 자전거 | /customer-support/user-guide?category=bike |
| tmoneytia://manual/favorite | 이용가이드 즐겨찾기 | /customer-support/user-guide?category=favorite |
| tmoneytia://manual/mileage | 이용가이드 마일리지| /customer-support/user-guide?category=mileage |
| tmoneytia://manual/payment | 이용가이드 결제 | /customer-support/user-guide?category=payment |
| tmoneytia://history/public | 대중교통 이용내역 목록 | /usage-history/list |
| tmoneytia://history/bus | 버스 이용내역 목록| /usage-history/list?category=bus|
| tmoneytia://history/taxi| 택시 이용내역 목록| /usage-history/list?category=taxi|
| tmoneytia://history/bike| 자전거 이용내역 목록| /usage-history/list?category=bike|
| tmoneytia://history/kickboard| 킥보드 이용내역 목록| /usage-history/list?category=kickboard|
| tmoneytia://history/train| 기차 이용내역 목록| /usage-history/list?category=train|
| tmoneytia://history/airplane| 항공 이용내역 목록| /usage-history/list?category=airplane|
| tmoneytia://history/car_rent| 렌터카 이용내역 목록| /usage-history/list?category=rentercar|
| tmoneytia://transactions | 결제내역 전체 | /payment/payment-history |
| tmoneytia://transactions/bus | 결제내역 버스 | /payment/payment-history?category=bus |
| tmoneytia://transactions/taxi | 결제내역 택시 | /payment/payment-history?category=taxi |
| tmoneytia://transactions/bike | 결제내역 자전거 | /payment/payment-history?category=bike |
| tmoneytia://transactions/kickboard | 결제내역 킥보드 | /payment/payment-history?category=kickboard |
| tmoneytia://transactions/airplane | 결제내역 비행기 | /payment/payment-history?category=airplane |
| tmoneytia://transactions/train | 결제내역 기차 | /payment/payment-history?category=train |
| tmoneytia://transactions/rentercar | 결제내역 렌터카 | /payment/payment-history?category=rentercar |   
| tmoneytia://customer/inquiry | 1:1문의 문의내역 확인 | /customer-support/complain |     
| tmoneytia://reward/history | 환승리워드 내역 | /transfer-reward/transfer-history |   
| tmoneytia://rewardinfo | 환승리워드 안내 > 서비스 메인 | /transfer-reward/transfer-guide |   
| tmoneytia://transportation_card/register/main | 교통카드 등록/변경 메인 | /regist-traffic-card/regist-traffic-card-main |   
| tmoneytia://payment/plcc | 결제수단관리 | /payment/payment-manage |   
| tmoneytia://referral | 친구초대 | /invite/friend |   

# openview 브릿치 처리 정의
## case1. native -> spa가 된 화면. ex. tmoneytia://viewmore/main
- spa: openview로 전달
- native: moveWebView 브릿지로 spa 웹뷰에 전달. ex. tmoneytia://viewmore/main -> /main/more-main
- > native, spa 모두 맵핑.    
    출발지가 spa인 경우, spa에서 맵핑된 spa화면으로 이동. 맵핑 안된것은 openView 브릿지 type=deeplink 로 호출   
    출발지가 native인경우, native에서 맵핑된 spa화면은 moveWebView 브릿지의 url에 딥링크 그대로 전달. spa에서 맵핑이 안되어 있는 deeplink면 오류페이지 이동.    
    
## case2. webview -> spa가 된 화면. ex. /webview/app/v2/TGOWebView.do
방안1. 무조건 native로 전달.
spa: openview로 전달
native: moveWebView 브릿지로 spa 웹뷰에 전달. ex. /webview/app/v2/TGOWebView.do -> /event/event-detail

방안2. spa에서 처리
spa가 시작점이면 맵핑된것은 spa에서 처리. native가 시작점이면 moveWebView 으로 호출 후, spa에서 맵핑안된것은 openView 브릿지로 처리
native: moveWebView 브릿지로 spa 웹뷰에 전달. ex. /webview/app/v2/TGOWebView.do -> /event/event-detail
- > 김경욱/곽현준 매니져님 확인 중    
<br>

# 웹뷰 처리 정의
- native -> spa 화면 웹뷰 처리. 뒤로가기했을떄, native 화면 노출업무. ex. 이용내역, 푸시
- > native에서 메인3종, 기타1 웹뷰를 가짐.    
기타 웹뷰는 이용내역, 푸시 와 같이 spa를 호출해야하는 화면을 moveWebView 로 화면을 보여줌.    
spa에서는 moveWebView으로 열린 화면은 해당 화면을 첫화면으로 처리하고 첫화면까지 뒤로가기 했을때, closeView 브릿지를 호출한다.    
closeView브릿지는 해당 웹뷰를 내린다.   

## openView 브릿지 필요 화면
| 업무명                              | viewType | url | 완료여부    |
|----------------------------------|----------|---------------------|---------| 
| 메인 > 혜택 > GO마일리지 무료적립 하러가기       | deeplink | tmoneytia://mileage/center | O |
| 메인 > 더보기 > 챗봇                    | ex | https://pf.kakao.com/_zuLxexl/chat | O |
| 이용내역 > 버스 상세                     | native   |history/bus/detail|      |
| 이용내역 > 택시 상세                     | native   |history/taxi/detail|      |
| 이용내역 > 택시 이용내역 <br>> 택시 평가하기 팝업  | native   |history/taxi/evaluation    |      |
| 이용내역 > 공공자전거 상세                  | native   |history/bike/detail|      |
| 이용내역 > 자전거/킥보드 상세                | native   |  history/kickboard/detail:    |      |
| 이용내역 > 항공 상세                     | native   |history/airplane/detail|      |
| 이용내역 > 기차 상세                     | native   |history/train/detail|      |
| 이용내역 > 렌트카 상세                    | native   |history/rentcar/detail|      |
| 결제내역 > 공공자전거 상세 > 환불신청           | native   |  payment/bike/refund   |      |
| 약관 > 고속,시외 회원가입                  | in       |     |      |
| 약관 > 온다 회원가입                     | in       |     |      |
| 이벤트 상세                           | deeplink, ex |  | |
| 이벤트 상세 > 약관                      | in |  | |
| 교통카드 등록 > 약관                     | in |  | |
| 고객지원 > 고속•시외 안내                  | native | customer/terminal | |
| 고객지원 > 고속•시외 운수회사 안내             | native | customer/transportation | |
| 고객지원 > 고속•시외 유실물센터 안내            | native | customer/lostCenter | |
| 회원정보 > 따릉이 가입하기                  | native | member/joinBike | |
| 설정 > 오픈소스 라이선스 > 티머니GO 오픈소스 라이선스 | native | license/tmoneygo | |
| 설정 > 오픈소스 라이선스 > 네이버맵 법적공지/정보제공처 | native | license/navermapLegal | |
| 설정 > 오픈소스 라이선스 > 네이버맵 오픈소스 라이선스  | native | license/navermap | |
| 이용약관 > 약관 동의 후                   | deeplink | | |
| 이용약관 > 약관 상세                     | in | | |
| 결제수단관리 > 모바일티머니란?                | ex | 'https://pay.tmoney.co.kr/<br>ncs/pct/tpay/ReadTmnyPay.dev' | O |
| 결제수단관리 > 모바일티머니 등록하기             | in | 'https://tiaapid.tmoney.co.kr:20318/<br>webview/tmpy/reqAuth.do' |  |
| 결제수단관리 > 티머니앱 이동                 | app | 'com.lgt.tmoney'/'tmoneypay' |  |
| 결제수단관리 > 티머니앱 이동                 | app | 'com.lgt.tmoney'/'"tmoneypay"' |  |
| 결제수단관리 > 네이버페이 간편등록              | in | | |
| 결제수단관리 > 토스페이 간편등록               | in | | |
| 결제완료 > 고속버스 연계                   | deeplink |'tmoneytia://bus/schedule?<br/>startID=${result.value.deprTrmlCd}&<br/>endID=${result.value.arvlTrmlCd}'| |
| 약관동의 화면 > 회원정보 확인 화면               | native | 전달필요 | |

