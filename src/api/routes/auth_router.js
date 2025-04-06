import express from 'express';
import {body} from 'express-validator';
import {authUser} from '../controllers/auth_controller.js';
import validateRequest from '../middlewares/validate_request.js';

const authRouter = express.Router();

authRouter.post(
  '/login',
  [
    body('username')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  authUser
);

export default authRouter;
