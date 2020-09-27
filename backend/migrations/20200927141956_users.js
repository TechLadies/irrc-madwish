const { tableName } = require('../src/models/user')

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.text('email').notNullable().unique()
    table.text('firstName')
    table.text('lastName')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableName)
}