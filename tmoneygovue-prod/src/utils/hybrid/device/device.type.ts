import type { FlexResponse } from '../type/index';

// WebToNative request, reponse type 정의
export type DeviceInfoResponse = {
  osCd: string /** OS 종류	A: 안드로이드, I: 아이폰 */;
  uuid: string /** uuid */;
  requstId: string /** 요청id */;
} & FlexResponse;

export type DeviceInfoRequest = {
  requstId: string;
};
