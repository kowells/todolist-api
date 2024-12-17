const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./app/user/user.router");
const todoRouter = require("./app/todo/todo.router");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
