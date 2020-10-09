const { tableStatuses } = require('../src/models/status')

const SEED_STATUSES = [
    {
      StatusID: 1,
      Description: 'Screening',
    },
    {
      StatusID: 2,
      Description: 'Unmatched',
    },
    {
      StatusID: 3,
      Description: 'Matched',
    },
    {
      StatusID: 4,
      Description: 'Dropped Out',
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
  