import { createContext, useEffect, useState, useReducer } from "react";
import axios from "../api/axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const initialUser = {
        user: {},
        accessToken: null,
        isAuthenticated: false,
    };
    const userReducer = (state, action) => {
        switch (action.type) {
            case "login":
                return {
                    user: action.payload.user,
                    accessToken: action.payload.accessToken,
                    isAuthenticated: true,
                };
            case "logout":
                return { user: {}, accessToken: null, isAuthenticated: false };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(userReducer, initialUser);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.post("auth/refresh-token", null, {
                    withCredentials: true,
                });
                const { user, accessToken } = response.data;
                dispatch({ type: "login", payload: { user, accessToken } });
            } catch (error) {
                console.error("Authentication error:", error);
                dispatch({ type: "logout" });
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthentication();
    }, []);
    return (
        <UserContext.Provider value={{ isLoading, state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
