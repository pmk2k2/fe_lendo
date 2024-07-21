import { BaseApiRes } from "../../types/api.types";

export interface SignupVars {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupRes extends BaseApiRes<string> {}

export interface ActiveAccountVars extends SignupVars {
  activeKey: string;
}

export interface LoginVars {
  email: string;
  password: string;
}

export interface LoginRes extends BaseApiRes<{
  accessToken: string;
  tokenType: string;
  refreshToken: {
    id: string;
    token: string;
    expireDate: string;
  };
}> {}

export interface LogoutRes extends BaseApiRes<string> {}

export interface ValidateTokenVars {
  token: string | undefined;
}

export type RenewTokenVars = {
  refreshToken: LoginRes["data"]["refreshToken"]["token"];
};

export interface IDecodedToken {
  exp: number;
  first_name: string;
  iat: number;
  id: string;
  last_name: string;
  role: string;
  sub: string;
}
