const { tableUsers } = require("../src/models/user");

exports.up = function (knex) {
  return knex.schema.createTable(tableUsers, (table) => {
    table.increments("UserID").primary();
    table.string("Username");
    table.string("Password");
    table.unique(["Username"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableUsers);
};
