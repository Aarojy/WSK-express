/* eslint-disable no-unused-vars */
import express from 'express';
import {body} from 'express-validator';
import {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
} from '../controllers/user_controller.js';
import validateRequest from '../middlewares/validate_request.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch users'});
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch user'});
  }
});

userRouter.post(
  '/',
  [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('username')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('role')
      .isIn(['user', 'admin'])
      .withMessage('Role must be either "user" or "admin"'),
    body('password')
      .isLength({min: 6})
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest, // Middleware to handle validation errors
  async (req, res) => {
    try {
      const newUser = await postUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({error: 'Failed to add user'});
    }
  }
);

userRouter.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await deleteUser(req.params.id);
    if (deletedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }
    res
      .status(200)
      .json({message: 'User and associated cats deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'Failed to delete user'});
  }
});

export default userRouter;
