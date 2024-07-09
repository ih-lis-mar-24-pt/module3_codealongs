//Schema , model
const { Schema, model } = require("mongoose");

// Create the schema

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  codeISBN: {
    type: Number,
    maxLength: 13,
    minLength: 10,
    unique: true,
  },
  quantity: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  lastPublished: {
    type: Date,
    default: Date.now,
  },
  genre: {
    type: String,
    enum: ["Drama", "Sci-Fi", "Thriller", "Fantasy"],
  },
  author: {
    type: String,
    trim: true,
  },
});

// String, Number, Boolean, Date, Undefined, [String], ObjectId

const Book = model("Book", bookSchema);
//This will create the books collection in the database

// export default Book
module.exports = Book;

//to export multiple things
//module.exports = { Book, myname };
