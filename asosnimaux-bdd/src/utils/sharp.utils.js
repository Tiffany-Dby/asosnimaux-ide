import sharp from "sharp";
import { setImgUrl } from "./formidable.utils.js";

// Resize & Format img -> to keep aspect ratio can set the other size value to null
export const resizeAndFormatImg = async (filePath, folderName, format, width, height) => {
  let error = null;
  let result = [];

  try {
    const newFilePath = filePath.replace(/\.[^/]*$/, `.${format}`);

    await sharp(filePath).resize({ width: width, height: height }).toFormat(format).toFile(newFilePath);

    // Clear cache -> sharp puts the original file in memory cache, making it busy or locked, so it requires a clear if wanting to delete the original img after the process and avoid non authorized error msgs
    sharp.cache(false);

    result = setImgUrl(newFilePath, folderName);
  }
  catch (err) {
    console.error("Error processing image:", err);
    error = err.message;
  }
  finally {
    return { result, error };
  }
}