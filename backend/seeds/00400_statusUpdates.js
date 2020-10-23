const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusUpdates)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableStatusUpdates).insert([
        {
          StatusUpdateID: 1,
          StudentID: 1,
          PreviousStatusID: 2,        
          NextStatusID: 1, 
          UpdatedBy: 'updatedbyXX', 
        },
      ]);
    });
};
