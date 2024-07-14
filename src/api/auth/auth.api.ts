import { createMutation, createQuery, inferData } from "react-query-kit";
import type {
  ActiveAccountVars,
  LoginRes,
  LoginVars,
  LogoutRes,
  SignupRes,
  SignupVars,
} from "./auth.types";
import { createApiFactory } from "../factory";
import { createRefresh, useSignIn, useSignOut } from "react-auth-kit";
import dayjs from "dayjs";
import { ROUTES, signUpStorage, tokenStorage } from "../../static";
import {
  RefreshTokenCallbackResponse,
  createRefreshParamInterface,
  signInFunctionParams,
} from "react-auth-kit/dist/types";
import { myJwtDecode } from "../../utils";
import dayjsDurationPlugin from "dayjs/plugin/duration.js";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { BaseApiRes } from "../../types/api.types";
import { App } from "antd";
import { useNavigate } from "react-router";
import type { MessageInstance } from "antd/es/message/interface";
dayjs.extend(dayjsDurationPlugin);

const authApi = createApiFactory(`/api/auth/`);

export const handleSignin =
  (signIn: (signInConfig: signInFunctionParams) => boolean) =>
  (data: LoginRes) => {
    const { accessToken, tokenType, refreshToken } = data.data;
    const decoded = myJwtDecode(accessToken);
    signIn({
      token: accessToken,
      tokenType: tokenType,
      expiresIn: dayjs
        .duration(dayjs.unix(decoded.exp).subtract(5, "minute").diff())
        .asMinutes(),
      authState: decoded,
      refreshToken: refreshToken.token,
      refreshTokenExpireIn: dayjs
        .duration(dayjs(refreshToken.expireDate).subtract(5, "minute").diff())
        .asMinutes(),
    });
  };

const refreshApiCallback =
  (
    message: MessageInstance
  ): createRefreshParamInterface["refreshApiCallback"] =>
  async ({ authToken, refreshToken }) => {
    try {
      const res = await authApi<LoginRes>("token/renew", {
        params: { refresh_token: refreshToken },
      });
      const { accessToken: newAuthToken, refreshToken: newRefreshToken } =
        res.data;
      const decoded = myJwtDecode(newAuthToken);
      const returnValue: RefreshTokenCallbackResponse = {
        newAuthToken,
        newAuthTokenExpireIn: dayjs
          .duration(dayjs.unix(decoded.exp).subtract(5, "minute").diff())
          .asMinutes(),
        isSuccess: true,
        newAuthUserState: decoded,
        newRefreshTokenExpiresIn: dayjs
          .duration(
            dayjs(newRefreshToken.expireDate).subtract(5, "minute").diff()
          )
          .asMinutes(),
        newRefreshToken: newRefreshToken.token,
      };
      return returnValue;
    } catch (error) {
      console.error("~ file: auth.api.ts:48 ~ error:", error);
      message.error(typeof error === "string" ? error : JSON.stringify(error));
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
  const { getKey, queryFn } = useRenewToken;
  const refreshToken = tokenStorage.getItem("_token_refresh", "raw");
  if (refreshToken)
    await queryClient.prefetchQuery(getKey(), {
      queryFn,
    });
  return null;
};

export const useRenewToken = createQuery<LoginRes, void, BaseApiRes>({
  primaryKey: "token/renew",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    const refreshToken = tokenStorage.getItem("_token_refresh", "raw");
    if (!refreshToken) {
      throw new Error("Unauthorized", {
        cause: 401,
      });
    }
    const res = await authApi<LoginRes>(primaryKey, {
      params: { refresh_token: refreshToken },
    });
    return res;
  },
  staleTime: Infinity,
});

export const signUpMu = createMutation<SignupRes, SignupVars, BaseApiRes>({
  mutationFn: (variables) =>
    authApi("sign-up", { method: "POST", body: variables }),
});
export const useSignupMu = () => {
  return signUpMu({
    onSuccess(data: any) {
      console.log('Signup successful:', data);
    },
  });
};
export const activateAccountMu = createMutation<
  any,
  ActiveAccountVars,
  BaseApiRes
>({
  mutationFn: (variables) =>
    authApi("active-account", {
      params: { active_key: variables.activeKey },
      method: "POST",
      body: variables,
    }),
});

export const useActivateAccountMu = () => {
  const { mutate: login } = useLoginMu();
  const key = Math.random();
  const { message } = App.useApp();
  const navigate = useNavigate();
  return activateAccountMu({
    onSuccess(_, { email, password }) {
      message.loading({
        content: "Wait for a moment while we logging you in!",
        duration: 0,
        key,
      });
      signUpStorage.clear();
      login(
        { email, password },
        {
          onSettled: () => message.destroy(key),
          onSuccess: () => {
            navigate(ROUTES.ROOT.HOME.path);
          },
        }
      );
    },
  });
};

export const loginMu = createMutation<LoginRes, LoginVars, BaseApiRes>({
  mutationFn: (variables) =>
    authApi("login", {
      method: "POST",
      body: variables,
    }),
});

export const useLoginMu = () => {
  const signIn = useSignIn();
  const queryClient = useQueryClient();

  return loginMu({
    onSuccess(data) {
      handleSignin(signIn)(data);
      queryClient.setQueryData<inferData<typeof useRenewToken>>(
        useRenewToken.getKey(),
        data
      );
    },
  });
};
export const logOutMu = createMutation<LogoutRes, void, BaseApiRes>({
  mutationFn: () =>
    authApi("logout", { method: "POST", useStorageToken: true }),
});

export const useLogoutMu = () => {
  const signOut = useSignOut();
  const queryClient = useQueryClient();
  return logOutMu({
    onSuccess: () => {
      signOut();
      queryClient.removeQueries(useRenewToken.getKey());
    },
  });
};
