const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.up = (knex) => {
  return knex.schema.table(tableStatusUpdates, (table) => {
    table.integer('TeacherID').references('TeacherID').inTable('teachers').onDelete("CASCADE")
  })
}

exports.down = (knex) => {
  return knex.schema.table(tableStatusUpdates, (table) => {
    table.dropColumn('TeacherID')
  })
}
