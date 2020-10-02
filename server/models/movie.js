const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieShema = new Schema({
  name: String,
  genre: String,
  directorId: String,
});

module.exports = mongoose.model("Movie", movieShema);
