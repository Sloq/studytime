
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frameworks').del()
  .then(function() { // Inserts seed entries one by one in series
    return knex('frameworks').insert({
      name: 'node.js',
      description: 'js backend'
    });
  }).then(function () {
    return knex('frameworks').insert({
      name: 'React',
      description: 'single page apps'
    });
  }).then(function () {
    return knex('frameworks').insert({
      name: 'Rails',
      description: 'ruby backend'
    });
  }).then(function () {
    return knex('frameworks').insert({
      name: 'Express',
      description: 'node helper'
    });
  });
};
