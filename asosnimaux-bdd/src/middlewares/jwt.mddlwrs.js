import { jwtVerify } from "../utils/jwt.utils.js";

const jwtMddlwr = (req, res, next) => {
  const token = req.headers.authorization;

  const userID = jwtVerify(token);

  if (!userID) return res.status(401).json({ message: `Invalid Token !` });

  req.body.userID = userID;

  next();
}

export default jwtMddlwr;