import { defHttp } from '@/utils/http/axios';
import type { ResFrndInvnInfo } from './model/inviteModel';

const Api = {
  inqrFrndInvnScrnInfo: '/api/mbrs/v2/inqrFrndInvnScrnInfo'
};

/**
 * @description: 친구초개화면정보조회 IO-MID2-O-0162
 */
export const inqrFrndInvnScrnInfo = (): Promise<ResFrndInvnInfo> => {
  return defHttp.post({
    url: Api.inqrFrndInvnScrnInfo
  });
};
