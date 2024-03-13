import query from "../databases/init.db.js";

const isAdminOrAuthor = async ({ body: { userID }, params: { testimonyID } }, res, next) => {
  let error = null;
  try {
    const sql = `
      SELECT id, user_role
      FROM users
      WHERE id = ?
    `;

    const testimonySql = `
      SELECT testimonies.id, testimonies.user_id, users.user_role
      FROM testimonies
      JOIN users ON testimonies.user_id = users.id
      WHERE testimonies.id = ?
    `;

    const testimonyResponse = await query(testimonySql, [testimonyID]);
    const userResponse = await query(sql, [userID]);

    const testimonyResult = testimonyResponse[0];
    const testimonyUserID = testimonyResult.user_id;

    const userResult = userResponse[0];
    const role = userResult.user_role;

    if (role !== "admin" && role !== "super_admin" && testimonyUserID !== userID) return res.status(401).json({ message: `Unauthorized : You don't have the rights for this action.` });

    next();
  }
  catch (err) {
    error = err.message;
    return res.status(500).json({ message: error });
  }
}

export default isAdminOrAuthor;