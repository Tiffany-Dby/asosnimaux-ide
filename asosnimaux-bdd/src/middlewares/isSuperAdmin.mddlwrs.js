import query from "../databases/init.db.js";

const isSuperAdmin = async ({ body: { userID } }, res, next) => {
  let error = null;
  try {
    const sql = `
      SELECT id, user_role
      FROM users
      WHERE id = ?
    `;

    const response = await query(sql, [userID]);
    const user = response[0];
    const role = user.user_role;

    if (role !== "super_admin") return res.status(401).json({ message: `Unauthorized : You don't have the rights for this action.` });

    next();
  }
  catch (err) {
    error = err.message;
    return res.status(500).json({ message: error });
  }
}

export default isSuperAdmin;