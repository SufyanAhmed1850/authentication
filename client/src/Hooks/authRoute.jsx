import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Loading from "../Pages/Loading";

const AuthRoute = ({ children }) => {
    let location = useLocation();
    const { state, isLoading } = useContext(UserContext);

    if (!state?.isAuthenticated && !isLoading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return isLoading ? <Loading /> : children;
};

export default AuthRoute;
