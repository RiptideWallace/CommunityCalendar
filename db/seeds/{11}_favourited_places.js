
exports.seed = function(knex, Promise) {
  return knex('favourited-places').del()
    .then(function () {
      return Promise.all([
        knex('favourited-places').insert({place_id: 1, user_id: 1}),
        knex('favourited-places').insert({place_id: 2, user_id: 1}),
        knex('favourited-places').insert({place_id: 3, user_id: 1}),
        knex('favourited-places').insert({place_id: 4, user_id: 2}),
        knex('favourited-places').insert({place_id: 5, user_id: 2}),
      ]);
    });
};
