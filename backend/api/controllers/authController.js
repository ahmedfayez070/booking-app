const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../utils/error");

const userSchema = require("../models/UserModel");

const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).json({ newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isPasswordCorrect = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
