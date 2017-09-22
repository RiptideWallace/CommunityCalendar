'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db').handle;
const getPriceRangeString = require('../utils/price-range-string').getPriceRangeString;

//Route for when a search is conducted by price range (GET)
router.get('/:pricerange', (req, res) => {
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
      'activities.price_range': parseInt(req.params.pricerange) || 0,
    })
    .then((results) => {
      let priceRangeString = getPriceRangeString(req.params.pricerange);
      let templateVars = {
        activity: results,
        priceString: priceRangeString
      };
      res.render('price-search', templateVars);
    });
});

module.exports = router;
