import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: String,
        password: String,
        tokens: [{ refreshToken: String }],
    },
    {
        timestamps: true,
    },
);

const User = model("User", userSchema);

export default User;
