const express = require("express");
const router = express.Router();
const knex = require('../db').handle;

// Route to an event's page with URLs in slug form
router.get('/:region/:place/:activity', function(req, res, next) {
  knex()('activities')
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
      'regions.name as region_name',
      knex().raw(`COALESCE(JSON_AGG(saved_events.*) FILTER (WHERE saved_events.activity_id = activities.id), '[]') AS saved_events`)
    ])
    .join('places', 'places.id', '=', 'activities.place_id')
    .join('regions', 'regions.id', '=', 'places.region_id')
    .leftJoin('saved_events', 'activities.id', 'saved_events.activity_id')
    .where({
      'activities.slug': req.params.activity,
      'places.slug': req.params.place,
      'regions.slug': req.params.region
    })
    .groupBy(
      'activities.id',
      'activities.name',
      'activities.start_date',
      'activities.end_date',
      'activities.price_range',
      'activities.source',
      'activities.description',
      'activities.slug',
      'places.id',
      'places.name',
      'places.slug',
      'places.abbreviation',
      'places.street_address',
      'places.latitude',
      'places.longitude',
      'regions.id',
      'regions.slug',
      'regions.name'
    )
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("This activity does not exist");
        return;
      }
      let savedUsers = [];
      let savedEvents = results[0].saved_events;
      savedEvents.forEach(function(result) {
        savedUsers.push(result.user_id);
      });
      let templateVars = {
        activity: results[0],
        savedUsers: savedUsers
      }
      res.render("event", templateVars);
    });
});

// Route for when a search is conducted on a place
router.get('/:region/:place', function(req, res) {
  knex().select([
    'places.id as place_id',
    'places.name as place_name',
    'places.slug as place_slug',
    'places.street_address as street_address',
    'places.latitude',
    'places.longitude',
    'regions.id as region_id',
    'regions.slug as region_slug',
    'regions.name as region_name',
    knex().raw(`COALESCE(JSON_AGG(activities.*) FILTER (WHERE activities.id IS NOT NULL), '[]') AS activities`),
    knex().raw(`COALESCE(JSON_AGG(favourited_places.*) FILTER (WHERE favourited_places.id IS NOT NULL), '[]') AS favourited_places`)
    ])
    .from('regions')
    .leftJoin('places', 'regions.id', 'places.region_id')
    .leftJoin('activities', 'places.id', 'activities.place_id')
    .leftJoin('favourited_places', 'places.id', 'favourited_places.place_id')
    .where({
      'places.slug': req.params.place,
      'regions.slug': req.params.region
    })
    .groupBy(
      'places.id',
      'places.name',
      'places.slug',
      'places.street_address',
      'places.latitude',
      'places.longitude',
      'regions.id',
      'regions.slug',
      'regions.name'
    )
    .then((results) => {
      let favouritedUsers = [];
      let favouritedPlacesResults = results[0].favourited_places;
      favouritedPlacesResults.forEach(function(result) {
        if (favouritedUsers.indexOf(result.user_id) === -1 ) {
          favouritedUsers.push(result.user_id);
        }
      });
      let templateVars = {
        place: results[0],
        activities: results[0].activities,
        favouritedUsers: favouritedUsers
      }
      res.render("event-search", templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("This place does not exist");
    });
});

// Route for when a search is conducted on a region
router.get('/:region', (req, res) => {
   knex()('places')
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
        res.status(404).send("This region does not exist");
        return;
      }
      let templateVars = {
        place: results,
      }
      res.render("place-search", templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("This region does not exist");
    });
});

module.exports = router;
