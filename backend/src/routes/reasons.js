const express = require('express')
const router = express.Router()
const reasons = require('../helpers/reasons')
const db = require('../models/index')

const { UniqueViolationError } = require('objection')

/* GET reasons listing. */
router.get('/', async (req, res) => {
  const reasons = await db.Reason.query().select('ReasonID', 'Reason')
  res.json(reasons)
})

/* GET reasons listing by prefix. */
router.get('/:prefix', async (req, res) => {
  // prefix = "DROPPED" or "UNMATCHED"
  const prefix = req.params.prefix.toUpperCase()
  var query
  if (prefix === 'DROPPED') {
    query = db.Reason.query().where('Reason', 'like', 'DROPPED_%')
  } else if (prefix === 'UNMATCHED') {
    query = db.Reason.query().where('Reason', 'like', 'UNMATCHED_%')
  }

  const reasons = await query.select('ReasonID', 'Reason')
  res.json(reasons)
})

/* POST reasons listing */
router.post('/', async (req, res) => {
  const result = await reasons.addReason(req.body)

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
