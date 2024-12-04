/**
 * @description 공휴일정보 모델
 */
export interface PublicHolidayInfo {
  pbhlDt: string; // 공휴일 일자
  wkdyNm: string; // 요일명
  pbhlNm: string; // 공휴일명
  cdFstAdtnInfCtt: string; // 부가정보1 (기준 공휴일명)
  cdSndAdtnInfCtt: string; // 부가정보2
  adptSttDtm: string; // 적용시작일시
  rgsrId: string; // 등록자 ID
  rgtDtm: string; // 등록일시
}

export interface ResponsePublicHoliday {
  pbhlList: Array<PublicHolidayInfo>;
  rspMsg: string;
  rspCd: string;
  resAdptSttDtm: string;
}
