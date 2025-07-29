const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devdb";
const Frontend_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const app = express();
app.use(
  cors({
    origin: Frontend_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

 mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const mainRoutes = require("./routes/mainRoutes");

app.use("/api", mainRoutes);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
