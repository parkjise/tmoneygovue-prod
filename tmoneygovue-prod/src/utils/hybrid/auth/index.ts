import type { FlexResponse } from '../type';
import type { AuthInfoResponse, AuthTknInfoResponse } from './auth.type';

// auth interface 정의
export default interface FlexAuth {
  getAuthInfo: () => Promise<AuthInfoResponse>;
  updateAuthTknInfo: () => Promise<AuthTknInfoResponse>;
  openLoginPage: () => Promise<FlexResponse>;
  exit: () => Promise<FlexResponse>;
}
