const { tableStudents } = require("../src/models/student");

exports.up = function (knex, Promise) {
  return knex.schema.table(tableStudents, (table) => {
    table.dropUnique(["PhoneNumber", "FirstName", "LastName"]);
    table.dropColumn("FirstName");
    table.dropColumn("LastName");
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.table(tableStudents, (table) => {
    table.text("FirstName").notNullable().defaultTo("");
    table.text("LastName").notNullable().defaultTo("");
  });
  await knex.raw(`UPDATE "students" SET "FirstName" = "FullName"`);
  await knex.schema.table(tableStudents, (table) => {
    table.unique(["PhoneNumber", "FirstName", "LastName"]);
  });
};
