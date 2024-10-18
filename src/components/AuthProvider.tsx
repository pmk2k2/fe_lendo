import { type FC } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { AuthProvider as AuthProviderLib } from "react-auth-kit";
import { useRefreshTokenApi } from "../api/auth/auth.api";

export const AuthProvider: FC = () => {
  const refreshTokenApi = useRefreshTokenApi();
  const navigation = useNavigation();
  return (
    <AuthProviderLib
      authType="localstorage"
      authName={"_token"}
      refresh={refreshTokenApi}
    >
      {navigation.state === "loading" ? (
        <div className="text-red-500">loading</div>
      ) : (
        <Outlet />
      )}
    </AuthProviderLib>
  );
};
