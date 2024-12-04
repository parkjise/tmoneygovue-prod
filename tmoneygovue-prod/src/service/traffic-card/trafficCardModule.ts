import { defineStore } from 'pinia';
import type { TrafficCardModel } from '@/service/traffic-card/model/trafficCardModel';
import { getTrafficCardList } from '@/service/traffic-card/api/trafficCardListApi';

interface cardsState {
  trafficCardNoList: TrafficCardModel[];
}

export const useTrafficCardListStore = defineStore({
  id: 'trafficCardListStore',

  state: (): cardsState => ({
    trafficCardNoList: []
  }),
  getters: {
    getCardList(): TrafficCardModel[] {
      return this.trafficCardNoList;
    }
  },
  actions: {
    async actionHttpTrafficCardList(data: string) {
      this.trafficCardNoList = [];

      const res = await getTrafficCardList(data);
      if (res) {
        if (res.trcrNoList) {
          this.trafficCardNoList = res.trcrNoList;
        }
      }
      return res;
    }
  }
});
