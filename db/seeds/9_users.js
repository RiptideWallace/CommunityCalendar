
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Bob', email: 'bob@bob.com', password: 'bob12345'}),
        knex('users').insert({id: 2, name: 'Joe', email: 'joe@joe.com', password: 'joe12345'}),
        ]);
    });
};
