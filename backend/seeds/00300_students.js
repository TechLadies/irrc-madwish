
const { tableStudents } = require('../src/models/student')

exports.seed = (knex) => {
  return knex(tableStudents)
    .del()
    .then(function () {
      return knex(tableStudents).insert([
        {
          PhoneNumber: '12345678',
          FullName: 'fullname',
          Source: 'source',
          NativeLanguageID: knex('nativeLanguages').where({
            NativeLanguage: 'CHINESE'
          }).select('NativeLanguageID'),
          EnglishProficiency: 'No',
          Notes: 'notes',
          StatusID: knex('statuses').where({
            Description: 'SCREENING' 
          }).select('StatusID'),
        },
      ])
    })
}