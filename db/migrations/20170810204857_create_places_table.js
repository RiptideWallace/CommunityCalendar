
exports.up = function(knex, Promise) {
  return knex.schema.createTable('places', function(table) {
    table.increments();
    table.integer('region_id').references('id').inTable('regions')
    table.string('name');
    table.string('abbreviation');
    table.string('street_address')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('places')
};
