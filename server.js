require('dotenv').config();

const express           = require("express");
const PORT              = process.env.PORT || 3000;
const ENV               = process.env.NODE_ENV || "development";
const googleMapsApiKey  = process.env.GOOGLE_MAPS_API_KEY;
const app               = express();
const helmet            = require('helmet');
const pg                = require("pg");
const knexConfig        = require('./knexfile');
const db                = require('./db');
const ejs               = require('ejs');
const cookieSession     = require('cookie-session');
const bodyParser        = require('body-parser');
const sass              = require('node-sass-middleware');
const basicAuth         = require("basic-auth");
const secureRoute       = require("secure-route");
const directoryRoutes   = require('./routes/directory');
const eventCreateRoutes = require('./routes/create-event');
const eventSaveRoutes   = require('./routes/event');
const placeRoutes       = require('./routes/place');
const priceRoutes       = require('./routes/price');
const userRoutes        = require('./routes/user');

db.init(app, knexConfig[ENV]);
const knex = db.handle();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

// Use Helmet for secure HTTP headers
app.use(helmet());

app.use(cookieSession({
  keys: ['hello', 'world']
}));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.apiKey = googleMapsApiKey;
  next();
});

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

// For production (Heroku) http:// requests, redirect to https://
if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    if (req.header('X-Forwarded-Proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Route to home page (GET)
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

// Imported routes from ./routes directory
app.use('/BC', directoryRoutes);
app.use('/create-event', eventCreateRoutes);
app.use('/event', eventSaveRoutes);
app.use('/user', userRoutes);
app.use('/place', placeRoutes);
app.use('/price', priceRoutes);

// Route for 404 catch-all
app.get('*', function(req, res){
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
