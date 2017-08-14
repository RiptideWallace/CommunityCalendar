
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved-events').del()
    .then(function () {
      return Promise.all([
        knex('saved-events').insert({id: 1, activity_id: 1, user_id: 1}),
        knex('saved-events').insert({id: 2, activity_id: 2, user_id: 2}),
        knex('saved-events').insert({id: 3, activity_id: 3, user_id: 2}),
      ]);
    });
};
