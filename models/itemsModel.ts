const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  desc: String,
});

module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);
