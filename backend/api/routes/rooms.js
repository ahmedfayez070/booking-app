const express = require("express");

const {
  rooms_GET,
  room_GET,
  room_POST,
  room_UPDATE,
  room_DELETE,
  room_AVAILABILTY_UPDATE,
} = require("../controllers/roomController");

const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// GET All
router.get("/", rooms_GET);

// GET One
router.get("/:id", room_GET);

// CREATE
router.post("/:hotelid", verifyAdmin, room_POST);

// UPDATE
router.put("/:id", verifyAdmin, room_UPDATE);
router.put("/availability/:id", room_AVAILABILTY_UPDATE);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, room_DELETE);

module.exports = router;
