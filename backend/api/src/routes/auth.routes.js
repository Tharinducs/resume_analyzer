import express from 'express';
import { AUTH_ROUTES } from '../constants/routes';
import { doLogin, registerUser } from '../controllers/auth.controller';
import { loginValidator } from '../validators/auth.validator';
import { validateRequest } from '../midlewares/validateRequest.middleware';

const router = express.Router();

router.post(AUTH_ROUTES.LOGIN,loginValidator,validateRequest, doLogin);
router.post(AUTH_ROUTES.REGISTER, registerUser);
router.post(AUTH_ROUTES.PROVIDER_LOGIN, loginWithProvider)
