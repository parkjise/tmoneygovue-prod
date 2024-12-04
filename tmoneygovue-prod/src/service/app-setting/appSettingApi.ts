import { defHttp } from '@/utils/http/axios';
import type {
  reqMarketingAgreementModel,
  resMarketingAgreementModel,
  reqUpdateMarketingAgreementModel,
  resUpdateMarketingAgreementModel
} from '@/service/app-setting/model/appSettingModel';

enum Api {
  marketingAgreementInfo = '/api/mbrs/v2/inqrMbrsRcvAgrmInfo',
  updateMarketingAgreement = '/api/mbrs/v2/uptMbrsRcvAgrmInfo'
}

/**
 * @description: getMarketingAgreementInfo
 */
export const getMarketingAgreementInfo = (param: reqMarketingAgreementModel): Promise<resMarketingAgreementModel> => {
  return defHttp.post({
    url: Api.marketingAgreementInfo,
    params: param
  });
};

/**
 * @description: updateMarketingAgreement
 */
export const updateMarketingAgreement = (
  param: reqUpdateMarketingAgreementModel
): Promise<resUpdateMarketingAgreementModel> => {
  return defHttp.post({
    url: Api.updateMarketingAgreement,
    params: param
  });
};
