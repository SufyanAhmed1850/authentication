import User from "../Schema/User.js";
import bcrypt from "bcrypt";
import generateTokens from "../Utils/GenerateToken.js";
import cookieParser from "cookie-parser";

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            const userIp = req.ip;
            const tokens = generateTokens(user._id, userIp);
            user.refreshToken = tokens.refreshToken;
            user.ipAddress = userIp;
            await user.save();
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            });
            res.status(200).json({ accessToken: tokens.accessToken });
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.cookies);
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user without tokens
        const user = new User({
            email,
            password: hashedPassword,
        });

        // Save user to get user._id
        await user.save();

        // Generate tokens using the user's _id
        const { refreshToken, accessToken } = generateTokens(user._id);
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        // Update the user with tokens
        user.tokens = [{ refreshToken }];
        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user: { email, tokens: { accessToken, refreshToken } },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};

export { login, register };
