// React
import { Navigate, Outlet } from "react-router-dom"
// Constants
import { APP_ROUTES } from "../../constants/route.const"

const PrivateRoute = ({ hasAccess, redirectPath, children }) => {
  // Redirect users (-> default: Sign In page) if not allowed
  if (!hasAccess) {
    return <Navigate to={redirectPath || APP_ROUTES.SIGN_IN} replace />
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;