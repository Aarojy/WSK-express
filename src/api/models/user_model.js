const users = [
  {
    user_id: 3617,
    name: 'Grace Hopper',
    username: 'gracehopper',
    email: 'grace@metropolia.fi',
    role: 'admin',
    password: 'grace123',
  },
  {
    user_id: 3618,
    name: 'Henry Ford',
    username: 'henryford',
    email: 'henry@metropolia.fi',
    role: 'user',
    password: 'carbuilder',
  },
];

const listUsers = () => {
  return users;
};

const findUserById = (id) => {
  const user = users.find((user) => user.user_id === id);
  if (!user) {
    return null;
  }
  return user;
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = users.length > 0 ? users[users.length - 1].user_id + 1 : 1;

  users.push({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return {user_id: newId};
};

export {listUsers, findUserById, addUser};
