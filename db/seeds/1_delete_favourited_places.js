
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favourited_places').del()
};
