import { get } from "@ra/shared";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";
import { API_CODES } from "../constants/apiCodes.js";
import { verifyAuthToken } from "../utils/jwt.util.js";

export const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.token;
    console.log(req.cookies,"req.cookies")
    const refreshToken = req.cookies.refreshToken;
    let decoded = null;
    if (!accessToken) {
        return res.status(401).json({ code: API_CODES.AUTH.AUTH_HEADER_MISSING, message: ERROR_MESSAGES[API_CODES.AUTH.AUTH_HEADER_MISSING] });
    }

    try {
        decoded = verifyAuthToken(accessToken);
        req.user = { id: get(decoded, 'id', null), email: get(decoded, 'email', null) };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError' && refreshToken) {
            // decoded is null here — read from refreshToken instead
            const refreshDecoded = verifyAuthToken(refreshToken)

            const newAccessToken = await generateToken({
                _id: get(refreshDecoded, 'id', null),
                email: get(refreshDecoded, 'email', null)
            })

            res.cookie('token', newAccessToken, { httpOnly: true })
            req.user = {
                id: get(refreshDecoded, 'id', null),
                email: get(refreshDecoded, 'email', null)
            }
            return next()
        }
        return res.status(401).json({ code: API_CODES.AUTH.INVALID_AUTH_HEADER, message: ERROR_MESSAGES[API_CODES.AUTH.INVALID_AUTH_HEADER] });
    }
};