
exports.seed = function(knex, Promise) {
  return knex('regions').del()
    .then(function () {
      return Promise.all([
        knex('regions').insert({id: 1, name: 'Victoria', slug: 'victoria'}),
        knex('regions').insert({id: 2, name: 'Oak Bay', slug: 'oak-bay'}),
        knex('regions').insert({id: 3, name: 'Esquimalt', slug: 'esquimalt'}),
        knex('regions').insert({id: 4, name: 'Saanich', slug: 'saanich'}),
        knex('regions').insert({id: 5, name: 'Langford', slug: 'langford'}),
        knex('regions').insert({id: 6, name: 'Metchosin', slug: 'metchosin'}),
        knex('regions').insert({id: 7, name: 'North Saanich', slug: 'north-saanich'}),
        knex('regions').insert({id: 8, name: 'Colwood', slug: 'colwood'}),
        knex('regions').insert({id: 9, name: 'Highlands', slug: 'highlands'}),
        knex('regions').insert({id: 10, name: 'Sidney', slug: 'sidney'}),
        knex('regions').insert({id: 11, name: 'Sooke', slug: 'sooke'}),
        knex('regions').insert({id: 12, name: 'Central Saanich', slug: 'central-saanich'}),
        knex('regions').insert({id: 13, name: 'View Royal', slug: 'view-royal'}),
      ]);
    });
};
