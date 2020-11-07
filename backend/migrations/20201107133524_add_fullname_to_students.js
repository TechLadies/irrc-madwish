const { tableStudents } = require('../src/models/student')

exports.up = function(knex, Promise) {
    return knex.schema.table(tableStudents, (table) => {
        table.text('FullName').notNullable();
        table.unique(['PhoneNumber', 'FullName']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table(tableStudents, (table) => {
        table.dropUnique(['PhoneNumber', 'FullName']);
        table.dropColumn('FullName');
    });
};
