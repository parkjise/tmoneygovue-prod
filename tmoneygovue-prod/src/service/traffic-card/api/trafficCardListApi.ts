import { defHttp } from '@/utils/http/axios';
import type { TrafficCardListmodel } from '@/service/traffic-card/model/trafficCardModel';

enum Api {
  trafficCardList = '/api/mbrs/v2/inqrMbrsTrcrNoList'
}

export const getTrafficCardList = (trcrDvsCd: string): Promise<TrafficCardListmodel> => {
  return defHttp.post({
    url: Api.trafficCardList,
    data: {
      trcrDvsCd: trcrDvsCd
    }
  });
};
