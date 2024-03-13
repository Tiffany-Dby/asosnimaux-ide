export const isString = data => typeof data === "string";

export const isStringFilled = data => isString(data) && data.trim().length > 0;

export const areStringsFilled = data => Array.isArray(data) && data.every(isStringFilled);