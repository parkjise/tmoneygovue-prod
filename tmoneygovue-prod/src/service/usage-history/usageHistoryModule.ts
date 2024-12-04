import { defineStore } from 'pinia';
import type {
  PublicTransportModel,
  RequestPublicTransportHistoryModel
} from '@/service/usage-history/model/publicTransportModel';
import {
  getPublicTransportHistory,
  getBusHistory,
  getTaxiHistory,
  addMyCall,
  deleteMyCall,
  getBicycleVoucherHistory,
  getBikeScooterHistory,
  getBikeScooterHistoryDetail,
  getTrainHistoryList,
  getAirplaneHistoryList,
  getCarRentHistoryList,
  getTrvlHistoryList
} from '@/service/usage-history/api/usageHistoryApi';
import type { BusHistoryModel, ReqBusHistoryModel } from '@/service/usage-history/model/busHistoryModel';
import type { ReqTaxiHistoryModel, TaxiHistoryModel } from '@/service/usage-history/model/taxiHistoryModel';
import type { ReqMyCallModel, ResMyCallModel } from '@/service/usage-history/model/taxiModel';
import type {
  BicycleVoucherHistoryModel,
  BikeScooterDetailModel,
  BikeScooterDtaModel,
  ReqBicycleVoucherHistoryModel,
  ReqBikeScooterDetailModel,
  ReqBikeScooterModel
} from '@/service/usage-history/model/bikeScooterModel';
import type { ReqTrainHistoryModel, TrainHistoryModel } from '@/service/usage-history/model/trainHistoryModel';
import type { AirplaneHistoryModel, ReqAirplaneHistoryModel } from '@/service/usage-history/model/airplaneModel';
import type {
  CarRentalHistoryModel,
  ReqCarRentalHistoryModel
} from '@/service/usage-history/model/carRentalHistoryModel';
import type { TrvlHistoryModel } from '@/service/usage-history/model/travelHistoryModel';

interface usageHistoryState {
  publicTransportHistoryList: PublicTransportModel[];
  busHistoryList: BusHistoryModel[];
  taxiHistoryList: TaxiHistoryModel[];
  myCall: ResMyCallModel;
  bikeScooterDta: BikeScooterDtaModel;
  bicycleVoucherHistoryList: BicycleVoucherHistoryModel[];
  bikeScooterHistoryDetail: BikeScooterDetailModel;
  trainHistoryList: TrainHistoryModel[];
  airplaneList: AirplaneHistoryModel[];
  carRentList: CarRentalHistoryModel[];
  trvlList: TrvlHistoryModel[];

  isLast: boolean;
  setIsLinked: boolean; // 서비스동의여부 조회여부

  //여행용 파라미터 저장용
  travelShow: boolean;
  inqrMonth: string;
  trvlMrsStaCd: string;
  trvlMrnpSno: string;
  trvlMrnpCancSqno?: string;
}

export const useUsageHistoryStore = defineStore({
  id: 'useUsageHistoryStore',

  state: (): usageHistoryState => ({
    publicTransportHistoryList: [],
    busHistoryList: [],
    taxiHistoryList: [],
    myCall: {} as ResMyCallModel,
    bikeScooterDta: {} as BikeScooterDtaModel,
    bikeScooterHistoryDetail: {} as BikeScooterDetailModel,
    bicycleVoucherHistoryList: [],
    trainHistoryList: [],
    airplaneList: [],
    carRentList: [],
    trvlList: [],

    isLast: false,
    setIsLinked: false,

    //여행용 파라미터 저장용
    travelShow: false,
    inqrMonth: '',
    trvlMrsStaCd: '',
    trvlMrnpSno: ''
  }),

  getters: {
    getPublicTransportHistory(): PublicTransportModel[] {
      return this.publicTransportHistoryList;
    },
    getBusHistory(): BusHistoryModel[] {
      return this.busHistoryList;
    },
    getTaxiHistory(): TaxiHistoryModel[] {
      return this.taxiHistoryList;
    },
    getMyCall(): ResMyCallModel {
      return this.myCall;
    },
    getBikeScooterDta(): BikeScooterDtaModel {
      return this.bikeScooterDta;
    },
    getBikeScooterHistoryDetail(): BikeScooterDetailModel {
      return this.bikeScooterHistoryDetail;
    },
    getBicycleVoucherHistoryList(): BicycleVoucherHistoryModel[] {
      return this.bicycleVoucherHistoryList;
    },
    getTrainHistory(): TrainHistoryModel[] {
      return this.trainHistoryList;
    },
    getCarRentHistoryList(): CarRentalHistoryModel[] {
      return this.carRentList;
    },
    getAirplaneHistoryList(): AirplaneHistoryModel[] {
      return this.airplaneList;
    },
    getTrvlHistoryList(): TrvlHistoryModel[] {
      return this.trvlList;
    },
    getTrvlShow(): boolean {
      return this.travelShow;
    },
    getTrvlMrsStaCd(): string {
      return this.trvlMrsStaCd;
    },
    getTrvlMrnpSno(): string {
      return this.trvlMrnpSno;
    },
    getTrvlMrnpCancSqno(): string {
      return this.trvlMrnpCancSqno ?? '';
    },
    getInqrMonth(): string {
      return this.inqrMonth;
    }
  },
  actions: {
    /**
     * 대중교통 이용내역 목록 조회 Action
     * @param isNew
     * @param data
     */
    async actionHttpPublicTransportHistoryList(isNew: boolean, data: RequestPublicTransportHistoryModel) {
      const res = await getPublicTransportHistory(data);
      if (res) {
        if (res.pbtrList) {
          if (isNew) {
            this.publicTransportHistoryList = res.pbtrList;
            this.isLast = false;
          } else {
            this.publicTransportHistoryList.push(...res.pbtrList);
            if (res.pbtrList.length <= 0) {
              this.isLast = true;
            }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 버스 이용내역 목록 조회 Action
     * @param isNew
     * @param data
     */
    async actionHttpBusHistoryList(isNew: boolean, data: ReqBusHistoryModel) {
      const res = await getBusHistory(data);
      if (res) {
        if (res.busUtlzList) {
          if (isNew) {
            this.busHistoryList = res.busUtlzList;
            // this.isLast = false; 버스는 페이징이 존재하지 않아 한번만 조회 하면 됨
            this.isLast = true;
          } else {
            this.busHistoryList.push(...res.busUtlzList);
            if (res.busUtlzList.length <= 0) {
              this.isLast = true;
            }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 택시 이용내역 목록 조회 Action
     * @param isNew
     * @param data
     */
    async actionHttpTaxiHistoryList(isNew: boolean, data: ReqTaxiHistoryModel) {
      const res = await getTaxiHistory(data);
      if (res) {
        if (res.callHistoryInfoList) {
          if (isNew) {
            this.taxiHistoryList = res.callHistoryInfoList;
            this.isLast = false;
          } else {
            this.taxiHistoryList.push(...res.callHistoryInfoList);
            if (res.callHistoryInfoList.length <= 0) {
              this.isLast = true;
            }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 택시 즐겨찾기 추가 Action
     * @param data
     * @param index
     */
    async actionHttpAddMyCall(data: ReqMyCallModel, index: number) {
      this.myCall = {} as ResMyCallModel;
      const res = await addMyCall(data);
      if (res) {
        this.myCall = res;
        this.taxiHistoryList[index].isMyCall = 'Y';
      }
      return res;
    },
    /**
     * 택시 즐겨찾기 제거 Action
     * @param data
     * @param index
     */
    async actionHttpDeleteMyCall(data: ReqMyCallModel, index: number) {
      this.myCall = {} as ResMyCallModel;
      const res = await deleteMyCall(data);
      if (res) {
        this.myCall = res;
        this.taxiHistoryList[index].isMyCall = 'N';
      }
      return res;
    },
    /**
     * 공공자전거(따릉이 & 타슈) | 자전거/킥보드 이용내역 조회
     * @param isNew
     * @param data
     */
    async actionHttpBikeScooterList(isNew: boolean, data: ReqBikeScooterModel) {
      const res = await getBikeScooterHistory(data);
      if (res) {
        if (isNew) {
          this.bikeScooterDta = res;
          this.isLast = false;
        } else {
          if (res.data.dtl.length > 0) {
            this.bikeScooterDta.data.dtl.push(...res.data.dtl);
            if (res.data.dtl.length <= 0) {
              this.isLast = true;
            }
          } else {
            this.isLast = true;
          }
        }
      }
      return res;
    },
    /**
     * 공공자전거 이용권 결제내역 조회
     * @param data
     */
    async actionHttpBicycleVoucherHistoryList(data: ReqBicycleVoucherHistoryModel) {
      const res = (await getBicycleVoucherHistory(data)).data;
      if (res) {
        if (res.dtl) {
          this.bicycleVoucherHistoryList = res.dtl;
        }
      }
      return res;
    },
    /**
     * 킥보드 이용내역 상세 <- 브릿지 호출 예정
     * @param data
     */
    async actionHttpBikeScooterHistoryDetail(data: ReqBikeScooterDetailModel) {
      this.bikeScooterHistoryDetail = {} as BikeScooterDetailModel;

      const res = await getBikeScooterHistoryDetail(data);
      if (res) {
        if (res.data) {
          this.bikeScooterHistoryDetail = res.data;
        }
      }
      return res;
    },
    /**
     * 기차 이용내역 목록 조회
     * @param isNew
     * @param pageNo
     */
    async actionHttpTrainHistoryList(isNew: boolean, data: ReqTrainHistoryModel) {
      const res = await getTrainHistoryList(data);
      if (res) {
        if (res.jrnyList) {
          if (isNew) {
            this.isLast = false;
            this.trainHistoryList = res.jrnyList;
          } else {
            this.trainHistoryList.push(...res.jrnyList);
            //테스트용 너무 많이 호출 안하도록
            // if (this.trainHistoryList.length > 20) {
            //   this.isLast = true;
            // }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 항공 이용내역 목록 조회
     * @param isNew
     * @param pageNo
     */
    async actionAirplaneHistoryList(isNew: boolean, data: ReqAirplaneHistoryModel) {
      const res = await getAirplaneHistoryList(data);
      if (res) {
        if (res.jrnyList) {
          if (isNew) {
            this.isLast = false;
            this.airplaneList = res.jrnyList;
          } else {
            this.airplaneList.push(...res.jrnyList);
            //테스트용 너무 많이 호출 안하도록
            // if (this.airplaneList.length > 20) {
            //   this.isLast = true;
            // }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 렌트카 이용내역 목록 조회
     * @param isNew
     * @param pageNo
     */
    async actionCarRentHistoryList(isNew: boolean, data: ReqCarRentalHistoryModel) {
      const res = await getCarRentHistoryList(data);
      if (res) {
        if (res.resevList) {
          if (isNew) {
            this.isLast = false;
            this.carRentList = res.resevList;
          } else {
            this.carRentList.push(...res.resevList);
            //테스트용 너무 많이 호출 안하도록
            // if (this.carRentList.length > 20) {
            //   this.isLast = true;
            // }
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    /**
     * 여행 이용내역 목록 조회
     * @param isNew
     * @param pageNo
     */
    async actionTrvlHistoryList(isNew: boolean, inqrMonth: string) {
      const res = await getTrvlHistoryList(inqrMonth);
      if (res) {
        if (res) {
          if (isNew) {
            this.isLast = false;
            this.trvlList = res;
          } else {
            this.trvlList.push(...res);
          }
        } else {
          this.isLast = true;
        }
      }
      return res;
    },
    async setInqrMonth(inqrMonth: string) {
      this.inqrMonth = inqrMonth;
    },
    // 서비스동의여부 조회 여부. 이용내역 진입시 1회만
    setIsLinkedValue() {
      this.setIsLinked = true;
    }
  }
});
