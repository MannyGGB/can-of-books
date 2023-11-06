const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = 8080;

const mongoose = require("mongoose");
//const Book = require("./models/book");
//mongoose.connect(process.env.DATABASE_URL);

// add your endpoints here
app.get("/", (request, response) => response.json("Root route for translatim"));
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
