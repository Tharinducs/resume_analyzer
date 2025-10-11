import { get, isEmpty } from "../utils/custom.lodash.js";
import { handleLogin, handleProviderLogin, handleRegister } from "../services/auth.service.js";
import { verifyProviderLogin } from "../utils/utility.js";
import { ENVIRONMENTS } from "../constants/common.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";

export const loginWithProvider = async (req, res, next) => {
    try {
        const payload = await verifyProviderLogin(get(req, "body.token"));
        const { email, name, picture, sub: googleId } = payload;
        const { user, token: jwt } = await handleProviderLogin({ email, name, picture, providerUserId: googleId, provider: "google" });
        console.log(`[GOOGLE LOGIN SUCCESS] UserID: ${user.id} Email: ${user.email} at ${new Date().toISOString()}`)
        res.cookie("token", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ code: "AUTH_GOOGLE_SUC", user });
    } catch (err) {
        next(new AppError(ERROR_CODES.AUTH.GOOGLE_LOGIN_FAILED, ERROR_MESSAGES[ERROR_CODES.AUTH.GOOGLE_LOGIN_FAILED, 500]))
    }
}

export const registerUser = async (req, res) => {
    const userData = {
        email: get(req, "body.email"),
        password: get(req, "body.password")
    }
    try {
        const user = await handleRegister(userData);
        res.status(200).json({ code: "AUTH_REGISTER_SUC", user });
    } catch (err) {
        const status = get(err,"status","")
        if(!isEmpty(status)){
            next(err)
        }
        next(new AppError(ERROR_CODES.AUTH.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.AUTH.TECHNICAL_ERR, 500]))
    }
}

export const doLogin = async (req, res) => {
    const userData = {
        email: get(req, "body.email"),
        password: get(req, "body.password")
    }

    console.log(`[LOGIN ATTEMPT] Email: ${userData.email} at ${new Date().toISOString()}`);

    try {
        const { user, token: jwt } = await handleLogin(userData);

        console.log(`[LOGIN SUCCESS] UserID: ${user.id} Email: ${user.email} at ${new Date().toISOString()}`);

        res.cookie("token", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ code: "AUTH_LOGIN_SUC", user });
    } catch (err) {
        console.warn(`[LOGIN FAILED] Email: ${userData.email} at ${new Date().toISOString()} - Reason: ${err.message}`);
        const status = get(err,"status","")
        if(!isEmpty(status)){
            next(err)
        }
        next(new AppError(ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, 401]))
    }
}