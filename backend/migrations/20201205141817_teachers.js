const { tableTeachers } = require("../src/models/teacher");

exports.up = (knex) => {
  return knex.schema.createTable(tableTeachers, (table) => {
    table.increments("TeacherID").primary();
    table.text("PhoneNumber").notNullable();
    table.text("Email");
    table.text("FullName").notNullable();
    table.unique(["PhoneNumber", "FullName"]);
    table.text("Source");
    table
      .integer("NativeLanguageID")
      .references("NativeLanguageID")
      .inTable("nativeLanguages")
      .onDelete("CASCADE");
    table
      .integer("SecondLanguageID")
      .references("NativeLanguageID")
      .inTable("nativeLanguages")
      .onDelete("CASCADE");
    table.enu("EnglishProficiency", ["No", "Little", "Simple", "Intermediate"]);
    table.enu("LanguageProficiency", [
      "No",
      "Little",
      "Simple",
      "Intermediate",
    ]);
    table.text("Notes");
    table
      .integer("StatusID")
      .references("StatusID")
      .inTable("statuses")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableTeachers);
};
