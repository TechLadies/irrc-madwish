const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.up = (knex) => {
  return knex.schema.createTable(tableStatusUpdates, (table) => {
    table.increments('StatusUpdateID').primary()
    table.integer('StudentID').references('StudentID').inTable('students').onDelete("CASCADE")
    table.integer('PreviousStatusID').references('StatusID').inTable('statuses').onDelete("CASCADE")
    table.integer('NextStatusID').references('StatusID').inTable('statuses').onDelete("CASCADE")
    table.text('UpdatedBy').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableStatusUpdates)
}
