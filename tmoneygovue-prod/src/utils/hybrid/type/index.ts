export enum FlexResponseCode {
  OK = '0000',
  CANCEL = '0001',
  FAIL = '9999'
}

export type FlexResponseHeader = {
  code: FlexResponseCode;
  message: string;
};

export type FlexResponse = {
  response: FlexResponseHeader;
};

// 애드브릭스 이벤트id
export const AdbrixEvtId = {
  cTmoney: 'EVENT_CLICK_TMONEY',
  rTmoney: 'EVENT_REGISTER_TMONEY',
  dTmoney: 'EVENT_DELETE_TMONEY',
  cCredit: 'EVENT_CLICK_CREDIT',
  rCredit: 'EVENT_REGISTER_CREDIT',
  dCredit: 'EVENT_DELETE_CREDIT',
  mPush: 'EVENT_MORE_PUSH',
  mNotice: 'EVENT_MORE_NOTICE',
  mEvent: 'EVENT_MORE_EVENT',
  mCs: 'EVENT_MORE_CS',
  mProfile: 'EVENT_MORE_PROFILE',
  mSetting: 'EVENT_MORE_SETTING',
  mGuide: 'EVENT_MORE_GUIDE',
  mCsQNA: 'EVENT_MORE_CS_QNA',
  mCsFAQ: 'EVENT_MORE_CS_FAQ',
  tapMyTpc: 'MY_TPCARD_TAP',
  tapMyGoMlg: 'MY_GOMILEAGE_TAP',
  tapMyGoMlgTpc: 'MY_GOMILEAGE_TPCARD_TAP',
  tapMyDistance: 'MY_DISTANCE_TAP',
  tapMyCost: 'MY_COST_TAP',
  tapMyType: 'MY_TYPE_TAP',
  tapMyEsg: 'MY_ESG_TAP',
  tapBenefitAttend: 'BENEFIT_ATTENDANCE_TAP',
  tapBenefitTpc: 'BENEFIT_TPCARD_TAP',
  tapBenefitOfferWall: 'BENEFIT_OFFERWALL_TAP',
  tapMoreTpc: 'MORE_TPCARD_TAP',
  tpcRegLanding: 'TPCARD_REGISTER_LANDING',
  tpcHisLanding: 'TPCARD_HISTORY_LANDING',
  tapProfileTpc: 'PROFILE_TPCARD_TAP',
  setBusiness: 'SETTING_BUSINESS',
  tapTpcRegRwReg: 'TPCARD_REGISTER_REWARDREGISTER_TAP',
  tapTpcRegEdit: 'TACARD_REGISTER_EDIT_TAP',
  mlgLanding: 'MILEAGE_LANDING',
  tapMlgOfferwall: 'MILEAGE_OFFERWALL_TAP',
  offerwallLanding: 'OFFERWALL_LANDING',
  tapOfferwallA: 'OFFERWALL_A_TAP',
  tapOfferwallB: 'OFFERWALL_B_TAP',
  tapOfferwallC: 'OFFERWALL_C_TAP',
  tapOfferwallN: 'OFFERWALL_NATIVE_TAP'
};
