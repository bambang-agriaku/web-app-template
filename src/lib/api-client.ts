import Axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useNotifications } from "@/components/ui/notifications";
import { env } from "@/config/env";
import { key, setStoredUser } from "./auth";
import { apiRoutes } from "@/config/api-routes";
import { paths } from "@/config/paths";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";

    const token = localStorage.getItem(key);
    const isLoginRequest = config.url?.includes(apiRoutes.auth.login);

    if (token && !isLoginRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

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
      // Remove user token from local storage
      setStoredUser(null);

      const searchParams = new URLSearchParams();
      const redirect = searchParams.get("redirect") || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirect);
    }

    return Promise.reject(error);
  },
);
