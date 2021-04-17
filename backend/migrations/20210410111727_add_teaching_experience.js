const { tableTeachers } = require("../src/models/teacher");

exports.up = function (knex) {
  return knex.schema.table(tableTeachers, (table) => {
    table
      .enu("TeachingExperience", ["Yes", "No"])
      .notNullable()
      .defaultTo("No");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tableTeachers, (table) => {
    table.dropColumn("TeachingExperience");
  });
};
