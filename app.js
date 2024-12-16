const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./app/user/user.router");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
