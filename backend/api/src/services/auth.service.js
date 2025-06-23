import * as authRepo from "../repositories/auth.repository"
import { isEmpty } from "lodash"
import { generateToken } from "../utils/jwt.util"

export const handleProviderLogin = async ({ email, userName, picture, providerUserId, provider }) => {
    let user = await authRepo.findByEmail({ email })
    if (isEmpty(user)) {
        user = await authRepo.createUser({ email, userName, picture, providerUserId, provider })
    }
    const token = generateToken(user)
    return { user, token }
}

export const handleRegister = async ({ email, userName, picture, providerUserId }) => {
    let user = await authRepo.findByEmail({ email })
    if (isEmpty(user)) {
        return await authRepo.createUser({ email, userName, picture, providerUserId, provider: "local" })
    }
    throw new Error({ msg: `User already exists with given email address:${email}`});
}
