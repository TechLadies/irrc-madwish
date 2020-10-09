const { tableNativelanguages } = require('../src/models/nativelanguage')

const SEED_NATIVELANGUAGES = [
  {NativeLanguageID: 1, NativeLanguage: 'Chinese'},
  {NativeLanguageID: 2, NativeLanguage: 'Tamil'},
  {NativeLanguageID: 3, NativeLanguage: 'Malay'},
  {NativeLanguageID: 4, NativeLanguage: 'Bangla'},
  {NativeLanguageID: 5, NativeLanguage: 'Thai'},
  {NativeLanguageID: 6, NativeLanguage: 'Hindi'},
  {NativeLanguageID: 7, NativeLanguage: 'Punjabi'},
  {NativeLanguageID: 8, NativeLanguage: 'Telegu'}
]


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableNativelanguages)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNativelanguages).insert(SEED_NATIVELANGUAGES);
    });
};
