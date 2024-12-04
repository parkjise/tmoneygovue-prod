/**
 * @description: 회원이용모바일서비스 PM현황조회 요청
 */
// export interface reqMbrUtlzPmSvcPrcnModel {
//   inqrCtVal: string; // 조회 기준. T: 결제일 기준, S: 출발일 기준
//   inqrEndDt: string; // 조회 종료 일자. yyyyMMdd
//   inqrSttDt: string; // 조회 시작 일자. yyyyMMdd
//   jrnyYn: string; // 여정 여부. Y: 남은 여장, N: 전체 여정
//   rideStatCd: string; // 승차 상태 코드. 0: 전체, 1: 결제, 2: 취소
//   utlzSvcDvsStr: string; // 이용 서비스 구분 문자열
// }

/**
 * @description: 회원이용모바일서비스 PM현황조회 응답
 */
// export interface resMbrUtlzPmSvcPrcnModel {
//   jrnyCnt: number; // 여정 건수
//   bcclJrnyInfoYn: string; // BCCL 여정 정보 여부
//   bcclUnpdInfoYn: string; // BCCL 미납 정보 여부
//   sctrJrnyInfoYn: string; // SCTR 여정 정보 여부
//   sctrUnpdInfoYn: string; // SCTR 미납 정보 여부
//   bcclJrnyInfo: object; // BCCL 여정 정보
//   bcclUnpdInfo: object; // BCCL 미납 정보
//   sctrJrnyInfo: object; // SCTR 여정 정보
//   sctrUnpdInfo: object; // SCTR 미납 정보
//   hspdUtlzList: object[]; // HSPD 이용 리스트
//   ctyUtlzList: object[]; // CTY 이용 리스트
//   rspCd: string; // 응답 코드
//   rspMsg: string; // 응답 메세지
//   LRentCarUtlzList: object[]; // 렌트카 이용 리스트
//   RSrtJrnyUtlzList: object[]; // RSRT 여정 이용 리스트
//   UAirJrnyUtlzList: object[]; // UAir 여정 이용 리스트
// }

/**
 * @description: 마이 서비스 설정 정보 조회
 */
export interface resMyServiceSettingInfoModel {
  rspCd: string; // 응답 코드
  rspMsg: string; // 응답 메세지
  myMvmnDist: string; // 마이 이동거리
  trcrRgtYn: string; // 추적 등록 여부
  trcrRgtMvmnPath: string; // 추적 등록 이동 경로
  actScsYn: string; // 활성화 여부
  myScrnMrkList: myScrnMrkListModel[]; // 마이 화면 마크 리스트
}

/**
 * @description: 마이 화면 마크 리스트
 */
export interface myScrnMrkListModel {
  svcCd: string; // 서비스 코드
  svcNm: string; // 서비스 이름
  svcTtlNm: string; // 서비스 제목 이름
  svcTtlNmLrCd: string; // 서비스 제목 이름 색상
  svcTtlImgPath: string; // 서비스 제목 이미지 경로
  svcTtlTltpCtt: string; // 서비스 제목 툴팁 내용
  svcTtlChcMvmnPath: string; // 서비스 제목 선택 이동 경로
  svcLotPath: string; // 서비스 이미지 경로
  svcLotDfltPath: string; // 서비스 이미지 기본 경로
  svcLotTllNm: string; // 서비스 이미지 툴팁 이름
  svcLotTllNmLrCd: string; // 서비스 이미지 툴팁 이름 색상
  svcLotCtt: string; // 서비스 이미지 내용
  svcLotCttLrCd: string; // 서비스 이미지 내용 색상
  dtlMvmnNm: string; // 상세 이동 이름명
  dtlMvmnNmLrCd: string; // 상세 이동 이름 색상
  dtlMvmnNmBckgLrCd: string; // 상세 이동 이름 배경 색상
  dtlMvmnNmImgPath: string; // 상세 이동 이미지 경로
  dtlMvmnNmTltpCtt: string; // 상세 이동 툴팁 내용
  dtlMvmnNmChcMvmnPath: string; // 상세 이동 선택 이동 경로
  dtlMvmnTitlNm: string; // 상세 이동 제목 이름
  scrnMrkInfoList: scrnMrkInfoListModel[]; // 화면 마크 정보 리스트
  svcTypeInfoList: svcTypeInfoListModel[]; // 서비스 타입 정보 리스트
  thmmTrcsInfoList: thmmTrcsInfoListModel[]; // 썸네일 추적 정보 리스트
  scrnMrkSttLrCd: string; // 화면 배경 시작 색상
  scrnMrkEndLrCd: string; // 화면 배경 종료 색상
}

/**
 * @description: 화면 마크 정보
 */
export interface scrnMrkInfoListModel {
  displayYn: string; // 화면 마크 표시 여부
  mlgAcmtAmt: string; // 마일리지 적립 금액
  stepDvsCd: string; // 단계 구분 코드
  stepUseYn: string; // 단계 사용 여부
  trtrMlgAmt: string; // 트리터 마일리지 금액
  utlzSvcDvsCd: string; // 이용 서비스 구분 코드
  utlzSvcDvsNm: string; // 이용 서비스 구분 이름
  utlzSvcFcnt: string; // 이용 서비스 기능
  utlzSvcIconLrVal: string; // 이용 서비스 아이콘 색상
}

/**
 * @description: 서비스 타입 정보
 */
export interface svcTypeInfoListModel {
  adptSeqNm: string; // 적용 순번 이름
  stupSvcDvsCd: string; // 설정 서비스 구분 코드
  svcTypCd: string; // 서비스 타입 코드
  svcTypPath: string; // 서비스 타입 경로
  svcTypSrsq: number; // 서비스 타입 순번
  svcImgDescCtt: string; // 서비스 설명 필드(접근성)
}

/**
 * @description: 썸네일 추적 정보
 */
export interface thmmTrcsInfoListModel {
  utlzSvcAmt: string; // 이용 서비스 금액
  utlzSvcMonth: string; // 이용 서비스 월
  utlzSvcRto: string; // 이용 서비스 비율
  utlzSvcTerm: string; // 이용 서비스 기간
}
