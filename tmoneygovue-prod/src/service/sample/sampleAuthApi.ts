import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { SampleAuthReq, SampleAuthRes } from '@/service/sample/model/sampleAuthModel';
import type { DefaultResult } from '@/utils/http/axios/types/axios';

enum Api {
  auth = '/api/mbrs/v2/uptMbrsAuthTknInfo'
}

/**
 * @description: httpAuth
 */
export const httpAuth = async (data: SampleAuthReq): Promise<DefaultResult<SampleAuthRes>> => {
  let authUrl: string = Api.auth;
  const webBase = import.meta.env.VITE_AXIOS_BASE_TARGET || 'TMONEY2';
  if (webBase == 'travel') {
    authUrl = import.meta.env.VITE_TMONEY2_AXIOS_BASE_URL + authUrl;
  }
  const token = '1a2s3d4f5g';
  return new Promise((resolve, reject) => {
    axios
      .post(authUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res: AxiosResponse<DefaultResult<SampleAuthRes>>) => {
        try {
          const ret = res.data;
          resolve(ret);
        } catch (err) {
          reject(err || new Error('request error!'));
        }
        resolve(res as unknown as Promise<DefaultResult<SampleAuthRes>>);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
  });
};
