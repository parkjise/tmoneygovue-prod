import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(customParseFormat);

export type type = 'day' | 'month' | 'year';

// 날짜를 YYYY-MM-DD 형식의 문자열로 변환하는 함수
export function formatDate(date: string | number | Date | Dayjs = dayjs(), format: string = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

// 두 날짜 사이의 일수를 계산하는 함수
export function countDays(startDate: string | number | Date | Dayjs, endDate: string | number | Date | Dayjs): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'day');
}

// 주어진 날짜가 오늘인지 확인하는 함수
export function isToday(date: string | number | Date | Dayjs): boolean {
  const today = dayjs();
  return dayjs(date).isSame(today, 'day');
}

// 주어진 날짜가 이번 주인지 확인하는 함수
export function isThisWeek(date: string | number | Date | Dayjs): boolean {
  const thisWeek = dayjs().startOf('week');
  return dayjs(date).isSame(thisWeek, 'week');
}

// 주어진 날짜를 기준으로 이후 날짜 구하기
export function addDate(date: string | number | Date | Dayjs, value: number, type: type): Dayjs {
  return dayjs(date).add(value, type);
}

// 주어진 날짜를 기준으로 이전 날짜 구하기
export function subtractDate(date: string | number | Date | Dayjs, value: number, type: type): Dayjs {
  return dayjs(date).subtract(value, type);
}
// 오늘 날짜 구하기
export function getToday(): Dayjs {
  return dayjs();
}
// 년도 구하기
export function getYear(date: string | number | Date | Dayjs = dayjs(), format = 'YYYY'): string {
  return dayjs(date).format(format);
}
// 요일 구하기
export function getDayWeek(date: string | number | Date | Dayjs = dayjs(), format = 'dd'): string {
  return dayjs(date).format(format);
}
// 달 구하기
export function getMonth(date: string | number | Date | Dayjs = dayjs()): string {
  return dayjs(date).format('M');
}

// 이번달 시작일 구하기
export function getStartDate(date: string | number | Date | Dayjs = dayjs()): string {
  return dayjs(date).startOf('month').format('YYYYMMDD');
}

// 이번달 종료일 구하기
export function getEndDate(date: string | number | Date | Dayjs = dayjs()): string {
  return dayjs(date).endOf('month').format('YYYYMMDD');
}

// 시작일자, 종료일자 사이의 날짜인지 체크
export function isValidDate(
  baseDate: string | number | Date | Dayjs = dayjs(),
  startDate: string | number | Date | Dayjs = dayjs(),
  endDate: string | number | Date | Dayjs = dayjs()
): boolean {
  const bDate = dayjs(baseDate);
  const sDate = dayjs(startDate);
  const eDate = dayjs(endDate);
  return (bDate.isSame(eDate) || bDate.isBefore(eDate)) && (bDate.isSame(sDate) || bDate.isAfter(sDate));
}

// dayjs 객체로 변환. 해당 객체를 base로 사용하여 날자값 사용
export function formatDateToDayjs(
  date: string | number | Date | Dayjs = dayjs(),
  format: string = 'YYYY-MM-DD'
): Dayjs {
  return dayjs(date, format);
}

// 날짜 접근성 처리
export function formatA11yDateTime(date: string, time?: string, day?: boolean) {
  if (!date) return '';
  const dt = date.trim().replaceAll(/[.\-:/\s]/g, '');
  let returnDate = '';

  if (dt.length < 1) return '';
  returnDate += dt.substring(0, 4) + '년';
  returnDate += dt.substring(4, 6) + '월';

  if (dt.length > 6) returnDate += dt.substring(6, 8) + '일';

  if (day) returnDate += formatDate(date, 'ddd') + '요일';

  if (time) {
    returnDate += (time.substring(0, 2) === '00' ? '0' : time.substring(0, 2)) + '시';
    returnDate += (time.substring(2, 4) === '00' ? '0' : time.substring(2, 4)) + '분';
  } else if (dt.length > 8) {
    returnDate += (dt.substring(8, 10) === '00' ? '0' : dt.substring(8, 10)) + '시';
    returnDate += (dt.substring(10, 12) === '00' ? '0' : dt.substring(10, 12)) + '분';
  }

  return returnDate;
}
