import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import localforage from 'localforage';
import { cloneDeep } from 'lodash-es';

import localeErrorMsg from 'src/locale/errorMessages';

import constants from '../constants';
import Emitter from '../emitter';
import { ClientTokenType } from './requestAPITypes';

export const authenticationFailed = 'authentication_fail';
export const clientTokenStorageId = 'clientTokens';
const isNotProduction: boolean = process.env.NEXT_PUBLIC_APP_ENV !== 'production';

const { API } = constants;
const timeout = parseInt(constants.API.timeout as string, 10);

const setClientTokenData = async (tokens: ClientTokenType) => {
  await localforage.setItem(clientTokenStorageId, JSON.stringify({ ...tokens }));
};

const getClientTokens: () => Promise<ClientTokenType> = async () => {
  const localStorageTokens: string = (await localforage.getItem(clientTokenStorageId)) as string;

  return JSON.parse(localStorageTokens);
};

const clearSession: () => Promise<void> = async () => {
  await localforage.removeItem(clientTokenStorageId);
};

const requestAPI: AxiosInstance = axios.create({
  baseURL: `${API.host}/`,
  headers: { 'Content-Type': 'application/json' },
  timeout,
});

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

interface RequestConfigType<D = any> extends AxiosRequestConfig<D> {
  url: string;
  headers: {
    Authorization?: string;
  };
}
export const requestGetAPI = <T, D>(config: RequestConfigType<D>) =>
  requestAPI.get<T, AxiosResponse<T>, D>(config.url, config);

export const requestPostAPI = <T, D>(config: RequestConfigType<D>) =>
  requestAPI.post<T, AxiosResponse<T>, D>(config.url, config.data, config);

export const requestPutAPI = <T, D>(config: RequestConfigType<D>) =>
  requestAPI.put<T, AxiosResponse<T>, D>(config.url, config.data, config);

export const requestDeleteAPI = <T, D>(config: RequestConfigType<D>) =>
  requestAPI.delete<T, AxiosResponse<T>, D>(config.url, config);

export const requestPatchAPI = <T, D>(config: RequestConfigType<D>) =>
  requestAPI.patch<T, AxiosResponse<T>, D>(config.url, config.data, config);

// Request interceptor
requestAPI.interceptors.request.use(
  async (config: RequestConfigType) => {
    try {
      if (isNotProduction) {
        console.debug('requestAPI - interceptors.req sent config: ', config);
      }

      const configReq = cloneDeep(config);

      // Authenticated request add the accessToken in the header
      if (configReq.useAuth) {
        const { accessToken } = await getClientTokens();
        configReq.headers.Authorization = `Bearer ${accessToken}`;
      }

      return configReq;
    } catch (error) {
      console.error(`requestAPI - interceptors.req config: ${config} - error: ${error}`);
      return config;
    }
  },
  error => {
    console.error('requestAPI - interceptors.req error: ', error);

    return Promise.reject(error);
  },
);

// Response interceptor
requestAPI.interceptors.response.use(
  async (res: AxiosResponse) => {
    try {
      if (isNotProduction) {
        console.debug('requestAPI - interceptors.res sent res: ', res);
      }

      const { config, data } = res;
      // Example of implementation for handling access tokens in various processes:
      // Sign-In / Refresh credentials

      if (config.url && ['/sign-in', '/refresh'].includes(config.url)) {
        const { accessToken } = data.data;

        await setClientTokenData({ accessToken });
      }
      // Sign-Out
      if (config.url === '/sign-out') {
        clearSession();
      }
    } catch (error) {
      console.error(`requestAPI - interceptors.res res: ${res} - error: ${error}`);
    }
    return res.data;
  },
  async error => {
    if (isNotProduction) {
      console.debug('requestAPI - interceptors.res error: ', error && error.response);
    }

    const { response } = error;
    const { data } = response;

    const errorMsgList = localeErrorMsg;

    let errorMsg = errorMsgList['errorMsg.default'];
    try {
      if (response) {
        const { code } = data;

        if (code && code === authenticationFailed) {
          Emitter.emit(authenticationFailed, '');
          clearSession();
        } else if (code && errorMsgList[`errorMsg.${code}`]) {
          errorMsg = errorMsgList[`errorMsg.${code}`];
        }
      }
    } catch (e) {
      console.error(`requestAPI - interceptors.res error: ${error} - e: ${e}`);
    }
    // [Note]: Reject with custom object to handle the error in higher catch
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: response ? response.status : 400, data, errorMsg });
  },
);

export default requestAPI;
