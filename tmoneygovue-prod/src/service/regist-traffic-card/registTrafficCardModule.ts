import { defineStore } from 'pinia';
import type {
  bannerInfo,
  stplInfo,
  ResponseCardBinInfo,
  ResponseRegisterTmoneyPayCardNo,
  ResponseTmoneyPayCardNo,
  ResquestRegisterCardNo,
  ResponseRegisterCardNo,
  ResponseRegisteredTrCardList,
  ResponseRegisteredCardInfo,
  ResponseNotesInfo,
  ResponseCreditNotesInfo,
  RefundCardInfoModel,
  RequestMemberStat,
  MissionInfo,
  EvntBnftPlusInfo
} from './model/registTrafficCardModel';
import {
  getRegisteredTrafficCardMain,
  getRegistTrCardList,
  getInqrCardBinInfo,
  getTmoneyPayCard,
  getRegisterTmoneyCardNo,
  getRegisterTmoneyPayCardNo,
  getRemoveCardNo,
  getRegisterCreditCardNo,
  getTmoneyNotes,
  getCreditNotes,
  getRegisteredTrafficCardCnt,
  getMemberStat,
  inqrEvntBnftPlusInfo,
  asIsGetRegisterTmoneyPayCardNo,
  asIsGetRegisterTmoneyCardNo,
  asIsGetTmoneyPayCard,
  asIsGetInqrCardBinInfo
} from './registTrafficCardApi';

const initNotesInfo = {
  rspCd: '',
  rspTtl: '',
  rspMsg: '',
  data: { unslMttr: '' }
};
const initRegisteredTrafficCnt = {
  prcrCnt: 0,
  dpcCnt: 0,
  scsYn: '',
  msg: ''
};
const initRegisterdTrafficCardList = {
  trcrNoList: []
};
const initTmoneyCardCnt = {
  tmpyRgtCnt: '',
  tmpyRgtYn: ''
};
const initRegistTmoneyPayCardInfo = {
  msg: '',
  rgtYn: ''
};
const initCardBinInfo = {
  issurCd: '',
  cardName: '',
  cardImgPath: '',
  path2: '',
  crpcId: '',
  checkCardYN: '',
  cprtCardYN: '',
  crpcNm: '',
  rspCd: '',
  rspMsg: '',
  crcmCd: '',
  approvalOrgCd: ''
};
const initCreditCardNotesInfo = {
  rspCd: '',
  rspTtl: '',
  rspMsg: '',
  data: { rollingBnrList: [] as bannerInfo[], stplList: [] as stplInfo[], unslMttr: '' }
};
const initRegisterCardNo = {
  scsYn: '',
  encScsYn: '',
  encDtm: '',
  msg: ''
};
const initEvntCtt = {
  extLinkImgSection: '',
  shareLinkSection: '',
  trCardPop: '',
  missionList: []
};

interface registTrafficCardState {
  mainNotesInfo: ResponseNotesInfo;
  registeredTrafficCnt: ResponseRegisteredCardInfo;
  tmoneyNotesInfo: ResponseNotesInfo;
  registeredTrafficCardList: ResponseRegisteredTrCardList;
  tmoneyCardCnt: ResponseTmoneyPayCardNo;
  registTmoneyPayCardInfo: ResponseRegisterTmoneyPayCardNo;
  registTmoneyCardInfo: ResponseRegisterCardNo;
  creditCardNotesInfo: ResponseCreditNotesInfo;
  cardBinInfo: ResponseCardBinInfo;
  registCreditCardInfo: ResponseRegisterCardNo;
  evntCtt: EvntBnftPlusInfo;
}

export const useRegistTrafficCardStore = defineStore({
  id: 'use-regist-traffic-card-store',
  state: (): registTrafficCardState => ({
    // 교통카드 등록/변경 메인 유의사항
    mainNotesInfo: initNotesInfo,
    // 등록된 교통카드 개수
    registeredTrafficCnt: initRegisteredTrafficCnt,
    // 티머니 유의사항
    tmoneyNotesInfo: initNotesInfo,
    // 등록된 교통카드 목록
    registeredTrafficCardList: initRegisterdTrafficCardList,
    // 등록된 티머니 교통카드 개수
    tmoneyCardCnt: initTmoneyCardCnt,
    // 티머니페이카드 정보
    registTmoneyPayCardInfo: initRegistTmoneyPayCardInfo,
    // 티머니카드 정보
    registTmoneyCardInfo: initRegisterCardNo,
    // 신용(체크)카드 유의사항
    creditCardNotesInfo: initCreditCardNotesInfo,
    // 카드Bin 정보
    cardBinInfo: initCardBinInfo,
    // 신용(체크)카드 등록
    registCreditCardInfo: initRegisterCardNo,
    // 대중교통 챌린지
    evntCtt: initEvntCtt
  }),
  getters: {
    // 교통카드 등록/변경 메인 유의사항
    getMainNotesInfo(): string {
      return this.mainNotesInfo.data.unslMttr;
    },
    // 등록된 교통카드 개수
    getRegisteredTrafficCnt(): ResponseRegisteredCardInfo {
      return this.registeredTrafficCnt;
    },
    // 티머니 유의사항
    getTmoneyNotesInfo(): string {
      return this.tmoneyNotesInfo.data.unslMttr;
    },
    // 등록된 교통카드 목록
    getRegisteredTrafficCardList(): RefundCardInfoModel[] {
      return this.registeredTrafficCardList.trcrNoList;
    },
    // 등록된 티머니 교통카드 개수
    getTmoneyCardCnt(): ResponseTmoneyPayCardNo {
      return this.tmoneyCardCnt;
    },
    // 티머니페이카드 정보
    getRegistTmoneyCardInfo(): ResponseRegisterCardNo {
      return this.registTmoneyCardInfo;
    },
    // 신용(체크)카드 등록 배너
    getCreditCardBanner(): bannerInfo[] {
      return this.creditCardNotesInfo.data.rollingBnrList;
    },
    // 신용(체크)카드 등록 약관 목록
    getCreditCardStplList(): stplInfo[] {
      return this.creditCardNotesInfo.data.stplList;
    },
    // 신용(체크)카드 등록 유의사항
    getCreditCardNotesInfo(): string {
      return this.creditCardNotesInfo.data.unslMttr;
    },
    // 카드Bin 정보
    getCardBinInfo(): ResponseCardBinInfo {
      return this.cardBinInfo;
    },
    // 등록된 신용(체크)카드 정보
    getRegistCreditCardInfo(): ResponseRegisterCardNo {
      return this.registCreditCardInfo;
    },
    // 대중교통 챌린지 필수미션 정보
    getMissionList(): MissionInfo | undefined {
      return this.evntCtt.missionList.find((d: { type: string; }) => d.type === 'default');
    }
  },
  actions: {
    /**
     * 교통카드 등록 메인 정보
     * @param pageId TrcrReg1
     */
    async requestRegisteredTrafficCardMain(pageId: string) {
      try {
        const res = await getRegisteredTrafficCardMain(pageId);
        if (res) {
          this.mainNotesInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 등록된 교통카드 개수 조회
     * @param inqrDtm YYYYMMDDHHmmss
     */
    async requestRegisteredTrafficCardCnt(inqrDtm: string) {
      try {
        const res = await getRegisteredTrafficCardCnt(inqrDtm);
        if (res) {
          this.registeredTrafficCnt = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 회원 상태 조회
     * @param {string} inqrDtm YYYYMMDDHHmmss
     * @param {string} moappMbrsSno 모바일앱 회원 일련번호
     */
    async requestMemberStat(param: RequestMemberStat) {
      try {
        const res = await getMemberStat(param);
        if (res) {
          return res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 티머니 교통카드 등록 유의사항
     * @param pageId TrcrReg4
     */
    async requestTmoneyNotes(pageId: string) {
      try {
        const res = await getTmoneyNotes(pageId);
        if (res) {
          this.tmoneyNotesInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 등록된 교통카드 번호 조회
     * @param trcrDvsCd 전체: 0, 티머니: 1, 신용(체크)카드: 2
     */
    async requestRegisteredTrafficCardList(trcrDvsCd: string) {
      try {
        const res = await getRegistTrCardList(trcrDvsCd);
        if (res) {
          this.registeredTrafficCardList = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 교통카드 불러오기
     */
    async requestGetTmoneyPayCard() {
      try {
        const res = await getTmoneyPayCard();
        if (res) {
          this.tmoneyCardCnt = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 교통카드 불러오기 ASIS
     */
        async requestGetTmoneyPayCardASIS() {
          try {
            const res = await asIsGetTmoneyPayCard();
            if (res) {
              this.tmoneyCardCnt = res;
            }
            return res;
          } catch (error) {
            return Promise.reject(error);
          }
        },
    /**
     * 교통카드 불러오기 버튼으로 가져온 티머니카드 등록
     * @param reqDtm YYYY-MM-DD HH:mm:ss
     */
    async requestRegisterTmoneyPayCardNo(reqDtm: string) {
      try {
        const res = await getRegisterTmoneyPayCardNo(reqDtm);
        if (res) {
          this.registTmoneyPayCardInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 교통카드 불러오기 버튼으로 가져온 티머니카드 등록 asis
     * @param reqDtm YYYY-MM-DD HH:mm:ss
     */
    async requestRegisterTmoneyPayCardNoASIS(reqDtm: string) {
      try {
        const res = await asIsGetRegisterTmoneyPayCardNo(reqDtm);
        if (res) {
          this.registTmoneyPayCardInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 티머니 교통카드 등록
     * @param {string} reqEncYn 암호화요청여부 Y
     * @param {string} trcrDvsCd 1: 선불 2:후불
     */
    async requestRegisterTmoneyCardNo(param: ResquestRegisterCardNo) {
      try {
        const res = await getRegisterTmoneyCardNo(param);
        if (res) {
          this.registTmoneyCardInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
     /**
     * 티머니 교통카드 등록 ASIS
     * @param {string} reqEncYn 암호화요청여부 Y
     * @param {string} trcrDvsCd 1: 선불 2:후불
     */
     async requestRegisterTmoneyCardNoASIS(param: ResquestRegisterCardNo) {
      try {
        const res = await asIsGetRegisterTmoneyCardNo(param);
        if (res) {
          this.registTmoneyCardInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 신용(체크)카드 등록/변경 유의사항, 배너
     * @param pageId TrcrReg2
     */
    async requestCreditNotes(pageId: string) {
      try {
        const res = await getCreditNotes(pageId);
        if (res) {
          this.creditCardNotesInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 신용카드 검증
     * @param cardBin 카드번호 앞 8자리
     */
    async requestInqrCardBinInfo(cardBin: string) {
      try {
        const res = await getInqrCardBinInfo(cardBin);
        if (res) {
          this.cardBinInfo = res;
        }
        return res;
      } catch (error) {
        return false;
      }
    },
     /**
     * 신용카드 검증 ASIS
     * @param cardBin 카드번호 앞 8자리
     */
     async requestInqrCardBinInfoASIS(cardBin: string) {
      try {
        const res = await asIsGetInqrCardBinInfo(cardBin);
        if (res) {
          this.cardBinInfo = res;
        }
        return res;
      } catch (error) {
        return false;
      }
    },
    /**
     * 신용(체크)카드 등록 ASIS
     * @param {string} reqEncYn 암호화요청여부 Y
     * @param {string} trcrDvsCd 2: 후불
     * @param {string} crcmCd 카드사 코드
     * @param {string} encToken 암호화 token
     * @param {string} encHmac 암호화 hmac
     */
    async requestRegisterCreditCardNoASIS(param: ResquestRegisterCardNo) {
      try {
        const res = await asIsGetRegisterTmoneyCardNo(param);
        if (res) {
          this.registCreditCardInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 교통 카드 삭제
     * @param trcrSno 카드일련번호
     */
    async requestRemoveCardNo(trcrSno: string) {
      try {
        const res = await getRemoveCardNo(trcrSno);
        if (res) {
          return res.scsYn;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async inqrEvntBnftPlusInfo(evntScrnId: string, moappMbrsSno: string) {
      try {
        const res = await inqrEvntBnftPlusInfo({ evntScrnId: evntScrnId, moappMbrsSno: moappMbrsSno });
        if (res) {
          this.evntCtt = res.data;
          return true;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    initRegisteredCreditCardList() {
      this.registeredTrafficCardList.trcrNoList = [];
    },
    initCardBinInfo() {
      this.cardBinInfo = initCardBinInfo;
    }
  }
});
