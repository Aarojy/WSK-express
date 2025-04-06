import {addUser, findUserById, listUsers} from '../models/user_model.js';

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

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201).json(result);
  } else {
    res.status(400).json({error: 'Invalid user data'});
  }
};

const putUser = (req, res) => {
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  res.sendStatus(200);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
