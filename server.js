require('dotenv').config();

const express       = require("express");
const PORT          = process.env.PORT || 3000;
const ENV           = process.env.ENV || "development";
const app           = express();
const pg            = require("pg");
const knexConfig    = require('./knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const knexLogger    = require('knex-logger');
const ejs           = require('ejs');
const bcrypt        = require('bcrypt');
const cookieSession = require('cookie-session');
const bodyParser    = require('body-parser');
const sass          = require('node-sass-middleware');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(knexLogger(knex));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

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

app.get("/search/seeds", (req, res) => {
  knex
    .select("*")
    .from("activities")
    .then((results) => {
      res.json(results);
    })
})

app.listen(PORT, () =>{
  console.log("Listening in on Port " + PORT)
});