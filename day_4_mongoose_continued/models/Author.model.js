const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: Number,
});

const Author = model("Author", AuthorSchema);

module.exports = Author;
