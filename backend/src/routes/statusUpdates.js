const express = require('express')
const router = express.Router()
const statusUpdates = require('../helpers/statusUpdates')
const statuses = require('../helpers/statuses')

const { UniqueViolationError } = require('objection')

router.post('/', async (req, res) => {
  // receive the prev status & next status strings, retrieve corresponding ID
  const prevStatus = await statuses.getStatusByStatusString(req.body.PrevStatusString)
  const nextStatus = await statuses.getStatusByStatusString(req.body.NextStatusString)

  req.body.PreviousStatusID = prevStatus.StatusID
  req.body.NextStatusID = nextStatus.StatusID
  delete req.body.PrevStatusString
  delete req.body.NextStatusString

  const result = await statusUpdates.addStatusUpdate(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    if (err instanceof UniqueViolationError) {
      res.status(409).send({
        message: err.message,
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      })
    } else {
      res.status(500).send({
        message: err.message,
        type: 'UnknownError',
        data: {}
      })
    }

    return
  }

  res.status(200).json(result)
})

module.exports = router
