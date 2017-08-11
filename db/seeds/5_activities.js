
exports.seed = function(knex, Promise) {
  return knex('activities').del()
    .then(function () {
      return Promise.all([
        knex('activities').insert({id: 1, place_id: 2, name: 'Sportball - Parent and Child Indoor Multi-Sport(2-3 YRS)', description: 'Fun activities for toddlers', start_date: 'July 8th, 2017', end_date: 'August 26th, 2017', price_range: 3, source: 'http://www.oaklandscommunitycentre.com/recreation/preschool'}),
        knex('activities').insert({id: 2, place_id: 2, name: 'Kids At Tennis Society (KATS) Tennis Lessons (9-13 YRS)', description: 'Tennis for young beginners', start_date: 'June 29th, 2017', end_date: 'August 31st, 2017', price_range: 0 , source: 'http://www.oaklandscommunitycentre.com/recreation/youth'}),
        knex('activities').insert({id: 3, place_id: 2, name: 'High Intensity Interval Training (HIIT)', description: 'Total body workout', start_date: 'August 3rd, 2017', end_date: 'September 7th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults'}),
        knex('activities').insert({id: 4, place_id: 2, name: 'Bedtime Yoga' , description: 'Learn to relax before bed', start_date: 'June 26th, 2017', end_date: 'August 28th, 2017', price_range: 2, source: 'http://www.oaklandscommunitycentre.com/recreation/adults'}),
        knex('activities').insert({id: 5, place_id: 2, name: 'Community Dinner and Games Night', description: 'Dinner with your community', start_date: 'June 25th, 2017', end_date: 'June 25th, 2017', price_range: 0, source: 'http://www.oaklandscommunitycentre.com/recreation/adults' }),
      ]);
    });
};
