import { defHttp, defHttpOpt, travelHttpOpt } from '@/utils/http/axios';
import type { HellowModel } from '@/service/sample/model/helloWorldModel';

enum Api {
  GetHellowWorld = '/api/sample/hello'
}

/**
 * @description: getHellowText
 */

export const getHellowText = (): Promise<HellowModel> => {
  return defHttp.get<HellowModel>({ url: Api.GetHellowWorld });
};
/**
 * @description: getHellowTextOpt
 * defHttpOpt(axois request option 재정의)
 */
export const getHellowTextOpt = (): Promise<HellowModel> => {
  return defHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({
    url: Api.GetHellowWorld
  });
};

export const reqError = (travelApiUrl: string): Promise<any> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: travelApiUrl
  });
};
