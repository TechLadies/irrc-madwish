
const { tableTeachers } = require('../src/models/teacher')

exports.seed = (knex) => {
  return knex(tableTeachers)
    .del()
    .then(function () {
      return knex(tableTeachers).insert([
        {
          PhoneNumber: '12345678',
          Email: "email@email.com",
          FullName: 'Mrs. Teacher',
          Source: 'source',
          NativeLanguageID: knex('nativeLanguages').where({
            NativeLanguage: 'CHINESE'
          }).select('NativeLanguageID'),
          SecondLanguageID: knex('nativeLanguages').where({
            NativeLanguage: 'TAMIL'
          }).select('NativeLanguageID'),
          EnglishProficiency: 'Intermediate',
          LanguageProficiency: 'Intermediate',
          Notes: 'notes',
          StatusID: knex('statuses').where({
            Description: 'UNMATCHED' 
          }).select('StatusID'),
        },
      ])
    })
}