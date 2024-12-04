/**
 * @description: 친구초대 프로모션
 */
export interface ResFrndInvnInfo {
  frndInvnSno: string; //친구초대코드
  mlgAcmtAmt: string; //친구초대획득마일리지 default 0
  invnScsCnt: string; //친구초대성공횟수 default 0
  cpnUseCnt: string; //친구의쿠폰사용횟수 default 0
  rspCd: string;
  rspMsg: string;
}
