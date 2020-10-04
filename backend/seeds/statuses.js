const { tableName } = require('../src/models/status')

const SEED_STATUSES = [
    {
      Description: 'Screening',
    },
    {
      Description: 'Unmatched',
    },
    {
      Description: 'Matched',
    },
    {
      Description: 'Dropped Out',
    }
]
  
  
exports.seed = (knex) => {
    return knex(tableName)
      // Deletes all existing entries
      .del()
      .then(function () {
        // Inserts seed user entries
        return knex(tableName).insert(SEED_STATUSES)
      })
}
  