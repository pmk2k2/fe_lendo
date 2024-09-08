import { useMutation, useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import type { ActiveAccountVars, LoginRes, LoginVars, LogoutRes, SignupRes, SignupVars } from "./auth.types";
import { createApiFactory } from "../factory";
import { createRefresh, useSignOut } from "react-auth-kit";
import dayjs from "dayjs";
import { ROUTES, signUpStorage, tokenStorage } from "../../static";
import { RefreshTokenCallbackResponse, createRefreshParamInterface, signInFunctionParams } from "react-auth-kit/dist/types";
import { myJwtDecode } from "../../utils";
import dayjsDurationPlugin from "dayjs/plugin/duration.js";
import { App } from "antd";
import { useNavigate } from "react-router";
import type { MessageInstance } from "antd/es/message/interface";

dayjs.extend(dayjsDurationPlugin);

const authApi = createApiFactory(`/api/auth/`);

export const handleSignin = (signIn: (signInConfig: signInFunctionParams) => boolean) => (data: LoginRes) => {
  const { accessToken, tokenType, refreshToken } = data.data;
  const decoded = myJwtDecode(accessToken);

  signIn({
    token: accessToken,
    tokenType: tokenType,
    expiresIn: dayjs.duration(dayjs.unix(decoded.exp).subtract(5, "minute").diff()).asMinutes(),
    authState: decoded,
    refreshToken: refreshToken.token,
    refreshTokenExpireIn: dayjs.duration(dayjs(refreshToken.expireDate).subtract(5, "minute").diff()).asMinutes(),
  });
};

const refreshApiCallback = (message: MessageInstance): createRefreshParamInterface["refreshApiCallback"] => async ({ authToken, refreshToken }) => {
  try {
    const res = await authApi<LoginRes>("token/renew", {
      params: { refresh_token: refreshToken ?? '' },
    });
    const { accessToken: newAuthToken, refreshToken: newRefreshToken } = res.data;
    const decoded = myJwtDecode(newAuthToken);

    const returnValue: RefreshTokenCallbackResponse = {
      newAuthToken,
      newAuthTokenExpireIn: dayjs.duration(dayjs.unix(decoded.exp).subtract(5, "minute").diff()).asMinutes(),
      isSuccess: true,
      newAuthUserState: decoded,
      newRefreshTokenExpiresIn: dayjs.duration(dayjs(newRefreshToken.expireDate).subtract(5, "minute").diff()).asMinutes(),
      newRefreshToken: newRefreshToken.token,
    };

    return returnValue;
  } catch (error) {
    console.error("Error in token renewal:", error);
    message.error(typeof error === "string" ? error : "Token refresh failed");
    return {
      newAuthToken: authToken ?? "",
      isSuccess: false,
    };
  }
};

export const useRefreshTokenApi = () => {
  const { message } = App.useApp();
  return createRefresh({
    interval: 50,
    refreshApiCallback: refreshApiCallback(message),
  });
};

export const renewTokenLoader = (queryClient: QueryClient) => async () => {
  const refreshToken = tokenStorage.getItem("_token_refresh", "raw");
  if (refreshToken) {
    await queryClient.prefetchQuery({
      queryKey: ["token/renew"],
      queryFn: async () => {
        const res = await authApi<LoginRes>("token/renew", {
          params: { refresh_token: refreshToken },
        });
        return res;
      },
    });
  }
  return null;
};

export const useRenewToken = (options?: { enabled: boolean }) => {
  return useQuery<LoginRes, Error>({
    queryKey: ["token/renew"],
    queryFn: async () => {
      const refreshToken = tokenStorage.getItem("_token_refresh", "raw");
      if (!refreshToken) {
        throw new Error("Unauthorized");
      }
      const res = await authApi<LoginRes>("token/renew", {
        params: { refresh_token: refreshToken },
      });
      return res;
    },
    staleTime: Infinity,
    ...options,
  });
};

export const useSignupMu = () => {
  return useMutation<SignupRes, Error, SignupVars>({
    mutationFn: async (variables) => {
      const response = await authApi("sign-up", {
        method: "POST",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Signup API response:", response);
      return response;
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
    onSuccess: (data) => {
      console.log('Signup successful:', data);
    },
  });
};

export const useActivateAccountMu = () => {
  const { mutate: login } = useLoginMu();
  const key = Math.random();
  const { message } = App.useApp();
  const navigate = useNavigate();
  return useMutation<any, Error, ActiveAccountVars>({
    mutationFn: (variables) => authApi("active-account", {
      params: { active_key: variables.activeKey ?? '' },
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    }),
    onSuccess: (_, { email, password }) => {
      message.loading({
        content: "Wait for a moment while we log you in!",
        duration: 0,
        key,
      });
      signUpStorage.clear();
      login({ email, password }, {
        onSettled: () => message.destroy(key),
        onSuccess: () => {
          navigate(ROUTES.ROOT.HOME.path);
        },
      });
    },
  });
};

export const useLoginMu = () => {
  return useMutation<LoginRes, Error, LoginVars>({
    mutationFn: async (variables) => {
      try {
        const response = await authApi<LoginRes>('login', {
          method: 'POST',
          body: JSON.stringify(variables),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Login API response:", response);
        return response;
      } catch (error) {
        console.error("Login API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export const useLogoutMu = () => {
  const signOut = useSignOut();
  const queryClient = useQueryClient();
  return useMutation<LogoutRes, Error, void>({
    mutationFn: () => authApi("logout", {
      method: "POST",
      useStorageToken: true,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    onSuccess: () => {
      signOut();
      queryClient.removeQueries({ queryKey: ["token/renew"] });
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};
