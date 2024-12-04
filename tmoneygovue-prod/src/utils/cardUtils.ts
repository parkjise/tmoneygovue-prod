/**
 * 간편결제 태그 텍스트 리스트
 * @param usePsbSvc
 * @returns {string[]} tagList
 */
export function getSmpcTaglist(usePsbSvc: string): string[] {
  const arr = [];
  if (usePsbSvc.indexOf('O') !== -1) {
    arr.push('택시');
  }
  if (usePsbSvc.indexOf('T') !== -1) {
    arr.push('자전거');
  }
  if (usePsbSvc.indexOf('X') !== -1) {
    arr.push('킥보드');
  }
  if (usePsbSvc.indexOf('L') !== -1) {
    arr.push('렌터카');
  }
  if (usePsbSvc.indexOf('FG') !== -1) {
    arr.push('여행');
  }
  // if (usePsbSvc.indexOf('B') !== -1) {
  //   arr.push('고속/시외');
  // }
  // if (usePsbSvc.indexOf('H') !== -1) {
  //   arr.push('고속버스');
  // }
  // if (usePsbSvc.indexOf('C') !== -1) {
  //   arr.push('시외버스');
  // }
  // OTXRLU
  // if (usePsbSvc.indexOf('FC') !== -1) {
  //   arr.push('i.M택시');
  // }
  // if (usePsbSvc.indexOf('FD') !== -1) {
  //   arr.push('타다택시');
  // }
  // if (usePsbSvc.indexOf('D') !== -1) {
  //   arr.push('타슈');
  // }
  // if (usePsbSvc.indexOf('G') !== -1) {
  //   arr.push('지쿠터');
  // }
  // if (usePsbSvc.indexOf('K') !== -1) {
  //   arr.push('킥고잉');
  // }
  // if (usePsbSvc.indexOf('E') !== -1) {
  //   arr.push('지쿠자전거');
  // }
  // if (usePsbSvc.indexOf('I') !== -1) {
  //   arr.push('킥고잉자전거');
  // }
  // if (usePsbSvc.indexOf('R') !== -1) {
  //   arr.push('SRT');
  // }
  // if (usePsbSvc.indexOf('U') !== -1) {
  //   arr.push('항공');
  // }
  // if (usePsbSvc.indexOf('J') !== -1) {
  //   arr.push('일레클자전거');
  // }
  // if (usePsbSvc.indexOf('M') !== -1) {
  //   arr.push('스윙자전거');
  // }
  // if (usePsbSvc.indexOf('W') !== -1) {
  //   arr.push('스윙스쿠터');
  // }

  return arr;
}
