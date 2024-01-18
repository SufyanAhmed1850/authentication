import User from "../schema/user.js";
import generateTokens from "../utils/generateToken.js";

const refreshTokens = async (req, res) => {
    try {
        console.log("refreshToken");
        const cookieToken = req.cookies.jwt;
        const userId = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const { refreshToken, accessToken } = generateTokens(userId);
        console.log("Old", cookieToken);
        console.log("New", refreshToken);
        user.tokens = user.tokens.map((token) => {
            if (token.refreshToken === cookieToken) {
                token.refreshToken = refreshToken;
            }
            return token;
        });
        await user.save();
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "success", user, accessToken });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error });
    }
};

export default refreshTokens;
