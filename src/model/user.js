import { model, Schema } from "mongoose";

const userModel = new Schema({
  username: { type: String },
  password: { type: String },
});

const user = new model("user", userModel);

export default user;
