const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const mongoose = require("mongoose");
//mongoose.connect(process.env.DATABASE);

// add your endpoints here
app.get("/", (request, response) => response.json("Root route for translatim"));
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
