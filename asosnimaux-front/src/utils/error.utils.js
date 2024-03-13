// Check if error from DB includes "Duplicate" + element -> display the related error message
// Constants -> errors.const.js
// If no corresponding element returns the error message as fallback
export const getDuplicateErrorMessage = (error, elements) => {
  const duplicateError = elements.find(({ element }) => error.includes("Duplicate") && error.includes(element));
  return duplicateError ? duplicateError.message : error;
}