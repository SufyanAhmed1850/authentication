import User from "../schema/user.js";
import generateTokens from "../utils/generateToken.js";
import joiValidateUser from "../schema/joi/joiUser.js";

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        await joiValidateUser.validateAsync(req.body);
        const user = new User({
            fullName,
            email,
            password,
        });
        await user.save();
        const { refreshToken, accessToken } = generateTokens(user._id);
        user.tokens = [{ refreshToken }];
        await user.save();
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: "User created successfully",
            user,
            accessToken,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && password === user.password) {
            const { refreshToken, accessToken } = generateTokens(user._id);
            user.tokens.push({ refreshToken });
            await user.save();
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ user, accessToken });
        } else {
            res.status(400).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const logout = async (req, res) => {
    try {
        const cookieToken = req.cookies.jwt;
        const userId = req.user;
        console.log(userId);

        // Use the $pull operator to remove the specified token from the tokens array
        const updateResult = await User.updateOne(
            { _id: userId },
            { $pull: { tokens: { refreshToken: cookieToken } } },
        );

        // Check if the update was successful
        if (updateResult.nModified === 0) {
            return res
                .status(404)
                .send({ message: "Token not found for the user" });
        }

        // Clear the "jwt" cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        // Send success response
        res.status(200).send({ message: "Logged out" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export { register, login, logout };
