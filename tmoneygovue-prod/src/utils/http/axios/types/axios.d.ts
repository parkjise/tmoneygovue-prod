export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

// axios request header setter type
type HeaderSetter = (config: any, authInfo: any) => void;

// 요청 처리 옵션
export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // URL prefix
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // axios 재시도 최대 횟수
  retryMaxCount?: number;
  // axios 재시도 횟수
  retryCount?: number;
  // 인터페이스명. 공통 인터페이스가 시스템별로 상이하여 해당 시스템에 맞는 인터페이스명을 넣어주어야 함. default: 모바일(티머니GO 2.0), travel: 운송여행
  interfaceName?: string;
  customToken?: string; //헤더에 세팅할 커스텀 authToken값
}

// default response data. 모바일(티머니2.0), 모바일(티머니1.0) 서버 응답 데이터
export interface DefaultResult<T = unknown> {
  rstCd: string;
  dta: T;
  errMsg: string;
}

// travel response data. 운송여행, mobility 서버 응답 데이터
export interface TravelResult<T = unknown> {
  rstCd: number;
  dta: T;
  err_cod: string;
  err_msg: string;
}

export interface MobilityResult<T = unknown> {
  rstCd: number;
  dta: T;
  err_cod: string;
  err_msg: string;
}

// ondataxi response base data. 온다택시 서버 base 응답 데이터
export interface OndataxiBaseResult {
  err_code: string;
  err_String: string;
}

// ondataxi response data. 온다택시 서버 응답 데이터
export interface OndataxiResult<T = unknown> extends OndataxiBaseResult {
  [key: string]: T;
}
