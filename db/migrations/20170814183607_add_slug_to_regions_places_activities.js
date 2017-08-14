
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('activities', function(table) {
      table.string('slug', [270]);
    }),
    knex.schema.table('places', function(table) {
      table.string('slug', [270]);
    }),
    knex.schema.table('regions', function(table) {
      table.string('slug', [270]);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('activities', function(table) {
      table.dropColumn('slug')
    }),
    knex.schema.table('places', function(table) {
      table.dropColumn('slug')
    }),
    knex.schema.table('regions', function(table) {
      table.dropColumn('slug')
    }),
  ])
};
