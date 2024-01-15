import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div className="flex flex-col gap-4 text-slate-100 items-center]">
            <h1 className="text-4xl font-bold">Login</h1>
            <div className="flex gap-3 flex-col">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    type="email"
                    className="input-styles no-outline rounded-md"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="input-styles no-outline rounded-md"
                />
            </div>
            <button className="bg-slate-300 text-black font-bold py-2 px-8 rounded-md">
                Login
            </button>
        </div>
    );
};

export default Login;
