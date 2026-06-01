import { get, isEmpty, AppError } from "@ra/shared";
import { handleLogin, handleProviderLogin, handleRefreshToken, handleRegister, getUser, updateUser } from "../services/auth.service.js";
import { verifyProviderLogin } from "../utils/utility.js";
import { ENVIRONMENTS, AVATAR_UPLOAD_PATH } from "../constants/common.js";
import multer from "multer";
import * as crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

fs.mkdirSync(AVATAR_UPLOAD_PATH, { recursive: true });

const avatarStorage = multer.diskStorage({
  destination: AVATAR_UPLOAD_PATH,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, WebP and GIF images are allowed."));
    }
    cb(null, true);
  },
});

import { API_CODES } from "../constants/apiCodes.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";

export const loginWithProvider = async (req, res, next) => {
    try {
        const payload = await verifyProviderLogin(get(req, "body.token"));
        const { email, name, picture, sub: googleId } = payload;
        const { user, token: jwt ,refreshToken} = await handleProviderLogin({ email, name, picture, providerUserId: googleId, provider: "google" });
        console.log(`[GOOGLE LOGIN SUCCESS] UserID: ${user.id} Email: ${user.email} at ${new Date().toISOString()}`)
        res.cookie("token", jwt, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ code: API_CODES.AUTH.AUTH_GOOGLE_SUC, user });
    } catch (err) {
        console.warn(`[GOOGLE LOGIN FAILED] at ${new Date().toISOString()} - Reason: ${err.message}`);
        next(new AppError(API_CODES.AUTH.GOOGLE_LOGIN_FAILED, ERROR_MESSAGES[API_CODES.AUTH.GOOGLE_LOGIN_FAILED], 401))
    }
}

export const registerUser = async (req, res,next) => {
    const userData = {
        email: get(req, "body.email"),
        password: get(req, "body.password")
    }
    try {
        const user = await handleRegister(userData);
        res.status(200).json({ code: API_CODES.AUTH.AUTH_REGISTER_SUC, user });
    } catch (err) {
        const status = get(err, "status", "")
        if (!isEmpty(status)) {
            next(err)
        }
        next(new AppError(API_CODES.AUTH.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.AUTH.TECHNICAL_ERR], 500))
    }
}

export const doLogin = async (req, res, next) => {
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
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ code: "AUTH_LOGIN_SUC", user });
    } catch (err) {
        console.warn(`[LOGIN FAILED] Email: ${userData.email} at ${new Date().toISOString()} - Reason: ${err.message}`);
        const status = get(err, "status", "")
        if (!isEmpty(status)) {
            next(err)
        }
        next(new AppError(API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT, ERROR_MESSAGES[API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT], 401))
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ code: "AUTH_LOGOUT_SUC", message: "Logged out successfully" });
}

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(401).json({ code: API_CODES.AUTH.NO_REFRESH_TOKEN, message: ERROR_MESSAGES[API_CODES.AUTH.NO_REFRESH_TOKEN] });

        const newTokenData = await handleRefreshToken(refreshToken);
        if (!newTokenData) return res.status(401).json({ code: API_CODES.AUTH.INVALID_REFRESH_TOKEN, message: ERROR_MESSAGES[API_CODES.AUTH.INVALID_REFRESH_TOKEN] });

        console.log("newTokenData:", newTokenData);
        res.cookie("token", newTokenData.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", newTokenData.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        const user = await getUser(get(req, "body.userId"));
        res.status(200).json({ code: API_CODES.AUTH.AUTH_REFRESH_TOKEN_SUC, user });
    } catch (err) {
        console.error("Refresh Token Error:", err);
        next(new AppError(API_CODES.AUTH.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.AUTH.TECHNICAL_ERR], 500))
    }
}

export const getMe = (req, res) => {
    const user = get(req, "user", null);
    if (isEmpty(user)) {
        return res.status(404).json({ code: "USER_NOT_FOUND", message: "User not found" });
    }
    res.status(200).json({ code: "AUTH_ME_SUC", user });
}

export const updateMe = async (req, res, next) => {
    const userId = get(req, "user.id", null);
    if (!userId) {
        return res.status(401).json({ code: API_CODES.AUTH.USER_NOT_FOUND, message: "Not authenticated" });
    }
    const allowed = ["name", "mobileNo", "address", "bio", "jobTitle", "location", "notifications"];
    const updateData = {};
    allowed.forEach((key) => {
        if (req.body[key] !== undefined) updateData[key] = req.body[key];
    });
    try {
        const user = await updateUser(userId, updateData);
        res.status(200).json({ code: "AUTH_UPDATE_SUC", message: "Profile updated successfully", user });
    } catch (err) {
        next(new AppError(API_CODES.AUTH.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.AUTH.TECHNICAL_ERR], 500));
    }
};

export const handleAvatarUpload = (req, res, next) => {
    avatarUpload.single("avatar")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ code: "AVATAR_UPLOAD_FAILED", message: err.message });
        }
        next();
    });
};

export const updatePicture = async (req, res, next) => {
    const userId = get(req, "user.id", null);
    if (!userId) {
        return res.status(401).json({ code: API_CODES.AUTH.USER_NOT_FOUND, message: "Not authenticated" });
    }
    if (!req.file) {
        return res.status(400).json({ code: "AVATAR_UPLOAD_FAILED", message: "No image file provided." });
    }
    const protocol = req.protocol;
    const host = req.get("host");
    const pictureUrl = `${protocol}://${host}/uploads/avatars/${req.file.filename}`;
    try {
        const user = await updateUser(userId, { picture: pictureUrl });
        res.status(200).json({ code: "AUTH_UPDATE_SUC", message: "Profile picture updated.", user });
    } catch (err) {
        next(new AppError(API_CODES.AUTH.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.AUTH.TECHNICAL_ERR], 500));
    }
};