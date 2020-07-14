import jwt from "jsonwebtoken";
import { userModel } from "../model";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");

    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;

    const mySecretKey = process.env.SECRETKEY || "mytoken";

    const verifyToken = jwt.verify(token, mySecretKey);

    const username = verifyToken.username;

    const getUser = await userModel.findOne({ username });
    if (!getUser) throw new Error("Token Not Valid");

    req.currentUser = getUser;
    next();
  } catch (error) {
    res.status(403).send({ Error: error.message });
  }
};

export default auth;
