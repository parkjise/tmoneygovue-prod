// EmulatorEtc interFace 구현부
export const EmulatorEtc = {
  getLocaleInfo: function (param: any) {
    return BrowserTest.getLocaleInfo(param);
  },
  openView: function (param: any) {
    return BrowserTest.openView(param);
  },
  showToast: function (param: any) {
    return BrowserTest.showToast(param);
  },
  openEncKeypad: function (param: any) {
    return BrowserTest.openEncKeypad(param);
  },
  closeEncKeypad: function (param: any) {
    return BrowserTest.closeEncKeypad(param);
  },
  getReportDisabilityBikeInfo: function (param: any) {
    return BrowserTest.getReportDisabilityBikeInfo(param);
  },
  openContact: function (param: any) {
    return BrowserTest.openContact(param);
  },
  encSeoulBikePassword: function (param: any) {
    return BrowserTest.encSeoulBikePassword(param);
  },
  closeWebView: function (param: any) {
    return BrowserTest.closeWebView(param);
  },
  callIdentityVerify: function (param: any) {
    return BrowserTest.callIdentityVerify(param);
  },
  getPrsnAuthInfo: function (param: any) {
    return BrowserTest.getPrsnAuthInfo(param);
  },
  readyForMoveWebView: function (param: any) {
    return BrowserTest.readyForMoveWebView(param);
  },
  shareKakaoTalk: function (param: any) {
    return BrowserTest.shareKakaoTalk(param);
  },
  shareLink: function (param: any) {
    return BrowserTest.shareLink(param);
  },
  getAppMode: function (param: any) {
    return BrowserTest.getAppMode(param);
  },
  callAppPreference: function (param: any) {
    return BrowserTest.callAppPreference(param);
  },
  sendAdbrix: function (param: any) {
    return BrowserTest.sendAdbrix(param);
  },
  resetBadgeCount: function (param: any) {
    return BrowserTest.resetBadgeCount(param);
  },
  setBadgeCount: function (param: any) {
    return BrowserTest.setBadgeCount(param);
  }
};
const BrowserTest = {
  getLocaleInfo: async (param: any) => {
    param;
    return {
      localeType: 'ko',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  openView: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  showToast: async (param: any) => {
    param.message;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  openEncKeypad: async (param: any) => {
    param;
    return {
      encInputValue: 'AALCsnfE4Z7/GZAWWqHJv2Yk',
      encHmac: 'a3eOQye06rZRe81ZhFaROY8a6G4xwvtdHA/AUcUvfkqBsEdEXWkR+6H12rCLJ2t4hZ+lFWTlf9dlltVmtl5h9g==',
      encToken: 'AABC1A==',
      encValKb: 'a3eOQye06rZRe81ZhFaROY8a6G4xwvtdHA/AUcUvfkqBsEdEXWkR+6H12rCLJ2t4hZ+lFWTlf9dlltVmtl5h9g==',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  closeEncKeypad: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  getReportDisabilityBikeInfo: async (param: any) => {
    param;
    return {
      bicycleNumber: '22B00862',
      utlzSvcDvsCd: 'D',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  openContact: async (param: any) => {
    param;
    return {
      phoneNumber: '01012341234',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  encSeoulBikePassword: async (param: any) => {
    param;
    return {
      cipherOldPw: 'dfasgeqrhdfsgsd212',
      cipherNewPw: 'sadfafgab23r11241',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  closeWebView: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  callIdentityVerify: async (param: any) => {
    param;
    return {
      prntAuthSno: '20201124114323000001',
      prsnAuthResult : {
        prntAuthSno: '20201124114323000001',
        prsnAuthSno: '20241126000000032226',
        ageDvsCd: '1',
        joinYn: 'N', // 기존 회원 유무,
        tGo1Yn : 'N', // 티머니GO 약관 동의 필요여부
        gndrCd: 'M',
        prsnAuthScsYn: 'Y',
        method: 'prsnAuthResult',
        mbphNo: '01092352224',
        userBrdt: '19860111',
        frndInvnTgtYn: 'N',
        userNm: '곽현준',
        drmbYn: 'N',
        moappMbrsSno: '20240507000000029667',
        authTkn: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDUwNzAwMDAwMDAyOTY2NyIsImlhdCI6MTczMjYwNzU4MSwiZXhwIjoxNzMyNjkzOTgxfQ.VmIouX6ogu3rkKClSuMJ-JOvTp-I7d5UqwR6qvJfn3g',
        message: '본인인증을 성공하였습니다.',
      },
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  getPrsnAuthInfo: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  readyForMoveWebView: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  shareKakaoTalk: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  shareLink: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  getAppMode: async (param: any) => {
    param;
    return {
      isDebugAppMode: true,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  callAppPreference: async (param: any) => {
    param;
    return {
      isDebugAppMode: true,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  sendAdbrix: async (param: any) => {
    param;
    return {
      isDebugAppMode: true,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  resetBadgeCount: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  setBadgeCount: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  }
};
