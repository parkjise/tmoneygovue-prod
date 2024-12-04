import { storeToRefs } from 'pinia';
import { useMemberStore } from '../member/memberModule';

// 서비스 연동조회 여부 체크
export const linkedServiceYN = (code: string) => {
  const { linkedServiceCodeList } = storeToRefs(useMemberStore());
  if (!linkedServiceCodeList || linkedServiceCodeList.value.lnkgSvcList.length < 1) return false;
  const service = linkedServiceCodeList.value.lnkgSvcList.find((service) => service.lnkgSvcCd === code);
  if (!service) return false;
  return service.lnkgYn === 'Y';
};
