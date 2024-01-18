import jwt from "jsonwebtoken";

const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};

export default generateTokens;
