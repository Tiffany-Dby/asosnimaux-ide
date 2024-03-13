import query from "./init.db.js";
// UUID
import { v4 as uuidv4 } from "uuid";

// ******************** POST ********************
const create = async (name, birthdate, sex, description, race, status, species, picture_url, picture_caption) => {
  const sql = `
    INSERT INTO animals (id, name, birthdate, sex, description, race, status, species, picture_url, picture_caption)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let result = [];
  let insertedId = [];
  let error = null;
  try {
    const id = uuidv4();

    result = await query(sql, [id, name, birthdate, sex, description, race, status, species, picture_url, picture_caption])

    insertedId = id;
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error, insertedId };
  }
}
// ******************** END POST ********************

// ******************** GET ********************
const readAll = async () => {
  const sql = `
    SELECT id, entry_date, name, birthdate, sex, description, race, status, exit_date, species, picture_url, picture_caption,
    CASE 
      WHEN LENGTH(description) > 150 
      THEN CONCAT(SUBSTRING(description, 1, 150), '...') 
      ELSE description 
    END AS truncated_description,
    TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age
    FROM animals
    ORDER BY entry_date DESC
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
  // AS birthday -> calculates birthday based on birthdate, returns next birthday : if already passed this year add +1 year to current year
  // Ex: current date -> 2020-05-01 --- birthdate -> 2000-01-01
  // extract month and day from current date and birthdate to compare them
  // for current date 0501 --- for birthdate 0101  
  // 0501 >= 0101 ? 2020 +1 : 2020 -> (next) birthday 2021-01-01
  const sql = `
    SELECT id, entry_date, name, birthdate, sex, description, race, status, exit_date, species, picture_url, picture_caption, 
    DATEDIFF(CURDATE(), entry_date) as time_spent,
    TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age,
    DATE_FORMAT(
      IF(
        DATE_FORMAT(CURDATE(), '%m%d') >= DATE_FORMAT(birthdate, '%m%d'),
        CONCAT(YEAR(CURDATE()) + 1, '-', MONTH(birthdate), '-', DAY(birthdate)),
        CONCAT(YEAR(CURDATE()), '-', MONTH(birthdate), '-', DAY(birthdate))
      ),
      '%Y-%m-%d'
    ) AS birthday
    FROM animals
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
    return { error, result };
  }
}
// ******************** END GET ********************

// ******************** PUT ********************
const updateDetails = async (name, birthdate, sex, description, race, status, species, id) => {
  const sql = `
    UPDATE animals
    SET name = ?, birthdate = ?, sex = ?, description = ?, race = ?, status = ?, species = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(sql, [name, birthdate, sex, description, race, status, species, id]);

    result = await readOne(id);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}

const updateExitDate = async (exitDate, id) => {
  const sql = `
    UPDATE animals
    SET exit_date = ?
    WHERE id = ?
  `;

  let result = [];
  let error = null;
  try {
    await query(sql, [exitDate, id]);

    result = await readOne(id);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const deleteOne = async (id) => {
  const imgPathSql = `
    SELECT picture_url
    FROM animals
    WHERE id = ?
  `;

  const usersFollowSql = `
    DELETE FROM users_animals
    WHERE animal_id = ?
  `;

  const sql = `
    DELETE FROM animals
    WHERE id = ?
  `;

  let result = [];
  let imgPathResult = [];
  let error = null;
  try {
    await query(usersFollowSql, [id]);
    imgPathResult = await query(imgPathSql, [id]);
    result = await query(sql, [id]);
    if (result.affectedRows !== 1) throw new Error(`Something went wrong couldn't delete animal`);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { imgPathResult, result, error };
  }
}
// ******************** END DELETE ********************

export const AnimalDB = {
  create,
  readAll,
  readOne,
  updateDetails,
  updateExitDate,
  deleteOne
}