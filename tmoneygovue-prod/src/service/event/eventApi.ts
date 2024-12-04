import { defHttp } from '@/utils/http/axios';
import type {
  RequestEventDtlInfo,
  RequestEventList,
  ResponseEventDtlInfo,
  ResponseEventList
} from './model/eventModel';

enum Api {
  inqrMoappEvntList = '/api/app/v2/inqrMoappEvntList',
  getWebviewInfo = '/webview/app/v2/getWebviewInfo'
}

/**
 * @description: 이벤트목록
 */
export const getMoappEventList = (params: RequestEventList): Promise<ResponseEventList> => {
  return defHttp.post({
    url: Api.inqrMoappEvntList,
    params
  });
};

/**
 * @description: 이벤트 상세
 */
export const getEventDtlInfo = (params: RequestEventDtlInfo): Promise<ResponseEventDtlInfo> => {
  return defHttp.post({
    url: Api.getWebviewInfo,
    params
  });
};
