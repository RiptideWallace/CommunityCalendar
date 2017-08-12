require('dotenv').config();

const express          = require("express");
const PORT             = process.env.PORT || 3000;
const ENV              = process.env.ENV || "development";
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const app              = express();
const pg               = require("pg");
const knexConfig       = require('./knexfile');
const knex             = require('knex')(knexConfig[ENV]);
const knexLogger       = require('knex-logger');
const ejs              = require('ejs');
const bcrypt           = require('bcrypt');
const cookieSession    = require('cookie-session');
const bodyParser       = require('body-parser');
const sass             = require('node-sass-middleware');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(knexLogger(knex));

app.use(cookieSession({
  keys: ['hello', 'world']
}));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
})

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

//Register Page (GET)
app.get("/register", (req, res) => {
  res.render("register")
});

//Register Page (POST)
app.post("/register", (req, res) => {
  knex('users')
    .insert({
      name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(() => {
      return knex
        .select("*")
        .from('users')
        .where({email: req.body.email});
      })
        .then((results) => {
          req.session.userId = results[0].id;
          res.redirect("/")
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send("Bad Register");
        })
})

//Login Page (GET)
app.get("/login", (req, res) => {
  res.render("login");
});

//Login Page (POST)
app.post("/login", (req, res) => {
  knex
    .select("*")
    .from('users')
    .where({email: req.body.email})
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("This e-mail is not associated with a registered user")
        return;
      }
      if (!bcrypt.compareSync(req.body.password, results[0].password)) {
        res.status(404).send("Invalid password")
        return;
      }
      req.session.userId = results[0].id;
      res.redirect("/");
    });
});

//Logout (POST)
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

//Search Page
app.get("/search", (req, res) => {
  res.render("search")
});

//Event Page
app.get("/event", (req, res) => {
  let templateVars = {
    apiKey: googleMapsApiKey
  };
  res.render("event", templateVars)
});

//User Profile Page
app.get("/:id/show", (req, res) => {
  knex('users')
  .where({id: req.params.id})
  .then((results) => {
    if (results.length === 0) {
      res.status(404).send("This user does not exist");
      return;
    }
    const templateVars = {user: results[0]};
    res.render("user", templateVars);
  });
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
