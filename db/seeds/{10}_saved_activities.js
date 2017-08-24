
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved_events').del()
    .then(function () {
      return Promise.all([
        knex('saved_events').insert({activity_id: 1, user_id: 1}),
        knex('saved_events').insert({activity_id: 2, user_id: 2}),
        knex('saved_events').insert({activity_id: 3, user_id: 2}),
      ]);
    });
};
