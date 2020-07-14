import { model, Schema } from "mongoose";

const userDetailModel = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  address: { type: String },
  totalExp: { type: String },
  isDelete: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const userDetail = new model("userDetail", userDetailModel);

export default userDetail;
