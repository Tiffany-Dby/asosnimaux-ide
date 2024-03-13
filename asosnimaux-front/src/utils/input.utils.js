export const isAlphanumeric = str => /^[a-zA-Z0-9À-ÿ-]+$/.test(str); // Allows accents

export const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const hasSymbol = str => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~§]/.test(str);

export const hasNumber = str => /\d/.test(str);

export const hasUppercase = str => /[A-Z]/.test(str);

export const hasLowercase = str => /[a-z]/.test(str);

export const hasMinLength = (str, minLength) => str?.length >= minLength;

export const isUsernameValid = (username) => {
  const isAlphanum = isAlphanumeric(username);
  const isOnlyHyphens = /^[-]+$/.test(username);

  return isAlphanum && !isOnlyHyphens;
}