const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    qty: { type: Number },
  },
  { versionKey: false }
);

module.exports = mongoose.model("cards", cardsSchema);
