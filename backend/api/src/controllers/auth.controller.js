import { get } from "lodash";
import { handleLogin, handleProviderLogin, handleRegister } from "../services/auth.service";
import { verifyProviderLogin } from "../utils/utility";
import { AUTH_ERRORS, GOOGLE_LOGIN_FAILED } from "../constants/auth";
import { ENVIRONMENTS } from "../constants/common";

export const loginWithProvider = async (req, res) => {
    try {
        const payload = verifyProviderLogin(get(req, "body.token"));
        const { email, name, picture, sub: googleId } = payload;
        const { user, token: jwt } = await handleProviderLogin({ email, userName: name, picture, providerUserId: googleId, provider: get(req, "body.provider") })

        res.cookie("token", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ code: "AUTH_GOOGLE_SUC", user });
    } catch (err) {
        res.status(401).json({ code: "AUTH_GOOGLE_ERR", message: AUTH_ERRORS.GOOGLE_LOGIN_FAILED })
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
        res.status(500).json({ code: "AUTH_REGISTER_ERR", message: AUTH_ERRORS.TECHNICAL_ERR })
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

        res.status(401).json({ code: "AUTH_LOGIN_ERR", message: AUTH_ERRORS.USERNAME_PASSWORD_INCORRECT})
    }
}