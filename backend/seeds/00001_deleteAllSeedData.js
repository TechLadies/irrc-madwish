const { tableReasons } = require('../src/models/reason')
const { tableTeachers } = require('../src/models/teacher')
const { tableStatusUpdates } = require('../src/models/statusUpdate')
const { tableStudents } = require('../src/models/student')
const { tableNativeLanguages } = require('../src/models/nativeLanguage')
const { tableStatuses } = require('../src/models/status')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableReasons).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableTeachers).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusUpdates).del()
  //return knex(tableStatusupdates).truncate()
  //knex.schema.raw('TRUNCATE TABLE tableStatusupdates, products CASCADE')
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStudents).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableNativeLanguages).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatuses).del()
};

