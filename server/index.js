import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";
import router from "./routes/router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

mongoose
    .connect(process.env.DB_URI)
    .then(() =>
        console.log(chalk.bgGreenBright(chalk.black("Connected to MongoDB!"))),
    )
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(router);

app.get("/", (req, res) => {
    res.json({
        message: `Server up on PORT ${PORT}`,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server is running on port ${PORT}`));
});
