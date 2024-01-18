import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import axios from "../api/axios";

const Login = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            if (!email.trim() || !password.trim()) return;
            console.log("Login");
            const response = await axios.post(
                "auth/login",
                {
                    email,
                    password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );
            const { user, accessToken } = response.data;
            dispatch({ type: "login", payload: { user, accessToken } });
            console.log("Login successful:", response.data);
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    console.log(state);

    return (
        <div className="flex flex-col gap-4 text-slate-100 w-72">
            <h1 className="text-4xl font-bold">Login</h1>
            <div className="flex gap-3 flex-col">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="input-styles no-outline rounded-md"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="input-styles no-outline rounded-md"
                />
            </div>
            <button
                onClick={handleLogin}
                className="bg-teal-300 hover:bg-teal-400 active:bg-teal-200 text-black font-bold py-2 px-8 rounded-md"
            >
                Login
            </button>
            <p>
                Don’t have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="text-teal-300 hover:text-teal-400 active:text-teal-200 cursor-pointer select-none"
                >
                    Create account
                </span>
            </p>
        </div>
    );
};

export default Login;
