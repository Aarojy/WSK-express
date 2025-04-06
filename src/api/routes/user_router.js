import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user_controller.js';

const userRouter = express.Router();

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

userRouter.route('/').get(getUsers).post(postUser);

export default userRouter;
