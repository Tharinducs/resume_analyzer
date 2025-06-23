import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        picture: String,
        providerUserId: String,
        provider: { type: String, default: "local" },
        mobileNo: { type: String, unique: true },
        address: String
    },
    { timestamps: true }
)

export default mongoose.Model("User",userSchema)