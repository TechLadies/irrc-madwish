const { tableStatuses } = require('../src/models/status')

const SEED_STATUSES = [
    {
      Description: 'SCREENING',
    },
    {
      Description: 'UNMATCHED',
    },
    {
      Description: 'MATCHED',
    },
    {
      Description: 'DROPPED OUT',
    }
]
  
  
exports.seed = (knex) => {
    return knex(tableStatuses)
      // Deletes all existing entries
      .del()
      .then(function () {
        // Inserts seed user entries
        return knex(tableStatuses).insert(SEED_STATUSES)
      })
}
  