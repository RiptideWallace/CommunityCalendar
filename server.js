require('dotenv').config();

const express          = require("express");
const PORT             = process.env.PORT || 3000;
const ENV              = process.env.NODE_ENV || "development";
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
const basicAuth        = require("basic-auth");
const secureRoute      = require("secure-route");
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

function randomString() {
  let output = "";
  let characters = "abcdefghijklmnopqrstuvwxyz1234567890"
    for (let i = 0; i < 6; i++) {
      output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
}

// For production (Heroku) http:// requests, redirect to https://
if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    if (req.header('X-Forwarded-Proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

//Home Page
app.get("/", (req, res) => {
  knex('regions')
    .select([
      'regions.name as region_name',
      'regions.slug as region_slug'
    ])
    .orderBy('region_name')
    .then((regionResults) => {
      knex('places')
        .select([
          'regions.slug as region_slug',
          'regions.id as region_id',
          'places.name as place_name',
          'places.slug as place_slug'
          ])
        .join('regions', 'regions.id', '=', 'places.region_id')
        .orderBy('place_name')
        .then((placeResults) => {
          let templateVars = {
            region: regionResults,
            place: placeResults,
          }

          res.render("index", templateVars);
        });
    });
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

//Create Event Page (GET)
app.get("/create-event", (req, res, next) => {
  knex('*')
    .from('users')
    .where('admin is true')
    .then((userResults) => {
  knex('places')
    .select([
      'places.id as id',
      'places.name as place_name'
      ])
      .orderBy('id')
      .then((results) => {
        console.log(results);
        let templateVars = {
          place: results,
        }
  res.render("create-event", templateVars);
  });
})

//Create Event (POST)
app.post("/create-event", (req, res) => {
  knex('activities')
    .insert ({
      place_id: req.body.placeID,
      name: req.body.event,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      price_range: req.body.price_range,
      source: req.body.source,
      slug: (slug(req.body.event)) + "-" + randomString()
    })
    .then((results) => {
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Event Not Saved")
    })
    res.redirect("/")
})

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

app.get("/users/:id/show", (req, res) => {
  knex('users')
  .where({id: req.params.id})
  .then((userResults) => {
    if (userResults.length === 0) {
      res.status(404).send("This user does not exist");
      return;
    }
    knex
      .select([
        '*',
        'activities.name as activity_name',
        'activities.start_date as activity_start_date',
        'activities.end_date as activity_end_date',
        'activities.source as activity_source',
        'activities.slug as activity_slug',
        'regions.slug as region_slug',
        'places.slug as place_slug',
        'places.name as place_name'
      ])
    .from("saved-events")
    .leftJoin('activities', 'saved-events.activity_id', 'activities.id')
    .leftJoin('places', 'activities.place_id', 'places.id')
    .leftJoin('regions', 'places.region_id', 'regions.id')
    .then((savedResults) => {
      knex
        .select([
          '*',
          'regions.slug as region_slug',
          'places.slug as place_slug',
          'places.name as place_name'
        ])
      .from("favourited-places")
      .join('places', 'favourited-places.place_id', 'places.id')
      .join('regions', 'places.region_id', 'regions.id')
      .then((favedResults) => {
        const templateVars = {
          user: userResults[0],
          savedEvents: savedResults,
          favedPlaces: favedResults
        };
        res.render("user", templateVars);
      });
    });
  });
});

// Route to an event's page with URLs in slug form
app.get('/BC/:region/:place/:activity', function(req, res, next) {
  knex('activities')
    .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'activities.slug as activity_slug',
      'places.id as place_id',
      'places.name as place_name',
      'places.slug as place_slug',
      'places.abbreviation',
      'places.street_address',
      'places.latitude as latitude',
      'places.longitude as longitude',
      'regions.id as region_id',
      'regions.slug as region_slug',
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
app.get('/BC/:region/:place', function(req, res) {
  knex('activities')
    .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'activities.slug as activity_slug',
      'places.id as place_id',
      'places.name as place_name',
      'places.slug as place_slug',
      'places.abbreviation',
      'places.street_address',
      'regions.id as region_id',
      'regions.slug as region_slug',
      'regions.name as region_name'
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({
      'places.slug': req.params.place,
      'regions.slug': req.params.region
    })
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        knex('places')
          .select([
            'places.id as place_id',
            'places.name as place_name',
            'places.slug as place_slug',
            'places.abbreviation',
            'places.street_address',
            'regions.id as region_id',
            'regions.slug as region_slug',
            'regions.name as region_name'
          ])
          .join('regions', 'regions.id', '=', 'places.region_id')
          .where({
            'places.slug': req.params.place,
            'regions.slug': req.params.region
          })
          .then((subResults) => {
            let templateVars = {
              activities: [],
              place: subResults,
              apiKey: googleMapsApiKey
            }
            res.render("event-search", templateVars);
          })
          .catch((err) => {
            console.log(err);
            res.status(404).send("Inside of the catch error in the sub query");
          })
      } else {
        let templateVars = {
          activities: results,
          apiKey: googleMapsApiKey
        }
        res.render("event-search", templateVars);
      }
    });
});

//Route for when a search is conducted on a region
app.get('/BC/:region', (req, res) => {
   knex('places')
    .select([
      'places.id as id',
      'places.name as name',
      'places.abbreviation',
      'places.street_address as street_address',
      'places.slug as place_slug',
      'regions.id as region_id',
      'regions.name as region_name',
      'regions.slug as region_slug'
    ])
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({'regions.slug': req.params.region})
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        res.status(404).send("This place does not exist");
        return;
      }
      let templateVars = {
        place: results,
      }
      res.render("place-search", templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Event Not Saved");
    });
});

//Route for when a search is conducted by price range
app.get('/price/:pricerange', (req, res) => {
  knex('activities')
   .select([
      'activities.id as id',
      'activities.name as name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'activities.slug as activity_slug',
      'places.id as place_id',
      'places.name as place_name',
      'places.abbreviation',
      'places.street_address',
      'places.slug as place_slug',
      'regions.id as region_id',
      'regions.name as region_name',
      'regions.slug as region_slug'
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .where({
      'activities.price_range': req.params.pricerange,
    })
    .then((results) => {
      console.log(results);
      if (results.length === 0) {
        res.status(404).send("There are no activities in this price range");
        return;
      }
      let templateVars = {
        activity: results,
      }
      res.render("price-search", templateVars);
    });
});

//Route for when an event is saved by a user
app.post('/event/saved/:activityId/:userId', (req, res) => {
  knex('saved-events')
    .insert({activity_id: req.params.activityId, user_id: req.params.userId})
    .then((results) => {
      res.redirect(`/users/${req.params.userId}/show`)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Event Not Saved");
    })
})

//Route for when a place is favourited by a user
app.post('/place/saved/:placeId/:userId', (req, res) => {
  knex('favourited-places')
    .insert({place_id: req.params.placeId, user_id: req.params.userId})
    .then((results) => {
      res.redirect(`/users/${req.params.userId}/show`)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Place Not Favourited")
    })
})

app.listen(PORT, () =>{
  console.log("Listening in on Port " + PORT)
});
