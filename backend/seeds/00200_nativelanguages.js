const { tableNativelanguages } = require('../src/models/nativelanguage')

const SEED_NATIVELANGUAGES = [
  {NativeLanguage: 'Chinese'},
  {NativeLanguage: 'Tamil'},
  {NativeLanguage: 'Malay'},
  {NativeLanguage: 'Bangla'},
  {NativeLanguage: 'Thai'},
  {NativeLanguage: 'Hindi'},
  {NativeLanguage: 'Punjabi'},
  {NativeLanguage: 'Telegu'}
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
