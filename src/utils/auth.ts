/* eslint-disable import/no-extraneous-dependencies */
import jwt from "jsonwebtoken";
import { get } from "lodash";

const AUTH_TOKEN = get(process, "env.TOKEN_SECRET", "pogi");

export const signIn = (credentials:object) => {
  return jwt.sign(credentials, AUTH_TOKEN, { expiresIn:"7d" }); 
};