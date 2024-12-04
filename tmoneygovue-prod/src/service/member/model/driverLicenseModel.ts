/**
 * @description: 운전자 면허 정보 검증 요청
 */
export interface reqCheckDriverLicenseModel {
  mbrsNm: string; // 회원명
  mbrsBrdt: string; // 생년월일(YYMMDD)
  lcnsNo1: string; // 운전면허 첫번째 번호(지역)
  lcnsNo2: string; // 운전면허 두번째 번호
  lcnsNo3: string; // 운전면허 세번째 번호
  lcnsNo4: string; // 운전면허 네번째 번호
  reqEncYn?: string; // 운전면허 암호화 여부
  lcnsKndCd?: string; // 종별코드
}

/**
 * @description: 운전자 면허 정보 검증 응답
 */
export interface resCheckDriverLicenseModel {
  msg: string; // 메시지
  scsYn: string; // 성공 여부(Y/N)
  encDtm: string; // 암호화 키
  encScsYn: string; // 암호화 여부
}

/**
 * @description: 스쿠터 운전 면허 정보 삭제 요청
 */
export interface reqRemoveDriverLicenseModel {
  utlzSvcDvsCd: string; // 이용서비스구분코드 X:씽씽,G:지쿠터,K.킥고잉
}

/**
 * @description: 스쿠터 운전 면허 정보 삭제 응답
 */
export interface resRemoveDriverLicenseModel {
  data: scsYnModel;
}

/**
 * @description: 성공여부
 */
export interface scsYnModel {
  scsYn: string; // 성공여부(Y/N)
  msg: string; // 메시지
}

/**
 * @description: 공통코드 조회 요청 (M90:운전면허종별코드)
 */
export interface reqDriverLicenceTypeListModel {
  cmnCdId: string; // 공통코드ID M90:운전면허종별코드
}

/**
 * @description: 공통코드 조회 응답
 */
export interface resDriverLicenceTypeListModel {
  rspCd: string; // 응답코드
  rspMsg: string; // 응답메시지
  cmnCdId: string; // 공통코드ID
  cmnCdNm: string; // 공통코드명
  codeList: Array<driverLicenceTypeModel>; // 상세공통코드목록
}

/**
 * @description: 상세공통코드
 */
export interface driverLicenceTypeModel {
  code: string; // 상세코드값
  name: string; // 상세코드명
  srsq?: string; // 정렬순서
  selected?: string; // 초기선택여부
}

/**
 * @description: 페이지정보 조회 응답 (운전면허등록 페이지 약관조회)
 */
export interface resDriverLicenceTermList {
  rspCd: string;
  rspTtl: string;
  rspMsg: string;
  data: { stplList: Array<stplInfo> };
}

export interface stplInfo {
  stplSno: string;
  stplTtlNm: string;
  stplMndtYn: string;
  stplAgrmYn: string;
  stplUrl: string;
  extlUrl: string;
  stplCheck?: boolean;
}
