import express from "express";
import { login, register } from "../../controller/auth.js";

const AUTH = express.Router();

AUTH.route("/login").post(login);
AUTH.route("/signup").post(register);

export default AUTH;
