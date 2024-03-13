import { TestimonyDB } from "../databases/testimony.db.js";
// Utils
import { areStringsFilled } from "../utils/string.utils.js";
// Constants
import { UUID } from "../constants/uuid.const.js";
import { BLACKLIST } from "../constants/blacklist.const.js";
// Validator
import validator from "validator";
const { blacklist, isUUID } = validator;

// ******************** POST ********************
const create = async ({ body: { content, userID } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([content, userID]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const sanitizedContent = blacklist(content, BLACKLIST.REGEX);
  // *** End Verifications

  const response = await TestimonyDB.create(sanitizedContent, userID);
  const { error, insertedId } = response;

  const createdTestimony = await TestimonyDB.readOneWithTheirUsername(insertedId);
  const { result } = createdTestimony;
  const err = createdTestimony.error;
  const testimony = result[0];

  if (err) return res.status(500).json({ message: err });

  return res.status(error ? 500 : 201).json({ message: error ? error : `New Testimony successfully created`, testimony });
}
// ******************** END POST ********************

// ******************** GET ********************
const readAllWithTheirUsername = async (req, res) => {
  const response = await TestimonyDB.readAllWithTheirUsername();
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on testimonies with their username successful`, result });
}

const readWithTheirUsername = async (req, res) => {
  const response = await TestimonyDB.readWithTheirUsername();
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on 4 latest testimonies with their username successful`, result });
}

const readAllByOneUser = async ({ body: { userID } }, res) => {
  // *** Verifications
  if (!isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await TestimonyDB.readAllByOneUser(userID);
  const { result, error } = response;

  res.status(error ? 500 : 200).json({ message: error ? error : `Request on all testimonies from user with id "${userID}" successful`, result });
}

const readOneWithTheirUsername = async ({ params: { testimonyID } }, res) => {
  // *** Verifications
  if (!isUUID(testimonyID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await TestimonyDB.readOneWithTheirUsername(testimonyID);
  const { result, error } = response;

  const testimony = {
    id: result[0].id,
    userID: result[0].user_id,
    username: result[0].username,
    content: result[0].content,
    truncatedContent: result[0].truncated_content,
    avatarURL: result[0].avatar_url,
    date: result[0].date
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request on testimony with id : "${testimonyID}" successful`, testimony });
}
// ******************** END GET ********************

// ******************** PUT ********************
const update = async ({ body: { content, testimonyID, userID } }, res) => {
  // *** Verifications
  const areStrings = areStringsFilled([content]);
  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isUUID(testimonyID, UUID.VERSION) || !isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });

  const sanitizedContent = blacklist(content, BLACKLIST.REGEX);
  // *** End Verifications

  const response = await TestimonyDB.update(sanitizedContent, testimonyID, userID);
  const { error } = response;

  const updatedTestimony = await TestimonyDB.readOneWithTheirUsername(testimonyID);
  const { result } = updatedTestimony;
  const err = updatedTestimony.error;
  const testimony = result[0];

  if (err) return res.status(500).json({ message: err });

  return res.status(error ? 500 : 200).json({ message: error ? error : `Testimony with id "${testimonyID}" has been successfully edited`, testimony })
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const deleteOne = async ({ body: { userID }, params: { testimonyID } }, res) => {
  // *** Verifications
  if (!isUUID(testimonyID, UUID.VERSION) || !isUUID(userID, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await TestimonyDB.deleteOne(testimonyID, userID);
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Testimony with id ${testimonyID} deleted successfully` });
}
// ******************** END DELETE ********************

export const TestimonyController = {
  create,
  readAllWithTheirUsername,
  readWithTheirUsername,
  readAllByOneUser,
  readOneWithTheirUsername,
  update,
  deleteOne
}