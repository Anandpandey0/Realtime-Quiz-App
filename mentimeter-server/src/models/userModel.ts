import mongoose, { Schema, Document } from "mongoose";
export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
const userSchema: Schema<User> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;
