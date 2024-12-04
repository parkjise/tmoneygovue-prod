import type { AppSmpcPym } from '@/service/payment/model/paymentModel';
import type { FlexResponse } from '../type/index';

export type decScsYnResponse = {
  encScsYn: string;
  encDtm: string;
  decScsYn: string;
} & FlexResponse;

/** decScsYnRequest */
export type decScsYnRequest = {
  encScsYn: string;
  encDtm: string;
};

/** AppVersionInfo */
export type AppVersionInfo = {
  packageFieldName: string;
  packageName: string;
  version: string;
};

/** appVersionList */
export type AppVersionResponse = {
  appState: string;
  versionList: AppVersionInfo[];
} & FlexResponse;

/** getCardList */
export type AppSmpcCardResponse = {
  smpcPymList: AppSmpcPym[];
} & FlexResponse;

/** readOCR */
export type OcrResponse = {
  cardNum1: string;
  cardNum2: string;
  cardNum3: string;
  cardNum4: string;
  encCardNum1: string;
  encCardNum2: string;
  encCardNum3: string;
  encCardNum4: string;
  exdt: string;
} & FlexResponse;

/** registCard */
export type AppSmpcCardRegRequest = {
  cardSecData1: string;
  cardSecData2: string;
  cardSecData3: string;
  cardSecData4: string;
  cardSecBirth: string;
  cardSecLen1: string;
  cardSecLen2: string;
  cardSecLen3: string;
  cardSecLen4: string;
  cardSecLenBirth: string;
  cardName: string;
  validity: string;
  paymentSystem: string;
  cardCode: string;
  cardKinds: boolean;
  companyNumber: string;
  nickName: string;
  path1: string;
  path2: string;
};

/** changeNickNameCard, updateCard */
export type AppSmpcCardRequest = {
  pKey: string;
  nickName?: string;
  type?: string;
};

/** getPreviousPaymentType */
export type PreviousPaymentTypeResponse = {
  paymentType: number;
} & FlexResponse;

export type registPreviousPaymentTypeRequest = {
  paymentType: number;
};

/** requestGeneralPay */
export type GeneralPayRequest = {
  paymentType: string;
  checkoutPage: string;
};

type BillAuthData = {
  card: string;
  auth: string;
};

export type GeneralPayResponse = {
  result: string;
  oderSno?: string;
  moappMbrsSno?: string;
  billAuthData?: BillAuthData;
  amount?: number;
  spreadOut?: string;
  message: string;
} & FlexResponse;

// 신용체크카드 일반결제정보 전달 요청
export type sendCardGeneralPaymentRequest = {
  cardSecDat1: string;
  cardSecDat2: string;
  cardSecDat3: string;
  cardSecDat4: string;
  cardSecLen1: number;
  cardSecLen2: number;
  cardSecLen3: number;
  cardSecLen4: number;
  cardPw: string;
  cardPwkb: string;
  validity: string;
  crpcId: string;
  crpcNm: string;
  checkCardYN: string;
  cprtCardYn: string;
  issurCd: string;
  cardImgPath: string;
  cardSecBirth: string;
  companyNumber: string;
  monthlyInstallment: string;
};

// 신용체크카드 일반결제정보 조회 응답
export type getCardGeneralPaymentResponse = {
  isInstallment: boolean;
  paymentAmount: number;
} & FlexResponse;
