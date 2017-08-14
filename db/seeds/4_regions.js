
exports.seed = function(knex, Promise) {
  return knex('regions').del()
    .then(function () {
      return Promise.all([
        knex('regions').insert({id: 1, name: 'Victoria', slug: 'victoria'}),
        knex('regions').insert({id: 2, name: 'Oak Bay', slug: 'oak-bay'}),
        knex('regions').insert({id: 3, name: 'Esquimalt', slug: 'esquimalt'}),
        knex('regions').insert({id: 4, name: 'Saanich', slug: 'saanich'}),
        knex('regions').insert({id: 5, name: 'Langford', slug: 'langford'})
      ]);
    });
};
