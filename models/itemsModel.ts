const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  desc: String,
});

module.exports = mongoose.model("Item", itemSchema);
