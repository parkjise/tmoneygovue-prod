/**
 * @description: New - 2.27 IO-MID2-O-0126 – 등록된 교통카드번호 조회
 */
export interface RequestRegisteredCardInfoList {
  trcrDvsCd: string; // 카드구분코드 (0:전체(선물+후불), 1:선불, 2:후불)
}
export interface RefundCardInfoModel {
  crpcId: string; // 카드발행사ID
  trcrSno: string; // 교통카드 일련번호
  crcmCd: string; // 카드사 코드
  crcmNm: string; // 카드사명
  trcrNo: string; // 교통카드 번호(*** + 4자리)
  crcmCiUrl: string; // 카드사 CI URL
}
export interface ResponseRegisteredTrCardList {
  trcrNoList: Array<RefundCardInfoModel>;
}

/**
 * @description: 회원 상태 조회
 */
export interface RequestMemberStat {
  inqrDtm: string; // 요청일시
  moappMbrsSno: string; // 모바일앱회원일련번호
}
export interface ResponseMemberStat {
  msg: string;
  drmbYn: string; // 휴먼회원여부(Y/N)
  prsnAuthFnYn: string; // 본인인증완료여부(Y/N)
  trcrRgtYn: string; // 교통카드등록여부(Y/N)
  drvLcnsRgtYn: string; // 운전면허등록여부(Y/N)
  joinYn: string; // 가입여부(Y/N)
  mlgRfndTgtYn: string; // 마일리지환급대상여부(Y/N)
  gndrCd: string; // 성별코드(M:남성, F여성)
  dcDvsCd: string; // 할인구분코드(0:미등록, 1:이체, 2:T마일리지적립)
  dcDvsNm: string; // 할인구분명
  trtdTgtYn: string; // 환승할인대상여부(Y/N)
  tmpyRgtYn: string; // 티머니페이등록여부(Y/N)
  rfndAcntRgtYn: string; // 환급계좌연동여부(Y/N)
}

// export interface ResponseMemberStat<T = unknown> {
//   data: {
//     rstCd: string;
//     dta: T;
//     errMsg: string;
//   };
// }
/**
 * @description: 티머니 교통카드 등록/변경 유의사항
 */
export interface ResponseNotesInfo {
  rspCd: string;
  rspTtl: string;
  rspMsg: string;
  data: { unslMttr: string }; // 유의사항
}

/**
 * @description: 티머니 -> 교통카드 불러오기 버튼
 */
export interface ResponseTmoneyPayCardNo {
  tmpyRgtCnt: string; // 티머니페이등록된교통카드갯수
  tmpyRgtYn: string; // 티머니페이 연동여부 (Y/N)
}

/**
 * @description: 교통카드 불러오기 버튼으로 가져온 티머니카드 등록
 */
export interface ResponseRegisterTmoneyPayCardNo {
  msg: string;
  rgtYn: string; // 등록성공여부(Y/N)
}

/**
 * @description: 티머니 교통카드 등록 버튼
 */
export interface ResquestRegisterCardNo {
  trcrDvsCd: string; // 교통카드구분코드(1:선불 / 2:후불) -> 1
  crcmCd?: string; // 카드사코드 -> null
  trcrNo1: string; // 교통카드번호 1(-)제외
  trcrNo2: string; // 교통카드번호 2(-)제외
  trcrNo3: string; // 교통카드번호 3(-)제외
  trcrNo4: string; // 교통카드번호 4(-)제외
  encType?: string;  // 암호화 타입(교통카드 등록 : STK, 카드간편결제등록: 'MTK')
  encToken?: string; // 암호화토큰
  reqEncYn: string; // 암호화요청여부(Y/N) -> Y
  encHmac?: string; // 암호화검증값
}

export interface ResponseRegisterCardNo {
  scsYn: string; // 등록성공여부(Y/N)
  encScsYn: string; // 암호화 등록 여부
  encDtm: string; // 암호화일시
  msg: string;
}

/**
 * @description: 신용카드 등록/변경 유의사항
 */
export interface bannerInfo {
  bnrImgPathVal: string;
  webViewTtl?: string; // 안들어오는경우 있음
  authTknNedYn?: string; // 안들어오는경우 있음
  bnrUrlVal: string;
  bnrSrsq: number;
  concScrnDvsCd?: string;
  bnrTtlNm: string;
  mbltTypCd: string;
  bnrNo: string;
}
export interface stplInfo {
  stplSno: string;
  stplTtlNm: string;
  stplMndtYn: string;
  stplAgrmYn: string;
  stplUrl: string;
  extlUrl: string;
  stplCheck?: boolean;
}
export interface ResponseCreditNotesInfo {
  rspCd: string;
  rspTtl: string;
  rspMsg: string;
  data: resData;
}
export interface resData {
  rollingBnrList: Array<bannerInfo>; // 배너목록
  stplList: Array<stplInfo>; // 약관목록
  unslMttr: string; // 유의사항
}

/**
 * @description: 신용(체크)카드 검증
 */
export interface ResponseCardBinInfo {
  issurCd: string; // 발급사코드
  cardName: string; // 카드명
  cardImgPath: string; // 카드이미지경로
  path2: string; // 카드이미지경로2
  crpcId: string; // 카드발행사ID
  checkCardYN: string; // 체크카드여부
  cprtCardYN: string; // 법인카드여부
  crpcNm: string; // 승인기관코드명
  rspCd: string; // 응답코드
  rspMsg: string; // 응답메세지
  crcmCd: string; // 카드사코드
  approvalOrgCd: string; // 승인기관코드
}

/**
 * @description: 카드 삭제
 */
export interface ResponseRemoveInfo {
  scsYn?: string; // 삭제여부
}

/**
 * @description: 등록된 교통카드
 */
export interface ResponseRegisteredCardInfo {
  scsYn: string; // 성공여부,
  prcrCnt: number; // 선불카드수(티머니)
  dpcCnt: number; // 후불카드수(신용/체크)
  msg: string;
}

// export interface RequestEvntBnftPlusInfo {
//   moappMbrsSno: string;
//   evntScrnId: string;
// }
/**
 * @description: 대중교통 챌린지 혜택플러스 조회
 */
export interface ResponseEvntBnftPlusInfo {
  data: EvntBnftPlusInfo;
}

export interface EvntBnftPlusInfo {
  extLinkImgSection: string;
  shareLinkSection: string;
  trCardPop: string;
  missionList: Array<MissionInfo>;
}

export interface MissionInfo {
  type: string;
  name: string;
  desc: string;
  link: string;
  bnftType: string;
  bnftVal: string;
  bnftId: string;
  arId: string;
  prcgRstCd: string;
}
