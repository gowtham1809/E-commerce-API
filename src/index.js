require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const mainRoutes = require('./routes/mainRoutes');

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// app.use('/api', mainRoutes);
const PORT = process.env.PORT || 5000;
 const server =app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
 })

module.exports = { app, server };