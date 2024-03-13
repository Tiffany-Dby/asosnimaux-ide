export const getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}