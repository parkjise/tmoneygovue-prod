import type { ResponseTravelPayment } from '@/service/order/model/orderModel';

/**
 * @description 결제정보
 * BizPayInfo
 */
export interface BizPayInfo {
  pymMnsId: string; //결제수단ID
  displayYn: string; // 앱표현여부
  pymMnsNm?: string; //결제수단명
  mbrsUseYn?: string; //사용자사용여부
  order: string; //순서
  rprnPymMnsYn?: string; //대표결제수단여부
  pblcPhrsTtlNm: string[]; //홍보문구제목
  pblcPhrsCtt: string[]; //홍보문구내용
  pmsRgtDtm?: string; //결제수단등록일자
}

/**
 * @description 전자지갑상품목록
 * ElwlProd
 */
export interface ElwlProd {
  seqNo: string; // 일련번호
  tmcrNo: string; // 티머니카드번호
  pptDpyDvsCd: string; // 선불후불 구분코드(1:충전형,2:후불청구형)
  elwlPrdCd: string; // 전자지갑상품코드 (PLCC지갑 : 2100400801, 티머니페이지갑 : 1000100002)
  rtnAmt: number; // 잔액
  virtCardRfrnId?: string; // 참조카드키값
}

/**
 * @description 간편결제 결제수단(App Database)
 * AppSmpcPym
 */
export interface AppSmpcPym {
  pKey: string;
  cardCode: string; // crpcId
  cardName: string; //카드이름
  cardCIImageWhite: string; // path2
  cardSecDat1: string;
  cardSecDat2: string;
  cardSecDat3: string;
  cardSecDat4: string;
  cardDecDat1: string;
  cardDecDat4: string;
  cardSecLen1: number;
  cardSecLen2: number;
  cardSecLen3: number;
  cardSecLen4: number;
  cardNickName: string;
  rprnCardYn: string;
}

/**
 * @description 간편결제 결제수단(API)
 * SmpcPym
 */
export interface SmpcPym {
  issuerCd: string; //발급사코드
  cardName: string; //카드이름
  maskCardNo: string; //마스킹된 카드번호
  paymentKey: string; //결제 key
  cardAliasName: string; // 카드별칭
  usePsbSvc: string; //사용가능서비스
  serviceGrpCd?: string;
  checkCardYN?: string;
  rprnCardYn?: string; //대표카드여부
  crpcId?: string;
  path1?: string;
  path2?: string;
}

/**
 * @description 간편결제 결제수단 정보
 * SmpcPymInfo
 */
export interface SmpcPymInfo {
  pymMnsId: string; //결제수단ID
  displayYn: string; //앱표현여부
  pymMnsNm?: string; //결제수단명
  dataCount: number; //등록카드카운트
  order: string; //순서
  rprnPymMnsYn: string; //대표결제수단여부
  pblcPhrsCtt: string[]; //홍보문구내용
  pblcPhrsTtlNm: string[]; //홍보문구제목
  smpcPymList: SmpcPym[]; //결제수단목록
  mbrsUseYn?: string; //사용자사용여부
}

/**
 * @description 간편결제 결제수단 등록
 * SmpcPymRgt
 */
export interface SmpcPymRgt {
  terminalId: string; //단말기ID
  tranDvs: string; //거래구분(00: 일반, 01: 신용)
  telegramDvs: string; //전문구분(39: 결제키번호 해지)
  requestDate: string; //요청일자( YYYYMMDD )
  tranSerialNo: string; //거래일련번호
  mchtTranSerialNo: string; //가맹점사용 거래일련번호
  processDate: string; //처리(승인)일자 (YYYYMMDD)
  processTime: string; //처리(승인)시간 (HHMMSS)
  cardNo4thArea: string; //실 카드번호 뒤에서 4자리
  issuerCd: string; //발급사코드
  cardName: string; //카드이름
  mchtNo: string; //가맹점번호
  approvalNo: string; //승인번호
  respCd: string; //응답코드
  respMsg: string; //응답메시지
  cardRespCd?: string;
  checkCardYN?: string;
  hspdErrMsg?: string;
  maskCardNo?: string;
  paymentKey?: string;
  hspdErrCod?: string;
  hspdResultStatus?: string;
  fnlScsYn?: string;
  fnlRstTtl?: string;
  fnlRstMsg?: string;
  swtcMsg?: string;
  stplPrcsCd?: string;
  trcrRgtYn?: string; //교통카드 등록여부(Y/N)
}

/**
 * @description tmoney 결제수단 정보
 * TmoneyPayInfo
 */
export interface TmoneyPayInfo {
  pymMnsId: string; // 결제수단ID 'TMPY'
  displayYn: string; // 앱표현여부(Y, N)
  pymMnsNm?: string; // 결제수단명
  mbrsUseYn: string; //사용자사용여부
  order: string; // 순서
  rprnPymMnsYn: boolean; // 대표결제수단여부
  pblcPhrsTtlNm: string[]; // 홍보문구 제목명
  pblcPhrsCtt: string[]; // 홍보문구 내용
  intgMbrsId: string; // 통합회원ID(티머니페이 통합회원 ID)
  pmsRgtDtm: string; // 결제수단 등록일자
  elwlProdList: ElwlProd[]; // 전자지갑상품목록
  bnrImgPathVal?: string; // 배너이미지 링크
  bnrUrlVal?: string; // 이미지클릭시 이동링크
  bnrTtlNm?: string; // 이미지타이틀
  bnrNo?: string; // 이미지 No
  bnrImgTxt?: string; // 접근성용 문구
}

/**
 * @description 토스페이 자동결제키관련
 * TossPayBillingKey
 */
export interface TossPayBillingKey {
  rspCd: string;
  rspMsg: string;
  billingKey: string;
  checkoutPageAndroid: string;
  checkoutPageIos: string;
  checkoutPage: string;
}

/**
 * @description Toss 결제수단 정보
 * TossPayInfo
 */
export interface TossPayInfo {
  pymMnsId: string; //결제수단ID
  mbrsUseYn?: string; //사용자사용여부
  order: string; //순서
  rprnPymMnsYn?: string; //대표결제수단여부
  pblcPhrsTtlNm: string[]; //홍보문구제목
  pblcPhrsCtt: string[]; //홍보문구내용
  processedTs?: string; //최종상태처리시간(등록일시)
  billingKey?: string; //결제Key
  payMethod?: string; //지불방법
  cardCpNm?: string; //카드사이름
  cardNum4th?: string; //카드번호4번째
  bankName?: string; //은행명
  displayYn?: string; //앱표현여부
}

/**
 * @description NaverPay 정보
 * NaverPayInfo
 */
export interface NaverPayInfo {
  pymMnsId: string; //결제수단ID
  displayYn: string; //앱표현여부
  mbrsUseYn: string; //사용자사용여부
  order: string; //순서
  rprnPymMnsYn: string; //대표결제수단여부
  pblcPhrsTtlNm: string[]; //홍보문구제목
  pblcPhrsCtt: string[]; //홍보문구내용
  automaticPayId?: string; //자동결제ID
  merchantUserId?: string; //가맹사용자ID
  registrationDate?: string; //등록일자
  subMerchantId?: string; //하위가맹점ID
  subMerchantName?: string; //하위가맹점명
  maskedCardNo?: string; //카드정보
  cardNum4th?: string; //카드번호4번째
  cardCpNm?: string; //카드회사명
}

/**
 * @description 후불카드사
 * DelayPaymentCard
 */
export interface DelayPaymentCard {
  crpcId: string; //카드사
  dpyCrcmNm: string; //후불카드사명
  imgPath: string; //이미지경로
}

/**
 * @description 롤링배너
 * RollingBanner
 */
export interface RollingBanner {
  bnrImgPathVal: string; //배너이미지경로
  bnrUrlVal: string; //배너URL값
  bnrSrsq: string; //배너순서
  bnrNo: string; //배너번호
  authTknNedYn: string; //인증토큰필요여부
  concScrnDvsCd: string; //접속화면구분코드(0:아웃링크,1:웹뷰)
}

/**
 * @description Payco 정보
 * Payco
 */
export interface Payco {
  pymMnsId: string; //결제수단Id
  displayYn: string; // 앱표현여부
  pymMnsNm: string; //결제수단명
  pblcPhrsTtlNm: string[]; //홍보문구제목명
  pblcPhrsCtt: string[]; //홍보문구내용
  dpyCrcmList: DelayPaymentCard[]; //후불카드사목록
}

/**
 * @description 기타결제정보
 * OtherPayInfo
 */
export interface OtherPayInfo {
  order: string;
  payco: Payco;
}

/**
 * @description 결제수단 정보
 * PaymentManagement
 */
export interface PaymentManagement {
  bizPayInfo?: BizPayInfo;
  respCd: string;
  respMsg: string;
  rprnPymMnsId: string;
  rprnPymMnsNm?: string;
  /**
   * 전자지갑상품코드
   * PLCC 지갑 : 2100400801
   * 티머니페이 지갑 : 1000100002
   */
  rprnElwlProdCd: string;
  rprnPaymentKey: string;
  tmoneyPayInfo?: TmoneyPayInfo;
  smpcPymInfo?: SmpcPymInfo;
  appSmpcPymList?: AppSmpcPym[];
  otherPayInfo?: OtherPayInfo;
  tspyPymInfo?: TossPayInfo;
  tspyautPymInfo?: TossPayInfo;
  npayPymInfo?: NaverPayInfo;
  npayautPymInfo?: NaverPayInfo;
  rollingBnrList: RollingBanner[]; //롤링배너목록
}

/**
 * @description 대표결제수단
 * RepresentPaymentManagement
 */
export interface RepresentPaymentManagement {
  respCd: string;
  respMsg: string;
  rprnPaymentKey: string; //대표결제키
  issurCd: string; //발급사코드
  rprnPymMnsId: string; //대표결제수단Id
  rprnPymMnsNm: string; //대표결제수단명(페이머니 : 티머니페이(페이머니),PLCC: 티머니페이(티머니Pay&Go))
}

/**
 * @description 간편결제 주카드 변경
 * SmpcPaymentAliasModification
 */
export interface SmpcPaymentAliasModification {
  respCd: string; //응답코드
  respMsg: string; //응답메시지
  terminalId: string; //단말기ID
  tranDvs: string; //거래구분(00:일반, 01:신용)
  telegramDvs: string; //전문 구분(U2 : 결제키 대표카드 등록)
  requestDate: string; //요청일자(YYYYMMDD)
  mchtTranSerialNo: string; //거래일련번호
}

/**
 * 결제비밀번호 상태 조회
 */
export interface PaymentStatusInfo {
  rspMsg?: string;
  pwdLockYn: string; //결제 비밀번호 잠김 여부
  pwdExistingYn: string; //결제 비밀번호 존재 여부
  pwdUseYn: string; //결제 비밀번호 사용 여부
  encScsYn?: string;
  encDtm?: string;
}

/**
 * 결제 결과 정보
 */
export interface PaymentResultInfo {
  sucCd: boolean;
  resMessage?: string;
  payDate: Date;
  deprTrmlCd?: string;
  arvlTrmlCd?: string;
  paymetResponse?: ResponseTravelPayment;
}

/**
 * @description 결제수단 카드정보
 */
export interface CardDetailInfo {
  cardNum1: string;
  cardNum2: string;
  cardNum3: string;
  cardNum4: string;
  cardNumEnc1: string;
  cardNumEnc2: string;
  cardNumEnc3: string;
  cardNumEnc4: string;
  exdt: string;
  cardPwd: string;
  cardPwdEnc: string;
  cardPwdEncKb: string;
  birth: string;
  birthEnc: string;
  companyNumber: string;
  companyNumberEnc: string;
}

/**
 * @description 카드 등록정보
 */
export interface CardDetailRegistInfo {
  cardNum1: string;
  cardNum2: string;
  cardNum3: string;
  cardNum4: string;
  cardNumEnc1: string;
  cardNumEnc2: string;
  cardNumEnc3: string;
  cardNumEnc4: string;
  exdt: string;
  cvc: string;
  cvcEnc: string;
  cardPwd: string;
  cardPwdEnc: string;
  cardPwdEncKb: string;
  birth: string;
  birthEnc: string;
  companyNumber: string;
  companyNumberEnc: string;
  gender: string;
  nickName: string;
}

/**
 * @description 결제수단 삭제 가능 여부
 */
export interface DeletionPossibility {
  rspCd: string;
  rspMsg: string;
  moappMbrsSno: string;
  pymMnsId: string;
  paymentKey: string;
  dtlPsbYn: string;
  utlzMblt: string;
  msg: string;  
}
