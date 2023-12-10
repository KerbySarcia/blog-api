// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";

export default async function comparePassword(password: string, encryptedPassword: string) {
  return bcrypt.compare(password, encryptedPassword);
}
