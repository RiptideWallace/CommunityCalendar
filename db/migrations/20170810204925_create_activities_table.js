
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activities', function(table) {
    table.increments();
    table.integer('place_id').references('id').inTable('places')
    table.string('name');
    table.text('description');
    table.string('start_date');
    table.string('end_date');
    table.integer('price_range');
    table.string('source');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activities')
};
