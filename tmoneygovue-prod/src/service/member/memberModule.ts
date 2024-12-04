import { defineStore } from 'pinia';
import type {
  reqMemberInfoModel,
  resMemberInfoModel,
  reqMemberWithdrawModel,
  reqLinkedServiceCodeListModel,
  resLinkedServiceCodeListModel,
  reqBlackListYnModel,
  reqDdareongMemberInfoChangeEmailModel,
  reqSignUpModel,
  reqUpdatePushToken,
  reqTossAuthResultModel, 
  reqTossLoginModel, 
  resTossAuthModel, 
  resTossAuthResultModel
} from '@/service/member/model/memberModel';
import {
  getMemberInfo,
  withdrawMembership,
  getLinkedServiceCodeList,
  getBlackListYn,
  logout,
  logoutDdareong,
  changeDdareongEmail,
  changeDdareongPW,
  changeDdareongWeight,
  changeParentPhoneNumber,
  signUp,
  updatePushToken,
  getTossAuthResult,
  reqTossAuth
} from '@/service/member/memberApi';
import { getSpfStplAgree, getSpfStplAgrmYn } from '../terms/termsApi';
import type { StplAgreeInfo, TermsAgreeInfo } from '../terms/model/termsModel';
import type { ReqSpfTermsAgree } from '../terms/model/requestModel';

interface memberState {
  memberInfo: resMemberInfoModel;
  linkedServiceCodeList: resLinkedServiceCodeListModel;
  ddareongSpfStplInfo: TermsAgreeInfo;
  tossAuth: resTossAuthModel; 
  tossAuthResult: resTossAuthResultModel; 
}

export const memberInfoInit = {
  mbrsNm: '',
  mbrsClsVal: '',
  mbrsClsNm: '',
  mbrsMbphNo: '',
  rgtTrcrCnt: '',
  mbrsBnkCd: '',
  mbrsBnkNm: '',
  rfndAcntNo: '',
  trtdTgtYn: '',
  drvLcnsRgtYn: '',
  bcclMbrsId: '',
  prntMbphNo: '',
  email: '',
  weight: '',
  chldBcclYn: ''
};
export const linkedServiceCodeListInit = {
  lnkgSvcList: [],
  msg: '' //메시지
};
export const spfStplInfoInit = {
  stplList: [], // 약관목록
  rspCd: '',
  rspMsg: ''
};

export const useMemberStore = defineStore({
  id: 'member-store',

  state: (): memberState => ({
    // 회원 프로필 정보
    memberInfo: memberInfoInit,
    // 회원 연동 서비스 정보
    linkedServiceCodeList: linkedServiceCodeListInit,
    // 따릉이 가입 약관 정보
    ddareongSpfStplInfo: spfStplInfoInit,
    tossAuth: {} as resTossAuthModel,
    tossAuthResult: {} as resTossAuthResultModel
  }),

  getters: {
    // 회원 프로필 정보
    getMemberInfo(): resMemberInfoModel {
      return this.memberInfo;
    },
    // 등록된 교통카드 개수
    getRegisteredCardCounts(): number[] {
      if (this.memberInfo.rgtTrcrCnt == '미등록') {
        return [];
      } else {
        const str = this.memberInfo.rgtTrcrCnt;
        const tmoneyCard = parseInt(str.substring(str.indexOf('티머니') + 4, str.indexOf('개')));
        const creditCard = parseInt(
          str.substring(str.indexOf('신용/체크') + 6, str.indexOf('개', str.indexOf('신용/체크')))
        );
        return [tmoneyCard, creditCard];
      }
    },
    // 고속·시외버스 가입 여부
    isJoinBus(): boolean {
      return this.linkedServiceCodeList.lnkgSvcList.find((e) => e.lnkgSvcCd == 'B')?.lnkgYn == 'Y';
    },
    // 따릉이 가입 약관 정보
    getDdareongSpfStplInfo(): StplAgreeInfo[] {
      return this.ddareongSpfStplInfo.stplList;
    },
    // 따릉이 이메일
    getDdareongEmail(): string {
      return this.memberInfo.email;
    },
    // 따릉이 몸무게
    getDdareongWeight(): string {
      return this.memberInfo.weight;
    },
    getTossAuth(): resTossAuthModel {
      return this.tossAuth;
    },
  },
  actions: {
    /**
     * 회원 정보 조회
     * @param param reqMemberInfoModel
     * @returns resMemberInfoModel
     */
    async setMemberInfoAction(param: reqMemberInfoModel) {
      this.memberInfo = memberInfoInit;
      const res = await getMemberInfo(param);
      if (res) {
        this.memberInfo = res;
      }
      return res;
    },

    /**
     * 회원 가입
     * @param param reqSignUpModel
     * @returns resSignUpModel
     */
    async signUp(param: reqSignUpModel) {
      this.memberInfo = memberInfoInit;
      const res = await signUp(param);
      return res;
    },

    /**
     * 회원 탈퇴
     * @param param reqMemberWithdrawModel
     * @returns resMemberWithdrawModel
     */
    async withdrawMembership(param: reqMemberWithdrawModel) {
      this.memberInfo = memberInfoInit;
      const res = await withdrawMembership(param);
      return res;
    },

    /**
     * 회원 연동 서비스 조회
     * @param param reqLinkedServiceCodeListModel
     * @returns resLinkedServiceCodeListModel
     */
    async setLinkedServiceCodeList(param: reqLinkedServiceCodeListModel) {
      this.memberInfo = memberInfoInit;
      const res = await getLinkedServiceCodeList(param);
      if (res) {
        this.linkedServiceCodeList = res;
      }
      return res;
    },

    /**
     * 블랙리스트여부조회
     * @param param reqBlackListYnModel
     * @returns resBlackListYnModel
     */
    async getBlackListYn(param: reqBlackListYnModel) {
      const res = await getBlackListYn(param);
      return res;
    },

    setDetDrvLcnsRgtYn(param: string) {
      this.memberInfo.drvLcnsRgtYn == param;
    },

    /**
     * 따릉이 가입하기 약관
     * @param {string} stplTypCd 약관유형코드("D")
     */
    async requestSignInDdareongTerms(stplTypCd: string) {
      const res = await getSpfStplAgrmYn(stplTypCd);
      if (res) {
        this.ddareongSpfStplInfo = {
          stplList: res.stplList.map((item) => ({
            ...item,
            stplCheck: item.stplAgrmYn === 'Y'
          })),
          rspCd: res.rspCd,
          rspMsg: res.rspMsg
        };
      }
      return res;
    },

    /**
     * 따릉이 약관 동의정보 저장
     */
    async requestRegisterDdareongTerms(param: ReqSpfTermsAgree) {
      const res = await getSpfStplAgree(param);
      if (res) {
        return res;
      }
    },

    /**
     * 회원 APP 로그아웃
     * @param param reqBlackListYnModel
     * @returns resBlackListYnModel
     */
    async logout(inqrDtm: string) {
      const param = {
        reqDtm: inqrDtm
      };
      const res = await logout(param);
      return res;
    },

    /**
     * PM 회원 연동 해제 처리
     * @param param reqLogoutDdareongMemberModel
     * @returns resLogoutDdareongMemberYnModel
     */
    async logoutDdareong() {
      const param = {
        utlzSvcDvsCd: 'T'
      };
      const res = await logoutDdareong(param);
      return res;
    },

    /**
     * 따릉이 이메일 변경
     * @param param reqDdareongMemberInfoChangeEmailModel
     * @returns resDdareongMemberInfoChangeModel
     */
    async changeDdareongEmail(param: reqDdareongMemberInfoChangeEmailModel) {
      const res = await changeDdareongEmail(param);
      return res;
    },

    /**
     * 따릉이 비밀번호 변경
     * @param param reqDdareongMemberInfoChangePWModel
     * @returns resDdareongMemberInfoChangeModel
     */
    async changeDdareongPW(prsPwd: string, modPwd: string, mbrphNo: string) {
      const param = {
        entrDvsCd: 'T',
        id: this.memberInfo.bcclMbrsId,
        mbphNo: mbrphNo,
        prsPwd: prsPwd,
        modPwd: modPwd
      };
      const res = await changeDdareongPW(param);
      return res;
    },

    /**
     * 따릉이 회원 몸무게 변경
     * @param param reqDdareongMemberInfoChangeWeightModel
     * @returns resDdareongMemberInfoChangeModel
     */
    async changeDdareongWeight(weight: string) {
      const param = {
        weight: weight
      };
      const res = await changeDdareongWeight(param);
      return res;
    },

    /**
     * 부모 전화번호 변경
     * @param param reqChangeParentPhoneNumberModel
     * @returns resChangeParentPhoneNumberModel
     */
    async changeParentPhoneNumber(prntAuthSno: string) {
      const res = await changeParentPhoneNumber({ prntAuthSno: prntAuthSno });
      return res;
    },

    /**
     * 푸시 토큰 업데이트
     * @param param reqChangeParentPhoneNumberModel // /push/v2/crtnPushTknInfo
     * @returns resChangeParentPhoneNumberModel
     */
    async updatePushToken(param: reqUpdatePushToken) {
      const res = await updatePushToken(param);
      return res;
    },

    /**
    * 토스 본인인증 요청
    */
    async actionTossAuth(tossDetails: reqTossLoginModel) {
      try {
        const res = await reqTossAuth(tossDetails);
        console.log('reqTossAuth : ',res);
        if (res && res.rspCd == '0000') {
          this.tossAuth = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
    * 토스 본인인증 확인
    */
    async getTossAuthResult(param : reqTossAuthResultModel) {
      try {
        const res = await getTossAuthResult(param);
        console.log('getTossAuthResult res : ',res);
        if (res  && res.rspCd == '200') {
        this.tossAuthResult = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
  }
});
