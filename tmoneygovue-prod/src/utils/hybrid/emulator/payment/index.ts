// EmulatorPayment interFace 구현부
export const EmulatorPayment = {
  getOtherAppVersionList: function () {
    return BrowserTest.getOtherAppVersionList();
  },
  decScsYn: function (param: any) {
    return BrowserTest.decScsYn(param);
  },
  getCardList: function () {
    return BrowserTest.getCardList();
  },
  readOCR: function () {
    return BrowserTest.readOCR();
  },
  registCard: function (param: any) {
    return BrowserTest.registCard(param);
  },
  changeNickNameCard: function (param: any) {
    return BrowserTest.registCard(param);
  },
  updateCard: function (param: any) {
    return BrowserTest.registCard(param);
  },
  getPreviousPaymentType: function () {
    return BrowserTest.getPreviousPaymentType();
  },
  registPreviousPaymentType: function (param: any) {
    return BrowserTest.registPreviousPaymentType(param);
  },
  requestGeneralPay: function (param: any) {
    return BrowserTest.requestGeneralPay(param);
  },
  getCardGeneralPayment: function (param: any) {
    return BrowserTest.getCardGeneralPayment(param);
  },
  sendCardGeneralPayment: function (param: any) {
    return BrowserTest.sendCardGeneralPayment(param);
  }
};
const BrowserTest = {
  getOtherAppVersionList: async () => {
    return {
      appState: 'Y',
      versionList: [
        {
          packageFieldName: 'TMONEY_PAY_APP_PKG_NAME',
          packageName: 'com.tmoney.tmpay',
          version: '2.0.0'
        },
        {
          packageFieldName: 'MOBILE_TMONEY_APP_PKG_NAME',
          packageName: 'com.lgt.tmoney',
          version: '2.0.0'
        }
      ],
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  decScsYn: async (param: any) => {
    param;
    return {
      encScsYn: 'Y',
      encDtm: '...',
      decScsYn: '...',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  getCardList: async () => {
    return {
      response: {
        code: '0000',
        message: 'OK'
      },
      smpcPymList: [
        {
          cardDecDat4: '4900',
          cardSecLen4: '4',
          cardDecDat1: '5137',
          cardSecDat3:
            'E75BD6275642973946B52434738D8F68D198EAB4C971FBF356543F00557BFD57B629B8241348467E59C5DACF4F0E77246BF857DFB8D3286E6C4BCC5A90E4A0AD',
          cardSecLen1: '4',
          cardCode: '368',
          cardSecDat:
            'ECC89E45407E2AF69A8CA0EA573031B00B7EEECA59CC9F28827FD8075EA9C43FC279DE24700E21B44937025891E385DF9863AD211667B86E623F41ADBD336B16',
          cardSecLen2: '4',
          cardName: '롯데카드',
          cardCIImageWhite: '/resources/images/ci/img_lottecard_logo_wh.png',
          cardSecLen3: '4',
          rprnCardYn: 'N',
          cardSecDat2:
            'ECBC212F459519C6E0D6D3E43F03D459119EE82A5D22E16D43A6971095C525AD390596301FB3427A2EF2BCE6AEE448F9A8599E52B2028ADC6EBE9259344B2052',
          cardSecDat4:
            '6B27A3586A7F13E930CCB371C542A212C635C305CA279DF05B06D6DBFF6B421BBDE942C61A3CCEA01AEBCA698D61E6867EF4A8A01C2CF91AEA263B2540111157',
          pKey: '1A51C506-6419-4971-81E9-2EB186807BC0',
          cardNickName: ''
        },
        {
          cardSecDat1:
            'CBF781B3D498C048B0C3E0BE0E325EB2D20F40F049BD39998C2EED2907BDD622014B4C84BB3DEB3AE61D4EB6ECA7CDF6DF8EA50E57C24BEB4BF9530352D2E1E3',
          cardCIImageWhite: '/resources/images/ci/img_wooricard_logo_wh.png',
          cardDecDat1: '4902',
          pKey: '3721705C-6F4F-42EF-B912-49C59FC638C9',
          cardDecDat4: '2035',
          cardSecLen2: '4',
          cardCode: '41',
          cardSecDat3:
            'C58C49E9C03477F756E190CAFB001CB7216A89B48D74F19348116624A3D420987F6972ADF213043CEDFDF75AC7C527FE5DEDB7A488618876460AC48CB876C5F6',
          cardSecDat4:
            '3CCE0A32834C9FD31C6EFF8DA57198B64C65E3B2D9FAB8968C24EEDF087E65FEF832067B3E70C645235F2A503B4005A8421A88C45D77C3E60E4660516AD992BB',
          cardNickName: '',
          cardSecDat2:
            'EE8E810D072797FAED13684D697A9F3635136625899FA4C036166C18857AEEC3977C442143E4C41ACD244E7975CF55633984A6D9B6DE13ED9174343549279036',
          cardSecLen4: '4',
          cardSecLen1: '4',
          cardName: '우리일반체크',
          cardSecLen3: '4',
          rprnCardYn: 'N'
        }
      ]
    };
  },
  readOCR: async () => {
    return {
      cardNum1: '9490',
      cardNum2: '1389',
      cardNum3: '2493',
      cardNum4: '9586',
      encCardNum1:
        'adcafcfd62643e9767bcd0e85f0ef1b6846537f6da5e3d12a882536f8035609292b2b80577a0370ae1d6005755785b6ebf5144f59adc7c9ceeb16101beaae8d8',
      encCardNum2:
        'e904f9f01fb5b400d1af2e874370637b034083e868749cc361e5bb80ebc86e8480014d905e0e9eaccbdee66d68ac13754f78e2a88f021fef5edd8c655fdadcbe',
      encCardNum3:
        'b27e073254bd10681b33443c8e72f3ca44f23e9c23e20b629df972e44b148bc8d764a7e1ce57ea10c37fee10f106d09305e8c341fad47e4fb9a5acfbbf6c1661',
      encCardNum4:
        '9b2a64d03ac2652f782cb72745435444792fef6dc252d3ac54b895b28415ed80dccdd3927405f573d94467f7e1724f2433745e1b25df68adc4c418501713e330',
      exdt: '0428',
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  registCard: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  changeNickNameCard: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  updateCard: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  getPreviousPaymentType: async () => {
    return {
      paymentType: 12,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  registPreviousPaymentType: async (param: any) => {
    param.pamentType;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  requestGeneralPay: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      },
      result: 'success',
      oderSno: '20220901130112345678',
      moappMbrsSno: '20221212000000001234',
      billAuthData: '{"card":"1234567890123456", "auth":""}',
      amount: 15000,
      spreadOut: '00',
      message: '정상처리되었습니다.'
    };
  },
  getCardGeneralPayment: async (param: any) => {
    param;
    return {
      isInstallment: true,
      paymentAmount: 55000,
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  },
  sendCardGeneralPayment: async (param: any) => {
    param;
    return {
      response: {
        code: '0000',
        message: 'OK'
      }
    };
  }
};
