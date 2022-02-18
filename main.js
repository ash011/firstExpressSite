const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

let messages = [
  { message: "Hello", phone: "374-33-33-33-33", id: 523456 },
  { message: "World", phone: "374-33-33-33-33", id: 523457 },
  { message: "!", phone: "374-33-33-33-33", id: 523458 },
];

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

app.get("/new", (req, res) => {
  res.render("changeContent", { messages: messages });
});

app.delete("/new", (req, res) => {
  messages.forEach((message) => {
    if (message.id == req.query.id) {
      messages.splice(messages.indexOf(message), 1);
      if (messages.length == 0) {
        messages = false;
      }
      console.log(messages);
    }
  });
});

app.get("/content/new", (req, res) => {
  res.render("addMassage");
});

app.post("/content/new", (req, res) => {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += Math.floor(Math.random() * 10);
  }
  if (messages) {
    messages.push({
      message: req.body.message,
      phone: req.body.phone,
      id: +id,
    });
  } else {
    messages = [];
    messages.push({
      message: req.body.message,
      phone: req.body.phone,
      id: +id,
    });
  }
  res.redirect("/");
});

app.get("/change", (req, res) => {
  messages.forEach((message) => {
    if (message.id == req.query.id) {
      res.render("changeMessage", { message: message });
    }
  });
});

app.post("/change", (req, res) => {
  messages.forEach((message) => {
    if (message.id == req.body.id) {
      message.message = req.body.message;
      message.phone = req.body.phone;
    }
  });
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT || 3000);
});
