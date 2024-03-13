export const getAge = (value) => {
  if (value >= 0 && value <= 3) return "junior";
  if (value >= 4 && value <= 7) return "adulte";
  if (value >= 8) return "senior";
}