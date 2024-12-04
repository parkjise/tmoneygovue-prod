export interface NotificationModel {
  ntfcSno: string;

  appNtfcDvsCd: string;

  mndtNtcMttrYn: string;

  ntfcTtlNm: string;

  ntfcBody: string;

  lckMvmnVal: string;

  dsptDtm: string;

  userCfmYn: string;
}

export interface NotificationListModel {
  ntfcList: Array<NotificationModel>;
}

export interface ReqConfirmNotificationModel {
  ntfcRcvCfmCd: string;
  // 화면 호출시에는 Null로 호출함
  ntfcSnoList?: Array<NotificationSnoData>;
}

export interface NotificationSnoData {
  ntfcSno: string;
}

export interface ResConfirmNotificationModel {
  //안드로이드 소스 상에서도 Object가 정의되어 있지 않고 따로 사용하지 않는거 같지만 Response 정의만 해둠
  msg: string;
  okHttpResponseCode: string;
  rspMsg: string;
  rspCd: string;
}
