const express = require("express");

const {
  users_GET,
  user_GET,
  user_UPDATE,
  user_DELETE,
} = require("../controllers/userController");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello");
});

// GET All
router.get("/", verifyAdmin, users_GET);

// GET One
router.get("/:id", verifyUser, user_GET);

// UPDATE
router.put("/:id", verifyUser, user_UPDATE);

// DELETE
router.delete("/:id", verifyUser, user_DELETE);

module.exports = router;
