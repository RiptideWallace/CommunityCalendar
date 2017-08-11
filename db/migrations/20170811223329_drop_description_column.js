
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('activities', function(table){
      table.dropColumn('description')
    })
  ])

};

exports.down = function(knex, Promise) {

};
