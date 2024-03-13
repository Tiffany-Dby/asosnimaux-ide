import query from "./init.db.js";
// UUID
import { v4 as uuidv4 } from "uuid";

// ******************** POST ********************
const create = async (username, email, password, avatarUrl) => {
  const sql = `
    INSERT INTO users (id, username, email, password, avatar_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  let result = [];
  let error = null;
  try {
    const id = uuidv4();

    result = await query(sql, [id, username, email, password, avatarUrl]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readByEmailOrUsername = async (emailOrUsername) => {
  const sql = `
    SELECT id, username, email, password, avatar_url, user_role
    FROM users
    WHERE (
      email = ? OR username = ?
    )
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [emailOrUsername, emailOrUsername]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const followAnimal = async (userID, animalID) => {
  const sql = `
    INSERT INTO users_animals (user_id, animal_id)
    VALUES (?, ?)
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID, animalID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
// ******************** END POST ********************

// ******************** GET ********************
const readAll = async () => {
  const sql = `
    SELECT id, username, email, user_role
    FROM users
    ORDER BY user_role ASC
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readOne = async (id) => {
  const sql = `
    SELECT id, username, email, password, avatar_url, user_role
    FROM users
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [id]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readUsersFollow = async (userID) => {
  const sql = `
    SELECT users.id AS user_id, animals.id AS animal_id, animals.entry_date, animals.name, animals.birthdate, animals.sex, animals.race, animals.status, animals.exit_date, animals.species, animals.picture_url, animals.picture_caption,
    CASE 
      WHEN LENGTH(animals.description) > 150 
      THEN CONCAT(SUBSTRING(animals.description, 1, 150), '...') 
      ELSE animals.description 
    END AS truncated_description
    FROM users
    JOIN users_animals ON users.id = users_animals.user_id
    JOIN animals ON animals.id = users_animals.animal_id
    WHERE users.id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const readUsersFollowIDs = async (userID) => {
  const sql = `
    SELECT animals.id
    FROM users_animals
    JOIN animals ON animals.id = users_animals.animal_id
    WHERE users_animals.user_id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID]);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
// ******************** END GET ********************

// ******************** PUT ********************
const updateUsername = async (username, id) => {
  const sql = `
    UPDATE users
    SET username = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [username, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update username`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const updatePassword = async (newPassword, id) => {
  const sql = `
    UPDATE users
    SET password = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [newPassword, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update password`);
  }
  finally {
    return { result, error };
  }
}

const updateAvatar = async (avatarUrl, id) => {
  const sql = `
    UPDATE users
    SET avatar_url = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [avatarUrl, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update avatar`);
  }
  finally {
    return { result, error };
  }
}

const updateRole = async (newRole, id) => {
  const sql = `
    UPDATE users
    SET user_role = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [newRole, id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't update password`);
  }
  finally {
    return { result, error };
  }
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const unfollow = async (userID, animalID) => {
  const sql = `
    DELETE from users_animals
    WHERE user_id = ? AND animal_id = ?
  `;

  let result = [];
  let error = null;
  try {
    result = await query(sql, [userID, animalID]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't unfollow`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const deleteOne = async (id) => {
  const testimoniesSql = `
    DELETE FROM testimonies
    WHERE user_id = ?
  `;

  const usersAnimalsSql = `
    DELETE FROM users_animals
    WHERE user_id = ?
  `;

  const sql = `
    DELETE FROM users
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(testimoniesSql, [id]);
    await query(usersAnimalsSql, [id]);

    result = await query(sql, [id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete user`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
// ******************** END DELETE ********************

export const UserDB = {
  create,
  readByEmailOrUsername,
  followAnimal,
  readAll,
  readOne,
  readUsersFollow,
  readUsersFollowIDs,
  updateUsername,
  updatePassword,
  updateAvatar,
  updateRole,
  unfollow,
  deleteOne
}