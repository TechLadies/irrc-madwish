const { tableStatusupdates } = require('../src/models/statusupdate')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusupdates)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableStatusupdates).insert([
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
