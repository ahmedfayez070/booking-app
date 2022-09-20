require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// import routes
const authRoutes = require("./api/routes/auth.js");
const usersRoutes = require("./api/routes/users.js");
const hotelsRoutes = require("./api/routes/hotels.js");
const roomsRoutes = require("./api/routes/rooms.js");

const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

// handle error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "No such route" });
  next();
});

app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});
