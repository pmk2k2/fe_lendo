import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { ROUTES } from "../static";

export const RequireAuth = () => {
  const isAuthed = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthed()) {
    return (
      <Navigate
        to={ROUTES.loginRoot.Login.path}
        replace
        state={{ from: location.pathname }}
      />
    );
  } else return <Outlet />;
};
