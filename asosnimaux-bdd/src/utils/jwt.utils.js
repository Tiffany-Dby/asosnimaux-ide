import jwt from "jsonwebtoken";

const jwtOptions = { expiresIn: `28800000` } // milliseconds -> 8h
const secret = process.env.JWT_SECRET || "T0P_S3CRet";

export const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.data;
    return userId;
  }
  catch (err) {
    console.error(`jwt.utils.js - jwtVerify - error => `, err.message);
    return null;
  }
}

export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);