
exports.seed = function(knex, Promise) {
  return knex('regions').del()
    .then(function () {
      return Promise.all([
        knex('regions').insert({id: 1, name: 'Victoria'}),
        knex('regions').insert({id: 2, name: 'Oak Bay'}),
        knex('regions').insert({id: 3, name: 'Esquimalt'}),
        knex('regions').insert({id: 4, name: 'Saanich'}),
        knex('regions').insert({id: 5, name: 'Langford'})
      ]);
    });
};
