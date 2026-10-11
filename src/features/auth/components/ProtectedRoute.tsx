import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { ROUTES } from "../../../routes/paths";

const ProtectedRoute = (): React.ReactElement => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user !== null && state.auth.token !== null,
  );

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
