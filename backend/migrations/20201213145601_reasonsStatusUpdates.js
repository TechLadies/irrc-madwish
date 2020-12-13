const { tableStatusUpdates } = require('../src/models/statusUpdate')

exports.up = function(knex) {
    return knex.schema.table(tableStatusUpdates, (table) => {
        table.integer('ReasonID').references('ReasonID').inTable('reasons').onDelete("CASCADE");
    });  
};

exports.down = function(knex) {
    return knex.schema.table(tableStatusUpdates, (table) => {
        table.dropColumn('ReasonID');
    });  
};
