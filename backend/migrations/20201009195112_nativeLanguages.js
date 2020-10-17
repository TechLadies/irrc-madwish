const { tableNativeLanguages } = require('../src/models/nativeLanguage')

exports.up = (knex) => {
  return knex.schema.createTable(tableNativeLanguages, (table) => {
    table.increments('NativeLanguageID').primary()
    table.text('NativeLanguage').notNullable().unique()
    //table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableNativeLanguages)
}
