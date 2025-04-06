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

const postUser = async (req, res) => {
  try {
    const {name, username, email, role, password} = req;

    // Validate required fields
    if (!name || !username || !email || !role || !password) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Save the user to the database
    const result = await addUser({
      name,
      username,
      email,
      role,
      password: hashedPassword,
    });

    if (result.user_id) {
      return result;
    } else {
      return res.status(400).json({error: 'Failed to add user'});
    }
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};

const putUser = (req, res) => {
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  res.sendStatus(200);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
