'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db').handle;
const bcrypt = require('bcrypt');

// Route to register page (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// Route to register (POST)
router.post('/register', (req, res) => {
  if (req.body.password === req.body.password_confirmation) {
    knex()('users')
      .insert({
        name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      .then(() => {
        return knex()
          .select('*')
          .from('users')
          .where({email: req.body.email});
      })
      .then((results) => {
        req.session.userId = results[0].id;
        res.redirect('/');
      })
      .catch((err) => {
        res.status(404).send('Could not complete registration');
      });
  } else {
    res.status(404).send('Password and confirmation do not match');
  }
});

// Route to a user's profile page (GET)
router.get('/:id/show', (req, res) => {
  knex()('users')
    .where({id: req.params.id})
    .then((userResults) => {
      if (userResults.length === 0) {
        res.status(404).send('This user does not exist');
        return;
      }
      knex()
        .select([
          '*',
          'activities.name as activity_name',
          'activities.start_date as activity_start_date',
          'activities.end_date as activity_end_date',
          'activities.source as activity_source',
          'activities.slug as activity_slug',
          'regions.slug as region_slug',
          'regions.name as region_name',
          'places.slug as place_slug',
          'places.name as place_name',
          'places.street_address as street_address'
        ])
        .from('saved_events')
        .leftJoin('activities', 'saved_events.activity_id', 'activities.id')
        .leftJoin('places', 'activities.place_id', 'places.id')
        .leftJoin('regions', 'places.region_id', 'regions.id')
        .where({'saved_events.user_id': req.params.id})
        .then((savedResults) => {
          knex()
            .select([
              '*',
              'places.name as place_name',
              'places.slug as place_slug',
              'regions.name as region_name',
              'regions.slug as region_slug',
            ])
            .from('favourited_places')
            .join('places', 'favourited_places.place_id', 'places.id')
            .join('regions', 'places.region_id', 'regions.id')
            .where({'favourited_places.user_id': req.params.id})
            .then((favedResults) => {
              let templateVars = {
                user: userResults[0],
                savedEvents: savedResults,
                favedPlaces: favedResults
              };
              res.render('user', templateVars);
            });
        });
    });
});

// Route to login page (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Route to login (POST)
router.post('/login', (req, res) => {
  knex()
    .select('*')
    .from('users')
    .where({email: req.body.email})
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send('Login failed');
        return;
      }
      if (!bcrypt.compareSync(req.body.password, results[0].password)) {
        res.status(404).send('Login failed');
        return;
      }
      req.session.userId = results[0].id;
      res.redirect('/');
    });
});

// Route to logout (POST)
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
