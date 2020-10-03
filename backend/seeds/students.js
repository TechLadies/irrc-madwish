
const { tableName } = require('../src/models/student')

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(function () {
      return knex(tableName).insert([
        {
          PhoneNumber: '12345678',
          FirstName: 'firstname',
          LastName: 'lastname',
          Source: 'source',
          NativeLanguage: 'nativelanguage',
          EnglishProficiency: 'No',
          Notes: 'notes',
          StatusID: 1,
        },
      ])
    })
}