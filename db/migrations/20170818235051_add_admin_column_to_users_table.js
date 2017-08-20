
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('users', function(table) {
      table.boolean('admin').default(false);
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('users', function(table) {
    table.dropColumn('admin')
  })
};
