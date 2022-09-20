const express = require("express");
const roomSchema = require("../models/RoomModel");
const hotelSchema = require("../models/HotelModel");

const { createError } = require("../utils/error");

// create room
const room_POST = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new roomSchema(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelSchema.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ savedRoom });
  } catch (err) {
    next(err);
  }
};

//room update
const room_UPDATE = async (req, res, next) => {
  try {
    const updatedRoom = await roomSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const room_AVAILABILTY_UPDATE = async (req, res, next) => {
  try {
    await roomSchema.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json({ message: "Room status has been updated." });
  } catch (err) {
    next(err);
  }
};

const room_DELETE = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await roomSchema.findByIdAndDelete(req.params.id);
    try {
      await hotelSchema.findByIdAndUpdate(hotelId, {
        $pull: { room: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// get all rooms
const rooms_GET = async (req, res, next) => {
  try {
    const rooms = await roomSchema.find();
    res.status(200).json(rooms);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const room_GET = async (req, res, next) => {
  try {
    const room = await roomSchema.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

module.exports = {
  room_POST,
  room_UPDATE,
  room_DELETE,
  rooms_GET,
  room_GET,
  room_AVAILABILTY_UPDATE,
};
