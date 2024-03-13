import { UserDB } from "../databases/user.db.js";
// Utils
import { jwtSign } from "../utils/jwt.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import { areStringsFilled } from "../utils/string.utils.js";
import { getRandomIndex } from "../utils/randomIndex.utils.js";
// Constants
import { UUID } from "../constants/uuid.const.js";
import { AVATAR } from "../../../asosnimaux-front/src/constants/avatar.const.js";
import { ALPHANUMERIC } from "../constants/alphanumeric.const.js";
// Validator
import validator from "validator";
const { isStrongPassword, isEmail, isAlphanumeric, isUUID } = validator;

// ******************** POST ********************
const create = async ({ body: { username, email, password } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([username, email, password]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  // Username -> 4 to 12 characters, only alphanumeric + accents (locale set to French) and hyphens allowed
  if (!isAlphanumeric(username, ALPHANUMERIC.LOCALE, ALPHANUMERIC.OPTIONS) || username.length < 4 || username.length > 12) return res.status(403).json({ message: `Invalid Username format : must be between 4 and 12 characters, also accents and "-" are allowed` });

  if (!isEmail(email)) return res.status(403).json({ message: `Invalid Email format` });

  // Password -> Min requirements: length 8, 1 uppercase, 1 lowercase, 1 symbol, 1 digit
  if (!isStrongPassword(password)) return res.status(403).json({ message: `Invalid Password format : must contain atleast 8 characters, 1 symbol, 1 uppercase, 1 lowercase, and 1 digit` });
  // *** End Verifications

  // Hash password before storing it
  const hashPwResponse = await hashPass(password);
  const hashPwError = hashPwResponse.error;
  if (hashPwError) return res.status(500).json({ message: hashPwError });

  // Generate a random avatar on account creation based on urls stored in array
  // Utils -> randomIndex.utils.js
  // Constants -> avatar.const.js -> avatars urls
  const randomAvatar = getRandomIndex(AVATAR.URL);

  const response = await UserDB.create(username, email, hashPwResponse.hashed, randomAvatar);
  const error = response.error;

  return res.status(error ? 500 : 201).json({ message: error ? error : `New user successfully created` });
}

const signIn = async ({ body: { login, password } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([login, password]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });
  // *** End Verifications

  const { result, error } = await UserDB.readByEmailOrUsername(login);
  if (error) return res.status(500).json({ message: error });
  if (result.length === 0) return res.status(401).json({ message: `Authentication failed` });

  const user = result[0];
  const userID = user.id;
  const pwDB = user.password;
  const username = user.username;
  const email = user.email;
  const avatar = user.avatar_url;
  const userRole = user.user_role;

  // Password verification
  const arePwSame = await compareHash(password, pwDB);
  if (!arePwSame) return res.status(401).json({ message: `Authentication failed, check username/mail and password.` });

  // Generate JSON web token if all successful
  // Utils -> jwt.utils.js
  const token = jwtSign(userID);

  return res.status(200).json({ message: `Authentication succeeded`, user: { userID, username, email, avatar, userRole, token } })
}

const followAnimal = async ({ body: { userID, animalID }, res }) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION) || !isUUID(animalID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.followAnimal(userID, animalID);
  const error = response.error;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Adding animal with id : ${animalID} to favorite for user with id : ${userID} successful` });
}
// ******************** POST ********************

// ******************** GET ********************
const readAll = async (req, res) => {
  const response = await UserDB.readAll();
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on all users successful`, result });
}

const readOne = async ({ body: { userID } }, res) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.readOne(userID);
  const { result, error } = response;

  const user = {
    userID: result[0].id,
    username: result[0].username,
    email: result[0].email,
    avatar: result[0].avatar_url,
    userRole: result[0].user_role
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on user ${userID} successful`, user });
}

const readUsersFollow = async ({ body: { userID } }, res) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.readUsersFollow(userID);
  const { result, error } = response;

  if (result.length === 0) return res.status(error ? 500 : 200).json({ message: error ? error : `User with id "${userID}" didn't follow any animal.`, result });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animals followed by user with id "${userID}" successful`, result });
}

const readUsersFollowIDs = async ({ body: { userID } }, res) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.readUsersFollowIDs(userID);
  const { result, error } = response;

  if (result.length === 0) return res.status(error ? 500 : 200).json({ message: error ? error : `User with id "${userID}" didn't follow any animal.`, result });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animal IDs followed by user with id "${userID}" successful`, result });
}
// ******************** END GET ********************

// ******************** PUT ********************
const updateUsername = async ({ body: { username, userID } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([username, userID]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  // Username -> 4 to 12 characters, only alphanumeric + accents (locale set to French) and hyphens allowed
  if (!isAlphanumeric(username, ALPHANUMERIC.LOCALE, ALPHANUMERIC.OPTIONS) || username.length < 4 || username.length > 12) return res.status(403).json({ message: `Invalid Username format : must be between 4 and 12 characters, also accents and "-" are allowed` });
  // *** End Verifications

  const response = await UserDB.updateUsername(username, userID);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on username for user with id "${userID}" successful` });
}

const updatePassword = async ({ body: { oldPassword, newPassword, userID } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([oldPassword, newPassword, userID]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  // Password -> Min requirements: length 8, 1 uppercase, 1 lowercase, 1 symbol, 1 digit
  if (!isStrongPassword(newPassword)) return res.status(403).json({ message: `Invalid Password format : must contain atleast 8 characters, 1 symbol, 1 uppercase, 1 lowercase, and 1 digit` });
  // *** End Verifications

  // Retrieving old password from db
  const userResponse = await UserDB.readOne(userID);
  const userOldPwDB = userResponse.result[0].password;

  // Password comparison -> one sent by user and old from db
  const arePwSame = await compareHash(oldPassword, userOldPwDB);
  if (!arePwSame) return res.status(401).json({ message: `Old password doesn't match` });

  // Hash new password before storing it
  const hashPwResponse = await hashPass(newPassword);
  const hashPwError = hashPwResponse.error;
  if (hashPwError) return res.status(500).json({ message: hashPwError });

  const response = await UserDB.updatePassword(hashPwResponse.hashed, userID);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on password for user with id "${userID}" successful` });
}

const updateAvatar = async ({ body: { userID, avatarUrl } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([avatarUrl, userID]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.updateAvatar(avatarUrl, userID);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on avatar for user with id "${userID}" successful` });
}

const updateRole = async ({ params: { id }, body: { newRole } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([newRole, id]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  if (newRole !== "super_admin" && newRole !== "admin" && newRole !== "membre") return res.status(403).json({ message: `Select the appropriate role` });
  // *** End Verifications

  const response = await UserDB.updateRole(newRole, id);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Update on role for user with id "${id}" successful` });
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const unfollow = async ({ body: { userID }, params: { animalID } }, res) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION) || !isUUID(animalID)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.unfollow(userID, animalID);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request from user with id ${userID} to unfollow animal with id ${animalID} successful` });
}

const deleteOne = async ({ params: { id } }, res) => {
  // *** Verifications
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await UserDB.deleteOne(id);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request to delete user with id "${id}" successful` });
}
// ******************** END DELETE ********************

export const UserController = {
  create,
  signIn,
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