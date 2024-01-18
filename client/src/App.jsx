import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AuthRoute from "./Hooks/AuthRoute";
import UnauthRoute from "./Hooks/UnAuthRoute";
import Home from "./Pages/Home";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthRoute>
                        <Home />
                    </AuthRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <UnauthRoute>
                        <Login />
                    </UnauthRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <UnauthRoute>
                        <Signup />
                    </UnauthRoute>
                }
            />
        </Routes>
    );
};

export default App;
