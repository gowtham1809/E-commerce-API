const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  count: { type: Number, require: true },
  remaining: { type: Number, require: true },
  img: { type: String },
  description: { type: String },
}, { versionKey: false });
module.exports = mongoose.model("Post", postSchema);
