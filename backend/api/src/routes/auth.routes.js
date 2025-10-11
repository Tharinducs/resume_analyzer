import express from 'express';
import { AUTH_ROUTES } from '../constants/routes.js';
import { doLogin, registerUser,loginWithProvider } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validateRequest } from '../midlewares/validateRequest.middleware.js';

const router = express.Router();

router.post(AUTH_ROUTES.LOGIN,loginValidator,validateRequest, doLogin);
router.post(AUTH_ROUTES.REGISTER, registerUser);
router.post(AUTH_ROUTES.PROVIDER_LOGIN, loginWithProvider)

export default router;
