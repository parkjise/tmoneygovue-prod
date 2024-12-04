// NativeToWeb interFace 구현부
export const UtilNativeToWeb = {
  backWebView: () => {
    window.dispatchEvent(new CustomEvent('backWebView'));
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  /* add function */
  /**
   * @description 입력키패드 value 할당
   * @param inputFieldId input필드 아이디
   * @param inputValue 입력값
   */
  inputEncKeypad: (param: any) => {
    window.dispatchEvent(
      new CustomEvent('inputEncKeypad', {
        detail: {
          inputFieldId: param.inputFieldId,
          inputValue: param.inputValue
        }
      })
    );
    return {
      response: {
        code: '0000',
        message: 'Ok'
      }
    };
  },
  /**
   * @description 약관동의 화면 이동
   * @param svcDvsCd 서비스 구분 코드
   * @param stplGrpCd 이용약관 구분 코드
   * @param linkUrl 동의 후 이동 tia open link
   */
  openTermPage: (param: any) => {
    window.dispatchEvent(
      new CustomEvent('openTermPage', {
        detail: {
          svcDvsCd: param.svcDvsCd,
          stplGrpCd: param.stplGrpCd,
          linkUrl: param.linkUrl
        }
      })
    );
    return {
      response: {
        code: '0000',
        message: 'Ok'
      }
    };
  },
  /**
   * @description 인증데이터 로드
   * @returns
   */
  loadAuthInfo: () => {
    window.dispatchEvent(new CustomEvent('loadAuthInfo'));
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  /**
   * @description 웹뷰 이동
   * @returns
   */
  moveWebView: (param: any) => {
    window.dispatchEvent(
      new CustomEvent('moveWebView', {
        detail: {
          url: param.url
        }
      })
    );
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  /**
   * @description 화면 진입 알림
   * @returns
   */
  onResume: () => {
    window.dispatchEvent(
      new CustomEvent('onResume',{})
    )
  }
};
