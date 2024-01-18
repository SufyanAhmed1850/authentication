import express from "express";
import AUTH from "./auth.js";

const router = express.Router();

router.use("/api/auth", AUTH);

export default router;
