const { tableStatusupdates } = require('../src/models/statusupdate')

exports.up = (knex) => {
  return knex.schema.createTable(tableStatusupdates, (table) => {
    table.increments('StatusUpdateID').primary() // ToDo StatusID vs ID (postgres issue). Figure out uuid
    table.integer('StudentID').references('StudentID').inTable('students').onDelete("CASCADE")
    table.integer('PreviousStatusID').references('StatusID').inTable('statuses').onDelete("CASCADE")
    table.integer('NextStatusID').references('StatusID').inTable('statuses').onDelete("CASCADE")
    table.text('UpdatedBy').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableStatusupdates)
}