const { tableNativeLanguages } = require('../src/models/nativeLanguage')

const SEED_NATIVELANGUAGES = [
  {NativeLanguage: 'Chinese'},
  {NativeLanguage: 'Tamil'},
  {NativeLanguage: 'Malay'},
  {NativeLanguage: 'Bangla'},
  {NativeLanguage: 'Thai'},
  {NativeLanguage: 'Hindi'},
  {NativeLanguage: 'Punjabi'},
  {NativeLanguage: 'Telugu'}
]


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableNativeLanguages)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNativeLanguages).insert(SEED_NATIVELANGUAGES);
    });
};
