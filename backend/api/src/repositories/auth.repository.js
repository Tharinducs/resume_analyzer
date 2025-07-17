import User from "../models/user.model"

export const findByEmail = (email) => User.findOne({ email })

export const findByEmailWithPassword = (email) => User.findOne({ email }).select("+password")

export const createUser = ({email,userName,picture,providerUserId,provider,mobileNo,address,password}) => {
    return User.create({
        email,
        name:userName,
        picture,
        providerUserId,
        provider,
        mobileNo,
        address,
        password
    })
}