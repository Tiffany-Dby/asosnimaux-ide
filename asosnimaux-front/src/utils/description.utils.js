// Returns an array containing each paragraphs
export const formatDescription = (text) => {
  // Split on line break
  const splitted = text?.split(/\r\n|\n/);

  // Removes empty strings
  return splitted?.filter(p => p !== "");
}