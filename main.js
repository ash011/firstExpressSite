const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messagesSchema = require("./models/messageModel");
require("dotenv").config();

const app = express();

// Connect your DB here:
const dbURL = process.env.DB_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

app.set("view engine", "pug");

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  express.static("public"),
  cors()
);

function validNumber(req, res, next) {
  let { phone } = req.body;
  if (isNaN(+phone)) {
    res.send("Please enter number only");
    return;
  } else if (phone.length !== 11) {
    res.send("Please enter 11 digits number");
    return;
  } else if (/^\+?374(33|43|44|55|77|91|93|94|95|96|98|99)/.test(phone)) {
    next();
  } else {
    res.send("Invalid number format");
    return;
  }
}

app.get("/", async (req, res) => {
  let messages = await messagesSchema.find();
  res.render("index", { messages: messages });
});

app.get("/new", async (req, res) => {
  let messages = await messagesSchema.find();
  res.render("changeContent", { messages: messages });
});

app.delete("/new", async (req, res) => {
  await messagesSchema.deleteOne({ _id: req.query.id });
});

app.get("/content/new", (req, res) => {
  res.render("addMassage");
});

app.post("/content/new", validNumber, (req, res) => {
  const { message, phone } = req.body;
  messagesSchema.create([
    {
      message,
      phone,
    },
  ]);
  res.redirect("/");
});

app.get("/change", async (req, res) => {
  let message = await messagesSchema.findOne({ _id: req.query.id });
  res.render("changeMessage", { message });
});

app.post("/change", validNumber, async (req, res) => {
  await messagesSchema.updateOne(
    { _id: req.body.id },
    { message: req.body.message, phone: req.body.phone }
  );
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
