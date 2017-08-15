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
const slug             = require('slug')
slug.defaults.mode     = 'rfc3986';

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
app.get('search',(req, res) => {
      res.render("search");
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

// Route to an event's page with URLs in slug form
app.get('bc/:region/:place/:activity', function(req, res, next) {
  knex('activities')
    .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'places.id as place_id',
      'places.name as place_name',
      'places.abbreviation',
      'places.street_address',
      'regions.id as region_id',
      'regions.name as region_name'
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({
      'activities.slug': req.params.activity,
      'places.slug': req.params.place,
      'regions.slug': req.params.region
    })
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        res.status(404).send("This activity does not exist");
        return;
      }
      let templateVars = {
        activity: results[0],
        apiKey: googleMapsApiKey
      }
      res.render("event", templateVars);
    });
});

// Route for when a search is conducted on a place
app.get('bc/:region/:place', function(req, res, next) {
  knex('activities')
    .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'places.id as place_id',
      'places.name as place_name',
      'places.abbreviation',
      'places.street_address',
      'regions.id as region_id',
      'regions.name as region_name'
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({'places.name': req.params.place})
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        res.status(404).send("This place does not exist");
        return;
      }
      let templateVars = {
        activity: results
      }
      res.render("search", templateVars);
    });
});

//Route for when a search is conducted on a region
app.get('/:region', (req, res) => {
   knex('activities')
    .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'places.id as place_id',
      'places.name as place_name',
      'places.abbreviation',
      'places.street_address',
      'regions.id as region_id',
      'regions.name as region_name'
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({'regions.name': req.params.region})
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        res.status(404).send("This place does not exist");
        return;
      }
      let templateVars = {
        activity: results
      }
      res.render("search", templateVars);
    });
});

//Route for when an event is saved by a user
app.post('/event/saved/:activityId/:userId', (req, res) => {
  knex('saved-events')
    .insert({activity_id: req.params.activityId, user_id: req.params.userId})
    .then((results) => {
      res.redirect(`/${req.params.userId}/show`)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Event Not Saved");
    })
})

//Route for accessing saved events
app.get("/user/:id/saved-events", (req, res) => {
  knex
    .select("*")
    .from("saved-events")
    .leftJoin('activities', 'saved-events.activity_id', 'activities.id')
    .where("saved-events.user_id", req.params.id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(404).send("This Event is Not Saved");
    });
});

app.listen(PORT, () =>{
  console.log("Listening in on Port " + PORT)
});
