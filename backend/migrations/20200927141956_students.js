const { tableName } = require('../src/models/student')

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('StudentID').primary()
    table.text('PhoneNumber').notNullable().unique()  // ToDO Discuss how to ensure students are unique
    table.text('FirstName').notNullable()
    table.text('LastName').notNullable()
    table.text('Source')
    table.text('NativeLanguage')
    table.enu('EnglishProficiency', [
      "No",
      "Little",
      "Simple",
      "Intermediate"
    ])
    table.text('Notes')
    table.integer('StatusID').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableName)
}