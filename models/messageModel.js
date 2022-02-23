const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: String,
  phone: String,
});

module.exports = mongoose.model("Message", schema);
