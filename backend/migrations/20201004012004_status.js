const { tableName } = require('../src/models/status')

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary() // ToDo StatusID vs ID (postgres issue). Figure out uuid
    table.text('Description').notNullable().unique()
    //table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableName)
}