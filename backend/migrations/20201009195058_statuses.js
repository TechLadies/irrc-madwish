const { tableStatuses } = require('../src/models/status')

exports.up = (knex) => {
  //knex.schema.dropTableIfExists('statusupdates', 'students', 'statuses')
  return knex.schema.createTable(tableStatuses, (table) => {
    table.increments('StatusID').primary() // ToDo StatusID vs ID (postgres issue). Figure out uuid
    table.text('Description').notNullable().unique()
    //table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableStatuses)
}