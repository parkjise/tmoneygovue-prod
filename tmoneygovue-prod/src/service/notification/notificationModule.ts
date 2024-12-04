import { defineStore } from 'pinia';
import type {
  NotificationModel,
  ReqConfirmNotificationModel
} from '@/service/notification/model/notificationModel';
import {
  confirmNotification,
  getNotificationList
} from '@/service/notification/api/notificationApi';

interface notificationState {
  notificationList: NotificationModel[];
  isLast: boolean;
}

export const useNotificationStore = defineStore({
  id: 'notificationStore',

  state: (): notificationState => ({
    notificationList: [],
    isLast: false
  }),

  getters: {
    getNotificationList(): NotificationModel[] {
      return this.notificationList;
    }
  },

  actions: {
    /**
     * 알림목록 조회
     * @param data
     */
    async actionGetNotificationList(data: string) {
      const res = await getNotificationList(data);
      if (res) {
        if (res.ntfcList) {
          this.notificationList = res.ntfcList;
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 알림 관련 검증 API
     * @param data
     */
    async actionConfirmNotification(data: ReqConfirmNotificationModel) {
      confirmNotification(data);
    },
  }
});
