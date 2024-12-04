// import type { CallBackFunction } from '.';

// NativeToWeb interFace 구현부
export const EmulatorDevice = {
  deviceInfo: function (param: any) {
    return BrowserTest.deviceInfo(param);
  },
  getAuthInfo: function () {
    return BrowserTest.getAuthInfo();
  },
  updateAuthTknInfo: function () {
    return BrowserTest.updateAuthTknInfo();
  },
  openLoginPage: function () {
    return BrowserTest.openLoginPage();
  },
  terminateApp: function () {
    return BrowserTest.terminateApp();
  },
  logoutClearTGoData: function () {
    return BrowserTest.logoutClearTGoData();
  },
  showTabbar: function (param: any) {
    return BrowserTest.showTabbar(param);
  },
  shareRsrvInfo: function (param: any) {
    return BrowserTest.shareRsrvInfo(param);
  },
  downloadReceiptImg: function (param: any) {
    return BrowserTest.shareRsrvInfo(param);
  },
  removeMemberData: function () {
    return BrowserTest.removeMemberData();
  }

  /* add function */
};
const BrowserTest = {
  deviceInfo: async (param: any) => {
    return {
      osCd: 'A',
      uuid: '5127e8f0-b19d-4235-bfca-a621ff1e149c',
      requstId: param.requstId,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  // 비로그인 상태
  // authInfo: async () => {
  //   return {
  //     token: '',
  //     appCode: 'MIC',
  //     osKnd: 'A',
  //     osVer: '11.0.0',
  //     appVer: '1.0.0',
  //     mbrNm: '',
  //     response: {
  //       code: '0000',
  //       message: 'OK'
  //     }
  //   };
  // },
  // 로그인 상태
  getAuthInfo: async () => {
    return {
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDQxMjAwMDAwMDAyODg1NiIsImlhdCI6MTcxODM1NjMwOCwiZXhwIjoxNzE4NDQyNzA4fQ.OkJeiBgvAueQHaMhTJPmQKKxEdDUWsyEmjUCebQ9FDI',
      uuid: 'f383a6e4-4a03-49ae-9a92-05e5257983b7',
      appCode: 'MIC',
      osKnd: 'A',
      osVer: '34',
      appVer: '2.3.9',
      appVerCode: '883',
      mbrNm: '최세훈',
      moappMbrsSno: '20240412000000028856',
      mbrBrdt: '20240101',
      mbrphNo: '01030240516',
      ondaAuthToken: 'pvKgZ4ohwG171hRHQoFM6UBTp9i84Z295RKXK49fw1vX3Rt3V2',
      genderCode: 'M',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  updateAuthTknInfo: async () => {
    return {
      token:
        'neweyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDI0MDQxNjAwMDAwMDAyODk4NiIsImlhdCI6MTcxMzQzMTc3OCwiZXhwIjoxNzEzNTE4MTc4fQ.R-mhBUxfrXrIsEGMeZSZBh82y13TkI64AU1lI5UFVQI',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  openView: async (param: any) => {
    param.url;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  openLoginPage: async () => {
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  terminateApp: async () => {
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  logoutClearTGoData: async () => {
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  showTabbar: async (param: any) => {
    param.isShow;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  shareRsrvInfo: async (param: any) => {
    param.imgData;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  downloadReceiptImg: async (param: any) => {
    param.imgData;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  removeMemberData: async () => {
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  }
};
