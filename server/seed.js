const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/book");

mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  await Book.create([
    {
      title: "The Great Gatsby",
      description:
        "A classic novel by F. Scott Fitzgerald set in the Roaring Twenties.",
      status: true,
    },
    {
      title: "To Kill a Mockingbird",
      description:
        "A poignant novel by Harper Lee that explores themes of racial injustice in the American South.",
      status: false,
    },
    {
      title: "Dune",
      description:
        "A science fiction masterpiece by Frank Herbert, set in a distant future on the desert planet Arrakis.",
      status: true,
    },
  ]);
  console.log("Book created");
  mongoose.disconnect();
}

seed();
