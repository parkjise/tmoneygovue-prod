/* eslint-disable no-undef */
module.exports = [
  {
    name: 'auth',
    url: '/api/auth',
    method: 'post'
  },
  {
    name: 'posts',
    url: '/api/posts',
    method: 'get'
  },
  {
    name: 'postInfo',
    url: '/api/postInfo',
    method: 'get'
  },
  {
    name: 'inqrNoReadNtfcCnt',
    url: '/api/push/v2/inqrNoReadNtfcCnt',
    method: 'post'
  },
  {
    name: 'inqrMbrsMlgAmtCpnCnt',
    url: '/api/mbrs/v2/inqrMbrsMlgAmtCpnCnt',
    method: 'post'
  },
  {
    name: 'inqrMyStupInfo',
    url: '/api/mui/v2/inqrMyStupInfo',
    method: 'post'
  },
  {
    name: 'inqrBenefitStupInfo',
    url: '/api/mui/v2/inqrBenefitStupInfo',
    method: 'post'
  },
  {
    name: 'inqrNoticeInfo',
    url: '/webview/app/notice/v3/inqrNoticeInfo',
    method: 'post'
  },
  {
    name: 'getNoticeDtlInfo',
    url: '/webview/app/getNoticeDtlInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsTrcrNoList',
    url: '/api/mbrs/v2/inqrMbrsTrcrNoList',
    method: 'post'
  },
  {
    name: 'inqrTmpyTrcr',
    url: '/api/tmpy/v2/inqrTmpyTrcr',
    method: 'get'
  },
  {
    name: 'inqrPageInfoS',
    url: '/api/app/v2/inqrPageInfoS',
    method: 'post'
  },
  {
    name: 'inqrPageInfoSS',
    url: '/api/app/v2/inqrPageInfoSS',
    method: 'post'
  },
  {
    name: 'reqRgtTmpyTrcr',
    url: '/api/tmpy/v2/reqRgtTmpyTrcr',
    method: 'post'
  },
  {
    name: 'crtnMbrsTrcrNoInfo',
    url: '/api/mbrs/v2/crtnMbrsTrcrNoInfo',
    method: 'post'
  },
  {
    name: 'inqrCardBinInfo',
    url: '/api/pym/v2/inqrIntgCardBinInfo',
    method: 'post'
  },
  {
    name: 'delMbrsTrcrNoInfo',
    url: '/api/mbrs/v2/delMbrsTrcrNoInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsTrcrCntInfo',
    url: '/api/mbrs/v2/inqrMbrsTrcrCntInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsStatInfo',
    url: '/api/mbrs/v2/inqrMbrsStatInfo',
    method: 'post'
  },
  {
    name: 'inqrTrtdMainInfo',
    url: '/api/mlg/v2/inqrTrtdMainInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsTrtdHstList',
    url: '/api/mlg/v2/inqrMbrsTrtdHstList',
    method: 'post'
  },
  {
    name: 'inqrTrtdHstDtlList',
    url: '/api/mlgRfnd/v1/inqrTrtdHstDtlList',
    method: 'post'
  },
  {
    name: 'inqrMbrsMlgList',
    url: '/api/mlg/v2/inqrMbrsMlgList',
    method: 'post'
  },
  {
    name: 'inqrSpfStplAgrmYN',
    url: '/api/mbrs/v2/inqrSpfStplAgrmYN',
    method: 'post'
  },
  {
    name: 'crtnSpfStplAgrmInfo',
    url: '/api/mbrs/v2/crtnSpfStplAgrmInfo',
    method: 'post'
  },
  {
    name: 'inqrGTTMlgSwtcBfrsInf',
    url: '/api/mlg/v2/inqrGTTMlgSwtcBfrsInf',
    method: 'post'
  },
  {
    name: 'requestSearchTMlg',
    url: '/api/mlg/v2/requestSearchTMlg',
    method: 'post'
  },
  {
    name: 'reqGTTMlgSwtc',
    url: '/api/mlg/v2/reqGTTMlgSwtc',
    method: 'post'
  },
  {
    name: 'inqrWebViewStupInfo',
    url: '/api/app/v2/inqrWebViewStupInfo',
    method: 'post'
  },
  {
    name: 'inqrMoappEvntList',
    url: '/api/app/v2/inqrMoappEvntList',
    method: 'post'
  },
  {
    name: 'getWebviewInfo',
    url: '/webview/app/v2/getWebviewInfo',
    method: 'post'
  },
  {
    name: 'getWebviewMbrsStplInfo',
    url: '/webview/app/v2/getWebviewMbrsStplInfo',
    method: 'post'
  },
  {
    name: 'setWebviewMbrsStpl',
    url: '/webview/app/v2/setWebviewMbrsStpl',
    method: 'post'
  },
  {
    name: 'publicTransportHistory',
    url: '/api/mbrs/v2/inqrMbrsPbtrUtlzList',
    method: 'post'
  },
  {
    name: 'paymentHistory',
    url: '/api/pym/v2/inqrPymPtList',
    method: 'post'
  },
  {
    name: 'bikePaymentHistory',
    url: '/api/pm/rtrn/inqrBcclPymDtlInf',
    method: 'post'
  },
  {
    name: 'rentCarPaymentHistory',
    url: '/api/l/rsrv/v1/selectReceipt',
    method: 'post'
  },
  {
    name: 'busHistory',
    url: '/api/mbrs/v2/inqrMbrsBusUtlzList',
    method: 'post'
  },
  {
    name: 'bikeScooterHistory',
    url: '/api/bikeScooterHistory',
    method: 'post'
  },
  {
    name: 'publicBike',
    url: '/api/publicBike',
    method: 'post'
  },
  {
    name: 'bikeVoucherHistory',
    url: '/api/bikeVoucherHistory',
    method: 'post'
  },
  {
    name: 'publicBicycleHistory',
    url: '/api/publicBicycleHistory',
    method: 'post'
  },
  {
    name: 'goPassHistory',
    url: '/api/passCpn/v2/inqrMyPassCpnInfo',
    method: 'post'
  },
  {
    name: 'inqrStplList',
    url: '/api/mbrs/v2/inqrStplList',
    method: 'post'
  },
  {
    name: 'rprnPymMnsInfo',
    url: '/api/pym/v2/inqrRprnPymMnsInfo',
    method: 'post'
  },
  {
    name: 'pymMnsListAtMng',
    url: '/api/pym/v2/inqrPymMnsListAtMng',
    method: 'post'
  },
  {
    name: 'inqrPymStatusInfo',
    url: '/api/pym/v2/inqrPymStatusInfo',
    method: 'post'
  },
  {
    name: 'dltMbrsTmpyPymMns',
    url: '/api/dltMbrsTmpyPymMns',
    method: 'post'
  },
  {
    name: 'reqBzpyLnkgCanc',
    url: '/api/pym/v2/reqBzpyLnkgCanc',
    method: 'post'
  },
  {
    name: 'naverPayAutoCancel',
    url: '/api/pym/npay/v1/autoCancel',
    method: 'post'
  },
  {
    name: 'billingKey',
    url: '/api/pym/toss/v2/billingKey',
    method: 'post'
  },
  {
    name: 'billingKeyRemove',
    url: '/api/pym/toss/v2/billingKeyRemove',
    method: 'post'
  },
  {
    name: 'cardPymKeyRgt',
    url: '/api/pym/v2/reqRprnCardPymKeyRgt',
    method: 'post'
  },
  {
    name: 'cardSmpcPymCncn',
    url: '/api/pym/v2/reqCardSmpcPymCncn',
    method: 'post'
  },
  {
    name: 'cardSmpcPymAlsMod',
    url: '/api/pym/v2/reqCardSmpcPymAlsMod',
    method: 'post'
  },
  {
    name: 'deleteMemberTMoneyPay',
    url: '/api/dltMbrsTmpyPymMns',
    method: 'post'
  },
  {
    name: 'deleteMemberBizPay',
    url: '/api/pym/v2/reqBzpyLnkgCanc',
    method: 'post'
  },
  {
    name: 'naverPayAutoRegReserve',
    url: '/api/pym/npay/v1/autoRegReserve',
    method: 'post'
  },
  {
    name: 'naverPayAutoCancel',
    url: '/api/pym/npay/v1/autoCancel',
    method: 'post'
  },
  {
    name: 'reqPymPwdUseYnInfo',
    url: '/api/pym/v2/reqPymPwdUseYnInfo',
    method: 'post'
  },
  {
    name: 'reqPymPwdRgtInfo',
    url: '/api/pym/v2/reqPymPwdRgtInfo',
    method: 'post'
  },
  {
    name: 'reqPymPwdAuthInfo',
    url: '/api/pym/v2/reqPymPwdAuthInfo',
    method: 'post'
  },
  {
    name: 'reqPymPwdLockInfo',
    url: '/api/pym/v2/reqPymPwdLockInfo',
    method: 'post'
  },
  {
    name: 'reqUseCpnVldVrfc',
    url: '/api/cpn/v2/reqUseCpnVldVrfc',
    method: 'post'
  },
  {
    name: 'inqrMbrsPageInfo',
    url: '/api/mbrs/v2/inqrMbrsPageInfo',
    method: 'post'
  },
  {
    name: 'crtnMbrsScsnInfo',
    url: '/api/mbrs/v2/crtnMbrsScsnInfo',
    method: 'post'
  },
  {
    name: 'crtnMbrsCvcpInfo',
    url: '/api/mbrs/v2/crtnMbrsCvcpInfo',
    method: 'post'
  },
  {
    name: 'delMbrsCvcpInfo',
    url: '/api/mbrs/v2/delMbrsCvcpInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsCvcpList',
    url: '/api/mbrs/v2/inqrMbrsCvcpList',
    method: 'post'
  },
  {
    name: 'crtnVrfcDrvLcnsInfo',
    url: '/api/app/v2/crtnVrfcDrvLcnsInfo',
    method: 'post'
  },
  {
    name: 'inqrCvcpTypList',
    url: '/api/mbrs/v2/inqrCvcpTypList',
    method: 'post'
  },
  {
    name: 'inqrPrpmAutPymStplAgrmYN',
    url: '/api/pym/v2/inqrPrpmAutPymStplAgrmYN',
    method: 'post'
  },
  {
    name: 'pymMnsListAtPym',
    url: '/api/pym/v2/inqrPymMnsListAtPym',
    method: 'post'
  },
  {
    name: 'crtnMbrsLnkgSvcInfo',
    url: '/api/mbrs/v2/crtnMbrsLnkgSvcInfo',
    method: 'post'
  },
  {
    name: 'inqrMbrsLnkgSvcList',
    url: '/api/mbrs/v2/inqrMbrsLnkgSvcList',
    method: 'post'
  },
  {
    name: 'inqrBlackListYn',
    url: '/api/mbrs/v2/inqrBlackListYn',
    method: 'post'
  },
  {
    name: 'saveSctrDrvLcnsDelInf',
    url: '/api/pm/mbrs/saveSctrDrvLcnsDelInf',
    method: 'post'
  },
  {
    name: 'inqrMbrsRcvAgrmInfo',
    url: '/api/mbrs/v2/inqrMbrsRcvAgrmInfo',
    method: 'post'
  },
  {
    name: 'uptMbrsRcvAgrmInfo',
    url: '/api/mbrs/v2/uptMbrsRcvAgrmInfo',
    method: 'post'
  },
  {
    name: 'inqrCmnCdInfo',
    url: '/api/app/v2/inqrCmnCdInfo',
    method: 'post'
  },
  {
    name: 'inqrPageInfoS-driverLicense',
    url: '/api/app/v2/inqrPageInfoS-driverLicense',
    method: 'post'
  },
  {
    name: 'cardSmpcPymRgt',
    url: '/api/pym/v2/reqCardSmpcPymRgt',
    method: 'post'
  },
  {
    name: 'couponList',
    url: '/api/cpn/v2/inqrCpnBoxList',
    method: 'post'
  },
  {
    name: 'pastCouponList',
    url: '/api/cpn/v2/inqrPastCpnList',
    method: 'post'
  },
  {
    name: 'registCoupon',
    url: '/api/cpn/v2/reqKeyInpCpnIssu',
    method: 'post'
  },
  {
    name: 'inqrPsnCpnListBySvc',
    url: '/api/cpn/v2/inqrPsnCpnListBySvc',
    method: 'post'
  },
  {
    name: 'reqCpnGiftAct',
    url: '/api/cpn/v2/reqCpnGiftAct',
    method: 'post'
  },
  {
    name: 'cpnDtlInfo',
    url: '/api/cpn/v2/inqrCpnDtlInfo',
    method: 'post'
  },
  {
    name: 'categoryList',
    url: '/api/prd/v1/selectPrdCtgList.do',
    method: 'post'
  },
  {
    name: 'areaList',
    url: '/api/prd/v1/selectTotalAreaList.do',
    method: 'post'
  },
  {
    name: 'popularAreaList',
    url: '/api/prd/v1/selectAreaList.do',
    method: 'post'
  },
  {
    name: 'bestPrdList',
    url: '/api/prd/v1/selectBestPrdList.do',
    method: 'post'
  },
  {
    name: 'bannerList',
    url: '/api/prd/v1/selectEventBannerList.do',
    method: 'post'
  },
  {
    name: 'trvlMrnpList',
    url: '/api/mrnp/v1/selectMbrTrvlMrnpList.do',
    method: 'post'
  },
  {
    name: 'introPopup',
    url: '/api/mui/v2/inqrAdvrPupStupInf',
    method: 'post'
  },
  {
    name: 'trvlMrnpSync',
    url: '/api/pym/v1/requestTrvlMrnpSync.do',
    method: 'post'
  },
  {
    name: 'keywords',
    url: '/api/prd/v1/selectKeywords.do',
    method: 'post'
  },
  {
    name: 'prdPlanList',
    url: '/api/prd/v1/selectPrdPlanList.do',
    method: 'post'
  },
  {
    name: 'prdBannerList',
    url: '/api/prd/v1/selectPrdBanner.do',
    method: 'post'
  },
  {
    name: 'associateSrch',
    url: '/api/prd/v1/selectPrdSrchKwd.do',
    method: 'post'
  },
  {
    name: 'exhibitionList',
    url: '/api/prd/v1/selectPlanList.do',
    method: 'post'
  },
  {
    name: 'exhibitionDtl',
    url: '/api/prd/v1/selectPlanDtl.do',
    method: 'post'
  },
  {
    name: 'productList',
    url: '/api/prd/v1/selectTrvlPrdList.do',
    method: 'post'
  },
  {
    name: 'productDtl',
    url: '/api/prd/v1/selectTrvlPrdDtl.do',
    method: 'post'
  },
  {
    name: 'monthlyAlcn',
    url: '/api/prd/v1/selectMntlAlcnList.do',
    method: 'post'
  },
  {
    name: 'dailyAlcn',
    url: '/api/prd/v1/selectBydAlcnList.do',
    method: 'post'
  },
  {
    name: 'sats',
    url: '/api/prd/v1/selectRmnSatsList.do',
    method: 'post'
  },
  {
    name: 'trvlMrnpDtl',
    url: '/api/mrnp/v1/selectTrvlMrnpDtl.do',
    method: 'post'
  },
  {
    name: 'stplList',
    url: '/api/mbrs/v2/inqrStplList',
    method: 'post'
  },
  {
    name: 'userInfoList',
    url: '/api/mrnp/v1/selectTrvlMrnpDtlList.do',
    method: 'post'
  },
  {
    name: 'trvlPaymentDtl',
    url: '/api/pym/v1/selectTrvlPymDtl.do',
    method: 'post'
  },
  {
    name: 'trvlPymRecp',
    url: '/api/pym/v1/selectPymRecp.do',
    method: 'post'
  },
  {
    name: 'trvlCanc',
    url: '/api/pym/v1/selectTrvlCanc.do',
    method: 'post'
  },
  {
    name: 'taxiHistory',
    url: '/api/ondataxi/newCallHistoryV2',
    method: 'post'
  },
  {
    name: 'addMycall',
    url: '/api/ondataxi/addMyCallByCallKey',
    method: 'post'
  },
  {
    name: 'deleteMycall',
    url: '/api/ondataxi/deleteMyCall',
    method: 'post'
  },
  {
    name: 'paymentDetailKick',
    url: '/api/pm/cmn/inqrPmIntgRntHstDtlInf',
    method: 'post'
  },
  {
    name: 'trainHistory',
    url: '/api/r/cent/v1/selectTicketHisList',
    method: 'post'
  },
  {
    name: 'airplaneHistory',
    url: '/api/u/cent/v1/selectTicketHisList',
    method: 'post'
  },
  {
    name: 'carRentHistory',
    url: '/api/l/cent/v1/selectRsrvHisList',
    method: 'post'
  },
  {
    name: 'trvlHistory',
    url: '/api/mrnp/v1/selectRsrvHisList.do',
    method: 'post'
  },
  {
    name: 'reqCpnIssu',
    url: '/api/cpn/v2/reqCpnIssu',
    method: 'post'
  },
  {
    name: 'inqrTrblDsblDclrDtlInf',
    url: '/api/pm/cmn/inqrTrblDsblDclrDtlInf',
    method: 'post'
  },
  {
    name: 'saveTrblDsblDclrInf',
    url: '/api/pm/cmn/saveTrblDsblDclrInf',
    method: 'post'
  },
  {
    name: 'saveTrblDsblDclrDelInf',
    url: '/api/pm/cmn/saveTrblDsblDclrDelInf',
    method: 'post'
  },
  {
    name: 'inqrPmRntHstInf',
    url: '/api/pm/cmn/inqrPmRntHstInf',
    method: 'post'
  },
  {
    name: 'inqrStplListCarrierAgreement',
    url: '/api/mbrs/v2/inqrStplListCarrierAgreement',
    method: 'post'
  },
  {
    name: 'crtnMbrsLgtInfo',
    url: '/api/mbrs/v2/crtnMbrsLgtInfo',
    method: 'post'
  },
  {
    name: 'naverPayBillCreate',
    url: '/api/pym/npay/v1/billCreate',
    method: 'post'
  },
  {
    name: 'naverPayAutoReserve',
    url: '/api/pym/npay/v1/autoReserve',
    method: 'post'
  },
  {
    name: 'tossPayBillCreate',
    url: '/api/pym/toss/v2/billCreate',
    method: 'post'
  },
  {
    name: 'tossPayAutoReserve',
    url: '/api/pym/toss/v2/billingKeyAuth',
    method: 'post'
  },
  {
    name: 'reqPymPwdCfrm',
    url: '/api/pym/v2/reqPymPwdCfrm',
    method: 'post'
  },
  {
    name: 'requestTrvlPym',
    url: '/api/pym/v1/requestTrvlPym.do',
    method: 'post'
  },
  {
    name: 'notificationList',
    url: '/api/push/v2/inqrNtfcList',
    method: 'post'
  },
  {
    name: 'cfmRcvNtfcInfo1',
    url: '/api/push/v2/cfmRcvNtfcInfo1',
    method: 'post'
  },
  {
    name: 'cfmRcvNtfcInfo2',
    url: '/api/push/v2/cfmRcvNtfcInfo2',
    method: 'post'
  },
  {
    name: 'cfmRcvNtfcInfo3',
    url: '/api/push/v2/cfmRcvNtfcInfo3',
    method: 'post'
  },
  {
    name: 'savePmUserLnkgClrInf',
    url: '/api/pm/cmn/savePmUserLnkgClrInf',
    method: 'post'
  },
  {
    name: 'reqTrvlCpnVrfc',
    url: '/api/cmm/v1/requestTrvlCpnVrfc.do',
    method: 'post'
  },
  {
    name: 'uptMbrsAuthTknInfo',
    url: '/api/mbrs/v2/uptMbrsAuthTknInfo',
    method: 'post'
  },
  {
    name: 'reqMailMod',
    url: '/api/reqMailMod',
    method: 'post'
  },
  {
    name: 'reqPwdMod',
    url: '/api/reqPwdMod',
    method: 'post'
  },
  {
    name: 'reqWeightMod',
    url: '/api/reqWeightMod',
    method: 'post'
  },
  {
    name: 'reqPrntMbphNoMod',
    url: '/api/reqPrntMbphNoMod',
    method: 'post'
  }
];
