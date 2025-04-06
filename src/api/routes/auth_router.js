import {authUser, getMe} from '../controllers/auth_controller.js';
import express from 'express';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);

// eslint-disable-next-line no-undef
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
