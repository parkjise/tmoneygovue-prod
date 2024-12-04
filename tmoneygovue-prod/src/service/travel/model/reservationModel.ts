/**
 * @description 월간배차목록조회 request
 */
export interface ReqMntlAlcnList {
  reqSttDt: string; //조회시작일자
  reqEndDt: string; //조회종료일자
  trvlRotId: string; //여행노선ID
}

/**
 * @description 일별배차목록조회 request
 */
export interface ReqDAlcnList {
  atlDeprDt: string; //실제출발일자
  atlDeprTime: string; //실제출발시각
  trvlRotId: string; //여행노선ID
}

/**
 * @description 일별배차목록조회 > 배차목록
 */
export interface ResDAlcnData {
  trvlRotId: string; //여행노선ID
  rotSqno: number; //노선순번
  deprTrmlCd: string; //출발터미널코드
  deprTrmlNm: string; //출발터미널명
  alcnDt: string; //배차일자
  alcnSqno: number; //배차순번
  stptTrmlCd: string; //기점터미널코드
  eptTrmlCd: string; //종점터미널코드
  atlDeprDt: string; //실제출발일자
  atlDeprTime: string; //실제출발시각
  allSatsNum: string; //총좌석수
  rmnSatsNum: string; //잔여좌석수
  mrsPsbYn: string; //예매가능유무
  mvmnDrtm: string; //소요시간
  thruTrmlYn: string; //경유지유무
  alcnStaCd: string; //배차상태코드
  adltFee: number; //어른요금
  chldFee: number; //아동요금
  busClsCd: string; //버스등급코드
}

/**
 * @description 월간배차목록 response
 */
export interface ResMntlAlcnData {
  alcnDt: string; //배차일자
  adltFee: number; //어른요금
}

/**
 * @description 잔여석목록조회 request
 */
export interface ReqSatsList {
  trvlRotId: string; //여행노선ID
  rotSqno: number; //노선순번
  alcnDt: string; //배차일자
  alcnSqno: number; //배차순번
  stptTrmlCd: string; //기점터미널코드
  eptTrmlCd: string; //종점터미널코드
}

/**
 * @description 잔여석목록조회 response
 */
export interface ResSatsList {
  dist: number; //거리
  mvmnDrtm: string; //소요시간
  sellPsbSatsNum: number; //판매가능좌석수
  satiUseYn: string; //좌석제사용여부
  busTckKndNum: number; //버스티켓종류수
  rmnSatsNum: number; // 잔여좌석수
  busTckList: BusTckData[]; //버스티켓목록
}

/**
 * @description 잔여석목록조회 > 버스티켓목록
 */
export interface BusTckData {
  busTckKndCd: string; // 버스티켓종류코드
  busTckKndNm: string; //버스티켓종류명
  fee: number; //요금
}
