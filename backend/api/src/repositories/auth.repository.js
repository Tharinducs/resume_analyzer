import User from "../models/user.model.js"

export const findByEmail = (email) => User.findOne({ email })

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