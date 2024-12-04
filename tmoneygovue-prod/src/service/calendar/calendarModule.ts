import { defineStore } from 'pinia';
import type { PublicHolidayInfo, ResponsePublicHoliday } from './model/calendarModel';
import { getPublicHolidaysInfo } from './calendarApi';

export const PublicHolidaysInit = {
  pbhlList: [],
  rspMsg: '',
  rspCd: '',
  resAdptSttDtm: ''
};

interface calendarState {
  publicHolidays: ResponsePublicHoliday;
}

export const useCalendarStore = defineStore({
  id: 'calendar-store',

  state: (): calendarState => ({
    // 공휴일 정보
    publicHolidays: PublicHolidaysInit
  }),
  getters: {
    // 공휴일 정보
    getPublicHolidays(): PublicHolidayInfo[] {
      return this.publicHolidays.pbhlList;
    }
  },
  actions: {
    /**
     * 공휴일정보 조회
     * @returns
     */
    async setPublicHolidays(adptSttDtm: string) {
      try {
        const res = await getPublicHolidaysInfo(adptSttDtm);
        if (res) {
          this.publicHolidays = res;
        }
        return res;
      } catch (error) {
        return false;
      }
    }
  }
});
