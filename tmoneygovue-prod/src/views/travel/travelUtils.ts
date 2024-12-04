import { LOC_KWRD } from '@/service/travel/travelConsts';
import type { PymBusTckData, TrvlDtlPsngData } from '@/service/usage-history/model/travelHistoryModel';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { formatDate } from '@/utils/dateUtils';
import { useAxiosModal } from '@/utils/http/axios/composerbles/useAxiosModal';
import dayjs from 'dayjs';
import { useI18n } from '@/composables/useI18n';
import { type Router } from 'vue-router';
import type { TravelResult } from '@/utils/http/axios/types/axios';
import { TravelErorCodeEnum } from '@/utils/http/axios/enum/httpEnum';

/**
 * @description 금액 텍스트처리
 * @param price
 */
export const getPriceText = (price: number | string | undefined) => {
  if (!price) return '0';
  if (typeof price === 'string') price = Number(price);
  return price.toLocaleString();
};

/**
 * @description 일자 텍스트처리 (YYYY.MM.DD(dd) HH:mm)
 */
export const getDateText = (dateTime?: string, showDay?: boolean) => {
  if (!dateTime || dateTime === '') return '';
  const format = showDay ? 'YYYY.MM.DD(dd) HH:mm' : 'YYYY.MM.DD HH:mm';

  const date = dateTime.length > 8 ? dateTime.substring(0, 8) : dateTime;
  const time = dateTime.length > 8 ? dateTime.substring(8) : '000000';

  return formatDate(`${date}${time}`, format);
};

/**
 * @description 로컬스토리지에 최근검색어 저장
 */
export const saveLocalKeyword = async (keyword: string) => {
  if (keyword === '') return;
  let newList: string[] = [];

  // 최근검색어 가져오기
  const storageData: string = localStorage.getItem(LocalStorageKey.RCTLY_KEYWORD) || '';
  const storageDataList: string[] = storageData.split(LOC_KWRD.split).filter((keyword) => keyword !== '');

  // 최근검색어에 동일한 검색어 있는 경우 삭제 후 재저장
  newList = storageDataList.filter((item) => item !== keyword);
  // 저장 검색어 최대 개수 10개
  if (storageDataList.length === LOC_KWRD.maxLen) {
    newList = storageDataList.filter((item, idx) => idx !== storageDataList.length);
  }
  // 현재 검색어를 포함해서 최근검색어에 저장
  newList.push(keyword);
  localStorage.setItem(LocalStorageKey.RCTLY_KEYWORD, newList.join(LOC_KWRD.split));
};
/**
 * @description 출발시간 구하기
 * @return 현재시간(오늘) / 000000
 */
export const getDeprTime = (selDate: string): Promise<string> => {
  return new Promise((resolve) => {
    const hour = dayjs().hour() < 10 ? `0${dayjs().hour()}` : dayjs().hour().toString();
    const min = dayjs().minute() < 10 ? `0${dayjs().minute()}` : dayjs().minute().toString();
    const time = dayjs(selDate).isSame(formatDate(dayjs(), 'YYYYMMDD')) ? `${hour}${min}00` : '000000';
    resolve(time);
  });
};
// 버스티켓종류명 리스트
export const busTckNmList = (list: undefined | TrvlDtlPsngData[] | PymBusTckData[]) => {
  if (!list) return [];
  const resList: Array<{ code: string; name: string }> = [];
  list.forEach((d) => {
    if (!resList.some((t) => t.code === d.busTckKndCd))
      resList.push({
        code: d.busTckKndCd,
        name: d.busTckKndNm
      });
  });
  return resList;
};
/**
 * @description 티켓종류별 카운트 텍스트
 */
export const getPsngCntList = (
  typeNmList: Array<{ code: string; name: string }>,
  trvlMrnpDtlList: undefined | TrvlDtlPsngData[] | PymBusTckData[]
) => {
  const result: { name: string; count: number }[] = [];
  if (trvlMrnpDtlList) {
    typeNmList.forEach((t) => {
      result.push({
        name: t.name,
        count: trvlMrnpDtlList.filter((d) => t.code === d.busTckKndCd).length
      });
    });
  }

  return result;
};
/**
 * @description 캔버스에 그린 이미지URL로 Blob객체 생성
 */
export const dataURItoBlob = (dataURI: string): Promise<Blob> => {
  return new Promise((resolve) => {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);
    // 마임타입 추출
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    resolve(new Blob([ia], { type: mimeString }));
  });
};

/**
 * @description Blob을 ArrayBuffer로 변환
 */
export const blobToArrayBuffer = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

/**
 * @description ArrayBuffer를 바이너리 문자열로 변환
 */
export const arrayBufferToBinaryString = (buffer: any) => {
  const bytes = new Uint8Array(buffer);
  let binaryString = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return binaryString;
};

/**
 * @description 운송중개 err_code 정상이 아닐경우 체크로직
 * @param res
 * @returns
 */
export const travelErrCheck = (res: TravelResult<any>) => {
  if (!res) return false;
  if (res && res.err_cod && res.err_cod !== TravelErorCodeEnum.SUCCESS) return false;
  return true;
};

/**
 * @description 운송중개 err_code !== '00000'일 경우 에러모달
 * @param router
 * @param errorMsg
 */
export const travelErrModal = (router: Router, errorMsg?: string, backFunc?: Function) => {
  const { createErrorModalByFunction } = useAxiosModal();
  const { t } = useI18n();

  createErrorModalByFunction(
    t('system.api.notifyTitleMsg'),
    errorMsg || t('system.api.networkExceptionMsg'),
    async () => {
      const curRoute = router.currentRoute.value.fullPath;
      await router.replace('/common/move-view');
      await router.replace(curRoute);
    },
    t('common.retryText'),
    () => {
      if (backFunc !== undefined) backFunc();
      else router.back();
    },
    t('common.goBackText')
  );
};
/**
 * @description 상품상세 url 파싱
 * @param url
 * @returns
 */
export const productDtlUrlParsing = (url: string) => {
  const link = url.replace(/tmoneytia:\/|(\?|\\&)?trvlPrdId=\d+/g, '');
  const match = url.match(/trvlPrdId=([^&]+)/);
  if (match) return { link: link, id: match[1] };
  return null;
};

export const testImgDownload = (blob: Blob) => {
  const imageUrl = URL.createObjectURL(blob);

  // 이미지 다운로드
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `download.png`;
  document.body.appendChild(link);
  link.click();

  // URL객체해제, 요소 삭제
  URL.revokeObjectURL(imageUrl);
  document.body.removeChild(link);
};
