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
    /*  const newBook = await Book.create({
      title, year,
      codeISBN, quantity,
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
    res.status(500).send("There was a problem on the server");
  }
});

// GET all books

app.get("/books", async (req, res, next) => {
  try {
    // const allBooks = await Book.find({ title: "The Lord of the rings" });
    const allBooks = await Book.find({});

    res.status(200).json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem on the server");
  }
});

// Get by Id

app.get("/books/:bookId", async (req, res, next) => {
  try {
    //req.query
    // ?title="Lord"&year=1954
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    //findOne returns ONLY 1, the first one that it finds
    //const specificBook = Book.findOne({ year: 1954});
    //const book = await Book.findById(req.params.bookId)

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem on the server");
  }
});

app.put("/books/:bookId", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    /*  const { title, year, codeISBN, quantity, lastPublished, genre, author } =
      req.body; */

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem on the server");
  }
});

// DELETE route

app.delete("/books/:bookId", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    // Book.deleteMany({})
    // Book.deleteOne({title: "Lord"})

    await Book.findByIdAndDelete(bookId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem on the server");
  }
});

// Connect to the local db
//creates a db with the given name if it doesn't exist
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-example-dev")
  .then(x => console.log(`Connected to ${x.connections[0].name}`))
  .catch(err => console.error(err));

app.listen(3000, () => console.log("App listening on port 3000"));

// Types of document relationships:
//Embedding
// -- When we insert the data inside of the document
// By reference
// -- When we use the id of a different object to refer to it
