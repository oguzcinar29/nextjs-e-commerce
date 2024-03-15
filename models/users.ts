import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface IUsers extends Document {
  name: string;
  email: string;
  password: string;
}

const UsersSchema = new Schema<IUsers>({
  name: String,
  email: String,
  password: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

export default Users;
