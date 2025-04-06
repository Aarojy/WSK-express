// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listCats = async () => {
  const sql = `
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
  `;
  const [rows] = await promisePool.query(sql);
  return rows;
};

const findCatById = async (id) => {
  const sql = `
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
    WHERE c.cat_id = ?
  `;
  const [rows] = await promisePool.query(sql, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const findCatsByUserId = async (userId) => {
  const sql = `
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
    WHERE c.owner = ?
  `;
  const [rows] = await promisePool.query(sql, [userId]);
  return rows;
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  ]);
  return {cat_id: result.insertId};
};

const deleteCatsByUserId = async (userId) => {
  const sql = `DELETE FROM wsk_cats WHERE owner = ?`;
  const [result] = await promisePool.execute(sql, [userId]);
  return result.affectedRows;
};

export {listCats, findCatById, findCatsByUserId, addCat, deleteCatsByUserId};
