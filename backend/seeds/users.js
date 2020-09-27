
const { tableName } = require('../src/models/user')

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(function () {
      return knex(tableName).insert([
        {
          firstName: 'tech',
          lastName: 'lady',
          email: 'test1@test.com',
        },
      ])
    })
}