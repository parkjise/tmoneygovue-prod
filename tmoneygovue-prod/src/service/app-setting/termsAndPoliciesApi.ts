import { defHttpOpt } from '@/utils/http/axios';

enum Api {
  inqrStplList = '/api/mbrs/v2/inqrStplList'
}

import type { TermsInfo } from '@/service/terms/model/termsModel';
import type { ReqTermsInfo } from '@/service/terms/model/requestModel';
import type { CreateAxiosOptions } from '@/utils/http/axios/axiosTransform';

/**
 * @description: inqrStplListCarrierAgreement
 */
export const inqrStplListCarrierAgreement = (reqTermsInfo: ReqTermsInfo): Promise<TermsInfo> => {
  const opts: Partial<CreateAxiosOptions> = {
    requestOptions: {
      withToken: false
    }
  };
  return defHttpOpt(opts).post({
    url: Api.inqrStplList,
    params: {
      svcDvsCd: reqTermsInfo.SvcDvsCd,
      stplGrpCd: reqTermsInfo.StplGrpCd
    }
  });
};
