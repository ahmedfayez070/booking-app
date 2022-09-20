const express = require("express");
const userSchema = require("../models/UserModel");

const { createError } = require("../utils/error");

const users_GET = async (req, res, next) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const user_GET = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const user_UPDATE = async (req, res, next) => {
  try {
    const updateduser = await userSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const user_DELETE = async (req, res, next) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

module.exports = {
  users_GET,
  user_GET,
  user_UPDATE,
  user_DELETE,
};
