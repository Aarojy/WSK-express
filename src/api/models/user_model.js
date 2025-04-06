import promisePool from '../../utils/database.js';

const listUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    name,
    username,
    email,
    role,
    password,
  ]);
  return {user_id: result.insertId};
};

const deleteUser = async (userId) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete all cats owned by the user
    await connection.query('DELETE FROM wsk_cats WHERE owner = ?', [userId]);

    // Delete the user
    const [result] = await connection.query(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    return result.affectedRows;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const login = async (user) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;

  const [rows] = await promisePool.execute(sql, [user]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {listUsers, findUserById, addUser, deleteUser, login};
