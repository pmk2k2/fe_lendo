import { QueryClient, useQuery } from "@tanstack/react-query";
import { createApiFactory } from "../factory";
import {createRefresh} from "react-auth-kit";
import dayjs from "dayjs";
import { tokenStorage } from "../../static";
import { myJwtDecode } from "../../utils";
import dayjsDurationPlugin from "dayjs/plugin/duration.js";
import {App, message} from "antd";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.ts";
import { LoginRes } from "./auth.types.ts";
import { signInFunctionParams } from "react-auth-kit/dist/types";
import {handleApiError, handleError, handleFirebaseError} from "../../utils/errorHandlers.ts";

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
            expiresIn: dayjs.duration(
                dayjs.unix(decoded.exp).subtract(5, "minute").diff()
            ).asMinutes(),
            authState: decoded,
            refreshToken: refreshToken.token,
            refreshTokenExpireIn: dayjs.duration(
                dayjs(refreshToken.expireDate).subtract(5, "minute").diff()
            ).asMinutes(),
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


const processUserLogin = async (
    user: any,
    navigate: (path: string) => void,
    isSignup: boolean
) => {
  const idToken = await user.getIdToken();
  localStorage.setItem("user", JSON.stringify(user));

  const emailToSend = user.email || "";
  await sendTokenToBackend(idToken, { email: emailToSend, uid: user.uid });

  if (isSignup) {
    await sendEmailVerification(user);
    await auth.signOut();
    message.success('A verification email has been sent. Please check your inbox.');
    navigate("/login");

  } else {
    navigate("/home");
  }
};

const sendTokenToBackend = async (
    idToken: string,
    userData: { email: string; uid: string }
) => {
  try {
    const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // Pass the ID token in the Authorization header
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    console.log("User authenticated on backend:", data);
  } catch (error) {
    console.error("Error sending token to backend:", error);
    handleError(message);
  }
};

export const useAuthMu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authAction = async (
      email: string,
      password: string,
      isSignup: boolean,
      navigate: (path: string) => void
  ): Promise<UserCredential | void> => {
    setLoading(true);
    setError(null);

    try {
      let userCredential: UserCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
      }

      const user = userCredential.user;
      await processUserLogin(user, navigate, isSignup);
      return userCredential;
    } catch (err: any) {
      setError(handleFirebaseError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { authAction, loading, error, setError };
};

export const useSocialAuthMu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithProvider = async (
      provider: any,
      navigate: (path: string) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await processUserLogin(user, navigate, false); // Change to false for social login
    } catch (err: any) {
      setError(handleFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  return { loginWithProvider, loading, error, setError };
};

export const useRefreshTokenApi = () => {
  const { message } = App.useApp();
  const REFRESH_INTERVAL = 50;

  return createRefresh({
    interval: REFRESH_INTERVAL,
    refreshApiCallback: async ({ authToken, refreshToken }) => {
      try {
        const res = await authApi<LoginRes>("token/renew", {
          params: { refresh_token: refreshToken ?? "" },
        });

        const { accessToken: newAuthToken, refreshToken: newRefreshToken } = res.data;
        const decoded = myJwtDecode(newAuthToken);

        return {
          newAuthToken,
          newAuthTokenExpireIn: dayjs.duration(
              dayjs.unix(decoded.exp).subtract(5, "minute").diff()
          ).asMinutes(),
          isSuccess: true,
          newAuthUserState: decoded,
          newRefreshTokenExpiresIn: dayjs.duration(
              dayjs(newRefreshToken.expireDate).subtract(5, "minute").diff()
          ).asMinutes(),
          newRefreshToken: newRefreshToken.token,
        };
      } catch (error) {
        handleError(message);
        return {
          newAuthToken: authToken ?? "",
          isSuccess: false,
        };
      }
    },
  });
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
