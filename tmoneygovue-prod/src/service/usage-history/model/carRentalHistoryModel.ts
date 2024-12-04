/**
 * @description CarRentalHistoryModel
 */

export interface CarRentalHistoryModel {
  rncrMrnpSno: string;
  mrnpStaCd: string;
  mrnpStaNm: string;
  pickupAt: string;
  dropoffAt: string;
  pickupPoi: string;
  dropoffPoi: string;
  vhclNm: string;
  subMdlNm: string;
  rncrEntrNm: string;
  pymDtm: string;
  cancDtm: string;
}

export interface CarRentalHistoryListModel {
  resevList: Array<CarRentalHistoryModel>;
}

export interface ReqCarRentalHistoryModel {
  pageNo: string;
  inqrMonth: string;
}
