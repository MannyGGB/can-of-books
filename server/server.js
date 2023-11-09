const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

const mongoose = require("mongoose");
const Book = require("./models/book");
mongoose.connect(process.env.DATABASE_URL);

// add your endpoints here
app.get("/", (request, response) => response.json("Root route for books."));

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find(request.query);
    response.json(books);
  } catch (error) {
    console.log(error);
    response.status(404).json("404 Book Not Found");
  }
});

app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.json(newBook);
  } catch (error) {
    console.log(error);
    response.status(500).json("500 Internal Server Error");
  }
});

app.delete("/books/:id", async (request, response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(request.params.id);
    response.json(deletedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json("500 Internal Server Error");
  }
});

app.put("/books/:id", async (request, response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.json(updatedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json("500 Internal Server Error");
  }
});
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
