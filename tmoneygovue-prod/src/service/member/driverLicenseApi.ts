import { defHttp, tmoney1Http } from '@/utils/http/axios';
import type {
  reqCheckDriverLicenseModel,
  resCheckDriverLicenseModel,
  reqRemoveDriverLicenseModel,
  resRemoveDriverLicenseModel,
  reqDriverLicenceTypeListModel,
  resDriverLicenceTypeListModel,
  resDriverLicenceTermList
} from '@/service/member/model/driverLicenseModel';

enum Api {
  checkDriverLicense = '/api/app/v2/crtnVrfcDrvLcnsInfo',
  removeDriverLicense = '/api/pm/mbrs/saveSctrDrvLcnsDelInf',
  driverLicenceTypeList = '/api/app/v2/inqrCmnCdInfo',
  inqrPageInfoS = '/api/app/v2/inqrPageInfoS'
}

/**
 * @description: 운전면허증 등록
 */
export const checkDriverLicense = (param: reqCheckDriverLicenseModel): Promise<resCheckDriverLicenseModel> => {
  return defHttp.post({
    url: Api.checkDriverLicense,
    params: param
  });
};

/**
 * @description: 운전면허증 삭제
 */
export const removeDriverLicense = (param: reqRemoveDriverLicenseModel): Promise<resRemoveDriverLicenseModel> => {
  return tmoney1Http.post({
    url: Api.removeDriverLicense,
    params: param
  });
};

/**
 * @description: 운전면허종별코드 조회
 */
export const getDriverLicenceTypeList = (
  param: reqDriverLicenceTypeListModel
): Promise<resDriverLicenceTypeListModel> => {
  return defHttp.post({
    url: Api.driverLicenceTypeList,
    params: param
  });
};

/**
 * @description: 운전면허증 등록 약관 조회
 */
export const getDriverLicenceTermList = (pageId: string): Promise<resDriverLicenceTermList> => {
  return defHttp.post({
    url: Api.inqrPageInfoS,
    params: { pageId }
  });
};
