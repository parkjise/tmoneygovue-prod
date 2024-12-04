/**
 * @description: 혜택 서비스 설정 정보
 */
export interface resBenefitServiceSettingInfoModel {
  rspCd: string; // 응답 코드
  rspMsg: string; // 응답 메세지
  TGOMileageAmt: string; // TGO 마일리지 금액
  atncCheckPrcn: string; // ATNC 체크 비율
  benefitScrnMrkList: benefitScrnMrkListModel[]; // 혜택 화면 마크 리스트
  benefitEvntList: benefitEvntListModel[]; // 혜택 이벤트 리스트
  trcrRgtYn: string; // 추적 등록 여부
  actScsYn: string; // 활성화 여부
}

/**
 * @description: 혜택 화면 마크 리스트
 */
export interface benefitScrnMrkListModel {
  svcImgNm: string; // 서비스 이미지 이름
  svcLocDvsCd: string; // 서비스 위치 구분 코드
  svcImgPath: string; // 서비스 이미지 경로
  svcImgTltpCtt: string; // 서비스 이미지 툴팁 내용
  svcImgChcMvmnPath: string; // 서비스 이미지 선택 이동 경로
  svcMvmnTitlNm: string; // 서비스 이동 제목 이름
  svcImgDescCtt: string; //서비스 설명 필드(접근성)
}

/**
 * @description: 혜택 이벤트 리스트
 */
export interface benefitEvntListModel {
  svcImgNm: string; // 서비스 이미지 이름
  svcImgPath: string; // 서비스 이미지 경로
  svcImgTltpCtt: string; // 서비스 이미지 툴팁 내용
  svcImgChcMvmnPath: string; // 서비스 이미지 선택 이동 경로
}
