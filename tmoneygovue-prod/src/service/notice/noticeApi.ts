import { defHttp } from '@/utils/http/axios';
import type { ResponseNoticeDtlInfo, ResponseNoticeList } from './model/noticeModel';

enum Api {
  inqrNoticeInfo = '/webview/app/notice/v3/inqrNoticeInfo',
  getNoticeDtlInfo = '/webview/app/getNoticeDtlInfo'
}

/**
 * @description: 공지사항 목록
 */
export const getNoticeListInfo = (): Promise<ResponseNoticeList> => {
  return defHttp.post({
    url: Api.inqrNoticeInfo
  });
};

/**
 * @description: 공지사항 상세
 */
export const getNoticeDtlInfo = (moappNtcMttrSno: string): Promise<ResponseNoticeDtlInfo> => {
  return defHttp.post({
    url: Api.getNoticeDtlInfo,
    params: { moappNtcMttrSno }
  });
};
