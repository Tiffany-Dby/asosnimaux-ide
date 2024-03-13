import formidable from "formidable";
import { unlink } from "node:fs/promises";

// Set foldername name to store image, and set prefered max size in Mb through params
// mimetype allowed -> png, jpg, jpeg, webp
export const getFormidableForm = async (folderName, maxMb, req) => {
  const form = formidable({
    uploadDir: `./public/${folderName}`,
    keepExtensions: true,
    createDirsFromUploads: true,
    maxFileSize: maxMb * 1024 * 1024,
    filter: opts => {
      const { mimetype } = opts;
      return mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg" || mimetype === "image/webp";
    }
  });

  let fields = null;
  let files = null;
  let error = null;

  try {
    [fields, files] = await form.parse(req);
  }
  catch (err) {
    console.log("Error parsing form :", err.message);
    error = err.message;
  }
  finally {
    return { fields, files, error }
  }
}

// Set filepath in params (returned by form (files)) and set folder name -> func builds the picture url (removes everything before folder name) -> to send to db
export const setImgUrl = (filePath, folderName) => {
  const formatPath = filePath.replace(/\\/g, '/');
  const indexOfFolderName = formatPath.indexOf(folderName);

  const slicedPath = formatPath.slice(indexOfFolderName);
  return slicedPath;
}

// Adds ./public back in front of picture_url to enable deletion
export const setDeleteImgUrl = oldFilePath => {
  return `./public/${oldFilePath}`;
}

// Uses setDeleteImgUrl and unlink from fs/promises to delete file
export const deleteImg = async (imgPath) => {
  let error = null;
  try {
    const PicturePath = setDeleteImgUrl(imgPath)
    const r = await unlink(PicturePath);
    console.log(`${PicturePath} was successfully deleted`);
  }
  catch (e) {
    console.log("Error deleting image : ", e.message);
    error = e.message;
  }
  finally {
    return error;
  }
}

// Used along with sharp lib processing imgs (resize and reformat) in case of an error allowing to delete both
export const deleteImgs = async (newFilePath, oldFilePath, folderName) => {
  const newErr = await deleteImg(newFilePath);
  const oldErr = await deleteImg(setImgUrl(oldFilePath, folderName));

  return { newErr, oldErr };
}