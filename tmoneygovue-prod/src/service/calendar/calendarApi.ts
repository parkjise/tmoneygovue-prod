import { defHttpOpt } from '@/utils/http/axios';
import type { ResponsePublicHoliday } from './model/calendarModel';

enum Api {
  publicHolidays = '/api/app/v2/inqrPbhlInfo'
}

/**
 * @description 공휴일정보 조회
 * @param {string} adptSttDtm 00000000000000
 */
export const getPublicHolidaysInfo = (adptSttDtm: string): Promise<ResponsePublicHoliday> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.publicHolidays,
    params: { adptSttDtm }
  });
};
