import { useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Signup = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSignup = async () => {
        try {
            if (
                !fullName.trim() ||
                !email.trim() ||
                !password.trim() ||
                !repeatPassword.trim()
            )
                return;
            console.log("Sign up");
            const response = await axios.post(
                "auth/signup",
                {
                    fullName,
                    email,
                    password,
                    repeatPassword,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const { user, accessToken } = response.data;
            dispatch({ type: "login", payload: { user, accessToken } });
            console.log("Signup successful:", response.data);
        } catch (error) {
            console.error("Signup error:", error);
        }
    };
    return (
        <div className="flex flex-col gap-4 text-slate-100 w-72">
            <h1 className="text-4xl font-bold">Signup</h1>
            <div className="flex gap-3 flex-col">
                <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    type="email"
                    className="input-styles no-outline rounded-md"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="input-styles no-outline rounded-md"
                />
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        className="input-styles no-outline rounded-md w-full"
                    />
                    <p className="text-sm text-red-500 mt-1 mb-[-4px]">
                        *Must contain at least 6 characters
                    </p>
                </div>
                <input
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat password"
                    type="password"
                    className="input-styles no-outline rounded-md"
                />
            </div>
            <button
                onClick={handleSignup}
                className="bg-teal-300 hover:bg-teal-400 active:bg-teal-200 text-black font-bold py-2 px-8 rounded-md"
            >
                Signup
            </button>
            <p>
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-teal-300 hover:text-teal-400 active:text-teal-200 cursor-pointer select-none"
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default Signup;
