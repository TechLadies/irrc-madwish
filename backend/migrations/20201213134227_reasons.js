const { tableReasons } = require('../src/models/reason')

exports.up = (knex) => {
    return knex.schema.createTable(tableReasons, (table) => {
      table.increments('ReasonID').primary()
      table.text('Reason').notNullable().unique()
    });
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableReasons)
}