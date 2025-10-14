import { get } from "lodash";

export const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    let decoded = null;
    if (!accessToken) {
        return res.status(401).json({ code: ERROR_CODES.AUTH.AUTH_HEADER_MISSING, message: ERROR_MESSAGES[ERROR_CODES.AUTH.AUTH_HEADER_MISSING] });
    }

    try {
        decoded = verifyAuthToken(accessToken);
        req.user = { id: get(decoded, 'id', null), email: get(decoded, 'email', null) };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError' && refreshToken) {
            const newAccessToken = await generateToken({ _id: get(decoded, 'id', null), email: get(decoded, 'email', null) });
            res.cookie('token', newAccessToken, { httpOnly: true });
            req.user = { id: get(decoded, 'id', null), email: get(decoded, 'email', null) };
            return next();
        }
        return res.status(401).json({ code: ERROR_CODES.AUTH.INVALID_AUTH_HEADER, message: ERROR_MESSAGES[ERROR_CODES.AUTH.INVALID_AUTH_HEADER] });
    }
};