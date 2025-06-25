import { env } from "@/config/env";
import { useLogin } from "@/features/auth/api/login";
import { fallback } from "@/routes/login";
import type { LoginResponse } from "@/types/api";
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: ReturnType<typeof useLogin>;
  logout: () => void;
  user: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const key = `${env.APP_NAME}.${env.TARGET_ENV}`;

function getStoredUser() {
  return localStorage.getItem(key);
}

export function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;
  const searchParams = new URLSearchParams();

  const onLoginSuccess = async (response: LoginResponse) => {
    setStoredUser(response.accessToken);
    setUser(response.accessToken);

    const redirect = searchParams.has("redirect")
      ? searchParams.get("redirect")!
      : fallback;

    window.location.href = redirect;
  };

  const login = useLogin({
    mutationConfig: {
      onSuccess: onLoginSuccess,
    },
  });

  const logout = useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
