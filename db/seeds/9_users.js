
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Chris', email: 'brysonc1987@gmail.com', password: 'bryriptide1987', admin: true}),
        knex('users').insert({id: 2, name: 'Joe', email: 'joe@joe.com', password: 'joe12345', admin: false}),
        ]);
    });
};
