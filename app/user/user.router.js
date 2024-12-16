const express = require("express");
const {
  getAllUsers,
  addUser,
  deleteUser,
  loginUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", addUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
