import mongoose, { Schema } from "mongoose";
import z from "zod";

export const User = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email().min(1),
  password: z
    .string()
    .min(1)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .optional(),
  mobile_number: z.string().regex(/^(09|639)\d{9}$/, "invalid mobile number"),
  interests: z.array(z.string()).refine((data) => data.length > 3, { message: "Minimum of 3 interests" }),
});

export type User = z.infer<typeof User>;

export const UserSchema = new Schema<User>(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    mobile_number: { type: String },
    interests: [],
  },
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  { timestamps: true }
);

export interface UserWithId extends User {
  _id: mongoose.Types.ObjectId;
}

export const UserModel = mongoose.model("User", UserSchema);
