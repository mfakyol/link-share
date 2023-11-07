import bcrypt from "bcrypt";

function createHash(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return { hash, salt };
}


function compareHashAndPassword(hash: string, password: string) {
  return bcrypt.compareSync(password, hash)
}


export {
  createHash,
  compareHashAndPassword
}