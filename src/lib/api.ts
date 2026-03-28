import axios from "axios";
import { AppStore } from "./store";
import { clearState, setToken } from "./features/authSlice";

export const api = axios.create({
  baseURL: "/api-proxy",
  withCredentials: true,
});
let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

api.interceptors.request.use((config) => {
  const token = store?.getState().auth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originRequest = err.config;

    if (originRequest.url.includes("/auth/refresh")) {
      return Promise.reject(err);
    }

    originRequest._retryCount = originRequest._retryCount || 0;

    if (err.response?.status == 401 && originRequest._retryCount < 1) {
      originRequest._retryCount += 1;

      const res = await api.post("auth/refresh");

      const { accessToken } = res.data;

      console.log(accessToken);

      if (!accessToken) {
        store.dispatch(clearState);
        return Promise.reject(err);
      }

      store.dispatch(setToken(accessToken));

      originRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originRequest);
    }

    return Promise.reject(err);
  },
);
