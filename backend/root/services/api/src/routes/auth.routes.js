import express from 'express';
import { AUTH_ROUTES } from '../constants/routes.js';
import { doLogin, registerUser,loginWithProvider,logout,refreshToken,getMe,updateMe,handleAvatarUpload,updatePicture } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validateRequest } from '../midlewares/validateRequest.middleware.js';
import { authenticate } from '../midlewares/authenticate.js';

const router = express.Router();

router.post(AUTH_ROUTES.LOGIN,loginValidator,validateRequest, doLogin);
router.post(AUTH_ROUTES.REGISTER, registerUser);
router.post(AUTH_ROUTES.PROVIDER_LOGIN, loginWithProvider)
router.post(AUTH_ROUTES.LOGOUT, logout);
router.post(AUTH_ROUTES.REFRESH, refreshToken);
router.get(AUTH_ROUTES.ME, authenticate, getMe);
router.patch(AUTH_ROUTES.UPDATE_ME, authenticate, updateMe);
router.post(AUTH_ROUTES.UPLOAD_PICTURE, authenticate, handleAvatarUpload, updatePicture);

export default router;
