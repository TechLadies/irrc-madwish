const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusUpdates)
    .then(function () {
      // Inserts seed entries
      return knex(tableStatusUpdates).insert([
        {
          TeacherID: knex('teachers').where({
            FullName: 'Mrs. Teacher',
            PhoneNumber: '12345678' 
          }).select('TeacherID'),
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
