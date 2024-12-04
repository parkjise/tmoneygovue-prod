import type { FlexResponse } from '../type';
import type { ImgDataRequest } from './travel.type';

export default interface FlexTravel {
  /**
   * @description 예약정보 공유하기
   * @returns
   */
  shareRsrvInfo: (param: ImgDataRequest) => Promise<FlexResponse>;
  /**
   * @description 영수증 저장
   * @returns
   */
  downloadReceiptImg: (param: ImgDataRequest) => Promise<FlexResponse>;
}
