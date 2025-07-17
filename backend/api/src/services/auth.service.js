import * as authRepo from "../repositories/auth.repository"
import { get, isEmpty } from "lodash"
import { generateToken } from "../utils/jwt.util"
import { AUTH_ERRORS, INVALID_USER, PROVIDER, THERE_IS_A_USER_ALREADY_WITH_EMAIL } from "../constants/auth"
import { validatePassword } from "../utils/utility"

export const handleProviderLogin = async ({ email, userName, picture, providerUserId, provider }) => {
    let user = await authRepo.findByEmail({ email });
    if (isEmpty(user)) {
        user = await authRepo.createUser({ email, userName, picture, providerUserId, provider });
    }
    const token = generateToken(user);
    return { user, token }
}

export const handleRegister = async ({ email, userName, password }) => {
    let user = await authRepo.findByEmail({ email });
    if (isEmpty(user)) {
        user = await authRepo.createUser({ email, userName, password, provider: PROVIDER.LOCAL });
        user.password = undefined;
        
        return user;
    }
    throw new Error(`${AUTH_ERRORS.THERE_IS_A_USER_ALREADY_WITH_EMAIL}${email}`);
}

export const handleLogin = async ({ email, password }) => {
    let user = await authRepo.findByEmailWithPassword({ email });

    if (!isEmpty(user)) {
        const validPassword = await validatePassword(password, get(user, "password", null));

        if (!validPassword) {
            throw new Error(AUTH_ERRORS.INVALID_USER);
        }

        const token = generateToken(user);
        user.password = undefined;

        return { user, token }
    }
    throw new Error(AUTH_ERRORS.INVALID_USER);
}

