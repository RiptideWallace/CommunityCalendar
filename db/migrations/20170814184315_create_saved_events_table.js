
exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved-events', function(table) {
    table.increments();
    table.integer('activity_id').references('id').inTable('activities');
    table.integer('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved-events')
};
