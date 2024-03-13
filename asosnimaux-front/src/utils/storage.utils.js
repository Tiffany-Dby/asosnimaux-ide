// SET
export const setToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

// CLEAR
export const clearStorage = () => {
  localStorage.clear();
}

// GET
export const getFromStorage = (key) => {
  const stringData = localStorage.getItem(key);
  if (!stringData) return null;
  return JSON.parse(stringData);
}