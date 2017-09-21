const express = require("express");
const router = express.Router();
const knex = require('../db').handle;
const slug = require('slug');
slug.defaults.mode = 'rfc3986';
const randomString = require("../utils/random-string").randomString;

// Route to create-event page (GET)
router.get("/", (req, res, next) => {
  knex()('places')
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
});

// Route to create-event (POST)
router.post("/", (req, res) => {
  knex()('activities')
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
      res.status(400).send("Event Not Saved");
    })
    res.redirect("/");
})

module.exports = router;
