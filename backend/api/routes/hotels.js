const express = require("express");

const {
  hotels_GET,
  hotel_GET,
  hotel_POST,
  hotel_UPDATE,
  hotel_DELETE,
  countByCity,
  countByType,
  hotel_rooms_GET,
} = require("../controllers/hotelController");

const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, hotel_POST);

// UPDATE
router.put("/:id", verifyAdmin, hotel_UPDATE);

// DELETE
router.delete("/:id", verifyAdmin, hotel_DELETE);

// GET One
router.get("/find/:id", hotel_GET);

// GET All
router.get("/", hotels_GET);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", hotel_rooms_GET);

module.exports = router;
