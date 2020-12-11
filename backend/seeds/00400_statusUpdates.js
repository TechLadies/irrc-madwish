const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusUpdates)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableStatusUpdates).insert([
        {
          StudentID: knex('students').where({
            FullName: 'fullname',
            PhoneNumber: '12345678' 
          }).select('StudentID'),
          PreviousStatusID: knex('statuses').where({
            Description: 'UNMATCHED' 
          }).select('StatusID'),        
          NextStatusID: knex('statuses').where({
            Description: 'SCREENING' 
          }).select('StatusID'), 
          UpdatedBy: 'updatedbyXX', 
        },
      ]);
    });
};
