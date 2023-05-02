const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
var jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { email, name, gender, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const User = new UserModel({ email, password: hash, name, gender });
      await User.save();
      res.status(200).send({ msg: "You successfully register" });
    });
  } catch (err) {
    res.status(400).send({ msg: "Yu cannot register" });
  }
});

///*Login Purpose;

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("hello",email)

  try {
    const User = await UserModel.findOne({ email });
    if (User) {
      bcrypt.compare(password, User.password, (err, result) => {
        if (result === true) {
          const token = jwt.sign({ authorID: User._id, authorName: User.name },"eval");
          res.status(200).send({ msg: "Successfully get Token", token: token });
        }
      });
    } else {
      res.status(200).send({ msg: "U are not that person" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Login Fail!!!!" });
  }
});

module.exports = { userRouter };
