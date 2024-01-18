import { useContext } from "react";
import { axiosPrivate } from "../api/axios";
import iconLogout from "../assets/logout.svg";
import UserContext from "../Context/UserContext";

const Home = () => {
    const { dispatch } = useContext(UserContext);
    const logout = async () => {
        try {
            const response = await axiosPrivate.post("auth/logout");
            console.log(response);
            dispatch({ type: "logout" });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <img
                onClick={logout}
                className="fixed top-8 right-8 cursor-pointer"
                src={iconLogout}
                alt="logout"
            />
            <h1 className="text-slate-100 text-3xl font-bold">Authenticated</h1>
        </div>
    );
};

export default Home;
