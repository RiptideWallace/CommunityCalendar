const express       = require("express");
const PORT          = 3000;
const app           = express();
const pg            = require("pg");
const knex          = require("knex");
const ejs           = require("ejs");
const bcrypt        = require("bcrypt");
const cookieSession = require('cookie-session');
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

//Home Page
app.get("/", (req, res) => {
  res.render("index")
});

//Search Page
app.get("/search", (req, res) => {
  res.render("search")
});

app.get("/event", (req, res) => {
  res.render("event")
});

app.listen(PORT, () =>{
  console.log("Listening in on Port " + PORT)
});