const express = require("express");
const router = express.Router();
const knex = require('../db').handle;

// Route for when an event is saved by a user
router.post('/saved/:activityId/:userId', (req, res) => {
  knex()('saved_events')
    .select('*')
    .where({
      'activity_id': req.params.activityId,
      'user_id': req.params.userId
    })
    .then((searchResults) => {
      if (searchResults.length >= 1) {
        res.redirect(`/user/${req.params.userId}/show`)
      } else {
        knex()('saved_events')
          .insert({activity_id: req.params.activityId, user_id: req.params.userId})
          .then((results) => {
            res.redirect(`/user/${req.params.userId}/show`)
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send("Event not saved");
          })
      }
    })
})

// Route for when a saved event is deleted by a user
router.post('/delete/:activityId/:userId', (req, res) => {
  knex()('saved_events')
    .where({activity_id: req.params.activityId, user_id: req.params.userId})
    .del()
    .then((results) => {
      res.redirect(`/user/${req.params.userId}/show`)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Event could not be deleted");
    })
})

module.exports = router;
