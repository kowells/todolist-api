const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");

const {
  getAllTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./todo.controller");

const todoRouter = express.Router();

todoRouter.use(authenticate);

todoRouter.get("/", getAllTodo);
todoRouter.post("/",authenticate, addTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

module.exports = todoRouter;
