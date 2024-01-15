import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5050/api/auth/signup",
                {
                    email,
                    password,
                },
            );

            // Handle successful signup response, e.g., redirect or show a success message
            console.log("Signup successful:", response.data);
        } catch (error) {
            // Handle signup error, e.g., show an error message
            console.error("Signup error:", error.message);
        }
    };

    return (
        <div className="flex flex-col gap-4 text-slate-100 items-center">
            <h1 className="text-4xl font-bold">Signup</h1>
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
                onClick={handleSignup}
                className="bg-slate-300 text-black font-bold py-2 px-8 rounded-md"
            >
                Signup
            </button>
        </div>
    );
};

export default Signup;
