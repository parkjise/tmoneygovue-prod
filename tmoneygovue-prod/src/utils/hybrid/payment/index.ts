// import type { FlexResponse } from '../type/index';
import type { FlexResponse } from '../type';
import type {
  AppSmpcCardResponse,
  AppVersionResponse,
  OcrResponse,
  AppSmpcCardRegRequest,
  AppSmpcCardRequest,
  PreviousPaymentTypeResponse,
  GeneralPayRequest,
  GeneralPayResponse,
  decScsYnRequest,
  decScsYnResponse,
  sendCardGeneralPaymentRequest,
  getCardGeneralPaymentResponse,
  registPreviousPaymentTypeRequest
} from './payment.type';

// WebToNative interface 정의
export default interface FlexPayment {
  // getOtherAppVersionList
  getOtherAppVersionList: () => Promise<AppVersionResponse>;
  // decScsYn
  decScsYn: (param: decScsYnRequest) => Promise<decScsYnResponse>;
  // getCardList
  getCardList: () => Promise<AppSmpcCardResponse>;
  // readOCR
  readOCR: () => Promise<OcrResponse>;
  // registCard
  registCard: (param: AppSmpcCardRegRequest) => Promise<FlexResponse>;
  // changeNickNameCard
  changeNickNameCard: (param: AppSmpcCardRequest) => Promise<FlexResponse>;
  // updateCard
  updateCard: (param: AppSmpcCardRequest) => Promise<FlexResponse>;
  // getPreviousPaymentType
  getPreviousPaymentType: () => Promise<PreviousPaymentTypeResponse>;
  // registPreviousPaymentType
  registPreviousPaymentType: (param: registPreviousPaymentTypeRequest) => Promise<FlexResponse>;
  // 일반결제요청(naverPay, tosspay)
  requestGeneralPay: (param: GeneralPayRequest) => Promise<GeneralPayResponse>;
  // 신용체크카드 일반결제정보 조회
  getCardGeneralPayment: () => Promise<getCardGeneralPaymentResponse>;
  // 신용체크카드 일반결제정보 전달
  sendCardGeneralPayment: (param: sendCardGeneralPaymentRequest) => Promise<FlexResponse>;
}
