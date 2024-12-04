import { cloneDeep } from 'lodash-es';
import { DeepLinkToSpaMap, WebLinkToWebMap } from '@/utils/constants/linkConstants';
import { useCommonStore } from '@/service/common/commonModule';
import { isLocal } from './is';

interface resLinkInfo {
  isTransTargetLink: boolean; // 링크 변환대상 여부
  isMappingLink: boolean; // 링크 맵핑 여부
  url: string; // 링크 URL
}

const resLinkInfoInit: resLinkInfo = {
  isTransTargetLink: false,
  isMappingLink: false,
  url: ''
};

/**
 * 딥링크여부 체크
 * @param inputLink: string
 * @returns bealoon
 */
export function isDeepLink(inputLink: string): boolean {
  return inputLink.includes('tmoneytia://');
}

/**
 * 인앱 웹뷰 링크 여부 확인(spa외에 jsp로 구성된 웹뷰 링크)
 * @param inputLink: string
 * @returns bealoon
 */
export function isInAppWebLink(inputLink: string): boolean {
  // const pattern = /.*https:\/\/.*\.tmoney\.co\.kr*\/webview/;
  const pattern = /.*https:\/\/.*\.tmoney\.co\.kr.*\/webview/;
  return pattern.test(inputLink);
}

export function isDomainWebLink(inputLink: string): boolean {
  const pattern = /https?:\/\//;
  return pattern.test(inputLink);
}

// 링크 쿼리 파라메터 추출
function extractQueryParam(inputLink: string): string {
  const splitedLink = inputLink.split('?');
  if (splitedLink.length > 1) {
    return splitedLink[1];
  }

  return '';
}

// 링크 인코딩. 일반 SPA링크를 encodeURIComponent하게되면 상대경로로 인식하게되어 딥링크 및 인앱웹뷰 링크만 인코딩
export function encodeUriRouterPath(inputLink: string): string {
  if (isDeepLink(inputLink) || isInAppWebLink(inputLink)) {
    return encodeURIComponent(inputLink);
  }
  return inputLink;
}

// 링크 변환. 딥링크 및 인앱웹뷰 링크 처리
export function transformLink(inputLink: string): resLinkInfo {
  const resLinkInfo = cloneDeep(resLinkInfoInit);
  resLinkInfo.url = inputLink;
  let outputLink = inputLink;

  // 딥링크 처리
  if (isDeepLink(inputLink)) {
    resLinkInfo.isTransTargetLink = true; // 링크 변환대상 여부
    // 링크 상대경로로 호출되었을떄 앞의 경로를 제거. router path를 상대경로로 호출하게 되면 앞에 경로가 붙음
    outputLink = inputLink.replace(/.*(?=tmoneytia:\/\/)/, '');

    // 링크 쿼리 파라메터 추출(tmoneytia://event/list?sno=testsno). ?뒤에 값을 추출
    const queryParam = extractQueryParam(outputLink);

    // 쿼리 파라메터 제거
    outputLink = outputLink.replace(`?${queryParam}`, '');

    // 링크 맵핑
    const transDeepLink = DeepLinkToSpaMap.get(outputLink);
    if (transDeepLink) {
      resLinkInfo.isMappingLink = true; // 링크 맵핑 여부
      // 쿼리 파라메터가 있을때 링크에 추가
      if (queryParam) {
        resLinkInfo.url = `${transDeepLink}?${queryParam}`;
      } else {
        resLinkInfo.url = transDeepLink;
      }
    }
    return resLinkInfo;
  }

  // web(jsp) 처리
  if (isInAppWebLink(inputLink)) {
    resLinkInfo.isTransTargetLink = true; // 링크 변환대상 여부

    outputLink = inputLink.replace(/.*(?=\/webview\/)/, '');

    // 링크 쿼리 파라메터 추출(webview/app/v2/TGOWebView.do?scrnId=SCRN20240402001). ?뒤에 값을 추출
    const queryParam = extractQueryParam(outputLink);

    // 쿼리 파라메터 제거
    outputLink = outputLink.replace(`?${queryParam}`, '');

    // 링크 맵핑
    const transWebLink = WebLinkToWebMap.get(outputLink);
    if (transWebLink) {
      resLinkInfo.isMappingLink = true; // 링크 맵핑 여부
      // 쿼리 파라메터가 있을때 링크에 추가
      if (queryParam) {
        resLinkInfo.url = `${transWebLink}?${queryParam}`;
      } else {
        resLinkInfo.url = transWebLink;
      }
    }
    return resLinkInfo;
  }
  return resLinkInfo;
}

export enum baseAxiosTypeEnum {
  TMONEY2 = 'TMONEY2',
  TMONEY1 = 'TMONEY1',
  TRAVEL = 'TRAVEL',
  MOBILITY = 'MOBILITY',
  ONDATAXI = 'ONDATAXI'
}

// axios baseUrl 설정
export function getAxiosBaseUrl(baseAxiosType: baseAxiosTypeEnum): string {
  const commonStore = useCommonStore();
  const isDummyApiMode = commonStore.getIsDummyApiMode;

  // 더미API모드일때
  if (isDummyApiMode) {
    return '/tgodummyspa';
  }
  // 로컬일때
  if (isLocal()) {
    return '/';
  }

  // webBase 설정. SPA분리배포에 따른 webBase 설정. 빌드시에 환경변수로 base target을 구분하고 baseUrl을 설정
  const webBase = import.meta.env.VITE_AXIOS_BASE_TARGET || 'TMONEY2';
  if (webBase == baseAxiosType) {
    if (webBase === baseAxiosTypeEnum.TRAVEL) {
      return '/tim';
    }
    return '/';
  }

  // 티머니2.0 API일때
  if (baseAxiosType === baseAxiosTypeEnum.TMONEY2) {
    return import.meta.env.VITE_TMONEY2_AXIOS_BASE_URL;
  }
  // 티머니1.0 API일때
  if (baseAxiosType === baseAxiosTypeEnum.TMONEY1) {
    return import.meta.env.VITE_TMONEY1_AXIOS_BASE_URL;
  }
  // 여행API일때
  if (baseAxiosType === baseAxiosTypeEnum.TRAVEL) {
    return import.meta.env.VITE_TRAVEL_AXIOS_BASE_URL;
  }
  // 모빌리티 API일때
  if (baseAxiosType === baseAxiosTypeEnum.MOBILITY) {
    return import.meta.env.VITE_MOBILITY_AXIOS_BASE_URL;
  }
  // 온다택시 API일때
  if (baseAxiosType === baseAxiosTypeEnum.ONDATAXI) {
    return import.meta.env.VITE_ONDATAXI_AXIOS_BASE_URL;
  }

  return '/';
}
