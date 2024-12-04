/**
 * @description: 1:1 민원 조회 요청
 */
export interface reqComplainListModel {
  pageNo: number; // 페이지번호
}

/**
 * @description: 1:1 민원 조회응답
 */
export interface resComplainListModel {
  msg: string; // 응답 메세지(티머니GO 서버 응답 메세지)
  inqrCnt: number; //조회건수
  cvcpList: Array<complainInfoModel>; //상세
}

/**
 * @description: 1:1 민원
 */
export interface complainInfoModel {
  cvcpSno: string; //민원일련번호
  rgtDtm: string; //등록일시
  cvcpTypCd: string; //민원유형코드
  cvcpTypNm: string; //민원유형코드명
  cvcpTtlNm?: string; //민원제목명
  cvcpCtt: string; //민원내용
  answYn: string; //답변부여(Y/N)
  answTtlNm?: string; //답변제목명
  answCtt?: string; //답변내용
  answDtm?: string; //답변일시
}

/**
 * @description: 민원 유형 리스트 조회 요청
 */
export interface reqComplainGroupModel {
  inqrtDtm: string; // 조회일시
}

/**
 * @description: 민원 유형 리스트 조회 응답
 */
export interface resComplainGroupModel {
  msg: string; // 응답 메세지(티머니GO 서버 응답 메세지)
  cvcpTypGrpList: Array<complainGroupModel>; //민원유형그룹리스트
}

/**
 * @description: 민원 유형 그룹
 */
export interface complainGroupModel {
  cvcpTypGrpCd: string; // 민원유형그룹코드
  cvcpTypGrpNm: string; // 민원유형그룹명
  cvcpTypDtlList: Array<complainTypeModel>; //민원유형상세리스트
}

/**
 * @description: 민원 유형 상세
 */
export interface complainTypeModel {
  cvcpTypDtlCd: string; // 민원유형상세코드
  cvcpTypDtlNm: string; // 민원유형상세명
}

/**
 * @description: 1:1민원 생성 요청
 */
export interface reqComplainRegistModel {
  cvcpTypCd: string; // 민원유형코드
  cvcpTtlNm: string; // 민원제목명
  cvcpCtt: string; // 민원내용
}

/**
 * @description: 1:1민원 삭제 요청
 */
export interface reqComplainDeleteModel {
  cvcpSno: string; // 민원일련번호
}

/**
 * @description: 1:1민원 삭제/등록 응답
 */
export interface resComplainModel {
  msg: string; // 메시지
  scsYn: string; //성공여부
}
