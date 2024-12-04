export interface ReqMyCallModel {
  //택시 종류 N : 일반 / M : 모범 / P : 장애인 고급택시
  taxiType: string;
  //콜 키
  callKey?: string;
  associatedCallKey?: string;
}

export interface ResMyCallModel {
  err_code: string;
  err_String: string;
  myCallKey?: number;
}
