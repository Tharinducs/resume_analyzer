import User from "../models/user.model.js"
import RefreshToken from "../models/token.model.js"
export const findByEmail = (email) => User.findOne({ email })

export const findById = (id) => User.findById(id)

export const updateUser = (userId, updateData) => User.findByIdAndUpdate(userId, updateData, { new: true })

export const findByEmailWithPassword = (email) => User.findOne({ email }).select("+password")

export const createUser = async ({ email, name, picture, providerUserId, provider, mobileNo, address, password }) => {
    try {
        return await User.create({
            email,
            name,
            picture,
            providerUserId,
            name,
            provider,
            mobileNo,
            address,
            password
        })
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
}

export const saveRefreshToken = async (userId, token) => {
    try {
        const existingToken = await RefreshToken.findOne({ userId });
        if (existingToken) {
            existingToken.token = token;
            await existingToken.save();
        } else {
            await RefreshToken.create({ userId, token, createdAt: new Date() });
        }
    } catch (err) {
        console.error("Error saving refresh token:", err);
        throw err;
    }
}

export const findRefreshToken = async (token) => {
    try {
        if (typeof token !== "string" || token.trim() === "") {
            throw new Error("Invalid refresh token");
        }

        const safeToken = token.trim();
        return await RefreshToken.findOne({ token: safeToken });
    } catch (err) {
        console.error("Error finding refresh token:", err);
        throw err;
    }
}

export const deleteRefreshToken = async (token) => {
    try {
        await RefreshToken.deleteOne({ token });
    } catch (err) {
        console.error("Error deleting refresh token:", err);
        throw err;
    }
}