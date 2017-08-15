
exports.seed = function(knex, Promise) {
  return knex('places').del()
    .then(function () {
      return Promise.all([
        knex('places').insert({id: 1, region_id: 1, name: 'Crystal Pool', abbreviation: 'CP', street_address: '2275 Quadra Street', slug: 'crystal-pool'}),
        knex('places').insert({id: 2, region_id: 1, name: 'Oaklands Community Association', abbreviation: 'OCA', street_address: '2827 Belmont Avenue', slug: 'oaklands-community-association'}),
        knex('places').insert({id: 3, region_id: 1, name: 'Royal BC Museum', abbreviation: 'RBCM', street_address: '675 Belleville Street', slug: 'royal-bc-museum'}),
        knex('places').insert({id: 4, region_id: 4, name: 'Gordon Head Recreation Centre', abbreviation: 'GHRC', street_address: '4100 Lambrick Way', slug: 'gordon-head-recreation-centre'}),
        knex('places').insert({id: 5, region_id: 5, name: 'Westhills YMCA', abbreviation: 'WHYMCA', street_address: '1319 Langford Parkway', slug: 'westhills-ymca'}),
        knex('places').insert({id: 6, region_id: 1, name: 'Victoria West Community Centre', abbreviation: 'VWCA', street_address: '521 Craigflower Road', slug: 'victoria-west-community-centre'}),
      ]);
    });
};
