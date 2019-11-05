const express = require("express");
const ApiRouter = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");

ApiRouter.get("/", (req, res) => {
    res.send("Shop API!!!");
})

ApiRouter.use("/user", userRouter);
ApiRouter.use("/auth", authRouter);

module.exports = ApiRouter;