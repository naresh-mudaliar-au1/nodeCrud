import express from "express";
import { userController, userDetailController } from "../controllers";
import { auth } from "../middleware";

export default express
  .Router()
  .post("/user/signup", userController.signup)
  .post("/user/login", userController.login)
  .get("/user/list", auth, userController.getList)
  .post("/user/delete", auth, userController.deleteUser)
  .post("/user/enroll", auth, userDetailController.enrollUser)
  .get("/user/detail", auth, userDetailController.getDetail);
