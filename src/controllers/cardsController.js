const express = require("express");

const Cards = require("../models/cards");
const Products = require("../models/post");
const { default: mongoose } = require("mongoose");
exports.create = async (req, res) => {
  try {
    const card = new Cards(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
exports.getCards = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const card = await Cards.aggregate([
      { $match: { userId: new ObjectId(req.user.id) } },
      {
        $lookup: {
          from: "posts",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      }
    ]);

    res.status(200).json(card);
  } catch (error) {
    res.status(200).json({ error: error.message, page: "get cards" });
  }
};
