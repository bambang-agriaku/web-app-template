import Axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useNotifications } from "@/components/ui/notifications";
import { env } from "@/config/env";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  // config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    const message = error.response?.data?.message || error.message;
    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message,
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirect = searchParams.get("redirect") || window.location.pathname;
      window.location.href = `/login?redirect=${redirect}`;
    }

    return Promise.reject(error);
  },
);
