import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import Signup from "./Pages/signup";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default App;
