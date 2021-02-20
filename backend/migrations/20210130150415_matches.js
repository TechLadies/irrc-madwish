const { tableMatches } = require('../src/models/match')

exports.up = (knex) => {
    return knex.schema.createTable(tableMatches, (table) => {
      table.increments('MatchID').primary()
      table.integer('StudentID').references('StudentID').inTable('students').onDelete("CASCADE").notNullable()
      table.integer('TeacherID').references('TeacherID').inTable('teachers').onDelete("CASCADE").notNullable()
      table.unique(['StudentID', 'TeacherID'])
      table.integer('StudentStatusUpdateID').references('StatusUpdateID').inTable('statusUpdates').onDelete("CASCADE")
      table.integer('TeacherStatusUpdateID').references('StatusUpdateID').inTable('statusUpdates').onDelete("CASCADE")
      table.datetime('LastEmailDate')
      table.enu('MatchStatus', [
          "Active",
          "Pending"
      ])
      table.datetime('ConfirmedDate')
    })
  }

  exports.down = (knex) => {
    return knex.schema.dropTable(tableMatches)
  }
