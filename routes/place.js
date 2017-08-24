const express = require("express");
const router = express.Router();
const knex = require('../db').handle;

// Route for when a place is favourited by a user (POST)
router.post('/saved/:placeId/:userId', (req, res) => {
  knex()('favourited_places')
    .select('*')
    .where({
      'place_id': req.params.placeId,
      'user_id': req.params.userId
    })
    .then((searchResults) => {
      if (searchResults.length >= 1) {
        res.redirect(`/user/${req.params.userId}/show`)
      } else {
        knex()('favourited_places')
          .insert({place_id: req.params.placeId, user_id: req.params.userId})
          .then((results) => {
            res.redirect(`/user/${req.params.userId}/show`)
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send("Place not favourited")
          })
      }
    })
})

// Route for when a saved event is deleted by a user (POST)
router.post('/delete/:placeId/:userId', (req, res) => {
  knex()('favourited_places')
    .where({place_id: req.params.placeId, user_id: req.params.userId})
    .del()
    .then((results) => {
      res.redirect(`/user/${req.params.userId}/show`)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Place could not be un-favourited");
    })
})

module.exports = router;
