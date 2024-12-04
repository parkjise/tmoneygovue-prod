import { defHttp } from '@/utils/http/axios';

import type { resMyServiceSettingInfoModel } from './model/myMainModel';

enum Api {
  // 마이 서비스 설정 정보 조회
  myServiceSettingInfo = '/api/mui/v2/inqrWaMyStupInfo'
}

/**
 * @description: getMyServiceSettingInfo
 * MY서비스 설정 정보 조회 요청
 */
export const getMyServiceSettingInfo = (): Promise<resMyServiceSettingInfoModel> => {
  return defHttp.post({
    url: Api.myServiceSettingInfo
  });
};
