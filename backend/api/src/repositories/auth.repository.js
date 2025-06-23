import User from "../models/user.model"

export const findByEmail = (email) => User.findOne({ email })

export const createUser = ({email,userName,picture,providerUserId,provider}) => {
    return User.create({
        email,
        name:userName,
        picture,
        providerUserId,
        provider
    })
}