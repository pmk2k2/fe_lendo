import TypedLocalStore from "typed-local-store";
import type { IDecodedToken, SignupVars } from "./api/auth/auth.types";
import { route, string } from "react-router-typesafe-routes/dom";

interface TokenSchema {
  _token: string;
  _token_refresh: string;
  _token_type: number;
  _token_state: IDecodedToken;
  _token_refresh_time: string;
  _token_storage: string;
}
interface SignUpSchema {
  vars: SignupVars;
}

export const tokenStorage = new TypedLocalStore<TokenSchema>();
export const signUpStorage = new TypedLocalStore<SignUpSchema>({
  storage: "sessionStorage",
});

export const ROUTES = {
  ROOT: route("", undefined, {
    HOME: route(""),
    LANDINGPAGE: route("home"),
    ABOUT: route("about"),
    CONTACT: route("contact"),
    HELP: route("help"),
    SIGNUP: route("signup"),
    LOGIN: route("login"),
    PRODUCTS: route("products/:id", {
      params: { id: string().defined() },
    }),
    PROTECTED: route("protected", undefined, {
      PROFILE: route("profile", undefined, {
        AddProduct: route("add-product"),
      }),
    }),
  }),
  loginRoot: route("login", undefined, {
    Login: route(""),
    SignUp: route("signup"),
    ActivateAccount: route("activate-account"),
    EmailVerification: route("email-verification"),
  }),
};

