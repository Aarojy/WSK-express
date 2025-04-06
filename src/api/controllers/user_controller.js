import {addUser, findUserById, listUsers} from '../models/user_model.js';
import bcrypt from 'bcrypt';

const getUsers = (req, res) => {
  const users = listUsers();
  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const {id} = req.params;
  const user = findUserById(parseInt(id));
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }
  res.status(200).json(user);
};

const postUser = async (req, res, next) => {
  try {
    const {name, username, email, role, password} = req.body;

    // Validate required fields
    if (!name || !username || !email || !role || !password) {
      const error = new Error('Missing required fields');
      error.status = 400;
      throw error;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const result = await addUser({
      name,
      username,
      email,
      role,
      password: hashedPassword,
    });

    if (!result.user_id) {
      const error = new Error('Failed to add user');
      error.status = 400;
      throw error;
    }

    res.status(201).json(result);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

const putUser = (req, res) => {
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  res.sendStatus(200);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
