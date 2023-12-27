import { CustomError } from "../common/CustomError";
import hashPassword from "../utils/password-hash";
import { User, UserModel, UserWithId } from "./user.schema";

export const checkEmail = async (email: string): Promise<UserWithId | null> => {
  const user = await UserModel.findOne({ email }).lean().exec();
  return user;
};

export const checkMobileNumber = async (mobileNumber: string): Promise<UserWithId | null> => {
  const user = await UserModel.findOne({ mobile_number: mobileNumber }).lean().exec();
  return user;
};

export const checkUser = async (credential:string):Promise<UserWithId | null> => {
  const userMobileNumber = await UserModel.findOne({ mobile_number: credential }).lean().exec();
  const userEmail = await UserModel.findOne({ email:credential }).lean().exec();
  return userMobileNumber || userEmail;
}; 

export const createUser = async (user: User): Promise<UserWithId> => {
  const isExistEmail = await checkEmail(user.email);
  const isExistMobileNumber = await checkMobileNumber(user.mobile_number);

  if (isExistEmail) {
    throw new CustomError("Duplicate Found, email already exist.", 409);
  }

  if (isExistMobileNumber) {
    throw new CustomError("Duplicate Found, mobile number already exist", 409);
  }

  const encryptedPassword = await hashPassword(user.password as string);
  const result = await UserModel.create({ ...user, password: encryptedPassword });
  if (!result) throw new CustomError("Error in creating user", 500);

  return {
    _id: result._id,
    email: result.email,
    first_name: result.first_name,
    last_name: result.last_name,
    interests: result.interests,
    mobile_number: result.mobile_number,
  };
};

export const getUser = async (userId:string): Promise<UserWithId> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError("User not found", 404);
  return user;
};
