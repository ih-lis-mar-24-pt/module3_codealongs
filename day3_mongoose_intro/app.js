const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Book = require("./models/Book.model");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
// allows us to send json responses
app.use(express.json());

app.get("/", (req, res, next) => {
  console.log(req);
});

// CRUD
// Get - All the books
// Get - Get by ID
// POST - Create the book
// PUT - Update the book
// DELETE - Delete the book

// Post route to create the book

app.post("/books", async (req, res, next) => {
  //req.query
  //req.body

  const { title, year, codeISBN, quantity, lastPublished, genre, author } =
    req.body;

  try {
    const newBook = await Book.create(req.body);
    /*   const newBook = await Book.create({
      title,
      year,
      codeISBN,
      quantity,
      lastPublished,
      genre,
      author,
    }); */

    console.log(newBook);

    res
      .status(201)
      .send(`Book with title ${newBook.title} successfully created`);
  } catch (error) {
    console.error(error);
  }
});

// Connect to the local db
//creates a db with the given name if it doesn't exist
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-example-dev")
  .then(bananas => console.log(`Connected to ${bananas.connections[0].name}`))
  .catch(err => console.error(err));

app.listen(3000, () => console.log("App listening on port 3000"));
