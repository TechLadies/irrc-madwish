const { tableStatusupdates } = require('../src/models/statusupdate')
const { tableStudents } = require('../src/models/student')
const { tableNativelanguages } = require('../src/models/nativelanguage')
const { tableStatuses } = require('../src/models/status')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatusupdates).del()
  //return knex(tableStatusupdates).truncate()
  //knex.schema.raw('TRUNCATE TABLE tableStatusupdates, products CASCADE')
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStudents).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableNativelanguages).del()
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableStatuses).del()
};

