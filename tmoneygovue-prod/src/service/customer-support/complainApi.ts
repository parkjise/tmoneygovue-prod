import { defHttp } from '@/utils/http/axios';
import type {
  reqComplainListModel,
  resComplainListModel,
  reqComplainGroupModel,
  resComplainGroupModel,
  reqComplainRegistModel,
  reqComplainDeleteModel,
  resComplainModel
} from '@/service/customer-support/model/complainModel';

enum Api {
  inqrMbrsCvcpList = '/api/mbrs/v2/inqrMbrsCvcpList',
  inqrCvcpTypList = '/api/mbrs/v2/inqrCvcpTypList',
  crtnMbrsCvcpInfo = '/api/mbrs/v2/crtnMbrsCvcpInfo',
  delMbrsCvcpInfo = '/api/mbrs/v2/delMbrsCvcpInfo'
}

/**
 * @description: getComplainList
 * 1:1 민원 조회 요청
 */
export const getComplainList = (param: reqComplainListModel): Promise<resComplainListModel> => {
  return defHttp.post({
    url: Api.inqrMbrsCvcpList,
    params: param
  });
};

/**
 * @description: getComplaiTypeList
 * 민원 유형 리스트 조회 요청
 */
export const getComplainTypeList = (param: reqComplainGroupModel): Promise<resComplainGroupModel> => {
  return defHttp.post({
    url: Api.inqrCvcpTypList,
    params: param
  });
};

/**
 * @description: registComplain
 * 1:1 민원 생성 요청
 */
export const registComplain = (param: reqComplainRegistModel): Promise<resComplainModel> => {
  return defHttp.post({
    url: Api.crtnMbrsCvcpInfo,
    params: param
  });
};

/**
 * @description: deleteComplain
 * 1:1 민원 삭제 요청
 */
export const deleteComplain = (param: reqComplainDeleteModel): Promise<resComplainModel> => {
  return defHttp.post({
    url: Api.delMbrsCvcpInfo,
    params: param
  });
};
