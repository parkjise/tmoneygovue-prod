import { defHttp } from '@/utils/http/axios';
import type {
  NotificationListModel,
  ReqConfirmNotificationModel
} from '@/service/notification/model/notificationModel';

enum Api {
  notificationList = '/api/push/v2/inqrNtfcList',
  confirmNotification = '/api/push/v2/cfmRcvNtfcInfo',
}

/**
 * 알림 목록 조회
 * @param data
 */
export const getNotificationList = (data: string): Promise<NotificationListModel> => {
  return defHttp.post({
    url: Api.notificationList,
    data: {
      inqrDtm: data
    }
  });
};

export const confirmNotification = (data: ReqConfirmNotificationModel) => {
  defHttp
    .post({
      url: Api.confirmNotification,
      data: {
        ntfcRcvCfmCd: data.ntfcRcvCfmCd,
        ntfcSnoList: data?.ntfcSnoList
      }
    })
    //AOS 에서도 error 캐치만 하고있음
    .catch((error) => {
      return Promise.reject(error);
    });
};
