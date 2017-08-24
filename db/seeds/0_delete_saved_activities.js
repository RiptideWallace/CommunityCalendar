
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved_events').del()
};
