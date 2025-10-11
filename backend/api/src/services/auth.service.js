import * as authRepo from "../repositories/auth.repository.js"
import { get, isEmpty } from "../utils/custom.lodash.js"
import { generateToken } from "../utils/jwt.util.js"
import { PROVIDER } from "../constants/auth.js"
import { validatePassword } from "../utils/utility.js"
import { AppError } from "../errors/AppError.js"
import { ERROR_CODES } from "../errors/errorCodes.js"
import { ERROR_MESSAGES } from "../errors/errorMessages.js"

export const handleProviderLogin = async ({ email, name, picture, providerUserId, provider }) => {
    try {
        let user = await authRepo.findByEmail(email);
        if (isEmpty(user)) {
            console.log("No user found, creating new user.");
            user = await authRepo.createUser({ email, name, picture, providerUserId, provider });
        }
        const token = generateToken(user);
        return { user, token }
    } catch (err) {
        console.error("Error in handleProviderLogin:", err);
        throw err;
    }
}

export const handleRegister = async ({ email, userName, password }) => {
    let user = await authRepo.findByEmail({ email });
    if (isEmpty(user)) {
        user = await authRepo.createUser({ email, userName, password, provider: PROVIDER.LOCAL });
        user.password = undefined;

        return user;
    }
    throw new AppError(ERROR_CODES.AUTH.THERE_IS_A_USER_ALREADY_WITH_EMAIL, ERROR_MESSAGES[ERROR_CODES.AUTH.THERE_IS_A_USER_ALREADY_WITH_EMAIL], 401)
}

export const handleLogin = async ({ email, password }) => {
    let user = await authRepo.findByEmailWithPassword({ email });

    if (!isEmpty(user)) {
        const validPassword = await validatePassword(password, get(user, "password", null));

        if (!validPassword) {
            throw new AppError(ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT], 401)
        }

        const token = generateToken(user);
        user.password = undefined;

        return { user, token }
    }
    throw new AppError(ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT], 401)
}

