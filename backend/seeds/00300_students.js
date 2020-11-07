
const { tableStudents } = require('../src/models/student')

exports.seed = (knex) => {
  return knex(tableStudents)
    .del()
    .then(function () {
      return knex(tableStudents).insert([
        {
          StudentID: 1,
          PhoneNumber: '12345678',
          FullName: 'fullname',
          Source: 'source',
          NativeLanguageID: 1, //just edited
          EnglishProficiency: 'No',
          Notes: 'notes',
          StatusID: 1,
        },
      ])
    })
}