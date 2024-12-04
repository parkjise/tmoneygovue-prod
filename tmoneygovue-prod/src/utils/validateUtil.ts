/**
 * @desctiprion 이름 유효성검사 (한글/영문)
 * @param name
 */
export const validateName = (required: boolean, name: string) => {
  if (!required && name === '') return true;
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  return regex.test(name);
};

/**
 * @desctiprion 이메일 유효성검사
 * @param email
 */
export const validateEmail = (email: string) => {
  if (email === '') return true;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
};

/**
 * @desctiprion 연락처 유효성검사
 * @param mobile
 */
export const validateMobile = (required: boolean, mobile: string) => {
  if (!required && mobile === '') return true;
  if (mobile.length < 10) return false;
  const regex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
  return regex.test(mobile);
};

/**
 * @description 버전체크
 * @param newVersion 최소버전
 * @param curVersion 현재버전
 * @returns
 */
export const checkAppVersion = (minVersion: string, curVersion: string) => {
  let result = true;
  if (minVersion === curVersion) return true;

  const minVersionArr = minVersion.split('.');
  const curVersionArr = curVersion.split('.');

  const length = Math.max(minVersionArr.length, curVersionArr.length);

  for (let i = 0; i < length; i++) {
    const minV = minVersionArr[i] ? parseInt(minVersionArr[i], 10) : 0;
    const curV = curVersionArr[i] ? parseInt(curVersionArr[i], 10) : 0;
    if (minV > curV) {
      result = false;
      break;
    }
  }
  return result;
};
