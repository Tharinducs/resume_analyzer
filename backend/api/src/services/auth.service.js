import * as authRepo from "../repositories/auth.repository.js"
import { get, isEmpty } from "../lib/custom.lodash.js"
import { generateToken, verifyRefreshToken, generateRefreshToken } from "../utils/jwt.util.js"
import { PROVIDER } from "../constants/auth.js"
import { validatePassword } from "../utils/utility.js"
import { AppError } from "../errors/AppError.js"
import { API_CODES } from "../constants/apiCodes.js"
import { ERROR_MESSAGES } from "../errors/errorMessages.js"

export const handleProviderLogin = async ({ email, name, picture, providerUserId, provider }) => {
    try {
        let user = await authRepo.findByEmail(email);
        if (isEmpty(user)) {
            console.log("No user found, creating new user.");
            user = await authRepo.createUser({ email, name, picture, providerUserId, provider });
        }
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        authRepo.saveRefreshToken(user.id, refreshToken);
        return { user, token, refreshToken }
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
    throw new AppError(API_CODES.AUTH.THERE_IS_A_USER_ALREADY_WITH_EMAIL, ERROR_MESSAGES[API_CODES.AUTH.THERE_IS_A_USER_ALREADY_WITH_EMAIL], 401)
}

export const handleLogin = async ({ email, password }) => {
    let user = await authRepo.findByEmailWithPassword({ email });

    if (!isEmpty(user)) {
        const validPassword = await validatePassword(password, get(user, "password", null));

        if (!validPassword) {
            throw new AppError(API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT], 401)
        }

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        user.password = undefined;

        return { user, token, refreshToken }
    }
    throw new AppError(API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT], 401)
}

export const handleLogout = async (refreshToken) => {
    if (isEmpty(refreshToken)) {
        throw new AppError(API_CODES.AUTH.NO_REFRESH_TOKEN, ERROR_MESSAGES[API_CODES.AUTH.NO_REFRESH_TOKEN], 401)
    }
    const tokenDoc = await authRepo.findRefreshToken(refreshToken);
    if (isEmpty(tokenDoc)) {
        throw new AppError(API_CODES.AUTH.INVALID_REFRESH_TOKEN, ERROR_MESSAGES[API_CODES.AUTH.INVALID_REFRESH_TOKEN], 401)
    }
    await authRepo.deleteRefreshToken(refreshToken);
}

export const handleRefreshToken = async (refreshToken) => {
    if (isEmpty(refreshToken)) {
        return null;
    }
    const tokenDoc = await authRepo.findRefreshToken(refreshToken);
    if (isEmpty(tokenDoc)) {
        return null;
    }
    const { id: userId, email } = verifyRefreshToken(refreshToken);
    if (!userId) {
        throw new AppError(API_CODES.AUTH.INVALID_REFRESH_TOKEN, ERROR_MESSAGES[API_CODES.AUTH.INVALID_REFRESH_TOKEN], 401)
    }
    const newAccessToken = generateToken({ _id: userId, email });
    const newRefreshToken = generateRefreshToken({ _id: userId, email });
    await authRepo.saveRefreshToken(userId, newRefreshToken);
    console.log("Refresh token handled successfully for userId:", userId);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export const getUser = async (userId) => {
    try {
        const user = await authRepo.findById(userId);
        if (isEmpty(user)) {
            throw new AppError(API_CODES.AUTH.USER_NOT_FOUND, ERROR_MESSAGES[API_CODES.AUTH.USER_NOT_FOUND], 404)
        }
        user.password = undefined;
        return user;
    } catch (err) {
        console.error("Error fetching user:", err);
        throw new AppError(API_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR], 500);
    }
}

export const updateUser = async (userId, updateData) => {
    const user = await authRepo.updateUser(userId, updateData);
    if (isEmpty(user)) {
        throw new AppError(API_CODES.AUTH.USER_NOT_FOUND, ERROR_MESSAGES[API_CODES.AUTH.USER_NOT_FOUND], 404)
    }
    user.password = undefined;
    return user;
}

