import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokens: [{ refreshToken: String }],
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;
