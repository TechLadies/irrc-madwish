const { tableNativeLanguages } = require('../src/models/nativeLanguage')

const SEED_NATIVELANGUAGES = [
  {NativeLanguage: 'CHINESE'},
  {NativeLanguage: 'TAMIL'},
  {NativeLanguage: 'MALAY'},
  {NativeLanguage: 'BANGLA'},
  {NativeLanguage: 'THAI'},
  {NativeLanguage: 'HINDI'},
  {NativeLanguage: 'PUNJABI'},
  {NativeLanguage: 'TELUGU'}
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
