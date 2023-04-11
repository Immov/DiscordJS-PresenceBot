// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
require("dotenv").config();

// Define the schema
const tapSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  tap: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  proofURL: {
    type: String,
  },
  hour: {
    type: Number,
    min: 0,
    max: 24,
  },
  minute: {
    type: Number,
    min: 0,
    max: 60,
  },
});

// Create the model
const Tap = mongoose.model("Tap", tapSchema);

// Create the connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check the connection
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

db.on("error", (error) => {
  console.log(`MongoDB connection error: ${error}`);
});

// Create the app
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define the routes
app.get("/", async (req, res) => {
  try {
    const taps = await Tap.find();
    res.render("index", { taps });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
