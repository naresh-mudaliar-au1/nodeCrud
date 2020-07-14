import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel, userDetailModel } from "../model";

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw new Error("All Fields Are Mandatory");

    const checkUser = await userModel.findOne({ username });
    if (checkUser) throw new Error("The username is Already Registered");

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const register = new userModel({
      username,
      password: hashedPassword,
    });

    const registerUser = await register.save();
    if (!registerUser) throw new Error("Error Registering User");

    registerUser &&
      res
        .status(200)
        .send({ success: true, message: "You Have Been Registered" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await userModel.findOne({ username });
    if (!checkUser) throw new Error("User Does Not Exist Please Register");

    const verifyPassword = await bcrypt.compare(password, checkUser.password);

    if (!verifyPassword) throw new Error("Wrong Password");

    const secretKey = process.env.SECRETKEY || "mytoken";
    const token = verifyPassword && jwt.sign({ username }, secretKey);

    verifyPassword &&
      res.status(200).send({
        success: true,
        message: "Login Successful",
        name: username,
        auth: token,
      });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const getList = async (req, res) => {
  try {
    const { currentUser } = req;

    const getUser = await userDetailModel
      .find({ isDelete: false })
      .where("userId")
      .ne(currentUser._id);

    if (getUser.length == 0) throw new Error("No User Found");

    getUser && res.status(200).send({ success: true, Data: getUser });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;

    let filter = { userId: _id };
    let update = { isDelete: true };
    let options = { new: true };

    const removeUser = await userDetailModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (removeUser.isDelete == true) throw new Error("User Already Deleted");

    removeUser &&
      res
        .status(200)
        .send({ success: true, message: "User Removed Successfully" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

export default { signup, login, getList, deleteUser };
