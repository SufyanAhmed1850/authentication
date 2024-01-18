import jwt from "jsonwebtoken";

const verifyRefreshToken = async (req, res, next) => {
    try {
        const token = req?.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = decoded.id;
            console.log("NEXT");
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(504).json({ error, message: "Unautherized" });
    }
};

export default verifyRefreshToken;
