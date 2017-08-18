
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('places', function(table) {
      table.float('latitude');
      table.float('longitude');
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('places', function(table) {
    table.dropColumn('places')
  })
};
