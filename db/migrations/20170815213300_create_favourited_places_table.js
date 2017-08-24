
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favourited_places', function(table) {
    table.increments();
    table.integer('place_id').references('id').inTable('places');
    table.integer('user_id').references('id').inTable('users');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favourited_places')
};
