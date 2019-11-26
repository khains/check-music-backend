const express = require("express");
const ApiRouter = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const md5Router = require("./md5upload");
const md5checkRouter = require("./md5check");

ApiRouter.get("/", (req, res) => {
    res.send("Shop API!!!");
})

ApiRouter.use("/user", userRouter);
ApiRouter.use("/auth", authRouter);
ApiRouter.use("/md5", md5Router);
ApiRouter.use("/check", md5checkRouter);

module.exports = ApiRouter;