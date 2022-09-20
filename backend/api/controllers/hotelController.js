const express = require("express");
const hotelSchema = require("../models/HotelModel");
const roomSchema = require("../models/RoomModel");

const { createError } = require("../utils/error");

const hotels_GET = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await hotelSchema
      .find({ ...others, cheapestPrice: { $gt: min | 0, $lt: max | 10000 } })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const hotel_GET = async (req, res, next) => {
  try {
    const hotel = await hotelSchema.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const hotel_POST = async (req, res, next) => {
  const newHotel = new hotelSchema(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const hotel_UPDATE = async (req, res, next) => {
  try {
    const updatedHotel = await hotelSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const hotel_DELETE = async (req, res, next) => {
  try {
    await hotelSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelSchema.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelSchema.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelSchema.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelSchema.countDocuments({ type: "resort" });
    const villaCount = await hotelSchema.countDocuments({ type: "villa" });
    const cabinCount = await hotelSchema.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

const hotel_rooms_GET = async (req, res, next) => {
  try {
    const hotel = await hotelSchema.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return roomSchema.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hotels_GET,
  hotel_GET,
  hotel_POST,
  hotel_UPDATE,
  hotel_DELETE,
  countByCity,
  countByType,
  hotel_rooms_GET,
};
