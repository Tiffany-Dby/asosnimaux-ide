import { AnimalDB } from "../databases/animal.db.js";
// Utils
import { getFormidableForm, setImgUrl, deleteImg, deleteImgs } from "../utils/formidable.utils.js";
import { resizeAndFormatImg } from "../utils/sharp.utils.js";
import { areStringsFilled } from "../utils/string.utils.js";
// Contants
import { UUID } from "../constants/uuid.const.js";
import { DATE } from "../constants/date.const.js";
// Validator
import validator from "validator";
const { isUUID, isDate } = validator;

// ******************** POST ********************
const create = async (req, res) => {
  const errors = {};

  // Utils -> formidables.utils.js -> params (foldername, max size in Mb, pass req)
  const form = await getFormidableForm("animals", 5, req);
  const { files, fields } = form;
  const formErr = form.error;
  if (formErr) errors.formError = formErr;

  if (!files.newAnimalImg) return res.status(415).json({ message: "Something went wrong with the image" });
  const { filepath } = files.newAnimalImg[0];

  // Resizing image and changing format to webp before storing it
  // Utils -> sharp.utils.js -> params (filepath, foldername, mimetype, width, height) 
  const processedImg = await resizeAndFormatImg(filepath, "animals", "webp", 650, null);
  const processedImgErr = processedImg.error;
  if (processedImgErr) errors.processedImgError = processedImgErr;

  const picture_url = processedImg.result;
  const { name, birthdate, sex, description, race, status, species, picture_caption } = fields;

  // *** Verifications
  const areStrings = areStringsFilled([name[0], birthdate[0], sex[0], description[0], race[0], status[0], species[0], picture_url, picture_caption[0]]);
  if (!areStrings) errors.areStringsError = "Missing data";
  // *** End Verifications

  const { formError, processedImgError, areStringsError, UUIDError } = errors;

  // Delete image(s) if any errors before reaching create func
  if (formError || processedImgError || areStringsError || UUIDError) {
    if (processedImgError) {
      const e = await deleteImg(setImgUrl(filepath, "animals"));
      if (e) return res.status(403).json({ message: e });
    }
    else {
      const e = await deleteImgs(picture_url, filepath, "animals");
      if (e.newErr || e.oldErr) return res.status(403).json({ message: e });
    }

    return res.status(500).json({ message: errors });
  }

  const response = await AnimalDB.create(name, birthdate, sex, description, race, status, species, picture_url, picture_caption);
  const { result, error, insertedId } = response;
  if (error) errors.error = error;

  // Delete processed image if error during create
  if (error || result.affectedRows !== 1) {
    const e = await deleteImg(picture_url)
    if (e) return res.status(403).json({ message: e });
  }

  const createdAnimal = await AnimalDB.readOne(insertedId);
  const err = createdAnimal.error;
  const rslt = createdAnimal.result;
  if (err) errors.err = err;

  // Delete original image
  const e = await deleteImg(setImgUrl(filepath, "animals"));
  if (e) return res.status(403).json({ message: e });

  return res.status(!!Object.keys(errors).length ? 500 : 200).json({ message: !!Object.keys(errors).length ? errors : `New animal successfully added`, animal: rslt });
}
// ******************** END POST ********************

// ******************** GET ********************
const readAll = async (req, res) => {
  const response = await AnimalDB.readAll();
  const { result, error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for all animals successful`, result });
}

const readOne = async ({ params: { id } }, res) => {
  // *** Verifications
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await AnimalDB.readOne(id);
  const { result, error } = response;

  const animal = {
    id,
    entryDate: result[0].entry_date,
    name: result[0].name,
    birthdate: result[0].birthdate,
    age: result[0].age,
    birthday: result[0].birthday,
    sex: result[0].sex,
    description: result[0].description,
    race: result[0].race,
    status: result[0].status,
    exitDate: result[0].exit_date,
    species: result[0].species,
    pictureURL: result[0].picture_url,
    pictureCaption: result[0].picture_caption,
    timeSpent: result[0].time_spent
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Request for animal with id: ${id} successful`, animal });
}
// ******************** END GET ********************

// ******************** PUT ********************
const updateDetails = async (req, res) => {
  const { name, birthdate, sex, description, race, status, species, id } = req.body;

  // *** Verifications
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  if (!isDate(birthdate, DATE.OPTIONS)) return res.status(400).json({ error: "Invalid date format" });

  const areStrings = areStringsFilled([name, birthdate, sex, description, race, status, species])
  if (!areStrings) return res.status(403).json({ message: `Missing data` });
  // *** End Verifications

  const response = await AnimalDB.updateDetails(name, birthdate, sex, description, race, status, species, id);
  const updatedAnimal = response.result.result;
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's details with id: ${id} has been updated`, updatedAnimal });
}

const updateExitDate = async ({ body: { exitDate, id } }, res) => {
  // *** Verifications
  if (!isDate(exitDate, DATE.OPTIONS)) return res.status(400).json({ error: "Invalid date format" });
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await AnimalDB.updateExitDate(exitDate, id);
  const updatedExitDate = response.result.result;
  const { error } = response;

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal's exit_date with id: ${id} has been updated`, updatedExitDate });
}
// ******************** END PUT ********************

// ******************** DELETE ********************
const deleteOne = async ({ params: { id } }, res) => {
  // *** Verifications
  if (!isUUID(id, UUID.VERSION)) return res.status(400).json({ error: "Invalid UUID format" });
  // *** End Verifications

  const response = await AnimalDB.deleteOne(id);
  const { imgPathResult, error } = response;

  // Delete associated image if the deletion was successful
  if (!error) {
    const err = await deleteImg(imgPathResult[0].picture_url);
    if (err) return res.status(403).json({ message: err });
  }

  return res.status(error ? 500 : 200).json({ message: error ? error : `Animal with id: ${id} has been successfully deleted` });
}
// ******************** END DELETE ********************

export const AnimalController = {
  create,
  readAll,
  readOne,
  updateDetails,
  updateExitDate,
  deleteOne
}