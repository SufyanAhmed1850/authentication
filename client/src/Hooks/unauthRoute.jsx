import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Loading from "../Pages/Loading";

const UnauthRoute = ({ children }) => {
    const { state, isLoading } = useContext(UserContext);

    if (state?.isAuthenticated && !isLoading) {
        return <Navigate to="/" replace />;
    }

    return isLoading ? <Loading /> : children;
};

export default UnauthRoute;
