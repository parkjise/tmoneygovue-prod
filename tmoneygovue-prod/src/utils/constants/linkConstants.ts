// 딥링크 enum. 딥링크를 맵핑하기 위한 enum
enum DeepLinkEnum {
  TMONEYTIA_MAIN_MY = 'tmoneytia://my', // MY메인
  TMONEYTIA_MAIN_MORE = 'tmoneytia://viewmore/main', // 더보기메인
  TMONEYTIA_SETTING_APPSETTING = 'tmoneytia://viewmore/settings', // 앱설정
  TMONEYTIA_ANNOUNCEMENT_LIST = 'tmoneytia://announcement/list', // 알림내역
  TMONEYTIA_PUSH_HISTORY = 'tmoneytia://push/history', // 푸시내역
  TMONEYTIA_EVENT_LIST = 'tmoneytia://event/list', // 이벤트목록
  TMONEYTIA_EVENT_DETAIL = 'tmoneytia://event/detail', // 이벤트상세
  TMONEYTIA_COUPON_LIST = 'tmoneytia://coupon/list', // 쿠폰목록
  TMONEYTIA_COUPON_REGISTE = 'tmoneytia://coupon/register', // 쿠폰등록
  TMONEYTIA_COUPON_BUS = 'tmoneytia://coupon/bus', // 고속/시외 쿠폰목록
  TMONEYTIA_COUPON_TAXI = 'tmoneytia://coupon/taxi', // 택시 쿠폰목록
  TMONEYTIA_COUPON_BIKE = 'tmoneytia://coupon/bike', // 자전거 쿠폰목록
  TMONEYTIA_COUPON_KICKBOARD = 'tmoneytia://coupon/kickboard', // 킥보드 쿠폰목록
  TMONEYTIA_COUPON_RENTERCAR = 'tmoneytia://coupon/rentercar', // 렌트카 쿠폰목록
  TMONEYTIA_TRAFIC_CARD_REGIST = 'tmoneytia://transportation_card/register/main', // 교통카드등록
  TMONEYTIA_MILEAGE_HISTORY = 'tmoneytia://mileage/history', // GO마일리지 내역
  TMONEYTIA_MILEAGE_TRANSFER = 'tmoneytia://mileage/transfer', // GO마일리지 전환
  TMONEYTIA_MANUAL_BUS = 'tmoneytia://manual/bus', // 이용가이드 버스
  TMONEYTIA_MANUAL_TAXI = 'tmoneytia://manual/taxi', // 이용가이드 택시
  TMONEYTIA_MANUAL_BIKE = 'tmoneytia://manual/bike', // 이용가이드 자전거
  TMONEYTIA_MANUAL_FAVORITE = 'tmoneytia://manual/favorite', // 이용가이드 즐겨찾기
  TMONEYTIA_MANUAL_MILEAGE = 'tmoneytia://manual/mileage', // 이용가이드 마일리지
  TMONEYTIA_MANUAL_PAYMENT = 'tmoneytia://manual/payment', // 이용가이드 결제
  TMONEYTIA_USAGEHISTORY_HISTORY = 'tmoneytia://history/public', // 이용내역 목록(대중교통)
  TMONEYTIA_USAGEHISTORY_BUS = 'tmoneytia://history/bus', // 버스 이용내역 목록
  TMONEYTIA_USAGEHISTORY_TAXI = 'tmoneytia://history/taxi', // 택시 이용내역 목록
  TMONEYTIA_USAGEHISTORY_BIKE = 'tmoneytia://history/bike', // 자전거 이용내역 목록
  TMONEYTIA_USAGEHISTORY_KICKBOARD = 'tmoneytia://history/kickboard', // 킥보드 이용내역 목록
  TMONEYTIA_USAGEHISTORY_TRAIN = 'tmoneytia://history/train', // 기차 이용내역 목록
  TMONEYTIA_USAGEHISTORY_AIRPLANE = 'tmoneytia://history/airplane', // 항공 이용내역 목록
  TMONEYTIA_USAGEHISTORY_CAR_RENT = 'tmoneytia://history/car_rent', // 렌터카 이용내역 목록
  TMONEYTIA_PAYMENTHISTORY_ALL = 'tmoneytia://transactions', // 결제내역 전체
  TMONEYTIA_PAYMENTHISTORY_BUS = 'tmoneytia://transactions/bus', // 결제내역 버스
  TMONEYTIA_PAYMENTHISTORY_TAXI = 'tmoneytia://transactions/taxi', // 결제내역 택시
  TMONEYTIA_PAYMENTHISTORY_BIKE = 'tmoneytia://transactions/bike', // 결제내역 자전거
  TMONEYTIA_PAYMENTHISTORY_KICKBOARD = 'tmoneytia://transactions/kickboard', // 결제내역 킥보드
  TMONEYTIA_PAYMENTHISTORY_AIRPLANE = 'tmoneytia://transactions/airplane', // 결제내역 비행기
  TMONEYTIA_PAYMENTHISTORY_TRAIN = 'tmoneytia://transactions/train', // 결제내역 기차
  TMONEYTIA_PAYMENTHISTORY_RENTERCAR = 'tmoneytia://transactions/rentercar', // 결제내역 렌터카
  TMONEYTIA_TRAVEL_MAIN = 'tmoneytia://travel/main', // 여행 메인
  TMONEYTIA_TRAVEL_SEARCH = 'tmoneytia://travel/search', // 여행 검색
  TMONEYTIA_TRAVEL_PRODUCT = 'tmoneytia://travel/product', // 여행 상품 검색 결과 목록
  TMONEYTIA_TRAVEL_PRODUCT_DETAIL = 'tmoneytia://travel/product/detail', // 여행 상품 상세
  TMONEYTIA_TRAVEL_EXHIBITION = 'tmoneytia://travel/exhibition', // 여행 전시
  TMONEYTIA_TRAVEL_EXHIBITION_DETAIL = 'tmoneytia://travel/exhibition/detail', // 여행 전시 상세
  TMONEYTIA_TRANSFER_REWARD_HISTORY = 'tmoneytia://reward/history', // 환승리워드내역
  TMONEYTIA_TRANSFER_REWARD_GUIDE = 'tmoneytia://rewardinfo', // 환승리워드안내
  TMONEYTIA_PAYMENT_MANAGE = 'tmoneytia://mywallet/tmoneypay', // 결제수단관리
  TMONEYTIA_PAYMENT_PLCC = 'tmoneytia://payment/plcc',
  TMONEYTIA_INVITE_FRIEND = 'tmoneytia://referral' // 친구초대
}

// 딥링크 to spa enum. 딥링크를 spa로 맵핑하기 위한 enum
enum DeepLinkToSPAEnum {
  SPA_MAIN_MY = '/main/my-main', // MY메인
  SPA_MAIN_MORE = '/main/more-main', // 더보기메인
  SPA_SETTING_APPSETTING = '/app-setting/setting', // 앱설정
  SPA_ANNOUNCEMENT_LIST = '/notice/notice-list', // 알림내역
  SPA_PUSH_HISTORY = '/notification/notification-list', // 푸시내역
  SPA_EVENT_LIST = '/event/event-list', // 이벤트목록
  SPA_EVENT_DETAIL = '/event/event-detail', // 이벤트상세
  SPA_COUPON_LIST = '/coupon/coupon-list', // 쿠폰목록
  SPA_COUPON_REGISTE = '/coupon/coupon-list', // 쿠폰등록
  SPA_COUPON_BUS = '/coupon/coupon-list?category=bus', // 고속/시외 쿠폰목록
  SPA_COUPON_TAXI = '/coupon/coupon-list?category=taxi', // 택시 쿠폰목록
  SPA_COUPON_BIKE = '/coupon/coupon-list?category=bike', // 자전거 쿠폰목록
  SPA_COUPON_KICKBOARD = '/coupon/coupon-list?category=kickboard', // 킥보드 쿠폰목록
  SPA_COUPON_RENTERCAR = '/coupon/coupon-list?category=rentercar', // 렌트카 쿠폰목록
  SPA_TRAFIC_CARD_REGIST = '/regist-traffic-card/regist-traffic-card-main', // 교통카드등록
  SPA_MILEAGE_HISTORY = '/mileage/mileage-history', // GO마일리지 내역
  SPA_MILEAGE_TRANSFER = '/mileage/mileage-exchange-main', // GO마일리지 전환
  SPA_MANUAL_BUS = '/customer-support/user-guide?category=bus', // 이용가이드 버스
  SPA_MANUAL_TAXI = '/customer-support/user-guide?category=taxi', // 이용가이드 택시
  SPA_MANUAL_BIKE = '/customer-support/user-guide?category=bike', // 이용가이드 자전거
  SPA_MANUAL_FAVORITE = '/customer-support/user-guide?category=favorite', // 이용가이드 즐겨찾기
  SPA_MANUAL_MILEAGE = '/customer-support/user-guide?category=mileage', // 이용가이드 마일리지
  SPA_MANUAL_PAYMENT = '/customer-support/user-guide?category=payment', // 이용가이드 결제
  SPA_USAGEHISTORY_HISTORY = '/usage-history/list', // 이용내역 목록
  SPA_USAGEHISTORY_BUS = '/usage-history/list?category=bus', // 버스 이용내역 목록
  SPA_USAGEHISTORY_TAXI = '/usage-history/list?category=taxi', // 택시 이용내역 목록
  SPA_USAGEHISTORY_BIKE = '/usage-history/list?category=bike', // 자전거 이용내역 목록
  SPA_USAGEHISTORY_KICKBOARD = '/usage-history/list?category=kickboard', // 킥보드 이용내역 목록
  SPA_USAGEHISTORY_TRAIN = '/usage-history/list?category=train', // 기차 이용내역 목록
  SPA_USAGEHISTORY_AIRPLANE = '/usage-history/list?category=airplane', // 항공 이용내역 목록
  SPA_USAGEHISTORY_CAR_RENT = '/usage-history/list?category=rentercar', // 렌터카 이용내역 목록
  SPA_PAYMENTHISTORY_ALL = '/payment/payment-history', // 결제내역 전체
  SPA_PAYMENTHISTORY_BUS = '/payment/payment-history?category=bus', // 결제내역 버스
  SPA_PAYMENTHISTORY_TAXI = '/payment/payment-history?category=taxi', // 결제내역 택시
  SPA_PAYMENTHISTORY_BIKE = '/payment/payment-history?category=bike', // 결제내역 자전거
  SPA_PAYMENTHISTORY_KICKBOARD = '/payment/payment-history?category=kickboard', // 결제내역 킥보드
  SPA_PAYMENTHISTORY_AIRPLANE = '/payment/payment-history?category=airplane', // 결제내역 비행기
  SPA_PAYMENTHISTORY_TRAIN = '/payment/payment-history?category=train', // 결제내역 기차
  SPA_PAYMENTHISTORY_RENTERCAR = '/payment/payment-history?category=rentercar', // 결제내역 렌터카
  SPA_TRAVEL_MAIN = '/travel/main', // 여행 메인
  SPA_TRAVEL_SEARCH = '/travel/search', // 여행 검색
  SPA_TRAVEL_PRODUCT = '/travel/product', // 여행 상품 검색 결과 목록
  SPA_TRAVEL_PRODUCT_DETAIL = '/travel/product/detail', // 여행 상품 상세
  SPA_TRAVEL_EXHIBITION = '/travel/exhibition', // 여행 전시
  SPA_TRAVEL_EXHIBITION_DETAIL = '/travel/exhibition/detail', // 여행 전시 상세
  SPA_TRANSFER_REWARD_HISTORY = '/transfer-reward/transfer-history', // 환승리워드내역
  SPA_TRANSFER_REWARD_GUIDE = '/transfer-reward/transfer-guide', // 환승리워드안내
  SPA_PAYMENT_MANAGE = '/payment/payment-manage', // 결제수단관리
  SPA_PAYMENT_PLCC = '/payment/payment-manage', // PLCC결제수단관리
  SPA_INVITE_FRIEND = '/invite/friend' // 친구초대
}

// 딥링크 to spa map. 딥링크를 spa로 맵핑하기 위한 map
export const DeepLinkToSpaMap = new Map<string, string>([
  [DeepLinkEnum.TMONEYTIA_MAIN_MY, DeepLinkToSPAEnum.SPA_MAIN_MY],
  [DeepLinkEnum.TMONEYTIA_MAIN_MORE, DeepLinkToSPAEnum.SPA_MAIN_MORE],
  [DeepLinkEnum.TMONEYTIA_SETTING_APPSETTING, DeepLinkToSPAEnum.SPA_SETTING_APPSETTING],
  [DeepLinkEnum.TMONEYTIA_ANNOUNCEMENT_LIST, DeepLinkToSPAEnum.SPA_ANNOUNCEMENT_LIST],
  [DeepLinkEnum.TMONEYTIA_PUSH_HISTORY, DeepLinkToSPAEnum.SPA_PUSH_HISTORY],
  [DeepLinkEnum.TMONEYTIA_EVENT_LIST, DeepLinkToSPAEnum.SPA_EVENT_LIST],
  [DeepLinkEnum.TMONEYTIA_EVENT_DETAIL, DeepLinkToSPAEnum.SPA_EVENT_DETAIL],
  [DeepLinkEnum.TMONEYTIA_COUPON_LIST, DeepLinkToSPAEnum.SPA_COUPON_LIST],
  [DeepLinkEnum.TMONEYTIA_COUPON_REGISTE, DeepLinkToSPAEnum.SPA_COUPON_REGISTE],
  [DeepLinkEnum.TMONEYTIA_COUPON_BUS, DeepLinkToSPAEnum.SPA_COUPON_BUS],
  [DeepLinkEnum.TMONEYTIA_COUPON_TAXI, DeepLinkToSPAEnum.SPA_COUPON_TAXI],
  [DeepLinkEnum.TMONEYTIA_COUPON_BIKE, DeepLinkToSPAEnum.SPA_COUPON_BIKE],
  [DeepLinkEnum.TMONEYTIA_COUPON_KICKBOARD, DeepLinkToSPAEnum.SPA_COUPON_KICKBOARD],
  [DeepLinkEnum.TMONEYTIA_COUPON_RENTERCAR, DeepLinkToSPAEnum.SPA_COUPON_RENTERCAR],
  [DeepLinkEnum.TMONEYTIA_TRAFIC_CARD_REGIST, DeepLinkToSPAEnum.SPA_TRAFIC_CARD_REGIST],
  [DeepLinkEnum.TMONEYTIA_MILEAGE_HISTORY, DeepLinkToSPAEnum.SPA_MILEAGE_HISTORY],
  [DeepLinkEnum.TMONEYTIA_MILEAGE_TRANSFER, DeepLinkToSPAEnum.SPA_MILEAGE_TRANSFER],
  [DeepLinkEnum.TMONEYTIA_MANUAL_BUS, DeepLinkToSPAEnum.SPA_MANUAL_BUS],
  [DeepLinkEnum.TMONEYTIA_MANUAL_TAXI, DeepLinkToSPAEnum.SPA_MANUAL_TAXI],
  [DeepLinkEnum.TMONEYTIA_MANUAL_BIKE, DeepLinkToSPAEnum.SPA_MANUAL_BIKE],
  [DeepLinkEnum.TMONEYTIA_MANUAL_FAVORITE, DeepLinkToSPAEnum.SPA_MANUAL_FAVORITE],
  [DeepLinkEnum.TMONEYTIA_MANUAL_MILEAGE, DeepLinkToSPAEnum.SPA_MANUAL_MILEAGE],
  [DeepLinkEnum.TMONEYTIA_MANUAL_PAYMENT, DeepLinkToSPAEnum.SPA_MANUAL_PAYMENT],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_HISTORY, DeepLinkToSPAEnum.SPA_USAGEHISTORY_HISTORY],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_BUS, DeepLinkToSPAEnum.SPA_USAGEHISTORY_BUS],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_TAXI, DeepLinkToSPAEnum.SPA_USAGEHISTORY_TAXI],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_BIKE, DeepLinkToSPAEnum.SPA_USAGEHISTORY_BIKE],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_KICKBOARD, DeepLinkToSPAEnum.SPA_USAGEHISTORY_KICKBOARD],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_TRAIN, DeepLinkToSPAEnum.SPA_USAGEHISTORY_TRAIN],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_AIRPLANE, DeepLinkToSPAEnum.SPA_USAGEHISTORY_AIRPLANE],
  [DeepLinkEnum.TMONEYTIA_USAGEHISTORY_CAR_RENT, DeepLinkToSPAEnum.SPA_USAGEHISTORY_CAR_RENT],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_ALL, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_ALL],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_BUS, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_BUS],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_TAXI, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_TAXI],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_BIKE, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_BIKE],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_KICKBOARD, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_KICKBOARD],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_AIRPLANE, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_AIRPLANE],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_TRAIN, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_TRAIN],
  [DeepLinkEnum.TMONEYTIA_PAYMENTHISTORY_RENTERCAR, DeepLinkToSPAEnum.SPA_PAYMENTHISTORY_RENTERCAR],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_MAIN, DeepLinkToSPAEnum.SPA_TRAVEL_MAIN],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_SEARCH, DeepLinkToSPAEnum.SPA_TRAVEL_SEARCH],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_PRODUCT, DeepLinkToSPAEnum.SPA_TRAVEL_PRODUCT],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_PRODUCT_DETAIL, DeepLinkToSPAEnum.SPA_TRAVEL_PRODUCT_DETAIL],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_EXHIBITION, DeepLinkToSPAEnum.SPA_TRAVEL_EXHIBITION],
  [DeepLinkEnum.TMONEYTIA_TRAVEL_EXHIBITION_DETAIL, DeepLinkToSPAEnum.SPA_TRAVEL_EXHIBITION_DETAIL],
  [DeepLinkEnum.TMONEYTIA_TRANSFER_REWARD_HISTORY, DeepLinkToSPAEnum.SPA_TRANSFER_REWARD_HISTORY],
  [DeepLinkEnum.TMONEYTIA_TRANSFER_REWARD_GUIDE, DeepLinkToSPAEnum.SPA_TRANSFER_REWARD_GUIDE],
  [DeepLinkEnum.TMONEYTIA_PAYMENT_MANAGE, DeepLinkToSPAEnum.SPA_PAYMENT_MANAGE],
  [DeepLinkEnum.TMONEYTIA_PAYMENT_PLCC, DeepLinkToSPAEnum.SPA_PAYMENT_PLCC],
  [DeepLinkEnum.TMONEYTIA_INVITE_FRIEND, DeepLinkToSPAEnum.SPA_INVITE_FRIEND]
]);

// webview enum. 웹뷰를 spa로 맵핑하기 위한 enum
enum WebLinkEnum {
  WEB_EVENT_DETAIL = '/webview/app/v2/TGOWebView.do' // 이벤트 상세
}

// webview to spa enum. 웹뷰를 spa로 맵핑하기 위한 enum
enum WebLinkToSPAEnum {
  SPA_EVENT_DETAIL = '/event/event-detail' // 이벤트 상세
}

// webview to spa map. 웹뷰를 spa로 맵핑하기 위한 map
export const WebLinkToWebMap = new Map<string, string>([
  [WebLinkEnum.WEB_EVENT_DETAIL, WebLinkToSPAEnum.SPA_EVENT_DETAIL]
]);

// // openView 웹뷰 링크 enum. openView 웹뷰 링크를 헤더와 맵핑하기 위한 enum
// enum OpenViewWebLinkEnum {
//   WEB_EVENT_DETAIL = '/webview/mui/v2/inqrMyBadgeInfo.do' // 이벤트 상세
// }

// // openView 웹뷰 링크 헤더 enum. openView 웹뷰 링크를 헤더와 맵핑하기 위한 enum
// enum OpenViewWebLinkHeaderEnum {
//   SPA_EVENT_DETAIL = '/event/event-detail' // 이벤트 상세
// }

// // openView 웹뷰 링크 헤더 map. openView 웹뷰 링크를 헤더와 맵핑하기 위한 map
// export const WebLinkHeaderMap = new Map<string, string>([
//   [WebLinkEnum.WEB_EVENT_DETAIL, WebLinkToSPAEnum.SPA_EVENT_DETAIL]
// ]);
