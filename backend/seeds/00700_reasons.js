const { tableReasons } = require('../src/models/reason')

const SEED_REASONS = [
  {Reason: 'DROPPED_Not available'},
  {Reason: 'DROPPED_Not interested'},
  {Reason: 'DROPPED_Others'},
  {Reason: 'UNMATCHED_Student cannot pursue'},
  {Reason: 'UNMATCHED_Teacher cannot pursue'},
  {Reason: 'UNMATCHED_Others'}
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableReasons)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableReasons).insert(SEED_REASONS);
    });
};
