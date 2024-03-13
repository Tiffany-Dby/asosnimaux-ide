import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPass = async (pass) => {
  let hashed = null;
  let error = null;
  try {
    hashed = await bcrypt.hash(pass, saltRounds);
  }
  catch (err) {
    error = err.message;
  }
  finally {
    return { hashed, error };
  }
}

export const compareHash = async (passNotHashed, passHashed) => {
  let isSame = false;
  try {
    isSame = await bcrypt.compare(passNotHashed, passHashed);
  }
  catch (err) {
    console.error(err.message);
  }
  finally {
    return isSame;
  }
}