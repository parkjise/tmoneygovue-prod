/**
 * @description: 회원 정보 조회 요청
 */
export interface reqMemberInfoModel {
  inqrtDtm: string; // 조회일시
}

/**
 * @description: 회원 정보 조회 응답
 */
export interface resMemberInfoModel {
  mbrsNm: string; // 회원명
  mbrsClsVal: string; //회원등급값
  mbrsClsNm: string; //회원등급명
  mbrsMbphNo: string; //회원전화번호
  rgtTrcrCnt: string; //등록된카드수 -티머니 0개|신용/채크 0개
  mbrsBnkCd: string; //회원은행코드
  mbrsBnkNm: string; //회원은행명
  rfndAcntNo: string; //환급계좌번호(*** + 뒷 4자리)
  trtdTgtYn: string; //환승할일대사여부(Y/N)
  drvLcnsRgtYn: string; //운전면허등록여부(Y/N)
  bcclMbrsId: string; //자전거회원 ID
  prntMbphNo: string; //부모전화번호
  email: string; //이메일
  weight: string; //몸무게 -> 미기재시, 65kg으로 기재
  chldBcclYn: string; //메시지
}

/**
 * @description: 회원 가입 요청
 */
export interface reqSignUpModel {
  moappMbrsSno : string; //모바일앱회원일련번호   
  prsnAuthSno : string; //본인인증일련번호
  joinYn : string; //가입여부
  mailAddr? : string; //이메일주소 
  mailRcvYn? : string; //이메일수신여부(Y/N) 
  pushRcvYn : string; //PUSH수신여부(Y/N) 
  mrkgRcvYn : string; //마케팅수신여부(Y/N) 
  smsRcvYn : string; //SMS수신여부(Y/N) 
  stplAllList : Array<ReqSignTermsAgree>;  //약관리스트
  mblOsKndCd : string; //모바일OS종류코드
  mbphOsVer : string; //휴대폰OS버전
  mbphHwId : string; //휴대폰식별ID
  moappVer : string; //모바일앱버전
  tGo1Yn : string; //티머니GO1.0회원여부(Y/N)
  frndInvnSno? : string; //친구초대일련번호
  prntAuthSno? : string; // 부모인증 후, 리턴되는 authSno 값을 사용
}

/**
 * @description 회원 가입 약관
 */
export interface ReqSignTermsAgree {
  utlzSvcDvsCd: string;
  stplList: reqStplAgreeInfo[];
}

/**
 * @description 약관 동의 리스트
 */
export interface reqStplAgreeInfo {
  stplSno: string; //약관일련번호
  agrmYn: string; //약관동의여부(Y/N)
}

/**
 * @description: 회원 탈퇴 요청
 */
export interface reqMemberWithdrawModel {
  lnkgSvcList: Array<serviceCodelModel>; //연동서비스리스트
}

/**
 * @description: 연동서비스코드
 */
export interface serviceCodelModel {
  lnkgSvcCd: string;
}

/**
 * @description: 회원 가입 응답
 */
export interface resSignUpModel {
  scsYn: string; //성공여부(Y/N)
  authTkn?: string; //인증토근
  frndInvnScsYn?: string; //친구초대 성공여부(Y/N)
  msg?: string; //메시지
}


/**
 * @description: 회원 탈퇴 응답
 */
export interface resMemberWithdrawModel {
  scsYn: string; //성공여부(Y/N)
  scsnStatCd?: string; //탈퇴상태코드
  scsnErrSvc?: string;
  msg?: string; //메시지
}

/**
 * @description: 회원 연동 서비스 조회 요청
 */
export interface reqLinkedServiceCodeListModel {
  inqrDtm: string; //조회일시
}

/**
 * @description: 연동서비스코드
 */
export interface linkedServiceCodeModel {
  lnkgSvcCd: string; // 연결서비스
  stplModYn: string; // 약관변경 여부
  lnkgYn: string; // 연동여부
}

/**
 * @description: 회원 연동 서비스 조회 응답
 */
export interface resLinkedServiceCodeListModel {
  lnkgSvcList: Array<linkedServiceCodeModel>; //연동서비스리스트
  msg: string; //메시지
}

/**
 * @description: 블랙리스트여부죄회 요청
 */
export interface reqBlackListYnModel {
  moappMbrsSno: string; //모바일앱회원일련번호
}

/**
 * @description: 블랙리스트여부죄회 응답
 */
export interface resBlackListYnModel {
  blYn: string; //블랙리스트여부
  msg: string; //메시지
}

/**
 * @description: 회원 APP 로그아웃 요청
 */
export interface reqLogoutModel {
  reqDtm: string; //요청일시(YYYYMMDDHHSS)
}

/**
 * @description: 회원 APP 로그아웃 응답
 */
export interface resLogoutModel {
  scsYn: string; //성공여부(Y/N)
  msg: string; //메시지
}

/**
 * @description: PM 회원 연동 해제 처리 요청
 */
export interface reqLogoutDdareongMemberModel {
  utlzSvcDvsCd: string; //이용서비스구분코드
}

/**
 * @description: PM 회원 연동 해제 처리 요청 응답
 */
export interface resLogoutDdareongMemberYnModel {
  data: logoutDdareongMemberYnModel;
}

export interface logoutDdareongMemberYnModel {
  lnkgClrYn: string; //연동해제여부
  lnkgRsn: string; //연동불가사유
}

/**
 * @description: 따릉이 이메일 변경 요청
 */
export interface reqDdareongMemberInfoChangeEmailModel {
  entrDvsCd: string; //업체구분코드(따릉이:T)
  prsMail: string; //현재이메일
  modMail: string; //변경이메일
}

/**
 * @description: 따릉이 비밀번호 변경 요청
 */
export interface reqDdareongMemberInfoChangePWModel {
  entrDvsCd: string; //업체구분코드(따릉이:T)
  id: string; //ID
  mbphNo: string; //휴대폰번호(-없이)
  prsPwd: string; //현재비밀번호
  modPwd: string; //변경비밀번호
}

/**
 * @description: 따릉이 회원 몸무게 변경 요청
 */
export interface reqDdareongMemberInfoChangeWeightModel {
  weight: string; //몸무게
}

/**
 * @description: 따릉이 회원 정보 변경 응답(이메일/비밀번호/몸무게)
 */
export interface resDdareongMemberInfoChangeModel {
  scsYn: string; //성공여부(Y/N)
  msg?: string; //메시지
}

/**
 * @description: 부모 전화번호 변경 요청
 */
export interface reqChangeParentPhoneNumberModel {
  prntAuthSno: string; //부모인증일련번호
}

/**
 * @description: 부모 전화번호 변경 응답
 */
export interface resChangeParentPhoneNumberModel {
  scsYn: string; //성공여부(Y/N)
  msg?: string; //메시지
}


/**
 * @description: 푸시토큰 업데이트 요청
 */
export interface reqUpdatePushToken {
  pushTkn: string; //Push 토큰
  pushSvcDvsCd: string; //푸시서비스구분코드 1:FCM, 2:APNS
}

/**
 * @description: 푸시토큰 업데이트 응답
 */
export interface resUpdatePushToken {
  scsYn: string; //성공여부(Y/N/F) F:센터오류
  rspCd: string; //푸시서버 응답코드 (0000 : 성공)
  rspMsg: string; //푸시서버 응답메세지 
  msg?: string; //응답 메시지(티머니고 서버 메세지)
}



/**
 * @description: 토스 회원본인인증 요청 응답값
 */
export interface resTossAuthModel {
  rspCd: string; // 응답코드
  rspMsg: string; // 응답메세지
  data: tossAuthInfo; 
}

export interface tossAuthInfo {
  txId: string; //인증 요청 트랜잭션 아이디로 거래를 고유할 수 있는 값
  appScheme?: string; //토스 인증 화면을 띄울 수 있는 앱 스킴 정보
  androidAppUri?: string; //안드로이드 인증 앱 스킴 값
  iosAppUri?: string; //iOS 인증 앱 스킴 값
  authUrl?: string; //토스 표준창을 호출할 수 있는 URL
}


/**
 * @description: 토스 회원본인인증 확인 요청값
 */
export interface reqTossAuthResultModel {
  txId: string; //인증 요청 트랜잭션 아이디로 거래를 고유할 수 있는 값
}

/**
 * @description: 토스 회원본인인증 확인 응답값
 */
export interface resTossAuthResultModel {
  rspCd: string; // 응답코드
  rspMsg: string; // 응답메세지
  data: tossAuthResultInfo;
}

export interface tossAuthResultInfo {
  authTkn?: string;
  prsnAuthScsYn?: string;
  joinYn?: string;
  prsnAuthSno?: string;
  userNm?: string;
  userBrdt?: string;
  mbphNo?: string;
  prsnAuthRstMsg?: string;
  tGo1Yn?: string;
  drmbYn?: string;
  ageDvsCd?: string;
  frndInvnTgtYn?: string;
  moappMbrsSno?: string;
  gndrCd?: string;
}

/**
 * @description 토스등록요청정보
 */
export interface reqTossLoginModel {
  triggerType: string; //APP_SCHEME 고정
  userName: string; 
  userPhone: string; 
  userBirthday: string;
}
