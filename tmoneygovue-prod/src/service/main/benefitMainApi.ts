import { defHttp } from '@/utils/http/axios';
import type { resBenefitServiceSettingInfoModel } from './model/benefitMainModel';

enum Api {
  benefitServiceSettingInfo = '/api/mui/v2/inqrBenefitStupInfo'
}

/**
 * @description: getBenefitServiceSettingInfo
 * 혜택서비스 설정 정보 조회 요청
 */
export const getBenefitServiceSettingInfo = (): Promise<resBenefitServiceSettingInfoModel> => {
  return defHttp.post({
    url: Api.benefitServiceSettingInfo
  });
};
