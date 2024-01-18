import express from "express";
import { register, login, logout } from "../controller/auth.js";
import verifyRefreshToken from "../middleware/verifyRefresh.js";
import refreshTokens from "../controller/token.js";

const AUTH = express.Router();

AUTH.route("/signup").post(register);
AUTH.route("/login").post(login);
AUTH.route("/refresh-token").post(verifyRefreshToken, refreshTokens);
AUTH.route("/logout").post(verifyRefreshToken, logout);

export default AUTH;
